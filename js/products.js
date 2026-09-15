/* ============================================================
   POCKEY — Product catalog & site configuration
   ============================================================
   ▸ Prices: deliberately not invented. "price: 'agreed'" renders
     as "Narx: Kelishilgan holda". To add real prices, set
     price: { value: 00000, currency: 'UZS', unit: 'm²' }.
   ▸ Thickness values are in millimeters.
   ▸ Applications reference window.APPS_LABELS keys (i18n).
   ============================================================ */
(function () {
  'use strict';

  var PRODUCTS = [
    {
      id: 'eps15',
      name: 'POCKEY EPS 15',
      grade: 15,
      density: '15 kg/m³',
      densityValue: 15,
      thickness: [10, 20, 30, 50, 100],
      size: '1000×2000 mm',
      sizeNote: true,
      price: 'agreed',
      lambda: '≤ 0.044 W/(m·K)',
      weight50: '0.75 kg',
      apps: ['wall', 'home', 'pack'],
      visual: 'light'
    },
    {
      id: 'eps20',
      name: 'POCKEY EPS 20',
      grade: 20,
      density: '20 kg/m³',
      densityValue: 20,
      thickness: [20, 30, 50, 100],
      size: '1000×2000 mm',
      sizeNote: true,
      price: 'agreed',
      lambda: '≤ 0.041 W/(m·K)',
      weight50: '1.00 kg',
      apps: ['wall', 'home', 'roof'],
      visual: 'soft'
    },
    {
      id: 'eps25',
      name: 'POCKEY EPS 25',
      grade: 25,
      density: '25 kg/m³',
      densityValue: 25,
      thickness: [20, 30, 50, 100],
      size: '1000×2000 mm',
      sizeNote: true,
      price: 'agreed',
      lambda: '≤ 0.039 W/(m·K)',
      weight50: '1.25 kg',
      apps: ['roof', 'building', 'cold'],
      visual: 'strong'
    },
    {
      id: 'eps30',
      name: 'POCKEY EPS 30',
      grade: 30,
      density: '30 kg/m³',
      densityValue: 30,
      thickness: [30, 50, 100],
      size: '1000×2000 mm',
      sizeNote: true,
      price: 'agreed',
      lambda: '≤ 0.038 W/(m·K)',
      weight50: '1.50 kg',
      apps: ['roof', 'cold', 'pack', 'building'],
      visual: 'max'
    }
  ];

  /* Application id → per-language label key list (used in cards & modal) */
  var APPS = {
    home:     { icon: 'home',     idx: 0 },
    building: { icon: 'building', idx: 1 },
    wall:     { icon: 'wall',     idx: 2 },
    roof:     { icon: 'roof',     idx: 3 },
    cold:     { icon: 'cold',     idx: 4 },
    pack:     { icon: 'pack',     idx: 5 }
  };

  /* Site contact configuration — EDITABLE PLACEHOLDERS.
     Replace these values with the real company information. */
  var CONFIG = {
    phone: {
      display: '+998 -- --- -- --',
      href: 'tel:+998000000000'
    },
    address: {
      line: 'Toshkent, O‘zbekiston',
      note: true
    },
    email: {
      display: 'info@pockey.uz',
      href: 'mailto:info@pockey.uz'
    },
    telegram: {
      display: '@pockey',
      href: 'https://t.me/pockey'
    },
    social: [
      { id: 'telegram',  label: 'Telegram',  href: 'https://t.me/pockey' },
      { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/pockey' },
      { id: 'facebook',  label: 'Facebook',  href: 'https://facebook.com/pockey' },
      { id: 'youtube',   label: 'YouTube',   href: 'https://youtube.com/@pockey' }
    ],
    map: {
      /* Replace with the real company location coordinates */
      bbox: '69.2400,41.2640,69.3400,41.3340',
      marker: '41.2990,69.2900',
      embed: 'https://www.openstreetmap.org/export/embed.html?bbox=69.2400%2C41.2640%2C69.3400%2C41.3340&layer=mapnik&marker=41.2990%2C69.2900'
    },
    /* Optional backend hook: define window.POCKEY_API.submitOrder(payload)
       to forward order requests to a real API / Telegram bot / CRM. */
    apiEndpoint: null
  };

  window.POCKEY_PRODUCTS = PRODUCTS;
  window.POCKEY_APPS = APPS;
  window.POCKEY_CONFIG = CONFIG;
})();
