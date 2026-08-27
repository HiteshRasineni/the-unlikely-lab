import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ResearchFrontmatter = {
  title: string;
  slug: string;
  description: string;
  tags?: string[];
  codeUrl?: string;
  dataUrl?: string;
  publication?: {
    title?: string;
    authors?: string[];
    journal?: string;
    doi?: string;
    preprint?: string;
    pdf?: string;
  };
};

export type NoteFrontmatter = {
  title: string;
  slug: string;
  category: string;
  date: string;
  tags: string[];
  description?: string;
  relatedResearch?: { slug: string; title: string }[];
};

function readFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

/** Research notes live at content/research/<slug>/index.mdx */
export function getResearchSlugs(): string[] {
  const root = path.join(CONTENT_ROOT, "research");
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getResearch(slug: string): {
  frontmatter: ResearchFrontmatter;
  body: string;
} | null {
  const file = path.join(CONTENT_ROOT, "research", slug, "index.mdx");
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    frontmatter: { ...(data as ResearchFrontmatter), slug },
    body: content,
  };
}

export function getAllResearch(): ResearchFrontmatter[] {
  return getResearchSlugs()
    .map((s) => getResearch(s)?.frontmatter)
    .filter((f): f is ResearchFrontmatter => Boolean(f))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getNoteSlugs(): string[] {
  return readFiles(path.join(CONTENT_ROOT, "notes")).map(
    (f) => path.basename(f, path.extname(f))
  );
}

export function getNote(slug: string): {
  frontmatter: NoteFrontmatter;
  body: string;
} | null {
  const candidates = [
    path.join(CONTENT_ROOT, "notes", `${slug}.mdx`),
    path.join(CONTENT_ROOT, "notes", `${slug}.md`),
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);
      return {
        frontmatter: { ...(data as NoteFrontmatter), slug },
        body: content,
      };
    }
  }
  return null;
}

const CATEGORY_ORDER = [
  "Physics",
  "Mathematics",
  "Machine Learning",
  "Statistics",
  "Density Estimation",
  "Research Notes",
  "Technical Notes",
];

export function getAllNotes(): NoteFrontmatter[] {
  return getNoteSlugs()
    .map((s) => getNote(s)?.frontmatter)
    .filter((f): f is NoteFrontmatter => Boolean(f));
}

export function groupNotesByCategory(): {
  category: string;
  notes: NoteFrontmatter[];
}[] {
  const all = getAllNotes();
  const map = new Map<string, NoteFrontmatter[]>();
  for (const note of all) {
    const list = map.get(note.category) ?? [];
    list.push(note);
    map.set(note.category, list);
  }
  const categories = [...map.keys()].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });
  return categories.map((category) => ({
    category,
    notes: (map.get(category) ?? []).sort((a, b) =>
      b.date.localeCompare(a.date)
    ),
  }));
}
