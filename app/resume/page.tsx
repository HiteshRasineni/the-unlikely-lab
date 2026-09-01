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

      <Section title="RESEARCH">
        <Entry
          title="Leptonic Mono-Z Dark Matter Search with Neural Spline Flows"
          right="CMS Run 2015D Open Data"
          meta={
            <>
              Code:{" "}
              <a
                className={credClass}
                href="https://github.com/HiteshRasineni/Leptonic-Mono-z-CMS2015-DarkMatter-Search"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/HiteshRasineni/Leptonic-Mono-z-CMS2015-DarkMatter-Search
              </a>
            </>
          }
        >
          <li>
            Trained five Neural Spline Flows on 2.32 fb⁻¹ of CMS Run 2015D data (parallel μμ/ee
            channels; 40 observables from MINIAOD reduced to a 37-dim feature vector): two
            channel-specific SM background flows learned from control-region Drell–Yan events, and
            three mediator-specific signal flows (vector, axial-vector, scalar) from MadGraph-based MC.
          </li>
          <li>
            Used the per-event log-likelihood ratio log p(x|DM) − log p(x|SM) as the test statistic,
            followed by a simultaneous SR+VR binned profile-likelihood fit; set 95% CL observed limits
            on the signal strength of μ &lt; 0.018 (scalar), 0.036 (vector), and 0.050 (axial-vector).
          </li>
        </Entry>

        <Entry
          title="Hadronic Mono-Z Dark Matter Sensitivity with Flow Matching"
          right="CMS Run 2015D HTMHT Open Data"
          meta={
            <>
              Code:{" "}
              <a
                className={credClass}
                href="https://github.com/HiteshRasineni/CMS2015DarkMatterSearch-HTMHT-"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/HiteshRasineni/CMS2015DarkMatterSearch-HTMHT-
              </a>
            </>
          }
        >
          <li>
            Built the full simulation-to-inference pipeline (MadGraph5_aMC@NLO → Pythia 8 → Delphes
            signal generation; feature extraction from 20.7M raw events, 1.44M selected across 5
            unprescaled HLT paths) and modeled the background density with a conditional
            flow-matching normalizing flow trained on real HTMHT events.
          </li>
          <li>
            Applied sentinel imputation for missing-object features, held-out NLL scoring, an offline
            signal trigger proxy, and a B ≥ 20 yield floor to suppress low-statistics argmax bias;
            projected expected significances of 2.89σ, 7.62σ, and 7.41σ for three simplified-model
            benchmarks, with ablations showing extra-jet kinematics carry 53–71% of the discriminating power.
          </li>
        </Entry>



        <Entry
          title="Improving Discovery-Significance Stability in Higgs Event Classification"
          right="HiggsML H→τ⁺τ⁻ benchmark"
          meta="with J.J. Pujari, P.A. Immadi, T. Bikku, R.S. Puppali (VIT-AP University / Amrita)."
        >
          <li>
            Developed a supervised contrastive pre-training framework combined with a parallel
            FT-Transformer + XGBoost ensemble; repeated 5×5-fold cross-validation showed reduced
            fold-to-fold variance in Approximate Median Significance (AMS = 3.74 on the full dataset)
            versus focal-loss training, enabling more stable threshold selection. Published in{" "}
            <em>Discover Artificial Intelligence</em> (Springer Nature).
          </li>
        </Entry>
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
      </Section>

      <Section title="PUBLICATIONS">
        <ul className="list-disc space-y-3 pl-5 text-[14px] leading-6 text-neutral-700">
          <li>
            <span className="font-semibold text-black">
              Mono-Z Dark Matter Search with Neural Spline Flows Using CMS Run 2015D Open Data.
            </span>{" "}
            H. Rasineni, B. Chebrolu. arXiv preprint, 2026 (submitted for journal publication).{" "}
            <em>Leptonic decay channel.</em> DOI:{" "}
            <a className={credClass} href="https://doi.org/10.48550/arXiv.2607.13771" target="_blank" rel="noopener noreferrer">
              10.48550/arXiv.2607.13771
            </a>
          </li>
          <li>
            <span className="font-semibold text-black">
              Hadronic Mono-Z Dark Matter Sensitivity with Flow Matching on CMS Open Data.
            </span>{" "}
            H. Rasineni, B. Chebrolu. Preprint (under review), Research Square, 2026.{" "}
            <em>Hadronic decay channel.</em> DOI:{" "}
            <a className={credClass} href="https://doi.org/10.21203/rs.3.rs-10634384/v1" target="_blank" rel="noopener noreferrer">
              10.21203/rs.3.rs-10634384/v1
            </a>
          </li>
          <li>
            <span className="font-semibold text-black">
              Improving Stability of Discovery Significance in Higgs Boson Event Classification using
              Contrastive Representation Learning.
            </span>{" "}
            J.J. Pujari, P.A. Immadi, H. Rasineni, T. Bikku, R.S. Puppala.{" "}
            <em>Discover Artificial Intelligence</em> (Springer Nature), 2026. DOI:{" "}
            <a className={credClass} href="https://doi.org/10.1007/s44163-026-01683-5" target="_blank" rel="noopener noreferrer">
              10.1007/s44163-026-01683-5
            </a>
          </li>
        </ul>
      </Section>

      <Section title="TECHNICAL SKILLS">
        <div className="space-y-1 text-[14px] leading-6 text-neutral-700">
          <p><span className="font-semibold text-black">Languages:</span> Python, Java, SQL, JavaScript (React)</p>
          <p>
            <span className="font-semibold text-black">ML/Data:</span> PyTorch, scikit-learn, OpenCV,
            Pandas, Matplotlib, Density Estimation (Normalizing Flows, Likelihood Ratios)
          </p>
          <p><span className="font-semibold text-black">Tools:</span> Git, Docker, Google Colab, uproot, LaTeX</p>
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

