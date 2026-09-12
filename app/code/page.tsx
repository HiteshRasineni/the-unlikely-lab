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
            <span className="font-medium">Mono-Z Analysis</span>
            <span className="block text-[14px] text-neutral-600">
              Analysis code for both mono-Z papers — the leptonic-channel study{" "}
              <em>Mono-Z Dark Matter Search with Neural Spline Flows</em> and the
              hadronic-channel study{" "}
              <em>Hadronic Mono-Z Dark Matter Sensitivity with Flow Matching</em> —
              maintained as two channel-specific repositories:
            </span>
            <ul className="mt-2 space-y-1.5 text-[14px]">
              <li>
                <a
                  href="https://github.com/HiteshRasineni/Leptonic-Mono-z-CMS2015-DarkMatter-Search"
                  rel="noopener noreferrer"
                >
                  Leptonic-Mono-z-CMS2015-DarkMatter-Search
                </a>
                <span className="block text-neutral-600">
                  Leptonic channels (&mu;&mu; and e<sup>+</sup>e<sup>&minus;</sup>):
                  extraction, cleaning, EDA, Neural Spline Flow training/scoring,
                  and profile-likelihood CLs fits.
                </span>
              </li>
              <li>
                <a
                  href="https://github.com/HiteshRasineni/CMS2015DarkMatterSearch-HTMHT-"
                  rel="noopener noreferrer"
                >
                  CMS2015DarkMatterSearch-HTMHT-
                </a>
                <span className="block text-neutral-600">
                  Hadronic channel (Z &rarr; jj, CMS Run 2015D HTMHT sample):
                  event selection, flow-matching background model, and projected
                  CLs sensitivity for vector and axial-vector mediators.
                </span>
              </li>
            </ul>
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
