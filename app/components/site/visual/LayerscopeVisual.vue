<script setup lang="ts">
  const LAYERS = ['shared', 'shop', 'admin'];
  const USES = [
    { from: 'shop', to: 'shared', symbol: 'useMoney()', allowed: true },
    { from: 'admin', to: 'shared', symbol: '<BaseTable>', allowed: true },
    { from: 'admin', to: 'shop', symbol: 'useCart()', allowed: false },
  ];
</script>

<template>
  <VisualFrame
    class="layerscope-visual"
    label="layerscope: three Nuxt layers, where the admin layer uses an auto-imported composable from the shop layer that it is not allowed to use"
    title="layerscope / layer graph"
    note="auto-imports"
  >
    <div class="layer-map">
      <div
        class="layer-map__layers"
        aria-hidden="true"
      >
        <span
          v-for="layer in LAYERS"
          :key="layer"
          class="layer-map__layer"
          >{{ layer }}</span
        >
      </div>
      <ul>
        <li
          v-for="use in USES"
          :key="use.symbol"
          :class="{ 'layer-map__violation': !use.allowed }"
        >
          <span>{{ use.from }} → {{ use.to }}</span
          ><span>{{ use.symbol }}</span
          ><small>{{ use.allowed ? 'allowed' : 'not allowed' }}</small>
        </li>
      </ul>
    </div>
    <template #bottom><span>No import statement needed</span><span>1 violation</span></template>
  </VisualFrame>
</template>

<style scoped>
  .layer-map {
    display: grid;
    gap: var(--space-4);
    margin: auto 0;
    padding: var(--space-4) 0;
  }
  .layer-map__layers {
    display: flex;
    gap: 10px;
  }
  .layer-map__layer {
    flex: 1;
    padding: 10px 0;
    border: 1px solid var(--visual-line);
    border-radius: var(--visual-radius-sm);
    background: var(--visual-surface);
    color: var(--visual-ink);
    font-size: var(--text-2xs);
    text-align: center;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
  }
  li {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 12px;
    color: var(--fg);
    font-size: var(--text-xs);
  }
  small {
    color: var(--fg-dim);
    font-size: var(--text-2xs);
  }
  .layer-map__violation small {
    color: var(--accent);
  }
  @media (max-width: 420px) {
    li {
      gap: 8px;
      font-size: var(--text-2xs);
    }
  }
</style>
