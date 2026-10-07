/** A browser with view transitions does not also run the Vue page transition. */
export default defineNuxtRouteMiddleware(to => {
  if (import.meta.client && canTransitionViews()) to.meta.pageTransition = false;
});
