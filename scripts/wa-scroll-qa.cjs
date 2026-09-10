/* WhatsApp floating CTA — scroll-gate QA (dev tooling only).
   Verifies: hidden over hero → springy entry after scroll → exit on return;
   mobile gate; reduced-motion instant toggle. */
const { CDP, sleep } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");
const OUT = process.argv[2] || path.join(process.env.TEMP || "/tmp", "gcwa-scroll");

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
    source: "try{sessionStorage.setItem('gc-dental-world-contact-dialog-dismissed','true')}catch(e){};try{history.scrollRestoration='manual';scrollTo(0,0)}catch(e){}",
  });

  async function load(w, h, mobile) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
    await cdp.send("Page.navigate", { url: "http://localhost:3210" });
    await sleep(3000);
  }
  async function evaljs(expr) {
    const r = await cdp.send("Runtime.evaluate", { expression: expr, returnByValue: true });
    return r.result.value;
  }
  async function shot(name) {
    const s = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 75 });
    fs.writeFileSync(path.join(OUT, name + ".jpg"), Buffer.from(s.data, "base64"));
  }
  const state = `(() => {
    const a = document.querySelector(".wa-cta");
    if (!a) return JSON.stringify({ missing: true });
    const cs = getComputedStyle(a);
    return JSON.stringify({
      cls: a.className,
      opacity: cs.opacity,
      visibility: cs.visibility,
      pointerEvents: cs.pointerEvents,
      transform: cs.transform,
      scrollY: window.scrollY,
      focusable: a.matches(":focus-visible") || a.tabIndex >= 0 && cs.visibility !== "hidden",
    });
  })()`;

  // ── Desktop 1440×800 ──
  await load(1440, 800, false);
  console.log("DESKTOP-TOP", await evaljs(state));
  await shot("desktop-top-hidden");

  // Scroll past hero — sample mid-entry scale to prove the springy animation
  await evaljs(`window.scrollTo({ top: 1400, behavior: "instant" })`);
  let maxScale = 0;
  const t0 = Date.now();
  while (Date.now() - t0 < 1200) {
    const v = await evaljs(`(() => {
      const a = document.querySelector(".wa-cta");
      const cs = getComputedStyle(a);
      const m = new DOMMatrixReadOnly(cs.transform === "none" ? "" : cs.transform);
      return JSON.stringify({ s: m.a, o: parseFloat(cs.opacity), v: cs.visibility });
    })()`);
    const j = JSON.parse(v);
    maxScale = Math.max(maxScale, j.s);
    await sleep(50);
  }
  console.log("DESKTOP-SCROLLED", await evaljs(state), "maxEntryScale:", maxScale.toFixed(3));
  await sleep(800);
  await shot("desktop-scrolled-visible");

  // Scroll back to hero — must exit and hide
  await evaljs(`window.scrollTo({ top: 0, behavior: "instant" })`);
  await sleep(800);
  console.log("DESKTOP-BACK-TOP", await evaljs(state));
  await shot("desktop-back-top-hidden");

  // ── Mobile 390×844 ──
  await load(390, 844, true);
  console.log("MOBILE-TOP", await evaljs(state));
  await evaljs(`window.scrollTo({ top: 900, behavior: "instant" })`);
  await sleep(900);
  console.log("MOBILE-SCROLLED", await evaljs(state));
  await shot("mobile-scrolled-visible");
  await evaljs(`window.scrollTo({ top: 0, behavior: "instant" })`);
  await sleep(800);
  console.log("MOBILE-BACK-TOP", await evaljs(state));

  // ── Reduced motion 1440×800: instant opacity toggle, no transform travel ──
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 800, deviceScaleFactor: 1, mobile: false });
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await load(1440, 800, false);
  const rmTop = JSON.parse(await evaljs(state));
  await evaljs(`window.scrollTo({ top: 1400, behavior: "instant" })`);
  await sleep(500);
  const rmScrolled = JSON.parse(await evaljs(state));
  console.log("REDUCED", JSON.stringify({
    topHidden: rmTop.visibility === "hidden",
    scrolledVisible: rmScrolled.visibility === "visible" && rmScrolled.opacity === "1",
    noTransformTravel: rmScrolled.transform === "none",
  }));

  await cdp.ws.close();
  console.log("DONE");
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
