import type { Metadata } from "next";
import { withBase } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Resume | Bhavishya Chebrolu",
  description:
    "Resume of Bhavishya Chebrolu — undergraduate researcher working at the intersection of machine learning and high-energy physics.",
};

const certifications = [
  {
    name: "Object Tracking and Motion Detection with Computer Vision",
    detail: "MathWorks (Coursera), 2026",
    url: "https://coursera.org/verify/6J3SEDGK797G",
  },
  {
    name: "Machine Learning for Computer Vision",
    detail: "MathWorks (Coursera), 2026",
    url: "https://coursera.org/verify/S46G1L8BYCOGX",
  },
  {
    name: "Bayesian Statistics: Mixture Models",
    detail: "UC Santa Cruz (Coursera), 2026",
    url: "https://coursera.org/verify/8MUYWCWYJZ6E",
  },
  {
    name: "Pattern Discovery in Data Mining",
    detail: "University of Illinois Urbana-Champaign (Coursera), 2026",
    url: "https://coursera.org/verify/M4GU2ZRYDX4H",
  },
  {
    name: "Web Development Internship (HTML, CSS, JavaScript)",
    detail: "ApexPlanet Software Pvt Ltd, May–July 2026 (Certificate ID: APSPL2646294)",
    url: null as string | null,
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="border-b border-neutral-300 pb-1 text-base font-bold tracking-wide text-black">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Entry({
  title,
  right,
  meta,
  children,
}: {
  title: string;
  right?: string;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-[16px] font-semibold text-black">{title}</h3>
        {right && <span className="text-[13px] italic text-neutral-500">{right}</span>}
      </div>
      {meta && <div className="mt-0.5 text-[13px] leading-6 text-neutral-600">{meta}</div>}
      {children && (
        <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[14px] leading-6 text-neutral-700">
          {children}
        </ul>
      )}
    </div>
  );
}

const credClass =
  "text-neutral-500 underline decoration-neutral-300 underline-offset-2 hover:text-black hover:decoration-neutral-800";

export default function BhavishyaResumePage() {
  return (
    <div>
      <header className="border-b border-neutral-200 pb-6 text-center">
        <h1 className="text-2xl font-bold text-black sm:text-3xl">Bhavishya Chebrolu</h1>
        <p className="mt-3 text-[13px] leading-6 text-neutral-600">
          <a className={credClass} href="mailto:chebrolubhavishya@gmail.com">chebrolubhavishya@gmail.com</a>
          <span className="mx-2">·</span>+91 9030981081
          <span className="mx-2">·</span>
          <a className={credClass} href="https://orcid.org/0009-0000-9770-0975" target="_blank" rel="noopener noreferrer">ORCID</a>
          <span className="mx-2">·</span>
          <a className={credClass} href="https://www.linkedin.com/in/chebrolu-bhavishya-9b0a8138a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="mx-2">·</span>
          <a className={credClass} href="https://github.com/cbhavishya" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
        <p className="mt-3 text-[13px]">
          <a
            href={withBase("/resume-bhavishya.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 underline decoration-neutral-300 underline-offset-2 hover:text-black"
          >
            PDF version
          </a>
        </p>
      </header>

      <Section title="ABOUT ME">
        <p className="max-w-prose text-[15px] leading-7 text-neutral-800">
          Undergraduate researcher working at the intersection of Machine Learning and High Energy
          Physics, with experience in density estimation and likelihood-ratio methods for dark
          matter searches and unsupervised anomaly detection using CMS open data. Co-author of
          three arXiv preprints on machine-learning-based searches with CMS open data.
        </p>
      </Section>

      <Section title="EDUCATION">
        <Entry
          title="Mohan Babu University, Tirupati, India"
          right="2023 — 2027"
          meta={
            <span>
              B.Tech{" "}
              <span className="float-right font-medium text-neutral-700">CGPA: 9.19 / 10</span>
            </span>
          }
        />
        <Entry
          title="Sree Vidyanikethan International School, Tirupati, India"
          right="2023"
          meta={
            <span>
              CBSE (10+2){" "}
              <span className="float-right font-medium text-neutral-700">Grade: 92.4 / 100</span>
            </span>
          }
        />
      </Section>

      <Section title="SELECTED PROJECTS">
        <Entry
          title="The Unlikely Lab — Research Group Website"
          right="Next.js, TypeScript, MDX, Tailwind CSS"
          meta={
            <>
              Site:{" "}
              <a
                className={credClass}
                href="https://hiteshrasineni.github.io/the-unlikely-lab/"
                target="_blank"
                rel="noopener noreferrer"
              >
                hiteshrasineni.github.io/the-unlikely-lab
              </a>
              <span className="mx-2">·</span>
              Code:{" "}
              <a
                className={credClass}
                href="https://github.com/HiteshRasineni/the-unlikely-lab"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/HiteshRasineni/the-unlikely-lab
              </a>
            </>
          }
        >
          <li>
            Co-developed a static research-laboratory website (Next.js App Router, TypeScript,
            Tailwind CSS) that publishes ML × collider-physics research studies and technical notes
            as MDX content with frontmatter-driven metadata, publication information, and
            related-research links, with KaTeX for publication-grade math rendering.
          </li>
          <li>
            Automated LaTeX → HTML conversion of arXiv manuscripts via a Pandoc build pipeline and
            deployed the fully static export to GitHub Pages using a GitHub Actions CI/CD workflow.
          </li>
        </Entry>

        <Entry
          title="Mono-Z Analysis"
          right="Python, PyTorch, uproot, MadGraph5"
          meta={
            <>
              Leptonic channels:{" "}
              <a
                className={credClass}
                href="https://github.com/HiteshRasineni/Leptonic-Mono-z-CMS2015-DarkMatter-Search"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/HiteshRasineni/Leptonic-Mono-z-CMS2015-DarkMatter-Search
              </a>
              <span className="block">
                Hadronic channel:{" "}
                <a
                  className={credClass}
                  href="https://github.com/HiteshRasineni/CMS2015DarkMatterSearch-HTMHT-"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/HiteshRasineni/CMS2015DarkMatterSearch-HTMHT-
                </a>
              </span>
            </>
          }
        >
          <li>
            Co-developed the public analysis code for both mono-Z papers, maintained as two
            channel-specific repositories. Leptonic (μμ / ee): CMS MiniAOD extraction with uproot,
            cleaning, EDA, Neural Spline Flow training/scoring, and profile-likelihood CLs fits.
            Hadronic (Z → jj, CMS Run 2015D HTMHT sample): event selection, conditional
            flow-matching background model, and projected CLs sensitivity for vector and
            axial-vector mediators.
          </li>
        </Entry>
      </Section>

      <Section title="RESEARCH EXPERIENCE">
        <Entry
          title="Leptonic Mono-Z Dark Matter Search with Neural Spline Flows"
          right="CMS Run 2015D Open Data"
          meta={
            <>
              <strong>B. Chebrolu</strong>, H. Rasineni. arXiv preprint, 2026 (submitted for
              journal publication). DOI:{" "}
              <a className={credClass} href="https://doi.org/10.48550/arXiv.2607.13771" target="_blank" rel="noopener noreferrer">
                10.48550/arXiv.2607.13771
              </a>
            </>
          }
        >
          <li>
            Co-developed a mono-Z dark matter search on 2.32 fb⁻¹ of CMS Run 2015D data (parallel
            μμ/ee channels) using Neural Spline Flows: channel-specific SM background flows and
            mediator-specific signal flows, with the per-event log-likelihood ratio
            log p(x|DM) − log p(x|SM) as the test statistic followed by a simultaneous SR+VR
            binned profile-likelihood fit to set 95% CL limits on the signal strength.
          </li>
        </Entry>

        <Entry
          title="Hadronic Mono-Z Dark Matter Sensitivity with Flow Matching"
          right="CMS Run 2015D HTMHT Open Data"
          meta={
            <>
              <strong>B. Chebrolu</strong>, H. Rasineni. arXiv preprint, 2026. DOI:{" "}
              <a className={credClass} href="https://doi.org/10.48550/arXiv.2609.02923" target="_blank" rel="noopener noreferrer">
                10.48550/arXiv.2609.02923
              </a>
            </>
          }
        >
          <li>
            Co-developed the full simulation-to-inference pipeline (MadGraph5_aMC@NLO → Pythia 8 →
            Delphes signal generation) with a conditional flow-matching normalizing flow trained on
            real HTMHT events, including sentinel imputation for missing-object features and
            projected expected significances of 2.89σ, 7.62σ, and 7.41σ for three simplified-model
            benchmarks.
          </li>
        </Entry>

        <Entry
          title="Likelihood-Based Unsupervised Anomaly Detection in CMS Dijet Events"
          right="CMS Open Data Dijet Sample"
          meta={
            <>
              <strong>B. Chebrolu</strong>, H. Rasineni, P.A. Immadi. arXiv preprint, 2026. DOI:{" "}
              <a className={credClass} href="https://doi.org/10.48550/arXiv.2609.06686" target="_blank" rel="noopener noreferrer">
                10.48550/arXiv.2609.06686
              </a>
            </>
          }
        >
          <li>
            Co-developed an unsupervised search for anomalous dijet events using neural spline flow
            density estimation: a normalizing flow trained on jet, dijet, and event-level
            observables to learn the Standard Model background directly from data without a signal
            hypothesis, flagging low-likelihood events, with extensive validation via
            mass-decorrelation tests, permutation-based null tests, and training-stability studies.
          </li>
        </Entry>
      </Section>

      <Section title="TECHNICAL SKILLS">
        <div className="space-y-1 text-[14px] leading-6 text-neutral-700">
          <p>
            <span className="font-semibold text-black">Languages:</span> Python, Java, SQL,
            JavaScript / TypeScript (React, Next.js)
          </p>
          <p>
            <span className="font-semibold text-black">ML/Data:</span> PyTorch, scikit-learn,
            OpenCV, Pandas, Matplotlib, Density Estimation (Normalizing Flows, Likelihood Ratios)
          </p>
          <p>
            <span className="font-semibold text-black">Web/Platform:</span> Next.js, React,
            TypeScript, Tailwind CSS, MDX
          </p>
          <p>
            <span className="font-semibold text-black">Tools/Infra:</span> Git, GitHub Actions
            (CI/CD), Docker, Pandoc, LaTeX, uproot, Google Colab
          </p>
        </div>
      </Section>

      <Section title="CERTIFICATIONS">
        <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-6 text-neutral-700">
          {certifications.map((c) => (
            <li key={c.name}>
              <span className="font-semibold text-black">{c.name}</span>
              {c.detail && <span> — {c.detail}</span>}{" "}
              {c.url && (
                <a className={credClass} href={c.url} target="_blank" rel="noopener noreferrer">
                  (Credential)
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}