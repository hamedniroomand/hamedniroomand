export interface Point {
  x: number;
  y: number;
}

export function canTransitionViews(): boolean {
  return (
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Applies a theme change as a circle that grows from the origin point. */
export function revealTheme(apply: () => void, origin?: Point): void {
  if (!canTransitionViews()) {
    apply();
    return;
  }
  const root = document.documentElement;
  root.style.setProperty('--reveal-x', origin ? `${origin.x}px` : '100%');
  root.style.setProperty('--reveal-y', origin ? `${origin.y}px` : '0px');
  root.dataset.transition = 'theme';
  const clear = (): void => {
    delete root.dataset.transition;
  };
  const transition = document.startViewTransition(apply);
  // The browser skips the animation when the tab is hidden. The theme still changes.
  void transition.ready.catch(clear);
  void transition.finished.then(clear, clear);
}

/** The shared name that moves a project picture from its card to its page. */
export function projectViewStyle(slug: string): { viewTransitionName: string } {
  return { viewTransitionName: `project-${slug}` };
}
