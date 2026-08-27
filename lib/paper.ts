import fs from "fs";
import path from "path";

export type PaperAuthor = {
  name: string;
  dagger?: boolean;
  affilNums: string[];
  orcid: string | null;
};

export type PaperTOCEntry = { id: string; text: string; level: 2 | 3 };

export type PaperManifest = {
  slug: string;
  sourceUpdatedAt: string;
  title: string;
  authors: PaperAuthor[];
  affiliations: { num: string; text: string }[];
  correspondingEmail: string | null;
  equalContribution?: boolean;
  toc: PaperTOCEntry[];
  counts: {
    sections: number;
    subsections: number;
    figures: number;
    tables: number;
    equations: number;
    citations: number;
  };
};

const PAPER_BUILD_ROOT = path.join(process.cwd(), ".paper-build");

/**
 * The generated article HTML and manifest are controlled build artifacts
 * produced by `npm run paper:build` from the real manuscript sources.
 * The generator resolves tokens, attaches anchors/numbers, and strips
 * any executable markup at build time, so the output is safe to inject.
 */
export function getPaperSlugs(): string[] {
  if (!fs.existsSync(PAPER_BUILD_ROOT)) return [];
  return fs
    .readdirSync(PAPER_BUILD_ROOT)
    .filter((d) => fs.existsSync(path.join(PAPER_BUILD_ROOT, d, "manifest.json")));
}

export function getPaper(slug: string): {
  manifest: PaperManifest;
  html: string;
  hasPdf: boolean;
} | null {
  const dir = path.join(PAPER_BUILD_ROOT, slug);
  if (!fs.existsSync(path.join(dir, "manifest.json"))) return null;
  const manifest = JSON.parse(
    fs.readFileSync(path.join(dir, "manifest.json"), "utf8")
  ) as PaperManifest;
  const html = fs.readFileSync(path.join(dir, "article.html"), "utf8");
  const asset = (f: string) =>
    fs.existsSync(path.join(process.cwd(), "public", "research", slug, "assets", f));
  return {
    manifest,
    html,
    hasPdf: asset("paper.pdf"),
  };
}
