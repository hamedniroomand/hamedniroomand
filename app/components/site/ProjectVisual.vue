<script setup lang="ts">
  import type { Component } from 'vue';

  import ActionWireVisual from './visual/ActionWireVisual.vue';
  import CodepicVisual from './visual/CodepicVisual.vue';
  import CpmVisual from './visual/CpmVisual.vue';
  import CueVisual from './visual/CueVisual.vue';
  import DibaVisual from './visual/DibaVisual.vue';
  import EdgefitVisual from './visual/EdgefitVisual.vue';
  import JackWestinVisual from './visual/JackWestinVisual.vue';
  import KitdevVisual from './visual/KitdevVisual.vue';
  import LayerscopeVisual from './visual/LayerscopeVisual.vue';
  import MasirVisual from './visual/MasirVisual.vue';
  import VaporfitVisual from './visual/VaporfitVisual.vue';
  import WaveruneVisual from './visual/WaveruneVisual.vue';
  import WebhookyVisual from './visual/WebhookyVisual.vue';

  defineProps<{ slug: string }>();

  const VISUALS: Record<string, Component> = {
    'action-wire': ActionWireVisual,
    codepic: CodepicVisual,
    cpm: CpmVisual,
    cue: CueVisual,
    'diba-art-studio': DibaVisual,
    edgefit: EdgefitVisual,
    'jack-westin': JackWestinVisual,
    kitdev: KitdevVisual,
    layerscope: LayerscopeVisual,
    masir: MasirVisual,
    vaporfit: VaporfitVisual,
    waverune: WaveruneVisual,
    webhooky: WebhookyVisual,
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
