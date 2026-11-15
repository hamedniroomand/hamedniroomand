import type { ContactFieldErrors } from '#shared/schemas/contact';

type ContactState = 'idle' | 'sending' | 'sent' | 'error';

const CHECK_LOAD_FAILURE = 'Could not check the message. Try again, or use email instead.';

/** The schema brings its validation library, so it loads when a visitor sends a message. */
function loadSchema() {
  return import('#shared/schemas/contact');
}

export function useContactForm() {
  const form = reactive({ name: '', email: '', message: '', website: '', turnstileToken: '' });
  const state = ref<ContactState>('idle');
  const error = ref('');
  const errors = ref<ContactFieldErrors>({});

  function fail(message: string, fieldErrors: ContactFieldErrors): false {
    state.value = 'error';
    error.value = message;
    errors.value = fieldErrors;
    return false;
  }

  async function submit(): Promise<boolean> {
    error.value = '';
    const schema = await loadSchema().catch(() => null);
    if (!schema) return fail(CHECK_LOAD_FAILURE, {});
    const fieldErrors = schema.contactFieldErrors(form);
    if (Object.keys(fieldErrors).length > 0) return fail('', fieldErrors);
    errors.value = {};
    state.value = 'sending';
    try {
      await $fetch('/api/contact', { method: 'POST', body: form });
      state.value = 'sent';
      return true;
    } catch (err) {
      const feedback = schema.contactFailureFeedback((err as { data?: unknown }).data);
      return fail(feedback.message, feedback.errors);
    }
  }

  return { form, state, error, errors, submit };
}
