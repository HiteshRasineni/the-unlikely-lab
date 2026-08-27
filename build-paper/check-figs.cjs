const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();

const slug = 'mono-z';
const t = fs.readFileSync(path.join(ROOT, '.paper-build', slug, 'article.html'), 'utf8');

// Figure source paths in the article HTML
const figRegex = new RegExp(`src="\\/research\\/${slug}\\/assets\\/figures\\/([^"]+)"`, 'g');
const figs = [...new Set(t.matchAll(figRegex))];
console.log('figure src entries in article:', figs.length);
let missing = 0;
for (const m of figs) {
  const exists = fs.existsSync(path.join(ROOT, 'public', 'research', slug, 'assets', 'figures', m[1]));
  if (!exists) { missing++; console.log('MISSING:', m[1]); }
  else console.log('OK:', m[1]);
}
console.log('missing figures:', missing);

// Check section heading text rendering for raw LaTeX
const cheerio = require('cheerio');
const $ = cheerio.load(t);
console.log('\n=== Headings with raw text ===');
$('h2, h3').each((i, el) => {
  console.log($(el).prop('tagName'), $(el).attr('id') || '', $(el).text().replace(/\s+/g, ' ').slice(0, 100));
});

// Check for sec-num spans inside headings
console.log('\nsec-num count:', $('.sec-num').length);

// Check equation anchors
console.log('eq-anchor count:', $('.eq-anchor').length);

// Check citation links
console.log('citation count:', $('.citation').length);
console.log('cite-link count:', $('.cite-link').length);
console.log('unresolved ref-link count:', $('.ref-link:not([href])').length);

// Check for @@TOK tokens
const tokens = [...t.matchAll(/@@TOK:[^@]*@@/g)];
console.log('unresolved tokens:', tokens.length);
