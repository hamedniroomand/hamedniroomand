---
name: Action Wire
order: 6
repo: hamedniroomand/action-wire
docs: https://action-wire.kitdev.space/
tagline: A text assistant widget that uses the WebMCP tools a page already registered.
stack:
  - TypeScript
  - WebMCP
---

Action Wire is a text assistant widget for a web page that already registers its tools with WebMCP. The application owns the tool schemas and the handlers. The assistant discovers them on the page and runs them, so nobody defines the same tools a second time for the agent.

It ships as one ESM package, `actionwire`, with the widget, a headless bridge that has no interface, the WebMCP source, a model adapter for an OpenAI-compatible endpoint, and the types. Model credentials stay on a server endpoint, never in browser code. Its only runtime dependency validates tool input without `eval`, so the widget works under a strict Content-Security-Policy. The repository has examples for a vanilla page, React, Vue and Svelte.

It needs a secure browser context with native WebMCP. The verified environment is Chromium 153 with the experimental web platform features flag. Voice is out of scope, and the assistant does not keep conversation history across sessions.

This is the committed fallback description. When the site is built with network access, the live README from `github.com/hamedniroomand/action-wire` replaces it.
