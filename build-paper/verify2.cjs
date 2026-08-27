const cheerio = require("cheerio");
const $ = cheerio.load(require("fs").readFileSync("build-paper/paper-page.html", "utf8"));

console.log("=== ARTICLE HEADINGS (visible) ===");
$("article .paper-body h2, article .paper-body h3").each(function () {
  const c = $(this).clone();
  c.find("annotation").remove();
  console.log(" ", $(this).prop("tagName"), c.text().replace(/\s+/g, " ").slice(0, 60));
});

console.log("\n=== PAPER HEADER ===");
console.log("Title:", $(".paper-header h1").first().text().replace(/\s+/g, " ").slice(0, 100));
console.log("Authors:", $(".paper-header .author-list").text().replace(/\s+/g, " "));
$(".paper-header ul > li").each(function () {
  console.log("  affil:", $(this).text().replace(/\s+/g, " ").slice(0, 70));
});

console.log("\n=== CONTROLS ===");
$("article > div:contains('HTML') .flex, article .border-y").first();
$("article div[class*=border-y] a, article div[class*=border-y] span").each(function () {
  console.log("  control:", JSON.stringify($(this).text().trim()));
});

console.log("\n=== EQUATIONS (MathML block) ===");
console.log("display math count:", $("math[display=block]").length);
console.log("eq-anchor count:", $(".eq-anchor").length);

console.log("\n=== CITATION / REF EXAMPLES ===");
console.log("sample citation:", $(".paper-body .citation").first().text().replace(/\s+/g, " "));
console.log("first ref-link href:", $(".paper-body a.ref-link").first().attr("href"));

console.log("\n=== FIGURE / TABLE counts ===");
console.log("figures:", $("article .paper-body figure").length, "tables:", $("article .paper-body table").length);
console.log("figcaption count:", $("article .paper-body figcaption").length);

console.log("\n=== ABSTRACT PRESENT ===");
const bodyText = $("article .paper-body").text().replace(/\s+/g, " ");
console.log("has 'We report a search for dark matter':", /We report a search for dark matter/.test(bodyText));
console.log("has 'Conor Durkan' (reference):", /Conor Durkan/.test(bodyText));
