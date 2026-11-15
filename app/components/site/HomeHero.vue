<script setup lang="ts">
  import { githubUrl } from '#shared/cv/links';
  import { PDF_FILE, PDF_PATH } from '#shared/pdf';

  const { profile } = useCv();
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/+$/, '');
  const command = `curl ${siteUrl}/api/cv`;
  const { copy, copied } = useClipboard();
  const copyFailed = ref(false);
  const copyStatus = computed(() => {
    if (copied.value) return 'Command copied.';
    return copyFailed.value ? 'Could not copy. Select the command instead.' : '';
  });

  async function copyCommand(): Promise<void> {
    copyFailed.value = !(await copy(command));
  }
</script>

<template>
  <section
    id="top"
    class="home-hero"
  >
    <p class="hero-caption">
      <span>Senior Frontend Engineer</span>
      <span
        v-if="profile.openToWork"
        class="hero-badge"
        >Open to work</span
      >
    </p>
    <h1><span>Hamed</span>{{ ' ' }}<span>Niroomand.</span></h1>
    <div class="hero-pitch">
      <p class="hero-thesis">I build interfaces that hold together.</p>
      <p class="hero-intro">
        Vue, Nuxt and TypeScript, from the design system to the server render. Based in Yerevan,
        remote on US and EU hours.
      </p>
    </div>
    <div class="hero-cta">
      <div class="hero-actions">
        <a
          href="#contact"
          class="btn"
          >Get in touch</a
        >
        <a
          :href="PDF_PATH"
          :download="PDF_FILE"
          class="btn btn-ghost"
          >Download CV</a
        >
        <span class="hero-links">
          <a
            :href="profile.links.linkedin"
            class="hero-icon"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn profile"
            ><LinkedinIcon
          /></a>
          <a
            :href="githubUrl(profile.links.github)"
            class="hero-icon"
            target="_blank"
            rel="noopener"
            aria-label="GitHub profile"
            ><GithubIcon
          /></a>
        </span>
      </div>
    </div>
    <HeroAssembly class="hero-figure" />
    <p class="hero-command">
      <code>{{ command }}</code>
      <button
        type="button"
        @click="copyCommand"
      >
        {{ copied ? 'Copied' : 'Copy' }}<span class="visually-hidden"> the command</span>
      </button>
      <span
        class="visually-hidden"
        aria-live="polite"
        >{{ copyStatus }}</span
      >
    </p>
  </section>
</template>
