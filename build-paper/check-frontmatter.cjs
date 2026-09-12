/**
 * Dependency-free sanity check for research frontmatter:
 * - top-level `codeUrl:` must be present (unindented) so lib/content.ts
 *   surfaces it as frontmatter.codeUrl (not publication.codeUrl)
 * - the `publication:` block must retain its expected keys
 * Run: node build-paper/check-frontmatter.cjs
 */
const fs = require("fs");
const path = require("path");

const slugs = ["mono-z", "z-hadronic"];

for (const slug of slugs) {
  const file = path.join(__dirname, "..", "content", "research", slug, "index.mdx");
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) {
    console.error(`FAIL ${slug}: frontmatter delimiters not found`);
    process.exitCode = 1;
    continue;
  }
  const lines = m[1].split(/\r?\n/);

  // top-level keys: lines with no leading whitespace, ending with ':'
  const topLevel = new Set();
  for (const line of lines) {
    if (/^\S.*:$/.test(line) || /^\S.*:\s/.test(line)) {
      topLevel.add(line.split(":")[0].trim());
    }
  }

  // publication block keys: 2-space indented keys after 'publication:'
  const pubKeys = new Set();
  let inPub = false;
  for (const line of lines) {
    if (/^publication:\s*$/.test(line)) { inPub = true; continue; }
    if (inPub) {
      if (/^\S/.test(line)) inPub = false;
      else {
        const k = line.match(/^\s{2}([A-Za-z_][\w-]*):/);
        if (k) pubKeys.add(k[1]);
      }
    }
  }

  const checks = [
    [topLevel.has("codeUrl"), "top-level codeUrl present"],
    [topLevel.has("publication"), "top-level publication present"],
    [pubKeys.has("doi"), "publication.doi present"],
    [pubKeys.has("preprint"), "publication.preprint present"],
    [pubKeys.has("pdf"), "publication.pdf present"],
    [pubKeys.has("authors"), "publication.authors present"],
    [!pubKeys.has("codeUrl"), "codeUrl NOT nested inside publication block"],
  ];

  for (const [ok, msg] of checks) {
    if (ok) console.log(`  ok   ${slug}: ${msg}`);
    else { console.error(`  FAIL ${slug}: ${msg}`); process.exitCode = 1; }
  }
}