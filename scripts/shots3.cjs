const { CDP, sleep, OUT, URL_BASE } = require("./visual-qa.cjs");
const fs = require("fs");

(async () => {
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
  await cdp.send("Page.navigate", { url: URL_BASE });
  await sleep(4500);

  async function shoot(name, width, height, mobile, scrollY) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
    if (scrollY !== undefined) {
      await cdp.send("Runtime.evaluate", { expression: `window.scrollTo(0,${scrollY});'ok'` });
      await sleep(1400);
    }
    await sleep(500);
    const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(shot.data, "base64"));
    console.log("saved", name);
  }

  await shoot("p3_d_hero_1440", 1440, 900, false, 0);
  await shoot("p3_d_hero_1920", 1920, 1080, false, 0);
  await shoot("p3_d_clinic_1440", 1440, 900, false, 8200);
  await shoot("p3_t_hero_768", 768, 1024, false, 0);
  await shoot("p3_t_clinic_768", 768, 1024, false, 8600);
  await shoot("p3_m_cases_390", 390, 844, true, 5200);
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
