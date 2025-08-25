# KS Lawn Ranger – Static Site (GitHub Pages)

This repo contains a simple static site with assets in `/images`. It is designed for GitHub Pages (project pages).

## Deploy / reset steps

1. Put **all images** in the `/images` folder. This build includes these files (copied from your uploads): 
{
  "KS Lawn Ranger Logo.jpg": "ks-lawn-ranger-logo.jpg",
  "1.1.jpg": "after-1.jpg",
  "1.2.jpg": "before-1.jpg",
  "2.1.jpg": "after-2.jpg",
  "2.2.jpg": "before-2.jpg",
  "strips.jpg": "stripes.jpg",
  "Aeration.jpg": "aeration.jpg",
  "Grass head.jpg": "overseeding.jpg",
  "mulch.jpg": "mulch.jpg",
  "hardscaping.jpg": "hardscaping.jpg",
  "snow removal.jpg": "snow-removal.jpg",
  "unnamed.jpg": "sod.jpg",
  "6.jpg": "hero.jpg"
}

2. Ensure **Settings → Pages** is set to:
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`

3. Custom domain:
   - Keep the `CNAME` file (already set to `kslawnranger.com` and `www.kslawnranger.com`).
   - In Settings → Pages, enter `kslawnranger.com` as the Custom domain and enable **Enforce HTTPS** once available.

4. If a deployment gets stuck (status 400: in-progress deployment), cancel any running Pages workflows in **Actions**, then toggle the Pages folder to `/docs` and back to `/ (root)` to force a rebuild.

