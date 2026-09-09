const { CDP, sleep, OUT, URL_BASE } = require("./visual-qa.cjs");

(async () => {
  const cdp = await CDP.connect();
  cdp.listen();
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: process.env.MOBILE_EMU === "1" });
  await cdp.send("Page.navigate", { url: URL_BASE });
  await sleep(3000);
  const res = await cdp.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const doc = document.documentElement;
      const ul = document.querySelector('ul[aria-label="Smile transformation cases"]');
      const ulInfo = ul ? { w: Math.round(ul.getBoundingClientRect().width), ovx: getComputedStyle(ul).overflowX, parentW: Math.round(ul.parentElement.getBoundingClientRect().width), parentCls: ul.parentElement.className.slice(0, 80), scrollW: ul.scrollWidth } : null;
      const bar = document.querySelector('div.fixed.inset-x-0.bottom-0');
      const wide = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        if (r.width > 1 && (r.right > 392 || r.left < -2) && !(bar && bar.contains(el)) && el !== bar) {
          wide.push({ tag: el.tagName.toLowerCase(), cls: typeof el.className === 'string' ? el.className.slice(0, 80) : '', w: Math.round(r.width), l: Math.round(r.left), r: Math.round(r.right), pos: cs.position, ovx: cs.overflowX, inUl: !!el.closest('ul') });
        }
      }
      wide.sort((a, b) => b.r - a.r);
      const chain = [];
      let n = bar;
      for (let i = 0; i < 6 && n; i++) {
        const cs = getComputedStyle(n);
        chain.push({ tag: n.tagName.toLowerCase(), cls: typeof n.className === 'string' ? n.className.slice(0, 70) : (n.className?.baseVal || '').slice(0, 70), w: Math.round(n.getBoundingClientRect().width), pos: cs.position, transform: cs.transform !== 'none', filter: cs.filter !== 'none', contain: cs.contain });
        n = n.parentElement;
      }
      const barInfo = bar ? { pos: getComputedStyle(bar).position, left: getComputedStyle(bar).left, right: getComputedStyle(bar).right, w: Math.round(bar.getBoundingClientRect().width), cls: bar.className.slice(0, 120) } : null;
      return { clientW: doc.clientWidth, scrollW: doc.scrollWidth, ulInfo, wide: wide.slice(0, 10), chain, barInfo, hasViewportMeta: document.querySelector('meta[name=viewport]')?.content };
    })()`,
  });
  if (res.exceptionDetails) console.log(JSON.stringify(res.exceptionDetails, null, 1).slice(0, 800));
  const result = res.result || {};
  console.log(JSON.stringify(result.value, null, 1));
  cdp.ws.close();
})().catch((e) => { console.error(e); process.exit(1); });
