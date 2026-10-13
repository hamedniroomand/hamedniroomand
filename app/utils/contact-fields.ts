import type { ContactField } from '#shared/schemas/contact';

export interface ContactFieldSpec {
  name: Extract<ContactField, 'name' | 'email' | 'message'>;
  multiline?: boolean;
  attrs: Record<string, string | number | boolean>;
}

export const CONTACT_FIELDS: readonly ContactFieldSpec[] = [
  { name: 'name', attrs: { type: 'text', required: true, maxlength: 100, autocomplete: 'name' } },
  {
    name: 'email',
    attrs: { type: 'email', required: true, maxlength: 200, autocomplete: 'email' },
  },
  {
    name: 'message',
    multiline: true,
    attrs: { required: true, minlength: 10, maxlength: 5000, rows: 5 },
  },
];

/**
 * Moves the focus to the first field that failed validation, or else to the form error.
 * A screen reader then names the problem, and the keyboard user keeps a place in the form.
 */
export function focusContactError(root: HTMLElement | null): void {
  root?.querySelector<HTMLElement>('[aria-invalid="true"], [role="alert"]')?.focus();
}
