/* One-off: H1 box vs gradient/photo geometry for the typography pass. */
const { CDP, sleep } = require("./visual-qa.cjs");

const URL_BASE = process.env.QA_URL || "http://localhost:3000";
const viewports = [
  [1440, 800],
  [1366, 768],
  [1366, 640],
  [1920, 1080],
  [1920, 1200],
  [1536, 960],
  [1440, 900],
  [1280, 720],
  [2560, 1440],
  [390, 844],
  [360, 740],
];

(async () => {
  const cdp = await CDP.connect();
  cdp.listen();
  await cdp.send("Page.enable");
  for (const [w, h] of viewports) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: w, height: h, deviceScaleFactor: 1, mobile: w < 700,
    });
    await cdp.send("Page.navigate", { url: URL_BASE });
    await sleep(2500);
    const res = await cdp.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const t = document.querySelector('.hero-title');
        if (!t) return 'no .hero-title';
        const r = t.getBoundingClientRect();
        const cs = getComputedStyle(t);
        const g = document.querySelector('.hero-gradient').getBoundingClientRect();
        const group = t.parentElement.getBoundingClientRect();
        const right = t.closest('[class*=\"max-w-[80rem]\"]').lastElementChild.getBoundingClientRect();
        const prev = t.style.whiteSpace;
        t.style.whiteSpace = 'nowrap';
        const nw = t.scrollWidth;
        t.style.whiteSpace = prev;
        return JSON.stringify({
          vp: innerWidth + 'x' + innerHeight,
          fontSizePx: Math.round(parseFloat(cs.fontSize)),
          titleBox: { top: Math.round(r.top), bottom: Math.round(r.bottom), width: Math.round(r.width) },
          groupWidth: Math.round(group.width),
          rightWidth: Math.round(right.width),
          nowrapScrollWidth: nw,
          gradientTop: Math.round(g.top),
        });
      })()`,
    });
    console.log(res.result.value);
  }
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
