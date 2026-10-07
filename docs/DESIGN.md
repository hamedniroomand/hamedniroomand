# Design system: niroomand.dev

The site is a personal developer workshop: warm charcoal, paper-white type, a gold
accent, and useful software. The terminal, real product previews, and working samples
express the identity. This is a refinement of the existing Nuxt/Vue site, using native
CSS and browser view transitions. No animation or component library is required.

## Foundation

`app/assets/css/tokens.css` owns typography, spacing, radii, layers, and motion.
`app/assets/css/themes.css` owns palettes. Components can use the legacy palette
names or their semantic aliases:

| Role               | Token                  |
| ------------------ | ---------------------- |
| Page surface       | `--surface-page`       |
| Raised surface     | `--surface-raised`     |
| Hover surface      | `--surface-hover`      |
| Primary text       | `--text-primary`       |
| Secondary text     | `--text-muted`         |
| Quiet border       | `--border-subtle`      |
| Interactive border | `--border-interactive` |
| Focus indicator    | `--focus-ring`         |

Aliases resolve to the active palette, including the device color scheme. Status
colors belong to meaningful feedback. Gold identifies interactive and featured
content. Avoid adding decorative accent colors.

## Themes

System, Dark, and Light are the primary appearance choices. Without a saved choice,
the site follows the device. Choosing System removes the stored override and keeps
responding to device changes. Invalid saved values are ignored before first paint.

Dark is warm charcoal (`#151615`), paper white (`#eeeae2`), and gold (`#dcb66d`).
Light is warm paper (`#f6f5f2`), ink (`#1c1f26`), and ochre (`#8a5a00`). Light has
quiet texture and no colored ambient pools; it should feel like paper rather than a
brightened dark theme.

Gruvbox, Dracula, and CRT are grouped as Extras. CRT is a color palette with an
independent, persisted Scanlines checkbox. Scanlines are static, never flicker, and
are removed with reduced motion. Disabling them keeps the CRT palette.

## Typography and layout

Geist Variable is the reading and display face. JetBrains Mono Variable is for
commands, paths, controls, and short metadata. Both are self-hosted and preloaded.
Body text is 15–16px, important metadata at least 12px. Tiny illustration labels can
be 11px. Display text uses weight 550–560 and negative tracking. Keep reading lines
around 45–65 characters. Headings balance and paragraphs wrap prettily.

The content width is 1160px with fluid gutters. The hero is left aligned, names Hamed,
and describes developer tools, signal processing, and financial workflows. A quiet
brand mark balances the right side on large screens.

Cue is the featured project: a readable command workflow alongside a short first-person
explanation. CPM uses curved connections between venues and a layered portfolio shape. WaveRune
retains its waveform illustration. KitDev uses a softly offset cluster of six tool
labs in a wider row. All overview previews are custom Vue/CSS illustrations, never
raster images. A shared visual frame owns surface, line, ink, and radius tokens,
so their geometry and colors stay consistent across themes. At 700px and below,
project compositions collapse into one column. Avoid decorative section numbering,
status dots, and repeated right-hand captions.

Project detail pages lead with one real screenshot, then the story, with additional
screenshots below it. The first screenshot participates in the shared project
transition. Preserve screenshot alt text, intrinsic dimensions, and captions.

## Working samples

The KitDev page includes a small JSON formatter. It formats or compacts valid JSON,
handles empty, invalid, and oversized input inline, and offers a sample and copy
feedback. Editing clears the previous result. Input never leaves the browser.
The preview accepts up to 100,000 characters. It demonstrates a useful operation;
it does not pretend to embed the full KitDev application.

## Components and states

- Project previews use a quiet frame. Hover shifts the frame up 3px and adds a tinted
  border. Keyboard focus is visible. Titles are independent links.
- Buttons have hover, press, focus, and disabled states. Disabled actions cannot run.
- The appearance disclosure groups primary choices and Extras, indicates the selected
  preference, closes on outside interaction, and restores focus after selection or Escape.
- The terminal retains its session across minimize, restore, and page navigation.
  Opening and closing uses a brief scale and fade from its upper-right corner.
- Input validation uses an associated error message and `aria-invalid`. Copy feedback
  uses a live status region, including a manual-copy fallback when clipboard access fails.
- Mobile controls are at least 44px tall. Layouts must fit without horizontal overflow.

## Motion

| Motion                             | Duration  |
| ---------------------------------- | --------- |
| Hover and UI feedback              | 160–180ms |
| Page and shared preview transition | 320ms     |
| Hero and section entrance          | 360ms     |
| Theme reveal                       | 360ms     |

The hero enters as one composition. Each section reveals once with a 6px movement
and fade, without cascading every card and row. The background fades in once and
then stays still. The hero cursor blinks twice; pointer hover can blink the linked mark.

Keep the shared project transition as the signature motion. Page transitions preserve
the header and terminal. Theme changes reveal from the appearance control. Browsers
without view transitions use the Vue fade fallback. Animate transforms and opacity
for entrances; use clip-path only for the theme reveal. Terminal resize is immediate
rather than animating layout dimensions.

Reduced motion sets duration tokens to zero and disables keyframe/view transitions.
Print and no-JavaScript pages show all content. Keyboard navigation, focus restoration,
system-theme changes, and desktop/mobile routes are checked in browser tests.
