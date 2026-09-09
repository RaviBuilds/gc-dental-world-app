/* Zero-dependency CDP driver for rendered-page QA (dev tooling only, not shipped). */
const http = require("http");
const fs = require("fs");
const path = require("path");

const CDP_PORT = 9223;
const OUT = process.argv[2] || path.join(process.env.TEMP || "/tmp", "gcqa");
const URL_BASE = "http://localhost:3111";

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } });
    }).on("error", reject);
  });
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); }
  static async connect() {
    const targets = await getJson(`http://127.0.0.1:${CDP_PORT}/json`);
    let page = targets.find((t) => t.type === "page");
    if (!page) page = await getJson(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`);
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      ws.onopen = () => resolve(new CDP(ws));
      ws.onerror = reject;
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  listen() {
    this.ws.onmessage = (m) => {
      const msg = JSON.parse(m.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      }
    };
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = { CDP, getJson, sleep, OUT, URL_BASE };
