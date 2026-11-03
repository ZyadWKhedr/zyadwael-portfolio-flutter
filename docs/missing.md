# Missing Sources & Verification Discrepancies

This document records all sources that could not be retrieved, missing files required by strict verification rules, and discrepancies between repositories, listings, and documentation.

---

## 1. Blockers Requiring User Input

### A. `source/linkedin.pdf` (CRITICAL STOP CONDITION)
- **Status**: **MISSING**
- **Impact**: Strict rule states: *"LinkedIn can't be scraped. If this file is missing, STOP and tell me before writing Experience or About."*
- **Action Required**: Please export your LinkedIn profile as a PDF (`More` -> `Save to PDF` on LinkedIn) and place it at `source/linkedin.pdf` in the project root.
- **Pending Sections**: **Experience** ("Where I've worked", employment dates, company roles, descriptions, education line) and **About** (factual career summary).

---

## 2. Missing Sources & Incomplete Listings

### B. `source/medium-export/`
- **Status**: **MISSING**
- **Impact**: Medium RSS feed (`https://medium.com/feed/@ziad.w.khedr`) only yields the 10 most recent articles.
- **Recovered So Far**: 16 articles verified by combining the RSS feed, GitHub Profile README links, and publication indices (including the freeRASP, Riverpod Dependency Injection, and Clean Architecture guides). Approximately 4 articles remain unindexed without the Medium export directory or profile article list.
- **Action Required**: Optional: if you have the full Medium export zip/folder, place it at `source/medium-export/` so all ~20 articles can be archived with exact timestamps.

### C. `Tashkeel` App Listing
- **Status**: **NO PUBLIC STORE OR REPO FOUND**
- **Searched**: GitHub public repositories (`ZyadWKhedr`), Apple App Store API (US, SA, EG), Google Play developer indices, and repository history.
- **Resolution**: Under strict data rules, Tashkeel will be rendered as a minimal entry (name and factual description from sources) without invented ratings or stats, unless you provide a store URL or repository link.

### D. `Savora` & `Re3o` Commercial Projects
- **Status**: **PROPRIETARY CLIENT PROJECTS (NO PUBLIC STORE LINKS)**
- **Searched**: GitHub public repositories (proprietary codebases), Apple App Store API.
- **Resolution**: Both have verified visual assets and descriptions in the codebase inventory (`public/assets/images/projects/savora/` and `re3o/`), but no public store URLs or public repos. Rendered as minimal verified client contract entries without dummy links.

---

## 3. Discrepancies & Technical Notes

### E. `Boa` (Go) Installation Command vs. `go.mod`
- **Finding**: 
  - `README.md` states: `go install github.com/ZyadWKhedr/Boa@latest`
  - `go.mod` declares: `module compressor`
- **Issue**: Running `go install github.com/ZyadWKhedr/Boa@latest` fails in Go with:
  ```
  go: github.com/ZyadWKhedr/Boa@latest: parsing go.mod: unexpected module path "compressor"
  ```
- **Resolution**:
  - For Go direct binary installation to work, the `go.mod` module path must be updated to `module github.com/ZyadWKhedr/Boa`.
  - Otherwise, the documented factual installation method is:
    ```bash
    git clone https://github.com/ZyadWKhedr/Boa.git
    cd Boa
    go build -o boa .
    ```

### F. Store Ratings & Download Counts
- **Status**: 
  - `Ufuq` (ID: 6821979552): `averageUserRating = 0`, `userRatingCount = 0` (Apple returns 0 when an app has insufficient public rating counts).
  - `Grandmaster Chess` (ID: 6774163012): `averageUserRating = 0`, `userRatingCount = 0`.
- **Resolution**: Per strict rule (*"Only show a rating, download count, or stat if it comes directly from a store API or listing. Never invent facts"*), NO star ratings, download figures, or user statistics will be shown.

