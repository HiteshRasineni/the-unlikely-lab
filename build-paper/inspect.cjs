const t = require("fs").readFileSync(".paper-build/mono-z/article.html", "utf8");
console.log("len", t.length);
const c = (re) => (t.match(re) || []).length;
console.log("imgs", c(/<img/g), "figures", c(/<figure/g), "tables", c(/<table/g),
  "cite-links", c(/cite-link/g), "ref-links", c(/ref-link/g),
  "captions", c(/figcaption|<caption>/g), "eq-anchors", c(/eq-anchor/g));
const i = t.indexOf("<figure");
console.log(t.slice(i, i + 700));
const j = t.indexOf('href="#paper-sec:introduction"');
console.log("...", t.slice(j - 120, j + 160));