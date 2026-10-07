<script setup lang="ts">
  const ROUTES = [
    { audience: 'iOS', destination: 'apps.apple.com/app/launch' },
    { audience: 'Android', destination: 'play.google.com/store/launch' },
    { audience: 'Desktop', destination: 'example.com/launch' },
  ];
</script>

<template>
  <VisualFrame
    class="masir-visual"
    label="Masir: one short link that sends iOS, Android and desktop visitors to different destinations"
    title="masir / link"
    note="self-hosted"
  >
    <div class="short-link">
      <p class="short-link__address">go.example.com/<span class="accent">launch</span></p>
      <ul>
        <li
          v-for="route in ROUTES"
          :key="route.audience"
        >
          <span>{{ route.audience }}</span
          ><span class="short-link__arrow">→</span
          ><span class="short-link__destination">{{ route.destination }}</span>
        </li>
      </ul>
    </div>
    <template #bottom><span>1,284 clicks</span><span>0 IP addresses stored</span></template>
  </VisualFrame>
</template>

<style scoped>
  .short-link {
    margin: auto 0;
    padding: var(--space-4) 0;
  }
  .short-link__address {
    margin: 0 0 var(--space-4);
    color: var(--fg);
    font-size: var(--text-lg);
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
    grid-template-columns: 8ch auto minmax(0, 1fr);
    gap: 12px;
    color: var(--fg);
    font-size: var(--text-xs);
  }
  .short-link__arrow {
    color: var(--accent);
  }
  .short-link__destination {
    overflow: hidden;
    color: var(--fg-dim);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (max-width: 420px) {
    li {
      gap: 8px;
      font-size: var(--text-2xs);
    }
  }
</style>
