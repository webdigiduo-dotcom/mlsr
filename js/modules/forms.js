// Booking widget (hands off to the live Simplotel booking engine) and enquiry forms
// (validated client-side, posted to /api/enquiry.php, with a WhatsApp fallback).
// No fake confirmations: success is only shown when the server says the enquiry was received.

const WA = '919850002234';
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

export const track = (event, params = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
};

export function initForms() {
  linkDates(document);
  document.querySelectorAll('[data-booking]').forEach(initBooking);
  document.querySelectorAll('[data-enquiry]').forEach(initEnquiry);

  // Conversion tracking for calls, WhatsApp and booking-engine clicks.
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    if (a.matches('[data-book]')) track('booking_click', { location: a.closest('section, header, footer, nav')?.className.split(' ')[0] || 'page' });
    else if (a.dataset.track) track(a.dataset.track, { link_url: a.href });
    else if (a.href.startsWith('tel:')) track('phone_click', { link_url: a.href });
    else if (a.href.includes('wa.me')) track('whatsapp_click', { link_url: a.href });
  });
}

function linkDates(scope) {
  const today = new Date();
  scope.querySelectorAll('input[data-checkin], input[data-future]').forEach(i => { i.min = iso(today); });
  scope.querySelectorAll('input[data-checkout]').forEach(i => { i.min = iso(addDays(today, 1)); });
  scope.querySelectorAll('form').forEach(form => {
    const ci = form.querySelector('[data-checkin]');
    const co = form.querySelector('[data-checkout]');
    if (!ci || !co) return;
    ci.addEventListener('change', () => {
      if (!ci.value) return;
      const next = iso(addDays(new Date(ci.value + 'T00:00'), 1));
      co.min = next;
      if (!co.value || co.value <= ci.value) co.value = next;
    });
  });
}

function initBooking(form) {
  const ci = form.querySelector('[data-checkin]');
  const co = form.querySelector('[data-checkout]');
  // Sensible defaults: tonight → tomorrow, so one click shows availability.
  if (!ci.value) ci.value = iso(new Date());
  if (!co.value) co.value = iso(addDays(new Date(), 1));
  form.addEventListener('submit', e => {
    if (co.value <= ci.value) {
      e.preventDefault();
      co.setCustomValidity('Check-out must be after check-in');
      co.reportValidity();
      co.addEventListener('input', () => co.setCustomValidity(''), { once: true });
      return;
    }
    track('booking_search', { check_in: ci.value, check_out: co.value, rooms: form.rooms?.value, adults: form.adults?.value });
  });
}

const MESSAGES = {
  name: 'Please tell us your name.',
  phone: 'Please enter a valid mobile number (10+ digits).',
  email: 'Please enter a valid email address.',
  consent: 'Please agree so we can contact you about this enquiry.',
};

function initEnquiry(form) {
  form.querySelector('[data-ts]').value = String(Date.now());
  form.querySelector('[data-page]').value = location.pathname;
  const status = form.querySelector('.enquiry__status');

  const validateField = el => {
    const wrap = el.closest('.field');
    let msg = '';
    if (!el.checkValidity()) msg = MESSAGES[el.name] || el.validationMessage;
    if (wrap) {
      wrap.classList.toggle('is-invalid', !!msg);
      const err = wrap.querySelector('.field__error');
      if (err) err.textContent = msg;
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }
    return !msg;
  };
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('blur', () => { if (el.value) validateField(el); });
    el.addEventListener('input', () => { if (el.closest('.field')?.classList.contains('is-invalid')) validateField(el); });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input:not([type=hidden]):not([name=website]), select, textarea')];
    const ok = fields.map(validateField).every(Boolean);
    const consent = form.querySelector('[name=consent]');
    if (!ok || !consent.checked) {
      if (!consent.checked) showStatus(status, 'error', 'One more thing', MESSAGES.consent);
      (form.querySelector('[aria-invalid=true]') || consent).focus();
      return;
    }
    form.classList.add('is-sending');
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || `HTTP ${res.status}`);
      track('generate_lead', { form_type: form.dataset.enquiry });
      form.querySelector('.enquiry__grid').hidden = true;
      form.querySelector('.consent').hidden = true;
      form.querySelector('.enquiry__actions').hidden = true;
      showStatus(status, 'ok', 'Thank you — your enquiry is with us.',
        `We have received your ${form.dataset.enquiry === 'general' ? 'message' : form.dataset.enquiry + ' enquiry'} (reference ${json.ref || '—'}). Our team usually replies within one working day. This is an enquiry, not a confirmed booking.`);
    } catch (err) {
      const summary = summarise(form);
      showStatus(status, 'error', 'We could not send that just now.',
        `Please try again, or send the same details on <a href="https://wa.me/${WA}?text=${encodeURIComponent(summary)}" target="_blank" rel="noopener">WhatsApp</a> or call <a href="tel:+919850002234">+91 98500 02234</a>.`);
    } finally {
      form.classList.remove('is-sending');
    }
  });
}

function summarise(form) {
  const d = new FormData(form);
  const lines = [`Enquiry (${form.dataset.enquiry}) from manaslifestyleresort.in`];
  for (const [k, v] of d.entries()) if (v && !['ts', 'website', 'consent', 'page', 'type'].includes(k)) lines.push(`${k}: ${v}`);
  return lines.join('\n');
}

function showStatus(el, kind, title, html) {
  el.className = `enquiry__status is-${kind}`;
  el.innerHTML = `<h4>${title}</h4><p>${html}</p>`;
  el.focus({ preventScroll: false });
}
