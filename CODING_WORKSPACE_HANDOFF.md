# KS Lawn Ranger Website — Coding Workspace Handoff

## Objective
Finish and launch the premium KS Lawn Ranger website without modifying the current live site until QA is complete.

## Repository and branch
- Repository: `kslawnranger-prog/kslawnranger`
- Working branch: `production-v4`
- Live/default branch: `main`
- Do all implementation and testing on `production-v4`.

## Completed work
1. Media library curated and rated.
2. Final homepage and interior-page visual blueprint completed.
3. Premium homepage implemented in `preview-v3/index.html`.
4. Phase 3 styling implemented in `preview-v3/phase3.css`.
5. Production image files generated locally in WebP and JPEG formats.
6. Placeholder testimonials removed from the Phase 3 homepage.
7. Canonical, Open Graph, Twitter, and LocalBusiness metadata added to the Phase 3 homepage.

## Important current limitation
The HTML references files under `preview-v3/assets/`, but those binary image files still need to be copied from the provided Phase 3 workspace package into the repository. Until then, the branch preview will contain broken image references.

## Workspace package
Upload and extract `KS_Lawn_Ranger_Phase_3_Workspace_Handoff.zip` at the repository root. It contains:
- `preview-v3/assets/` — optimized WebP and JPEG images
- `preview-v3/index.html` — current Phase 3 homepage source
- `preview-v3/phase3.css` — current Phase 3 styling
- `asset-manifest.json` — dimensions and file inventory
- `WORKSPACE_TASKS.md` — implementation and QA checklist

Do not overwrite newer branch files blindly. Compare the packaged `index.html` and `phase3.css` with the branch first. The asset directory can be copied directly.

## Immediate tasks
1. Copy all optimized images into `preview-v3/assets/`.
2. Run the preview locally and verify every image path.
3. Fix `preview-v3/app.js`:
   - Change canonical from `https://kslawnranger.com/preview-v3/` to `https://kslawnranger.com/`.
   - Change the sticky selector from `.mobile-cta` to `.mobile-actions`, or remove the unused visibility logic because the current CSS displays `.mobile-actions` directly on mobile.
   - Confirm the Open Graph image path matches the final production asset location.
4. Verify `enhancements.js` seasonal banner logic against the new `[data-seasonal-banner]` markup.
5. Consolidate CSS after visual QA. The page currently loads `style.css`, `polish.css`, `enhancements.css`, `v4.css`, and `phase3.css`; reduce conflicting overrides before launch.
6. Build the remaining pages: Services, Commercial, Projects/Gallery, About, Contact/Estimate, 404, and Privacy.
7. Add `robots.txt`, `sitemap.xml`, favicons, and final structured data.
8. Run mobile, accessibility, performance, and cross-browser QA.
9. Only then promote the new build to the site root and merge to `main`.

## Business facts to preserve
- Business name: KS Lawn Ranger LLC
- Phone: 913-221-7981
- Email: kslawnranger@gmail.com
- Based in: Alma, Kansas
- Service area: Alma, Manhattan, Wamego, St. George, Ogden, and Junction City
- Hours: Monday–Saturday, 7 AM–6 PM
- Fully insured
- Primary CTA: Get a Free Quote
- Google review link: https://g.page/r/CQ3hgayPFJW2EBM/review
- Brand maroon: `#560B16`

## Content rules
- Do not invent reviews, ratings, customer names, job counts, or years of experience.
- Do not claim guaranteed response times unless approved.
- Keep copy direct and local, not overly polished or AI-sounding.
- Use real project photography only.
- Keep production root untouched until the branch build passes QA.

## Definition of done
- No broken links or missing assets.
- All pages responsive from 320 px through large desktop.
- Keyboard navigation and visible focus states work.
- Forms work and have clear success/error handling.
- Lighthouse targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+ on a representative mobile run.
- Sitemap, robots, canonical URLs, social metadata, and structured data use production URLs.
- Final build reviewed on Chrome, Safari/WebKit, and Firefox.
- Production deployment has a rollback point.
