/**
 * Package deploy/php-static for upload to public_html (PHP shared hosting).
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

console.log("Packaging PHP static site…");
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
  `Universe Security — temporary PHP site
Generated: ${new Date().toISOString()}

Upload ALL files in this folder to public_html/ (or a subfolder).

1. cPanel File Manager → public_html → Upload → Extract zip
2. Ensure index.php is in the web root
3. Visit https://your-domain.org/
4. Contact form: needs PHP mail() OR saves to data/*.jsonl

See deploy/php-static/README.md in the Git repo.
`,
  "utf8"
);

const desktop = path.join(os.homedir(), "Desktop", "universe-security-php.zip");
const isWin = process.platform === "win32";
if (isWin) {
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${outDir.replace(/'/g, "''")}\\*' -DestinationPath '${desktop.replace(/'/g, "''")}' -Force"`,
    { stdio: "inherit" }
  );
  console.log(`Zip: ${desktop}`);
} else {
  execSync(`cd "${outDir}" && zip -r "${desktop}" .`, { stdio: "inherit" });
  console.log(`Zip: ${desktop}`);
}

console.log(`Folder: ${outDir}`);
console.log("Done.");
