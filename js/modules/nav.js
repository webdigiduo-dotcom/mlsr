// Header behaviour, full-screen mobile menu, page transitions.

export function initNav({ reduced }) {
  const header = document.querySelector('[data-header]');
  const dock = document.querySelector('.dock');
  const hasHero = !!document.querySelector('[data-hero], [data-phero]');
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    const solid = !hasHero || y > 40;
    header.classList.toggle('is-solid', solid || document.body.classList.contains('menu-open'));
    const goingDown = y > lastY && y > 480;
    if (!document.body.classList.contains('menu-open')) header.classList.toggle('is-hidden', goingDown);
    dock?.classList.toggle('is-hidden', document.body.classList.contains('menu-open'));
    lastY = y;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-mobile-menu]');
  const setOpen = open => {
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    header.classList.remove('is-hidden');
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      window.__lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
      menu.querySelector('a')?.focus({ preventScroll: true });
    } else {
      menu.classList.remove('is-open');
      window.__lenis?.start();
      document.documentElement.style.overflow = '';
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, reduced ? 0 : 900);
    }
    onScroll();
  };
  burger?.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setOpen(false); burger.focus(); }
  });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });

  // Page transitions: a short curtain on internal navigation (skipped for reduced motion).
  const curtain = document.querySelector('.curtain');
  if (reduced || !curtain || typeof window.gsap === 'undefined') return;
  const gsap = window.gsap;
  // Reveal on arrival when coming from an internal link.
  try {
    if (sessionStorage.getItem('mlr-transition')) {
      sessionStorage.removeItem('mlr-transition');
      gsap.fromTo(curtain, { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: 0.9, ease: 'expo.inOut', delay: 0.05 });
    }
  } catch (e) { /* ignore */ }

  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const url = new URL(a.href, location.href);
    if (a.target === '_blank' || url.origin !== location.origin || a.hasAttribute('download')) return;
    if (url.pathname === location.pathname && url.hash) return;
    if (/\.(pdf|jpg|png|webp|xml)$/i.test(url.pathname)) return;
    e.preventDefault();
    try { sessionStorage.setItem('mlr-transition', '1'); } catch (err) { /* ignore */ }
    gsap.fromTo(curtain, { scaleY: 0, transformOrigin: 'bottom' }, {
      scaleY: 1, duration: 0.55, ease: 'expo.in', onComplete: () => { location.href = url.href; },
    });
  });
  // Back/forward cache: make sure the curtain is not left covering the page.
  window.addEventListener('pageshow', ev => { if (ev.persisted) gsap.set(curtain, { scaleY: 0 }); });
}
