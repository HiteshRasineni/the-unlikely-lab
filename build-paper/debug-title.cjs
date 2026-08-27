const tex = require("fs").readFileSync("paper-source/paper/v1.tex", "utf8");
function readGroup(str, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < str.length; i++) {
    const c = str[i];
    if (c === "\\") { i++; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth===0) return { body: str.slice(openIdx+1, i), end: i }; }
  }
  throw new Error("unbalanced");
}
const tIdx = tex.indexOf("\\title{");
const g = readGroup(tex, tex.indexOf("{", tIdx));
console.log("TITLE BODY RAW:", JSON.stringify(g.body));
const rg = readGroup(g.body, g.body.indexOf("\\texorpdfstring{") + "\\texorpdfstring".length + 1);
console.log("MATCHED GROUP:", JSON.stringify(rg.body), "end char:", JSON.stringify(g.body[rg.end]));
