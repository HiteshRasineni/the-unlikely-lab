import type { ResearchFrontmatter } from "@/lib/content";

export default function ResearchHeader({
  frontmatter,
}: {
  frontmatter: ResearchFrontmatter;
}) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl leading-snug font-semibold text-black sm:text-3xl">
        {frontmatter.title}
      </h1>
      {frontmatter.description && (
        <p className="mt-3 max-w-prose text-[16px] text-neutral-700">
          {frontmatter.description}
        </p>
      )}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1" aria-label="Keywords">
          {frontmatter.tags.map((tag) => (
            <li
              key={tag}
              className="border border-neutral-300 px-2 py-0.5 font-mono text-xs text-neutral-700"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
