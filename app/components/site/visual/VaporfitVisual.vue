<script setup lang="ts">
  const FINDINGS = [
    { status: '✕', rule: 'reka-ui/as-child', level: 'error', error: true },
    { status: '✕', rule: 'vapor/object-directive', level: 'error', error: true },
    { status: '✕', rule: 'vapor/vdom-component', level: 'error', error: true },
    { status: '?', rule: 'reka-ui/as-child-other', level: 'unknown', error: false },
  ];
</script>

<template>
  <VisualFrame
    class="vaporfit-visual"
    label="vaporfit: a check of a Vue project that finds three rules that break without an error in Vapor mode, and one rule with no proof"
    title="vaporfit / check"
    note="Vue 3.6"
  >
    <div class="vaporfit-check">
      <p class="vaporfit-check__command"><span class="accent">$</span> npx vaporfit</p>
      <ul>
        <li
          v-for="finding in FINDINGS"
          :key="finding.rule"
          :class="{ 'vaporfit-check__error': finding.error }"
        >
          <span class="vaporfit-check__status">{{ finding.status }}</span
          ><span class="vaporfit-check__rule">{{ finding.rule }}</span
          ><small>{{ finding.level }}</small>
        </li>
      </ul>
    </div>
    <template #bottom><span>No warning in the console</span><span>3 errors</span></template>
  </VisualFrame>
</template>

<style scoped>
  .vaporfit-check {
    margin: auto 0;
    padding: var(--space-4) 0;
  }
  .vaporfit-check__command {
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
  .vaporfit-check__status {
    width: 1ch;
    color: var(--fg-dim);
  }
  .vaporfit-check__error .vaporfit-check__status {
    color: var(--accent);
  }
  .vaporfit-check__rule {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
