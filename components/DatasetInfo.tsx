/**
 * Dataset information block. Only factual, configured information about
 * datasets should be passed in.
 */
export default function DatasetInfo({
  name,
  description,
  url,
}: {
  name: string;
  description?: string;
  url?: string;
}) {
  return (
    <div className="my-4 border border-neutral-200 p-4 text-[15px] leading-6">
      <p className="font-medium text-black">{name}</p>
      {description && <p className="mt-1 text-neutral-700">{description}</p>}
      {url && (
        <p className="mt-1">
          <a href={url} rel="noopener noreferrer">
            {url}
          </a>
        </p>
      )}
    </div>
  );
}
