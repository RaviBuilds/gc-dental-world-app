/* QA for the header/logo/nav revision (dev tooling only).
   Checks: console errors, horizontal overflow, header nav = 5 expected labels,
   logo asset + rendered size, Call + Book CTAs in header, mobile menu = 5 items,
   footer explore links = 8; captures full-page screenshots at three viewports. */
const { spawn } = require("child_process");
const { CDP, getJson, sleep } = require("./visual-qa.cjs");
const fs = require("fs");
const path = require("path");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9223; // must match CDP_PORT in visual-qa.cjs (used by CDP.connect)
const SITE_PORT = 3000; // reuse the already-running dev server (Next 16 allows only one per project)
const URL = `http://localhost:${SITE_PORT}/`;
const OUT = path.join(process.env.TEMP || "/tmp", "gcqa");
fs.mkdirSync(OUT, { recursive: true });

const EXPECTED_NAV = [
  "Home",
  "Dental Care",
  "Treatments",
  "Smile Stories",
  "Patient Experience",
];

async function waitFor(url, tries, delay) {
  const http = require("http");
  const pingOnce = () =>
    new Promise((resolve, reject) => {
      const req = http.get(url, (res) => {
        res.resume(); // any response counts as "up"
        resolve(res.statusCode);
      });
      req.on("error", reject);
      req.setTimeout(2000, () => {
        req.destroy();
        reject(new Error("timeout"));
      });
    });
  for (let i = 0; i < tries; i++) {
    try {
      return await pingOnce();
    } catch (_) {
      await sleep(delay);
    }
  }
  throw new Error(`never came up: ${url}`);
}

async function runViewport(cdp, width, height, name) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width, height, deviceScaleFactor: 1, mobile: width < 768,
  });
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await cdp.send("Page.navigate", { url: URL });
  await sleep(3500); // hydration + images

  const checks = await cdp.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const header = document.querySelector('header');
      const doc = document.documentElement;
      const desktopNav = header.querySelector('nav[aria-label="Primary"] ul');
      const logo = header.querySelector('img[alt="GC Dental World logo"]');
      const chip = logo ? logo.parentElement : null;
      const logoBox = logo ? logo.getBoundingClientRect() : null;
      const chipBox = chip ? chip.getBoundingClientRect() : null;
      const menuBtn = header.querySelector('button[aria-controls="mobile-menu"]');
      return {
        overflowX: doc.scrollWidth - doc.clientWidth,
        desktopNavVisible: desktopNav ? getComputedStyle(desktopNav.closest('nav')).display !== 'none' : false,
        desktopNavLabels: desktopNav
          ? [...desktopNav.querySelectorAll('a')].map((a) => a.textContent.trim())
          : [],
        logoLoaded: !!logo && logo.complete && logo.naturalWidth > 0,
        logoNatural: logo ? [logo.naturalWidth, logo.naturalHeight] : null,
        logoRendered: logoBox ? Math.round(logoBox.height) : null,
        chipHeight: chipBox ? Math.round(chipBox.height) : null,
        headerCallCta: !!header.querySelector('a[href^="tel:"]'),
        headerBookCta: !!header.querySelector('a[href="#contact"]'),
        hamburgerVisible: menuBtn ? getComputedStyle(menuBtn).display !== 'none' : false,
      };
    })()`,
  });
  console.log(`[${name}]`, JSON.stringify(checks.result.value, null, 2));

  // Mobile menu item check (only when the hamburger is the nav UI)
  if (width < 1280) {
    const openMenu = await cdp.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const btn = document.querySelector('header button[aria-controls="mobile-menu"]');
        btn.click();
        const menu = document.getElementById('mobile-menu');
        return [...menu.querySelectorAll('nav a')].map((a) => a.textContent.trim());
      })()`,
    });
    console.log(`[${name}] mobile menu items:`, JSON.stringify(openMenu.result.value));
    // close it again so the screenshot shows the resting header
    await cdp.send("Runtime.evaluate", {
      expression: `document.querySelector('header button[aria-controls="mobile-menu"]').click()`,
    });
    await sleep(400);
  }

  // Footer explore-link count
  const footer = await cdp.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const nav = document.querySelector('footer nav[aria-label="Footer"]');
      return [...nav.querySelectorAll('a')].map((a) => a.textContent.trim());
    })()`,
  });
  console.log(`[${name}] footer links:`, JSON.stringify(footer.result.value));

  await sleep(800);
  const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(OUT, `header-rev-${name}.png`), Buffer.from(shot.data, "base64"));
  console.log(`[${name}] screenshot saved`);
}

(async () => {
  const chrome = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`, "--window-size=1440,2400", "about:blank",
  ], { stdio: "ignore" });

  try {
    await waitFor(`http://localhost:${SITE_PORT}/`, 80, 500); // dev server cold start
    await waitFor(`http://127.0.0.1:${PORT}/json`, 40, 250);
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

    await runViewport(cdp, 1440, 900, "1440");
    await runViewport(cdp, 768, 1024, "768");
    await runViewport(cdp, 390, 844, "390");

    console.log("console errors:", errors.length ? errors : "none");
    console.log(`expected header nav: ${EXPECTED_NAV.join(", ")}`);
  } finally {
    chrome.kill();
  }
})();
