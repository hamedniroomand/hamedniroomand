---
name: edgefit
order: 2
home: true
repo: hamedniroomand/edgefit
docs: https://edgefit.kitdev.space
tagline: Check that a project and its dependencies run on Cloudflare Workers, Bun and Deno before you deploy.
stack:
  - TypeScript
  - Node.js
  - GitHub Actions
screenshots:
  - src: /screenshots/edgefit-home.webp
    alt: The edgefit documentation home page. The tagline and the six runtimes it checks against.
    caption: One check, six runtimes — Cloudflare Workers, Bun, Deno, Deno Deploy, Netlify Edge and Vercel Edge.
    frame: edgefit.kitdev.space
    width: 2880
    height: 1620
  - src: /screenshots/edgefit-packages.webp
    alt: The edgefit package compatibility table. Popular npm packages with a result for workerd, Bun and Deno.
    caption: Popular packages, checked on every release. A question mark means edgefit could not analyze the code, not that it passed.
    frame: edgefit.kitdev.space/packages
    width: 2880
    height: 1620
---

edgefit is a TypeScript CLI that follows your code and every dependency from the entry point, finds the Node and Web APIs it reaches, and checks each one against pinned compatibility data for the runtime you deploy to. Every finding names the package, the file and the import chain behind it.

It checks `workerd`, `bun`, `deno`, `deno-deploy`, `netlify-edge` and `vercel-edge`, resolves packages with the export conditions of the target, and reports code it cannot analyze as `unknown` instead of safe. A GitHub Action runs the same check on pull requests.

This is the committed fallback description. When the site is built with network access, the live README from `github.com/hamedniroomand/edgefit` replaces it.
