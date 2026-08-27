import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * GitHub Pages project sites are served from /<repo>/ rather than the domain root.
 * User/org sites (*.github.io) stay unprefixed. Local development uses no prefix.
 */
function githubPagesBasePath() {
  if (process.env.NEXT_PUBLIC_BASE_PATH != null && process.env.NEXT_PUBLIC_BASE_PATH !== "") {
    const raw = process.env.NEXT_PUBLIC_BASE_PATH;
    return raw.startsWith("/") ? raw.replace(/\/$/, "") : `/${raw.replace(/\/$/, "")}`;
  }
  if (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split("/")[1];
    if (repo && !repo.endsWith(".github.io")) return `/${repo}`;
  }
  return "";
}

const basePath = githubPagesBasePath();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
