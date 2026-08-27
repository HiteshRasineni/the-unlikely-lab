# The Unlikely Lab

*Learning the expected. Searching for the unexpected.*

A personal research laboratory website focused on machine learning,
density estimation, anomaly detection, and collider physics.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- MDX (`next-mdx-remote`) for research and note content
- KaTeX (via `remark-math` / `rehype-katex`) for equations

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
npm run dev     # development server
npm run build   # production build
npm start       # serve production build
```

All routes are statically generated.
