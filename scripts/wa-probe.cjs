/* Temp probe: mobile hero intersection ratio at top. */
const { CDP, sleep } = require("./visual-qa.cjs");
(async () => {
  const cdp = await CDP.connect();
  cdp.ws.onmessage = (m) => { const msg = JSON.parse(m.data); if (msg.id && cdp.pending.has(msg.id)) { const { resolve, reject } = cdp.pending.get(msg.id); cdp.pending.delete(msg.id); msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result); } };
  await cdp.send("Page.enable"); await cdp.send("Runtime.enable");
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source: "try{sessionStorage.setItem('gc-dental-world-contact-dialog-dismissed','true')}catch(e){}",
  });
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await cdp.send("Page.navigate", { url: "http://localhost:3210" });
  await sleep(3500);
  await cdp.send("Runtime.evaluate", { expression: `(() => {
    const hero = document.getElementById("top");
    const rect = hero.getBoundingClientRect();
    window.__probe = { heroH: rect.height, heroTop: rect.top, innerH: innerHeight, scrollY: scrollY };
    const io = new IntersectionObserver((es) => { window.__probe = { ...window.__probe, ratio: es[0].intersectionRatio, isI: es[0].isIntersecting }; }, { threshold: [0, 0.25] });
    io.observe(hero);
  })()` });
  await sleep(1500);
  const r = await cdp.send("Runtime.evaluate", { expression: "JSON.stringify(window.__probe)", returnByValue: true });
  console.log("MOBILE-PROBE", r.result.value);
  await cdp.ws.close();
})().catch(e => { console.error("FATAL", e); process.exit(1); });
