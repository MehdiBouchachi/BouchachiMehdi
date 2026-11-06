# Bouchachi Mohamed Mehdi — Portfolio

A custom, animation-rich, responsive portfolio built with **Next.js 15, React 19, TypeScript, CSS and GSAP**. It includes actual provided photos, certificates, and logo.

## Run locally

Requires **Node.js 20+** (Node.js 22 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build / easy static deployment

```bash
npm run build
```

The completed website is exported to `out/`. This is a **static site**, so there is no database, Node server, API key, or back-end service required to host it.

### Hostinger Business (static hosting)

1. Run `npm install` and `npm run build` on your computer or CI.
2. Upload the **contents of `out/`** into the website's `public_html` directory using Hostinger File Manager, SFTP, or a CI deployment pipeline.
3. Ensure the domain serves `index.html` with normal static-file hosting.
4. If you prefer GitHub Actions, create a deploy workflow for your own Hostinger SFTP credentials (never commit secrets).

### Hostinger VPS / Nginx

Serve `out/` as a static directory with Nginx; no Node runtime needed. `trailingSlash: true` makes routes available as `/work/itcp/index.html` etc.

### Vercel / Netlify / Cloudflare Pages

Build command: `npm run build`, output directory: `out`.

## Personalize without digging into components

Edit **`data/site.ts`** for the Next.js source. For the deploy-ready static version, edit `data/site.json` and run `node build-static.mjs`. After installing dependencies, you can synchronize JSON using `node export_site_data.cjs`. This controls:
- Name, email, GitHub URL, CV path
- Six projects and their case-study text (EmpreinteFlex, ITC Blida, ITCP, AeroLab, Healance, The Wild Oasis)
- Technology tags, project links, categories and descriptions
- Achievements, certificates, gallery captions

The Wild Oasis uses deliberately conservative copy; update it with **your actual features, screenshots and stack** before sending the portfolio to recruiters.

Image files are in `public/media/photos/` and `public/media/certificates/`. Logo is in `public/brand/` (dark and light variants). The CV is stored in `public/resume/`.

## What works

- Animated hero and GSAP scroll reveals
- Dark/light theme toggle (saved in browser)
- Mobile menu
- Category filtering of selected work
- Six dynamic case-study pages, all statically exported
- Certificate and photo galleries with arrow-key navigation and Escape to close
- About, skills, recognition, downloadable CV and email contact
- Reduced-motion accessibility support
- Responsive layouts and basic SEO metadata

## Important editorial notes

- Illustrations in project cards are **concept artwork**, not screenshots of the actual applications.
- The Huawei result is reported as **second place (Agritech & Environmental Protection)** based on the supplied stage photos; certificate is evidence of participation.
- No unsupported claims such as user counts, revenue growth, or platform traffic have been fabricated.
- Your actual uploaded project screenshots can be added later by replacing the concept art.
- Contact is `mailto:`. No contact submission backend is represented as working.

## License / asset ownership

Portfolio layout and code are customized for the user. Uploaded portraits, photos, certificates, CV and brand logo remain the owner's materials. Use these assets only with appropriate permission.
