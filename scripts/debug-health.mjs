/**
 * Quick local health check — run: node scripts/debug-health.mjs
 * Requires dev server on http://localhost:3000 and ADMIN_PASSWORD in .env.local
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
const pass = process.env.ADMIN_PASSWORD;

async function check(path, opts = {}) {
  const url = `${base}${path}`;
  const start = Date.now();
  const res = await fetch(url, opts);
  const ms = Date.now() - start;
  return { path, status: res.status, ms, ok: res.ok };
}

const results = [];

for (const path of ["/", "/sitemap.xml", "/robots.txt", "/insights", "/studio/login"]) {
  results.push(await check(path));
}

if (pass) {
  const login = await fetch(`${base}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: pass }),
  });
  const cookie = login.headers.get("set-cookie")?.split(";")[0] ?? "";
  results.push({ path: "POST /api/admin/login", status: login.status, ms: 0, ok: login.ok });
  if (login.ok && cookie) {
    const dash = await check("/api/studio/dashboard", { headers: { cookie } });
    results.push(dash);
    const dashRes = await fetch(`${base}/api/studio/dashboard`, { headers: { cookie } });
    const dashJson = await dashRes.json();
    console.log("\nSEO score:", dashJson.seo?.score);
    console.log("Hero slides:", dashJson.content?.heroSlides);
    console.log("Site URL in analysis:", dashJson.seo?.siteUrl);
  }
} else {
  console.warn("\nSkipping authenticated checks — set ADMIN_PASSWORD in .env.local");
}

console.log("\n--- Health check ---");
for (const r of results) {
  console.log(`${r.ok ? "OK" : "FAIL"} ${r.path} ${r.status}${r.ms ? ` ${r.ms}ms` : ""}`);
}

const html = await (await fetch(`${base}/`)).text();
const checks = [
  ["JSON-LD", /application\/ld\+json/.test(html)],
  ["canonical", /rel="canonical"/.test(html)],
  ["og:description", /og:description/.test(html)],
  ["og:image", /og:image/.test(html)],
];
console.log("\n--- Homepage SEO tags ---");
for (const [name, ok] of checks) {
  const note = name === "og:image" && !ok ? " (add OG image in Studio → Site & SEO)" : "";
  console.log(`${ok ? "OK" : "WARN"} ${name}${note}`);
}
