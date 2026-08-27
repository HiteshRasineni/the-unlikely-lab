import type { MDXComponents } from "mdx/types";
import Equation from "@/components/Equation";
import Figure from "@/components/Figure";
import DatasetInfo from "@/components/DatasetInfo";
import CodeLink from "@/components/CodeLink";
import PublicationInfo from "@/components/PublicationInfo";
import RelatedResearch from "@/components/RelatedResearch";
import MdxLink from "@/components/MdxLink";

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  Equation,
  Figure,
  DatasetInfo,
  CodeLink,
  PublicationInfo,
  RelatedResearch,
};
