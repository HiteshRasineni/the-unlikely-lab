/**
 * Site prefix for GitHub Pages project sites (e.g. /the-unlikely-lab).
 * Empty during local `next dev`. Set from next.config.mjs via NEXT_PUBLIC_BASE_PATH.
 *
 * next/link and next/router already honor `basePath`. Use `withBase` only for
 * raw <a>/<img> URLs and injected HTML that Next.js does not rewrite.
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

export function withBase(href: string): string {
  if (!href) return href;
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("#") ||
    href.startsWith("//")
  ) {
    return href;
  }
  const base = getBasePath();
  if (!base) return href;
  if (href.startsWith(base + "/") || href === base) return href;
  if (!href.startsWith("/")) return href;
  return `${base}${href}`;
}

/** Prefix root-absolute src/href in generated paper HTML. */
export function prefixHtmlUrls(html: string): string {
  const base = getBasePath();
  if (!base) return html;
  return html.replace(/(src|href)="(\/[^"]*)"/g, (full, attr: string, url: string) => {
    if (url.startsWith("//") || url.startsWith(`${base}/`)) return full;
    return `${attr}="${base}${url}"`;
  });
}
