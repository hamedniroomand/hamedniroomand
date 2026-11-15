import type { AppCommand } from '~/tui/types';

export default {
  name: 'pdf',
  aliases: ['export'],
  description: 'Download the PDF résumé',
  run: (_argv, ctx) => ctx.shell('cv --pdf'),
} satisfies AppCommand;
