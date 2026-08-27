const fs = require('fs');
const t = fs.readFileSync('.paper-build/mono-z/article.html', 'utf8');

// Check the h3 for sec-outline
let i = t.indexOf('paper-sec-outline');
// Find the h3 tag
let h3Start = t.lastIndexOf('<h3', i);
console.log('=== h3 for sec:outline ===');
console.log(t.substring(h3Start, h3Start + 200));
console.log();

// Check for any leftover sec: labels
const secLabels = t.match(/<h[23][^>]*id="sec:|<h[23][^>]*id="app:/g);
console.log('Leftover sec:/app: label IDs in headings:', secLabels ? secLabels.length : 0);

// Check the eq-anon equations
console.log('\n=== Equation anchors ===');
const eqMatches = [...t.matchAll(/class="eq-anchor"/g)];
eqMatches.forEach((m, i) => {
  const start = m.index - 100;
  const end = m.index + 100;
  console.log('eq ' + i + ':', t.substring(Math.max(0, start), end).replace(/\s+/g, ' ').slice(0, 200));
});






