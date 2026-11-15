<script setup lang="ts">
  import sansFont from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url';
  import monoFont from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url';
  import displayItalicFont from '@fontsource/old-standard-tt/files/old-standard-tt-latin-400-italic.woff2?url';
  import displayFont from '@fontsource/old-standard-tt/files/old-standard-tt-latin-400-normal.woff2?url';

  useHead({
    link: [displayFont, displayItalicFont, sansFont, monoFont].map(href => ({
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
