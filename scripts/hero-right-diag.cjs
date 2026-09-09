/* One-off: copy-layer fit + CTA-row integrity across desktop viewports. */
const { CDP, sleep } = require("./visual-qa.cjs");

const viewports = [
  [1280, 720],
  [1366, 640],
  [1366, 768],
  [1440, 800],
  [1440, 900],
  [1536, 960],
  [1920, 1080],
  [1920, 1200],
  [2560, 1440],
];

(async () => {
  const cdp = await CDP.connect();
  cdp.listen();
  await cdp.send("Page.enable");
  for (const [w, h] of viewports) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: w, height: h, deviceScaleFactor: 1, mobile: false,
    });
    await cdp.send("Page.navigate", { url: process.env.QA_URL || "http://localhost:3000" });
    await sleep(2200);
    const res = await cdp.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const t = document.querySelector('.hero-title');
        const layer = [...document.querySelectorAll('div')].find(d => String(d.className).includes('max-w-[80rem]'));
        const inner = layer.lastElementChild.firstElementChild;
        const ctaRow = [...inner.children].find(el => String(el.className).includes('lg:flex'));
        const btns = [...ctaRow.querySelectorAll('a')];
        const r = t.getBoundingClientRect();
        return JSON.stringify({
          vp: innerWidth + 'x' + innerHeight,
          font: Math.round(parseFloat(getComputedStyle(t).fontSize)),
          h1: { top: Math.round(r.top), w: Math.round(r.width) },
          ctaRowH: Math.round(ctaRow.getBoundingClientRect().height),
          btnH: btns.map(b => Math.round(b.getBoundingClientRect().height)),
          btnW: btns.map(b => Math.round(b.getBoundingClientRect().width)),
        });
      })()`,
    });
    console.log(res.result.value);
  }
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });