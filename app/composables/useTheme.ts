import type { ThemeName } from '#shared/theme';
import { CRT_EFFECTS_STORAGE_KEY, isThemeName, THEME_STORAGE_KEY } from '#shared/theme';
import type { Point } from '~/utils/view-transition';

export function useTheme() {
  /** The theme the visitor chose. Without a choice, the page follows the system color scheme. */
  const chosen = useState<ThemeName | null>('theme', () => null);
  const initialized = useState('theme-initialized', () => false);
  const scanlines = useState('crt-scanlines', () => true);
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)');

  // Hydrate the server state unchanged, then restore reactive state for interactions.
  // The root attribute already drives colors and picker indicators before first paint.
  onMounted(() => {
    if (initialized.value) return;
    const current = document.documentElement.dataset.theme;
    if (isThemeName(current)) chosen.value = current;
    scanlines.value = document.documentElement.dataset.crtEffects !== 'off';
    initialized.value = true;
  });

  const theme = computed<ThemeName>(() => chosen.value ?? (prefersLight.value ? 'light' : 'dark'));

  function set(name: ThemeName | null, origin?: Point): void {
    chosen.value = name;
    if (!import.meta.client) return;
    revealTheme(() => {
      if (name) document.documentElement.dataset.theme = name;
      else delete document.documentElement.dataset.theme;
    }, origin);
    if (name) writeStorage(THEME_STORAGE_KEY, name);
    else {
      try {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } catch {
        // System mode still works when browser storage is unavailable.
      }
    }
  }

  function setScanlines(enabled: boolean): void {
    scanlines.value = enabled;
    if (!import.meta.client) return;
    document.documentElement.dataset.crtEffects = enabled ? 'on' : 'off';
    writeStorage(CRT_EFFECTS_STORAGE_KEY, enabled ? 'on' : 'off');
  }

  return {
    theme,
    chosen: readonly(chosen),
    ready: readonly(initialized),
    set,
    scanlines: readonly(scanlines),
    setScanlines,
  };
}
