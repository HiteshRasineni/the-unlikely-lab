import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code",
  description:
    "How research code is organized at The Unlikely Lab: analysis pipelines, models, utilities, and reproducibility.",
};

export default function CodePage() {
  return (
    <div>
      <header className="mb-8 border-b border-neutral-200 pb-6">
        <h1 className="text-2xl font-semibold text-black sm:text-3xl">Code</h1>
        <p className="mt-3 max-w-prose text-[16px] leading-7 text-neutral-700">
          Code at The Unlikely Lab is organized around reproducibility. Analysis
          code is written so that a result shown on a research page can be
          traced back to the data and the pipeline that produced it.
        </p>
      </header>

      <section aria-labelledby="code-analysis">
        <h2 id="code-analysis" className="border-b border-neutral-200 pb-1 text-lg font-semibold">
          Analysis
        </h2>
        <p className="mt-3 max-w-prose text-[15px] leading-6 text-neutral-700">
          Analysis repositories contain event selection, preprocessing, and
          statistical-inference pipelines corresponding to the research studies.
          Each public repository is linked from the corresponding research page.
        </p>
        <ul className="mt-3 max-w-prose space-y-3">
          <li>
            <a
              href="https://github.com/HiteshRasineni/Leptonic-Mono-z-CMS2015-DarkMatter-Search"
              rel="noopener noreferrer"
            >
              Leptonic-Mono-z-CMS2015-DarkMatter-Search
            </a>
            <span className="block text-[14px] text-neutral-600">
              Analysis for the{" "}
              <em>Mono-Z Dark Matter Search with Neural Spline Flows</em> study:
              extraction, cleaning, EDA, NSF training/scoring, and profile-likelihood
              CLs fits in the &mu;&mu; and e<sup>+</sup>e<sup>&minus;</sup> channels.
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="code-models">
        <h2 id="code-models" className="border-b border-neutral-200 pb-1 text-lg font-semibold">
          Models
        </h2>
        <p className="mt-3 max-w-prose text-[15px] leading-6 text-neutral-700">
          Model implementations include normalizing-flow architectures used for
          density estimation over collider event observables. Implementations
          are documented on the research pages that use them, including model
          structure and training configuration where available.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="code-utilities">
        <h2 id="code-utilities" className="border-b border-neutral-200 pb-1 text-lg font-semibold">
          Utilities
        </h2>
        <p className="mt-3 max-w-prose text-[15px] leading-6 text-neutral-700">
          Preprocessing and analysis utilities — dataset handling, feature
          construction from physics objects, and evaluation routines — are kept
          close to the analyses that depend on them.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="code-repro">
        <h2 id="code-repro" className="border-b border-neutral-200 pb-1 text-lg font-semibold">
          Reproducibility
        </h2>
        <p className="mt-3 max-w-prose text-[15px] leading-6 text-neutral-700">
          Each research page links directly to the relevant code and data for
          that study. Datasets are referenced to their original sources — such
          as the CMS Open Data portal — so that the provenance of every input is
          explicit. Results are only published on this site when they can be
          tied to data and figures produced by the corresponding pipeline.
        </p>
      </section>
    </div>
  );
}
