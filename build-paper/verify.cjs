const cheerio = require("cheerio");
const t = require("fs").readFileSync("build-paper/paper-page.html", "utf8");
const $ = cheerio.load(t);

// visible body text
const bodyText = $("body").text().replace(/\s+/g, " ");

console.log("=== HEADINGS ===");
$("h1,h2,h3").each((i, el) => {
  const id = $(el).attr("id");
  console.log($(el).prop("tagName"), "[" + (id||"") + "]", $(el).text().replace(/\s+/g," ").slice(0, 80));
});

console.log("\n=== First paragraph ===");
console.log($("article .paper-body p").first().text().replace(/\s+/g," ").slice(0, 200));

console.log("\n=== First figure caption ===");
console.log($("figure figcaption").first().text().replace(/\s+/g," ").slice(0, 200));

console.log("\n=== First citation ===");
console.log($(".citation a").first().attr && $(".paper-body .citation a").first().text());

console.log("\n=== First empty-paragraph / equation check ===");
const displayMath = $("math[display=block]").length;
console.log("display math blocks:", displayMath);
console.log("first table has caption:", $("table").first().text().length > 40);

console.log("\n=== TOC ===");
$(".paper-toc a").each((i, el) => console.log("  ", $(el).text().replace(/\s+/g," ").slice(0,60)));

console.log("\n=== Has abstract text ===");
console.log(/We report a search for dark matter/.test(bodyText));
console.log("=== Has a real reference ===");
console.log(/Neural spline flows/.test(bodyText));
