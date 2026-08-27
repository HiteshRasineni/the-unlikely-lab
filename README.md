# The Unlikely Lab

*Learning the expected. Searching for the unexpected.*

A personal research laboratory website focused on machine learning,
density estimation, anomaly detection, and collider physics.

The site is a static export hosted on GitHub Pages at
[https://hiteshrasineni.github.io/the-unlikely-lab/](https://hiteshrasineni.github.io/the-unlikely-lab/).

## Stack

- Next.js (App Router) + TypeScript, static export (`output: "export"`)
- Tailwind CSS
- MDX (`next-mdx-remote`) for research and note content
- KaTeX (via `remark-math` / `rehype-katex`) for equations
- Pandoc for LaTeX → HTML paper conversion

## Content architecture

```text
content/
├── research/<slug>/index.mdx   # research studies (/research/<slug>)
└── notes/<slug>.mdx            # notes (/notes/<slug>)
```

Frontmatter in each content file drives titles, metadata, tags, publication
information, and related-research links. Figures live under
`public/research/<slug>/`.

## Commands

```bash
npm install
npm run dev          # development server (no GitHub Pages prefix)
npm run paper:build  # convert LaTeX manuscripts (requires pandoc)
npm run build        # static export to out/
npm start            # serve the out/ directory locally
```

All routes are statically generated. GitHub Actions rebuilds the site on
every push to `main` and deploys it to GitHub Pages.

To enable Pages on a fresh clone of this repository: **Settings → Pages →
Source: GitHub Actions**.
