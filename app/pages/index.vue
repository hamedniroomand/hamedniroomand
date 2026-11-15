<script setup lang="ts">
  const { projects, experience } = useCv();
  usePublicSeo(
    'Hamed Niroomand — Senior Frontend Engineer',
    'Senior frontend engineer with 7+ years in Vue, Nuxt and TypeScript. Measured results, work history, projects and a way to get in touch.',
  );
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <HomeStatement />
    <MeasuredResults />
    <section
      id="experience"
      class="home-section"
      aria-labelledby="work-title"
    >
      <div class="section-heading">
        <h2 id="work-title">Where I&rsquo;ve worked</h2>
      </div>
      <WorkTimeline
        :experience="experience"
        :projects="projects"
      />
    </section>
    <section
      id="projects"
      class="home-section"
      aria-labelledby="projects-title"
    >
      <div class="section-heading">
        <h2 id="projects-title">Projects</h2>
      </div>
      <ProjectGroups
        :projects="projects"
        :level="3"
      />
    </section>
    <ContactSection />
  </div>
</template>
