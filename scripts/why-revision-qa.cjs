/* QA for the "Why" section revision (dev tooling only, not shipped).
   Checks: console errors, horizontal overflow, image loading, reveal
   visibility under reduced motion; captures #why screenshots at three
   viewports. */
const { spawn } = require("child_process");
const { CDP, getJson, sleep } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9223;
const URL = "http://localhost:3100/#why";
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
  await sleep(3500); // hydration + images + reduced-motion reveals

  const checks = await cdp.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const section = document.getElementById('why');
      if (!section) return { error: 'no #why' };
      section.scrollIntoView();
      const doc = document.documentElement;
      const imgs = [...section.querySelectorAll('img')];
      return {
        overflowX: doc.scrollWidth - doc.clientWidth,
        imgCount: imgs.length,
        imgsLoaded: imgs.every((i) => i.complete && i.naturalWidth > 0),
        revealsHidden: [...section.querySelectorAll('.gc-reveal')].filter(
          (r) => getComputedStyle(r).opacity === '0'
        ).length,
        hasEchoFrame: !!section.querySelector('.explainer-frame'),
        hasChip: !!section.querySelector('.explainer-chip'),
        hasGhost: !!section.querySelector('.proof-env'),
        hasWash: !!section.querySelector('.gc-radial-wash'),
        hasArcs: section.querySelectorAll('svg circle').length,
        exteriorHere: section.innerHTML.includes('gachibowli-clinic-building-exterior'),
        rating: section.textContent.includes('4.8'),
        reviewCount: section.textContent.includes('286'),
        chipText: section.querySelector('.explainer-chip')?.textContent.trim() || null,
      };
    })()`,
  });
  console.log(`[${name}]`, JSON.stringify(checks.result.value, null, 2));

  await sleep(600);
  const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(OUT, `why-rev-${name}.png`), Buffer.from(shot.data, "base64"));
  console.log(`[${name}] screenshot saved`);
}

(async () => {
  const chrome = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`, "--window-size=1440,2300", "about:blank",
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

    await runViewport(cdp, 1440, 2300, "1440");
    await runViewport(cdp, 768, 2200, "768");
    await runViewport(cdp, 390, 2600, "390");

    console.log("console errors:", errors.length ? errors : "none");
  } finally {
    chrome.kill();
  }
})();
