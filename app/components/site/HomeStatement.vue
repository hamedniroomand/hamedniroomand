<script setup lang="ts">
  /**
   * One sentence in four parts. A small drawing follows a part that names a kind of work.
   * Each word is its own element, so it gets its full colour when it scrolls into view.
   */
  const PARTS = [
    {
      text: 'Seven years of Vue, Nuxt and TypeScript. I build server-rendered apps',
      mark: 'score',
    },
    { text: 'that load fast, design systems', mark: 'layers' },
    { text: 'that whole teams share, and developer tools', mark: 'prompt' },
    { text: 'that catch a mistake before it ships.', mark: undefined },
  ].map(part => ({ words: part.text.split(' '), mark: part.mark }));
</script>

<template>
  <section
    id="about"
    class="home-section statement"
    aria-label="About"
  >
    <p>
      <template
        v-for="(part, partIndex) in PARTS"
        :key="partIndex"
      >
        <span
          v-for="(word, index) in part.words"
          :key="index"
          >{{ word }}{{ ' ' }}</span
        >
        <i
          v-if="part.mark"
          class="statement__mark"
          :class="`statement__mark--${part.mark}`"
          aria-hidden="true"
        />{{ ' ' }}
      </template>
    </p>
  </section>
</template>

<style scoped>
  .statement p {
    margin: 0;
    font: 400 clamp(1.875rem, 1rem + 3.5vw, 4.125rem) / 1.12 var(--font-display);
    letter-spacing: var(--tracking-title);
    text-wrap: pretty;
  }

  /* A small plate in the line of text. Its size follows the type size. */
  .statement__mark {
    --line: color-mix(in srgb, var(--accent-2) 62%, var(--border));
    position: relative;
    display: inline-block;
    width: 1.45em;
    height: 0.78em;
    border: 1px solid var(--line);
    border-radius: 0.12em;
    background: var(--bg-elev);
    vertical-align: -0.04em;
  }
  .statement__mark::before,
  .statement__mark::after {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .statement__mark--score::before {
    content: '97';
    display: grid;
    place-items: center;
    width: 2.4em;
    height: 2.4em;
    border: 0.19em solid var(--accent);
    border-radius: 50%;
    color: var(--accent);
    font: 700 0.24em / 1 var(--font-mono);
    transform: translate(-50%, -50%);
  }

  /* Two isometric sheets, the same projection as the hero figure. */
  .statement__mark--layers::before,
  .statement__mark--layers::after {
    content: '';
    width: 0.5em;
    height: 0.5em;
    border: 1px solid var(--line);
    transform: translate(-50%, -34%) rotateX(57deg) rotateZ(-42deg);
  }
  .statement__mark--layers::after {
    border-color: var(--accent);
    transform: translate(-50%, -66%) rotateX(57deg) rotateZ(-42deg);
  }

  .statement__mark--prompt::before {
    content: '>_';
    color: var(--accent);
    font: 600 0.34em / 1 var(--font-mono);
    transform: translate(-50%, -50%);
  }

  /* Print shows every word in full colour. */
  @media screen and (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .statement span {
        animation: statement-ink linear both;
        animation-timeline: view();
        animation-range: cover 10% cover 36%;
      }
    }
  }

  @keyframes statement-ink {
    /* The light state keeps 3:1 contrast, the minimum for large text. */
    from {
      color: color-mix(in srgb, var(--fg) 52%, var(--bg));
    }
  }
</style>
