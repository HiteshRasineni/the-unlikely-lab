/**
 * Link to a code repository. Rendered only when an actual repository URL
 * has been configured; nothing is invented.
 */
export default function CodeLink({ url, label }: { url?: string; label?: string }) {
  if (!url) return null;
  return (
    <p className="my-3 text-[15px]">
      <span className="font-mono text-sm">{label ?? "Repository"}:</span>{" "}
      <a href={url} rel="noopener noreferrer">
        {url}
      </a>
    </p>
  );
}
