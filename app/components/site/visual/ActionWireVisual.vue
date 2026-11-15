<script setup lang="ts">
  const TOOLS = [
    { name: 'list_tasks', state: 'registered', called: false },
    { name: 'complete_task', state: 'called', called: true },
    { name: 'delete_task', state: 'registered', called: false },
  ];
</script>

<template>
  <VisualFrame
    class="action-wire-visual"
    label="Action Wire: a request to the assistant, and the three tools the page registered, of which the assistant calls one"
    title="action wire / assistant"
    note="WebMCP"
  >
    <div class="tool-call">
      <p class="tool-call__prompt"><span class="accent">›</span> Mark task 12 as done</p>
      <ul>
        <li
          v-for="tool in TOOLS"
          :key="tool.name"
          :class="{ 'tool-call__called': tool.called }"
        >
          <span class="tool-call__name">{{ tool.name }}</span><small>{{ tool.state }}</small>
        </li>
      </ul>
    </div>
    <template #bottom><span>Tools the page registered</span><span>1 call</span></template>
  </VisualFrame>
</template>

<style scoped>
  .tool-call {
    margin: auto 0;
    padding: var(--space-4) 0;
  }
  .tool-call__prompt {
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
    gap: 6px;
  }
  li {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 4px 10px;
    border: 1px solid var(--visual-line);
    border-radius: var(--visual-radius-sm);
    background: var(--visual-surface);
    color: var(--visual-ink);
    font-size: var(--text-xs);
  }
  .tool-call__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  small {
    margin-left: auto;
    color: var(--fg-dim);
    font-size: var(--text-2xs);
  }
  .tool-call__called {
    border-color: color-mix(in srgb, var(--accent) 40%, var(--visual-line));
    color: var(--fg);
  }
  .tool-call__called small {
    color: var(--accent);
  }
  @media (max-width: 420px) {
    li {
      font-size: var(--text-2xs);
    }
  }
</style>
