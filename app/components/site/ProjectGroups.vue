<script setup lang="ts">
  import { projectGroups } from '#shared/public-site';
  import type { Project } from '#shared/schemas/project';

  /** The first open-source projects get wide plates. The rest get compact plates. */
  const WIDE_OPEN_SOURCE = 4;

  /** A row is a plate with its text beside it. The other two are grids of plates. */
  type Layout = 'rows' | 'wide' | 'compact';

  interface Grid {
    items: Project[];
    layout: Layout;
  }

  const props = defineProps<{ projects: Project[]; level: 2 | 3 }>();

  function filled(grids: Grid[]): Grid[] {
    return grids.filter(grid => grid.items.length > 0);
  }

  const groups = computed(() => {
    const { client, openSource } = projectGroups(props.projects);
    return [
      {
        id: 'client-work',
        title: 'Client work',
        grids: filled([{ items: client, layout: 'rows' }]),
      },
      {
        id: 'open-source',
        title: 'Open source',
        grids: filled([
          { items: openSource.slice(0, WIDE_OPEN_SOURCE), layout: 'wide' },
          { items: openSource.slice(WIDE_OPEN_SOURCE), layout: 'compact' },
        ]),
      },
    ].filter(group => group.grids.length > 0);
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
      v-for="grid in group.grids"
      :key="grid.layout"
      class="project-grid"
      :class="`project-grid--${grid.layout}`"
    >
      <ProjectCard
        v-for="project in grid.items"
        :key="project.slug"
        :project="project"
        :heading="cardHeading"
      />
    </div>
  </section>
</template>
