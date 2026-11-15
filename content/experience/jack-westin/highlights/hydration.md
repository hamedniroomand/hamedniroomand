---
title: Hydration-mismatch fixes on server-rendered pages
order: 3
---

Tracked down and fixed hydration mismatches on server-rendered pages caused by auth state, time zones, and client-only widgets such as the KaTeX renderer and the video player, using client-only boundaries and deferred loading for non-critical components.
