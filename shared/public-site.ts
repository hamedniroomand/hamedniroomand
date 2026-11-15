export interface ProjectStory {
  category: string;
  headline: string;
  introduction: string;
  sections: { title: string; body: string }[];
}

const STORIES: Record<string, ProjectStory> = {
  'jack-westin': {
    category: 'Client work / EdTech',
    headline: 'Study tools behind 500K+ registered accounts.',
    introduction:
      'For more than four years I worked on the frontend of Jack Westin, a US MCAT-prep platform, and led the frontend team for most of that time. A few of the products: practice exams, flashcards, an AI tutor, and the design system behind them. Most of them are free to try.',
    sections: [
      {
        title: 'Practice that feels like the real test',
        body: 'I built the spaced-repetition flashcards. On the practice exams, the MCAT books and the Chrome extension, which shows Jack Westin solutions next to the official AAMC practice material, I led the work and took the heavy tasks. The web apps use Vue 3 and Nuxt 4.',
      },
      {
        title: 'An AI tutor inside the product',
        body: 'I architected a chat tutor that streams its answers into the Nuxt interface with the AI SDK. KaTeX renders the formulas.',
      },
      {
        title: 'One design system, four apps',
        body: 'I architected a shared component and core-logic library, documented in Storybook with more than 95% test coverage and published as versioned npm packages. Micro-frontends bring the same components into the WordPress marketing site, so the marketing team does not rebuild them.',
      },
    ],
  },
  cpm: {
    category: 'Client work / Asset management',
    headline: 'One book for every client.',
    introduction:
      'A private platform for Thales asset managers. Connect a client’s exchanges, brokers, and wallets, then watch positions, orders, and risk in one place.',
    sections: [
      {
        title: 'Every venue in one account',
        body: 'Asset managers attach exchange API keys, MT5 broker accounts, and wallet addresses. Scanners sync spot, futures, and options from Binance, Bybit, Deribit, Coinbase, Kraken, and more, and read wallets on Bitcoin, EVM chains, Solana, Polkadot, Sui, TON, Tron, and XRP.',
      },
      {
        title: 'Live positions, orders, and risk',
        body: 'Scheduled syncs keep the book current and Socket.IO pushes each change to the dashboard. Risk sits beside the balances: a portfolio reference value, a max-drawdown limit, and the non-cash exposure, so an advisor can see what a move would do.',
      },
      {
        title: 'A private product, end to end',
        body: 'Nuxt in the browser, Hono on Bun behind it, PostgreSQL and TimescaleDB for the book, and a Telegram bot for login and alerts. The source stays private. The company site is the public face.',
      },
    ],
  },
  'diba-art-studio': {
    category: 'Client work / E-commerce',
    headline: 'Original paintings, shown at real scale.',
    introduction:
      'A custom Shopify theme for Diba Art Studio, a studio that sells original paintings online. I built the storefront as a freelance project: the home page, the collections with filters, the product page, the cart and the text pages, in English and Norwegian. The shop is not open to the public yet, so its address shows a password page.',
    sections: [
      {
        title: 'A product page for a work that exists one time',
        body: 'An original has one copy, so the page has no size or quantity to select. A sold painting stays in the shop with a Sold badge, its buy button turns off, and a link offers a commission of a similar piece. Each page also has a link that opens the contact form with the title of the work filled in.',
      },
      {
        title: 'The painting at real scale',
        body: 'The gallery draws each painting next to a person 170 cm tall, as one SVG in centimetre units that Liquid computes from the width and height of the canvas. A second tab shows photos of the work in a room, and a zoom dialog opens the large image. The sizes are product metafields, so the owner types two numbers and the view appears.',
      },
      {
        title: 'A shop the owner changes without code',
        body: 'I wrote the theme on top of the Shopify Skeleton theme: Liquid sections, plain CSS and one TypeScript bundle that Vite builds, with GSAP for the scroll motion. The fixed interface text comes from locale files, and the home page text and images are settings in the theme editor, so text, images and works change in the Shopify admin. The shop stays usable without JavaScript and respects the reduced-motion setting. The source is private.',
      },
    ],
  },
  cue: {
    category: 'Open source / CLI',
    headline: 'From an issue to a reviewed pull request.',
    introduction:
      'A home for coding agents inside a workflow you already know. Cue uses GitHub issues and labels to move work through planning, implementation, and review.',
    sections: [
      {
        title: 'GitHub is the interface',
        body: 'Labels hold the state. Issue comments hold the plan. Draft pull requests hold the result. The workflow stays close to the repository, so there is less context to move between tools.',
      },
      {
        title: 'An agent is one part of the process',
        body: 'Cue supports Claude Code, Codex, and Antigravity through engine adapters. Work happens in isolated git worktrees, with test and lint commands as quality gates and human approval before implementation and merge.',
      },
      {
        title: 'Keep the work inspectable',
        body: 'A local dashboard brings transcripts and cost tracking together. The aim is to make the path from issue to pull request something you can follow, review, and improve.',
      },
    ],
  },
  waverune: {
    category: 'Open source / Audio library',
    headline: 'Hidden data in sound.',
    introduction:
      'WaveRune embeds a 32-bit identifier in WAV audio and reads it back with a key. Detection is blind, so it never needs the original recording. Use it as a library, from the command line, or in the browser.',
    sections: [
      {
        title: 'Classical signal processing, no models',
        body: 'A keyed signal is spread across frequency slots under a simplified masking model and recovered through spectral correlation. There are no model downloads and no runtime dependencies, and the implementation is small enough to read in one sitting.',
      },
      {
        title: 'One library, four ways to run it',
        body: 'Import the ESM package in Node.js or Bun, script the CLI with its exit codes, install a standalone executable that embeds the Bun runtime, or open the browser demo. The demo processes files locally and uploads nothing.',
      },
      {
        title: 'Measured, with the limits written down',
        body: 'A reliability report records how often the detector recovered the identifier from clean, resampled and trimmed audio, and that no wrong payload was accepted in 585 rejection trials. Short clips and heavy edits are less reliable, and the documentation says so first.',
      },
    ],
  },
  kitdev: {
    category: 'Open source / Developer tools',
    headline: 'The little tools you keep needing.',
    introduction:
      'A collection of focused utilities for the everyday work between bigger tasks. Format some JSON, inspect a color, convert an image, and get back to what you were building.',
    sections: [
      {
        title: 'Organized around the task',
        body: 'Tools live in six labs: data, crypto, color, network, image, and dev. Each lab brings related utilities together, from JSON-to-TypeScript conversion to contrast checks and image resizing.',
      },
      {
        title: 'Useful inputs, useful outputs',
        body: 'Inspect DNS records and HTTP headers, compare text, convert between data formats, or strip image metadata. Tools run in the browser or on the server without persisting the submitted data.',
      },
      {
        title: 'Room to keep growing',
        body: 'KitDev Space is built with Nuxt, TypeScript, and Bun, and the source is open. Use the tools on the live site, or read how they work in the repository. New labs and utilities are added over time.',
      },
    ],
  },
  edgefit: {
    category: 'Open source / CLI',
    headline: 'Know it runs on the edge before you deploy.',
    introduction:
      'edgefit reads a project and every dependency it imports, then tells you which Node and Web APIs your target runtime does not support. You find the problem in a pull request, not in a failed deploy.',
    sections: [
      {
        title: 'The whole dependency tree',
        body: 'Most failures come from a package three levels down. edgefit follows imports from the entry point with the export conditions of the target, so it checks the Workers build of a library and not its Node build. Each finding names the package, the file, the line and the import chain.',
      },
      {
        title: 'Static, pinned and honest',
        body: 'The check needs no Worker, Bun or Deno installation. All compatibility data is vendored and pinned, and each result links to its source. Code that edgefit cannot analyze is reported as unknown, never as safe.',
      },
      {
        title: 'One command, many runtimes',
        body: 'Check workerd, Bun, Deno, Deno Deploy, Netlify Edge and Vercel Edge, or run compare to see every runtime side by side. A GitHub Action runs the same check on each pull request.',
      },
    ],
  },
  layerscope: {
    category: 'Open source / Nuxt module',
    headline: 'Layer boundaries that see auto-imports.',
    introduction:
      'In a Nuxt app, a component in one layer can call a composable from another layer with no import statement. layerscope resolves auto-imports the same way Nuxt does and fails CI when a layer uses something it is not allowed to.',
    sections: [
      {
        title: 'What import-based tools miss',
        body: 'Composables, components, Nitro server utils and regular imports all go through one resolver. The check covers the app, server and shared directories, and local, npm and remote layers on Nuxt 3 and 4.',
      },
      {
        title: 'Made for existing projects',
        body: 'init writes a starter config, and every finding comes with a suggested fix. A baseline accepts the violations you already have, and a drift report shows what each pull request adds and removes.',
      },
      {
        title: 'In CI and in the editor',
        body: 'Use the CLI with why, graph and unused, the GitHub Action, or the ESLint plugin. The Nuxt DevTools tab shows the layer graph and every finding, and updates when you save a file.',
      },
    ],
  },
  masir: {
    category: 'Open source / Web app',
    headline: 'Short links your team owns.',
    introduction:
      'Masir turns long URLs into short ones on your own domain, and keeps them under your control after you share them. It is self-hosted, with a team workspace, access control and analytics that do not track visitors.',
    sections: [
      {
        title: 'The short URL stays, the destination can change',
        body: 'Edit where a link points at any time. Add a password, a start or end date, a visit limit or a one-time rule, and send blocked visitors to a fallback page. Rename an address and the old one keeps working.',
      },
      {
        title: 'Built for teams',
        body: 'Links belong to the team workspace, with owner, member and viewer roles. One link can send iOS, Android, desktop or a country to a different place, and tags and UTM values keep campaigns together.',
      },
      {
        title: 'Analytics without tracking',
        body: 'Masir counts clicks, unique visitors, referrers, countries and devices, and counts bots separately. It stores no IP addresses, no user agents and no visitor cookies. It runs as a Docker image with Postgres: one install, one team, on your own domain.',
      },
    ],
  },
  vaporfit: {
    category: 'Open source / CLI',
    headline: 'See what Vapor mode breaks before you convert.',
    introduction:
      'Vue 3.6 compiles a component without the virtual DOM when you add one attribute. Not every feature and library works there yet, and the worst failures give no error. vaporfit reads the project and tells you which components are safe to convert, which are not, and why.',
    sections: [
      {
        title: 'Failures that give no error',
        body: 'With as-child from Reka UI and Vue 3.6.0-rc.14 or older, a Vapor button gets no attributes and no click listener, and Vue prints no warning. vaporfit shows the file, the line, the rule and the Vue version that fixes the problem. A cause that is two wrappers away shows at your page, with the chain to the library.',
      },
      {
        title: 'Evidence behind each claim',
        body: 'The data covers 25 Vue libraries, among them Reka UI, Element Plus, PrimeVue, Vuetify, Pinia and VueUse. Each row comes from a probe that runs in a real browser, a statement from the maintainers or an issue link. When the data does not prove a problem, the verdict is unknown, not ready.',
      },
      {
        title: 'A plan for the migration',
        body: 'Each component gets one verdict for an app that mixes Vapor and virtual DOM components, and one for a pure Vapor app. The report ranks the rules that hold back the most components and gives an order that starts with the leaves. fix --write adds vapor to each component that is ready.',
      },
    ],
  },
  'action-wire': {
    category: 'Open source / Library',
    headline: 'An assistant that uses the tools your page already has.',
    introduction:
      'A page that registers tools with WebMCP has already described what it can do. Action Wire is a text assistant widget that discovers those tools and runs them, so you do not define them a second time for the agent.',
    sections: [
      {
        title: 'The page owns the tools',
        body: 'The application keeps the tool schemas and the handlers. The assistant reads what the page registered and calls it. Voice is out of scope, and the assistant does not keep conversation history across sessions.',
      },
      {
        title: 'One package, with or without an interface',
        body: 'createAssistant mounts the widget. createAgentBridge is the same runtime with no interface. The package is ESM only, and its one runtime dependency validates tool input without eval, so the widget works under a strict Content-Security-Policy. Examples cover a vanilla page, React, Vue and Svelte.',
      },
      {
        title: 'Keys stay on the server',
        body: 'The model adapter talks to an OpenAI-compatible endpoint that you operate, so no API key goes into browser code. The widget needs a secure browser context with native WebMCP. The verified environment is Chromium 153 with the experimental web platform features flag.',
      },
    ],
  },
  codepic: {
    category: 'Open source / Web app',
    headline: 'Code screenshots that never leave the browser.',
    introduction:
      'Paste a snippet, pick a look, and get a clean image for a post, a slide or a pull request. CodePic has no accounts and no server. The highlighting, the layout and the export all run on your machine.',
    sections: [
      {
        title: 'Private because there is no backend',
        body: 'The code is not uploaded, stored or logged, because there is no server to send it to. Only the look of the card stays between visits, never the code in it. After the first visit, the app loads and exports offline.',
      },
      {
        title: 'Point at the line that matters',
        body: 'Click a line number to highlight it, and the rest of the code fades back. Click again to mark a line as added or removed for a diff view. Box or underline part of a line and add a short note. One image holds up to three code panels.',
      },
      {
        title: 'More than a PNG',
        body: 'Export a PNG, an SVG, an animated GIF or an MP4 video, or copy a link that carries the code and the settings in the URL. Any page can open CodePic with the options filled in from a link, and a command line tool draws the same image without a browser.',
      },
    ],
  },
  webhooky: {
    category: 'Open source / Web app',
    headline: 'A webhook URL you can watch.',
    introduction:
      'Open the app and you get a webhook URL. Send requests to it and inspect each one: the headers, the query parameters, the body and the raw HTTP text. No account is required.',
    sections: [
      {
        title: 'A live request feed',
        body: 'Requests appear as they arrive, over Server-Sent Events. Webhooky captures GET, POST, PUT, PATCH and DELETE, including nested paths, and shows JSON, forms, XML and plain text. An HTML payload renders as text.',
      },
      {
        title: 'Temporary on purpose',
        body: 'An inbox lasts 24 hours and keeps the latest 100 requests. A stored body can be up to 1 MiB, and capture is limited to 120 requests per minute for each token.',
      },
      {
        title: 'Only the owner reads the inbox',
        body: 'The webhook URL lets a sender submit requests and nothing else. Reading and deleting captured requests needs the browser session that owns the inbox. The app does not record the client IP address and strips common proxy IP headers.',
      },
    ],
  },
};

export interface ProjectGroupsResult<T> {
  client: T[];
  openSource: T[];
}

/** A project with a client is client work. The schema makes every other project open source. */
export function projectGroups<T extends { client?: string }>(
  projects: readonly T[],
): ProjectGroupsResult<T> {
  return {
    client: projects.filter(project => project.client),
    openSource: projects.filter(project => !project.client),
  };
}

/** A project without a story falls back to its tagline. */
export function projectStory(project: { slug: string; tagline: string }): ProjectStory {
  return (
    STORIES[project.slug] ?? {
      category: 'Project',
      headline: project.tagline,
      introduction: project.tagline,
      sections: [],
    }
  );
}
