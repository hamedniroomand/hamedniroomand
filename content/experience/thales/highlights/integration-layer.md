---
title: One integration layer for 16 chains and 12 exchanges
order: 2
---

Designed one integration layer over very different chain providers and exchange APIs, so every source sits behind the same contract with its own fetching flow. Adding a new chain or exchange is a single-module change, and each source is testable on its own.
