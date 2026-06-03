/**
 * Sync content into deploy/php-static/content/ for the PHP site.
 */
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "deploy", "php-static", "content");
const insightsSrc = path.join(root, "content", "insights");

const controlCentreSteps = [
  { title: "Alarm", body: "Intrusion or panic signal received and prioritised.", icon: "radio" },
  { title: "Control Room", body: "Operator validates the event and opens an incident.", icon: "building2" },
  { title: "Dispatch", body: "Nearest response unit is assigned with GPS routing.", icon: "radio" },
  { title: "Response", body: "On-site team secures the location and reports back.", icon: "truck" },
  { title: "Resolution", body: "Incident closed with client notification and audit log.", icon: "check" },
];

const clientLogos = [
  "Logistics & warehousing",
  "Retail & malls",
  "Residential estates",
  "Healthcare facilities",
  "Corporate campuses",
  "Events & venues",
];

const certifications = {
  heading: "Licensed, insured, and audit-ready",
  items: [
    { title: "PSIRA registered", body: "Guarding and response services under national private security regulation." },
    { title: "ISO-aligned operations", body: "Documented SOPs, incident logs, and client reporting." },
    { title: "Fully insured", body: "Public liability and professional indemnity for deployed teams." },
  ],
};

const footerColumns = {
  about: {
    title: "About",
    links: [
      { href: "/company", label: "Company" },
      { href: "/contact", label: "Contact" },
    ],
  },
  solutions: {
    title: "Solutions",
    links: [
      { href: "/solutions#home", label: "Home Security" },
      { href: "/solutions#business", label: "Business Security" },
      { href: "/solutions#industrial", label: "Industrial Security" },
      { href: "/solutions#specialised", label: "Specialised" },
    ],
  },
  industries: {
    title: "Industries",
    links: [
      { href: "/industries", label: "All industries" },
      { href: "/control-centre", label: "Control Centre" },
      { href: "/technology", label: "Technology" },
    ],
  },
  shop: {
    title: "Shop",
    links: [{ href: "/store", label: "Online Store" }],
  },
  legal: {
    title: "Legal & insights",
    links: [
      { href: "/insights", label: "Insights" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/credits", label: "Image credits" },
      { href: "/contact", label: "Emergency contact" },
    ],
  },
};

function mdToHtml(md) {
  const lines = md.trim().split("\n");
  const parts = [];
  let inList = false;
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      if (inList) {
        parts.push("</ul>");
        inList = false;
      }
      continue;
    }
    if (t.startsWith("## ")) {
      if (inList) {
        parts.push("</ul>");
        inList = false;
      }
      parts.push(`<h2>${escapeHtml(t.slice(3))}</h2>`);
      continue;
    }
    if (t.startsWith("- ")) {
      if (!inList) {
        parts.push("<ul>");
        inList = true;
      }
      parts.push(`<li>${escapeHtml(t.slice(2))}</li>`);
      continue;
    }
    if (inList) {
      parts.push("</ul>");
      inList = false;
    }
    parts.push(`<p>${escapeHtml(t)}</p>`);
  }
  if (inList) parts.push("</ul>");
  return parts.join("\n");
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function loadInsights() {
  const articles = [];
  let files = [];
  try {
    files = (await readdir(insightsSrc)).filter((f) => f.endsWith(".mdx"));
  } catch {
    return articles;
  }
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = await readFile(path.join(insightsSrc, file), "utf8");
    const { data, content } = matter(raw);
    articles.push({
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      publishedAt: data.date ?? new Date().toISOString().slice(0, 10),
      html: mdToHtml(content),
    });
  }
  articles.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return articles;
}

await mkdir(outDir, { recursive: true });
await cp(path.join(root, "content", "site-content.json"), path.join(outDir, "site-content.json"));

const insights = await loadInsights();
await writeFile(path.join(outDir, "insights.json"), JSON.stringify(insights, null, 2));

await writeFile(
  path.join(outDir, "extras.json"),
  JSON.stringify({ controlCentreSteps, clientLogos, certifications, footerColumns }, null, 2)
);

console.log(`Synced PHP content → ${outDir} (${insights.length} insights)`);
