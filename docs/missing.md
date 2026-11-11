# Missing Sources & Verification Discrepancies (docs/missing.md)

This document records the resolution of previous blockers, remaining non-blocking items, and technical discrepancies.

---

## 1. Resolved Blockers

### A. `source/linkedin.pdf`
* **Status**: **RESOLVED**
* **Source**: Exported profile imported from `/Users/zyadwael/Downloads/Profile.pdf` to `source/linkedin.pdf`.
* **Verified Claims**:
  * Work history: Vee Tech, Rockai Dev, ZeroOneZ, Cellula Technologies.
  * Education: Alexandria University (Oct 2023 – Oct 2027).
  * Factual summary text for About section.

### B. `Tashkeel` App Listing
* **Status**: **RESOLVED**
* **Source**: Apple App Store link provided (`https://apps.apple.com/br/app/tashkeel-%D8%AA-%D8%B4-%D9%83-%D9%8A%D9%84/id6827159466`, App ID `6827159466`).
* **Verified Claims**: 100% offline Arabic diacritization tool utilizing contextual syntactic analysis with `.txt` import/export.

### C. `Re3o` App Listing
* **Status**: **RESOLVED**
* **Source**: Google Play link provided (`https://play.google.com/store/apps/details?id=com.re3o.app`).
* **Verified Claims**: PlayStation maintenance and technician booking client platform.

---

## 2. Discrepancies & Notes

### D. Vee Tech End Date (Old Portfolio vs. LinkedIn PDF)
* **Old Portfolio**: Stated Vee Tech as "Present".
* **LinkedIn PDF**: States July 2026 – October 2026 (4 months).
* **Resolution**: Following strict rule (*"trust the PDF and report the difference"*), the portfolio will display **July 2026 – October 2026**.

### E. `Savora` Commercial Contract
* **Status**: Proprietary freelance client contract app. Visual screens verified in repo (`public/assets/images/projects/savora/`). Rendered as a verified client contract entry without external store links.

### F. `Boa` (Go) Installation Command vs. `go.mod`
* **Finding**: `README.md` states `go install github.com/ZyadWKhedr/Boa@latest`, while `go.mod` specifies `module compressor`.
* **Resolution**: Documented build-from-source installation (`git clone && go build`) to ensure user commands work without unexpected module errors.

### G. Store Ratings & Numbers
* **Finding**: App Store APIs report 0 ratings for current listings.
* **Resolution**: Zero fabricated ratings or fake user counts will be shown on any card or badge.
