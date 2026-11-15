import type { Ref } from 'vue';

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

/**
 * Writes the pointer position to `--px` and `--py` on the target, each from -1 to 1.
 * A touch screen and a reduced-motion setting leave both at their CSS default.
 */
export function usePointerParallax(target: Ref<HTMLElement | null>): void {
  const reducedMotion = useReducedMotion();
  let frame = 0;

  function onMove(event: PointerEvent): void {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      target.value?.style.setProperty('--px', String((event.clientX / innerWidth) * 2 - 1));
      target.value?.style.setProperty('--py', String((event.clientY / innerHeight) * 2 - 1));
    });
  }

  onMounted(() => {
    if (reducedMotion.value || !matchMedia(FINE_POINTER_QUERY).matches) return;
    addEventListener('pointermove', onMove, { passive: true });
  });
  onBeforeUnmount(() => {
    removeEventListener('pointermove', onMove);
    cancelAnimationFrame(frame);
  });
}
