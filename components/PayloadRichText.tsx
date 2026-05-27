import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export function PayloadRichText({ content }: { content: SerializedEditorState | null | undefined }) {
  if (!content) return null;
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-brand-900 prose-a:text-brand-700">
      <RichText data={content} />
    </div>
  );
}
