<script setup lang="ts">
  const LABS = [
    { symbol: '{ }', name: 'Data' },
    { symbol: '#', name: 'Crypto' },
    { symbol: '◒', name: 'Color' },
    { symbol: '↗', name: 'Network' },
    { symbol: '▧', name: 'Image' },
    { symbol: '</>', name: 'Dev' },
  ];
</script>

<template>
  <VisualFrame
    class="kitdev-visual"
    label="KitDev Space: a collection of six connected tool labs for data, crypto, color, network, images, and development"
    title="kitdev.space / workbench"
  >
    <div
      class="tool-cluster"
      aria-hidden="true"
    >
      <div
        v-for="lab in LABS"
        :key="lab.name"
        class="tool-cluster__tile"
      >
        <span class="tool-cluster__symbol">{{ lab.symbol }}</span>
        <span>{{ lab.name }}</span>
      </div>
    </div>
    <template #bottom><span>A place for the little things.</span><span>Six labs</span></template>
  </VisualFrame>
</template>

<style scoped>
  .tool-cluster {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    width: 100%;
    max-width: 350px;
    margin: auto;
    padding: 14px 4px;
  }
  .tool-cluster__tile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 9px;
    min-height: 70px;
    border: 1px solid var(--visual-line);
    border-radius: var(--visual-radius);
    background: var(--visual-surface);
    color: var(--visual-ink);
    font-size: var(--text-3xs);
    transition:
      transform var(--dur) var(--ease-out),
      border-color var(--dur) var(--ease);
  }
  .tool-cluster__tile:nth-child(3n + 2) {
    transform: translateY(-7px);
  }
  .tool-cluster__tile:first-child {
    border-color: color-mix(in srgb, var(--accent) 40%, var(--visual-line));
    background: color-mix(in srgb, var(--accent) 5%, var(--visual-surface));
  }
  .tool-cluster__symbol {
    color: var(--accent);
    font-size: var(--text-lg);
    line-height: 1;
  }
  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    .project-card:hover .tool-cluster__tile:nth-child(3n + 2) {
      transform: translateY(-10px);
    }
  }
</style>
