<script setup lang="ts">
  import { githubUrl, linkLabel, mailtoUrl } from '#shared/cv/links';

  const LABELS = { name: 'Name', email: 'Email', message: 'Message' } as const;

  const { links, location, remote } = useCv().profile;
  const github = githubUrl(links.github);
  const place = [location.city, location.tz, remote ? 'Remote' : undefined]
    .filter(Boolean)
    .join(' · ');

  const { form, state, error, errors, submit } = useContactForm();
  const { copy, copied } = useClipboard();
  const copyFailed = ref(false);
  const copyStatus = computed(() => {
    if (copied.value) return 'Email address copied.';
    return copyFailed.value ? 'Could not copy. Select the address instead.' : '';
  });
  const siteKey = useRuntimeConfig().public.turnstile.siteKey;
  /** Turnstile loads a third-party script, so the widget waits until a visitor starts to write. */
  const started = ref(false);
  const checkFailed = ref(false);
  const formEl = ref<HTMLFormElement | null>(null);
  const sentEl = ref<HTMLElement | null>(null);
  const widget = ref<{ reset: () => void } | null>(null);
  const verified = computed(() => !siteKey || form.turnstileToken !== '');
  const sending = computed(() => state.value === 'sending');

  async function copyEmail(): Promise<void> {
    copyFailed.value = !(await copy(links.email));
  }

  async function onSubmit(): Promise<void> {
    const sent = await submit();
    await nextTick();
    if (sent) {
      sentEl.value?.focus();
      return;
    }
    widget.value?.reset();
    focusContactError(formEl.value);
  }
</script>

<template>
  <section
    id="contact"
    class="contact-section"
    aria-labelledby="contact-section-title"
  >
    <div class="contact-intro">
      <p class="eyebrow">Contact</p>
      <h2 id="contact-section-title">Say hello.</h2>
      <p>
        Hiring, a project, or a question about one of my tools. Send a message here, or use email or
        LinkedIn.
      </p>
      <dl class="contact-details">
        <div>
          <dt>Email</dt>
          <dd>
            <a :href="mailtoUrl(links.email)">{{ links.email }}</a>
            <button
              type="button"
              class="contact-copy"
              @click="copyEmail"
            >
              {{ copied ? 'Copied' : 'Copy' }}<span class="visually-hidden"> email address</span>
            </button>
            <span
              class="visually-hidden"
              aria-live="polite"
              >{{ copyStatus }}</span
            >
          </dd>
        </div>
        <div>
          <dt>LinkedIn</dt>
          <dd>
            <a
              :href="links.linkedin"
              target="_blank"
              rel="noopener"
              >{{ linkLabel(links.linkedin) }}</a
            >
          </dd>
        </div>
        <div>
          <dt>GitHub</dt>
          <dd>
            <a
              :href="github"
              target="_blank"
              rel="noopener"
              >{{ linkLabel(github) }}</a
            >
          </dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{{ place }}</dd>
        </div>
      </dl>
    </div>
    <form
      ref="formEl"
      class="contact-form"
      novalidate
      @focusin="started = true"
      @submit.prevent="onSubmit"
    >
      <template v-if="state !== 'sent'">
        <ContactField
          v-for="field in CONTACT_FIELDS"
          :key="field.name"
          v-model="form[field.name]"
          v-bind="field.attrs"
          :name="field.name"
          :label="LABELS[field.name]"
          :multiline="field.multiline"
          :error="errors[field.name]"
          stacked
        />
        <input
          v-model="form.website"
          class="visually-hidden"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        />
        <TurnstileWidget
          v-if="siteKey && started"
          ref="widget"
          v-model="form.turnstileToken"
          :site-key="siteKey"
          @failed="checkFailed = $event"
        />
        <p
          v-if="error"
          class="contact-form__error"
          role="alert"
          tabindex="-1"
        >
          {{ error }}
        </p>
        <button
          type="submit"
          class="btn"
          :disabled="sending || !verified"
        >
          {{ sending ? 'Sending…' : 'Send message' }}
        </button>
        <p
          v-if="checkFailed"
          class="contact-form__error"
          role="alert"
          tabindex="-1"
        >
          The spam check failed. Email me at {{ links.email }} instead.
        </p>
      </template>
      <p
        v-else
        ref="sentEl"
        class="contact-form__ok"
        role="status"
        tabindex="-1"
      >
        Thanks, your message is on its way. I will reply by email.
      </p>
    </form>
  </section>
</template>
