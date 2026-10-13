<script setup lang="ts">
  const props = defineProps<{ siteKey: string }>();
  const token = defineModel<string>({ default: '' });
  const emit = defineEmits<{ failed: [value: boolean] }>();

  const el = ref<HTMLElement | null>(null);
  const { reset, failed } = useTurnstile(el, props.siteKey, token);
  watch(failed, value => emit('failed', value));

  defineExpose({ reset });
</script>

<template>
  <div
    ref="el"
    class="turnstile"
  />
</template>

<style scoped>
  .turnstile {
    min-height: 65px;
  }
</style>
