<template>
  <svg
    class="brand-mark"
    viewBox="7 -18 760 760"
    aria-hidden="true"
    focusable="false"
  >
    <!-- The outlines of "h" and "." from the display typeface. Font units have y up. -->
    <g transform="matrix(1 0 0 -1 0 712)">
      <path
        d="M28 24H84Q96 24 101 29Q106 34 106 46V666Q106 678 101 683Q96 688 84 688H28V712H178V374L182 373Q205 421 239 444.5Q273 468 314 468Q387 468 417.5 423Q448 378 448 315V46Q448 34 453 29Q458 24 470 24H512V0H312V24H354Q366 24 371 29Q376 34 376 46V334Q376 378 358.5 409Q341 440 299 440Q264 440 236.5 415.5Q209 391 193.5 348.5Q178 306 178 254V46Q178 34 183 29Q188 24 200 24H242V0H28Z"
      />
      <path
        class="brand-mark__period"
        d="M622 50Q622 77 639.5 94.5Q657 112 684 112Q711 112 728.5 94.5Q746 77 746 50Q746 23 728.5 5.5Q711 -12 684 -12Q657 -12 639.5 5.5Q622 23 622 50Z"
      />
    </g>
  </svg>
</template>

<style scoped>
  .brand-mark {
    flex-shrink: 0;
    fill: currentcolor;
  }

  .brand-mark__period {
    fill: var(--accent);
  }
</style>
