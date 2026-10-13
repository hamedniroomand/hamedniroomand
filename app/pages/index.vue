<script setup lang="ts">
  const { projects, experience } = useCv();
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
      <WorkTimeline
        :experience="experience"
        :projects="projects"
      />
    </section>
    <section
      id="projects"
      class="projects-section"
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
