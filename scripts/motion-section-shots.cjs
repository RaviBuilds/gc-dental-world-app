/* Section-level screenshot sweep for motion QA (prod server). Dev tooling only. */
const { CDP, sleep } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");
const OUT = process.argv[2] || path.join(process.env.TEMP || "/tmp", "gcsections");

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const cdp = await CDP.connect();
  cdp.ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && cdp.pending.has(msg.id)) {
      const { resolve, reject } = cdp.pending.get(msg.id);
      cdp.pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    }
  };
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source: "try{sessionStorage.setItem('gc-dental-world-contact-dialog-dismissed','true')}catch(e){}",
  });

  const stops = [
    ["1440x800", false, 0, "top"],
    ["1440x800", false, 1400, "intent"],
    ["1440x800", false, 7400, "smile-stories"],
    ["1440x800", false, 11500, "care-journey"],
    ["1440x800", false, 15200, "clinic-faq"],
    ["1440x800", false, 99999, "final-cta"],
    ["390x844", true, 0, "m-top"],
    ["390x844", true, 99999, "m-final-cta"],
  ];

  for (const [vp, mobile, y, name] of stops) {
    const [w, h] = vp.split("x").map(Number);
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
    await cdp.send("Page.navigate", { url: "http://localhost:3210" });
    await sleep(3000);
    await cdp.send("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior='auto'" });
    await cdp.send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` });
    await sleep(1800);
    const shot = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 70 });
    fs.writeFileSync(path.join(OUT, `${name}.jpg`), Buffer.from(shot.data, "base64"));
    console.log("SHOT", name);
  }
  await cdp.ws.close();
  console.log("DONE");
})().catch((e) => { console.error("FATAL", e); process.exit(1); });