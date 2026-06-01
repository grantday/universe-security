/**
 * Build a self-contained folder for GoDaddy Node.js / VPS hosting.
 * Output: ./godaddy-deploy/ (upload this directory to your server)
 */
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "godaddy-deploy");
const standaloneDir = path.join(root, ".next", "standalone");

console.log("Building Next.js (standalone)…");
execSync("npm run build", { cwd: root, stdio: "inherit", env: { ...process.env, NODE_ENV: "production" } });

console.log("Packaging godaddy-deploy/…");
await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await cp(standaloneDir, outDir, { recursive: true });
await cp(path.join(root, "public"), path.join(outDir, "public"), { recursive: true });
await mkdir(path.join(outDir, ".next"), { recursive: true });
await cp(path.join(root, ".next", "static"), path.join(outDir, ".next", "static"), { recursive: true });

await cp(path.join(root, "deploy", "godaddy", "start.cjs"), path.join(outDir, "start.cjs"));
await cp(path.join(root, "deploy", "godaddy", "ecosystem.config.cjs"), path.join(outDir, "ecosystem.config.cjs"));
await cp(path.join(root, "deploy", "godaddy", ".env.example"), path.join(outDir, ".env.example"));
await mkdir(path.join(outDir, "content"), { recursive: true });
await cp(path.join(root, "content", "site-content.json"), path.join(outDir, "content", "site-content.json"));

await writeFile(
  path.join(outDir, "README-DEPLOY.txt"),
  `Universe Security — GoDaddy deploy bundle
Generated: ${new Date().toISOString()}

1. Upload this entire folder to your hosting account (e.g. ~/universe-security).
2. Copy .env.example to .env and fill in values (or set env vars in cPanel).
3. Startup command: node start.cjs
4. See deploy/godaddy/README.md in the Git repo for full steps.

Required env: PAYLOAD_SECRET, DATABASE_URI, NEXT_PUBLIC_SITE_URL, RESEND_* (for forms).
`,
  "utf8",
);

console.log(`\nDone. Upload the folder:\n  ${outDir}\n`);
