import type { PaperManifest } from "@/lib/paper";
import type { ResearchFrontmatter } from "@/lib/content";

export default function PaperHeader({
  manifest,
  publication,
}: {
  manifest: PaperManifest;
  publication?: ResearchFrontmatter["publication"];
}) {
  const affilOf = (a: (typeof manifest.authors)[number]) =>
    a.affilNums.map((n) => manifest.affiliations.find((x) => x.num === n)?.text).filter(Boolean);

  return (
    <header className="paper-header mb-10 border-b border-neutral-200 pb-8">
      <h1 className="text-2xl font-semibold leading-snug text-black sm:text-[28px]">
        {manifest.title}
      </h1>

      <div className="mt-4 text-[16px] leading-7 text-neutral-800">
        <p className="author-list">
          {manifest.authors.map((a, i) => (
            <span key={a.name}>
              {i > 0 && ", "}
              <span className="font-medium">{a.name}</span>
              {a.dagger && <sup>&dagger;</sup>}
              {affilOf(a).length > 0 && <sup>{a.affilNums.join(",")}</sup>}
            </span>
          ))}
        </p>
        <ul className="mt-1 space-y-0.5 pl-5 text-[14px] leading-6 text-neutral-600">
          {manifest.affiliations.map((aff) => (
            <li key={aff.num} className="list-none -ml-5 before:mr-1">
              <sup>{aff.num}</sup> {aff.text}
            </li>
          ))}
        </ul>
      </div>

      {manifest.equalContribution && (
        <p className="mt-3 text-[13px] italic text-neutral-500">
          &dagger;&nbsp;These authors contributed equally and share first authorship.
        </p>
      )}
      {manifest.correspondingEmail && (
        <p className="mt-1 text-[13px] text-neutral-500">
          Corresponding author:{" "}
          <a href={`mailto:${manifest.correspondingEmail}`}>{manifest.correspondingEmail}</a>
        </p>
      )}
      {publication?.doi && (
        <p className="mt-1 text-[13px] text-neutral-600">
          Preprint DOI:{" "}
          <a
            href={
              publication.doi.startsWith("http")
                ? publication.doi
                : `https://doi.org/${publication.doi}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {publication.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")}
          </a>
          {publication.journal && (
            <span className="text-neutral-500"> ({publication.journal})</span>
          )}
        </p>
      )}

      <p className="mt-4 font-mono text-xs text-neutral-500">
        {manifest.counts.sections + manifest.counts.subsections} sections &middot;{" "}
        {manifest.counts.figures} figures &middot; {manifest.counts.tables} tables &middot;{" "}
        {manifest.counts.citations} references
      </p>
    </header>
  );
}
