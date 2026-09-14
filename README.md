# MTX Alumni \& Donor Platform

Interactive landing\-page prototype for a configurable, platform\-agnostic higher\-education advancement product.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. The prototype uses local fictional data and does not call external APIs.

## Production checks

```bash
npm run lint
npm run build
npm run preview
```

The production site is built into `dist`. Vite uses `/MTXAlumni-DonorPlatform/` as its base path so assets resolve from the GitHub Pages repository subpath.

## Content assumptions

* The experience is a product prototype, not a record of a production deployment.
* Constituent profiles, opportunities, dashboard values, institutions, and activity are fictional.
* Illustrative data carries visible labels in the related product views.
* The product is described as a configurable solution layer that can operate as a primary advancement environment or alongside existing systems.
* Integration references use technology categories rather than named vendors.
* AI\-assisted activity remains subject to staff review, role access, traceable sources, consent, and institutional controls.
* The demonstration form processes data only in the browser and does not transmit or retain entries.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the site when changes reach `main`. It also copies `index.html` to `404.html` as a static fallback.

The repository owner must select **GitHub Actions** as the Pages source under **Settings → Pages** if that setting is not already enabled. After a successful deployment, the expected URL is:

`https://g4gaurang.github.io/MTXAlumni-DonorPlatform/`

No repository secrets are required.
