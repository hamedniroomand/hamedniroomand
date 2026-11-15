---
name: Customer Portfolio Management
order: 11
client: thales
site: https://thales-mfi.com
tagline: Real-time client portfolios across exchanges, brokers, and on-chain wallets.
stack:
  - Nuxt
  - Hono
  - TypeScript
  - Bun
screenshots:
  - src: /screenshots/cpm-overview.webp
    alt: CPM overview of one client. The mandate values and watermarks beside a balance chart, under a live price ticker.
    caption: One client, one page. The mandate, the watermarks and the balance history sit under a live price ticker, with profit and loss in the header.
    frame: cpm / overview
    width: 3024
    height: 1376
  - src: /screenshots/cpm-connections.webp
    alt: CPM sources of one client. Three exchanges with their balances and sync state, beside an allocation chart.
    caption: The exchanges and wallets that make up a portfolio, each with its balance and sync state. The allocation chart beside them splits the book by asset class.
    frame: cpm / sources
    width: 2968
    height: 1376
---

Customer Portfolio Management (CPM) is a private platform I built for Thales MFI. An asset manager registers a client's exchange API keys, MT5 broker accounts, and wallet addresses. CPM then shows that client's balances, positions, orders, and risk across every venue on one page.

Exchange scanners sync spot, futures, and options holdings from Binance, Bybit, Deribit, Coinbase, Kraken, KuCoin, and other venues. MT5 covers traditional brokers. Chain scanners read wallets on Bitcoin, EVM chains, Solana, Polkadot, Sui, TON, Tron, XRP, and more. Scheduled jobs keep prices and balances current, and Socket.IO pushes each change to the open dashboard. Reports cover portfolio snapshots, asset history, transaction flow, and CSV export. A Telegram bot handles login and notifications.

The frontend is Nuxt. The API is Hono on Bun, with PostgreSQL and TimescaleDB behind it. The source is private. The company site is the public face.
