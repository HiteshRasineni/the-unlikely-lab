/**
 * Paper conversion pipeline (LaTeX -> semantic HTML) for The Unlikely Lab.
 *
 * Supports all research papers in paper-source/ (e.g. mono-z and z-hadronic).
 *
 * Stages for each paper:
 *   1. Extract metadata + body from the actual manuscript (v1.tex).
 *   2. Structural preprocessing only: tokenization of cites/refs/anchors,
 *      expansion of custom column types, environment normalization.
 *      No scientific content is rewritten or removed.
 *   3. LaTeX-aware conversion via pandoc with MathML output.
 *   4. Post-processing (scripts/paper/postprocess.mjs): numbering, anchors,
 *      citation links, sanitization, TOC.
 *   5. Bibliography compiled from the actual BibTeX product (v1.bbl).
 *   6. Artifacts -> .paper-build/<slug>/, assets -> public/research/<slug>/assets/.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import * as cheerio from "cheerio";
import { postprocess } from "./postprocess.mjs";

const ROOT = process.cwd();

function resolvePandoc() {
  const candidates = [
    process.env.PANDOC_PATH,
    path.join(ROOT, "tools", "pandoc", "pandoc-3.6.4", "pandoc.exe"),
    path.join(ROOT, "tools", "pandoc", "pandoc-3.6.4", "bin", "pandoc"),
    "pandoc",
  ].filter(Boolean);

  for (const cmd of candidates) {
    if (cmd !== "pandoc" && !fs.existsSync(cmd)) continue;
    try {
      execFileSync(cmd, ["--version"], { stdio: "ignore" });
      return cmd;
    } catch {
      /* try next */
    }
  }
  return null;
}

const PANDOC = resolvePandoc();

const PAPERS = [
  {
    slug: "mono-z",
    candidates: [
      path.join(ROOT, "paper-source", "mono-z"),
      path.join(ROOT, "paper-source", "paper"),
    ],
  },
  {
    slug: "z-hadronic",
    candidates: [
      path.join(ROOT, "paper-source", "z-hadronic"),
      path.join(ROOT, "paper-source", "hadronic-mono-z", "paper"),
      path.join(ROOT, "paper-source", "hadronic-mono-z"),
    ],
  },
];

const log = (...a) => console.log("[paper]", ...a);

function readGroup(str, openIdx) {
  if (str[openIdx] !== "{") throw new Error("expected { at " + openIdx);
  let depth = 0;
  for (let i = openIdx; i < str.length; i++) {
    const c = str[i];
    if (c === "\\") { i++; continue; }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return { body: str.slice(openIdx + 1, i), end: i };
    }
  }
  throw new Error("unbalanced group");
}

function replaceCommand(str, name, replacer) {
  let out = "";
  let i = 0;
  while (i < str.length) {
    const idx = str.indexOf("\\" + name + "{", i);
    if (idx === -1 || (idx > 0 && /[a-zA-Z]/.test(str[idx - 1]))) {
      out += str.slice(i);
      break;
    }
    out += str.slice(i, idx);
    const g = readGroup(str, idx + name.length + 1);
    out += replacer(g.body);
    i = g.end + 1;
  }
  return out;
}

/**
 * Expand \texorpdfstring{<math>}{<text>} to its second (text) argument —
 * these commands appear in titles and section headings where the plain-text
 * form is the correct web rendering. Handles both sibling arguments.
 */
function expandTextorpdfstring(str) {
  let out = "";
  let i = 0;
  while (i < str.length) {
    const idx = str.indexOf("\\texorpdfstring{", i);
    if (idx === -1 || (idx > 0 && /[a-zA-Z]/.test(str[idx - 1]))) {
      out += str.slice(i);
      break;
    }
    out += str.slice(i, idx);
    const a = readGroup(str, idx + "\\texorpdfstring".length);
    let textArg = a.body;
    let next = a.end + 1;
    while (next < str.length && /\s/.test(str[next])) next++;
    if (str[next] === "{") {
      const b = readGroup(str, next);
      textArg = b.body;
      next = b.end + 1;
    }
    out += textArg;
    i = next;
  }
  return out;
}

function pandoc(file, out) {
  execFileSync(
    PANDOC,
    [file, "-f", "latex", "-t", "html5", "--mathml", "--wrap=none", "--no-highlight",
     "--shift-heading-level-by=1",
     "--default-image-extension=.png", "-o", out],
    { stdio: ["ignore", "pipe", "inherit"] }
  );
}

function convertPaper({ slug, candidates }) {
  const SRC = candidates.find((p) => fs.existsSync(path.join(p, "v1.tex")));
  if (!SRC) {
    log(`Warning: no source found for paper slug '${slug}' (checked ${candidates.join(", ")})`);
    return { ok: false, error: "source not found" };
  }

  log(`\n========================================`);
  log(`Building paper: ${slug}`);
  log(`Source: ${SRC}`);

  const BUILD = path.join(ROOT, "build-paper", slug);
  const OUT = path.join(ROOT, ".paper-build", slug);
  const ASSETS = path.join(ROOT, "public", "research", slug, "assets");

  const tex = fs.readFileSync(path.join(SRC, "v1.tex"), "utf8").replace(/\r\n/g, "\n");

  /* ------------------------------------------- metadata from the actual source */
  const meta = { slug };
  {
    const tIdx = tex.indexOf("\\title{");
    const tg = readGroup(tex, tex.indexOf("{", tIdx));
    meta.title = expandTextorpdfstring(tg.body)
      .replace(/%[^\n]*/g, "")
      .replace(/\$([^$]*)\$/g, "$1")
      .replace(/\\ensuremath\{([^{}]*)\}/g, "$1")
      .replace(/\\\\/g, " ")
      .replace(/~/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    meta.authors = [];
    {
      const re = /\\author\[([^\]]*)\]/g;
      let m;
      while ((m = re.exec(tex))) {
        const opts = m[1];
        const open = tex.indexOf("{", m.index + m[0].length);
        const g = readGroup(tex, open);
        const cleanName = g.body
          .replace(/\\orcidlink\{[^}]*\}/g, "")
          .replace(/\\thanks\{[^}]*\}/g, "")
          .replace(/\\,/g, "")
          .replace(/\\ensuremath\{([^{}]*)\}/g, "$1")
          .replace(/\$[^$]*\$/g, "")
          .split("\\")[0]
          .trim();

        meta.authors.push({
          name: cleanName,
          dagger: opts.includes("dagger") || opts.includes("\\dagger") || opts.includes("$"),
          affilNums: opts.split(",").map((s) => s.trim()).filter((s) => /^\d+$/.test(s)),
          orcid: (g.body.match(/\\orcidlink\{([^}]*)\}/) || [])[1] ?? null,
        });
      }
    }

    meta.affiliations = [
      ...tex.matchAll(/\\affil\[(\d+)\]\{((?:[^{}]|\{[^{}]*\})*)\}/g),
    ].map((r) => ({ num: r[1], text: r[2].split("\\\\")[0].trim() }));

    meta.correspondingEmail =
      (tex.match(/Corresponding author:\s*\\url\{([^}]*)\}/) ||
       tex.match(/Corresponding author:\s*([^\s\\}]+)/) ||
       [])[1] ?? null;
  }

  /* ------------------------------------------------ body + structural pass --- */
  let body = tex.slice(
    tex.indexOf("\n", tex.indexOf("\\maketitle")) + 1,
    tex.lastIndexOf("\\end{document}")
  );

  // PDF-only / site-handled boilerplate
  body = body
    .replace(
      /\\begingroup\s*\n\\renewcommand\{\\thefootnote\}\{\\fnsymbol\{footnote\}\}\s*\n\\footnotetext\[2\]\{[^}]*\}\s*\n\\endgroup\s*\n?/g,
      ""
    )
    .replace(/\\clearpage/g, "")
    .replace(/\\onecolumn|\\twocolumn|\\raggedbottom/g, "")
    .replace(/\\centerline\{[^}]*\}/g, "")
    .replace(/\\addcontentsline\{[^}]*\}\{[^}]*\}\{[^}]*\}/g, "")
    .replace(/\\bibliographystyle\{[^}]*\}/g, "")
    .replace(/\\bibliography\{[^}]*\}/g, "")
    .replace(/\\nocite\{[^}]*\}/g, "")
    .replace(/CL\$_s\$/g, "$\\mathrm{CL}_{s}$");

  // Remove standalone Appendix center banner before sections
  body = body.replace(/\\begin\{center\}\s*\\Large\\textbf\{Appendix\}\s*\\end\{center\}/g, "");

  const state = { sec: 0, subsec: 0, fig: 0, tab: 0, eq: 0, appendix: false };
  const labels = {}; // label -> { kind, display }
  const labelByNum = { fig: {}, tab: {} };
  function register(label, kind, display) {
    if (label && !labels[label]) labels[label] = { kind, display };
  }
  const tok = (kind, payload) => `@@TOK:${kind}:${payload}@@`;

  // Numbered equations (labels + after-token)
  body = body.replace(
    /\\begin\{equation\}(.*?)\\end\{equation\}/gs,
    (all, inner) => {
      state.eq++;
      const lab = (inner.match(/\\label\{([^}]*)\}/) || [])[1];
      const key = lab ?? `eq-anon-${state.eq}`;
      register(key, "eq", `(${state.eq})`);
      return all.replace(/\\label\{[^}]*\}/g, "") + tok("EQA", key);
    }
  );

  // Normalize longtable into table + tabular
  body = body.replace(/\\caption\{([^}]*)\}\\label\{([^}]*)\}\\\\/g, "\\caption{$1}\\label{$2}");
  body = body.replace(/\\(endfirsthead|endhead|endfoot|endlastfoot)/g, "");
  body = body.replace(/\\multicolumn\{[^}]*\}\{[^}]*\}\{Continued on next page\}\s*\\\\/g, "");
  body = body.replace(/\\begin\{longtable\}(\[[^\]]*\])?\{([^}]*)\}/g, "\\begin{table}\\begin{tabular}{$2}");
  body = body.replace(/\\end\{longtable\}/g, "\\end{tabular}\\end{table}");

  // Normalize tabular* to tabular
  body = body.replace(/\\begin\{tabular\*\}\{[^}]*\}(\[[^\]]*\])?\{([^}]*)\}/g, "\\begin{tabular}{$2}");
  body = body.replace(/\\end\{tabular\*\}/g, "\\end{tabular}");

  // Expand custom column types L{w}
  body = body.replace(/L\{([^{}]*)\}/g, ">{\\raggedright\\arraybackslash}p{$1}");

  body = expandTextorpdfstring(body);

  // Old-style \rm in subscripts -> \mathrm (TeX math parser compatibility)
  body = body.replace(/\{\\rm\s+([^{}]*)\}/g, "{\\mathrm{$1}}");

  // \resizebox wrappers -> contents only
  {
    let s;
    while ((s = body.indexOf("\\resizebox")) !== -1) {
      let i = s + "\\resizebox".length;
      for (let k = 0; k < 2; k++) {
        const g = readGroup(body, body.indexOf("{", i));
        i = g.end + 1;
      }
      const inner = readGroup(body, body.indexOf("{", i));
      body = body.slice(0, s) + inner.body + body.slice(inner.end + 1);
    }
  }

  // Figure asset URLs + width-only graphics options
  body = body.replaceAll("figures/", `/research/${slug}/assets/figures/`);
  body = body.replaceAll("images/", `/research/${slug}/assets/images/`);
  body = body.replace(/\\includegraphics\[([^\]]*)\]\{([^}]*)\}/g, (_a, opts, pth) => {
    const w = opts.match(/width=[^,\]]+/);
    return `\\includegraphics[${w ? w[0] : ""}]{${pth}}`;
  });

  /* ---------------- sections / subsections ---------------------------------- */
  {
    const out = [];
    let rest = body;
    let absPos = 0;
    const appendixAbs = body.indexOf("\\appendix");
    let appendixPending = appendixAbs !== -1;
    let headingSeq = 0;

    while (true) {
      const m = rest.match(/\\(section|subsection)(\*?)\{/);
      if (!m) break;

      // Switch to appendix lettering once the \appendix command is passed
      if (appendixPending && appendixAbs < absPos + m.index) {
        state.appendix = true;
        state.sec = 0;
        state.subsec = 0;
        appendixPending = false;
      }

      out.push(rest.slice(0, m.index));
      const starred = m[2] === "*";
      const g = readGroup(rest, m.index + m[0].length - 1);
      let after = rest.slice(g.end + 1);

      let label = null;
      let id = null;
      let display = "";
      if (!starred) {
        if (state.appendix) {
          if (m[1] === "section") { state.sec++; state.subsec = 0; display = String.fromCharCode(64 + state.sec); }
          else { state.subsec++; display = `${String.fromCharCode(64 + state.sec)}.${state.subsec}`; }
        } else {
          if (m[1] === "section") { state.sec++; state.subsec = 0; display = `${state.sec}`; }
          else { state.subsec++; display = `${state.sec}.${state.subsec}`; }
        }
        const labelM = after.match(/^\s*\\label\{([^}]*)\}/);
        label = labelM?.[1] ?? null;
        after = after.replace(/^\s*\\label\{[^}]*\}/, "");
        register(label, m[1], display);
        if (label) id = "paper-" + label.replace(/[:_]/g, "-");
      } else {
        const t = g.body.trim();
        const known =
          t === "Declarations" ? "declarations"
          : t === "Appendix" ? "appendix-note"
          : t.toLowerCase().startsWith("abstract") ? "abstract"
          : null;
        label = known;
        if (known) id = "paper-" + known;
      }
      if (!id) id = `paper-head-${++headingSeq}`;

      // Numbered headings carry their number; all headings carry their stable id
      const numTok = starred ? "" : tok("SECNUM", display + (m[1] === "section" ? ". " : " "));
      out.push(`\\${m[1]}${m[2]}{${tok("HEADID", id)}${numTok}${g.body}}`);

      absPos += g.end + 1;
      rest = after;
    }
    out.push(rest);
    body = out.join("");
  }

  /* ---------------- figures / tables ---------------------------------------- */
  {
    let figN = 0;
    body = body.replace(/\\begin\{figure\*?\}([\s\S]*?)\\end\{figure\*?\}/g, (all) => {
      figN++;
      const lab = (all.match(/\\label\{([^}]*)\}/) || [])[1];
      register(lab, "fig", String(figN));
      if (lab) labelByNum.fig[figN] = lab;
      return all
        .replace(/\\begin\{figure\*?\}/, "\\begin{figure}")
        .replace(/\\caption\{/, `\\caption{${tok("CAPF", String(figN))} `)
        .replace(/\\end\{figure\*?\}/, `${tok("ENVEND", "f" + figN)}\\end{figure}`);
    });

    let tabN = 0;
    body = body.replace(/\\begin\{table\*?\}([\s\S]*?)\\end\{table\*?\}/g, (all) => {
      tabN++;
      const lab = (all.match(/\\label\{([^}]*)\}/) || [])[1];
      register(lab, "tab", String(tabN));
      if (lab) labelByNum.tab[tabN] = lab;
      return all
        .replace(/\\begin\{table\*?\}/, "\\begin{table}")
        .replace(/\\caption\{/, `\\caption{${tok("CAPT", String(tabN))} `)
        .replace(/\\end\{table\*?\}/, `${tok("ENVEND", "t" + tabN)}\\end{table}`);
    });
  }

  /* ---------------- refs / citations -> tokens ------------------------------- */
  body = body
    .replace(/\\eqref\{([^}]*)\}/g, (_a, l) => tok("EQREF", l.trim()))
    .replace(/(?<![a-zA-Z])\\ref\{([^}]*)\}/g, (_a, l) => tok("REF", l.trim()))
    .replace(/~?\\cite\{([^}]*)\}/g, (_a, keys) => tok("CITE", keys.trim()));

  /* ---------------- minimal preamble (macros from the real sources) ---------- */
  const PREAMBLE = `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{makecell}
\\usepackage{url}
\\usepackage{hyperref}
\\newcommand{\\GeV}{\\text{GeV}}
\\newcommand{\\MET}{\\ensuremath{E_{\\mathrm{T}}^{\\mathrm{miss}}}}
\\newcommand{\\score}{\\ensuremath{\\mathcal{S}}}
\\newcommand{\\invfb}{\\ensuremath{\\mathrm{fb}^{-1}}}
\\newenvironment{abstract}{\\section*{${tok("HEADID", "paper-abstract")}Abstract}}{}
\\begin{document}
`;

  fs.mkdirSync(BUILD, { recursive: true });
  fs.writeFileSync(path.join(BUILD, "body.tex"), PREAMBLE + body + "\n\\end{document}\n");

  /* ---------------- bibliography from the real BibTeX product (v1.bbl) ------- */
  const bblPath = path.join(SRC, "v1.bbl");
  const entries = [];
  if (fs.existsSync(bblPath)) {
    const bbl = fs.readFileSync(bblPath, "utf8").replace(/\r\n/g, "\n");
    const idxs = [];
    let mm;
    const itemRe = /\\bibitem\{([^}]*)\}/g;
    while ((mm = itemRe.exec(bbl))) idxs.push({ key: mm[1], start: mm.index + mm[0].length });
    for (let i = 0; i < idxs.length; i++) {
      const end =
        i + 1 < idxs.length
          ? bbl.indexOf("\\bibitem", idxs[i].start)
          : bbl.indexOf("\\end{thebibliography}", idxs[i].start);
      entries.push({ key: idxs[i].key, texContent: bbl.slice(idxs[i].start, end) });
    }
  }

  const bibTexDoc =
    "\\documentclass{article}\n\\usepackage{amsmath,amssymb,url,hyperref}\n\\begin{document}\n" +
    entries
      .map((e) => `${tok("BIB", e.key)} ${e.texContent.replace(/\\newblock/g, " ").trim()}`)
      .join("\n\n") +
    "\n\\end{document}\n";
  fs.writeFileSync(path.join(BUILD, "refs.tex"), bibTexDoc);

  /* ---------------- pandoc conversion (MathML) -------------------------------- */
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  pandoc(path.join(BUILD, "body.tex"), path.join(BUILD, "raw-body.html"));
  pandoc(path.join(BUILD, "refs.tex"), path.join(BUILD, "raw-refs.html"));
  log("pandoc conversion complete");

  /* ---------------- bibliography entry HTML ----------------------------------- */
  const bibNumbers = Object.fromEntries(entries.map((e, i) => [e.key, i + 1]));
  const referenceEntries = [];
  {
    const $r = cheerio.load(fs.readFileSync(path.join(BUILD, "raw-refs.html"), "utf8"));
    $r("p").each((_i, el) => {
      const txt = $r(el).text();
      const m = txt.match(/^@@TOK:BIB:([^:@]+)@@/);
      if (!m) return;
      const html = $r(el).clone().html() ?? "";
      referenceEntries.push({
        key: m[1],
        num: bibNumbers[m[1]],
        html: html.replace(/^@@TOK:BIB:[^:@]+@@\s*/, "").trim(),
      });
    });
  }

  /* ---------------- post-process the article body ----------------------------- */
  const rawBody = fs.readFileSync(path.join(BUILD, "raw-body.html"), "utf8");
  const { $, issues } = postprocess({
    bodyHtml: rawBody,
    refsHtml: "",
    labels,
    bibNumbers,
    labelByNum,
  });

  // Idempotent cleanup + hardening
  $("script, style, iframe, object, embed").remove();
  $("*").each(function () {
    const attrs = this.attribs ? Object.keys(this.attribs) : [];
    for (const attr of attrs) {
      if (/^on/i.test(attr)) $(this).removeAttr(attr);
      if (attr === "style" && !/^(width|height)/.test($(this).attr("style") ?? "")) {
        $(this).removeAttr("style");
      }
    }
  });
  $("img").each(function () {
    const src = $(this).attr("src") ?? "";
    if (!src.startsWith("/")) issues.push(`non-local image dropped: ${src}`);
    $(this).attr("loading", "lazy");
    $(this).removeAttr("alt");
  });

  /* ---------------- table of contents from rendered headings ------------------ */
  function headingText(el) {
    const clone = $(el).clone();
    clone.find("annotation").remove();
    clone.find(".sec-num").wrap("<b></b>");
    let t = clone.text().replace(/\s+/g, " ").trim();
    return t;
  }
  const toc = [];
  $("#article-root h2, #article-root h3").each((_i, el) => {
    const id = $(el).attr("id");
    if (!id) return;
    toc.push({ id, text: headingText(el), level: $(el).prop("tagName") === "H2" ? 2 : 3 });
  });

  // Wide tables wrapped for horizontal scrolling
  $("table").wrap('<div class="table-scroll"></div>');

  // Figures get responsive image handling
  $("figure img").each(function () {
    $(this).removeAttr("width").removeAttr("height");
  });

  /* ---------------- References section from real .bbl ------------------------- */
  if (referenceEntries.length) {
    const refsSection = `
<section id="paper-references" class="paper-references">
<h2 id="paper-references-heading">References</h2>
<ol class="reference-list">
${referenceEntries
  .map(
    (e) => `<li id="bib-${e.key}" value="${e.num}">
<span class="ref-num">[${e.num}]</span> ${e.html}</li>`
  )
  .join("\n")}
</ol>
</section>`;
    $("#article-root").append(refsSection);
    toc.push({ id: "paper-references-heading", text: "References", level: 2 });
  }

  /* ---------------- artifact outputs ------------------------------------------ */
  const articleHtml = $("#article-root").html();
  fs.writeFileSync(path.join(OUT, "article.html"), articleHtml);

  const manifest = {
    slug,
    sourceUpdatedAt: fs.statSync(path.join(SRC, "v1.tex")).mtime.toISOString(),
    title: meta.title,
    authors: meta.authors,
    affiliations: meta.affiliations,
    correspondingEmail: meta.correspondingEmail,
    equalContribution: meta.authors.some((a) => a.dagger),
    toc,
    counts: {
      sections: Object.values(labels).filter((l) => l.kind === "section").length,
      subsections: Object.values(labels).filter((l) => l.kind === "subsection").length,
      figures: Object.values(labels).filter((l) => l.kind === "fig").length,
      tables: Object.values(labels).filter((l) => l.kind === "tab").length,
      equations: state.eq,
      citations: referenceEntries.length,
    },
  };
  fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));

  /* ---------------- public assets ---------------------------------------------- */
  fs.rmSync(ASSETS, { recursive: true, force: true });
  fs.mkdirSync(ASSETS, { recursive: true });
  if (fs.existsSync(path.join(SRC, "figures"))) {
    fs.cpSync(path.join(SRC, "figures"), path.join(ASSETS, "figures"), { recursive: true });
  }
  if (fs.existsSync(path.join(SRC, "images"))) {
    fs.cpSync(path.join(SRC, "images"), path.join(ASSETS, "images"), { recursive: true });
  }
  if (fs.existsSync(path.join(SRC, "v1.pdf"))) {
    fs.copyFileSync(path.join(SRC, "v1.pdf"), path.join(ASSETS, "paper.pdf"));
  }

  /* ---------------- validation -------------------------------------------------- */
  log("--- validation report ---");
  const srcImages = [...rawBody.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
  let missingImages = 0;
  for (const src of new Set(srcImages)) {
    if (!src.startsWith("/")) continue;
    const p = path.join(ROOT, "public", src.replace(/^\//, "").split("/").join(path.sep));
    if (!fs.existsSync(p)) { issues.push(`missing figure asset: ${src}`); missingImages++; }
  }
  const unresolvedTokens = [...articleHtml.matchAll(/@@TOK:[^@]*@@/g)];
  if (unresolvedTokens.length) issues.push(`unconverted tokens remain in output (${unresolvedTokens.length})`);

  console.table(manifest.counts);
  if (issues.length) {
    console.error(`[paper] validation for ${slug} FAILED with ${issues.length} issue(s):`);
    issues.forEach((i) => console.error("  - " + i));
    return { ok: false, manifest, issues };
  } else {
    log(`OK (${slug}): ${manifest.counts.sections} sections, ${manifest.counts.figures} figures, ${manifest.counts.tables} tables, ${manifest.counts.equations} numbered equations, ${manifest.counts.citations} bibliography entries.`);
    log("article:", path.join(OUT, "article.html"));
    return { ok: true, manifest };
  }
}

// Prebuild hook check
if (process.argv.includes("--if-possible")) {
  if (!PANDOC) {
    console.log(
      "[paper] skipping regeneration (pandoc not found); using existing artifacts in .paper-build/ if present"
    );
    process.exit(0);
  }
}

if (!PANDOC) {
  console.error("[paper] pandoc is required. Install pandoc or set PANDOC_PATH.");
  process.exit(1);
}

let allOk = true;
for (const paper of PAPERS) {
  const res = convertPaper(paper);
  if (!res.ok) allOk = false;
}

if (!allOk) {
  process.exitCode = 1;
}



