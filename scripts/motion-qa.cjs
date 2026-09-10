/* Motion QA — full-page scroll pass against the running dev server (3000).
 * Checks: console errors, horizontal overflow, reveal arming, one-shot
 * reveals (no replay), scroll progress bar, reduced-motion collapse,
 * and renders screenshots at the canonical QA viewports. Dev tooling only. */
const { CDP, sleep } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");

const URL_BASE = process.env.GC_QA_URL || "http://localhost:3000";
const OUT = process.argv[2] || path.join(process.env.TEMP || "/tmp", "gcmotionqa");
const VIEWPORTS = [
  [1920, 1080], [1440, 800], [1280, 720], [1024, 768], [768, 1024], [390, 844],
];

async function scrollPass(cdp) {
  // Disable smooth scrolling for the QA pass — programmatic scrollTo with
  // html{scroll-behavior:smooth} animates asynchronously and never catches
  // up across rapid steps (real wheel/touch scrolling is unaffected).
  // awaitPromise is required: without it CDP returns before the steps finish.
  await cdp.send("Runtime.evaluate", { awaitPromise: true, expression: `(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const step = Math.floor(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 900));
  })()` });
  await sleep(800);
}

function countersExpr() {
  return `(() => {
    const doc = document.documentElement;
    const reveals = [...document.querySelectorAll(".gc-reveal")];
    const groups = [...document.querySelectorAll(".gc-reveal-group")];
    const vis = (el) => el.classList.contains("is-visible");
    const bar = document.querySelector(".gc-progress-bar");
    return JSON.stringify({
      viewport: window.innerWidth + "x" + window.innerHeight,
      horizontalOverflow: doc.scrollWidth > window.innerWidth + 1,
      armed: doc.classList.contains("gc-motion-armed"),
      reveals: reveals.length,
      revealsVisible: reveals.filter(vis).length,
      groups: groups.length,
      groupsVisible: groups.filter(vis).length,
      progressBar: !!bar,
      progressBarTransform: bar ? getComputedStyle(bar).transform : "n/a",
    });
  })()`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const cdp = await CDP.connect();
  cdp.ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && cdp.pending.has(msg.id)) {
      const { resolve, reject } = cdp.pending.get(msg.id);
      cdp.pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    } else if (msg.method === "Runtime.exceptionThrown") {
      console.log("EXCEPTION", JSON.stringify(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text).slice(0, 200));
    }
  };
  await cdp.send("Runtime.enable");
  await cdp.send("Page.enable");
  // Pre-dismiss the mid-page ContactDialog (triggers at ~50% scroll with a
  // body scroll-lock) so the automated full-page pass is unobstructed.
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source: "try{sessionStorage.setItem('gc-dental-world-contact-dialog-dismissed','true')}catch(e){}",
  });

  for (const [w, h] of VIEWPORTS) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: w, height: h, deviceScaleFactor: 1, mobile: w < 768,
    });
    await cdp.send("Page.navigate", { url: URL_BASE });
    await sleep(3500);
    await scrollPass(cdp);

    const report = await cdp.send("Runtime.evaluate", { expression: countersExpr(), returnByValue: true });
    console.log("PASS", report.result.value);

    // One-shot check: rewind to top, scroll down again — reveals must persist.
    await cdp.send("Runtime.evaluate", { awaitPromise: true, expression: `(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 700));
      const step = Math.floor(window.innerHeight * 0.8);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 80));
      }
      await new Promise(r => setTimeout(r, 500));
    })()` });
    const oneshot = await cdp.send("Runtime.evaluate", { expression: `(() => {
      const vis = (el) => el.classList.contains("is-visible");
      return JSON.stringify({
        revealsVisibleAfterRewind: document.querySelectorAll(".gc-reveal.is-visible").length,
        groupsVisibleAfterRewind: document.querySelectorAll(".gc-reveal-group.is-visible").length,
        reveals: document.querySelectorAll(".gc-reveal").length,
        groups: document.querySelectorAll(".gc-reveal-group").length,
      });
    })()`, returnByValue: true });
    console.log("ONESHOT", oneshot.result.value);

    const shot = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 60 });
    fs.writeFileSync(path.join(OUT, `motion-${w}x${h}.jpg`), Buffer.from(shot.data, "base64"));
  }

  // Reduced-motion emulation: everything must settle visible immediately.
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 800, deviceScaleFactor: 1, mobile: false });
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await cdp.send("Page.navigate", { url: URL_BASE });
  await sleep(3500);
  const rm = await cdp.send("Runtime.evaluate", { expression: `(() => {
    const reveals = [...document.querySelectorAll(".gc-reveal")];
    const groups = [...document.querySelectorAll(".gc-reveal-group")];
    const bar = document.querySelector(".gc-progress-bar");
    return JSON.stringify({
      armed: document.documentElement.classList.contains("gc-motion-armed"),
      reveals: reveals.length,
      revealsVisible: reveals.filter(el => el.classList.contains("is-visible")).length,
      hiddenReveals: reveals.filter(el => getComputedStyle(el).opacity === "0").length,
      groups: groups.length,
      hiddenGroupChildren: groups.filter(g => getComputedStyle(g.firstElementChild || g).opacity === "0").length,
      progressBarTransform: bar ? getComputedStyle(bar).transform : "n/a",
    });
  })()`, returnByValue: true });
  console.log("REDUCED-MOTION", rm.result.value);
  const shot = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 60 });
  fs.writeFileSync(path.join(OUT, "motion-reduced-1440x800.jpg"), Buffer.from(shot.data, "base64"));

  await cdp.ws.close();
  console.log("DONE");
})().catch((e) => { console.error("FATAL", e); process.exit(1); });