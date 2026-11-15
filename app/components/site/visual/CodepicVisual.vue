<script setup lang="ts">
  const LINES = [
    { keyword: 'const', code: ' add = (a, b) => {', marked: false },
    { keyword: '  return', code: ' a + b;', marked: true },
    { keyword: '', code: '};', marked: false },
  ];
</script>

<template>
  <VisualFrame
    class="codepic-visual"
    label="CodePic: a three-line code snippet in a window on a tinted background, with one line highlighted"
    title="codepic / snapshot"
    note="add.ts"
  >
    <div
      class="snapshot"
      aria-hidden="true"
    >
      <div class="snapshot__window">
        <p class="snapshot__controls"><span /><span /><span /></p>
        <ol>
          <li
            v-for="(line, index) in LINES"
            :key="line.code"
            :class="{ 'snapshot__line--marked': line.marked }"
          >
            <small>{{ index + 1 }}</small
            ><span><span class="accent">{{ line.keyword }}</span>{{ line.code }}</span>
          </li>
        </ol>
      </div>
    </div>
    <template #bottom><span>Rendered in the browser</span><span>No upload</span></template>
  </VisualFrame>
</template>

<style scoped>
  .snapshot {
    width: 100%;
    max-width: 350px;
    margin: auto;
    padding: 14px;
    border-radius: var(--visual-radius);
    background: color-mix(in srgb, var(--accent) 14%, var(--visual-surface));
  }
  .snapshot__window {
    padding: 10px 12px 12px;
    border: 1px solid var(--visual-line);
    border-radius: var(--visual-radius-sm);
    background: var(--visual-surface);
  }
  .snapshot__controls {
    display: flex;
    gap: 5px;
    margin: 0 0 10px;
  }
  .snapshot__controls span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--visual-line);
  }
  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 4px;
  }
  li {
    display: flex;
    gap: 12px;
    overflow: hidden;
    color: var(--fg-dim);
    font-size: var(--text-2xs);
    white-space: pre;
  }
  .snapshot__line--marked {
    color: var(--fg);
  }
  small {
    color: var(--fg-dim);
    font-size: inherit;
  }
</style>
