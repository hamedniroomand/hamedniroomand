---
name: vaporfit
order: 5
repo: hamedniroomand/vaporfit
docs: https://vaporfit.kitdev.space
tagline: See what Vapor mode breaks in a Vue project before you add vapor to a component.
stack:
  - TypeScript
  - Vue
  - Node.js
---

vaporfit is a TypeScript CLI that reads a Vue project and tells you which components are safe to convert to Vapor mode, which are not, and why. Vue 3.6 compiles a component with `<script setup vapor>` to code that updates the DOM directly, but not every feature and library works there yet, and the worst failures give no error. Every finding names the file, the line, the rule and the chain of components behind it.

Each component gets two verdicts, one for an app that mixes Vapor and virtual DOM components and one for a pure Vapor app. A verdict is `ready`, `blocked` or `unknown`, and `ready` means that vaporfit found no known problem, not that it tested the behavior. The data covers 25 Vue libraries, and each row has evidence: a probe that runs in a real browser, a statement from the maintainers or an issue link. `vaporfit fix --write` adds `vapor` to the components that are ready.

This is the committed fallback description. When the site is built with network access, the live README from `github.com/hamedniroomand/vaporfit` replaces it.
