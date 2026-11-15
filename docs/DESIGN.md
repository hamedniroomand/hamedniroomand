# Design system: niroomand.dev

The site is an engineering drawing of its owner: squared paper, ink, one marking color,
and a serif wordmark. The hero takes an interface apart into its layers. The terminal,
real product previews, and working samples carry the rest of the identity. The site
uses native CSS and browser view transitions. No animation or component library is
required.

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
colors belong to meaningful feedback. The accent is the marking color of a drawing
review: it identifies interactive and current content, and the measured layer of the
hero. Avoid adding decorative accent colors.

## Themes

System, Dark, and Light are the primary appearance choices. Without a saved choice,
the site follows the device. Choosing System removes the stored override and keeps
responding to device changes. Invalid saved values are ignored before first paint.

Dark is a blueprint: Prussian blue (`#0c2547`), white line (`#eef3fb`), and the yellow
of a checker's pencil (`#ffd24a`). Light is a whiteprint: cool paper (`#f2f4f6`), navy
ink (`#0f1f3d`), and redline red (`#c8102e`), with blueprint blue (`#1d4ed8`) for
links. Both draw faint squared paper behind the page. The lines fade out lower on the
screen. The CRT theme has scan lines already, so it draws no paper lines.

Gruvbox, Dracula, and CRT are grouped as Extras. CRT is a color palette with an
independent, persisted Scanlines checkbox. Scanlines are static, never flicker, and
are removed with reduced motion. Disabling them keeps the CRT palette.

## Typography and layout

Old Standard TT is the display face: the name, section headings, project titles, and
the italic lines under them. It has one weight (400), so a display heading never asks
for a bolder one. Geist Variable is the reading face. JetBrains Mono Variable is for
commands, paths, code, and the labels inside project previews. All three are
self-hosted and preloaded. Body text is 15–16px, important metadata at least 12px.
Tiny illustration labels can be 11px. Keep reading lines around 45–65 characters.
Headings balance and paragraphs wrap prettily. Labels use sentence case, not capitals.

The content width is 1180px with fluid gutters. On a wide screen the name goes across
the page, centered, and the hero figure stands in front of its lower edge. The pitch
and where Hamed works from are on the left of the figure. The links to contact him or
download the CV are on the right. A command that reads the résumé as JSON is below the
figure. Below 1100px the hero is one column: the name on two lines, the pitch, the
actions, the command, then the figure.

The hero figure is an interface in four layers: layout, structure, interface, and
measured. It is an isometric drawing made of HTML and CSS on a 600 by 420 grid that
scales with its container. The layers move a little with the pointer and close as the
figure scrolls away. The brand mark is the "h" and the period of the display face.

A statement follows the hero: one sentence in the display face, with three small
drawings in the line. Each word gets its full color as it scrolls into view. The
measured-results section comes next. It shows four Lighthouse values before and after
one migration, each as two bars on one scale.

Projects come in two groups. Client work is a list of rows: a plate with its text
beside it, on alternate sides. Open source is a grid: the first four projects in two
columns, and the rest in three columns on wide screens.

The footer repeats the name as an outline that fills its width.

Each project has its own drawing of what the product does. Jack Westin shows a
flashcard beside a sample practice question. Cue shows a readable command workflow.
CPM uses curved connections between venues and a layered portfolio shape. All overview
previews are custom Vue/CSS illustrations, never raster images. A shared visual frame owns surface, line, ink, and radius tokens,
so their geometry and colors stay consistent across themes. At 700px and below,
project compositions collapse into one column. Avoid decorative section numbering,
status dots, and repeated right-hand captions.

Project detail pages lead with one real screenshot (or the drawn visual when a project
has none), then the story, with additional screenshots below it. The first screenshot participates in the shared project
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
| Section entrance                   | 360ms     |
| Hero layers open                   | 1200ms    |
| Theme reveal                       | 360ms     |

The layers of the hero figure open once when the page loads. This is the one
orchestrated moment of the site. Each section reveals once with a 6px movement and
fade, without cascading every card and row.

Two effects follow the scroll position, in browsers with scroll-driven animations:
the words of the statement get their full color, and a project plate comes in tilted and
lies flat when it is fully in view. Other browsers show the final state.

Keep the shared project transition as the signature motion. Page transitions preserve
the header and terminal. Theme changes reveal from the appearance control. Browsers
without view transitions use the Vue fade fallback. Animate transforms and opacity
for entrances; use clip-path only for the theme reveal. Terminal resize is immediate
rather than animating layout dimensions.

Reduced motion sets duration tokens to zero and disables keyframe/view transitions.
Print and no-JavaScript pages show all content. Keyboard navigation, focus restoration,
system-theme changes, and desktop/mobile routes are checked in browser tests.
