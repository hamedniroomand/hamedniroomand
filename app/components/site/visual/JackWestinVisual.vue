<script setup lang="ts">
  const OPTIONS = [
    { key: 'A', text: 'Hexokinase', correct: false },
    { key: 'B', text: 'Phosphofructokinase-1', correct: true },
    { key: 'C', text: 'Pyruvate kinase', correct: false },
  ];
</script>

<template>
  <VisualFrame
    class="jw-visual"
    label="Illustration of a Jack Westin flashcard beside a sample practice question with the correct answer marked"
    title="jackwestin / study"
    note="MCAT prep"
  >
    <div class="jw-study">
      <div class="jw-card">
        <span class="jw-tag">Flashcard · Psychology</span>
        <p>What does the Yerkes–Dodson law describe?</p>
      </div>
      <div class="jw-exam">
        <span class="jw-tag">Practice question</span>
        <p>Which enzyme controls the rate of glycolysis?</p>
        <ul>
          <li
            v-for="option in OPTIONS"
            :key="option.key"
            :class="{ 'jw-exam__correct': option.correct }"
          >
            <span>{{ option.key }}</span
            >{{ option.text }}
          </li>
        </ul>
      </div>
    </div>
    <template #bottom><span>500K+ student accounts</span><span>Vue 3 · Nuxt 4</span></template>
  </VisualFrame>
</template>

<style scoped>
  .jw-visual {
    container-type: inline-size;
  }
  .jw-study {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    align-items: center;
    gap: 12px;
    margin: auto 0;
  }
  .jw-card,
  .jw-exam {
    display: grid;
    align-content: start;
    gap: 6px;
    padding: 10px 12px;
    border: 1px solid var(--visual-line);
    border-radius: var(--visual-radius-sm);
    background: var(--visual-surface);
  }
  .jw-card {
    transform: rotate(-2deg);
  }
  .jw-tag {
    color: var(--fg-dim);
    font-size: var(--text-2xs);
  }
  p {
    margin: 0;
    color: var(--fg);
    font-size: var(--text-xs);
    line-height: 1.45;
  }
  ul {
    display: grid;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: flex;
    gap: 8px;
    color: var(--fg);
    font-size: var(--text-2xs);
  }
  li span {
    color: var(--fg-dim);
  }
  .jw-exam__correct,
  .jw-exam__correct span {
    color: var(--accent);
  }
  @container (max-width: 460px) {
    .jw-study {
      grid-template-columns: minmax(0, 1fr);
    }
    .jw-card {
      display: none;
    }
  }
</style>
