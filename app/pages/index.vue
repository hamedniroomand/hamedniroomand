<script setup lang="ts">
  import { mailtoUrl } from '#shared/cv/links';
  import { PROJECTS_INDEX, dotfilePath } from '#shared/cv/panel-target';
  import { homeProjects } from '#shared/public-site';

  const { projects, dotfiles, experience, profile } = useCv();
  const featured = projects.find(project => project.slug === 'cue');
  const selected = homeProjects(projects);
  usePublicSeo(
    'Hamed Niroomand — Projects & experience',
    'Get to know Hamed Niroomand through his projects, professional experience, and everyday tools.',
  );
</script>

<template>
  <div class="home-page">
    <section
      id="top"
      class="home-hero"
    >
      <p class="hero-caption">Hamed Niroomand / a developer’s workshop</p>
      <h1>
        <span>Useful things.</span><br /><span>Built with <em>curiosity.</em></span>
      </h1>
      <div class="hero-bottom">
        <p>
          I’m Hamed. I build developer tools, explore signal processing, and work on software for
          complex financial workflows. This is where I share what I make and how I work.
        </p>
        <a
          href="#projects"
          class="hero-explore"
          >Explore the work <span aria-hidden="true">↓</span></a
        >
      </div>
      <BrandMark class="hero-decoration" />
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
      class="setup-section"
      aria-labelledby="setup-title"
    >
      <div class="setup-copy">
        <p class="eyebrow">The everyday setup</p>
        <h2 id="setup-title">Make yourself<br />at <span class="mono">~</span> home.</h2>
        <p>
          The editor settings and small configurations that make a workspace feel like mine. Open a
          file. Borrow what’s useful.
        </p>
        <NuxtLink
          to="/dotfiles"
          class="text-link"
          >Browse dotfiles <span aria-hidden="true">↗</span></NuxtLink
        >
      </div>
      <div class="setup-files">
        <div class="setup-files__bar">~/.config <span>personal setup</span></div>
        <NuxtLink
          v-for="dotfile in dotfiles.slice(0, 3)"
          :key="dotfile.slug"
          :to="dotfilePath(dotfile.slug)"
          class="setup-file"
          ><span
            class="file-icon"
            aria-hidden="true"
            >{ }</span
          ><span
            ><strong>{{ dotfile.title }}</strong
            ><small>{{ dotfile.path }}</small></span
          ><span aria-hidden="true">↗</span></NuxtLink
        >
        <p class="setup-files__note">Readable. Copyable. Yours to adapt.</p>
      </div>
    </section>
    <section class="hello-section">
      <p class="eyebrow">Keep in touch</p>
      <h2>Something in common?</h2>
      <div>
        <p>
          A useful tool, a strange idea, or a good conversation.<br />I’m always happy to hear about
          it.
        </p>
        <a
          :href="mailtoUrl(profile.links.email)"
          class="text-link"
          >Let’s talk <span aria-hidden="true">↗</span></a
        >
      </div>
    </section>
  </div>
</template>
