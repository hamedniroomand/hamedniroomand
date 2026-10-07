<script setup lang="ts">
  const sample =
    '{"project":"KitDev Space","runsIn":"your browser","tools":["JSON","SQLite","color"],"uploads":false}';
  const input = ref(sample);
  const output = ref('');
  const error = ref('');
  const copyError = ref('');
  const { copy, copied } = useClipboard();

  function format(compact = false): void {
    error.value = '';
    copyError.value = '';
    output.value = '';
    if (!input.value.trim()) {
      error.value = 'Add some JSON first, or load the sample.';
      return;
    }
    if (input.value.length > 100_000) {
      error.value =
        'This small preview accepts up to 100,000 characters. Open KitDev for larger work.';
      return;
    }
    try {
      const parsed: unknown = JSON.parse(input.value);
      output.value = JSON.stringify(parsed, null, compact ? undefined : 2);
    } catch {
      error.value = 'That JSON could not be parsed. Check quotation marks, commas, and brackets.';
    }
  }

  function loadSample(): void {
    input.value = sample;
    format();
  }

  async function copyOutput(): Promise<void> {
    copyError.value = (await copy(output.value))
      ? ''
      : 'Copy is unavailable. Select the result to copy it manually.';
  }

  watch(
    input,
    () => {
      output.value = '';
      error.value = '';
      copyError.value = '';
    },
    { flush: 'sync' },
  );
  format();
</script>

<template>
  <section
    class="json-workbench"
    aria-labelledby="json-workbench-title"
  >
    <div class="json-workbench__intro">
      <div>
        <p class="eyebrow">A small working sample</p>
        <h2 id="json-workbench-title">Give it some JSON.</h2>
      </div>
      <p>Format or compact it here. Your text stays in this browser.</p>
    </div>
    <form @submit.prevent="format()">
      <div class="json-workbench__editors">
        <div>
          <label for="json-input">Input</label>
          <textarea
            id="json-input"
            v-model="input"
            spellcheck="false"
            autocapitalize="off"
            :aria-invalid="!!error"
            :aria-describedby="error ? 'json-error' : undefined"
          />
        </div>
        <div>
          <label for="json-output">Result</label>
          <textarea
            id="json-output"
            :value="output"
            readonly
            spellcheck="false"
            placeholder="Your formatted JSON will appear here."
          />
        </div>
      </div>
      <div class="json-workbench__actions">
        <button
          class="btn"
          type="submit"
        >
          Format JSON
        </button>
        <button
          class="btn btn-ghost"
          type="button"
          @click="format(true)"
        >
          Compact
        </button>
        <button
          class="json-workbench__sample"
          type="button"
          @click="loadSample"
        >
          Load sample
        </button>
        <button
          class="btn btn-ghost json-workbench__copy"
          type="button"
          :disabled="!output"
          @click="copyOutput"
        >
          {{ copied ? 'Copied' : 'Copy result' }}
        </button>
      </div>
      <p
        v-if="error"
        id="json-error"
        class="json-workbench__error"
        role="alert"
      >
        {{ error }}
      </p>
      <p
        class="json-workbench__feedback"
        role="status"
      >
        {{ copyError || (copied ? 'Result copied to clipboard.' : '') }}
      </p>
    </form>
  </section>
</template>

<style scoped>
  .json-workbench {
    margin-top: var(--space-12);
    padding: clamp(20px, 3vw, 36px);
    background: var(--surface-raised);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
  }
  .json-workbench__intro {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: var(--space-6);
    margin-bottom: var(--space-6);
  }
  h2 {
    margin: 0;
    font-size: var(--display-sm);
    letter-spacing: var(--tracking-title);
    font-weight: 550;
  }
  .json-workbench__intro > p {
    max-width: 32ch;
    margin: 0;
    color: var(--text-muted);
    font-size: var(--text-sm);
    line-height: 1.7;
  }
  .json-workbench__editors {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--space-4);
  }
  label {
    display: block;
    margin-bottom: var(--space-2);
    color: var(--text-muted);
    font: var(--text-xs) var(--font-mono);
  }
  textarea {
    display: block;
    width: 100%;
    min-height: 240px;
    padding: var(--space-4);
    resize: vertical;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius);
    background: var(--surface-page);
    color: var(--text-primary);
    font: var(--text-sm)/1.7 var(--font-mono);
  }
  textarea[aria-invalid='true'] {
    border-color: var(--error);
  }
  textarea::placeholder {
    color: var(--text-muted);
  }
  .json-workbench__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-4);
  }
  .json-workbench__sample {
    padding: 12px 4px;
    border: 0;
    background: transparent;
    color: var(--text-muted);
    font: var(--text-xs) var(--font-mono);
    cursor: pointer;
  }
  .json-workbench__sample:hover {
    color: var(--text-primary);
  }
  .json-workbench__copy {
    margin-left: auto;
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
    transform: none;
  }
  .json-workbench__error {
    color: var(--error);
    font-size: var(--text-sm);
    line-height: 1.6;
  }
  .json-workbench__feedback {
    min-height: 1.5em;
    margin: var(--space-3) 0 0;
    color: var(--text-muted);
    font-size: var(--text-xs);
  }
  @media (max-width: 700px) {
    .json-workbench__intro {
      flex-direction: column;
      align-items: start;
    }
    .json-workbench__editors {
      grid-template-columns: minmax(0, 1fr);
    }
    textarea {
      min-height: 190px;
    }
    .json-workbench__copy {
      margin-left: 0;
    }
  }
</style>
