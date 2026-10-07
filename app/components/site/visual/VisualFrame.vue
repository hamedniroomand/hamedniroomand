<script setup lang="ts">
  defineProps<{ label: string; title: string; note?: string }>();
</script>

<template>
  <div
    class="project-visual"
    role="img"
    :aria-label="label"
  >
    <div class="visual-topline">
      <span>{{ title }}</span
      ><span v-if="note">{{ note }}</span>
    </div>
    <slot />
    <div
      v-if="$slots.bottom"
      class="visual-bottomline"
    >
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped>
  .project-visual {
    --visual-surface: color-mix(in srgb, var(--surface-page) 75%, var(--surface-raised));
    --visual-line: color-mix(in srgb, var(--accent) 12%, var(--border-subtle));
    --visual-ink: var(--text-muted);
    --visual-radius: 16px;
    --visual-radius-sm: 10px;
    background-image: radial-gradient(
      ellipse at 72% 38%,
      color-mix(in srgb, var(--accent) 5%, transparent),
      transparent 65%
    );
  }
</style>
