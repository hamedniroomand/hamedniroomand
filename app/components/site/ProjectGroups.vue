<script setup lang="ts">
  import { projectGroups } from '#shared/public-site';
  import type { Project } from '#shared/schemas/project';

  const props = defineProps<{ projects: Project[]; level: 2 | 3 }>();

  const groups = computed(() => {
    const { client, openSource } = projectGroups(props.projects);
    return [
      { id: 'client-work', title: 'Client work', items: client, compact: false },
      { id: 'open-source', title: 'Open source', items: openSource, compact: true },
    ].filter(group => group.items.length > 0);
  });
  const groupHeading = computed(() => `h${props.level}`);
  const cardHeading = computed(() => (props.level === 2 ? 'h3' : 'h4'));
</script>

<template>
  <section
    v-for="group in groups"
    :key="group.id"
    class="project-group"
    :aria-labelledby="group.id"
  >
    <component
      :is="groupHeading"
      :id="group.id"
      class="project-group__title"
      >{{ group.title }}</component
    >
    <div
      class="project-grid"
      :class="{ 'project-grid--compact': group.compact }"
    >
      <ProjectCard
        v-for="project in group.items"
        :key="project.slug"
        :project="project"
        :heading="cardHeading"
      />
    </div>
  </section>
</template>
