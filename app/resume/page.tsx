import type { Metadata } from "next";
import { withBase } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Resume | Hitesh Rasineni",
  description:
    "Resume of Hitesh Rasineni — CS undergraduate working at the intersection of machine learning, statistics, and high-energy physics.",
};

const certifications = [
  {
    name: "Microsoft Certified: Azure AI Fundamentals",
    detail: null as string | null,
    url: "https://learn.microsoft.com/api/credentials/share/en-us/HITESHRASINENI-3396/2B13A3926B2B5518?sharingId=A2C6EE6C50EBF968",
  },
  {
    name: "AWS Academy Graduate — Cloud Foundations (Training Badge)",
    detail: null as string | null,
    url: "https://www.credly.com/badges/15ae8a97-ffca-433e-9c19-c2bf0378235e/public_url",
  },
  {
    name: "WorldQuant University, Applied AI Lab — Deep Learning for Computer Vision",
    detail: "YOLOv8, MTCNN, Inception-ResNetV1",
    url: "https://www.credly.com/badges/e8b72ccb-1a38-4c4f-a37a-dbf244040b6c/public_url",
  },
  {
    name: "IBM Machine Learning Specialist (Professional V1)",
    detail: "EDA, ensembles, transfer learning",
    url: "https://www.credly.com/badges/35dff9ca-a5e7-4eb3-b4d2-4238c2db9bc7/public_url",
  },
  {
    name: "NVIDIA DLI — Fundamentals of Deep Learning",
    detail: null as string | null,
    url: "https://learn.nvidia.com/certificates?id=M9baXjZ8TW6ghKRd5bO13A#",
  },
  {
    name: "NVIDIA DLI — Transformer-based NLP",
    detail: null as string | null,
    url: "https://learn.nvidia.com/certificates?id=s1Js_qe2T-icVz7u8xKSfw",
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

export default function ResumePage() {
  return (
    <div>
      <header className="border-b border-neutral-200 pb-6 text-center">
        <h1 className="text-2xl font-bold text-black sm:text-3xl">Hitesh Rasineni</h1>
        <p className="mt-3 text-[13px] leading-6 text-neutral-600">
          <a className={credClass} href="mailto:hiteshrasineni.07@gmail.com">hiteshrasineni.07@gmail.com</a>
          <span className="mx-2">·</span>+91 7901076965
          <span className="mx-2">·</span>
          <a className={credClass} href="https://orcid.org/0009-0003-4958-0915" target="_blank" rel="noopener noreferrer">ORCID</a>
          <span className="mx-2">·</span>
          <a className={credClass} href="https://www.linkedin.com/in/hitesh-rasineni-084925322/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="mx-2">·</span>
          <a className={credClass} href="https://github.com/HiteshRasineni" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
        <p className="mt-3 text-[13px]">
          <a
            href={withBase("/resume.pdf")}
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
          CS undergraduate working at the intersection of Machine Learning, statistics, and High Energy Physics, with experience in density estimation and clustering for particle-physics data. Focused on advancing density estimation techniques and applying them to Beyond the Standard Model (BSM) physics.
        </p>
      </Section>

      <Section title="EDUCATION">
        <Entry
          title="VIT-AP University, Amaravati, Andhra Pradesh, India"
          right="September 2023 — September 2027"
          meta={
            <span>
              B.Tech, CSE (AI &amp; ML){" "}
              <span className="float-right font-medium text-neutral-700">CGPA: 8.05 / 10</span>
            </span>
          }
        />
        <Entry
          title="Sree Vidyanikethan International School, Tirupati, India"
          right="2023"
          meta={
            <span>
              CBSE (10+2){" "}
              <span className="float-right font-medium text-neutral-700">Grade: 91.6 / 100</span>
            </span>
          }
        />
      </Section>

      <Section title="SELECTED PROJECTS">
        <Entry
          title="The Unlikely Lab — Personal Research Publication Platform"
          right="hiteshrasineni.github.io/the-unlikely-lab"
          meta={
            <>
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
            Designed and deployed a full research-publication platform that hosts complete, typeset
            HTML versions of arXiv-style physics papers (sections, numbered equations, figures,
            tables, bibliography) alongside an MDX-driven content system for research notes and
            project pages.
          </li>
          <li>
            Built an automated LaTeX-to-HTML paper build pipeline with Pandoc, including
            MathML/KaTeX rendering, figure/table validation reports, and per-paper static generation;
            the site is a statically exported Next.js (React, TypeScript, Tailwind CSS) application
            deployed via GitHub Actions CI/CD to GitHub Pages.
          </li>
        </Entry>
        <Entry
          title="Cloud-Native ML Training Platform"
          right="FastAPI, Docker, Next.js, PyTorch"
          meta={
            <>
              Code:{" "}
              <a
                className={credClass}
                href="https://github.com/HiteshRasineni/Cloud-Native-ML-Training-Platform-for-Scientific-Data"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/HiteshRasineni/Cloud-Native-ML-Training-Platform-for-Scientific-Data
              </a>
            </>
          }
        >
          <li>
            Built a cloud-native ML experiment-orchestration platform for HEP data with a working
            end-to-end vertical slice: a FastAPI backend (PostgreSQL/Alembic + Redis) validates
            specs, resolves dataset references against a registry, and enqueues jobs; the scheduler
            runs a QUEUED → SCHEDULING → RUNNING → COMPLETED/FAILED lifecycle (with retries) via a
            pluggable executor (Docker now, Kubernetes stubbed), launching workload containers that
            report per-epoch metrics to MLflow + Redis; the Next.js/TypeScript frontend submits
            experiments and renders loss curves through a backend MLflow proxy.
          </li>
          <li>
            Separated storage responsibilities so PostgreSQL owns lifecycle/scheduling state, the
            dataset registry and artifact index, MLflow (SQLite) owns params, metrics and model
            artifacts, and MinIO owns datasets, checkpoints and logs; a pluggable worker workload
            registry runs a from-scratch RealNVP-style normalizing flow in PyTorch (architecture
            fully spec-driven) alongside a no-op workload, all orchestrated by a docker-compose
            stack with pytest suites in the backend and worker.
          </li>
        </Entry>
      </Section>

      <Section title="RESEARCH EXPERIENCE">
        <h3 className="text-[15px] font-bold tracking-wide text-black">
          Dark Matter Mono-Z (Density Estimation)
        </h3>
        <div className="mt-2 border-l-2 border-neutral-200 pl-4">
        <Entry
          title="Leptonic Mono-Z Dark Matter Search with Neural Spline Flows"
          right="CMS Run 2015D Open Data"
          meta={
            <>
              H. Rasineni, B. Chebrolu. arXiv preprint, 2026 (submitted for journal publication).{" "}
              <em>Leptonic decay channel.</em> DOI:{" "}
              <a className={credClass} href="https://doi.org/10.48550/arXiv.2607.13771" target="_blank" rel="noopener noreferrer">
                10.48550/arXiv.2607.13771
              </a>
              <span className="block">
                Code:{" "}
                <a
                  className={credClass}
                  href="https://github.com/HiteshRasineni/Leptonic-Mono-z-CMS2015-DarkMatter-Search"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/HiteshRasineni/Leptonic-Mono-z-CMS2015-DarkMatter-Search
                </a>
              </span>
            </>
          }
        >
          <li>
            Trained five neural spline flows on 2.32 fb⁻¹ of CMS Run 2015D data (μμ/ee channels,
            37-dim features) and set 95% CL signal-strength limits via an SR+VR profile-likelihood
            fit: μ &lt; 0.018 (scalar), 0.036 (vector), 0.050 (axial-vector).
          </li>
        </Entry>

        <Entry
          title="Hadronic Mono-Z Dark Matter Sensitivity with Flow Matching"
          right="CMS Run 2015D HTMHT Open Data"
          meta={
            <>
              H. Rasineni, B. Chebrolu. arXiv preprint, 2026. <em>Hadronic decay channel.</em>{" "}
              DOI:{" "}
              <a className={credClass} href="https://doi.org/10.48550/arXiv.2609.02923" target="_blank" rel="noopener noreferrer">
                10.48550/arXiv.2609.02923
              </a>
              <span className="block">
                Code:{" "}
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
            Built the MadGraph5_aMC@NLO → Pythia 8 → Delphes pipeline (1.44M selected events) with a
            conditional flow-matching background model; projected expected significances of 2.89σ,
            7.62σ, and 7.41σ, with extra-jet kinematics carrying 53–71% of the discriminating power.
          </li>
        </Entry>
        </div>

        <Entry
          title="Likelihood-Based Unsupervised Anomaly Detection in CMS Dijet Events"
          right="CMS Run 2011B HT Open Data"
          meta={
            <>
              B. Chebrolu, H. Rasineni, P.A. Immadi (equal contribution). arXiv preprint, 2026.
              DOI:{" "}
              <a className={credClass} href="https://doi.org/10.48550/arXiv.2609.06686" target="_blank" rel="noopener noreferrer">
                10.48550/arXiv.2609.06686
              </a>
              <span className="block">
                Paper:{" "}
                <a
                  className={credClass}
                  href={withBase("/research/dijet-anomaly")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hiteshrasineni.github.io/the-unlikely-lab/research/dijet-anomaly
                </a>
              </span>
            </>
          }
        >
          <li>
            Unsupervised, model-independent anomaly search on 378,278 CMS Run 2011B HT events
            (√s = 7 TeV): a neural spline flow learned the SM multijet background from
            jet-substructure and event-shape observables; the 99.9th-percentile low-likelihood tail
            was validated with mass-decorrelation, permutation-null, and stability tests (&gt;88%
            overlap across seeds, rank correlation &gt;0.95).
          </li>
        </Entry>



        <Entry
          title="Improving Discovery-Significance Stability in Higgs Event Classification"
          right="HiggsML H→τ⁺τ⁻ benchmark"
          meta={
            <>
              J.J. Pujari, P.A. Immadi, H. Rasineni, T. Bikku, R.S. Puppala.{" "}
              <em>Discover Artificial Intelligence</em> (Springer Nature), 2026. DOI:{" "}
              <a className={credClass} href="https://doi.org/10.1007/s44163-026-01683-5" target="_blank" rel="noopener noreferrer">
                10.1007/s44163-026-01683-5
              </a>
            </>
          }
        >
          <li>
            Supervised contrastive pre-training with a parallel FT-Transformer + XGBoost ensemble
            reduced fold-to-fold variance in Approximate Median Significance (AMS = 3.74) versus
            focal-loss training, enabling more stable threshold selection.
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
            <span className="font-semibold text-black">ML/Data:</span> PyTorch, scikit-learn, OpenCV,
            Pandas, Matplotlib, Density Estimation (Normalizing Flows, Likelihood Ratios)
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
              {c.detail && <span> ({c.detail})</span>}{" "}
              <a className={credClass} href={c.url} target="_blank" rel="noopener noreferrer">
                (Credential)
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

