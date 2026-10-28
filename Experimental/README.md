# NNC-04 — Experimental Division

## Status / 28 October 2026

The Experimental Division has been rebuilt as a recovered L-Corp research terminal adapted to the LC:NN branch.

### Completed

- [x] Rework `Experimental/index.html` into the recovered research-terminal interface.
- [x] Restyle all NNC-04 pages with Lobotomy Corporation-inspired pale-gold borders, black panels, warning stripes, and color-coded risk classes.
- [x] Keep all five classes (ZAYIN, TETH, HE, WAW, ALEPH) and NNC's within-tier severity scale (Low / Mid / High).
- [x] Build searchable, filterable Anomalies registry.
- [x] Keep Drako and Aporia as two separate Anomalies.
- [x] Build Drako's research dossier as AN—001 / High WAW.
- [x] Build Aporia's research dossier as AN—002 / Mid ALEPH.
- [x] Add switchable research tabs and keyboard-accessible tab navigation.
- [x] Add portrait image references with numeric placeholders when assets are not uploaded.

### To complete

- [ ] Upload `assets/drako.png` (original transparent Drako sprite) to this `Experimental/` folder.
- [ ] Upload `assets/aporia.png` (original transparent Aporia sprite) to this `Experimental/` folder.
- [ ] Verify GitHub Pages renders both images and the new styling after deployment.
- [ ] Populate verified abilities, manifestation limitations, behavioral observations, and response procedures in both dossiers when the information is available.
- [ ] Review the mobile layout in a browser.
- [ ] Add future anomalies and experimental record categories as they are developed.

## Asset placement

Required file paths relative to the GitHub repository root:

```text
Experimental/
  index.html
  style.css
  script.js
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

- Drako: former distortion of Mephista; manifestable via Malkuth Resonance; **High WAW**.
- Aporia: an improbable outcome made possible by Mephista's consumption of Holy Ichor; manifestable via Malkuth Resonance; **Mid ALEPH**.
- Both remain separate Anomaly records.
- The interface is a fictional recovered old L-Corp system, now used by NetherNova as an LC:NN branch.
- Unprovided damage values, behavioral rules, and Qliphoth mechanics are deliberately not fabricated.
