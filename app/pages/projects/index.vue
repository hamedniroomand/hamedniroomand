<script setup lang="ts">
  import { PROJECTS_INDEX } from '#shared/cv/panel-target';

  const { projects, profile } = useCv();
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Projects' }];

  usePublicSeo(
    `Projects — ${profile.name}`,
    `Client work, open source tools and web apps by ${profile.name}.`,
    PROJECTS_INDEX,
  );
</script>

<template>
  <div class="project-page">
    <PanelCrumbs :items="crumbs" />
    <header class="project-page__header">
      <p class="eyebrow">{{ projects.length }} projects</p>
      <h1 id="projects-title">All projects<span class="accent">.</span></h1>
      <p class="project-page__headline">Client work, open source tools and web apps.</p>
    </header>
    <ProjectGroups
      :projects="projects"
      :level="2"
    />
  </div>
</template>
