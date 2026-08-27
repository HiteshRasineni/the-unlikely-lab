const fs = require('fs');
const s = fs.readFileSync('scripts/paper/build.mjs', 'utf8');

// Check Fix 1: equation label stripping
const f1 = s.includes('all.replace(/\\\\label\\{[^}]*\\}/g, "")');
console.log('Fix 1 (strip \\label from equations):', f1 ? 'OK' : 'MISSING');

// Check Fix 2: console.log instead of console.warn
const f2 = !s.includes('console.warn(') && s.includes('console.log(`[paper] note:');
console.log('Fix 2 (console.warn -> console.log):', f2 ? 'OK' : 'MISSING');

// Check Fix 3: section after label stripping
const f3 = s.includes('after = after.replace(/^\\s*\\label\\{[^}]*\\}/');
console.log('Fix 3 (strip \\label from section after):', f3 ? 'OK' : 'MISSING');
