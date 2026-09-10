/* WhatsApp floating CTA QA (dev tooling only). */
const { CDP, sleep } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");
const OUT = process.argv[2] || path.join(process.env.TEMP || "/tmp", "gcwa");

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

  async function load(w, h, mobile) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
    await cdp.send("Page.navigate", { url: "http://localhost:3210" });
    await sleep(3000);
  }
  async function shot(name) {
    const s = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 75 });
    fs.writeFileSync(path.join(OUT, name + ".jpg"), Buffer.from(s.data, "base64"));
  }

  // ── Desktop 1440×800 ──
  await load(1440, 800, false);
  const base = await cdp.send("Runtime.evaluate", { expression: `(() => {
    const a = document.querySelector(".wa-cta");
    if (!a) return JSON.stringify({ missing: true });
    const body = a.querySelector(".wa-body");
    const cs = getComputedStyle(body);
    const acs = getComputedStyle(a);
    const oldBar = [...document.querySelectorAll(".fixed")].filter(el =>
      el !== a && el.textContent.includes("Call the Clinic") && getComputedStyle(el).display !== "none");
    return JSON.stringify({
      href: a.href, target: a.target, rel: a.rel,
      ariaLabel: a.getAttribute("aria-label"),
      bg: cs.backgroundColor, height: cs.height, radius: cs.borderRadius,
      position: acs.position, zIndex: acs.zIndex, right: acs.right, bottom: acs.bottom,
      label: a.querySelector(".wa-label")?.textContent,
      hasIcon: !!a.querySelector("svg.wa-icon"),
      oldCallBookBar: oldBar.length,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    });
  })()`, returnByValue: true });
  console.log("BASE", base.result.value);

  // Pulse detection — sample .wa-body scale + ring opacity for 7s, then 1s settle
  const pulse = await cdp.send("Runtime.evaluate", { awaitPromise: true, expression: `(async () => {
    const body = document.querySelector(".wa-cta .wa-body");
    let maxScale = 1, maxRing = 0, samples = 0;
    const t0 = performance.now();
    while (performance.now() - t0 < 7000) {
      const cs = getComputedStyle(body);
      const m = new DOMMatrixReadOnly(cs.transform === "none" ? "" : cs.transform);
      maxScale = Math.max(maxScale, m.a);
      maxRing = Math.max(maxRing, parseFloat(getComputedStyle(body, "::after").opacity));
      samples++;
      await new Promise(res => setTimeout(res, 60));
    }
    let endScale = 1;
    const t1 = performance.now();
    while (performance.now() - t1 < 1000) {
      const cs = getComputedStyle(body);
      const m = new DOMMatrixReadOnly(cs.transform === "none" ? "" : cs.transform);
      endScale = Math.max(endScale, m.a);
      await new Promise(res => setTimeout(res, 60));
    }
    return JSON.stringify({ samples, maxScale: +maxScale.toFixed(3), maxRing: +maxRing.toFixed(2), settledScale: +endScale.toFixed(3) });
  })()`, returnByValue: true });
  console.log("PULSE", pulse.result.value);
  await shot("wa-desktop-rest");

  // Hover — real mouse move onto the pill
  const rect = await cdp.send("Runtime.evaluate", { expression: `JSON.stringify(document.querySelector(".wa-cta").getBoundingClientRect())`, returnByValue: true });
  const r = JSON.parse(rect.result.value);
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) });
  await sleep(400);
  const hover = await cdp.send("Runtime.evaluate", { expression: `(() => {
    const a = document.querySelector(".wa-cta");
    const body = a.querySelector(".wa-body");
    return JSON.stringify({
      transform: getComputedStyle(a).transform,
      bg: getComputedStyle(body).backgroundColor,
      anim: getComputedStyle(body).animationName,
      tip: getComputedStyle(a.querySelector(".wa-tip")).opacity,
    });
  })()`, returnByValue: true });
  console.log("HOVER", hover.result.value);
  await shot("wa-desktop-hover");
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 10, y: 10 });

  // Focus — keyboard focus ring + pulse suppression
  await cdp.send("Runtime.evaluate", { expression: `document.querySelector(".wa-cta").focus()` });
  await sleep(250);
  const focus = await cdp.send("Runtime.evaluate", { expression: `(() => {
    const a = document.querySelector(".wa-cta");
    const body = a.querySelector(".wa-body");
    return JSON.stringify({
      isFocused: document.activeElement === a,
      outline: getComputedStyle(a).outlineWidth + " " + getComputedStyle(a).outlineColor,
      anim: getComputedStyle(body).animationName,
      tip: getComputedStyle(a.querySelector(".wa-tip")).opacity,
    });
  })()`, returnByValue: true });
  console.log("FOCUS", focus.result.value);

  // ── Mobile 390×844 ──
  await load(390, 844, true);
  const mob = await cdp.send("Runtime.evaluate", { expression: `(() => {
    const a = document.querySelector(".wa-cta");
    const body = a.querySelector(".wa-body");
    const acs = getComputedStyle(a);
    return JSON.stringify({
      height: getComputedStyle(body).height, right: acs.right, bottom: acs.bottom,
      touchTargetOk: a.getBoundingClientRect().width >= 44 && a.getBoundingClientRect().height >= 44,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      oldBarGone: ![...document.querySelectorAll(".fixed")].some(el => el.textContent.includes("Call the Clinic")),
    });
  })()`, returnByValue: true });
  console.log("MOBILE", mob.result.value);
  await shot("wa-mobile");

  // ── Reduced motion 1440×800 ──
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 800, deviceScaleFactor: 1, mobile: false });
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await cdp.send("Page.navigate", { url: "http://localhost:3210" });
  await sleep(3000);
  const rm = await cdp.send("Runtime.evaluate", { expression: `(() => {
    const a = document.querySelector(".wa-cta");
    const body = a.querySelector(".wa-body");
    return JSON.stringify({
      present: !!a,
      bodyAnim: getComputedStyle(body).animationName,
      ringOpacity: getComputedStyle(body, "::after").opacity,
      opacity: getComputedStyle(a).opacity,
      href: a.href,
    });
  })()`, returnByValue: true });
  console.log("REDUCED-MOTION", rm.result.value);
  await shot("wa-reduced");

  await cdp.ws.close();
  console.log("DONE");
})().catch((e) => { console.error("FATAL", e); process.exit(1); });