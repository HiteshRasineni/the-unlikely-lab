# Paper Structure & Reference List (draft, for prompting)

Working title suggestion: *"Extending Flow-Matching Density Estimation for
Hadronic Mono-Z Dark Matter Sensitivity Studies with CMS Run 2015D Open Data"*
(or similar — frames this as a direct methodological follow-up to ref. [1]).

Confirmed: **arXiv:2607.13771** (Rasineni & Chebrolu, "Mono-Z Dark Matter
Search with Neural Spline Flows Using CMS Run 2015D Open Data") is your own
prior paper on this exact channel/dataset using NSF instead of flow-matching —
it belongs as reference [1], cited early as the direct predecessor this work
extends/compares against.

---

## Suggested paper structure

1. **Abstract**
   One paragraph: channel (hadronic mono-Z + MET), dataset (CMS Run2015D
   HTMHT Open Data, 2.256 fb⁻¹), method (conditional flow-matching CNF
   background density model vs. prior NSF work), headline result (Z = 2.9σ /
   7.6σ / 7.4σ for 3 benchmark points, B≥20 floor), explicit note that this is
   a projected/expected sensitivity study — no unblinding performed.

2. **Introduction**
   - Motivation: DM production at colliders, mono-X signatures, why hadronic
     mono-Z specifically (larger BR than leptonic Z, complementary to
     mono-jet).
   - CMS Open Data as a research-quality, reproducible substrate for
     methods studies.
   - Prior work: this paper's own NSF predecessor [1]; motivate the switch to
     / comparison with flow-matching CNFs (continuous-time, simulation-free
     training objective, ODE-based density evaluation vs. NSF's closed-form
     density).
   - Contribution statement: (a) CNF background density model for this
     channel, (b) systematic sensitivity-methodology audit (in-sample
     scoring, low-statistics argmax bias, trigger/luminosity provenance),
     (c) quantified feature-importance ablation for padded/missing-object
     kinematics.

3. **Data and simulation**
   - 3.1 CMS Run2015D HTMHT Open Data: dataset, trigger paths (5 HLT paths),
     luminosity (2.256382381 fb⁻¹, provenance), selection audit stats
     (20,679,437 raw → 1,439,523 selected, 6.96% efficiency).
   - 3.2 Signal generation: MadGraph5_aMC@NLO + Pythia8 + Delphes toolchain,
     DMSimp_s_spin1 axial/vector mediator benchmarks, 3 accepted points
     (axial m_χ=10/m_med=20, axial m_χ=50/m_med=200, vector m_χ=1/m_med=500),
     1 excluded scalar point with justification (no resolvable dijet
     resonance).
   - 3.3 Feature extraction & selection: SR definition (m_jj window,
     ΔR_zjj, extra-jet veto/count, offline pt/eta cuts), 41→32 feature
     contract, schema-mismatch exclusions (b-tag semantics, pileup
     placeholder columns).

4. **Method: conditional flow-matching background density model**
   - 4.1 Flow matching formulation (simulation-free vector-field regression,
     ODE-based NLL via Hutchinson trace estimator) — brief, cite [Lipman et
     al.] and [Chen et al. Neural ODE].
   - 4.2 Handling of padded/missing-object features: sentinel-imputation fix
     (-999 for eta/dphi features that are undefined when no extra jet
     exists, vs. legitimate physical 0-fill for pt) — this is a genuine
     methodological contribution worth its own subsection, since it's not
     obviously discussed elsewhere for this feature class.
   - 4.3 Training details: architecture, optimizer, early stopping on
     validation NLL, train/val split (80/20, persisted indices).

5. **Validation**
   - 5.1 Closure plots: representative set in main text (m_jj, MET, HT,
     deltaR_zjj), full set in appendix.
   - 5.2 Before/after imputation-fix comparison for jet1/jet2 eta and
     dphi_met_jet1/2 — direct evidence the sentinel fix resolved the
     spike-blending artifact.
   - 5.3 Known residual limitation: jet1_pt/jet2_pt delta-plus-continuum
     shape, inherent to continuous-density models for this feature type —
     stated explicitly as a limitation, not hidden.

6. **Sensitivity methodology**
   - 6.1 Asimov significance formula, why a naive unconstrained argmax over
     the NLL-cut scan is statistically unsound (the "look-elsewhere on your
     own background tail" problem) — 3-12 raw background events found at the
     unconstrained optimum.
   - 6.2 B≥20 minimum-yield floor as the reported working-point criterion;
     unconstrained value reported for comparison only.
   - 6.3 Held-out-only background scoring (avoiding in-sample density bias)
     with population reweighting.
   - 6.4 Signal-side trigger proxy (offline HT/MET approximation of the 5 HLT
     paths, since Delphes has no HLT emulation).

7. **Results**
   - 7.1 Primary sensitivity table (S, B, best cut, Z) for the 3 benchmark
     points.
   - 7.2 Comparison to the NSF-based predecessor result [1] — same channel,
     same data, different density model; discuss any material differences
     in Z, methodology (e.g. NSF's exact closed-form density vs. CNF's
     ODE-approximated density, and computational cost tradeoffs).

8. **Robustness: extra-jet feature-importance ablation**
   - Ablation setup (drop jet1/jet2 pt/eta, dphi_met_jet1/2 → 25-feature
     model), retraining, re-scoring.
   - Result: 53–71% relative Z reduction across the 3 points; NLL overlap
     figure showing axial_mx10_mv20 collapsing into the background peak.
   - Physical interpretation: ISR/extra-jet topology as a genuine
     discriminating handle, not an artifact of the imputation bug.

9. **Discussion / limitations**
   - No unblinding performed — explicit, prominent statement.
   - Trigger proxy is an offline approximation, not a full turn-on-curve
     emulation.
   - Signal-side per-stage cutflow incomplete for the 3 benchmark points —
     axial_mx10_mv20's low raw efficiency (5.8%) not yet diagnosed at the
     cut-stage level.
   - No background systematic uncertainty beyond Poisson counting is
     propagated; this is an expected-sensitivity study, not a full
     profile-likelihood limit-setting analysis.

10. **Conclusion**

**Appendices**
- A. Full closure plot set (all 25/31 features, both baseline and ablation
  models).
- B. Cutflow tables.
- C. Software/versions/reproducibility (uproot, awkward, MadGraph5_aMC@NLO,
  Pythia8, Delphes versions; env vars used; notebook references).

---

## Reference list (30, draft — verify formatting/venue details before submission)

**Prior work / this paper's predecessor**

1. H. Rasineni, B. Chebrolu, "Mono-Z Dark Matter Search with Neural Spline
   Flows Using CMS Run 2015D Open Data," arXiv:2607.13771 [cs.LG, hep-ex].

**CMS Open Data**

2. CMS Collaboration, "CMS data preservation, re-use and open access policy"
   (2018/2020 revision), CERN Open Data Portal, DOI:10.7483/OPENDATA.CMS.7347.JDWH.
3. K. Lassila-Perini et al., "Using CMS Open Data in research — challenges
   and directions," arXiv:2106.05726 [hep-ex].
4. M. Bellis, T. McCauley, "CMS Data Preservation and Open Access: status and
   plans," in *Data Preservation in High Energy Physics: Global Report 2026*,
   arXiv:2607.06775.

**Dark matter simplified models**

5. M. Backović, M. Krämer, F. Maltoni, A. Martini, K. Mawatari, M. Pellen,
   "Higher-order QCD predictions for dark matter production at the LHC in
   simplified models with s-channel mediators," arXiv:1508.05327 [hep-ph].
6. S. Kraml, U. Laa, K. Mawatari, K. Yamashita, "Simplified dark matter
   models with a spin-2 mediator at the LHC," arXiv:1701.07008 [hep-ph],
   EPJC 77 (2017) 326.
7. LHC Dark Matter Working Group, "Comparing LHC searches for heavy mediators
   of dark matter production in visible and invisible decay channels,"
   arXiv:1703.05703 [hep-ex].
8. D. Abercrombie et al. (LHC DM WG), "Dark Matter Benchmark Models for Early
   LHC Run-2 Searches," arXiv:1507.00966 [hep-ex].
9. M. Neubert, J. Wang, C. Zhang, "Higher-order QCD predictions for dark
   matter production in mono-Z searches at the LHC," arXiv:1509.05785
   [hep-ph], JHEP 02 (2016) 082.
10. N. F. Bell, G. Busoni, I. W. Sanderson, "Self-consistent Dark Matter
    Simplified Models with an s-channel scalar mediator," arXiv:1612.03475
    [hep-ph], JCAP 03 (2017) 015.

**Simulation toolchain**

11. J. Alwall et al., "The automated computation of tree-level and
    next-to-leading order differential cross sections, and their matching to
    parton shower simulations," arXiv:1405.0301 [hep-ph] (MadGraph5_aMC@NLO).
12. T. Sjöstrand et al., "An introduction to PYTHIA 8.2," arXiv:1410.3012
    [hep-ph].
13. J. de Favereau et al. (DELPHES 3 Collaboration), "DELPHES 3, a modular
    framework for fast simulation of a generic collider experiment,"
    arXiv:1307.6346 [hep-ex].
14. M. Cacciari, G. P. Salam, G. Soyez, "The anti-k_t jet clustering
    algorithm," arXiv:0802.1189 [hep-ph], JHEP 04 (2008) 063.
15. M. Cacciari, G. P. Salam, G. Soyez, "FastJet User Manual,"
    arXiv:1111.6097 [hep-ph].
16. R. D. Ball et al. (NNPDF Collaboration), "Parton distributions for the
    LHC Run II," arXiv:1410.8849 [hep-ph] (NNPDF3.0).

**Statistical methodology**

17. G. Cowan, K. Cranmer, E. Gross, O. Vitells, "Asymptotic formulae for
    likelihood-based tests of new physics," arXiv:1007.1727 [physics.data-an],
    Eur. Phys. J. C 71 (2011) 1554.
18. Planck Collaboration, "Planck 2018 results. VI. Cosmological
    parameters," arXiv:1807.06209 [astro-ph.CO] (relic density / cosmology
    context, if discussing DM relic-abundance framing).

**Normalizing flows / flow matching / density estimation**

19. Y. Lipman, R. T. Q. Chen, H. Ben-Hamu, M. Nickel, M. Le, "Flow Matching
    for Generative Modeling," arXiv:2210.02747 [cs.LG].
20. R. T. Q. Chen, Y. Rubanova, J. Bettencourt, D. Duvenaud, "Neural Ordinary
    Differential Equations," arXiv:1806.07366 [cs.LG].
21. W. Grathwohl, R. T. Q. Chen, J. Bettencourt, I. Sutskever, D. Duvenaud,
    "FFJORD: Free-form Continuous Dynamics for Scalable Reversible
    Generative Models," arXiv:1810.01367 [cs.LG] (Hutchinson trace estimator
    for continuous NLL).
22. G. Papamakarios, E. Nalisnick, D. J. Rezende, S. Mohamed, B. Lakshminarayanan,
    "Normalizing Flows for Probabilistic Modeling and Inference,"
    arXiv:1912.02762 [stat.ML].
23. C. Durkan, A. Bekasov, I. Murray, G. Papamakarios, "Neural Spline Flows,"
    arXiv:1906.04032 [stat.ML] (method used in the predecessor paper [1]).
24. L. Dinh, J. Sohl-Dickstein, S. Bengio, "Density estimation using Real
    NVP," arXiv:1605.08803 [cs.LG].
25. D. P. Kingma, P. Dhariwal, "Glow: Generative Flow with Invertible 1x1
    Convolutions," arXiv:1807.03039 [stat.ML].

**Density-based / weakly-supervised anomaly detection in HEP (methodological context)**

26. B. Nachman, D. Shih, "Anomaly Detection with Density Estimation,"
    arXiv:2001.04990 [hep-ph] (ANODE).
27. A. Hallin et al., "Classifying anomalies through outer density
    estimation," arXiv:2109.00546 [hep-ph] (CATHODE).
28. E. M. Metodiev, B. Nachman, J. Thaler, "Classification without labels:
    Learning from mixed samples in high energy physics," arXiv:1708.02949
    [hep-ph] (CWoLa).

**Related mono-X / mono-Z experimental searches (context/comparison)**

29. CMS Collaboration, "Search for new physics in the monojet final state
    using proton-proton collisions at sqrt(s)=13 TeV," JHEP 10 (2021) 153
    (or nearest applicable CMS mono-jet DM search — verify exact arXiv ID
    before citing).
30. ATLAS Collaboration, "Search for new phenomena in events with an
    energetic jet and missing transverse momentum in pp collisions,"
    (nearest applicable ATLAS mono-jet/mono-Z(hadronic) DM search — verify
    exact arXiv ID before citing).

---

## Notes / caveats on this reference list

- **Refs [29] and [30] are placeholders** — I did not verify exact arXiv IDs
  for the most directly comparable CMS/ATLAS *hadronic mono-Z* (not just
  mono-jet) DM searches. Worth a targeted search before finalizing, since a
  direct experimental hadronic-mono-Z comparison point would strengthen the
  Discussion section more than a generic mono-jet citation.
- Refs [2]–[4], [5]–[10] were verified via live search during this
  conversation (correct arXiv IDs, titles, authors confirmed).
- Refs [11]–[25] are standard, well-established citations in their
  respective subfields (MadGraph5_aMC@NLO, Pythia8, Delphes, flow-matching,
  neural ODEs, normalizing flows) — high confidence but not individually
  re-verified live in this conversation; spot-check before submission,
  especially exact journal/version details.
- Consider adding: a citation for the original hadronic-Z reconstruction /
  dijet-mass-window technique if drawing on a specific prior CMS/ATLAS
  Z→qq̄ analysis strategy, and a citation for Hutchinson's trace estimator
  itself (Hutchinson 1990, stochastic estimator paper) if used independently
  of FFJORD's application of it.
