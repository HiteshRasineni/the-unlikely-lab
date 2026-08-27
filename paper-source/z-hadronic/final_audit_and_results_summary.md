# HTMHT Hadronic Mono-Z DM Search — Audit & Results Summary

Consolidated reference document. Covers the full pipeline audit, every issue
found, every fix implemented and verified, and the final sensitivity results.
Intended as a working reference for paper-writing prompts — cite section
numbers when asking follow-up questions.

**Pipeline:** MC toolchain build (MadGraph5_aMC@NLO + Pythia8 + Delphes) →
DM signal generation (3 benchmark points) → CMS 2015D HTMHT Open Data feature
extraction → conditional flow-matching (CNF) background density training →
expected sensitivity (Asimov Z).

**What this is, precisely:** a projected/expected-sensitivity study. **No
unblinding was performed at any point** — real data was never compared to a
background prediction to count observed events. Every S, B, Z number below is
a projection built from a background density model trained on real HTMHT data
plus simulated DM signal, not an observation. This distinction must be
preserved in any paper language ("expected significance," "projected
sensitivity," never "observed" or "excess").

---

## 1. Original issues found (pre-fix audit)

| # | Issue | Severity |
|---|---|---|
| 1 | NaN-imputation bug: `jet1_eta`/`jet2_eta`/`dphi_met_jet1`/`dphi_met_jet2` (NaN when no extra jet exists) were median-imputed, manufacturing a fake point mass at the median instead of preserving "doesn't exist" as a distinguishable state | High |
| 2 | `jet1_pt`/`jet2_pt` correctly 0-filled (legitimate sentinel) but mixed with a continuum — a CNF cannot exactly represent this delta-plus-continuum shape | Medium, structural, not really "fixable" without an architecture change |
| 3 | Sensitivity notebook scored background NLL using the **full** 1.44M-row dataset, including the ~1.15M rows (80%) the flow was trained on — in-sample scoring risk for the background yield | High |
| 4 | No trigger-efficiency modeling for signal MC (Delphes has no HLT emulation); background correctly enforces the real 5-path HLT trigger cut (91.3% eff.), signal did not | Medium-High |
| 5 | `LUMI_FBINV=2.3 fb⁻¹` was a silent, unverified generic default rather than the trigger-path-specific Run2015D luminosity | Medium |
| 6 | Best-Z reported as the unconstrained argmax over a noisy scan, landing at background yields of **3–12 raw events** out of 1.44M — statistically unstable, look-elsewhere-biased | **Critical** |
| 7 | Signal-side cutflow CSVs contain only a final `events_written` count, no per-stage breakdown — can't diagnose why `axial_mx10_mv20`'s efficiency (5.8%) is much lower than the other two points | Open, unresolved (see §5) |

Also resolved/clarified along the way, no action needed:
- `max_btag_csvv2`, `btag_wp_medium`, `n_vertices`, `rho`: correctly excluded
  from training due to documented Delphes-vs-data schema mismatches.
- `scalar_mx100_lambda3000` signal point correctly excluded (Delphes-level m_jj
  reconstruction never resolved a Z peak — median 145–178 GeV vs. mZ=91.2).
- Feature schema fully consistent across signal/background (verified via
  `delphes_feature_schema_lock.json` — 41 branches, exact match).
- Background statistics self-consistent: `_file_audit.csv` and
  `_audit_summary.json` reconcile exactly (20,679,437 raw → 1,439,523 written,
  6.96% efficiency) across all 444 input files.
- Background trigger enforcement confirmed correctly implemented: explicit
  `trig_filter_labels` matching against 5 unprescaled HLT paths
  (`HLT_PFHT350_v`, `HLT_PFHT475_v`, `HLT_PFMETNoMu90_PFMHTNoMu90_IDTight_v`,
  `HLT_PFMETNoMu120_PFMHTNoMu120_IDTight_v`,
  `HLT_MonoCentralPFJet80_PFMETNoMu90_PFMHTNoMu90_IDTight_v`), 91.3% pass rate
  on 20.7M raw events — solid, not a shortcut.

---

## 2. Fixes implemented (verified against code and reruns, not just claimed)

1. **Sentinel imputation** — `jet1_eta`, `jet2_eta`, `dphi_met_jet1`,
   `dphi_met_jet2` now get an explicit `-999` sentinel instead of median fill,
   in both training and downstream scoring. `jet1_pt`/`jet2_pt` still
   median/0-imputed (unchanged, correctly — issue #2 is structural, not a bug).
2. **`DROP_EXTRA_JET_FEATURES=1` ablation mode** — clean flag to retrain
   without the 6 extra-jet columns entirely; used for the robustness study
   (§4).
3. **Train/val split persistence** — training now saves `train_idx.npy` /
   `val_idx.npy` and records them in `training_manifest.json`.
4. **Held-out-only background scoring** — sensitivity notebook now loads only
   `val_idx` (not the full 1.44M rows), then correctly **reweights back up**
   to the full selected background population
   (`background_sample_weight = population_rows / n_score`) to get a proper
   full-luminosity B estimate without in-sample bias.
5. **Signal trigger proxy** — `HT > 350 OR met_pt > 120 OR (met_pt > 90 AND
   leading_jet_pt > 80)` applied to signal MC before scoring, as an offline
   approximation of the 5 real HLT paths. Tracked via an explicit
   `trigger_proxy_efficiency` column.
6. **`MIN_B_YIELD=20` floor** — the *reported* best-Z now requires ≥20
   weighted background events at the working point; the old unconstrained
   argmax-over-everything Z is still computed and saved separately for
   comparison, not hidden.
7. **No silent luminosity default** — `LUMI_FBINV` now defaults to the
   verified official value **2.256382381 fb⁻¹** (recorded integrated
   luminosity for validated Run2015D, runs 256630–260627, from CMS's official
   `Run2015Dlumi.txt`), with `LUMI_SOURCE` recorded in the output for
   provenance. No longer a generic round-number guess.
8. **Poisson relative background uncertainty diagnostics** added to the
   sensitivity output.
9. **Signal-side per-stage cutflow counters** added to the signal-generation
   notebook's extraction cell (trigger proxy, eta/pt, mjj, deltaR, b-veto) —
   *implemented in the notebook, but the corresponding output CSVs have not
   yet been reviewed here* — see §5, still open.

---

## 3. Verification performed on the fixed pipeline

**Checkpoint freshness (Task 1):** confirmed via `training_manifest.json` —
`nan_sentinel_features` and `nan_sentinel_value: -999.0` fields present and
populated confirms the checkpoint post-dates the imputation fix. Baseline run:
`best_epoch=190`, `best_validation_nll=-54.36`. Ablation run: `best_epoch=165`,
`best_validation_nll=-43.63` (lower magnitude expected — fewer dimensions,
less negative-NLL headroom at convergence, not a sign of worse training).

**Training convergence (both runs) — genuinely converged, not undertrained:**
validation NLL descends smoothly and monotonically, plateaus cleanly over the
last ~30–50 epochs in both baseline and ablation runs, training loss fully
flat. No evidence either checkpoint stopped while still improving.

**Closure plots — before/after imputation fix (issue #1), baseline
31-feature model, directly compared against the original pre-fix plots:**
- `dphi_met_jet1`, `dphi_met_jet2`, `jet1_eta`, `jet2_eta`: **fix confirmed
  working.** Previously a single blended peak with wildly mismatched heights
  (e.g. `dphi_met_jet2` flow spike at density ~10.9 vs. data ~5.45). Now two
  cleanly separated bars — one at the -999 sentinel (isolated, far outside
  physical range), one at the true physics value — with reasonable closure on
  both for all four features. No more order-of-magnitude spike mismatches.
- `jet1_pt`, `jet2_pt`: **unchanged, as expected** (not touched by this fix;
  issue #2 remains open and is structural, see below). Still show the same
  0-spike undershoot as before (flow density ~0.071 vs. data ~0.142 for
  jet1_pt; ~0.289 vs. ~0.395 for jet2_pt).
- All other features (m_jj, HT, met_pt, deltaR_zjj, pt_Z, u_parallel, etc.):
  unchanged from pre-fix, good closure, no regression introduced by the fix.

**Ablation run closures:** every retained feature (25-feature set) closes as
well as in the baseline model — confirms the ablation model's lower Z (§4) is
attributable to lost information, not to a lower-quality/undertrained model.
`n_jets`/`n_extra_jets` show the expected mild spike-smearing at integer
values (same CNF-vs-discrete-value limitation as issue #2, now more load-
bearing since the detailed per-jet kinematics are gone).

---

## 4. Ablation study: extra-jet feature importance

Dropping `jet1_pt`, `jet1_eta`, `jet2_pt`, `jet2_eta`, `dphi_met_jet1`,
`dphi_met_jet2` (31→25 features) reduces expected significance substantially
at every signal point:

| point | baseline Z (31 feat, B≥20) | ablation Z (25 feat, B≥20) | relative drop |
|---|---|---|---|
| axial_mx10_mv20 | 2.89 | 0.83 | −71% |
| axial_mx50_mv200 | 7.62 | 2.78 | −64% |
| vector_mx1_mv500 | 7.41 | 3.45 | −53% |

Visual confirmation via the signal-vs-background NLL overlap plot: in the
ablation model, `axial_mx10_mv20`'s signal NLL distribution sits almost
entirely on top of the background peak, barely distinguishable — directly
explaining its collapse to sub-1σ. The other two points retain a visible
(if reduced) tail past the background peak.

**Interpretation:** the extra-jet kinematics carry substantial genuine
discriminating power — plausibly ISR-jet topology differences between mono-Z
DM production and generic multijet HTMHT background — not merely an artifact
of the (now-fixed) imputation bug. `n_extra_jets` (the count) alone is
insufficient; the detailed per-jet kinematics matter.

**Recommendation for the paper:** report the baseline (31-feature) numbers as
the primary result; report the ablation as a robustness/feature-importance
subsection with the NLL overlap plot as the key figure.

---

## 5. Final results

**Primary result** (31-feature model, held-out background scoring, corrected
luminosity, signal trigger proxy applied, B≥20 floor):

| signal point | mediator/coupling | S (weighted) | B (weighted) | best cut | expected Z |
|---|---|---|---|---|---|
| axial_mx10_mv20 | axial, m_χ=10, m_med=20 GeV | — | — | ~77 | **2.89σ** |
| axial_mx50_mv200 | axial, m_χ=50, m_med=200 GeV | — | — | ~68 | **7.62σ** |
| vector_mx1_mv500 | vector, m_χ=1, m_med=500 GeV | — | — | ~65 | **7.41σ** |

*(S/B/cut columns from the original `expected_sensitivity_results.csv` should
be re-pulled from the latest post-fix run if not already recorded — flagged
as a to-do, not filled in here to avoid quoting stale pre-fix numbers.)*

**Unconstrained (uncorrected for issue #6) Z, for context/comparison only —
not the recommended headline number:** 4.96σ / 10.81σ / 10.70σ.

**Ablation (25-feature, extra-jet columns dropped) Z, B≥20 floor:**
0.83σ / 2.78σ / 3.45σ.

---

## 6. Remaining open items (not yet resolved)

- **Issue #7 (signal per-stage cutflow):** cutflow counters were added to the
  signal-generation notebook (fix #9 in §2), but the resulting per-stage CSVs
  have not yet been reviewed here. Still needed to diagnose whether
  `axial_mx10_mv20`'s low efficiency (5.8% pre-fix) is driven by the mjj
  window, jet multiplicity, ΔR, or b-veto cut.
- **Issue #2 (jet1_pt/jet2_pt delta-plus-continuum):** acknowledged as a
  structural CNF limitation, not fixed (nor really fixable without a
  discrete+continuous hybrid architecture change). Should be stated as an
  explicit caveat in the paper rather than hidden.
- **S/B/best-cut values** for the current (post-fix) baseline run should be
  re-extracted from the latest `expected_sensitivity_results.csv` and filled
  into §5's table before finalizing any paper draft — only Z was directly
  re-confirmed via the plots shared in this conversation.
- **No unblinding performed** — reiterated here as a standing caveat, not a
  bug: this is by design a projected-sensitivity study, and should be
  described as such throughout any writeup.

---

## 7. Suggested paper section mapping

- **Methods — background model:** CNF/flow-matching training, feature
  contract, sentinel-imputation handling for padded/missing-object features.
- **Methods — signal:** MadGraph5_aMC@NLO+Pythia8+Delphes generation, 3
  accepted benchmark points, 1 excluded (scalar) point with justification.
- **Validation:** closure plots (main text: a representative few; appendix:
  full set), before/after imputation-fix comparison as direct evidence of
  correct sentinel handling.
- **Results:** primary Z table (§5), Asimov methodology, B≥20 floor
  justification (cite the low-statistics argmax bias found during audit as
  the reason for this choice — a nice methods-transparency point).
- **Robustness/ablation:** §4 table + NLL overlap figure.
- **Limitations/caveats:** issue #2 (structural CNF limitation on
  delta-plus-continuum features), issue #7 (incomplete signal cutflow
  diagnosis), trigger-proxy approximation (not full HLT emulation), no
  unblinding performed.
