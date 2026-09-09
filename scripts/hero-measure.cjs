/* Measure hero geometry at QA viewports (dev tooling only). */
const { CDP, sleep } = require("./visual-qa.cjs");

const URL_BASE = process.env.QA_URL || "http://localhost:3000";
const viewports = [
  [1440, 800],
  [1366, 768],
  [1366, 640],
  [1920, 1080],
];

(async () => {
  const cdp = await CDP.connect();
  cdp.listen();
  await cdp.send("Page.enable");
  for (const [w, h] of viewports) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send("Page.navigate", { url: URL_BASE });
    await sleep(2500);
    const res = await cdp.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const s = document.querySelector('#top');
        if (!s) return 'no #top';
        const r = s.getBoundingClientRect();
        const cs = getComputedStyle(s);
        const trust = s.lastElementChild.getBoundingClientRect();
        const photo = s.querySelector('.hero-media-scroll').getBoundingClientRect();
        const grad = s.querySelector('.hero-gradient').getBoundingClientRect();
        const header = document.querySelector('header');
        const hr = header ? header.getBoundingClientRect() : null;
        return JSON.stringify({
          vp: innerHeight,
          section: { top: r.top, bottom: r.bottom, height: cs.height, minHeight: cs.minHeight },
          trust: { top: trust.top, bottom: trust.bottom },
          photo: { top: photo.top, bottom: photo.bottom, height: photo.height },
          gradient: { top: grad.top },
          header: hr ? { h: hr.height, pos: getComputedStyle(header).position } : null,
        });
      })()`,
    });
    console.log(w + "x" + h, res.result.value);
  }
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
