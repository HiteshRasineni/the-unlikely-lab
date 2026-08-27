import type { ResearchFrontmatter } from "@/lib/content";

/**
 * Renders a research publication block. Fields are rendered only when
 * actual information is present — no invented publication metadata.
 */
export function PublicationInfo({
  publication,
}: {
  publication?: ResearchFrontmatter["publication"];
}) {
  if (!publication) return null;
  return (
    <div className="my-4 border border-neutral-200 bg-neutral-50 p-4 text-[15px] leading-6">
      {publication.title && (
        <p className="font-medium text-black">{publication.title}</p>
      )}
      {publication.authors && publication.authors.length > 0 && (
        <p>{publication.authors.join(", ")}</p>
      )}
      {publication.journal && (
        <p className="text-neutral-600 italic">{publication.journal}</p>
      )}
      {(publication.doi || publication.preprint || publication.pdf) && (
        <ul className="mt-2 space-y-0.5">
          {publication.doi && (
            <li>
              DOI:{" "}
              <a
                href={
                  publication.doi.startsWith("http")
                    ? publication.doi
                    : `https://doi.org/${publication.doi}`
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {publication.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")}
              </a>
            </li>
          )}
          {publication.preprint && (
            <li>
              Preprint:{" "}
              <a href={publication.preprint} rel="noopener noreferrer">
                {publication.preprint}
              </a>
            </li>
          )}
          {publication.pdf && (
            <li>
              <a href={publication.pdf} rel="noopener noreferrer">
                PDF
              </a>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default PublicationInfo;
