const fs = require('fs');
const cheerio = require('cheerio');
const t = fs.readFileSync('.paper-build/mono-z/article.html', 'utf8');

// Find raw TeX ref/cite/label commands
const refs = [...t.matchAll(/\\(ref|cite|label)\{/g)];
console.log('=== Dangling refs/cites ===');
for (const m of refs) {
  const idx = m.index;
  console.log('at index ' + idx + ':', t.substring(Math.max(0, idx - 80), idx + 80).replace(/\s+/g, ' '));
}

// Check if the article has proper section numbers in the body
const $ = cheerio.load('<div>' + t + '</div>');
console.log('\n=== First 5 h2 headings ===');
$('h2').each((i, el) => {
  if (i < 5) {
    console.log($(el).prop('tagName'), $(el).text().replace(/\s+/g, ' ').slice(0, 80));
  }
});

// Check the abstract
console.log('\n=== Abstract ===');
const abstract = $('.paper-body p').first();
if (abstract.length) console.log(abstract.text().slice(0, 200));

// Check for proper content
console.log('\n=== Content checks ===');
console.log('Has "We report a search for dark matter":', /We report a search for dark matter/.test(t));
console.log('Has "Neural Spline Flows":', /Neural Spline Flows/.test(t));
console.log('Has "References" section:', /paper-references/.test(t));


// Check appendix subsections O.3 and O.4
console.log('=== Appendix subsections O.3 and O.4 ===');
$('#paper-head-1, #paper-head-2').each((i, el) => {
  console.log($(el).prop('tagName'), '[' + $(el).attr('id') + ']', $(el).text().replace(/\s+/g, ' ').slice(0, 80));
});

// Check all sec-num spans
console.log('\n=== All sec-num spans ===');
$('.sec-num').each((i, el) => {
  console.log('  ' + i + ':', $(el).text().replace(/\s+/g, ' ').trim());
});

// Check the heading text from the TOC in the manifest
const manifest = JSON.parse(fs.readFileSync('.paper-build/mono-z/manifest.json', 'utf8'));
console.log('\n=== Manifest TOC for O.3 and O.4 ===');
for (const e of manifest.toc) {
  if (e.text.includes('O.3') || e.text.includes('O.4') || e.id.includes('head-')) {
    console.log(e.id, e.text);
  }
}

// Check the verify.cjs output issue - it was reading stale paper-page.html
console.log('\n=== Paper header in page.tsx render ===');
// Check if there's a stale paper-page.html
const pp = fs.readFileSync('build-paper/paper-page.html', 'utf8');
const $pp = cheerio.load(pp);
console.log('H2 headings in paper-page.html:');
$pp('h2').each((i, el) => {
  console.log('  ', $pp(el).text().replace(/\s+/g, ' ').slice(0, 60));
});


