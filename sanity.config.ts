import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "universe-security",
  title: "Universe Security",
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/studio",
  apiVersion,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
