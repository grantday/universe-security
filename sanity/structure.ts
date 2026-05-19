import type { StructureResolver } from "sanity/structure";

const singletons = ["siteSettings", "homeHero"] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Home hero")
        .id("homeHero")
        .child(S.document().schemaType("homeHero").documentId("homeHero")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !singletons.includes(id as (typeof singletons)[number]) : true;
      }),
    ]);
