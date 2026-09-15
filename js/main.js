/* ============================================================
   POCKEY — Main application
   Navigation · Theme · i18n · Products · Filters · Search
   Product detail · Order system · 3D (Three.js) · Forms
   ============================================================ */
'use strict';

/* ---------------- Helpers ---------------- */
const $ = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
};
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let T = window.I18N.get('uz');   // current dictionary
let LANG = 'uz';

const THEME_KEY = 'pockey_theme';
const LANG_KEY = 'pockey_lang';
const ORDERS_KEY = 'pockey_requests';

const state = { grade: 'all', thickness: 'all' };

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  store.set(THEME_KEY, theme);
}
function initTheme() {
  const saved = store.get(THEME_KEY, null);
  if (saved === 'light' || saved === 'dark') { applyTheme(saved); return; }
  applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

/* ============================================================
   i18n
   ============================================================ */
function t(key) {
  return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, T);
}
function applyI18n() {
  T = window.I18N.get(LANG);
  document.documentElement.setAttribute('lang', LANG);
  $$('[data-i18n]').forEach(el => {
    const v = t(el.getAttribute('data-i18n'));
    if (typeof v === 'string') el.textContent = v;
  });
  $$('[data-i18n-aria]').forEach(el => {
    const v = t(el.getAttribute('data-i18n-aria'));
    if (typeof v === 'string') el.setAttribute('aria-label', v);
  });
  $$('[data-i18n-ph]').forEach(el => {
    const v = t(el.getAttribute('data-i18n-ph'));
    if (typeof v === 'string') el.setAttribute('placeholder', v);
  });
  // Language menu selections
  $$('.lang__opt').forEach(o => o.classList.toggle('selected', o.dataset.lang === LANG));
  const short = window.I18N.langMeta[LANG].short;
  $$('.lang__short').forEach(el => { el.textContent = short; });
  fillContacts();
}
function setLang(lang) {
  if (!window.I18N.langs.includes(lang)) return;
  LANG = lang;
  store.set(LANG_KEY, lang);
  applyI18n();
  renderStrip();
  buildThicknessFilter();    // filter chips carry translated labels
  renderProducts();          // dynamic strings (application chips, results count)
  populateOrderProducts();   // product <select> labels
  if (smodal.classList.contains('open')) renderSearchResults(searchInput.value);
}

/* ============================================================
   MARQUEE STRIP (seamless: content duplicated ×2, animated -50%)
   ============================================================ */
function renderStrip() {
  const track = $('#stripTrack');
  if (!track) return;
  const words = (T.strip && T.strip.words) || [];
  if (!words.length) return;
  const set = words.map(w => '<span class="strip__item">' + svgIcon('cube') + esc(w) + '</span>').join('');
  track.innerHTML = set + set;
}

/* ============================================================
   HEADER · progress · active nav
   ============================================================ */
const header = $('#header');
const progress = $('#progressbar');
const toTop = $('#toTop');

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('header--scrolled', y > 24);
  toTop.classList.toggle('show', y > 640);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0) + ')';
}
window.addEventListener('scroll', onScroll, { passive: true });

/* Smooth anchor scrolling with sticky-header offset */
function smoothTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const off = header.offsetHeight + 10;
  const top = el.getBoundingClientRect().top + window.scrollY - off;
  window.scrollTo({ top: Math.max(0, top), behavior: REDUCED ? 'auto' : 'smooth' });
}
function initAnchors() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      smoothTo(id);
      history.replaceState(null, '', '#' + id);
      closeDrawer();
    });
  });
}

/* Active section highlight */
function initActiveNav() {
  const ids = ['home', 'products', 'about', 'production', 'advantages', 'contacts'];
  const links = $$('.nav__link');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  ids.forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/* ============================================================
   MOBILE DRAWER
   ============================================================ */
const drawer = $('#drawer');
const burger = $('#burger');

function openDrawer() {
  drawer.classList.add('open');
  burger.classList.add('active');
  burger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
}
function closeDrawer() {
  if (!drawer.classList.contains('open')) return;
  drawer.classList.remove('open');
  burger.classList.remove('active');
  burger.setAttribute('aria-expanded', 'false');
  if (!$('.modal.open')) document.body.classList.remove('no-scroll');
}
burger.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
$('.drawer__scrim').addEventListener('click', closeDrawer);

/* ============================================================
   LANGUAGE SWITCHER
   ============================================================ */
const langWrap = $('#lang');
const langBtn = $('#langBtn');
langBtn.addEventListener('click', e => {
  e.stopPropagation();
  const open = langWrap.classList.toggle('open');
  langBtn.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', e => {
  if (!langWrap.contains(e.target)) { langWrap.classList.remove('open'); langBtn.setAttribute('aria-expanded', 'false'); }
});
$$('.lang__opt').forEach(opt => {
  opt.addEventListener('click', () => {
    setLang(opt.dataset.lang);
    langWrap.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  });
});
$$('.drawer .lang__opt').forEach(opt => {
  opt.addEventListener('click', () => setLang(opt.dataset.lang));
});

/* ============================================================
   THEME TOGGLE
   ============================================================ */
$('#themeBtn').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(cur === 'light' ? 'dark' : 'light');
});
$('#themeBtnDrawer').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(cur === 'light' ? 'dark' : 'light');
});

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initReveal() {
  const els = $$('.rv');
  if (REDUCED || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(el => io.observe(el));
}

/* Quality checklist ping */
function initQualityPings() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('seen'); io.unobserve(en.target); }
    });
  }, { threshold: 0.5 });
  $$('.qitem').forEach(el => io.observe(el));
}

/* ============================================================
   PRODUCTS — catalog, filters, cards
   ============================================================ */
const P = window.POCKEY_PRODUCTS;
const APPS = window.POCKEY_APPS;
const CONFIG = window.POCKEY_CONFIG;

const grid = $('#pgrid');
const resultsCount = $('#resultsCount');

const appLabel = key => {
  const a = APPS[key];
  const items = T.apps.items;
  return (a && items[a.idx]) ? items[a.idx].t : key;
};

function thicknessUnion() {
  const set = new Set();
  P.forEach(p => p.thickness.forEach(v => set.add(v)));
  return Array.from(set).sort((a, b) => a - b);
}

function buildThicknessFilter() {
  const wrap = $('#thickFilters');
  wrap.innerHTML = '';
  const mk = (val, label) => {
    const b = document.createElement('button');
    b.className = 'chip chip--thick' + (state.thickness === val ? ' active' : '');
    b.dataset.thick = val;
    b.textContent = label;
    b.addEventListener('click', () => {
      state.thickness = val;
      $$('.chip--thick').forEach(c => c.classList.toggle('active', c.dataset.thick === val));
      renderProducts();
    });
    wrap.appendChild(b);
  };
  mk('all', t('products.thicknessAll'));
  thicknessUnion().forEach(v => mk(v, v + ' ' + t('products.mm')));
}

function matchProduct(p) {
  if (state.grade !== 'all' && String(p.grade) !== String(state.grade)) return false;
  if (state.thickness !== 'all' && !p.thickness.includes(Number(state.thickness))) return false;
  return true;
}

function foam3dHTML(visual) {
  return '<div class="foam3d" aria-hidden="true">' +
    '<div class="f-face f-top"></div>' +
    '<div class="f-face f-front"></div>' +
    '<div class="f-face f-side"></div>' +
    '<div class="f-shadow"></div>' +
    '</div>';
}

function cardHTML(p, i) {
  const apps = p.apps.map(k => '<span class="pcard__app">' + esc(appLabel(k)) + '</span>').join('');
  const th = p.thickness;
  const thStr = th.length > 3
    ? esc(t('products.from')) + ' ' + th[0] + ' ' + esc(t('products.mm')) + ' — ' + th[th.length - 1] + ' ' + esc(t('products.mm'))
    : th.join(' / ') + ' ' + esc(t('products.mm'));
  return '' +
    '<article class="pcard" data-tilt style="--i:' + i + '">' +
      '<div class="pcard__stage">' +
        '<span class="pcard__grade">EPS ' + p.grade + '</span>' +
        foam3dHTML(p.visual) +
        '<span class="pcard__stage-label">' + p.densityValue + ' kg/m³</span>' +
      '</div>' +
      '<div class="pcard__body">' +
        '<h3 class="pcard__name">' + esc(p.name) + '</h3>' +
        '<dl class="pcard__specs">' +
          '<div class="pspec"><dt>' + esc(t('products.density')) + '</dt><dd class="mono">' + esc(p.density) + '</dd></div>' +
          '<div class="pspec"><dt>' + esc(t('products.thickness')) + '</dt><dd class="mono">' + thStr + '</dd></div>' +
          '<div class="pspec"><dt>' + esc(t('products.size')) + '</dt><dd class="mono">' + esc(p.size) + '</dd></div>' +
        '</dl>' +
        '<div class="pcard__apps">' + apps + '</div>' +
        '<div class="pcard__foot">' +
          '<div class="pcard__price"><small>' + esc(t('products.price')) + '</small><b>' + esc(t('products.priceValue')) + '</b></div>' +
          '<div class="pcard__btns">' +
            '<button class="pcard__price-btn" data-price-request="' + p.id + '" aria-label="' + esc(t('products.requestPrice')) + '" title="' + esc(t('products.requestPrice')) + '">' +
              svgIcon('tag') +
            '</button>' +
            '<button class="btn btn--soft btn--sm" data-product="' + p.id + '">' + esc(t('products.details')) + '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
}

function renderProducts() {
  if (!grid) return;
  const list = P.filter(matchProduct);
  resultsCount.innerHTML = '<b>' + list.length + '</b> ' + esc(t('products.results'));
  if (!list.length) {
    grid.innerHTML =
      '<div class="pempty">' + svgIcon('searchBig') +
        '<b>' + esc(t('products.empty')) + '</b>' +
        '<p>' + esc(t('products.emptyHint')) + '</p>' +
        '<button class="btn btn--ghost btn--sm" id="resetFilters">' + esc(t('products.reset')) + '</button>' +
      '</div>';
    $('#resetFilters').addEventListener('click', () => {
      state.grade = 'all'; state.thickness = 'all';
      $$('.chip--grade').forEach(c => c.classList.toggle('active', c.dataset.grade === 'all'));
      $$('.chip--thick').forEach(c => c.classList.toggle('active', c.dataset.thick === 'all'));
      renderProducts();
    });
    return;
  }
  grid.innerHTML = list.map(cardHTML).join('');
  initTilt(grid);
}

/* Density filter chips */
$$('.chip--grade').forEach(c => {
  c.addEventListener('click', () => {
    state.grade = c.dataset.grade;
    $$('.chip--grade').forEach(x => x.classList.toggle('active', x === c));
    renderProducts();
  });
});

/* ---------- Card tilt + glow ---------- */
function initTilt(scope) {
  if (REDUCED || window.matchMedia('(hover: none)').matches) return;
  $$('.pcard[data-tilt], .app-card[data-tilt]', scope || document).forEach(card => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = '1';
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', (x * 100) + '%');
      card.style.setProperty('--my', (y * 100) + '%');
      const rx = (0.5 - y) * 7;
      const ry = (x - 0.5) * 9;
      card.style.transform = 'perspective(1000px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-4px)';
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

/* ---------- SVG icon helper ---------- */
function svgIcon(name) {
  const icons = {
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V5a2 2 0 0 1 2-2h8l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    searchBig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8 20.5 7.5v9L12 21.2 3.5 16.5v-9L12 2.8Z"/><path d="M3.5 7.5 12 12.2l8.5-4.7M12 12.2v9"/></svg>'
  };
  return icons[name] || '';
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

/* ============================================================
   MODAL SYSTEM (stack)
   ============================================================ */
const modalStack = [];
function openModal(m) {
  m.classList.add('open');
  m.setAttribute('aria-hidden', 'false');
  modalStack.push(m);
  document.body.classList.add('no-scroll');
  const f = m.querySelector('button, [href], input, select, textarea');
  if (f) setTimeout(() => f.focus({ preventScroll: true }), 60);
}
function closeModal(m) {
  m.classList.remove('open');
  m.setAttribute('aria-hidden', 'true');
  const i = modalStack.indexOf(m);
  if (i > -1) modalStack.splice(i, 1);
  if (!modalStack.length && !drawer.classList.contains('open')) document.body.classList.remove('no-scroll');
}
$$('.modal').forEach(m => {
  m.querySelector('.modal__scrim').addEventListener('click', () => closeModal(m));
  m.querySelector('.modal__close').addEventListener('click', () => closeModal(m));
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalStack.length) closeModal(modalStack[modalStack.length - 1]);
  if (e.key === 'Tab' && modalStack.length) {
    const m = modalStack[modalStack.length - 1];
    const foc = $$('button, [href], input, select, textarea', m).filter(el => !el.disabled && el.offsetParent !== null);
    if (!foc.length) return;
    const first = foc[0], last = foc[foc.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ============================================================
   PRODUCT DETAIL MODAL
   ============================================================ */
const pmodal = $('#productModal');
const pmodalInfo = $('#pmodalInfo');
const pmodalBadge = $('#pmodalBadge');
const pmodalStage = $('#pmodalStage');
let pmodalProduct = null;
let pmodalThickness = null;

function openProduct(id) {
  const p = P.find(x => x.id === id);
  if (!p) return;
  pmodalProduct = p;
  pmodalThickness = p.thickness.includes(50) ? 50 : p.thickness[Math.floor(p.thickness.length / 2)];
  pmodalBadge.textContent = 'EPS ' + p.grade;
  renderProductInfo();
  openModal(pmodal);
  setTimeout(() => requestProduct3D(p, pmodalThickness), 80);
}
function renderProductInfo() {
  const p = pmodalProduct;
  if (!p) return;
  const apps = p.apps.map(k => '<span class="pcard__app">' + esc(appLabel(k)) + '</span>').join('');
  const thBtns = p.thickness.map(v =>
    '<button class="seg__btn pm-th' + (v === pmodalThickness ? ' active' : '') + '" data-th="' + v + '">' + v + ' ' + esc(t('products.mm')) + '</button>'
  ).join('');
  pmodalInfo.innerHTML =
    '<h3 class="pmodal__title">' + esc(p.name) + '</h3>' +
    '<div class="pmodal__density-line">' + esc(t('pmodal.density')) + ' — ' + esc(p.density) + '</div>' +
    '<div class="pmodal__block">' +
      '<div class="pmodal__label">' + esc(t('pmodal.thicknessOptions')) + '</div>' +
      '<div class="seg">' + thBtns + '</div>' +
    '</div>' +
    '<div class="pmodal__block">' +
      '<div class="pmodal__label">' + esc(t('pmodal.dimensions')) + '</div>' +
      '<div class="pmodal__dims">' +
        '<span class="dim-tag">' + esc(p.size) + '</span>' +
        '<span class="dim-tag pm-dim">' + pmodalThickness + ' ' + esc(t('products.mm')) + '</span>' +
      '</div>' +
      '<div class="spec-note">' + esc(t('pmodal.otherSizes')) + '</div>' +
    '</div>' +
    '<div class="pmodal__block">' +
      '<div class="pmodal__label">' + esc(t('pmodal.application')) + '</div>' +
      '<div class="pmodal__apps">' + apps + '</div>' +
    '</div>' +
    '<div class="pmodal__block">' +
      '<div class="pmodal__label">' + esc(t('pmodal.specs')) + '</div>' +
      '<table class="spec-table"><tbody>' +
        '<tr><th>' + esc(t('pmodal.specMaterial')) + '</th><td>' + esc(t('pmodal.specMaterialValue')) + '</td></tr>' +
        '<tr><th>' + esc(t('pmodal.density')) + '</th><td>' + esc(p.density) + '</td></tr>' +
        '<tr><th>' + esc(t('pmodal.specLambda')) + '</th><td>' + esc(p.lambda) + '</td></tr>' +
        '<tr><th>' + esc(t('pmodal.specSize')) + '</th><td>' + esc(p.size) + '</td></tr>' +
        '<tr><th>' + esc(t('pmodal.specWeight')) + '</th><td>' + esc(p.weight50) + '</td></tr>' +
      '</tbody></table>' +
      '<div class="spec-note">' + esc(t('pmodal.specNote')) + '</div>' +
    '</div>' +
    '<div class="pmodal__pricebar">' +
      '<div><div class="p-lbl">' + esc(t('pmodal.price')) + '</div><div class="p-val">' + esc(t('pmodal.priceValue')) + '</div></div>' +
      '<div class="p-act">' +
        '<button class="btn btn--ghost btn--sm" data-price-request="' + p.id + '">' + esc(t('pmodal.requestPrice')) + '</button>' +
        '<button class="btn btn--primary btn--sm" data-order="' + p.id + '">' + esc(t('pmodal.order')) + '</button>' +
      '</div>' +
    '</div>';
  $$('.pm-th', pmodalInfo).forEach(b => {
    b.addEventListener('click', () => {
      pmodalThickness = Number(b.dataset.th);
      $$('.pm-th', pmodalInfo).forEach(x => x.classList.toggle('active', x === b));
      const dimTag = $('.pm-dim', pmodalInfo);
      if (dimTag) dimTag.textContent = pmodalThickness + ' ' + t('products.mm');
      requestProduct3D(p, pmodalThickness);
    });
  });
}
function rotIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v5h-5"/></svg>';
}

/* ============================================================
   ORDER MODAL
   ============================================================ */
const omodal = $('#orderModal');
const orderForm = $('#orderForm');
const orderSuccess = $('#orderSuccess');
const orderSummary = $('#orderSummary');

function populateOrderProducts() {
  const sel = $('#of-product');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = '<option value="">' + esc(t('order.productNone')) + '</option>' +
    P.map(p => '<option value="' + p.id + '">' + esc(p.name) + ' · ' + esc(p.density) + '</option>').join('');
  sel.value = cur;
}
function populateOrderThickness(productId, selected) {
  const sel = $('#of-thickness');
  if (!sel) return;
  const p = P.find(x => x.id === productId);
  if (!p) {
    sel.innerHTML = '<option value="">' + esc(t('order.thicknessDefault')) + '</option>';
    sel.disabled = true;
    return;
  }
  sel.disabled = false;
  sel.innerHTML = '<option value="">' + esc(t('order.thicknessDefault')) + '</option>' +
    p.thickness.map(v => '<option value="' + v + '">' + v + ' ' + esc(t('products.mm')) + '</option>').join('') +
    '<option value="other">' + esc(t('order.thicknessOther')) + '</option>';
  if (selected) sel.value = String(selected);
  toggleCustomThickness();
}
function toggleCustomThickness() {
  const sel = $('#of-thickness');
  const custom = $('#of-thickness-custom');
  const show = sel.value === 'other';
  custom.parentElement.style.display = show ? 'block' : 'none';
  if (!show) custom.value = '';
}

function openOrder(productId, thickness) {
  orderForm.style.display = '';
  orderForm.reset();
  $$('.field', orderForm).forEach(f => f.classList.remove('invalid'));
  orderSuccess.classList.remove('show');
  populateOrderProducts();
  const sel = $('#of-product');
  sel.value = productId || '';
  populateOrderThickness(productId || '', thickness || '');
  openModal(omodal);
  setTimeout(() => $('#of-name').focus({ preventScroll: true }), 120);
}

$('#of-product').addEventListener('change', e => populateOrderThickness(e.target.value));
$('#of-thickness').addEventListener('change', toggleCustomThickness);

/* field error helper */
function setErr(input, key) {
  const field = input.closest('.field');
  field.classList.add('invalid');
  const err = field.querySelector('.field__err');
  if (err && key) err.innerHTML = warnIcon() + ' ' + esc(t(key));
}
function warnIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4.5"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>';
}
function clearErrs(form) { $$('.field.invalid', form).forEach(f => f.classList.remove('invalid')); }

function validPhone(v) {
  const digits = v.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15 && /^\+?[\d\s()\-]+$/.test(v.trim());
}

orderForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrs(orderForm);

  const name = $('#of-name');
  const phone = $('#of-phone');
  const product = $('#of-product');
  const thick = $('#of-thickness');
  const thickCustom = $('#of-thickness-custom');
  const qty = $('#of-qty');

  let ok = true;
  if (!name.value.trim() || name.value.trim().length < 2) { setErr(name, name.value.trim() ? 'order.errName' : 'order.errRequired'); ok = false; }
  if (!phone.value.trim()) { setErr(phone, 'order.errRequired'); ok = false; }
  else if (!validPhone(phone.value)) { setErr(phone, 'order.errPhone'); ok = false; }
  if (!product.value) { setErr(product, 'order.errRequired'); ok = false; }
  const thickVal = thick.value === 'other' ? thickCustom.value : thick.value;
  if (!thickVal) { setErr(thick.value === 'other' ? thickCustom : thick, 'order.errThickness'); ok = false; }
  if (!qty.value || Number(qty.value) < 1) { setErr(qty, 'order.errRequired'); ok = false; }
  if (!ok) {
    const firstBad = $('.field.invalid input, .field.invalid select', orderForm);
    if (firstBad) firstBad.focus({ preventScroll: false });
    return;
  }

  const p = P.find(x => x.id === product.value);
  const unit = $('#of-unit').value;
  const payload = {
    type: 'order',
    ts: new Date().toISOString(),
    lang: LANG,
    name: name.value.trim(),
    phone: phone.value.trim(),
    productId: p ? p.id : null,
    productName: p ? p.name : '',
    thickness: thickVal + ' mm',
    quantity: qty.value + ' ' + unit,
    note: $('#of-note').value.trim()
  };

  /* --- Integration point --------------------------------------------
     No backend is connected: the request is stored locally (demo mode).
     To connect a real API / Telegram bot / CRM, either:
       1) define window.POCKEY_API.submitOrder(payload) anywhere before
          this script runs, or
       2) set window.POCKEY_CONFIG.apiEndpoint = 'https://…' — the
          request will be POSTed there as JSON.                        */
  let delivered = false;
  try {
    if (window.POCKEY_API && typeof window.POCKEY_API.submitOrder === 'function') {
      window.POCKEY_API.submitOrder(payload);
      delivered = true;
    } else if (CONFIG.apiEndpoint) {
      fetch(CONFIG.apiEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      }).catch(() => {});
      delivered = true;
    }
  } catch (err) { /* integration errors must not block UX */ }
  if (!delivered) {
    const all = store.get(ORDERS_KEY, []);
    all.push(payload);
    store.set(ORDERS_KEY, all);
    console.info('[POCKEY] Order request saved locally (demo mode):', payload);
  }

  orderSummary.innerHTML =
    '<b>' + esc(t('order.summary')) + '</b>' +
    '<span>' + esc(payload.productName) + '</span>' +
    '<span>' + esc(t('order.thickness')) + ': ' + esc(payload.thickness) + '</span>' +
    '<span>' + esc(t('order.qty')) + ': ' + esc(payload.quantity) + '</span>';
  orderForm.style.display = 'none';
  orderSuccess.classList.remove('show');
  void orderSuccess.offsetWidth;
  orderSuccess.classList.add('show');
});
$('#orderAgain').addEventListener('click', () => {
  orderSuccess.classList.remove('show');
  orderForm.style.display = '';
  orderForm.reset();
  populateOrderThickness('');
  clearErrs(orderForm);
});

/* Global delegating clicks: order / price-request / product */
document.addEventListener('click', e => {
  const orderBtn = e.target.closest('[data-order]');
  if (orderBtn) {
    const pid = orderBtn.getAttribute('data-order');
    if (pmodal.classList.contains('open')) closeModal(pmodal);
    openOrder(pid === '' ? '' : pid, pid && pmodalThickness && pmodalProduct && pmodalProduct.id === pid ? pmodalThickness : '');
    return;
  }
  const priceBtn = e.target.closest('[data-price-request]');
  if (priceBtn) {
    const pid = priceBtn.getAttribute('data-price-request');
    if (pmodal.classList.contains('open')) closeModal(pmodal);
    openOrder(pid, '');
    return;
  }
  const prodBtn = e.target.closest('[data-product]');
  if (prodBtn) {
    if (smodal.classList.contains('open')) closeModal(smodal);
    openProduct(prodBtn.getAttribute('data-product'));
  }
});

/* ============================================================
   SEARCH (Ctrl + K)
   ============================================================ */
const smodal = $('#searchModal');
const searchInput = $('#searchInput');
const searchResults = $('#searchResults');
let hotIndex = 0;

function openSearch() {
  openModal(smodal);
  setTimeout(() => searchInput.focus(), 60);
  renderSearchResults(searchInput.value);
}
function productHaystack(p) {
  const apps = p.apps.map(appLabel).join(' ').toLowerCase();
  const sizes = p.size + ' ' + p.thickness.map(v => v + t('products.mm')).join(' ');
  return (p.name + ' eps ' + p.grade + ' ' + p.density + ' ' + sizes + ' ' + apps).toLowerCase();
}
function renderSearchResults(q) {
  const query = (q || '').trim().toLowerCase();
  const list = !query ? P : P.filter(p => {
    return query.split(/\s+/).every(tok => productHaystack(p).includes(tok));
  });
  hotIndex = 0;
  if (!list.length) {
    searchResults.innerHTML =
      '<div class="semodal__empty">' + svgIcon('searchBig') +
        '<b>' + esc(t('search.empty')) + '</b><span>' + esc(t('search.try')) + '</span></div>';
    return;
  }
  searchResults.innerHTML = list.map((p, i) =>
    '<button class="sres' + (i === 0 ? ' hot' : '') + '" data-product="' + p.id + '">' +
      '<span class="sres__visual" aria-hidden="true"><span class="mini-foam"></span></span>' +
      '<span class="sres__main">' +
        '<span class="sres__name">' + esc(p.name) + '</span>' +
        '<span class="sres__meta">' + esc(p.density) + ' · ' + esc(t('products.thickness')) + ' ' + p.thickness[0] + '–' + p.thickness[p.thickness.length - 1] + ' ' + esc(t('products.mm')) + '</span>' +
      '</span>' +
      '<span class="sres__go">' + svgIcon('tag') + '</span>' +
    '</button>'
  ).join('');
}
searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
searchInput.addEventListener('keydown', e => {
  const items = $$('.sres', searchResults);
  if (!items.length) return;
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    hotIndex = clamp(hotIndex + (e.key === 'ArrowDown' ? 1 : -1), 0, items.length - 1);
    items.forEach((el, i) => el.classList.toggle('hot', i === hotIndex));
    items[hotIndex].scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'Enter') {
    e.preventDefault();
    items[hotIndex] && items[hotIndex].click();
  }
});
$('#searchBtn').addEventListener('click', openSearch);
$('#openSearchBtn').addEventListener('click', openSearch);
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault();
    smodal.classList.contains('open') ? closeModal(smodal) : openSearch();
  }
});

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForm = $('#contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrs(contactForm);
  const name = $('#cf-name');
  const phone = $('#cf-phone');
  const msg = $('#cf-msg');
  let ok = true;
  if (!name.value.trim() || name.value.trim().length < 2) { setErr(name, name.value.trim() ? 'order.errName' : 'order.errRequired'); ok = false; }
  if (!phone.value.trim()) { setErr(phone, 'order.errRequired'); ok = false; }
  else if (!validPhone(phone.value)) { setErr(phone, 'order.errPhone'); ok = false; }
  if (!msg.value.trim()) { setErr(msg, 'order.errRequired'); ok = false; }
  if (!ok) return;

  const payload = {
    type: 'message', ts: new Date().toISOString(), lang: LANG,
    name: name.value.trim(), phone: phone.value.trim(), message: msg.value.trim()
  };
  const all = store.get(ORDERS_KEY, []);
  all.push(payload);
  store.set(ORDERS_KEY, all);
  console.info('[POCKEY] Contact message saved locally (demo mode):', payload);

  contactForm.reset();
  const okEl = $('#contactOk');
  okEl.classList.add('show');
  setTimeout(() => okEl.classList.remove('show'), 6000);
});

/* ============================================================
   CONTACT INFO + FOOTER EXTRAS (from CONFIG)
   ============================================================ */
function fillContacts() {
  $$('[data-contact]').forEach(el => {
    const path = el.getAttribute('data-contact');
    const noteKey = el.getAttribute('data-note');
    let v = path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, CONFIG);
    if (v === null) return;
    if (noteKey === 'address' && LANG !== 'uz') {
      v = LANG === 'ru' ? 'Ташкент, Узбекистан' : 'Tashkent, Uzbekistan';
    }
    el.textContent = v;
  });
}
(function buildStatic() {
  // socials
  const socWrap = $('#socials');
  const paths = {
    telegram: '<path d="M21.9 4.6 18.9 19c-.2 1-.8 1.2-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-1 .5l.3-4.7L18.2 6.9c.4-.3-.1-.5-.6-.2L7.3 13.2 2.8 11.8c-1-.3-1-1 .2-1.5L20.6 3.1c.8-.3 1.5.2 1.3 1.5Z"/>',
    instagram: '<path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1Zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-10.5a1.4 1.4 0 1 0 0-2.9 1.4 1.4 0 0 0 0 2.9Z"/>',
    facebook: '<path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.6c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V21h3.4Z"/>',
    youtube: '<path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.6.4 8.5.4 8.5.4s6.9 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.7 3.1-5.7 3.1Z"/>'
  };
  socWrap.innerHTML = CONFIG.social.map(s =>
    '<a class="soc" href="' + esc(s.href) + '" target="_blank" rel="noopener" aria-label="' + esc(s.label) + '" title="' + esc(s.label) + '">' +
      '<svg viewBox="0 0 24 24" fill="currentColor">' + paths[s.id] + '</svg></a>'
  ).join('');

  // footer product links
  $('#footerProducts').innerHTML = P.map(p =>
    '<li><a href="#products" data-product-link="' + p.id + '">' + esc(p.name) + '</a></li>'
  ).join('');
  $$('[data-product-link]').forEach(a => {
    a.addEventListener('click', () => smoothTo('products'));
  });

  // contact links
  $('#contactPhoneLink').setAttribute('href', CONFIG.phone.href);
  $('#contactEmailLink').setAttribute('href', CONFIG.email.href);
  $('#contactTgLink').setAttribute('href', CONFIG.telegram.href);
  const map = $('#mapFrame');
  if (map) map.src = CONFIG.map.embed;

  // footer year
  $('#year').textContent = String(new Date().getFullYear());
})();

/* to-top */
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }));

/* ============================================================
   3D — Three.js (lazy loaded, paused off-screen)
   ============================================================ */
const POCKETY_3D = { hero: null, product: null, showcase: null };

function beadTexture(THREE) {
  const size = 256;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 460; i++) {
    const x = Math.random() * size, y = Math.random() * size;
    const r = 4 + Math.random() * 7;
    const g = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(.55, '#b9b9b9');
    g.addColorStop(1, '#6f6f6f');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 2);
  return tex;
}
function shadowTexture(THREE) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 256;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
  g.addColorStop(0, 'rgba(0,0,0,.42)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(cv);
}
function foamMaterial(THREE) {
  const bump = beadTexture(THREE);
  return new THREE.MeshStandardMaterial({
    color: 0xF2F6FB,
    roughness: 0.62,
    metalness: 0.02,
    bumpMap: bump,
    bumpScale: 0.45
  });
}
function webglOK() {
  try {
    const cv = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (cv.getContext('webgl2') || cv.getContext('webgl')));
  } catch (e) { return false; }
}

/* Visibility-aware render loop */
function makeLoop(renderFn) {
  let raf = 0, running = false, visible = true;
  const tick = t => { renderFn(t); raf = requestAnimationFrame(tick); };
  const start = () => { if (!running && visible && !document.hidden) { running = true; raf = requestAnimationFrame(tick); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  return {
    setVisible(v) { visible = v; v ? start() : stop(); },
    start, stop
  };
}

/* ---------- Static fallback for no-WebGL / reduced-motion ---------- */
function staticFallback(sel, src, cls) {
  const wrap = $(sel);
  if (!wrap || wrap.querySelector('img')) return;
  const img = new Image();
  img.src = src;
  img.alt = '';
  img.className = cls;
  img.decoding = 'async';
  wrap.appendChild(img);
}

async function initHero3D() {
  const wrap = $('#heroCanvasWrap');
  if (!wrap) return;
  if (!webglOK()) { staticFallback('#heroCanvasWrap', 'assets/img/product-block.jpg', 'hero-static'); return; }
  const THREE = await import('three');
  const { RoundedBoxGeometry } = await import('../vendor/RoundedBoxGeometry.js');

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  wrap.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  camera.position.set(0, 0.55, 7.4);

  scene.add(new THREE.HemisphereLight(0xEAF2FF, 0x11182A, 1.15));
  const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(4, 7, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x3E8BFF, 1.6); rim.position.set(-6, 2.5, -5); scene.add(rim);
  const fill = new THREE.DirectionalLight(0x35D2C2, 0.5); fill.position.set(3, -4, -4); scene.add(fill);

  const mat = foamMaterial(THREE);
  const group = new THREE.Group();
  scene.add(group);

  const block = new THREE.Mesh(new RoundedBoxGeometry(3.4, 1.5, 2.1, 4, 0.07), mat);
  group.add(block);

  const sheet = new THREE.Mesh(new RoundedBoxGeometry(2.2, 0.14, 1.45, 3, 0.05), mat.clone());
  sheet.position.set(0.75, 1.28, -0.7);
  sheet.rotation.set(0.06, -0.45, 0.03);
  group.add(sheet);

  const sheet2 = new THREE.Mesh(new RoundedBoxGeometry(1.9, 0.12, 1.3, 3, 0.05), mat.clone());
  sheet2.position.set(-1.15, -1.15, -0.4);
  sheet2.rotation.set(0.1, 0.55, -0.04);
  group.add(sheet2);

  // soft shadow
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 5),
    new THREE.MeshBasicMaterial({ map: shadowTexture(THREE), transparent: true, opacity: 0.55, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.85;
  scene.add(shadow);

  // foam beads particles
  const N = REDUCED ? 0 : 240;
  let points = null;
  let spd = null;
  if (N) {
    const pos = new Float32Array(N * 3);
    spd = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 0.5;
      spd[i] = 0.12 + Math.random() * 0.3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    points = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xBFD6F5, size: 0.055, transparent: true, opacity: 0.75, sizeAttenuation: true, depthWrite: false
    }));
    scene.add(points);
  }

  // pointer parallax
  let tx = 0, ty = 0;
  if (!REDUCED) {
    $('#home').addEventListener('pointermove', e => {
      const r = wrap.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5);
      ty = ((e.clientY - r.top) / r.height - 0.5);
    });
  }

  function resize() {
    const w = wrap.clientWidth || 1, h = wrap.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(wrap);
  resize();

  const clock = new THREE.Clock();
  const loop = makeLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.05);
    const et = clock.elapsedTime;
    group.position.y = REDUCED ? 0 : Math.sin(et * 0.8) * 0.16;
    group.rotation.y += (tx * 0.5 - group.rotation.y) * 0.04;
    group.rotation.x += (ty * 0.3 - group.rotation.x) * 0.04;
    block.rotation.z = Math.sin(et * 0.4) * 0.02;
    if (points) {
      const p = points.geometry.attributes.position;
      for (let i = 0; i < N; i++) {
        let y = p.getY(i) + spd[i] * dt;
        if (y > 3) y = -3;
        p.setY(i, y);
      }
      p.needsUpdate = true;
    }
    renderer.render(scene, camera);
  });

  const io = new IntersectionObserver(en => loop.setVisible(en[0].isIntersecting), { threshold: 0.02 });
  io.observe(wrap);
  loop.start();
  POCKETY_3D.hero = true;
}

/* ---------- Product modal mini scene (lazy: created on first open) ---------- */
let product3DPromise = null;

async function setupProduct3D() {
  const stage = $('#pmodalStage');
  if (!stage || !webglOK()) return null;
  const THREE = await import('three');
  const { RoundedBoxGeometry } = await import('../vendor/RoundedBoxGeometry.js');
  const { OrbitControls } = await import('../vendor/OrbitControls.js');

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  camera.position.set(0, 1.4, 5.6);

  scene.add(new THREE.HemisphereLight(0xEAF2FF, 0x101828, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(3.5, 6, 4.5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x3E8BFF, 1.5); rim.position.set(-5, 2, -4); scene.add(rim);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 3.4; controls.maxDistance = 10.5;
  controls.autoRotate = !REDUCED; controls.autoRotateSpeed = 1.1;
  controls.minPolarAngle = 0.3; controls.maxPolarAngle = 1.95;
  let idleTimer = 0;
  controls.addEventListener('start', () => { controls.autoRotate = false; clearTimeout(idleTimer); });
  controls.addEventListener('end', () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { controls.autoRotate = !REDUCED; }, 3600);
  });

  const group = new THREE.Group();
  scene.add(group);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 4.4),
    new THREE.MeshBasicMaterial({ map: shadowTexture(THREE), transparent: true, opacity: 0.5, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -1.25;
  scene.add(shadow);

  let mesh = null;
  function build(density, thickness) {
    if (mesh) { group.remove(mesh); mesh.geometry.dispose(); }
    const t = clamp(thickness, 10, 120) / 50;         // 50 mm ≈ 1 unit
    const geo = new RoundedBoxGeometry(3.2, 0.22 * t + 0.16, 2.05, 4, 0.06);
    mesh = new THREE.Mesh(geo, foamMaterial(THREE));
    group.add(mesh);
    /* 3/4 hero view: slightly above and to the corner so thin sheets read clearly */
    const k = 1.45 + 0.16 * (t - 1);
    camera.position.set(2.5 * k, 2.4 * k, 4.9 * k);
    controls.target.set(0, 0, 0); controls.update();
  }

  function resize() {
    const w = stage.clientWidth || 1, h = stage.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  const clock = new THREE.Clock();
  const loop = makeLoop(() => {
    controls.update();
    const et = clock.elapsedTime;
    group.position.y = REDUCED ? 0 : Math.sin(et * 0.9) * 0.1;
    renderer.render(scene, camera);
  });

  POCKETY_3D.product = true;
  const io = new IntersectionObserver(en => loop.setVisible(en[0].isIntersecting && pmodal.classList.contains('open')), { threshold: 0.02 });
  io.observe(stage);

  return {
    show(p, thickness) {
      const photo = stage.querySelector('.stage-photo');
      if (photo) photo.style.opacity = '0';
      build(p.densityValue, thickness);
      loop.start();
    }
  };
}

function requestProduct3D(p, thickness) {
  if (!product3DPromise) product3DPromise = setupProduct3D();
  product3DPromise.then(api => { if (api) api.show(p, thickness); }).catch(() => {});
}

/* ---------- Showcase scene ---------- */
async function initShowcase3D() {
  const stage = $('#showcaseStage');
  if (!stage) return;
  if (!webglOK()) { staticFallback('#showcaseStage', 'assets/img/product-block.jpg', 'showcase-static'); return; }
  const THREE = await import('three');
  const { RoundedBoxGeometry } = await import('../vendor/RoundedBoxGeometry.js');
  const { OrbitControls } = await import('../vendor/OrbitControls.js');

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
  camera.position.set(3.4, 2.6, 6.2);

  scene.add(new THREE.HemisphereLight(0xEAF2FF, 0x0E1524, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(5, 8, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x3E8BFF, 1.7); rim.position.set(-6, 3, -5); scene.add(rim);
  const fill = new THREE.DirectionalLight(0x35D2C2, 0.55); fill.position.set(2, -3, -5); scene.add(fill);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.minDistance = 4; controls.maxDistance = 11;
  controls.autoRotate = !REDUCED; controls.autoRotateSpeed = 0.9;
  controls.maxPolarAngle = Math.PI / 2 + 0.18;
  let idleTimer = 0;
  controls.addEventListener('start', () => { controls.autoRotate = false; clearTimeout(idleTimer); });
  controls.addEventListener('end', () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { controls.autoRotate = !REDUCED; }, 4000);
  });

  const group = new THREE.Group();
  scene.add(group);

  // reference grid (subtle engineering feel)
  const gridHelper = new THREE.GridHelper(18, 26, 0x3E8BFF, 0x24304A);
  gridHelper.material.transparent = true; gridHelper.material.opacity = 0.16;
  gridHelper.position.y = -1.55;
  scene.add(gridHelper);

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(7.5, 5.5),
    new THREE.MeshBasicMaterial({ map: shadowTexture(THREE), transparent: true, opacity: 0.6, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -1.52;
  scene.add(shadow);

  let mesh = null;
  let current = { density: 20, thickness: 50 };
  function build(density, thickness) {
    current = { density, thickness };
    if (mesh) { group.remove(mesh); mesh.geometry.dispose(); }
    const t = clamp(thickness, 10, 120) / 50;
    const geo = new RoundedBoxGeometry(3.6, 0.26 * t + 0.16, 2.2, 4, 0.07);
    mesh = new THREE.Mesh(geo, foamMaterial(THREE));
    group.add(mesh);
    updateWeight();
  }
  function updateWeight() {
    // 1000×2000 mm sheet: area 2 m², weight = area × thickness(m) × density
    const kg = 2 * (current.thickness / 1000) * current.density;
    $('#showWeight').textContent = kg.toFixed(2).replace('.', ',') + ' kg';
  }
  build(20, 50);

  function resize() {
    const w = stage.clientWidth || 1, h = stage.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  const clock = new THREE.Clock();
  const loop = makeLoop(() => {
    controls.update();
    const et = clock.elapsedTime;
    group.position.y = REDUCED ? 0 : Math.sin(et * 0.8) * 0.12;
    renderer.render(scene, camera);
  });

  $$('.show-th').forEach(b => {
    b.addEventListener('click', () => {
      $$('.show-th').forEach(x => x.classList.toggle('active', x === b));
      build(current.density, Number(b.dataset.th));
    });
  });
  $$('.show-den').forEach(b => {
    b.addEventListener('click', () => {
      $$('.show-den').forEach(x => x.classList.toggle('active', x === b));
      build(Number(b.dataset.den), current.thickness);
    });
  });

  const io = new IntersectionObserver(en => loop.setVisible(en[0].isIntersecting), { threshold: 0.05 });
  io.observe(stage);
  loop.start();
  POCKETY_3D.showcase = true;
}

/* ============================================================
   BOOT
   ============================================================ */
function boot() {
  LANG = store.get(LANG_KEY, 'uz');
  if (!window.I18N.langs.includes(LANG)) LANG = 'uz';
  initTheme();
  applyI18n();
  renderStrip();
  buildThicknessFilter();
  renderProducts();
  populateOrderProducts();
  populateOrderThickness('');
  initAnchors();
  initActiveNav();
  initReveal();
  initQualityPings();
  initTilt(document);
  onScroll();

  if (!REDUCED) {
    /* Start 3D after first paint (idle) so it never blocks initial render */
    const start3D = () => {
      initHero3D().catch(() => staticFallback('#heroCanvasWrap', 'assets/img/product-block.jpg', 'hero-static'));
      initShowcase3D().catch(() => staticFallback('#showcaseStage', 'assets/img/product-block.jpg', 'showcase-static'));
    };
    if ('requestIdleCallback' in window) requestIdleCallback(start3D, { timeout: 1500 });
    else setTimeout(start3D, 350);
  } else {
    /* Reduced motion: elegant static product visuals instead of animated 3D */
    staticFallback('#heroCanvasWrap', 'assets/img/product-block.jpg', 'hero-static');
    staticFallback('#showcaseStage', 'assets/img/product-block.jpg', 'showcase-static');
  }
  // Product modal 3D loads lazily on first open (works in reduced-motion as a static frame)

  // hero line intro
  requestAnimationFrame(() => document.body.classList.add('loaded'));
}
boot();
