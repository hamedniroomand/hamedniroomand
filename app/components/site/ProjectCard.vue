<script setup lang="ts">
  import { projectPath } from '#shared/cv/panel-target';
  import { projectStory } from '#shared/public-site';
  import type { Project } from '#shared/schemas/project';

  const props = defineProps<{ project: Project; index: number; featured?: boolean }>();

  const path = computed(() => projectPath(props.project.slug));
  const story = computed(() => projectStory(props.project));
</script>

<template>
  <article
    :id="`project-${project.slug}`"
    class="project-card"
    :class="{ 'project-card--featured': featured }"
  >
    <NuxtLink
      :to="path"
      class="project-card__visual"
      :style="projectViewStyle(project.slug)"
      :aria-label="`Explore ${project.name}`"
      ><ProjectVisual :slug="project.slug" />
    </NuxtLink>
    <div class="project-card__copy">
      <div class="project-card__meta">
        <span>{{ featured ? 'Featured / ' : '' }}{{ story.category }}</span>
      </div>
      <h3>
        <NuxtLink :to="path">{{ project.name }} <span aria-hidden="true">↗</span></NuxtLink>
      </h3>
      <p>{{ story.headline }}</p>
      <p
        v-if="featured"
        class="project-card__description"
      >
        I built Cue to make agent-assisted development inspectable: an issue becomes a plan, an
        implementation, and a reviewed pull request, with human approval along the way.
      </p>
      <span class="project-card__stack">{{ project.stack.slice(0, 2).join(' · ') }}</span>
    </div>
  </article>
</template>
