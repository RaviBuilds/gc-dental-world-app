const { CDP, sleep, OUT, URL_BASE } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");

async function auditViewport(width, height, tag) {
  const cdp = await CDP.connect();
  cdp.listen();
  try {
    await cdp.send("Page.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width, height, deviceScaleFactor: 1, mobile: width < 700,
    });
    await cdp.send("Page.navigate", { url: URL_BASE });
    await sleep(3500);
    await cdp.send("Runtime.evaluate", {
      expression: `document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);if(s.animationName!=='none'){el.style.animation='none';el.style.opacity='1';el.style.transform='none';}});`,
    });
    await sleep(400);

    const { result } = await cdp.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const doc = document.documentElement;
        const issues = [];
        if (doc.scrollWidth > doc.clientWidth + 1) issues.push('H-OVERFLOW: doc ' + doc.scrollWidth + ' vs viewport ' + doc.clientWidth);
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > doc.clientWidth + 2 || r.left < -2)) {
            const cs = getComputedStyle(el);
            if (cs.position !== 'fixed' && cs.position !== 'sticky') {
              issues.push('OFF-CANVAS: <' + el.tagName.toLowerCase() + (el.className && typeof el.className==='string' ? '.' + el.className.split(' ').slice(0,2).join('.') : '') + '> right=' + Math.round(r.right) + ' left=' + Math.round(r.left));
              if (issues.length > 12) break;
            }
          }
        }
        const h1 = document.querySelector('h1');
        let h1Lines = null;
        if (h1) {
          const node = h1.firstChild;
          if (node && node.nodeType === 3) {
            const lines = [];
            const range = document.createRange();
            let lastTop = null, start = 0;
            for (let i = 1; i <= node.length; i++) {
              range.setStart(node, i - 1); range.setEnd(node, i);
              const r = range.getBoundingClientRect();
              if (lastTop === null) lastTop = r.top;
              else if (r.top - lastTop > 5) {
                range.setStart(node, start); range.setEnd(node, i - 1);
                lines.push(range.toString());
                start = i - 1; lastTop = r.top;
              }
            }
            range.setStart(node, start); range.setEnd(node, node.length);
            lines.push(range.toString());
            h1Lines = lines;
          }
        }
        const hero = document.querySelector('img[fetchpriority]');
        const heror = hero && hero.getBoundingClientRect();
        const sections = [...document.querySelectorAll('section')].map(s => ({
          id: s.id || '(none)', top: Math.round(s.getBoundingClientRect().top + scrollY),
          h: Math.round(s.getBoundingClientRect().height),
        }));
        const float = [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).position === 'fixed').map(e => { const r = e.getBoundingClientRect(); return { tag: e.tagName.toLowerCase(), cls: typeof e.className==='string'?e.className.split(' ').slice(0,2).join('.'):'' , rect: [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)] }; });
        const h1r = h1 && h1.getBoundingClientRect();
        return {
          viewport: doc.clientWidth + 'x' + doc.clientHeight,
          pageHeight: Math.round(doc.scrollHeight),
          scrollWidth: doc.scrollWidth,
          h1: h1 ? { text: h1.textContent.trim().slice(0, 60), lines: h1Lines, fontSize: getComputedStyle(h1).fontSize, box: [Math.round(h1r.left), Math.round(h1r.top), Math.round(h1r.width), Math.round(h1r.height)] } : null,
          heroImg: heror ? { box: [Math.round(heror.left), Math.round(heror.top), Math.round(heror.width), Math.round(heror.height)], src: hero.currentSrc.split('/').pop() } : null,
          issues, sections, float,
          fonts: [...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.weight).filter((v,i,a)=>a.indexOf(v)===i),
        };
      })()`,
    });
    const data = result.value;

    const shotHeight = Math.min(data.pageHeight + 40, 15000);
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width, height: shotHeight, deviceScaleFactor: 1, mobile: width < 700,
    });
    await sleep(2500);
    const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
    fs.mkdirSync(OUT, { recursive: true });
    fs.writeFileSync(path.join(OUT, `${tag}.png`), Buffer.from(shot.data, "base64"));
    return data;
  } finally { cdp.ws.close(); }
}

(async () => {
  const viewports = [
    [1920, 1080, "v1920"], [1440, 900, "v1440"], [1280, 800, "v1280"],
    [1024, 768, "v1024"], [768, 1024, "v768"],
    [390, 844, "v390"], [375, 667, "v375"], [360, 800, "v360"],
  ];
  const report = {};
  for (const [w, h, tag] of viewports) {
    report[tag] = await auditViewport(w, h, tag);
    console.log(`--- ${tag} (${w}x${h}) page=${report[tag].pageHeight}px scrollW=${report[tag].scrollWidth}`);
    for (const i of report[tag].issues) console.log("  !! " + i);
    if (report[tag].h1) console.log(`  H1 ${report[tag].h1.fontSize} ${report[tag].h1.lines ? report[tag].h1.lines.length + 'ln ' + JSON.stringify(report[tag].h1.lines) : ''} @${JSON.stringify(report[tag].h1.box)}`);
    if (report[tag].heroImg) console.log(`  HERO ${JSON.stringify(report[tag].heroImg.box)}`);
    for (const f of report[tag].float) console.log(`  FIXED ${f.tag}.${f.cls} ${JSON.stringify(f.rect)}`);
  }
  fs.writeFileSync(path.join(OUT, "layout-report.json"), JSON.stringify(report, null, 2));
  console.log("DONE");
})().catch((e) => { console.error(e); process.exit(1); });
