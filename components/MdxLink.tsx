import { withBase } from "@/lib/paths";
import type { AnchorHTMLAttributes } from "react";

/** MDX markdown links are plain anchors; prefix them for GitHub Pages. */
export default function MdxLink({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const resolved = href ? withBase(href) : href;
  const external = Boolean(href && /^(https?:)?\/\//.test(href));
  return (
    <a
      {...props}
      href={resolved}
      {...(external ? { rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
