<template>
  <VisualFrame
    class="cpm-visual"
    label="Customer Portfolio Management: exchanges, wallets, and brokers connected to one customer portfolio"
    title="cpm / connections"
  >
    <div class="portfolio-map">
      <svg
        class="portfolio-map__connections"
        viewBox="0 0 420 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 100 25 C 185 25 175 80 260 80 M 100 80 C 175 80 190 80 260 80 M 100 135 C 185 135 175 80 260 80"
        />
      </svg>
      <div
        class="portfolio-map__sources"
        aria-hidden="true"
      >
        <span>Exchange</span><span>Wallet</span><span>Broker</span>
      </div>
      <div
        class="portfolio-map__book"
        aria-hidden="true"
      >
        <span class="portfolio-map__label">Customer portfolio</span>
        <div class="portfolio-map__balance"><i /><i /><i /><i /><i /></div>
        <span class="portfolio-map__caption">One connected view</span>
      </div>
    </div>
    <template #bottom><span>Across venues. Together.</span></template>
  </VisualFrame>
</template>

<style scoped>
  .portfolio-map {
    position: relative;
    width: 100%;
    max-width: 420px;
    height: 160px;
    margin: auto;
  }
  .portfolio-map__connections {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    fill: none;
    stroke: var(--visual-line);
    stroke-width: 1.5;
  }
  .portfolio-map__sources {
    position: absolute;
    inset: 5px auto 5px 0;
    width: 26%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .portfolio-map__sources span {
    display: grid;
    place-items: center;
    height: 40px;
    border: 1px solid var(--visual-line);
    border-radius: var(--visual-radius-sm);
    background: var(--visual-surface);
    font-size: var(--text-3xs);
    color: var(--visual-ink);
  }
  .portfolio-map__book {
    position: absolute;
    top: 25px;
    right: 0;
    width: 44%;
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 15px;
    background: var(--visual-surface);
    border: 1px solid var(--visual-line);
    border-radius: var(--visual-radius);
    isolation: isolate;
  }
  .portfolio-map__book::before {
    content: '';
    position: absolute;
    inset: -7px 5px 7px -5px;
    z-index: -1;
    border: 1px solid var(--visual-line);
    border-radius: inherit;
    background: var(--visual-surface);
    transform: rotate(-5deg);
  }
  .portfolio-map__label {
    color: var(--fg);
    font-size: var(--text-3xs);
  }
  .portfolio-map__caption {
    font-size: var(--text-3xs);
    color: var(--visual-ink);
  }
  .portfolio-map__balance {
    display: flex;
    height: 7px;
    gap: 4px;
  }
  .portfolio-map__balance i {
    flex: 1;
    border-radius: 4px;
    background: var(--visual-line);
  }
  .portfolio-map__balance i:first-child {
    flex: 2;
    background: var(--accent);
  }
  .portfolio-map__balance i:nth-child(2) {
    background: color-mix(in srgb, var(--accent) 45%, var(--visual-surface));
  }
  @media (max-width: 420px) {
    .portfolio-map__book {
      padding: 10px;
      width: 47%;
    }
  }
</style>
