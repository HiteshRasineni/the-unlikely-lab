import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  getAllNotes,
  getNote,
  getResearch,
  type NoteFrontmatter,
} from "@/lib/content";
import { mdxComponents } from "@/components/MdxComponents";
import NoteHeader from "@/components/NoteHeader";
import RelatedResearch from "@/components/RelatedResearch";

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getNote(slug);
  if (!doc) return {};
  return {
    title: doc.frontmatter.title,
    description:
      doc.frontmatter.description ??
      `${doc.frontmatter.title} — a note at The Unlikely Lab.`,
    openGraph: {
      title: `${doc.frontmatter.title} | The Unlikely Lab`,
      description: doc.frontmatter.description ?? "",
      type: "article",
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getNote(slug);
  if (!doc) notFound();
  const frontmatter = doc.frontmatter as NoteFrontmatter;

  const { content } = await compileMDX({
    source: doc.body,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    },
  });

  const related =
    frontmatter.relatedResearch
      ?.map((r) => getResearch(r.slug)?.frontmatter)
      .filter((f): f is NonNullable<typeof f> => Boolean(f)) ?? [];

  return (
    <article>
      <p className="mb-6 text-sm">
        <Link href="/notes">← All notes</Link>
      </p>
      <NoteHeader frontmatter={frontmatter} />
      <div className="mdx">{content}</div>
      <RelatedResearch related={related} />
    </article>
  );
}
