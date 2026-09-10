/* QA for the VisitSection location-block upgrade (dev tooling only).
   Checks: console errors, horizontal overflow, ExperienceMedia layers,
   map iframe presence, visit notes, wash; captures #location screenshots
   at three viewports. */
const { spawn } = require("child_process");
const { CDP, getJson, sleep } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9223; // must match CDP_PORT in visual-qa.cjs (used by CDP.connect)
const URL = "http://localhost:3100/#location";
const OUT = path.join(process.env.TEMP || "/tmp", "gcqa");
fs.mkdirSync(OUT, { recursive: true });

async function waitForChrome() {
  for (let i = 0; i < 40; i++) {
    try {
      return await getJson(`http://127.0.0.1:${PORT}/json`);
    } catch (_) {
      await sleep(250);
    }
  }
  throw new Error("Chrome DevTools endpoint never came up");
}

async function runViewport(cdp, width, height, name) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width, height, deviceScaleFactor: 1, mobile: width < 768,
  });
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await cdp.send("Page.navigate", { url: URL });
  await sleep(4500); // hydration + images + lazy map embed

  const checks = await cdp.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const section = document.getElementById('visit');
      const location = document.getElementById('location');
      if (!location) return { error: 'no #location' };
      location.scrollIntoView();
      const doc = document.documentElement;
      const imgs = [...location.querySelectorAll('img')];
      const iframe = location.querySelector('iframe');
      return {
        overflowX: doc.scrollWidth - doc.clientWidth,
        imgsLoaded: imgs.length > 0 && imgs.every((i) => i.complete && i.naturalWidth > 0),
        hasEchoFrame: !!location.querySelector('.explainer-frame'),
        hasChip: !!location.querySelector('.explainer-chip'),
        chipText: location.querySelector('.explainer-chip')?.textContent.trim() || null,
        hasMapIframe: !!iframe,
        mapLazy: iframe?.getAttribute('loading') === 'lazy',
        mapTitled: !!iframe?.getAttribute('title'),
        visitNotes: [...location.querySelectorAll('ul li')].map((li) => li.textContent.trim()),
        noteIcons: location.querySelectorAll('ul li svg').length,
        hasWash: !!location.querySelector('.gc-radial-wash'),
        ctaCount: location.querySelectorAll('a[href*="maps"], a[href^="tel:"], a[href*="appointment"], a[href*="book"]').length,
        stepsGrid: section.querySelectorAll('ol li').length,
      };
    })()`,
  });
  console.log(`[${name}]`, JSON.stringify(checks.result.value, null, 2));

  await sleep(800);
  const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(OUT, `visit-rev-${name}.png`), Buffer.from(shot.data, "base64"));
  console.log(`[${name}] screenshot saved`);
}

(async () => {
  const chrome = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`, "--window-size=1440,2400", "about:blank",
  ], { stdio: "ignore" });

  try {
    await waitForChrome();
    const cdp = await CDP.connect();
    cdp.listen();

    const errors = [];
    cdp.ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
        errors.push(msg.params.entry.text);
      }
      if (msg.method === "Runtime.exceptionThrown") {
        errors.push(msg.params.exceptionDetails.text || "exception");
      }
    });

    await runViewport(cdp, 1440, 2400, "1440");
    await runViewport(cdp, 768, 2600, "768");
    await runViewport(cdp, 390, 3200, "390");

    console.log("console errors:", errors.length ? errors : "none");
  } finally {
    chrome.kill();
  }
})();
