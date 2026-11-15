<script setup lang="ts">
  import type { NuxtError } from '#app';
  import { siteHost } from '#shared/site-host';

  const COPY = {
    missing: {
      eyebrow: 'Not found',
      title: 'A little off the path.',
      lede: 'This page doesn’t live here. There’s still plenty to explore on the homepage.',
    },
    failed: {
      eyebrow: 'Something went wrong',
      title: 'That didn’t go to plan.',
      lede: 'Try again in a moment, or head back home.',
    },
  };

  const props = defineProps<{ error: NuxtError }>();
  const route = useRoute();
  const host = siteHost(useRuntimeConfig().public.siteUrl);
  const copy = computed(() => (props.error.status === 404 ? COPY.missing : COPY.failed));
</script>

<template>
  <main class="error-page">
    <p class="error-page__brand"><BrandMark />Hamed Niroomand</p>
    <div class="error-page__content">
      <p class="eyebrow">{{ error.status }} / {{ copy.eyebrow }}</p>
      <h1>{{ copy.title }}</h1>
      <p class="error-page__lede">{{ copy.lede }}</p>
      <p class="error-page__prompt">hamed@{{ host }}:~$ open {{ route.fullPath }}</p>
      <a
        class="btn"
        href="/"
        @click.prevent="clearError({ redirect: '/' })"
        >Back to home</a
      >
    </div>
    <span
      class="error-page__code"
      aria-hidden="true"
      >{{ error.status }}</span
    >
  </main>
</template>

<style scoped>
  .error-page {
    min-height: 100dvh;
    max-width: 1200px;
    margin: auto;
    padding: 36px clamp(24px, 6vw, 80px);
    position: relative;
    isolation: isolate;
    overflow: hidden;
  }
  .error-page__brand {
    display: flex;
    align-items: center;
    gap: 12px;
    font: 400 1.25rem / 1 var(--font-display);
  }
  .error-page__brand .brand-mark {
    width: 28px;
    height: 28px;
  }
  .error-page__content {
    max-width: 610px;
    padding: clamp(80px, 16vh, 180px) 0;
  }
  h1 {
    margin: 18px 0 22px;
    font: 400 var(--display-lg) / 1.02 var(--font-display);
    letter-spacing: var(--tracking-display);
  }
  .error-page__lede {
    color: var(--fg-dim);
    line-height: 1.8;
    max-width: 430px;
  }
  .error-page__prompt {
    font: 11px var(--font-mono);
    color: var(--accent);
    margin: 32px 0;
    overflow-wrap: anywhere;
  }
  .error-page__code {
    position: absolute;
    z-index: var(--z-decoration);
    right: 0;
    bottom: 0;
    font: 400 clamp(150px, 30vw, 380px) / 0.8 var(--font-display);
    color: var(--border);
    opacity: 0.6;
  }
</style>
