<script setup lang="ts">
  import type { ThemeName } from '#shared/theme';
  import { THEMES } from '#shared/theme';
  import type { Point } from '~/utils/view-transition';

  const PRIMARY_THEMES = ['dark', 'light'] as const;
  const EXTRA_THEMES = ['gruvbox', 'dracula', 'crt'] as const;

  const { theme, chosen, ready, set, scanlines, setScanlines } = useTheme();
  const root = ref<HTMLDetailsElement | null>(null);
  const SWATCHES: Record<ThemeName, string[]> = {
    dark: ['#151615', '#eeeae2', '#dcb66d'],
    light: ['#f6f5f2', '#1c1f26', '#8a5a00'],
    gruvbox: ['#282828', '#ebdbb2', '#fabd2f'],
    dracula: ['#282a36', '#bd93f9', '#50fa7b'],
    crt: ['#0a0f0a', '#5fb85f', '#9dff9d'],
  };

  function close(restoreFocus = false): void {
    if (!root.value?.open) return;
    root.value.open = false;
    if (restoreFocus) root.value.querySelector('summary')?.focus();
  }
  function summaryCenter(): Point | undefined {
    const box = root.value?.querySelector('summary')?.getBoundingClientRect();
    return box && { x: box.left + box.width / 2, y: box.top + box.height / 2 };
  }
  function choose(name: ThemeName | null): void {
    const origin = summaryCenter();
    close(true);
    set(name, origin);
  }
  function outside(event: PointerEvent): void {
    if (event.target instanceof Node && !root.value?.contains(event.target)) close();
  }
  onMounted(() => document.addEventListener('pointerdown', outside));
  onBeforeUnmount(() => document.removeEventListener('pointerdown', outside));
</script>

<template>
  <details
    ref="root"
    class="theme-picker"
    @keydown.esc.stop.prevent="close(true)"
  >
    <summary aria-label="Color theme">
      <span
        class="theme-picker__icon"
        aria-hidden="true"
        >◐</span
      >
      <span
        class="theme-picker__label"
        data-theme-choice="system"
      >
        System · <span class="theme-picker__system-dark">dark</span
        ><span class="theme-picker__system-light">light</span>
      </span>
      <span
        v-for="name in THEMES"
        :key="name"
        class="theme-picker__label"
        :data-theme-choice="name"
        >{{ name }}</span
      >
      <span
        class="theme-picker__chevron"
        aria-hidden="true"
        >⌄</span
      >
    </summary>
    <div
      class="theme-picker__panel"
      aria-label="Choose a color theme"
    >
      <p>Appearance</p>
      <button
        type="button"
        :aria-pressed="ready ? chosen === null : undefined"
        aria-label="System theme"
        data-theme-choice="system"
        @click="choose(null)"
      >
        <span
          class="theme-picker__system"
          aria-hidden="true"
          >◐</span
        >
        <span>System <small>Follow your device</small></span>
        <span
          class="theme-picker__check"
          aria-hidden="true"
          >✓</span
        >
      </button>
      <template
        v-for="(group, index) in [PRIMARY_THEMES, EXTRA_THEMES]"
        :key="index"
      >
        <p
          v-if="index === 1"
          class="theme-picker__divider"
        >
          Extras
        </p>
        <button
          v-for="name in group"
          :key="name"
          type="button"
          :aria-pressed="ready ? chosen === name : undefined"
          :aria-label="`${name} theme`"
          :data-theme-choice="name"
          @click="choose(name)"
        >
          <span
            class="theme-picker__swatches"
            aria-hidden="true"
          >
            <i
              v-for="color in SWATCHES[name]"
              :key="color"
              :style="{ background: color }"
            />
          </span>
          <span>{{ name }}</span>
          <span
            class="theme-picker__check"
            aria-hidden="true"
            >✓</span
          >
        </button>
      </template>
      <label
        v-if="theme === 'crt'"
        class="theme-picker__effect"
      >
        <input
          type="checkbox"
          :checked="scanlines"
          @change="setScanlines(($event.target as HTMLInputElement).checked)"
        />
        Scanlines
      </label>
    </div>
  </details>
</template>

<style scoped>
  .theme-picker {
    position: relative;
    font: var(--text-xs) var(--font-mono);
  }
  summary {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    padding: 8px 10px;
    list-style: none;
    cursor: pointer;
    text-transform: capitalize;
    border: 1px solid var(--border);
    border-radius: 5px;
    color: var(--fg-dim);
    background: var(--bg-elev);
    transition:
      border-color var(--dur-fast) var(--ease),
      color var(--dur-fast) var(--ease);
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary:hover,
  details[open] summary {
    color: var(--fg);
    border-color: var(--fg-dim);
  }
  .theme-picker__icon {
    font-size: 16px;
    color: var(--accent);
  }
  .theme-picker__chevron {
    margin-left: 4px;
    transition: transform var(--dur-fast) var(--ease);
  }
  /* All labels and marks have identical SSR/client markup. The pre-paint root
     attribute chooses their appearance before Vue or its payload loads. */
  .theme-picker__label {
    display: var(--theme-choice-display, none);
  }
  :global(:root:not([data-theme]) .theme-picker [data-theme-choice='system']),
  :global(:root[data-theme='dark'] .theme-picker [data-theme-choice='dark']),
  :global(:root[data-theme='light'] .theme-picker [data-theme-choice='light']),
  :global(:root[data-theme='gruvbox'] .theme-picker [data-theme-choice='gruvbox']),
  :global(:root[data-theme='dracula'] .theme-picker [data-theme-choice='dracula']),
  :global(:root[data-theme='crt'] .theme-picker [data-theme-choice='crt']) {
    --theme-choice-display: inline;
    --theme-choice-check: visible;
    --theme-choice-background: var(--bg-hover);
  }
  .theme-picker__system-light {
    display: none;
  }
  @media (prefers-color-scheme: light) {
    .theme-picker__system-dark {
      display: none;
    }
    .theme-picker__system-light {
      display: inline;
    }
  }
  details[open] .theme-picker__chevron {
    transform: rotate(180deg);
  }
  .theme-picker__panel {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    z-index: var(--z-popover);
    width: 244px;
    padding: 8px;
    background: var(--bg-elev);
    border: 1px solid var(--border);
    border-radius: 9px;
    box-shadow: var(--shadow);
    animation: picker-in var(--dur) var(--ease-out);
  }
  .theme-picker__panel p {
    margin: 5px 8px 9px;
    color: var(--fg-dim);
    font-size: var(--text-xs);
  }
  button {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 40px;
    padding: 9px 8px;
    border: 0;
    border-radius: 5px;
    background: var(--theme-choice-background, transparent);
    text-align: left;
    text-transform: capitalize;
    font: inherit;
    cursor: pointer;
    transition: background-color var(--dur-fast) var(--ease);
  }
  button:hover {
    background: var(--bg-hover);
  }
  .theme-picker__swatches {
    display: flex;
    gap: 3px;
  }
  .theme-picker__swatches i {
    width: 12px;
    height: 16px;
    border-radius: 3px;
    border: 1px solid rgb(128 128 128 / 35%);
  }
  .theme-picker__check {
    visibility: var(--theme-choice-check, hidden);
    margin-left: auto;
    color: var(--accent);
  }
  .theme-picker__system {
    width: 42px;
    text-align: center;
    color: var(--accent);
    font-size: 20px;
  }
  button small {
    display: block;
    color: var(--fg-dim);
    font-size: var(--text-2xs);
    margin-top: 3px;
    text-transform: none;
  }
  .theme-picker__divider {
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }
  .theme-picker__effect {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    padding: 8px;
    border-top: 1px solid var(--border);
    cursor: pointer;
  }
  .theme-picker__effect input {
    accent-color: var(--accent);
  }
  @keyframes picker-in {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (max-width: 700px) {
    summary,
    button {
      min-height: 44px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .theme-picker__panel {
      animation: none;
    }
    summary,
    button,
    .theme-picker__chevron {
      transition: none;
    }
  }
</style>
