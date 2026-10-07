<script setup lang="ts">
  import type { Component } from 'vue';

  import CpmVisual from './visual/CpmVisual.vue';
  import CueVisual from './visual/CueVisual.vue';
  import EdgefitVisual from './visual/EdgefitVisual.vue';
  import KitdevVisual from './visual/KitdevVisual.vue';
  import LayerscopeVisual from './visual/LayerscopeVisual.vue';
  import MasirVisual from './visual/MasirVisual.vue';
  import WaveruneVisual from './visual/WaveruneVisual.vue';

  defineProps<{ slug: string }>();

  const VISUALS: Record<string, Component> = {
    cpm: CpmVisual,
    cue: CueVisual,
    edgefit: EdgefitVisual,
    kitdev: KitdevVisual,
    layerscope: LayerscopeVisual,
    masir: MasirVisual,
    waverune: WaveruneVisual,
  };
</script>

<template>
  <component
    :is="VISUALS[slug]"
    v-if="VISUALS[slug]"
  />
  <VisualFrame
    v-else
    :label="`${slug} project`"
    :title="slug"
  />
</template>
