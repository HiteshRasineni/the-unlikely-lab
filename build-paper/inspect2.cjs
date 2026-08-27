const fs = require('fs');
const cheerio = require('cheerio');
const t = fs.readFileSync('.paper-build/mono-z/article.html', 'utf8');
const $ = cheerio.load(t);

const h = $('#paper-sec-met-tail');
console.log('=== Heading HTML for paper-sec-met-tail ===');
console.log($.html(h));

const clone = h.clone();
clone.find('annotation').remove();
clone.find('.sec-num').wrap('<b></b>');
console.log('\n=== TOC text extraction ===');
console.log(clone.text().replace(/\s+/g, ' ').trim());

const ah = $('#paper-abstract');
console.log('\n=== Abstract heading HTML ===');
console.log($.html(ah));

console.log('\n=== First figure caption ===');
console.log($('figcaption').first().html().substring(0, 500));

console.log('\n=== eqref refs ===');
const eqrefs = $('.ref-link[data-ref-kind="eq"]');
console.log('eq ref-links:', eqrefs.length);
if (eqrefs.length) {
  console.log('first eqref href:', eqrefs.first().attr('href'));
  console.log('first eqref text:', eqrefs.first().text());
}

console.log('\n=== fig ref-links ===');
const figrefs = $('.ref-link[data-ref-kind="fig"]');
console.log('fig ref-links:', figrefs.length);
if (figrefs.length) {
  console.log('first figref href:', figrefs.first().attr('href'));
  console.log('first figref text:', figrefs.first().text());
}

console.log('\n=== tab ref-links ===');
console.log('tab ref-links:', $('.ref-link[data-ref-kind="tab"]').length);

console.log('\n=== sec ref-links ===');
console.log('sec ref-links:', $('.ref-link[data-ref-kind="section"]').length);

console.log('\n=== Unresolved tokens ===');
const tokens = [...t.matchAll(/@@TOK:[^@]*@@/g)];
console.log('tokens:', tokens.length);

console.log('\n=== First figure structure ===');
const fg = $('figure').first();
console.log('figure id:', fg.attr('id'));
console.log('figure img count:', fg.find('img').length);
console.log('figcaption html:', fg.find('figcaption').html()?.substring(0, 400));
