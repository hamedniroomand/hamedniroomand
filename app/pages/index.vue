<script setup lang="ts">
  import { PROJECTS_INDEX } from '#shared/cv/panel-target';
  import { homeProjects } from '#shared/public-site';

  const { projects, experience } = useCv();
  const featured = projects.find(project => project.slug === 'cue');
  const selected = homeProjects(projects);
  usePublicSeo(
    'Hamed Niroomand — Senior Web Developer',
    'Senior web developer with 7+ years in Vue, Nuxt and TypeScript. Projects, work history and a way to get in touch.',
  );
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <section
      id="experience"
      class="work-section"
      aria-labelledby="work-title"
    >
      <div class="section-heading">
        <div>
          <h2 id="work-title">Where I&rsquo;ve worked</h2>
        </div>
      </div>
      <WorkTimeline :experience="experience" />
    </section>
    <section
      id="projects"
      class="projects-section"
      aria-labelledby="projects-title"
    >
      <div class="section-heading">
        <div>
          <h2 id="projects-title">Selected projects</h2>
        </div>
        <NuxtLink
          :to="PROJECTS_INDEX"
          class="text-link"
          >See all {{ projects.length }} projects <span aria-hidden="true">→</span></NuxtLink
        >
      </div>
      <ProjectCard
        v-if="featured"
        :project="featured"
        :index="0"
        featured
      />
      <div class="project-grid">
        <ProjectCard
          v-for="(project, index) in selected"
          :key="project.slug"
          :project="project"
          :index="index"
        />
      </div>
    </section>
    <ContactSection />
  </div>
</template>
