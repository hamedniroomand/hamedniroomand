<script setup lang="ts">
  import { githubUrl } from '#shared/cv/links';
  import { PDF_FILE, PDF_PATH } from '#shared/pdf';

  const { profile } = useCv();
</script>

<template>
  <section
    id="top"
    class="home-hero"
  >
    <p class="hero-caption">
      <span>Senior Web Developer</span>
      <span
        v-if="profile.openToWork"
        class="hero-badge"
        >Open to work</span
      >
    </p>
    <h1>
      <span>{{ profile.name }}.</span>{{ ' ' }}
      <span class="hero-subline">Useful things, built with <em>curiosity.</em></span>
    </h1>
    <div class="hero-bottom">
      <p>
        I’m Hamed, a senior web developer with 7+ years in Vue, Nuxt and TypeScript. I build
        learning platforms, financial dashboards and developer tools, from the interface to the
        services behind it. I live in Yerevan and work remotely on US and EU hours.
      </p>
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
    <BrandMark class="hero-decoration" />
  </section>
</template>
