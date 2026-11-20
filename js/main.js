// Entry point. Every feature is a small module; each one is optional and fails safe —
// the content is complete in the HTML, so if a library or module fails the page still works.
import { initMotion } from './modules/motion.js';
import { initNav } from './modules/nav.js';
import { initForms } from './modules/forms.js';
import { initGallery } from './modules/gallery.js';
import { initUi } from './modules/ui.js';

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function safe(name, fn) {
  try { fn(); } catch (err) { console.warn(`[manas] ${name} failed`, err); }
}

window.__mlrReady = true;
safe('nav', () => initNav({ reduced }));
safe('forms', initForms);
safe('gallery', initGallery);
safe('ui', () => initUi({ reduced }));

const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
if (!reduced && hasGsap) {
  safe('motion', () => initMotion());
} else {
  root.classList.remove('motion', 'first-visit');
  document.querySelector('.preloader')?.remove();
}
