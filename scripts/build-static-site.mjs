/**
 * Build the marketing site as static HTML/CSS/JS (same as Vercel UI).
 * Temporarily moves API/Studio routes aside (not compatible with output: export).
 * Output: ./static-site-deploy/ and Desktop/universe-security-site.zip
 */
import { cp, mkdir, rename, rm, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frontend = path.join(root, "app", "(frontend)");
const stashRoot = path.join(root, ".static-export-stash");
const outDir = path.join(root, "static-site-deploy");
const nextOut = path.join(root, "out");

const payloadApp = path.join(root, "app", "(payload)");

const moves = [
  { from: path.join(frontend, "api"), name: "api" },
  { from: path.join(frontend, "studio"), name: "studio" },
  { from: path.join(frontend, "cms-admin"), name: "cms-admin" },
  { from: payloadApp, name: "payload-app" },
  { from: path.join(frontend, "icon.tsx"), name: "icon.tsx", isFile: true },
  { from: path.join(frontend, "opengraph-image.tsx"), name: "opengraph-image.tsx", isFile: true },
];

async function stashRoutes() {
  await mkdir(stashRoot, { recursive: true });
  for (const move of moves) {
    const { from, name, isFile } = move;
    const to = path.join(stashRoot, name);
    try {
      await rm(to, { recursive: true, force: true });
      await rename(from, to);
      console.log(`Stashed ${name}${isFile ? "" : "/"}`);
    } catch (err) {
      if (err && typeof err === "object" && "code" in err && err.code === "ENOENT") {
        console.warn(`Skip stash (missing): ${from}`);
      } else {
        throw err;
      }
    }
  }
}

async function restoreRoutes() {
  for (const move of moves) {
    const { from, name, isFile } = move;
    const fromStash = path.join(stashRoot, name);
    try {
      await rm(from, { recursive: true, force: true });
      await rename(fromStash, from);
      console.log(`Restored ${name}${isFile ? "" : "/"}`);
    } catch {
      /* already restored */
    }
  }
  await rm(stashRoot, { recursive: true, force: true });
}

const htaccess = `# Universe Security — static export (Apache)
DirectoryIndex index.html
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
`;

const env = {
  ...process.env,
  DEPLOY_TARGET: "godaddy-shared",
  NEXT_PUBLIC_FORMS_MODE: "mailto",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://universe-security.org",
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || "https://universe-security.org",
};

try {
  await stashRoutes();
  console.log("Building Next.js static export (Vercel-identical UI)…");
  execSync("npx next build", { cwd: root, stdio: "inherit", env });

  await rm(outDir, { recursive: true, force: true });
  await cp(nextOut, outDir, { recursive: true });
  await writeFile(path.join(outDir, ".htaccess"), htaccess, "utf8");
  await writeFile(
    path.join(outDir, "README-UPLOAD.txt"),
    `Universe Security — static site (matches Vercel design)
Generated: ${new Date().toISOString()}

Upload ALL files in this folder to public_html/
No npm or Node required on the server.
`,
    "utf8"
  );

  const desktop = path.join(os.homedir(), "Desktop", "universe-security-site.zip");
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
} finally {
  await restoreRoutes();
}

console.log("Done.");
