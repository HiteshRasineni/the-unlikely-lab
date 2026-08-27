const fs = require('fs');
const cheerio = require('cheerio');
const t = fs.readFileSync('build-paper/paper-page-fresh.html', 'utf8');
const $ = cheerio.load(t);

console.log('=== Page headings ===');
$('h2').each((i, el) => {
  console.log('  ' + $(el).text().replace(/\s+/g, ' ').slice(0, 70));
});

console.log('\n=== Paper header ===');
console.log('Title:', $('.paper-header h1').first().text().replace(/\s+/g, ' ').slice(0, 100));
console.log('Authors:', $('.paper-header .author-list').text().replace(/\s+/g, ' ').slice(0, 100));

console.log('\n=== Controls ===');
$('div[class*="border-y"] a, div[class*="border-y"] span').each(function() {
  console.log('  control:', JSON.stringify($(this).text().trim()));
});

console.log('\n=== Article content ===');
console.log('h2 count:', $('article .paper-body h2').length);
console.log('h3 count:', $('article .paper-body h3').length);
console.log('.sec-num count:', $('.sec-num').length);
console.log('eq-anchor count:', $('.eq-anchor').length);
console.log('citation count:', $('.citation').length);
console.log('cite-link count:', $('.cite-link').length);
console.log('ref-link count:', $('.ref-link').length);
console.log('figure count:', $('figure').length);
console.log('table count:', $('table').length);
console.log('reference-list li count:', $('.reference-list li').length);

console.log('\n=== First section heading in body ===');
const firstH2 = $('article .paper-body h2').first();
console.log('text:', firstH2.text().replace(/\s+/g, ' ').slice(0, 80));
console.log('html:', firstH2.html()?.slice(0, 300));

console.log('\n=== Check for math in headings ===');
const mathInH = $('h2,h3 math, h3 math').length;
console.log('math elements in headings:', mathInH);

console.log('\n=== Check for @@TOK ===');
const tokens = [...t.matchAll(/@@TOK:[^@]*@@/g)];
console.log('tokens:', tokens.length);
