<script setup lang="ts">
  const FINDINGS = [
    { status: '✕', api: 'fs.watch', source: 'chokidar', error: true },
    { status: '✕', api: 'child_process.spawn', source: 'cross-spawn', error: true },
    { status: '?', api: 'dynamic require', source: 'unknown', error: false },
    { status: '✓', api: 'crypto.subtle', source: 'src/auth.ts', error: false },
  ];
</script>

<template>
  <VisualFrame
    class="edgefit-visual"
    label="edgefit: a check against Cloudflare Workers that finds unsupported Node APIs in two dependencies"
    title="edgefit / check"
    note="workerd"
  >
    <div class="edgefit-check">
      <p class="edgefit-check__command">
        <span class="accent">$</span> npx edgefit check --target workerd
      </p>
      <ul>
        <li
          v-for="finding in FINDINGS"
          :key="finding.api"
          :class="{ 'edgefit-check__error': finding.error }"
        >
          <span class="edgefit-check__status">{{ finding.status }}</span
          ><span>{{ finding.api }}</span
          ><small>{{ finding.source }}</small>
        </li>
      </ul>
    </div>
    <template #bottom><span>Your code and every dependency</span><span>2 errors</span></template>
  </VisualFrame>
</template>

<style scoped>
  .edgefit-check {
    margin: auto 0;
    padding: var(--space-4) 0;
  }
  .edgefit-check__command {
    margin: 0 0 var(--space-4);
    color: var(--fg);
    font-size: var(--text-sm);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
  }
  li {
    display: flex;
    align-items: baseline;
    gap: 12px;
    color: var(--fg);
    font-size: var(--text-xs);
  }
  .edgefit-check__status {
    width: 1ch;
    color: var(--fg-dim);
  }
  .edgefit-check__error .edgefit-check__status {
    color: var(--accent);
  }
  small {
    margin-left: auto;
    color: var(--fg-dim);
    font-size: var(--text-2xs);
  }
  @media (max-width: 420px) {
    li {
      gap: 8px;
      font-size: var(--text-2xs);
    }
  }
</style>
