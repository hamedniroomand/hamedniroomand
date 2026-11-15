<script setup lang="ts">
  const REQUESTS = [
    { method: 'POST', path: '/h/7f3a/orders', body: 'json', latest: true },
    { method: 'PUT', path: '/h/7f3a/users/42', body: 'form', latest: false },
    { method: 'PATCH', path: '/h/7f3a/feed', body: 'xml', latest: false },
    { method: 'DELETE', path: '/h/7f3a/cache', body: 'text', latest: false },
  ];
</script>

<template>
  <VisualFrame
    class="webhooky-visual"
    label="Webhooky: a temporary inbox that lists four captured webhook requests with the method, the path and the body type"
    title="webhooky / inbox"
    note="live"
  >
    <div class="request-feed">
      <p class="request-feed__endpoint">hooks.example.com/h/<span class="accent">7f3a</span></p>
      <ul>
        <li
          v-for="request in REQUESTS"
          :key="request.path"
          :class="{ 'request-feed__latest': request.latest }"
        >
          <span class="request-feed__method">{{ request.method }}</span
          ><span class="request-feed__path">{{ request.path }}</span
          ><small>{{ request.body }}</small>
        </li>
      </ul>
    </div>
    <template #bottom><span>Expires in 24 hours</span><span>4 requests</span></template>
  </VisualFrame>
</template>

<style scoped>
  .request-feed {
    margin: auto 0;
    padding: var(--space-4) 0;
  }
  .request-feed__endpoint {
    margin: 0 0 var(--space-4);
    overflow: hidden;
    color: var(--fg);
    font-size: var(--text-sm);
    text-overflow: ellipsis;
    white-space: nowrap;
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
    grid-template-columns: 6ch minmax(0, 1fr) auto;
    align-items: baseline;
    gap: 12px;
    color: var(--fg);
    font-size: var(--text-xs);
  }
  .request-feed__method {
    color: var(--fg-dim);
  }
  .request-feed__latest .request-feed__method {
    color: var(--accent);
  }
  .request-feed__path {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  small {
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
