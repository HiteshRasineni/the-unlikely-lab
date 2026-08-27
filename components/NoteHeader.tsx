import type { NoteFrontmatter } from "@/lib/content";

export default function NoteHeader({ frontmatter }: { frontmatter: NoteFrontmatter }) {
  return (
    <header className="mb-8">
      <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
        {frontmatter.category}
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-black sm:text-3xl">
        {frontmatter.title}
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600">
        <time dateTime={frontmatter.date}>{frontmatter.date}</time>
        <span aria-hidden="true">·</span>
        <span className="flex flex-wrap gap-x-2">
          {frontmatter.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs">
              {tag}
            </span>
          ))}
        </span>
      </div>
    </header>
  );
}
