# Sheriff of the Court — Website

A modern, mobile-responsive site built with **React + Vite**, **MUI (Material UI)**,
and **Framer Motion** for animation. Built in the same single-page, scroll-section
spirit as the Selahla Printings reference site (scroll-aware navbar, animated
section reveals, hover-lift cards), restyled for a Sheriff of the Court office
around the crest's navy / bronze / parchment palette.

## Running it locally

```bash
npm install
npm run dev      # starts a local dev server, usually http://localhost:5173
```

To build a production-ready bundle:

```bash
npm run build     # outputs to /dist
npm run preview   # serve the production build locally to check it
```

The `/dist` folder is what you upload to your hosting (Netlify, Vercel, cPanel,
etc.) — same idea as the Create React App `build` folder you're already used to.

## Project structure

```
src/
  assets/logo.jpg       ← your crest, used in navbar, hero, about & footer
  components/
    Navbar.jsx           Scroll-aware nav, transparent → solid navy
    Hero.jsx              Full-screen intro with crest + ambient seal-ray motif
    About.jsx              "Who We Are" + 3 pillars (Impartial / Lawful / Accountable)
    Services.jsx           8-card service grid (summons, warrants, evictions, etc.)
    Process.jsx            4-step "how it works" (a real sequence, so numbered)
    Jurisdiction.jsx       Areas served, cards link out to Google Maps
    Contact.jsx             Request form + office details
    Footer.jsx
    FloatingContact.jsx    Floating WhatsApp button (bottom-right)
    SealRays.jsx             The recurring ray-seal SVG motif drawn from the crest
    AnimatedSection.jsx    Reusable scroll-reveal wrapper (Framer Motion)
  theme.js                 MUI theme — all colours/fonts as named tokens
  App.jsx
```

## Things to customize before going live

This is built with realistic Sheriff-of-the-court content, but several details
are **placeholders** — search the codebase for these before launch:

- **Phone numbers / email** — currently using placeholder numbers in
  `Contact.jsx`, `Footer.jsx`, and the WhatsApp number in `FloatingContact.jsx`.
- **Office address** — `[Insert Street Address]` in `Contact.jsx`.
- **Jurisdiction / districts** — the four cards in `Jurisdiction.jsx` are
  placeholder magisterial districts; replace with this office's real coverage
  areas and Google Maps links.
- **Contact form submission** — the form in `Contact.jsx` currently just shows
  a success message locally (no backend). Wire it up to a service like
  Formspree, EmailJS, or your own API endpoint when ready.
- **Social links** — Facebook/LinkedIn icons in the footer are not yet linked
  to real profiles.

## Notes on the design choices

- **Palette**: deep navy (`#13203A`), bronze/gold (`#A9824C`), and a parchment
  background (`#F6F3EA`) — pulled straight from the crest, evoking an official
  seal/ledger rather than a generic template look.
- **Type**: Fraunces (serif, display) for headings, Inter for body copy, and
  IBM Plex Mono for small "file reference" style labels — a nod to case
  numbers and document stamps.
- **Motion**: respects `prefers-reduced-motion`; the ambient ray rotation in
  the hero and section reveals are disabled for users who request less motion.
- **No stock photography** is used — visuals lean on the crest itself plus a
  custom ray-seal SVG motif, so there's nothing to license or replace later.

## Adding more pages

This is currently a single scrolling page (per the brief). If you'd like
dedicated routes later (e.g. `/services`, `/notices`), add `react-router-dom`
and split each section component into its own route — the section components
are already self-contained, so this is a fairly light refactor.
