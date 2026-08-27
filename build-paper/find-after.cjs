const fs = require('fs');
const cheerio = require('cheerio');
const t = fs.readFileSync('.paper-build/mono-z/article.html', 'utf8');
const $ = cheerio.load('<div>' + t + '</div>');

// Check for raw \label in article
console.log('=== Raw \\label in article.html ===');
const labels = [...t.matchAll(/\\label\{/g)];
console.log('\\label occurrences:', labels.length);
for (const m of labels) {
  console.log('  at', m.index, ':', t.substring(m.index - 30, m.index + 50).replace(/\s+/g, ' '));
}

// Check for @@TOK tokens
const tokens = [...t.matchAll(/@@TOK:[^@]*@@/g)];
console.log('\n=== Unresolved tokens ===');
console.log('tokens:', tokens.length);

// Check ref-links and cite-links
const refLinks = [];
$('.ref-link').each((i, el) => refLinks.push($(el).attr('href')));
console.log('\n=== ref-links ===');
console.log('total:', refLinks.length);
const broken = refLinks.filter(h => h && !t.includes(h.replace('#', '')));
console.log('broken:', broken.length);

const citeLinks = [];
$('.cite-link').each((i, el) => citeLinks.push($(el).attr('href')));
console.log('\n=== cite-links ===');
console.log('total:', citeLinks.length);
const brokenCite = citeLinks.filter(h => h && !t.includes(h.replace('#', '')));
console.log('broken:', brokenCite.length);

// Check section numbering in headings
console.log('\n=== First 5 H2 headings ===');
$('h2').each((i, el) => {
  if (i < 5) {
    const clone = $(el).clone();
    clone.find('annotation').remove();
    console.log('  ', $(el).prop('tagName'), '[' + ($(el).attr('id') || '') + ']', clone.text().replace(/\s+/g, ' ').slice(0, 70));
  }
});

// Check equation anchors
console.log('\n=== Equation anchors ===');
$('.eq-anchor').each((i, el) => {
  console.log('  id:', $(el).attr('id'));
});

// Check figure structure
console.log('\n=== Figures ===');
$('figure').each((i, el) => {
  const id = $(el).attr('id');
  const imgCount = $(el).find('img').length;
  console.log('  fig ' + (i+1) + ': id=' + id + ', imgs=' + imgCount);
});

// Check tables
console.log('\n=== Tables ===');
$('table').each((i, el) => {
  const id = $(el).attr('id');
  const hasCaption = $(el).find('caption').length > 0;
  console.log('  table ' + (i+1) + ': id=' + (id || 'none') + ', caption=' + (hasCaption ? 'yes' : 'no'));
});

// Check references
console.log('\n=== References ===');
console.log('reference-list li count:', $('.reference-list li').length);
const firstRef = $('.reference-list li').first();
console.log('first ref id:', firstRef.attr('id'));
console.log('first ref text:', firstRef.text().replace(/\s+/g, ' ').slice(0, 100));

// Check for DOI/arXiv links in references
console.log('\n=== DOI/arXiv in references ===');
const doiLinks = $('a[href*="doi.org"]').length;
const arxivLinks = $('a[href*="arxiv.org"]').length;
const openDataLinks = $('a[href*="opendata"]').length;
console.log('doi.org links:', doiLinks);
console.log('arxiv.org links:', arxivLinks);
console.log('opendata links:', openDataLinks);



