import Link from "next/link";
import type { ResearchFrontmatter } from "@/lib/content";

/** Links from a note to related research pages. */
export default function RelatedResearch({
  related,
}: {
  related?: ResearchFrontmatter[] | { slug: string; title: string }[];
}) {
  if (!related || related.length === 0) return null;
  return (
    <aside className="mt-10 border-t border-neutral-200 pt-5">
      <h2 className="text-base font-semibold">Related research</h2>
      <ul className="mt-2 list-disc pl-6 text-[15px] leading-7">
        {related.map((r) => (
          <li key={r.slug}>
            <Link href={`/research/${r.slug}`}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
