<script setup lang="ts">
  import { publicExperience } from '#shared/cv/public-experience';
  import type { Experience } from '#shared/schemas/experience';
  import type { Project } from '#shared/schemas/project';

  /** The most recent entries are open. The rest sit behind a disclosure. */
  const RECENT = 2;

  const props = defineProps<{ experience: Experience[]; projects: Project[] }>();
  /** The client project of each company, so a row can link its case study. */
  const byClient = computed(
    () =>
      new Map(
        props.projects.flatMap(project => (project.client ? [[project.client, project]] : [])),
      ),
  );
  const entries = computed(() => publicExperience(props.experience));
  const recent = computed(() => entries.value.slice(0, RECENT));
  const earlier = computed(() => entries.value.slice(RECENT));
</script>

<template>
  <div>
    <ol class="work-list">
      <WorkEntry
        v-for="entry in recent"
        :key="entry.slug"
        :entry="entry"
        :project="byClient.get(entry.slug)"
      />
    </ol>
    <details
      v-if="earlier.length"
      class="earlier-work"
    >
      <summary>
        Earlier work <span class="earlier-work__count">{{ earlier.length }} more</span
        ><span
          class="earlier-work__icon"
          aria-hidden="true"
          >+</span
        >
      </summary>
      <ol
        class="work-list"
        :start="RECENT + 1"
      >
        <WorkEntry
          v-for="entry in earlier"
          :key="entry.slug"
          :entry="entry"
          :project="byClient.get(entry.slug)"
        />
      </ol>
    </details>
  </div>
</template>
