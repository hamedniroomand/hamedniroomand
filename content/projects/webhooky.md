---
name: Webhooky
order: 8
repo: hamedniroomand/webhooky
site: https://webhooky.kitdev.space/
tagline: A temporary webhook inbox with a live request inspector.
stack:
  - TypeScript
  - React
  - Bun
  - SQLite
---

Webhooky is a temporary webhook inbox. Open the app to get a webhook URL, send requests to it, and inspect the headers, the query parameters, the body and the raw HTTP text of each one. No account is required.

Requests appear in a live feed over Server-Sent Events. It captures `GET`, `POST`, `PUT`, `PATCH` and `DELETE`, including nested paths, and shows JSON, forms, XML and plain text. An inbox lasts 24 hours and keeps the latest 100 requests.

The webhook URL only lets a sender submit requests. Reading and deleting them needs the browser session that owns the inbox. The app does not record the client IP address. It runs on Bun with SQLite, and the interface is React with Tailwind CSS.

This is the committed fallback description. When the site is built with network access, the live README from `github.com/hamedniroomand/webhooky` replaces it.
