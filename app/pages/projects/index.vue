<script setup lang="ts">
  import { PROJECTS_INDEX } from '#shared/cv/panel-target';

  const { projects, profile } = useCv();
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Projects' }];

  usePublicSeo(
    `Projects — ${profile.name}`,
    `Open source tools, web apps and client work by ${profile.name}.`,
    PROJECTS_INDEX,
  );
</script>

<template>
  <div class="project-page">
    <PanelCrumbs :items="crumbs" />
    <header class="project-page__header">
      <p class="eyebrow">{{ projects.length }} projects</p>
      <h1 id="projects-title">All projects<span class="accent">.</span></h1>
      <p class="project-page__headline">Open source tools, web apps and client work.</p>
    </header>
    <section
      id="projects"
      class="project-grid"
      aria-labelledby="projects-title"
    >
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.slug"
        :project="project"
        :index="index"
      />
    </section>
  </div>
</template>
