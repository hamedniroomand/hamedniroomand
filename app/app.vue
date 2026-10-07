<script setup lang="ts">
  import sansFont from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url';
  import monoFont from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url';

  useHead({
    link: [sansFont, monoFont].map(href => ({
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      href,
      crossorigin: '',
    })),
  });
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
