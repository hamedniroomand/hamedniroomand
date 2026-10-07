---
name: layerscope
order: 3
home: true
repo: hamedniroomand/nuxt-layerscope
docs: https://layerscope.kitdev.space
tagline: Layer boundary checks for Nuxt apps, auto-imports included.
stack:
  - TypeScript
  - Nuxt
  - Vue
screenshots:
  - src: /screenshots/layerscope-devtools.webp
    alt: The layerscope tab in Nuxt DevTools. A graph of five layers with two violating edges, and a list of files with findings.
    caption: The DevTools tab draws the layer graph and marks each edge that breaks a rule. It updates when you save a file.
    frame: layerscope / devtools
    width: 2880
    height: 1620
---

layerscope is a Nuxt module and CLI that checks the boundaries between Nuxt layers. It resolves auto-imported composables, components, Nitro server utils and regular imports the same way Nuxt does, and fails CI when a layer uses something it is not allowed to.

It works with Nuxt 3 and 4 and with local, npm and remote layers. It adds cycle detection, baselines for existing projects, a drift report for pull requests, an ESLint plugin, a GitHub Action and a Nuxt DevTools tab with the layer graph.

This is the committed fallback description. When the site is built with network access, the live README from `github.com/hamedniroomand/nuxt-layerscope` replaces it.
