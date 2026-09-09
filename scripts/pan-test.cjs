const { CDP, sleep, OUT, URL_BASE } = require("./visual-qa.cjs");

const VIEWPORTS = [
  { name: "1920", width: 1920, height: 1080, mobile: false },
  { name: "1440", width: 1440, height: 900, mobile: false },
  { name: "1280", width: 1280, height: 800, mobile: false },
  { name: "1024", width: 1024, height: 768, mobile: false },
  { name: "768", width: 768, height: 1024, mobile: false },
  { name: "390", width: 390, height: 844, mobile: true },
  { name: "375", width: 375, height: 812, mobile: true },
  { name: "360", width: 360, height: 800, mobile: true },
];

(async () => {
  const hardExit = setTimeout(() => { console.error("HARD TIMEOUT"); console.error("errors so far:"); process.exit(2); }, 60000);
  console.log("connecting...");
  const cdp = await CDP.connect();
  console.log("connected");
  const consoleErrors = [];
  cdp.ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && cdp.pending.has(msg.id)) {
      const { resolve, reject } = cdp.pending.get(msg.id);
      cdp.pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    }
    if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
      consoleErrors.push(msg.params.entry.text.slice(0, 160));
    }
    if (msg.method === "Runtime.exceptionThrown") {
      consoleErrors.push(("EXC: " + (msg.params.exceptionDetails.text || "")).slice(0, 160));
    }
  };
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  console.log("domains enabled");
  await cdp.send("Page.navigate", { url: URL_BASE });
  console.log("navigating...");
  await sleep(4500);
  console.log("loaded, starting viewport loop");

  for (const vp of VIEWPORTS) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.mobile });
    await sleep(900);
    const res = await cdp.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const doc = document.documentElement;
        const clipped = (el) => {
          for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
            const ox = getComputedStyle(n).overflowX;
            if (ox !== 'visible') return true;
          }
          return false;
        };
        const img = document.querySelector('header img');
        const bar = document.querySelector('div.fixed.inset-x-0.bottom-0');
        const barVisible = bar && getComputedStyle(bar).display !== 'none';
        const barR = barVisible ? bar.getBoundingClientRect() : null;
        const barBtns = barVisible ? [...bar.querySelectorAll('a')].map(a => Math.round(a.getBoundingClientRect().height)) : [];
        const out = [];
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width > 1 && r.right > doc.clientWidth + 1 && !clipped(el) && getComputedStyle(el).position !== 'fixed') {
            out.push({ tag: el.tagName.toLowerCase(), cls: (typeof el.className === 'string' ? el.className : '').slice(0, 90), w: Math.round(r.width), l: Math.round(r.left), rgt: Math.round(r.right) });
          }
        }
        out.sort((a, b) => b.rgt - a.rgt);
        return {
          scrollW: doc.scrollWidth, clientW: doc.clientWidth,
          logoW: img ? Math.round(img.getBoundingClientRect().width) : null,
          barW: barR ? Math.round(barR.width) : null, barBtns,
          culprits: out.slice(0, 5),
        };
      })()`,
    });
    const pan = await cdp.send("Runtime.evaluate", {
      returnByValue: true, awaitPromise: true,
      expression: `(async () => { window.scrollTo(99999,0); await new Promise(r=>setTimeout(r,250)); const x = window.scrollX; window.scrollTo(0,0); return x; })()`,
    });
    const v = res.result.value;
    const flag = (v.scrollW > v.clientW + 1 || pan.result.value > 0) ? "  <<< OVERFLOW" : "";
    console.log(`${vp.name}: scrollW=${v.scrollW} clientW=${v.clientW} panX=${pan.result.value} logo=${v.logoW} bar=${v.barW} btnH=[${v.barBtns}]${flag}`);
    if (flag && v.culprits.length) console.log("  culprits:", JSON.stringify(v.culprits));
  }
  console.log("CONSOLE ERRORS:", consoleErrors.length ? consoleErrors.slice(0, 8) : "none");
  clearTimeout(hardExit);
  cdp.ws.close();
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });

