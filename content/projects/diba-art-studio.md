---
name: Diba Art Studio
order: 12
client: diba-art-studio
freelance: true
site: https://dibaartstudio.com
tagline: A custom Shopify theme for a shop that sells original paintings.
stack:
  - Shopify
  - Liquid
  - TypeScript
  - Vite
  - GSAP
---

Diba Art Studio is an online shop for original paintings. I built its storefront as a freelance project. The shop is not open to the public yet, so its address shows a password page. It is a custom Shopify theme that I wrote on top of the Shopify Skeleton theme, with no CSS framework and no JavaScript framework.

Each painting exists one time, so the product page has no size or quantity to select. The gallery has a real-scale view: it draws the painting from the width and height of the canvas, next to a person 170 cm tall. A second set of photos shows the work in a room. When a painting sells, it stays in the shop with a Sold badge, the buy button turns off, and a link offers a commission of a similar piece.

The theme uses Liquid sections with JSON templates, plain CSS, and one TypeScript bundle that Vite builds. GSAP runs the scroll motion. The shop stays usable without JavaScript and respects the reduced-motion setting. The fixed interface text comes from English and Norwegian locale files. The home page text and images are settings in the theme editor, so the owner changes them and adds works without code. The source is private.
