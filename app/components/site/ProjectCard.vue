<script setup lang="ts">
  import { projectPath } from '#shared/cv/panel-target';
  import { projectStory } from '#shared/public-site';
  import type { Project } from '#shared/schemas/project';

  const props = withDefaults(defineProps<{ project: Project; heading?: 'h3' | 'h4' }>(), {
    heading: 'h3',
  });

  const path = computed(() => projectPath(props.project.slug));
  const story = computed(() => projectStory(props.project));
</script>

<template>
  <article
    :id="`project-${project.slug}`"
    class="project-card"
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
        <span>{{ story.category }}</span>
      </div>
      <component
        :is="heading"
        class="project-card__title"
      >
        <NuxtLink :to="path">{{ project.name }} <span aria-hidden="true">↗</span></NuxtLink>
      </component>
      <p>{{ story.headline }}</p>
      <span class="project-card__stack">{{ project.stack.slice(0, 2).join(' · ') }}</span>
    </div>
  </article>
</template>
