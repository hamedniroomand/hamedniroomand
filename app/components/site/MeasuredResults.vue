<script setup lang="ts">
  interface Result {
    metric: string;
    before: number;
    after: number;
    /** The value at the right end of the scale. */
    scale: number;
    format: (value: number) => string;
  }

  const plain = (value: number): string => String(value);

  /** Lighthouse results for MCAT Books at Jack Westin, before and after its move to Nuxt 4. */
  const RESULTS: Result[] = [
    { metric: 'Performance score', before: 36, after: 97, scale: 100, format: plain },
    {
      metric: 'Largest Contentful Paint',
      before: 8.5,
      after: 1,
      scale: 8.5,
      format: value => `${value.toFixed(1)} s`,
    },
    {
      metric: 'Total Blocking Time',
      before: 1570,
      after: 30,
      scale: 1570,
      format: value => `${value.toLocaleString('en-US')} ms`,
    },
    { metric: 'Accessibility score', before: 91, after: 100, scale: 100, format: plain },
  ];

  function share(value: number, scale: number): string {
    return `${(value / scale) * 100}%`;
  }
</script>

<template>
  <section
    id="results"
    class="home-section"
    aria-labelledby="results-title"
  >
    <div class="section-heading">
      <h2 id="results-title">Measured results</h2>
      <p>
        MCAT Books at Jack Westin, before and after its move from Nuxt 2 to Nuxt 4, where I reworked
        data fetching, code splitting and image loading for server rendering. Both apps stayed live,
        with no downtime. Numbers from Lighthouse.
      </p>
    </div>
    <dl class="results">
      <div
        v-for="result in RESULTS"
        :key="result.metric"
        class="result"
      >
        <dt>{{ result.metric }}</dt>
        <dd>
          <span class="result__values">
            <span class="result__before"
              ><span class="visually-hidden">Before: </span>{{ result.format(result.before) }}</span
            >
            <span class="result__after"
              ><span class="visually-hidden">After: </span>{{ result.format(result.after) }}</span
            >
          </span>
          <span
            class="result__scale"
            aria-hidden="true"
          >
            <i :style="{ width: share(result.before, result.scale) }" />
            <i :style="{ width: share(result.after, result.scale) }" />
          </span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
  .results {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 32px;
    margin: 0;
  }
  .result dt {
    color: var(--fg-dim);
    font-size: var(--text-sm);
  }
  .result dd {
    margin: 10px 0 0;
  }
  .result__values {
    display: flex;
    align-items: baseline;
    gap: 14px;
    font-family: var(--font-display);
    font-variant-numeric: lining-nums;
    white-space: nowrap;
  }
  .result__before {
    position: relative;
    color: var(--fg-dim);
    font-size: 1.5rem;
  }

  /* A struck line shows that the first value is the old one. */
  .result__before::after {
    content: '';
    position: absolute;
    inset: 52% -3px auto;
    border-top: 1px solid var(--accent);
    transform: rotate(-8deg);
  }
  .result__after {
    font-size: clamp(2.5rem, 1.6rem + 2.4vw, 3.75rem);
    line-height: 1;
    letter-spacing: var(--tracking-title);
  }

  /* Two bars on one scale: the old value above, the new value below. */
  .result__scale {
    display: grid;
    gap: 5px;
    margin-top: 16px;
    padding: 6px 0;
    border-left: 1px solid var(--fg-dim);
    background: linear-gradient(var(--border), var(--border)) left bottom / 100% 1px no-repeat;
  }
  .result__scale i {
    height: 5px;
    min-width: 3px;
    background: color-mix(in srgb, var(--fg-dim) 55%, transparent);
  }
  .result__scale i:last-child {
    background: var(--accent);
  }

  @media (max-width: 1279px) {
    .results {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 36px 28px;
    }
  }
  @media (max-width: 539px) {
    .results {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
