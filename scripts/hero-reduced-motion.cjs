/* Verify hero reads correctly with prefers-reduced-motion: reduce (dev tooling). */
const { CDP, sleep } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");

(async () => {
  const cdp = await CDP.connect();
  cdp.listen();
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 800,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await cdp.send("Page.navigate", { url: "http://localhost:3000" });
  await sleep(3000);
  const res = await cdp.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const q = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return { opacity: cs.opacity, anim: cs.animationName, transform: cs.transform, top: Math.round(r.top), bottom: Math.round(r.bottom) };
      };
      return JSON.stringify({
        title: q('.hero-title'),
        support: q('.hero-support'),
        photo: q('.hero-photo'),
        gradient: q('.hero-gradient'),
        primaryCta: q('.hero-rise a'),
        trustBottom: q('#top').lastElementChild.getBoundingClientRect().bottom,
        viewport: innerHeight,
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
    })()`,
  });
  console.log(res.result.value);
  const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    path.join(__dirname, "..", ".hero-shots", "reduced-motion-1440x800.png"),
    Buffer.from(data, "base64")
  );
  console.log("saved reduced-motion shot");
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
