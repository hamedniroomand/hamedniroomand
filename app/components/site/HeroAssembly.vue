<script setup lang="ts">
  const OPTIONS = ['A', 'B', 'C', 'D'];
  const CORRECT_OPTION = 'C';

  const figure = ref<HTMLElement | null>(null);
  usePointerParallax(figure);
  useScrollSpread(figure);
</script>

<template>
  <figure
    ref="figure"
    class="assembly"
  >
    <div
      class="assembly__scene"
      aria-hidden="true"
    >
      <div
        class="layer"
        style="--i: 0"
      >
        <div class="plate plate--layout" />
        <p class="layer__label"><b>Layout</b><span>12 columns, 8 px rhythm</span></p>
      </div>
      <div
        class="layer"
        style="--i: 1"
      >
        <div class="plate plate--structure"><i /><i /><i /><i /></div>
        <p class="layer__label"><b>Structure</b><span>semantic, keyboard first</span></p>
      </div>
      <div
        class="layer"
        style="--i: 2"
      >
        <div class="plate plate--interface">
          <div class="ui-bar"><i /><span /><span /></div>
          <div class="ui-question"><span /><span /></div>
          <ul class="ui-options">
            <li
              v-for="option in OPTIONS"
              :key="option"
              :class="{ 'is-correct': option === CORRECT_OPTION }"
            >
              <b>{{ option }}</b><span />
            </li>
          </ul>
        </div>
        <p class="layer__label"><b>Interface</b><span>Vue, Nuxt, TypeScript</span></p>
      </div>
      <div
        class="layer"
        style="--i: 3"
      >
        <div class="plate plate--measured">
          <span class="dimension dimension--width">340</span>
          <span class="dimension dimension--height">236</span>
          <span class="score">97</span>
        </div>
        <p class="layer__label"><b>Measured</b><span>Lighthouse, 36 to 97</span></p>
      </div>
    </div>
    <figcaption>An interface, taken apart.</figcaption>
  </figure>
</template>

<style scoped>
  /* The page load drives this number. A registered property lets a keyframe change it. */
  @property --open {
    syntax: '<number>';
    inherits: true;
    initial-value: 1;
  }

  .assembly {
    --px: 0;
    --py: 0;
    --spread: 1;
    /* A browser without registered properties still needs a value. */
    --open: 1;
    container-type: inline-size;
    width: 100%;
    max-width: 580px;
  }

  /* The scene is drawn on a 600 by 420 grid. One unit is 1/600 of the width of the figure. */
  .assembly__scene {
    --u: calc(100cqw / 600);
    --gap: calc(62 * var(--u) * var(--spread) * var(--open));
    --line: color-mix(in srgb, var(--accent-2) 62%, var(--border));
    --sheet: color-mix(in srgb, var(--bg-elev) 82%, transparent);
    position: relative;
    aspect-ratio: 600 / 420;
  }

  .layer {
    position: absolute;
    inset: 0;
    transform: translate(
      calc(var(--px) * var(--i) * 5 * var(--u)),
      calc(var(--gap) * var(--i) * -0.839 + var(--py) * var(--i) * 4 * var(--u))
    );
  }

  /* No perspective: the two rotations give an isometric projection. */
  .plate {
    position: absolute;
    left: calc(54 * var(--u));
    top: calc(172 * var(--u));
    width: calc(340 * var(--u));
    height: calc(236 * var(--u));
    border: 1px solid var(--line);
    border-radius: calc(6 * var(--u));
    background: var(--sheet);
    transform: rotateX(57deg) rotateZ(-42deg);
  }

  .plate--layout {
    background-image: repeating-linear-gradient(
      90deg,
      color-mix(in srgb, var(--line) 55%, transparent) 0 1px,
      transparent 1px calc(100% / 12)
    );
  }

  .plate--structure {
    display: grid;
    grid-template: 15% 1fr 1fr / 30% 1fr;
    gap: calc(8 * var(--u));
    padding: calc(12 * var(--u));
  }
  .plate--structure i {
    border: 1px dashed var(--line);
    border-radius: calc(3 * var(--u));
  }
  .plate--structure i:first-child {
    grid-column: 1 / -1;
  }
  .plate--structure i:nth-child(2) {
    grid-row: 2 / -1;
  }

  .plate--interface {
    display: grid;
    align-content: space-between;
    padding: calc(14 * var(--u)) calc(18 * var(--u));
    border-color: color-mix(in srgb, var(--fg) 45%, var(--line));
    background: var(--bg-elev);
    box-shadow: var(--shadow);
  }
  .ui-bar,
  .ui-question,
  .ui-options li {
    display: flex;
    align-items: center;
    gap: calc(8 * var(--u));
  }
  .ui-bar i {
    width: calc(11 * var(--u));
    height: calc(11 * var(--u));
    border-radius: 50%;
    background: var(--accent);
  }
  .ui-bar span,
  .ui-question span,
  .ui-options span {
    height: calc(6 * var(--u));
    border-radius: 99px;
    background: color-mix(in srgb, var(--fg-dim) 45%, transparent);
  }
  .ui-bar span {
    width: 22%;
  }
  .ui-bar span:last-child {
    width: 12%;
    margin-left: auto;
  }
  .ui-question {
    flex-direction: column;
    align-items: stretch;
  }
  .ui-question span {
    background: color-mix(in srgb, var(--fg) 70%, transparent);
  }
  .ui-question span:last-child {
    width: 64%;
  }
  .ui-options {
    display: grid;
    gap: calc(7 * var(--u));
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .ui-options li {
    padding: calc(5 * var(--u)) calc(8 * var(--u));
    border: 1px solid var(--border);
    border-radius: calc(4 * var(--u));
  }
  .ui-options b {
    font: 600 calc(10 * var(--u)) / 1 var(--font-mono);
    color: var(--fg-dim);
  }
  .ui-options span {
    flex: 1;
  }
  .ui-options .is-correct {
    border-color: var(--accent);
    background: color-mix(in srgb, var(--accent) 14%, transparent);
  }
  .ui-options .is-correct b {
    color: var(--accent);
  }

  .plate--measured {
    border: 1px dashed var(--accent);
    background: none;
    color: var(--accent);
    font: calc(15 * var(--u)) / 1 var(--font-mono);
  }
  /* A dimension line: a tick at each end and the number in the middle. */
  .dimension {
    position: absolute;
    display: flex;
    align-items: center;
    gap: calc(8 * var(--u));
    height: calc(12 * var(--u));
    border-inline: 1px solid currentcolor;
  }
  .dimension::before,
  .dimension::after {
    content: '';
    flex: 1;
    border-top: 1px solid currentcolor;
  }
  .dimension--width {
    left: 0;
    right: 0;
    top: calc(-30 * var(--u));
  }
  .dimension--height {
    left: 100%;
    top: 0;
    width: calc(236 * var(--u));
    transform-origin: top left;
    transform: translateX(calc(30 * var(--u))) rotate(90deg);
  }
  .score {
    position: absolute;
    right: calc(20 * var(--u));
    bottom: calc(18 * var(--u));
    display: grid;
    place-items: center;
    width: calc(78 * var(--u));
    height: calc(78 * var(--u));
    border: calc(5 * var(--u)) solid currentcolor;
    border-radius: 50%;
    background: var(--bg);
    font-size: calc(30 * var(--u));
    font-weight: 700;
  }

  .layer__label {
    position: absolute;
    left: calc(446 * var(--u));
    top: calc(262 * var(--u));
    display: grid;
    gap: calc(3 * var(--u));
    margin: 0;
    padding-left: calc(30 * var(--u));
    white-space: nowrap;
    opacity: clamp(0, calc((var(--spread) * var(--open) - 0.5) * 4), 1);
  }
  .layer__label::before {
    content: '';
    position: absolute;
    left: 0;
    top: calc(11 * var(--u));
    width: calc(22 * var(--u));
    border-top: 1px solid var(--line);
  }
  .layer__label b {
    font: italic 400 calc(19 * var(--u)) / 1.1 var(--font-display);
    color: var(--fg);
  }
  .layer__label span {
    font-size: calc(11 * var(--u));
    color: var(--fg-dim);
  }

  figcaption {
    margin-top: var(--space-3);
    font: italic var(--text-md) / 1.4 var(--font-display);
    color: var(--fg-dim);
  }

  @media (prefers-reduced-motion: no-preference) {
    .layer {
      transition: transform 400ms var(--ease-out);
    }
    .assembly__scene {
      animation: assembly-open 1200ms var(--ease-out) 150ms backwards;
    }
  }

  /* A page that is printed after a scroll still shows the layers apart. */
  @media print {
    .assembly {
      --spread: 1 !important;
    }
  }

  @keyframes assembly-open {
    from {
      --open: 0;
    }
  }
</style>
