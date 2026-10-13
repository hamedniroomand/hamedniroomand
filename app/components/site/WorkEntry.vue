<script setup lang="ts">
  import { projectPath } from '#shared/cv/panel-target';
  import type { PublicExperience } from '#shared/cv/public-experience';
  import type { Project } from '#shared/schemas/project';

  defineProps<{ entry: PublicExperience; project?: Project }>();
</script>

<template>
  <li class="work-row">
    <div class="work-row__when">
      <span
        class="work-row__marker"
        aria-hidden="true"
      />
      <span>{{ entry.range }}</span>
    </div>
    <div class="work-row__what">
      <h3>
        <a
          v-if="entry.url"
          :href="entry.url"
          target="_blank"
          rel="noopener"
          >{{ entry.company }} <span aria-hidden="true">↗</span></a
        >
        <template v-else>{{ entry.company }}</template>
      </h3>
      <p class="work-row__roles">{{ entry.roles.join(' · ') }}</p>
      <p class="work-row__where">{{ entry.location }} · {{ entry.type }}</p>
      <p class="work-row__summary">{{ entry.summary }}</p>
      <ul class="work-row__stack">
        <li
          v-for="item in entry.stack"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
      <p
        v-if="project"
        class="work-row__links"
      >
        <NuxtLink :to="projectPath(project.slug)"
          >Case study <span aria-hidden="true">→</span></NuxtLink
        >
        <template v-if="project.live">
          <span class="work-row__try">Try it:</span>
          <a
            v-for="link in project.live"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener"
            >{{ link.label }}</a
          >
        </template>
      </p>
    </div>
  </li>
</template>
