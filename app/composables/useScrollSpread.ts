import type { Ref } from 'vue';

/** The layers start to close when the top of the target goes above this part of the viewport. */
const START_LINE = 0.45;
/** The layers are closed after the target moves up by this part of the viewport height. */
const CLOSE_DISTANCE = 0.3;
/** A tall viewport does not make the distance longer than this, or the target leaves the screen first. */
const MAX_CLOSE_DISTANCE = 260;
const CLOSED_SPREAD = 0.08;

/** Writes `--spread` on the target: 1 while it is low in the viewport, less as it scrolls away. */
export function useScrollSpread(target: Ref<HTMLElement | null>): void {
  const reducedMotion = useReducedMotion();
  let frame = 0;

  function update(): void {
    if (!target.value) return;
    const top = target.value.getBoundingClientRect().top;
    // A target that starts above the line starts to close with the first scroll.
    const line = Math.min(top + scrollY, innerHeight * START_LINE);
    const distance = Math.min(innerHeight * CLOSE_DISTANCE, MAX_CLOSE_DISTANCE);
    const progress = Math.min(Math.max((line - top) / distance, 0), 1);
    target.value.style.setProperty('--spread', String(1 - progress * (1 - CLOSED_SPREAD)));
  }

  function onScroll(): void {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }

  onMounted(() => {
    if (reducedMotion.value) return;
    addEventListener('scroll', onScroll, { passive: true });
    update();
  });
  onBeforeUnmount(() => {
    removeEventListener('scroll', onScroll);
    cancelAnimationFrame(frame);
  });
}
