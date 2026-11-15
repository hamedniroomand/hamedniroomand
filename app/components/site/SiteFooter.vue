<script setup lang="ts">
  import { githubUrl, mailtoUrl } from '#shared/cv/links';
  import { DOTFILES_INDEX } from '#shared/cv/panel-target';

  const { site } = useAppConfig();
  const { links } = useCv().profile;
  const items = [
    { to: mailtoUrl(links.email), label: 'Email', external: false },
    { to: links.linkedin, label: 'LinkedIn', external: true },
    { to: githubUrl(links.github), label: 'GitHub', external: true },
    { to: DOTFILES_INDEX, label: 'Dotfiles', external: false },
    { to: site.repo, label: 'Source', external: true },
  ];
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__about">
      <NuxtLink
        to="/"
        class="footer-name"
        ><BrandMark />Hamed Niroomand</NuxtLink
      >
      <p>Drawn, built and measured in Yerevan.</p>
    </div>
    <div class="footer-links">
      <NuxtLink
        v-for="item in items"
        :key="item.label"
        :to="item.to"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noopener' : undefined"
        >{{ item.label }}</NuxtLink
      >
    </div>
    <p
      class="footer-ghost"
      aria-hidden="true"
    >
      Hamed Niroomand.
    </p>
  </footer>
</template>
