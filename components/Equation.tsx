import katex from "katex";
import type { ReactNode } from "react";

type EquationProps = {
  children: string;
  block?: boolean;
};

/**
 * Server-rendered KaTeX equation. Math is rendered to HTML on the server;
 * no images are used.
 */
export default function Equation({ children, block = true }: EquationProps) {
  const html = katex.renderToString(children.trim(), {
    displayMode: block,
    throwOnError: false,
  });
  return (
    <span
      className={block ? "equation-display block" : "inline-block"}
      role="math"
      aria-label={`equation: ${children.trim()}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
