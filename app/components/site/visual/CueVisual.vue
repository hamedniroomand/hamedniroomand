<template>
  <VisualFrame
    class="cue-visual"
    label="Cue: start the agent pipeline, plan, implement, review, and deliver a pull request with human approval gates"
    title="cue / agent workflow"
  >
    <div class="cue-terminal">
      <p class="cue-terminal__command"><span class="accent">$</span> cue start</p>
      <ol>
        <li><span>01</span> Plan the issue <small>human approval</small></li>
        <li><span>02</span> Implement in a worktree</li>
        <li><span>03</span> Run checks and review</li>
        <li><span>04</span> Open a pull request <small>human approval</small></li>
      </ol>
    </div>
    <template #bottom><span>GitHub issues → reviewed code</span></template>
  </VisualFrame>
</template>

<style scoped>
  .cue-terminal {
    margin: auto 0;
    padding: var(--space-4) 0;
  }
  .cue-terminal__command {
    margin: 0 0 var(--space-4);
    font-size: var(--text-lg);
    color: var(--fg);
  }
  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 12px;
  }
  li {
    display: flex;
    align-items: baseline;
    gap: 12px;
    color: var(--fg);
    font-size: var(--text-xs);
  }
  li > span {
    color: var(--fg-dim);
  }
  small {
    margin-left: auto;
    color: var(--accent);
    font-size: var(--text-2xs);
  }
  @media (max-width: 420px) {
    li {
      gap: 8px;
      font-size: var(--text-2xs);
    }
    small {
      font-size: var(--text-3xs);
    }
  }
</style>
