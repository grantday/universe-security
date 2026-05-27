import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

/** Convert plain text (supports ## headings and - bullets) to Lexical JSON for Payload. */
export function textToLexical(text: string): SerializedEditorState {
  const blocks = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    root: {
      children: blocks.map((line) => {
        const isHeading = line.startsWith("## ");
        const textContent = isHeading ? line.replace(/^##+\s*/, "") : line.replace(/^-\s+/, "• ");
        return {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: textContent,
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: isHeading ? "heading" : "paragraph",
          ...(isHeading ? { tag: "h2" } : {}),
          version: 1,
        };
      }),
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  } as SerializedEditorState;
}

/** Best-effort plain text extraction from Lexical JSON. */
export function lexicalToText(content: SerializedEditorState | null | undefined): string {
  const root = content?.root;
  if (!root?.children?.length) return "";

  return root.children
    .map((node) => {
      const n = node as { type?: string; children?: { text?: string }[]; tag?: string };
      const line = (n.children ?? []).map((c) => c.text ?? "").join("");
      if (!line) return "";
      if (n.type === "heading") return `## ${line}`;
      return line;
    })
    .filter(Boolean)
    .join("\n\n");
}
