/* Rendered hero screenshots at QA viewports (dev tooling only). */
const { CDP, sleep } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");

const URL_BASE = process.env.QA_URL || "http://localhost:3000";

const shots = [
  [1920, 1080, "desktop-1920x1080"],
  [2560, 1440, "desktop-2560x1440"],
  [1440, 800, "desktop-1440x800"],
  [1536, 960, "desktop-1536x960"],
  [1280, 800, "desktop-1280x800"],
  [1280, 720, "laptop-1280x720"],
  [1366, 768, "laptop-1366x768"],
  [1366, 640, "short-1366x640"],
  [768, 1024, "tablet-768x1024"],
  [430, 932, "mobile-430x932"],
  [390, 844, "mobile-390x844"],
  [360, 740, "mobile-360x740"],
];

(async () => {
  const outDir = path.join(__dirname, "..", ".hero-shots");
  fs.mkdirSync(outDir, { recursive: true });
  const cdp = await CDP.connect();
  cdp.listen();
  await cdp.send("Page.enable");
  for (const [w, h, name] of shots) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: w < 700,
    });
    await cdp.send("Page.navigate", { url: URL_BASE });
    await sleep(3500);
    // Neutralize entrance animations so we QA the settled composition.
    await cdp.send("Runtime.evaluate", {
      expression:
        "document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);if(s.animationName!=='none'){el.style.animation='none';el.style.opacity='1';el.style.transform='none';}});",
    });
    await sleep(400);
    const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(outDir, name + ".png"), Buffer.from(data, "base64"));
    console.log("saved", name);
  }
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
