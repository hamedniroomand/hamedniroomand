<script setup lang="ts">
  defineProps<{ terminalOpen: boolean }>();
  defineEmits<{ toggleTerminal: [] }>();

  const route = useRoute();
  /** Each link is current on the pages under its section. The home page has no current link. */
  const NAV = [
    { to: '/projects', label: 'Projects', section: '/projects' },
    { to: '/#experience', label: 'Experience', section: undefined },
    { to: '/dotfiles', label: 'Dotfiles', section: '/dotfiles' },
  ];

  function isCurrent(section: string | undefined): boolean {
    return section !== undefined && route.path.startsWith(section);
  }
  const launcher = ref<{ focus: () => void } | null>(null);

  defineExpose({ focusTerminalButton: () => launcher.value?.focus() });
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <NuxtLink
        to="/"
        class="site-brand"
        aria-label="Hamed Niroomand — Home"
      >
        <BrandMark />
        <span>hamed<span class="site-brand__domain"> / niroomand.dev</span></span>
      </NuxtLink>
      <nav
        aria-label="Main navigation"
        class="site-nav"
      >
        <NuxtLink
          v-for="item in NAV"
          :key="item.to"
          :to="item.to"
          :aria-current="isCurrent(item.section) ? 'page' : undefined"
          >{{ item.label }}</NuxtLink
        >
      </nav>
      <div class="site-controls">
        <ThemePicker />
        <TerminalLauncher
          ref="launcher"
          :expanded="terminalOpen"
          @activate="$emit('toggleTerminal')"
        />
      </div>
    </div>
  </header>
</template>
