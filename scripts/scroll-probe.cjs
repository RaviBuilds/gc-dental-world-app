/* Identify any reveal that never fires after a full pass (mobile QA). */
const { CDP, sleep } = require("./visual-qa.cjs");

(async () => {
  const cdp = await CDP.connect();
  cdp.ws.onmessage = (m) => {
    const msg = Jm.data);
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
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await cdp.send("Page.navigate", { url: "http://localhost:3210" });
  await sleep(3500);
  await cdp.send("Runtime.evaluate", { awaitPromise: true, expression: `(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y <= document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 80));
    }
    window.scrollTo(0, 999999);
    await new Promise(r => setTimeout(r, 900));
  })()` });
  const r = await cdp.send("Runtime.evaluate", { expression: `(() => {
    return JSON.stringify([...document.querySelectorAll(".gc-reveal:not(.is-visible), .gc-reveal-group:not(.is-visible)")].map(el => ({
      cls: el.className,
      section: el.closest("section,[id]")?.id || "?",
      text: (el.textContent || "").trim().slice(0, 60),
      top: Math.round(el.getBoundingClientRect().top + window.scrollY),
      h: Math.round(el.getBoundingClientRect().height),
      docH: document.body.scrollHeight,
    })));
  })()`, returnByValue: true });
  console.log(r.result.value);
  await cdp.ws.close();
})().catch((e) => { console.error("FATAL", e); process.exit(1); });