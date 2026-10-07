<template>
  <svg
    class="brand-mark"
    viewBox="11 9 42 42"
    aria-hidden="true"
    focusable="false"
  >
    <path
      class="brand-mark__letter"
      d="M18.5 13.5 V48 M18.5 28 C18.5 23 22 20.3 26.5 20.3 C31 20.3 34.5 23 34.5 28.6 V48"
    />
    <rect
      class="brand-mark__cursor"
      x="41"
      y="40.5"
      width="7.5"
      height="7.5"
      rx="2"
    />
  </svg>
</template>

<style scoped>
  .brand-mark {
    flex-shrink: 0;
    overflow: visible;
  }

  .brand-mark__letter {
    fill: none;
    stroke: currentcolor;
    stroke-width: 7;
    stroke-linejoin: round;
  }

  .brand-mark__cursor {
    fill: var(--brand-cursor, var(--accent));
  }
</style>
