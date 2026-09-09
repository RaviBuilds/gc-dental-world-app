/* One-off: wide-viewport renders at reduced scale so they fit QA reads. */
const { CDP, sleep } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");

const shots = [
  [1920, 1080, 0.66, "small-1920x1080"],
  [1536, 960, 0.8, "small-1536x960"],
];

(async () => {
  const outDir = path.join(__dirname, "..", ".hero-shots");
  const cdp = await CDP.connect();
  cdp.listen();
  await cdp.send("Page.enable");
  for (const [w, h, dsf, name] of shots) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: w, height: h, deviceScaleFactor: dsf, mobile: false,
    });
    await cdp.send("Page.navigate", { url: process.env.QA_URL || "http://localhost:3000" });
    await sleep(3500);
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
})().catch((e) => { console.error(e); process.exit(1); });

(async () => {
  const outDir = path.join(__dirname, "..", ".hero-shots");
  const cdp = await CDP.connect();
  cdp.listen();
  await cdp.send("Page.enable");
  for (const [w, h, dsf, name] of shots) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: w, height: h, deviceScaleFactor: dsf, mobile: false,
    });
    await cdp.send("Page.navigate", { url: process.env.QA_URL || "http://localhost:3000" });
    await sleep(3500);
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
})().catch((e) => { console.error(e); process.exit(1); });