export interface TurnstileApi {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    onTurnstileLoad?: () => void;
  }
}

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad';

let loading: Promise<TurnstileApi> | undefined;

/** All widgets share one load. A failed load removes its script, so the next widget tries again. */
export function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise((resolve, reject) => {
    window.onTurnstileLoad = () => {
      if (window.turnstile) resolve(window.turnstile);
    };
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    const fail = (): void => {
      script.remove();
      loading = undefined;
      reject(new Error('turnstile script failed to load'));
    };
    script.addEventListener('error', fail);
    // A blocker can answer with an empty script. It loads, but Turnstile never starts.
    script.addEventListener('load', () => {
      if (!window.turnstile) fail();
    });
    document.head.appendChild(script);
  });
  return loading;
}

export function turnstileTheme(): 'light' | 'dark' | 'auto' {
  const explicit = document.documentElement.dataset.theme;
  if (!explicit) return 'auto';
  return explicit === 'light' ? 'light' : 'dark';
}
