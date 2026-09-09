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

  async function shoot(name, width, height, mobile) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
    await cdp.send("Runtime.evaluate", {
      expression:
        "const el=document.querySelectorAll('#smile-stories > div')[1];const y=el.getBoundingClientRect().top+window.scrollY-40;document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,y);'ok'",
    });
    await sleep(1800);
    const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(shot.data, "base64"));
    console.log("saved", name);
  }

  await shoot("p4_d_cases_1440", 1440, 900, false);
  await shoot("p4_d_cases_1920", 1920, 1080, false);
  await shoot("p4_m_cases_390", 390, 844, true);
  await shoot("p4_t_cases_768", 768, 1024, false);
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });