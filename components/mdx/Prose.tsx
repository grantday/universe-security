import type { ComponentPropsWithoutRef } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="font-display text-3xl font-bold text-brand-900" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 font-display text-2xl font-bold text-brand-900" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 font-display text-xl font-bold text-brand-900" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="mt-4 leading-relaxed text-slate-700" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="leading-relaxed" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="font-semibold text-brand-700 underline-offset-2 hover:underline" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-brand-900" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-4 border-brand-500 bg-brand-50/60 py-2 pl-4 text-slate-700"
      {...props}
    />
  ),
};

export function ProseMdx({ source }: { source: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
