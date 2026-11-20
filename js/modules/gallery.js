// Filterable masonry gallery + accessible lightbox for images and YouTube video.

export function initGallery() {
  // Filters
  document.querySelectorAll('[data-filters]').forEach(group => {
    const grid = document.querySelector(group.dataset.filters);
    group.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      group.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      const f = b.dataset.filter;
      grid.querySelectorAll('[data-cat]').forEach(it => { it.hidden = f !== 'all' && !it.dataset.cat.split(' ').includes(f); });
      window.ScrollTrigger?.refresh();
    });
  });

  const triggers = [...document.querySelectorAll('[data-lightbox]')];
  if (!triggers.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML = `<div class="lightbox__stage"></div><p class="lightbox__cap"></p>
    <button class="lb-close" type="button" aria-label="Close"><svg class="ico"><use href="#i-close"/></svg></button>
    <button class="lb-prev" type="button" aria-label="Previous"><svg class="ico"><use href="#i-chevron"/></svg></button>
    <button class="lb-next" type="button" aria-label="Next"><svg class="ico"><use href="#i-chevron"/></svg></button>`;
  document.body.append(lb);
  const stage = lb.querySelector('.lightbox__stage');
  const cap = lb.querySelector('.lightbox__cap');
  let list = [];
  let idx = 0;
  let opener = null;

  const visible = group => triggers.filter(t => t.dataset.lightbox === group && !t.hidden && !t.closest('[hidden]'));
  const show = i => {
    idx = (i + list.length) % list.length;
    const t = list[idx];
    stage.innerHTML = '';
    if (t.dataset.video) {
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${t.dataset.video}?autoplay=1&rel=0`;
      f.allow = 'autoplay; encrypted-media; picture-in-picture';
      f.allowFullscreen = true;
      f.title = t.dataset.caption || 'Video';
      stage.append(f);
    } else {
      const img = document.createElement('img');
      img.src = t.dataset.src;
      img.alt = t.querySelector('img')?.alt || '';
      stage.append(img);
    }
    cap.textContent = `${t.dataset.caption || ''}${list.length > 1 ? `  ·  ${idx + 1} / ${list.length}` : ''}`;
    lb.querySelector('.lb-prev').hidden = lb.querySelector('.lb-next').hidden = list.length < 2;
  };
  const open = t => {
    opener = t;
    list = visible(t.dataset.lightbox);
    show(list.indexOf(t));
    lb.classList.add('is-open');
    window.__lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  };
  const close = () => {
    lb.classList.remove('is-open');
    stage.innerHTML = '';
    window.__lenis?.start();
    document.documentElement.style.overflow = '';
    opener?.focus();
  };
  triggers.forEach(t => t.addEventListener('click', e => { e.preventDefault(); open(t); }));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb || e.target === stage) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'Tab') { // keep focus inside the dialog
      const f = [...lb.querySelectorAll('button:not([hidden])')];
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
  // Swipe on touch devices.
  let x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  });
}
