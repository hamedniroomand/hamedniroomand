---
name: Masir
order: 5
home: true
repo: hamedniroomand/masir
site: https://masir.dev
docs: https://docs.masir.dev
tagline: Self-hosted short links with workspaces, access control and privacy-friendly analytics.
stack:
  - Nuxt
  - Bun
  - PostgreSQL
  - Drizzle ORM
screenshots:
  - src: /screenshots/masir-home.webp
    alt: The Masir home page. The headline "Every link has a destination." above a preview of the dashboard.
    caption: Share a short link one time, then change where it goes and who can open it.
    frame: masir.dev
    width: 2880
    height: 1620
  - src: /screenshots/masir-dashboard.webp
    alt: The Masir workspace overview. Clicks, unique visitors and bot requests, a chart of clicks per day, and links that need attention.
    caption: The overview counts visitors with a daily hash and keeps bots out of the clicks. Links close to a limit come first.
    frame: masir.dev / overview
    width: 2880
    height: 1620
---

Masir turns long URLs into short ones on your own domain and keeps them under your control after you share them. Change where a link points, put a password in front of it, let it expire, or limit how many times it can be opened.

Links belong to workspaces with owner, member and viewer roles. One link can send iOS, Android, desktop or a country to a different destination. Analytics count clicks, referrers, countries and devices without storing IP addresses, user agents or visitor cookies. It ships as a Docker image with Postgres.

This is the committed fallback description. When the site is built with network access, the live README from `github.com/hamedniroomand/masir` replaces it.
