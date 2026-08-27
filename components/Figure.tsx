type FigureProps = {
  src: string;
  alt: string;
  number?: number | string;
  caption: string;
  source?: string;
  relatedSection?: string;
};

/**
 * Scientific figure with optional numbering, caption, source attribution,
 * and a pointer to the related analysis section. Figures are stored under
 * public/research/<project>/ and referenced by absolute URL.
 */
export default function Figure({
  src,
  alt,
  number,
  caption,
  source,
  relatedSection,
}: FigureProps) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="max-w-full h-auto border border-neutral-200"
      />
      <figcaption className="mt-2 text-sm leading-6 text-neutral-600">
        {number !== undefined && (
          <span className="font-medium text-neutral-800">
            Figure {number}.{" "}
          </span>
        )}
        {caption}
        {relatedSection && (
          <> Related analysis section: {relatedSection}.</>
        )}
        {source && (
          <>
            {" "}
            <span className="font-mono text-xs">Source: {source}</span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
