// Shared, reusable page components (header, footer, images, forms, SEO head, schema).
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, NAV, bookingUrl } from './data/site.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const META = JSON.parse(readFileSync(path.join(here, 'image-meta.json'), 'utf8'));
export const VERSION = Date.now().toString(36);

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const abs = p => SITE.origin + p;
export const imgMeta = key => META[key];
export const imgUrl = (key, w = 1600) => {
  const m = META[key];
  if (!m) throw new Error(`Unknown image: ${key}`);
  const width = m.widths.includes(w) ? w : m.widths[m.widths.length - 1];
  return `/images/${key}-${width}.webp`;
};
export const ogUrl = key => abs(`/images/${key}-og.jpg`);

/** Responsive <picture> with AVIF + WebP, intrinsic size (no CLS) and colour placeholder. */
export function pic(key, { alt = '', sizes = '100vw', cls = '', eager = false, priority = false, imgCls = '' } = {}) {
  const m = META[key];
  if (!m) throw new Error(`Unknown image: ${key}`);
  const set = ext => m.widths.map(w => `/images/${key}-${w}.${ext} ${Math.min(w, m.w)}w`).join(', ');
  const fallbackW = m.widths.includes(960) ? 960 : m.widths[m.widths.length - 1];
  return `<picture class="${cls}" style="--ph:${m.color}"><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img class="${imgCls}" src="/images/${key}-${fallbackW}.webp" width="${m.w}" height="${m.h}" alt="${esc(alt)}" ${eager ? 'loading="eager"' : 'loading="lazy"'} decoding="async"${priority ? ' fetchpriority="high"' : ''}></picture>`;
}

export const icon = (name, cls = '') => `<svg class="ico ${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;

const ICONS = {
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
  phone: '<path d="M6.6 3.5 9 3l1.6 4-2 1.3a11 11 0 0 0 5.1 5.1l1.3-2 4 1.6-.5 2.4A2 2 0 0 1 16.6 17 13.6 13.6 0 0 1 3 3.4a2 2 0 0 1 1.6-1.9" transform="translate(1.5 2)" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
  whatsapp: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M9 8.2c.2-.4.5-.4.8-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.1.3 0 .5a6 6 0 0 0 2.9 2.6c.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .9-.6 1.8-1.6 1.9-1 .2-2.3 0-4.3-1.4a9.5 9.5 0 0 1-3-3.6c-.6-1.4-.3-2.4.5-3.2Z" fill="currentColor"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="m3.5 6 8.5 7 8.5-7" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 9.5h17M8 3v4m8-4v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  user: '<circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  bed: '<path d="M3 18V7m0 7h18v4M3 14V11h7a2 2 0 0 1 2 2v1m9 0v-2a3 3 0 0 0-3-3h-6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
  area: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5m11-5v5h-5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8Z" fill="currentColor"/>',
  play: '<path d="M8 5.5v13l10.5-6.5Z" fill="currentColor"/>',
  close: '<path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  plus: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  chevron: '<path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  facebook: '<path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21" fill="currentColor"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="3.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="m10 9.2 5 2.8-5 2.8Z" fill="currentColor"/>',
  tripadvisor: '<circle cx="7.5" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="16.5" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M4 9.5C6 7.5 9 6.5 12 6.5s6 1 8 3" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  sun: '<g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M12 12.6a1 1 0 1 1 1-1.4 2 2 0 0 1-2.4 2.6 3 3 0 0 1-1.9-3.7A4 4 0 0 1 14 7.6a5 5 0 0 1 2.4 6"/><path d="M12 2.5c1.4 1 1.6 2.3 1 3.4M19.2 5c.1 1.7-.7 2.7-1.9 3M21.5 12c-1 1.4-2.3 1.6-3.4 1M19 19.2c-1.7.1-2.7-.7-3-1.9M12 21.5c-1.4-1-1.6-2.3-1-3.4M4.8 19c-.1-1.7.7-2.7 1.9-3M2.5 12c1-1.4 2.3-1.6 3.4-1M5 4.8c1.7-.1 2.7.7 3 1.9"/></g>',
};
const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${Object.entries(ICONS).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('')}</defs></svg>`;

export const btn = (label, href, { variant = 'solid', cls = '', attrs = '' } = {}) =>
  `<a class="btn btn--${variant} ${cls}" href="${href}" data-magnetic ${attrs}><span class="btn__label">${esc(label)}</span>${icon('arrow', 'btn__ico')}</a>`;

export const eyebrow = t => `<p class="eyebrow">${icon('sun')}<span>${esc(t)}</span></p>`;

// ---------------------------------------------------------------- Schema
export const ORG_ID = `${SITE.origin}/#organization`;
export const HOTEL_ID = `${SITE.origin}/#hotel`;
export const WEBSITE_ID = `${SITE.origin}/#website`;

export function hotelSchema() {
  return {
    '@type': ['Hotel', 'Resort'],
    '@id': HOTEL_ID,
    name: SITE.name,
    url: SITE.origin + '/',
    description: 'Manas Lifestyle Resort is a luxury resort on the Mumbai–Agra Highway at Talegaon, Igatpuri, offering cottages, rooms, suites and private pool villas, multi-cuisine dining, banquet halls and lawns for weddings and corporate events, a swimming pool, rain dance and indoor and outdoor games.',
    image: [ogUrl('pool-2'), ogUrl('lawn-top'), ogUrl('wedding-1')],
    logo: abs('/images/logo-dark.png'),
    telephone: SITE.phones.reservations.tel,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region, postalCode: SITE.address.postalCode, addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.mapsUrl,
    parentOrganization: { '@id': ORG_ID },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: SITE.phones.reservations.tel, contactType: 'reservations', areaServed: 'IN', availableLanguage: ['en', 'hi', 'mr'] },
      { '@type': 'ContactPoint', telephone: SITE.phones.corporate.tel, contactType: 'sales', name: 'Corporate & group enquiries', areaServed: 'IN' },
      { '@type': 'ContactPoint', telephone: SITE.phones.weddings.tel, contactType: 'sales', name: 'Wedding enquiries', email: SITE.weddingEmail, areaServed: 'IN' },
    ],
    amenityFeature: ['Swimming pool', 'Rain dance', 'Arcade games', 'Indoor games', 'Outdoor games', 'Cricket turf', 'Pickleball court', 'Pottery making', 'EV charging station', 'Free parking', 'Banquet halls', 'Wedding lawns', 'Multi-cuisine restaurant', 'Bar lounge', 'In-room dining', 'Wi-Fi']
      .map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    petsAllowed: false,
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.youtube, SITE.social.tripadvisor],
    containsPlace: [{ '@id': `${SITE.origin}/dining/#baithak` }, { '@id': `${SITE.origin}/banquets/#venues` }],
  };
}

export function baseGraph() {
  return [
    {
      '@type': 'Organization', '@id': ORG_ID, name: SITE.name, url: SITE.origin + '/',
      logo: { '@type': 'ImageObject', url: abs('/images/logo-dark.png') },
      email: SITE.email, telephone: SITE.phones.reservations.tel,
      address: { '@type': 'PostalAddress', streetAddress: SITE.headOffice, addressLocality: 'Mumbai', postalCode: '400072', addressRegion: 'Maharashtra', addressCountry: 'IN' },
      sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.youtube, SITE.social.tripadvisor],
    },
    { '@type': 'WebSite', '@id': WEBSITE_ID, url: SITE.origin + '/', name: SITE.name, publisher: { '@id': ORG_ID }, inLanguage: 'en-IN' },
  ];
}

export const faqSchema = faqs => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
});

export const breadcrumbSchema = crumbs => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: abs(c.href) })),
});

// ---------------------------------------------------------------- Head
export function head({ title, description, path: p, image = 'pool-2', type = 'website', schema = [], noindex = false, preload, crumbs }) {
  const url = abs(p);
  const graph = [...baseGraph(), {
    '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': HOTEL_ID }, inLanguage: 'en-IN', primaryImageOfPage: ogUrl(image),
    ...(crumbs ? { breadcrumb: breadcrumbSchema(crumbs) } : {}),
  }, ...schema];
  const gtm = SITE.gtmId ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');</script>` : '';
  const ga = !SITE.gtmId && SITE.ga4Id ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${SITE.ga4Id}');</script>` : '';
  return `<!doctype html>
<html lang="en-IN" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
<meta name="theme-color" content="#16291F">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogUrl(image)}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogUrl(image)}">
<meta name="geo.region" content="IN-MH"><meta name="geo.placename" content="Igatpuri"><meta name="geo.position" content="${SITE.geo.lat};${SITE.geo.lng}"><meta name="ICBM" content="${SITE.geo.lat}, ${SITE.geo.lng}">
<link rel="icon" href="/images/favicon-32.png" sizes="32x32"><link rel="icon" href="/images/favicon-192.png" sizes="192x192"><link rel="apple-touch-icon" href="/images/favicon-180.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/outfit-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/libre-caslon-display-latin.woff2" as="font" type="font/woff2" crossorigin>
${preload || ''}
<link rel="stylesheet" href="/css/main.css?v=${VERSION}">
<script>(function(d){var c=d.documentElement;c.className='js';if(!matchMedia('(prefers-reduced-motion: reduce)').matches){c.classList.add('motion');if(innerWidth>1023)try{if(!sessionStorage.getItem('mlr-visited'))c.classList.add('first-visit')}catch(e){}}setTimeout(function(){if(!window.__mlrReady)c.classList.remove('motion','first-visit')},3500)})(document)</script>
${gtm}${ga}
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>`;
}

// ---------------------------------------------------------------- Header / nav
function navLinks(current) {
  return NAV.map(item => {
    const active = current === item.href || (item.children || []).some(c => c.href === current) ? ' aria-current="page"' : '';
    if (!item.children) return `<li class="nav__item"><a class="nav__link" href="${item.href}"${active}>${item.label}</a></li>`;
    return `<li class="nav__item nav__item--has-menu"><a class="nav__link" href="${item.href}"${active} aria-haspopup="true">${item.label}</a><div class="nav__menu"><ul>${item.children.map(c => `<li><a href="${c.href}">${c.label}</a></li>`).join('')}</ul></div></li>`;
  }).join('');
}

export function header(current, { solid = false } = {}) {
  return `<a class="skip" href="#main">Skip to content</a>
${SPRITE}
<div class="preloader" aria-hidden="true"><div class="preloader__inner"><img src="/images/favicon-192.png" width="96" height="96" alt=""><span class="preloader__bar"><i></i></span></div></div>
<div class="curtain" aria-hidden="true"></div>
<header class="site-header${solid ? ' is-solid' : ''}" data-header>
  <div class="site-header__inner">
    <a class="brand" href="/" aria-label="${SITE.name} — home">
      <img class="brand__light" src="/images/logo-reverse.webp" width="640" height="249" alt="${SITE.name}">
      <img class="brand__dark" src="/images/logo-dark.webp" width="640" height="249" alt="" aria-hidden="true">
    </a>
    <nav class="nav" aria-label="Main"><ul class="nav__list">${navLinks(current)}</ul></nav>
    <div class="site-header__actions">
      <a class="header-phone" href="tel:${SITE.phones.reservations.tel}" data-track="phone_click">${icon('phone')}<span>${SITE.phones.reservations.display}</span></a>
      <a class="btn btn--gold btn--sm" href="${bookingUrl()}" data-book data-magnetic rel="noopener"><span class="btn__label">Book now</span></a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-menu" data-burger><span class="sr-only">Menu</span><i></i><i></i></button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" hidden data-mobile-menu>
  <div class="mobile-menu__bg">${pic('pool-2', { alt: '', sizes: '100vw' })}</div>
  <nav class="mobile-menu__nav" aria-label="Mobile">
    <ul>${NAV.map((i, n) => `<li style="--i:${n}"><a href="${i.href}">${i.label}</a>${i.children ? `<ul class="mobile-menu__sub">${i.children.map(c => `<li><a href="${c.href}">${c.label}</a></li>`).join('')}</ul>` : ''}</li>`).join('')}</ul>
  </nav>
  <div class="mobile-menu__foot">
    <a href="tel:${SITE.phones.reservations.tel}" data-track="phone_click">${icon('phone')} ${SITE.phones.reservations.display}</a>
    <a href="mailto:${SITE.email}">${icon('mail')} ${SITE.email}</a>
  </div>
</div>`;
}

// ---------------------------------------------------------------- Booking bar
export function bookingBar({ variant = 'float', id = 'booking' } = {}) {
  const opts = (n, unit) => Array.from({ length: n }, (_, i) => `<option value="${i + 1}">${i + 1} ${unit}${i ? 's' : ''}</option>`).join('');
  return `<form class="booking booking--${variant}" id="${id}" action="${SITE.booking.base}" method="get" target="_blank" data-booking aria-label="Check availability">
  <input type="hidden" name="propertyId" value="${SITE.booking.propertyId}"><input type="hidden" name="promocode" value="${SITE.booking.promocode}">
  <label class="booking__field">${icon('calendar')}<span class="booking__label">Check in</span><input type="date" name="checkIn" required data-checkin></label>
  <label class="booking__field">${icon('calendar')}<span class="booking__label">Check out</span><input type="date" name="checkOut" required data-checkout></label>
  <label class="booking__field">${icon('bed')}<span class="booking__label">Rooms</span><select name="rooms">${opts(5, 'room')}</select></label>
  <label class="booking__field">${icon('user')}<span class="booking__label">Guests</span><select name="adults"><option value="2" selected>2 adults</option><option value="1">1 adult</option><option value="3">3 adults</option><option value="4">4 adults</option><option value="5">5+ adults</option></select></label>
  <button class="btn btn--gold booking__submit" type="submit" data-magnetic><span class="btn__label">Check availability</span>${icon('arrow', 'btn__ico')}</button>
  <p class="booking__note">Best rate on our official site · <a href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello Manas Lifestyle Resort, I would like to check room availability.')}" target="_blank" rel="noopener" data-track="whatsapp_click">Ask on WhatsApp</a></p>
</form>`;
}

// ---------------------------------------------------------------- Enquiry forms
const FORM_TYPES = {
  accommodation: { title: 'Accommodation enquiry', submit: 'Send stay enquiry', fields: ['dates', 'guests', 'roomType'] },
  wedding: { title: 'Wedding enquiry', submit: 'Plan my wedding', fields: ['eventDate', 'guestCount', 'functions', 'stay'] },
  banquet: { title: 'Banquet enquiry', submit: 'Check venue availability', fields: ['eventDate', 'guestCount', 'eventType', 'venue'] },
  corporate: { title: 'Corporate enquiry', submit: 'Request a proposal', fields: ['company', 'eventDate', 'guestCount', 'eventType', 'stay'] },
  school: { title: 'School picnic enquiry', submit: 'Request picnic details', fields: ['school', 'eventDate', 'guestCount'] },
  general: { title: 'General enquiry', submit: 'Send message', fields: [] },
};

export function enquiryForm(type = 'general', { heading, intro } = {}) {
  const t = FORM_TYPES[type];
  const f = new Set(t.fields);
  const field = (name, label, input, cls = '') => `<div class="field ${cls}"><label for="${type}-${name}">${label}</label>${input}<p class="field__error" id="${type}-${name}-err" aria-live="polite"></p></div>`;
  const inp = (name, attrs) => `<input id="${type}-${name}" name="${name}" aria-describedby="${type}-${name}-err" ${attrs}>`;
  const sel = (name, options, req = '') => `<select id="${type}-${name}" name="${name}" ${req}>${options.map(o => `<option${o === '' ? ' value=""' : ''}>${o || 'Select'}</option>`).join('')}</select>`;
  return `<form class="enquiry" action="${SITE.enquiryEndpoint}" method="post" novalidate data-enquiry="${type}">
  ${heading ? `<h3 class="enquiry__title">${heading}</h3>` : ''}${intro ? `<p class="enquiry__intro">${intro}</p>` : ''}
  <input type="hidden" name="type" value="${type}"><input type="hidden" name="page" value="" data-page><input type="hidden" name="ts" value="" data-ts>
  <div class="hp" aria-hidden="true"><label>Leave this empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
  <div class="enquiry__grid">
    ${field('name', 'Full name *', inp('name', 'type="text" autocomplete="name" required minlength="2" maxlength="80"'))}
    ${field('phone', 'Mobile number *', inp('phone', 'type="tel" autocomplete="tel" required pattern="[0-9+()\\-\\s]{10,16}" inputmode="tel"'))}
    ${field('email', 'Email *', inp('email', 'type="email" autocomplete="email" required maxlength="120"'), 'field--wide')}
    ${f.has('company') ? field('company', 'Company', inp('company', 'type="text" autocomplete="organization" maxlength="100"')) : ''}
    ${f.has('school') ? field('school', 'School name', inp('school', 'type="text" maxlength="120"')) : ''}
    ${f.has('dates') ? field('checkin', 'Check in', inp('checkin', 'type="date" data-checkin')) + field('checkout', 'Check out', inp('checkout', 'type="date" data-checkout')) : ''}
    ${f.has('eventDate') ? field('eventDate', 'Preferred date', inp('eventDate', 'type="date" data-future')) : ''}
    ${f.has('guests') ? field('guests', 'Guests', sel('guests', ['', '1–2', '3–4', '5–8', '9–15', '16+'])) : ''}
    ${f.has('guestCount') ? field('guestCount', 'Expected guests', sel('guestCount', ['', 'Up to 50', '50–150', '150–350', '350–700', '700+'])) : ''}
    ${f.has('roomType') ? field('roomType', 'Preferred stay', sel('roomType', ['', 'Any room or suite', 'Luxury Cottage', 'Premium Room', 'Urban Room', 'Luxe Room', 'Junior Suite', 'Studio Suite', 'Suite', 'Signature Suite', 'Harmony Suite', 'Royal Villa 4 BHK', 'Urban Villa 4 BHK', 'Urban Villa 6 BHK', 'Urban Villa 7 BHK'])) : ''}
    ${f.has('functions') ? field('functions', 'Functions', sel('functions', ['', 'Wedding & reception', 'Full wedding (Mehendi, Sangeet, Haldi, wedding)', 'Engagement', 'Reception only', 'Intimate ceremony'])) : ''}
    ${f.has('eventType') ? field('eventType', 'Event type', sel('eventType', type === 'corporate' ? ['', 'Day conference', 'Residential conference', 'Annual event', 'Doctor conference', 'Quarterly meet', 'Seminar', 'Staff outing / day picnic', 'Team offsite'] : ['', 'Wedding / reception', 'Engagement', 'Birthday / anniversary', 'Social gathering', 'Conference / meeting'])) : ''}
    ${f.has('venue') ? field('venue', 'Venue preference', sel('venue', ['', 'Mist Ballroom', 'Mist I / Mist II', 'Royal Lawn', 'Cottage Lawn', 'Not sure yet'])) : ''}
    ${f.has('stay') ? field('stay', 'Overnight stay?', sel('stay', ['', 'Yes, rooms needed', 'No, day event only', 'Not sure yet'])) : ''}
    ${field('message', 'Message', `<textarea id="${type}-message" name="message" rows="4" maxlength="2000" aria-describedby="${type}-message-err"></textarea>`, 'field--wide')}
  </div>
  <label class="consent"><input type="checkbox" name="consent" required> <span>I agree to be contacted about this enquiry. See our <a href="/privacy-policy/">privacy policy</a>.</span></label>
  <div class="enquiry__actions">
    <button class="btn btn--solid" type="submit" data-magnetic><span class="btn__label">${t.submit}</span>${icon('arrow', 'btn__ico')}</button>
    <a class="link-wa" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp')} Prefer WhatsApp?</a>
  </div>
  <div class="enquiry__status" role="status" aria-live="polite" tabindex="-1"></div>
</form>`;
}

// ---------------------------------------------------------------- Page furniture
export function breadcrumbs(crumbs) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs.map((c, i) => i === crumbs.length - 1 ? `<li aria-current="page">${esc(c.label)}</li>` : `<li><a href="${c.href}">${esc(c.label)}</a></li>`).join('')}</ol></nav>`;
}

export function pageHero({ image, eyebrow: eb, title, lead, crumbs, alt = '', size = 'lg', actions = '' }) {
  return `<section class="phero phero--${size}" data-phero>
  <div class="phero__media" data-parallax="0.18">${pic(image, { alt, eager: true, priority: true, sizes: '100vw' })}</div>
  <div class="phero__shade"></div>
  <div class="phero__content container">
    ${crumbs ? breadcrumbs(crumbs) : ''}
    ${eb ? eyebrow(eb) : ''}
    <h1 class="phero__title" data-split>${title}</h1>
    ${lead ? `<p class="phero__lead" data-reveal>${lead}</p>` : ''}
    ${actions ? `<div class="phero__actions" data-reveal>${actions}</div>` : ''}
  </div>
</section>`;
}

export function faqBlock(faqs, { title = 'Questions guests ask', id = 'faq', intro = '' } = {}) {
  return `<section class="section faq" id="${id}">
  <div class="container faq__grid">
    <div class="faq__head">${eyebrow('Good to know')}<h2 class="h2" data-split>${title}</h2>${intro ? `<p class="lead" data-reveal>${intro}</p>` : ''}</div>
    <div class="faq__list">${faqs.map(([q, a]) => `<details class="faq__item" data-reveal><summary><span>${esc(q)}</span>${icon('plus')}</summary><div class="faq__a"><p>${a}</p></div></details>`).join('')}</div>
  </div>
</section>`;
}

export function ctaBand({ title = 'Your next unforgettable escape begins here.', text = '', image = 'pool-1', primary = ['Book your stay', bookingUrl()], secondary = ['Plan your celebration', '/weddings/'] } = {}) {
  return `<section class="cta-band" data-cta>
  <div class="cta-band__media" data-scale>${pic(image, { alt: '', sizes: '100vw' })}</div>
  <div class="cta-band__shade"></div>
  <div class="container cta-band__content">
    ${eyebrow('Manas Lifestyle Resort, Igatpuri')}
    <h2 class="display" data-split>${title}</h2>
    ${text ? `<p class="lead" data-reveal>${text}</p>` : ''}
    <div class="cta-band__actions" data-reveal>${btn(primary[0], primary[1], { variant: 'gold', attrs: primary[1].startsWith('http') ? 'data-book rel="noopener"' : '' })}${btn(secondary[0], secondary[1], { variant: 'ghost' })}</div>
  </div>
</section>`;
}

export function footer() {
  const P = SITE.phones;
  return `<footer class="site-footer" data-footer>
  <div class="container site-footer__top">
    <div class="site-footer__brand">
      <img src="/images/logo-reverse.webp" width="640" height="249" alt="${SITE.name}" loading="lazy">
      <p>A luxury resort in the Sahyadri hills at Igatpuri — 120 km from Mumbai, 40 km from Nashik. ${SITE.legalNote}.</p>
      <div class="social">
        <a href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
        <a href="${SITE.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
        <a href="${SITE.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${icon('youtube')}</a>
        <a href="${SITE.social.tripadvisor}" target="_blank" rel="noopener" aria-label="Tripadvisor">${icon('tripadvisor')}</a>
      </div>
    </div>
    <div class="site-footer__col"><h2>Stay</h2><ul>
      <li><a href="/all-accommodations/">All accommodation</a></li><li><a href="/rooms/luxury-cottage/">Luxury Cottages</a></li><li><a href="/rooms/premium-room/">Premium Rooms</a></li><li><a href="/rooms/signature-suite/">Signature Suite</a></li><li><a href="/villas/">Private pool villas</a></li><li><a href="/offers/">Offers</a></li></ul></div>
    <div class="site-footer__col"><h2>Experience</h2><ul>
      <li><a href="/facilities/">Activities &amp; facilities</a></li><li><a href="/dining/">Dining</a></li><li><a href="/weddings/">Weddings</a></li><li><a href="/banquets/">Banquets &amp; lawns</a></li><li><a href="/corporate/">Corporate events</a></li><li><a href="/school-picnic/">School picnics</a></li><li><a href="/gallery/">Gallery</a></li></ul></div>
    <div class="site-footer__col"><h2>Contact</h2><ul class="contact-list">
      <li>${icon('pin')}<a href="${SITE.mapsUrl}" target="_blank" rel="noopener">${SITE.address.full}</a></li>
      <li>${icon('phone')}<span>Rooms <a href="tel:${P.reservations.tel}" data-track="phone_click">${P.reservations.display}</a><br>Corporate <a href="tel:${P.corporate.tel}" data-track="phone_click">${P.corporate.display}</a><br>Weddings <a href="tel:${P.weddings.tel}" data-track="phone_click">${P.weddings.display}</a></span></li>
      <li>${icon('mail')}<a href="mailto:${SITE.email}">${SITE.email}</a></li></ul>
      ${btn('Book your stay', bookingUrl(), { variant: 'gold', cls: 'btn--sm', attrs: 'data-book rel="noopener"' })}
    </div>
  </div>
  <div class="container site-footer__mark" aria-hidden="true"><span data-footer-mark>Manas</span></div>
  <div class="container site-footer__bottom">
    <p>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
    <ul><li><a href="/about/">About</a></li><li><a href="/location/">Location</a></li><li><a href="/faq/">FAQs</a></li><li><a href="/blog/">Journal</a></li><li><a href="/sitemap/">Sitemap</a></li><li><a href="/privacy-policy/">Privacy</a></li><li><a href="/terms-and-conditions/">Terms</a></li></ul>
  </div>
</footer>
<nav class="dock" aria-label="Quick contact">
  <a href="tel:${P.reservations.tel}" data-track="phone_click">${icon('phone')}<span>Call</span></a>
  <a href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello Manas Lifestyle Resort, I have an enquiry.')}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp')}<span>WhatsApp</span></a>
  <a class="dock__book" href="${bookingUrl()}" rel="noopener" data-book>${icon('calendar')}<span>Book now</span></a>
</nav>
<div class="cursor" aria-hidden="true"><span class="cursor__dot"></span><span class="cursor__ring"><em>View</em></span></div>`;
}

export function scripts(extra = '') {
  return `<script src="/js/vendor/gsap-gsap.min.js" defer></script>
<script src="/js/vendor/gsap-ScrollTrigger.min.js" defer></script>
<script src="/js/vendor/lenis-lenis.min.js" defer></script>
<script src="/js/vendor/split-type-index.min.js" defer></script>
${extra}
<script type="module" src="/js/main.js?v=${VERSION}"></script>`;
}

export const SWIPER = `<link rel="stylesheet" href="/js/vendor/swiper-swiper-bundle.min.css"><script src="/js/vendor/swiper-swiper-bundle.min.js" defer></script>`;

export function layout({ meta, current, body, solidHeader = false, swiper = false }) {
  return `${head(meta)}
<body data-page="${esc(meta.path)}">
${header(current ?? meta.path, { solid: solidHeader })}
<main id="main">
${body}
</main>
${footer()}
${scripts(swiper ? SWIPER : '')}
</body>
</html>`;
}

export { SITE, bookingUrl };
