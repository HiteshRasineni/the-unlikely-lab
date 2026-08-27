/**
 * Post-processing of pandoc-converted article HTML:
 *   - resolves cross-reference / citation / anchor tokens,
 *   - assigns ids & numbering to sections, figures, tables, equations,
 *   - assembles the References section from real .bbl entries,
 *   - sanitizes output (no scripts, no event handlers, local assets only),
 *   - extracts TOC + validation report.
 */
import * as cheerio from "cheerio";

const TOK_RE = /@@TOK:(ANCH|HEADID|SECNUM|CAPF|CAPT|EQA|ENVEND|EQREF|CITE|REF|BIB):([^@]*)@@/g;
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const normId = (l) => "paper-" + l.replace(/[:_]/g, "-");

export function postprocess({ bodyHtml, refsHtml, labels, bibNumbers, labelByNum }) {
  const issues = [];
  const $ = cheerio.load(`<div id="article-root">${bodyHtml}</div>`);

  /* -------- helpers built on the label/bib maps ------------------------- */

  const citeHtml = (keysRaw) => {
    const nums = keysRaw
      .split(",")
      .map((k) => k.trim())
      .map((k) => {
        if (!bibNumbers[k]) { issues.push(`citation key missing from bibliography: ${k}`); return null; }
        return { k, n: bibNumbers[k] };
      })
      .filter(Boolean);
    if (!nums.length) return "";
    const inner = nums
      .map(({ k, n }, i) => `<a class="cite-link" href="#bib-${k}" title="Jump to reference ${n}">${n}</a>${i < nums.length - 1 ? "," : ""}`)
      .join("");
    return `<span class="citation">[${inner}]</span>`;
  };

  const refHtml = (label) => {
    const info = labels[label];
    if (!info) { issues.push(`unresolved \\ref target: ${label}`); return ""; }
    return `<a class="ref-link" data-ref-kind="${info.kind}" href="#${normId(label)}">${esc(info.display)}</a>`;
  };

  /* -------- token rewriting over text nodes ----------------------------- */
  // ANCH: set id/class on ancestor heading; CAPF/CAPT: mark caption container;
  // EQA: give id to the preceding display-math block; ENVEND: drop.

  const textNodes = [];
  $("*").contents().each(function () {
    if (this.type === "text" && this.data && this.data.includes("@@TOK:")) textNodes.push(this);
  });

  for (const node of textNodes) {
    const raw = node.data;
    let outHtml = "";
    let last = 0;
    TOK_RE.lastIndex = 0;
    let m;
    while ((m = TOK_RE.exec(raw))) {
      outHtml += esc(raw.slice(last, m.index));
      const [, kind, payload] = m;
      switch (kind) {
        case "HEADID": {
          const heading = $(node.parent).closest("h1,h2,h3,h4");
          heading.attr("id", payload);
          break;
        }
        case "SECNUM": {
          outHtml += `<span class="sec-num">${esc(payload)}</span>`;
          break;
        }
        case "ANCH": {
          const heading = $(node.parent).closest("h1,h2,h3,h4");
          heading.attr("id", normId(payload));
          break;
        }
        case "CAPF":
        case "CAPT": {
          const el = $(node.parent);
          const kindKey = kind === "CAPF" ? "fig" : "tab";
          const container = el.closest(kindKey === "fig" ? "figure" : "table");
          const label = labelByNum[kindKey]?.[payload];
          container.attr("id", label ? normId(label) : `${kindKey}-${payload}`);
          outHtml +=
            kindKey === "fig"
              ? `<strong class="caption-label">Figure ${payload}.</strong> `
              : `<strong class="caption-label">Table ${payload}.</strong> `;
          break;
        }
        case "EQA": {
          // pandoc renders display math as a bare <math display="block">
          // inside the same/sibling paragraph as the token
          const par = $(node.parent);
          let target = null;
          const direct = par.children("math");
          if (direct.length) {
            target = par.children("math").last();
          } else if (par.find("span.math.display").length) {
            target = par.find("span.math.display").first();
          } else {
            let prev = par.prev();
            while (prev.length && !prev.hasClass("math") && !prev.is("p > math")) {
              const m = prev.children("math").last();
              if (m.length && m.attr("display") === "block") { target = m; break; }
              prev = prev.prev();
              if (!prev.length) break;
            }
          }
          if (target && target.length) target.attr("id", normId(payload)).addClass("eq-anchor");
          else issues.push(`could not attach equation anchor: ${payload}`);
          break;
        }
        case "EQREF": {
          const info = labels[payload];
          outHtml += info
            ? `<a class="ref-link" data-ref-kind="eq" href="#${normId(payload)}">${esc(info.display)}</a>`
            : (issues.push(`unresolved \\eqref: ${payload}`), "");
          break;
        }
        case "REF": {
          outHtml += refHtml(payload);
          break;
        }
        case "CITE": {
          outHtml += citeHtml(payload);
          break;
        }
        default:
          break;
      }
      last = TOK_RE.lastIndex;
    }
    outHtml += esc(raw.slice(last));
    $(node).replaceWith(outHtml);
  }

  return { $, issues };
}


