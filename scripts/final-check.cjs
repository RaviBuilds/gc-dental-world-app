const { CDP, sleep, URL_BASE } = require("./visual-qa.cjs");

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
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await sleep(1500);
  const check = await cdp.send("Runtime.evaluate", { expression: `(() => {
    const doc = document.documentElement;
    const imgs = [...document.images];
    const broken = imgs.filter(i => i.complete && i.naturalWidth === 0).length;
    const lazy = imgs.filter(i => i.loading === 'lazy').length;
    return JSON.stringify({scrollWidth: doc.scrollWidth, innerWidth: window.innerWidth, broken, lazy, total: imgs.length});
  })()`, returnByValue: true });
  console.log("FINAL-CHECK", check.result.value);
  await cdp.close();
})().catch(e => { console.error(e); process.exit(1); });

