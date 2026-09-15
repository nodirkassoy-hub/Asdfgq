# POCKEY — Penoplast zavodi · Corporate Website

Premium single-page corporate website for **POCKEY**, a modern penoplast / EPS foam
manufacturing factory.

Design language: **Liquid Glass + Soft UI + real-time 3D + Industrial Premium**.
Everything is functional — no mockups, no dead buttons.

```
“Bu oddiy sayt emas — bu katta va zamonaviy ishlab chiqaruvchi kompaniyaning sayti.”
```

---

## Quick start

Any static file server works:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

No build step. No dependencies to install. All libraries are vendored locally
(the site works fully offline).

---

## Features

| Area | Details |
| --- | --- |
| Header | Glass navigation, scroll progress bar, active-section highlighting, sticky blur |
| Languages | 🇺🇿 O‘zbek · 🇷🇺 Русский · 🇬🇧 English — full UI translation, remembered in `localStorage` |
| Themes | Dark / Light with system-preference detection, remembered in `localStorage` |
| Products | EPS 15 / 20 / 25 / 30 cards with CSS-3D foam visuals, density + thickness filters, live result count |
| Search | Premium ⌘/Ctrl + K command-palette over name, density, thickness and application |
| Product detail | Glass modal with interactive 3D (rotate / zoom), thickness switcher, specs table, price request |
| Order system | Validated glass modal (name, phone, product, thickness, quantity, note), success state, local persistence |
| 3D showcase | Large interactive EPS block — rotate, zoom, change thickness & density, live weight estimate |
| Production | 6-stage process timeline (01–06) with real industrial imagery and scroll reveals |
| Quality | Animated check indicators triggered on scroll |
| Applications | 6 custom technical SVG illustrations with 3D tilt hover |
| Contacts | Editable placeholder contact cards + map placeholder (OpenStreetMap embed) |
| Mobile | Animated hamburger drawer, vertical cards, zero horizontal overflow |
| Accessibility | Skip link, focus management, focus trap in modals, `prefers-reduced-motion` respected |

---

## Project structure

```
index.html              — all markup (translation hooks: data-i18n / data-i18n-ph / data-i18n-aria)
css/style.css           — full design system (tokens at the top, one section per component)
js/i18n.js              — UZ / RU / EN dictionaries (edit text here)
js/products.js          — product catalog + site config (contacts, socials, map, prices)
js/main.js              — application logic + Three.js scenes
vendor/                 — three.module.min.js, OrbitControls.js, RoundedBoxGeometry.js (Three.js r160, MIT)
assets/fonts/           — self-hosted Inter + Space Grotesk (woff2, OFL)
assets/img/             — AI-generated industrial imagery
```

---

## Editing content

### 1. Interface text / translations
Everything user-facing lives in `js/i18n.js` as three plain objects: `UZ`, `RU`, `EN`.
Change a string, save, refresh. HTML defaults (shown before JS runs) are in Uzbek.

### 2. Products, thicknesses, real prices
`js/products.js → PRODUCTS`. Each product:

```js
{
  id: 'eps20',
  name: 'POCKEY EPS 20',
  grade: 20,
  density: '20 kg/m³',
  thickness: [20, 30, 50, 100],      // mm — filters & modals adapt automatically
  size: '1000×2000 mm',
  price: 'agreed',                   // → "Narx: Kelishilgan holda"
  lambda: '≤ 0.041 W/(m·K)',
  weight50: '1.00 kg',
  apps: ['wall', 'home', 'roof']
}
```

No prices are invented anywhere. When real prices are ready, replace the price
display logic in `cardHTML()` / `renderProductInfo()` (`js/main.js`) — search for
`priceValue`.

### 3. Contacts, socials, map
`js/products.js → CONFIG`. Placeholders are clearly marked
(`+998 -- --- -- --`, `info@pockey.uz`, `@pockey`, Tashkent). Replace
`CONFIG.map.embed` with a Google Maps / Yandex embed or real coordinates.

### 4. Connecting a real backend (order requests)
By default requests are **stored locally in the browser** (`localStorage →
pockey_requests`) and logged to the console — demo mode, clearly labelled in the
success screen. To go live, do ONE of:

```js
// A) global hook — define before js/main.js loads:
window.POCKEY_API = {
  submitOrder(payload) { /* send to Telegram bot / CRM / API */ }
};

// B) endpoint — in js/products.js:
CONFIG.apiEndpoint = 'https://your-api.example.com/orders'; // POSTs JSON
```

The submission code (marked `Integration point`) is in `js/main.js → orderForm submit`.

---

## Performance & 3D notes

- Three.js is **lazy-loaded** via native ES modules; the product-modal scene is
  created only on first open.
- All render loops **pause** when off-screen or when the tab is hidden.
- Pixel ratio capped at 2; procedural textures (no downloads); low-poly geometry.
- Devices without WebGL gracefully fall back to static imagery.
- `prefers-reduced-motion: reduce` disables particles, auto-rotation, tilt and
  reveal animations.

---

## Testing

Verified with an automated DOM test-suite (97 checks, all passing) covering:
boot (no console errors), all in-page anchors, external-link safety, theme
toggle + persistence, language switching (header + drawer), density/thickness
filters + empty-state reset, product detail modal, thickness pre-selection into
the order form, order validation + local submission + success state, price
requests, search (Ctrl+K, query by name/density/thickness/application, keyboard
navigation), mobile drawer, contact-form validation, quality/reveal observers,
persistence across reloads, reduced-motion mode and the no-WebGL fallback path.
The vendored Three.js + OrbitControls + RoundedBoxGeometry stack was additionally
load-tested against the exact APIs used by `js/main.js`, and the HTML was
validated (no errors, no duplicate IDs).

---

## Credits

- [Three.js](https://threejs.org) — MIT License (vendored in `vendor/`)
- [Inter](https://rsms.me/inter/) & [Space Grotesk](https://fonts.floriankarsten.com/space-grotesk) — SIL Open Font License (vendored in `assets/fonts/`)
- Imagery — AI-generated for POCKEY demo purposes

© POCKEY. All rights reserved.
