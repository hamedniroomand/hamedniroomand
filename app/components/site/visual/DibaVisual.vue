<script setup lang="ts">
  const TABS = [
    { label: 'Artwork', active: false },
    { label: 'In the room', active: false },
    { label: 'Real scale', active: true },
  ];
  const DETAILS = [
    { label: 'Medium', value: 'Acrylic on canvas' },
    { label: 'Dimensions', value: '70 × 100 cm' },
  ];
</script>

<template>
  <VisualFrame
    class="diba-visual"
    label="Illustration of a Diba Art Studio product page: a painting drawn to scale next to a 170 cm person, beside its title and an add to cart button"
    title="diba / product"
    note="Shopify theme"
  >
    <div class="artwork">
      <ul class="artwork__tabs">
        <li
          v-for="tab in TABS"
          :key="tab.label"
          :class="{ 'artwork__tab--active': tab.active }"
        >
          {{ tab.label }}
        </li>
      </ul>
      <svg
        class="artwork__scale"
        viewBox="0 0 130 118"
        width="130"
        height="118"
        aria-hidden="true"
      >
        <path
          class="artwork__floor"
          d="M19 114.5H113"
        />
        <g class="artwork__person">
          <circle
            cx="37"
            cy="11"
            r="7"
          />
          <rect
            x="28"
            y="21"
            width="18"
            height="44"
            rx="6"
          />
          <rect
            x="29"
            y="62"
            width="7"
            height="52"
            rx="3"
          />
          <rect
            x="38"
            y="62"
            width="7"
            height="52"
            rx="3"
          />
        </g>
        <rect
          class="artwork__canvas"
          x="63.5"
          y="4.5"
          width="45"
          height="65"
        />
        <path
          class="artwork__ground"
          d="M64 44C75 38 93 50 108 42V69H64Z"
        />
        <path
          class="artwork__stroke"
          d="M71 26C81 14 93 34 101 20"
        />
        <path
          class="artwork__measure"
          d="M16 4V114M13 4H19M13 114H19M114 4.5V69.5M111 4.5H117M111 69.5H117M63.5 77H108.5M63.5 74V80M108.5 74V80"
        />
        <text
          x="8"
          y="59"
          transform="rotate(-90 8 59)"
        >
          170 cm
        </text>
        <text
          x="122"
          y="37"
          transform="rotate(-90 122 37)"
        >
          100 cm
        </text>
        <text
          x="86"
          y="90"
        >
          70 cm
        </text>
      </svg>
      <div class="artwork__buy">
        <span class="artwork__eyebrow">Original artwork</span>
        <p class="artwork__title">Untitled</p>
        <span class="artwork__button">Add to cart</span>
        <dl class="artwork__details">
          <div
            v-for="detail in DETAILS"
            :key="detail.label"
          >
            <dt>{{ detail.label }}</dt>
            <dd>{{ detail.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
    <template #bottom><span>Shown next to a 170 cm person</span></template>
  </VisualFrame>
</template>

<style scoped>
  .diba-visual {
    container-type: inline-size;
  }
  .artwork {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 10px 20px;
    width: 100%;
    max-width: 400px;
    margin: auto;
    color: var(--fg);
    font-size: var(--text-3xs);
    line-height: 1.3;
  }
  .artwork__tabs {
    grid-column: 1 / -1;
    display: flex;
    gap: 12px;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid var(--visual-line);
    list-style: none;
    color: var(--fg-dim);
    white-space: nowrap;
  }
  .artwork__tabs li {
    padding-bottom: 4px;
  }
  .artwork__tab--active {
    box-shadow: 0 1px 0 var(--accent);
    color: var(--fg);
  }
  .artwork__scale {
    display: block;
  }
  .artwork__floor,
  .artwork__measure {
    fill: none;
    stroke: var(--visual-ink);
  }
  .artwork__measure {
    stroke-width: 0.75;
  }
  .artwork__person {
    fill: color-mix(in srgb, var(--visual-ink) 55%, var(--visual-surface));
  }
  .artwork__ground {
    fill: var(--visual-line);
  }
  .artwork__canvas {
    fill: var(--visual-surface);
    stroke: var(--visual-ink);
  }
  .artwork__stroke {
    fill: none;
    stroke: var(--accent);
    stroke-width: 2;
    stroke-linecap: round;
  }
  text {
    fill: var(--visual-ink);
    text-anchor: middle;
    dominant-baseline: middle;
  }
  .artwork__buy {
    display: grid;
    justify-items: start;
    gap: 4px;
    min-width: 0;
  }
  .artwork__eyebrow {
    color: var(--fg-dim);
  }
  p {
    margin: 0;
  }
  .artwork__title {
    color: var(--fg);
    font-size: var(--text-sm);
  }
  .artwork__button {
    margin-top: 4px;
    padding: 4px 10px;
    border-radius: var(--visual-radius-sm);
    background: var(--accent);
    color: var(--visual-surface);
  }
  .artwork__details {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 2px 12px;
    margin: 4px 0 0;
    color: var(--fg-dim);
  }
  .artwork__details div {
    display: contents;
  }
  dd {
    margin: 0;
    color: var(--fg);
  }
  @container (max-width: 360px) {
    .artwork {
      column-gap: 10px;
    }
    .artwork__eyebrow,
    .artwork__details {
      display: none;
    }
  }
</style>
