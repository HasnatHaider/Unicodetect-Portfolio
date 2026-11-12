# UnicodeTech React

UnicodeTech's company and software-services website, built with React 19, JavaScript/JSX, Vite 8, React Router 7 and plain CSS.

Website: [unicodetech-dev.vercel.app](https://unicodetech-dev.vercel.app/)

## Requirements and setup

Use Node.js 22.12 or newer and npm. Install dependencies and start the frontend:

```bash
npm install
npm run dev
```

Vite serves the frontend during development. The contact endpoint requires Vercel's function runtime and the server configuration described below; the Vite development server alone does not run it.

## Commands

| Command                            | Purpose                                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                      | Start the Vite frontend development server.                                                                   |
| `npm run build`                    | Build client assets and generate HTML for all 27 primary routes and the 404 page.                             |
| `npm run preview`                  | Preview the generated static site; Vercel API functions are not included.                                     |
| `npm run lint`                     | Run Oxlint.                                                                                                   |
| `node scripts/verify-browser.mjs`  | Check the generated build in Playwright at mobile and desktop widths. Run the build first.                    |
| `node scripts/optimize-images.mjs` | Regenerate responsive WebP variants from original PNG artwork.                                                |
| `npm test`                         | Run local contact and generated-output tests, if the ignored `tests/` folder is present. Run the build first. |

The browser-check script serves built files through request interception at the production origin. It starts no web server, blocks external requests and mocks contact submissions. These checks do not test the current live deployment or send email. Install Playwright Chromium with `npx playwright install chromium`, or supply an existing browser executable using `CHROME_EXECUTABLE`.

## Pages and features

The site has 27 primary URLs: Home, About, Contact, Case Studies, five project-detail pages, BMS Ecosystem, two legal pages and 15 service pages.

| Service                      | Route                          |
| ---------------------------- | ------------------------------ |
| AI Agents & Automation       | `/ai-agents-automation`        |
| SaaS Development             | `/saas-development`            |
| Mobile & Web Engineering     | `/mobile-web-engineering`      |
| Shopify & E-commerce         | `/shopify-e-commerce`          |
| UI/UX Design                 | `/ui-ux-design`                |
| Web Development              | `/web-development`             |
| WordPress Development        | `/wordpress-development`       |
| API & Systems Integration    | `/api-systems-integration`     |
| Custom Software Development  | `/custom-software-development` |
| CRM & ERP Solutions          | `/crm-erp-solutions`           |
| Cloud & DevOps               | `/cloud-devops`                |
| QA & Testing                 | `/qa-testing`                  |
| Dedicated Product Teams      | `/dedicated-product-teams`     |
| Product Discovery & Strategy | `/product-discovery-strategy`  |
| Maintenance & Support        | `/maintenance-support`         |

Project details cover Spin the Night, CareCompass, Daily Digest, Contractor Connect and Task Hive at `/case-studies/:slug`. Six legacy aliases have permanent redirects in `vercel.json`.

Shared features include a responsive Services menu, Calendly scheduling, contact-form feedback, FAQs, carousels, a desktop custom cursor, a skip link and reduced-motion handling. Hero artwork uses existing SVG and responsive WebP assets; CRM and QA use content-left, artwork-right desktop layouts with stacked mobile layouts.

## Project structure

| Location                                                         | Responsibility                                                                    |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `src/main.jsx`                                                   | Browser entry, routing providers, notifications, styles and hydration.            |
| `src/App.jsx`, `src/routes/paths.js`                             | Route components and named paths.                                                 |
| `src/pages/`                                                     | Page composition and metadata.                                                    |
| `src/layouts/AppLayout.jsx`                                      | Shared header, main content, footer and cursor.                                   |
| `src/components/`                                                | Home/service sections, navigation and reusable UI.                                |
| `src/components/professionalServiceSections/ServiceSections.jsx` | Shared professional-service sections and hero image binding.                      |
| `src/contexts/`, `src/hooks/`                                    | Hero/navigation state, metadata and motion behavior.                              |
| `src/utils/`                                                     | Company, legal, project and service content; image registry and metadata helpers. |
| `src/assets/styles/`                                             | Foundation, shared components, page styles and responsive rules.                  |
| `src/assets/images/`                                             | SVG artwork, original images, WebP variants and legacy font assets.               |
| `public/`                                                        | Favicon, 1200×630 social image, fonts, robots and sitemap.                        |
| `src/entry-server.jsx`, `scripts/prerender.mjs`                  | Static HTML rendering and route-specific head generation.                         |
| `api/contact.js`                                                 | Vercel contact-function entry.                                                    |
| `server/`                                                        | Server-side contact validation, abuse controls and email formatting.              |
| `src/services/`                                                  | Browser contact requests, Calendly loader and optional Axios helper.              |
| `vite.config.js`, `vercel.json`                                  | Build, asset optimization, hosting, redirects and security headers.               |

Edit copy and section order in the corresponding page/component. Professional-service content lives in `src/utils/pendingServices.js`; company information is in `companyContent.js`, and case-study content is in `caseStudies.js` and `projectDetails.js`. Image imports are registered in `src/utils/Constant.js`; CSS background keys and responsive image mappings have separate helpers.

## Build and deployment

`npm run build` produces client assets in `dist/`, creates a temporary server bundle in `.prerender/`, then renders every URL listed in `public/sitemap.xml`. Generated pages include visible content, metadata, canonical URLs, structured data, stylesheet links and background-image values. React hydrates the markup in the browser.

Vercel uses clean URLs, static filesystem routing, six 301 redirects and `404.html` for missing pages. There is no blanket home-page rewrite. The contact API is deployed separately as a Node function from `api/`.

For Vercel, use `npm run build` as the build command and `dist` as the output directory. Configure server environment variables before enabling contact submissions. Check redirects, missing-route status codes, headers, raw page HTML, Calendly and contact delivery after deployment.

SEO helpers provide page titles, descriptions, canonical links, social metadata, breadcrumbs and Service structured data for all 15 service routes. NotFound pages use noindex and omit canonical links. `vercel.json` also defines CSP, frame restrictions, content-type protection, referrer and permissions policies. If the conditional Figma capture script in `index.html` changes, update its CSP hash.

## Contact and scheduling

The browser obtains a signed form token and submits to `/api/contact`. The server validates the fields, fixes the recipient to `info@unicodetech.com`, escapes email HTML and applies origin checks, body limits, token timing/replay protection, a honeypot and shared Redis quotas. Missing configuration or unavailable quota storage prevents sending; the form offers email as a fallback.

Set these **server-only** environment variables using `.env.example` as the template:

| Variable                   | Purpose                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| `PUSH_API_KEY`             | Newly issued credential for the email provider.                         |
| `CONTACT_TOKEN_SECRET`     | Random secret of at least 32 characters for signing form tokens.        |
| `UPSTASH_REDIS_REST_URL`   | Shared Redis REST endpoint.                                             |
| `UPSTASH_REDIS_REST_TOKEN` | Credential for that Redis endpoint.                                     |
| `SITE_URL`                 | Exact trusted origin; defaults to `https://unicodetech-dev.vercel.app`. |

Never prefix secrets with `VITE_`, because Vite-prefixed values can be included in browser bundles. Revoke any previously exposed provider credential and remove the legacy `VITE_PUSH_APIKEY` deployment variable. Redis provisioning and credential rotation are external setup steps, not automatic build actions.

The handler uses Vercel's trusted forwarding header for IP-based quotas: 30 token requests and five submission attempts per IP per hour. Other hosting platforms need equivalent API routing and trusted-header configuration.

Calendly's event URL and on-demand widget loading are configured in `src/services/calendly.js`. The optional `VITE_API_URL` configures the separate Axios helper; it is not required for the same-origin contact endpoint.

## Git tracking and local files

`.claude/` and `tests/` are intentionally local and ignored. A fresh clone does not include them, so `npm test` requires restoring your own local test files. Builds and linting do not require these folders. Browser checks remain available through the tracked `scripts/verify-browser.mjs`.

Environment files, `node_modules/`, `dist/`, `.prerender/`, the current local lockfile and local audit reports are also ignored; `.env.example` is tracked. Use `npm install` for a fresh checkout because a tracked lockfile is not supplied.

Adding a path to `.gitignore` prevents new untracked files from being added; it does not remove files already tracked by Git. To stop tracking these folders while preserving local copies:

```bash
git rm -r --cached -- .claude tests
```

Commit and push the staged removals together with the ignore rules to remove the folders from the latest GitHub revision. Earlier commits still contain their previous versions.
