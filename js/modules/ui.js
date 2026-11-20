// Interaction details: magnetic buttons, custom cursor, stay-index image preview,
// carousels (Swiper), click-to-load map.

export function initUi({ reduced }) {
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduced) {
    magnetic();
    cursor();
    stayPreview();
  }
  carousels(reduced);
  lazyMap();
  stayTabs();
}

function magnetic() {
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    const strength = 0.28;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
      el.style.transform = '';
      setTimeout(() => { el.style.transition = ''; }, 600);
    });
  });
}

function cursor() {
  const c = document.querySelector('.cursor');
  if (!c) return;
  document.documentElement.classList.add('has-cursor');
  const dot = c.querySelector('.cursor__dot');
  const ring = c.querySelector('.cursor__ring');
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  window.addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; c.classList.remove('is-hidden'); }, { passive: true });
  document.addEventListener('pointerleave', () => c.classList.add('is-hidden'));
  const loop = () => {
    rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
    dot.style.transform = `translate(${x}px, ${y}px)`;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.addEventListener('pointerover', e => {
    const t = e.target;
    c.classList.toggle('is-view', !!t.closest('[data-cursor="view"], .stay-card, .hx-card, .masonry__item, .duo-card, .post-card'));
    c.classList.toggle('is-hover', !!t.closest('a, button, summary, select, input, label'));
  });
}

function stayPreview() {
  const list = document.querySelector('[data-stay-index]');
  if (!list) return;
  const box = document.createElement('div');
  box.className = 'stay-preview';
  box.setAttribute('aria-hidden', 'true');
  const imgs = new Map();
  list.querySelectorAll('a[data-preview]').forEach(a => {
    const img = new Image();
    img.decoding = 'async';
    img.alt = '';
    img.dataset.src = a.dataset.preview;
    box.append(img);
    imgs.set(a, img);
  });
  document.body.append(box);
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const follow = () => {
    cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
    box.style.left = `${cx}px`; box.style.top = `${cy}px`;
    raf = requestAnimationFrame(follow);
  };
  list.addEventListener('pointerenter', e => { cx = tx = e.clientX; cy = ty = e.clientY; box.classList.add('is-on'); raf = requestAnimationFrame(follow); });
  list.addEventListener('pointerleave', () => { box.classList.remove('is-on'); cancelAnimationFrame(raf); });
  list.addEventListener('pointermove', e => { tx = e.clientX + 170; ty = e.clientY; });
  imgs.forEach((img, a) => a.addEventListener('pointerenter', () => {
    if (!img.src) img.src = img.dataset.src;
    imgs.forEach(i => i.classList.toggle('is-on', i === img));
  }));
}

function carousels(reduced) {
  const els = document.querySelectorAll('[data-swiper]');
  if (!els.length) return;
  if (typeof window.Swiper === 'undefined') { els.forEach(el => el.classList.add('no-swiper')); return; }
  els.forEach(el => {
    const kind = el.dataset.swiper;
    const container = el.querySelector('.swiper');
    const count = el.querySelector('[data-count-current]');
    const sw = new window.Swiper(container, {
      slidesPerView: 'auto',
      spaceBetween: kind === 'reviews' ? 20 : 16,
      speed: reduced ? 0 : 900,
      grabCursor: true,
      loop: false,
      centeredSlides: kind === 'gallery',
      centeredSlidesBounds: true,
      keyboard: { enabled: true, onlyInViewport: true },
      a11y: { enabled: true },
      navigation: { prevEl: el.querySelector('.prev'), nextEl: el.querySelector('.next') },
      autoplay: kind === 'reviews' && !reduced ? { delay: 6000, disableOnInteraction: true, pauseOnMouseEnter: true } : false,
      on: { slideChange: s => { if (count) count.textContent = String(s.activeIndex + 1).padStart(2, '0'); } },
    });
    return sw;
  });
}

function lazyMap() {
  document.querySelectorAll('[data-map]').forEach(box => {
    const btn = box.querySelector('button');
    btn?.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = box.dataset.map;
      f.title = 'Map showing Manas Lifestyle Resort, Igatpuri';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      box.innerHTML = '';
      box.append(f);
    });
  });
}

// Homepage accommodation showcase: category tabs (ARIA tabs pattern) + stay picker.
function stayTabs() {
  const tabs = [...document.querySelectorAll('[data-tab]')];
  if (!tabs.length) return;
  const select = tab => {
    tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    document.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== tab.dataset.tab; });
    window.ScrollTrigger?.refresh();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      n.focus(); select(n);
    });
  });
  document.querySelectorAll('[data-pick]').forEach(btn => btn.addEventListener('click', () => {
    const panel = btn.closest('[data-panel]');
    panel.querySelectorAll('[data-pick]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    panel.querySelectorAll('[data-feature]').forEach(f => { f.hidden = f.dataset.feature !== btn.dataset.pick; });
  }));
}
