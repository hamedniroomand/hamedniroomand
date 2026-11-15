<script setup lang="ts">
  defineProps<{ label: string; title: string; note?: string }>();
</script>

<template>
  <div
    class="project-visual"
    role="img"
    :aria-label="label"
  >
    <div class="visual-topline"><span>{{ title }}</span><span v-if="note">{{ note }}</span></div>
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
    --visual-radius: 8px;
    --visual-radius-sm: 4px;
    --visual-paper: color-mix(in srgb, var(--fg) 4%, transparent);
    background-image:
      linear-gradient(var(--visual-paper) 1px, transparent 1px),
      linear-gradient(90deg, var(--visual-paper) 1px, transparent 1px);
    background-size: 16px 16px;
  }
</style>
