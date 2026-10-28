# NNC-04 — Experimental Division

## Status / 28 October 2026

The Experimental Division has been rebuilt as a recovered L-Corp research terminal adapted to the LC:NN branch.

### Completed

- [x] Rework `Experimental/index.html` into the recovered research-terminal interface.
- [x] Restyle all NNC-04 pages with Lobotomy Corporation-inspired pale-gold borders, black panels, warning stripes, and color-coded risk classes.
- [x] Keep all five classes (ZAYIN, TETH, HE, WAW, ALEPH) and NNC's within-tier severity scale (Low / Mid / High).
- [x] Build searchable, filterable Anomalies registry.
- [x] Create linked DP—001 Distortion Phenomenon research page with LCD collaboration framing and three empty respondent-only, color-coded transcript slots; no fictional dialogue added.
- [x] Keep Drako and Aporia as two separate Anomalies.
- [x] Build Drako's research dossier as AN—001 / High WAW.
- [x] Populate Drako’s Capabilities and Management tabs with confirmed Hellfire mechanics, fire immunity, agility, E.G.O restriction, cooperation, and SP-dependent aggression/recovery.
- [x] Build Aporia's research dossier as AN—002 / Mid ALEPH.
- [x] Populate Aporia’s Capabilities and Management tabs with confirmed physical resistances, limb restructuring, Bleed, pipe artifact, E.G.O restriction, autonomous combat, and 0–45 SP range.
- [x] Add switchable research tabs and keyboard-accessible tab navigation.
- [x] Replace the Resonance tab with Capabilities in both dossiers; distinguish Dante's Durante summoning from an Anomaly's own origin and powers.
- [x] Add portrait image references with numeric placeholders when assets are not uploaded.
- [x] Add a one-time recovered L-Corp administration login animation, shown only when entering NNC–04 from the homepage.
- [x] Display the Lobotomy Corporation logo, an animated authorization progress sequence, and a Skip Intro control.
- [x] Skip the cinematic on dossier return, direct visits, history restoration, or when reduced motion is preferred.

### To complete

- [ ] Add actual Distortion interview respondents, assigned colors, and approved transcript text when provided.
- [ ] Review and refine the provisional Distortion summary against LCD reference material before treating it as definitive.

- [ ] Consider storing a local copy of the Lobotomy Corporation logo rather than relying on the external fontmeme image URL. The current overlay has a text fallback if that image cannot load.

- [ ] Upload `assets/drako.png` (original transparent Drako sprite) to this `Experimental/` folder.
- [ ] Upload `assets/aporia.png` (original transparent Aporia sprite) to this `Experimental/` folder.
- [ ] Verify GitHub Pages renders both images and the new styling after deployment.
- [ ] Expand Aporia’s case history, artifact mechanics, and further response procedures when confirmed.
- [ ] Expand Drako’s case history and any further response procedures when confirmed.
- [ ] Review the mobile layout in a browser.
- [ ] Add future anomalies and experimental record categories as they are developed.

## Asset placement

Required file paths relative to the GitHub repository root:

```text
Experimental/
  index.html
  style.css
  script.js
  login.js
  login.css
  assets/
    drako.png
    aporia.png
  Anomalies/
    Drako/
      index.html
    Aporia/
      index.html
```

Both the registry and dossiers already point to those exact paths. They will show number-based placeholder artwork if the sprites are not yet present.

## Lore retained

- Drako: Mephista’s former distortion, catalogued as a separate Anomaly; **High WAW**.
- Aporia: an improbable outcome made possible by Mephista’s consumption of Holy Ichor, catalogued separately; **Mid ALEPH**.
- Both remain separate Anomaly records.
- Malkuth Resonance is a Durante ability used by Dante to manifest Sinner Identities when those Sinners are not nearby. It is not Drako’s or Aporia’s innate ability, nor the origin of either Anomaly.
- The interface is a fictional recovered old L-Corp system, now used by NetherNova as an LC:NN branch.
- Unprovided damage values, behavioral rules, and Qliphoth mechanics are deliberately not fabricated.
