/**
 * Sync content, package deploy/php-static for upload (PHP + JS + AJAX).
 * Output: ./php-static-deploy/ and Desktop/universe-security-php.zip
 */
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "deploy", "php-static");
const outDir = path.join(root, "php-static-deploy");
const brandSrc = path.join(root, "public", "brand", "universe-security-mark.svg");

console.log("Syncing content…");
execSync("node scripts/sync-php-content.mjs", { cwd: root, stdio: "inherit" });

console.log("Packaging PHP site…");
await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(src, outDir, { recursive: true });
await mkdir(path.join(outDir, "assets", "img"), { recursive: true });
try {
  await cp(brandSrc, path.join(outDir, "assets", "img", "mark.svg"));
} catch {
  console.warn("Brand SVG not copied (optional).");
}

await writeFile(
  path.join(outDir, "README-UPLOAD.txt"),
  `Universe Security — PHP site
Generated: ${new Date().toISOString()}

Upload ALL files to public_html/ (document root).

Deploy via SSH: npm run deploy:php-ssh (after configuring deploy/php-static/.env.deploy)

See deploy/php-static/README.md
`,
  "utf8"
);

const desktop = path.join(os.homedir(), "Desktop", "universe-security-php.zip");
if (process.platform === "win32") {
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${outDir.replace(/'/g, "''")}\\*' -DestinationPath '${desktop.replace(/'/g, "''")}' -Force"`,
    { stdio: "inherit" }
  );
} else {
  execSync(`cd "${outDir}" && zip -r "${desktop}" .`, { stdio: "inherit" });
}
console.log(`Zip: ${desktop}`);
console.log(`Folder: ${outDir}`);
console.log("Done.");
