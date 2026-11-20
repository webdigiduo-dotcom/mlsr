// GSAP-powered motion system: preloader, smooth scroll, split-text headlines, clip-path
// image reveals, parallax, scaling media, counters, horizontal experiences, footer mark.
// Only runs when the visitor has not asked for reduced motion.

const { gsap, ScrollTrigger } = window;
const EASE = 'expo.out';

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: EASE, duration: 1.2 });

  const lenis = initLenis();
  const ready = preloader();

  ready.then(() => {
    heroIntro();
    splitHeadings();
    reveals();
    clipReveals();
    parallax();
    scaleMedia();
    counters();
    horizontal();
    footerMark();
    ScrollTrigger.refresh();
  });

  window.__lenis = lenis;
}

function initLenis() {
  if (typeof window.Lenis === 'undefined') return null;
  const lenis = new window.Lenis({ lerp: 0.11, smoothWheel: true, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // Same-page anchors scroll smoothly through Lenis.
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el, { offset: -90 });
    history.replaceState(null, '', a.getAttribute('href'));
  });
  return lenis;
}

function preloader() {
  const el = document.querySelector('.preloader');
  const root = document.documentElement;
  if (!el || !root.classList.contains('first-visit')) {
    el?.remove();
    return Promise.resolve();
  }
  return new Promise(resolve => {
    const done = () => {
      try { sessionStorage.setItem('mlr-visited', '1'); } catch (e) { /* private mode */ }
      el.classList.add('is-done');
      root.classList.remove('first-visit');
      setTimeout(() => el.remove(), 800);
      resolve();
    };
    // Never hold the page longer than ~1s, even on a slow connection.
    const t0 = performance.now();
    const finish = () => setTimeout(done, Math.max(0, 900 - (performance.now() - t0)));
    if (document.readyState === 'complete') finish();
    else { window.addEventListener('load', finish, { once: true }); setTimeout(done, 1400); }
  });
}

function heroIntro() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  const tl = gsap.timeline({ defaults: { ease: EASE } });
  tl.from(hero.querySelectorAll('.hero__rating, .eyebrow'), { y: 20, opacity: 0, duration: 1, stagger: 0.1 }, 0.1)
    .from(hero.querySelector('.hero__booking'), { y: 60, opacity: 0, duration: 1.4 }, 0.7)
    .from('.site-header__inner > *', { y: -20, opacity: 0, duration: 1, stagger: 0.08 }, 0.2);
  // Hero media drifts as you scroll away.
  gsap.to(hero.querySelector('.hero__media'), {
    yPercent: 14, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to(hero.querySelector('.hero__content'), {
    yPercent: -18, opacity: 0.2, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
}

function splitHeadings() {
  if (typeof window.SplitType === 'undefined') {
    document.querySelectorAll('[data-split]').forEach(el => gsap.from(el, { y: 30, opacity: 0, scrollTrigger: { trigger: el, start: 'top 88%' } }));
    return;
  }
  document.querySelectorAll('[data-split]').forEach(el => {
    // The homepage headline is the LCP element on phones: never hide it behind the animation there.
    if (el.closest('[data-hero]') && window.innerWidth < 1024) return;
    const split = new window.SplitType(el, { types: 'lines,words', lineClass: 'split-line' });
    el.querySelectorAll('.split-line').forEach(l => { l.style.overflow = 'hidden'; l.style.paddingBottom = '0.08em'; });
    const inHero = el.closest('[data-hero], [data-phero]');
    gsap.from(split.words, {
      yPercent: 110, rotate: 2, duration: 1.3, stagger: 0.035, delay: inHero ? 0.15 : 0,
      scrollTrigger: inHero ? undefined : { trigger: el, start: 'top 88%' },
    });
  });
  // Re-split on resize so lines re-wrap correctly.
  let w = window.innerWidth;
  window.addEventListener('resize', () => {
    if (Math.abs(window.innerWidth - w) < 60) return;
    w = window.innerWidth;
    ScrollTrigger.refresh();
  });
}

function reveals() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, overwrite: true }),
  });
}

function clipReveals() {
  document.querySelectorAll('[data-clip]').forEach(el => {
    const img = el.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%' } });
    tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' });
    if (img) tl.from(img, { scale: 1.3, duration: 2, ease: 'expo.out' }, 0.1);
  });
}

function parallax() {
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.15;
    gsap.fromTo(el, { yPercent: -speed * 40 }, {
      yPercent: speed * 40, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

function scaleMedia() {
  document.querySelectorAll('[data-scale]').forEach(el => {
    gsap.fromTo(el, { scale: 1.2 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
  });
  // Cinematic CTA: frame opens from an inset rectangle to full bleed.
  document.querySelectorAll('[data-cta]').forEach(el => {
    gsap.fromTo(el, { clipPath: 'inset(8% 6% 8% 6% round 24px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 25%', scrub: true },
    });
  });
}

function counters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const end = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const fmt = new Intl.NumberFormat('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 2.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = fmt.format(obj.v) + suffix; },
    });
  });
}

function horizontal() {
  const section = document.querySelector('[data-hscroll]');
  if (!section) return;
  const track = section.querySelector('.hx__track');
  const bar = section.querySelector('.hx__progress i');
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const tween = gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: {
        trigger: section, start: 'top top', end: () => `+=${distance()}`, scrub: 0.6, pin: true,
        invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: self => bar && gsap.set(bar, { scaleX: self.progress }),
      },
    });
    return () => tween.scrollTrigger?.kill();
  });
}

function footerMark() {
  const mark = document.querySelector('[data-footer-mark]');
  if (!mark) return;
  gsap.from(mark, {
    yPercent: 50, opacity: 0, letterSpacing: '0.12em', ease: 'none',
    scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom bottom', scrub: true },
  });
  gsap.from('.site-footer__top > *', {
    y: 40, opacity: 0, stagger: 0.1, duration: 1.2,
    scrollTrigger: { trigger: '.site-footer', start: 'top 85%' },
  });
}
