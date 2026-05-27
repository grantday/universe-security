import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { ClientLogos } from "./collections/ClientLogos";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { Media } from "./collections/Media";
import { ControlCentreSteps } from "./collections/ControlCentreSteps";
import { Industries } from "./collections/Industries";
import { Insights } from "./collections/Insights";
import { Metrics } from "./collections/Metrics";
import { Services } from "./collections/Services";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";
import { ValueProps } from "./collections/ValueProps";
import { CompanyPage } from "./globals/CompanyPage";
import { ContactPage } from "./globals/ContactPage";
import { ControlCentrePage } from "./globals/ControlCentrePage";
import { HomePage } from "./globals/HomePage";
import { SiteSettings } from "./globals/SiteSettings";
import { IndustriesPage } from "./globals/IndustriesPage";
import { SolutionsPage } from "./globals/SolutionsPage";
import { TechnologyPage } from "./globals/TechnologyPage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: "· Universe Security CMS" },
  },
  collections: [
    Users,
    Media,
    Services,
    Testimonials,
    Insights,
    ClientLogos,
    ValueProps,
    Metrics,
    ControlCentreSteps,
    Industries,
    ContactSubmissions,
  ],
  globals: [
    SiteSettings,
    HomePage,
    SolutionsPage,
    IndustriesPage,
    ControlCentrePage,
    CompanyPage,
    TechnologyPage,
    ContactPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URI || "file:./universe-security.db" } }),
  sharp,
});
