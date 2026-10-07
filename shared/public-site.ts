export interface ProjectStory {
  category: string;
  headline: string;
  introduction: string;
  sections: { title: string; body: string }[];
}

const STORIES: Record<string, ProjectStory> = {
  cpm: {
    category: 'Client work / Asset management',
    headline: 'One book for every customer.',
    introduction:
      'A private platform for Thales asset managers. Connect a customer’s exchanges, brokers, and wallets, then watch positions, orders, and risk in one place.',
    sections: [
      {
        title: 'Every venue in one account',
        body: 'Operators attach exchange API keys, MT5 broker accounts, and wallet addresses. Scanners sync spot, futures, and options from Binance, Bybit, Deribit, Coinbase, Kraken, and more, and read wallets on Bitcoin, EVM chains, Solana, Polkadot, Sui, TON, Tron, and XRP.',
      },
      {
        title: 'Live positions, orders, and risk',
        body: 'Scheduled syncs keep the book current and Socket.IO pushes each change to the dashboard. Risk sits beside the balances: a portfolio reference value, a max-drawdown limit, and the non-cash exposure, so an advisor can see what a move would do.',
      },
      {
        title: 'A private product, end to end',
        body: 'Nuxt in the browser, NestJS on Bun behind it, PostgreSQL and TimescaleDB for the book, and a Telegram bot for login and alerts. The source stays private. The company site is the public face.',
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
    category: 'Web app / Developer tools',
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
      'Masir turns long URLs into short ones on your own domain, and keeps them under your control after you share them. It is self-hosted, with workspaces, access control and analytics that do not track visitors.',
    sections: [
      {
        title: 'The short URL stays, the destination can change',
        body: 'Edit where a link points at any time. Add a password, a start or end date, a visit limit or a one-time rule, and send blocked visitors to a fallback page. Rename an address and the old one keeps working.',
      },
      {
        title: 'Built for teams',
        body: 'Links belong to a workspace, with owner, member and viewer roles. One link can send iOS, Android, desktop or a country to a different place, and tags and UTM values keep campaigns together.',
      },
      {
        title: 'Analytics without tracking',
        body: 'Masir counts clicks, unique visitors, referrers, countries and devices, and counts bots separately. It stores no IP addresses, no user agents and no visitor cookies. It runs as a Docker image with Postgres, on one domain or a subdomain for each workspace.',
      },
    ],
  },
};

/** The projects that the home page shows below the featured one. */
export function homeProjects<T extends { home?: boolean }>(projects: readonly T[]): T[] {
  return projects.filter(project => project.home);
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
