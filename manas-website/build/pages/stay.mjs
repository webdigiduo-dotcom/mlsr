import { pic, btn, eyebrow, icon, bookingBar, ctaBand, faqBlock, faqSchema, pageHero, enquiryForm, imgUrl, imgMeta, esc, abs, ogUrl, HOTEL_ID, SITE, bookingUrl } from '../lib.mjs';
import { ROOMS, VILLAS, roomUrl, villaUrl, fullName } from '../data/rooms.mjs';
import { stayCard, reviewsSection } from './home.mjs';

const crumbsStay = [{ label: 'Home', href: '/' }, { label: 'Accommodation', href: '/all-accommodations/' }];

function accommodationSchema(r, url) {
  const type = r.kind === 'Villa' ? 'House' : (r.kind === 'Suite' ? 'Suite' : 'HotelRoom');
  const sizeNum = parseInt(String(r.size).replace(/[^0-9]/g, ''), 10);
  return {
    '@type': type,
    '@id': `${abs(url)}#accommodation`,
    name: `${fullName(r)} — ${SITE.name}`,
    description: r.description,
    url: abs(url),
    image: r.images.slice(0, 4).map(k => abs(imgUrl(k, 1600))),
    containedInPlace: { '@id': HOTEL_ID },
    ...(sizeNum ? { floorSize: { '@type': 'QuantitativeValue', value: sizeNum, unitCode: 'FTK' } } : {}),
    ...(r.bedrooms ? { numberOfBedrooms: r.bedrooms, numberOfRooms: r.bedrooms } : {}),
    bed: r.bed,
    amenityFeature: r.amenities.map(a => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
  };
}

// ---------------------------------------------------------------- Accommodation hub
export function accommodationHub() {
  const faqs = [
    ['Which rooms are best for families?', 'The Premium Room, Junior Suite and Studio Suite each have a double bed plus an additional single bed, and the 650 sq ft Suite adds a separate living room. Larger families and groups usually book a private pool villa.'],
    ['Which stay is best for couples?', 'The Luxury Cottage (with a private sit-out), the Signature Suite (with an in-room bathtub with a view) and the Harmony Suite (king bed and bathtub) are the most popular with couples.'],
    ['Do you have villas with a private pool in Igatpuri?', 'Yes. The Royal Villa (4 BHK) and the Urban Villas (4, 6 and 7 BHK) each have a private swimming pool. <a href="/villas/">See all villas</a>.'],
    ['What amenities do all rooms have?', 'Every room, suite and villa includes air conditioning, daily housekeeping, an electric kettle, in-room dining, in-room Wi-Fi and a television.'],
    ['Are pets or outside food allowed?', 'Pets are not permitted, and outside food and beverages are not allowed. Our restaurants and in-room dining serve meals throughout the day.'],
  ];
  const sizes = '(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw';
  const body = `
${pageHero({ image: 'suite-living', alt: 'Living room of the Suite at Manas Lifestyle Resort', eyebrow: 'Rooms, suites & villas', title: 'Luxury rooms &amp; villas in Igatpuri', lead: 'Garden cottages, pool-view suites and private pool villas — thirteen ways to stay at Manas, each with its own view, mood and rhythm.', crumbs: [{ label: 'Home', href: '/' }, { label: 'Accommodation', href: '/all-accommodations/' }] })}
<section class="section section--tight"><div class="container">${bookingBar({ variant: 'inline', id: 'acc-booking' })}</div></section>
<section class="section" id="rooms" style="padding-top:0">
  <div class="container">
    <div class="shead"><div>${eyebrow('Rooms & suites')}<h2 class="h2" data-split>Cottages, rooms &amp; suites</h2></div>
      <p class="lead" data-reveal>From a 290 sq ft cottage for two to a 650 sq ft suite with its own living room. Tap any stay for photos, sizes and amenities.</p></div>
    <div class="related">${ROOMS.map(r => stayCard(r, roomUrl(r), { sizes })).join('')}</div>
  </div>
</section>
<section class="section section--dark" id="villas">
  <div class="container">
    <div class="shead"><div>${eyebrow('Private pool villas')}<h2 class="h2" data-split>Villas with a pool of your own</h2></div>
      <div><p class="lead" data-reveal>Four to seven bedrooms, a private swimming pool and the resort’s restaurants and activities a short walk away.</p>${btn('Explore the villas', '/villas/', { variant: 'ghost' })}</div></div>
    <div class="related">${VILLAS.map(v => stayCard(v, villaUrl(v), { sizes })).join('')}</div>
  </div>
</section>
<section class="section section--sand">
  <div class="container">
    <div class="shead"><div>${eyebrow('At a glance')}<h2 class="h2" data-split>Compare our stays</h2></div><p class="lead" data-reveal>Published sizes and bed configurations. For maximum occupancy, please confirm with reservations when you book.</p></div>
    <div class="prose" style="max-width:none" data-reveal><table>
      <thead><tr><th>Stay</th><th>Size</th><th>Beds</th><th>View / outdoor space</th></tr></thead>
      <tbody>${[...ROOMS, ...VILLAS].map(r => `<tr><td><a href="${r.kind === 'Villa' ? villaUrl(r) : roomUrl(r)}">${fullName(r)}</a></td><td>${r.size}</td><td>${r.bed}</td><td>${r.view}</td></tr>`).join('')}</tbody>
    </table></div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div class="split__media" data-clip>${pic('premium-1', { alt: 'Premium Room with double and single bed', sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
    <div class="split__text">
      ${eyebrow('Every stay includes')}
      <h2 class="h2" data-split>The comforts you expect, done properly.</h2>
      <ul class="amenities" data-reveal>${['Air conditioning', 'Daily housekeeping', 'Electric kettle', 'In-room dining', 'In-room Wi-Fi', 'Television', 'Complimentary bar snacks*', 'Free parking'].map(a => `<li>${icon('check')}${a}</li>`).join('')}</ul>
      <p class="muted" style="font-size:.85rem;margin-top:1rem" data-reveal>*Complimentary snacks are listed for the cottage, Premium Room, Junior, Studio and Suite categories and the Royal Villa.</p>
    </div>
  </div>
</section>
${faqBlock(faqs, { title: 'Choosing your room' })}
<section class="section section--sand" id="enquire">
  <div class="container contact-grid">
    <div>${eyebrow('Stay enquiry')}<h2 class="h2" data-split>Not sure which room suits you?</h2><p class="lead" data-reveal>Tell us who is travelling and when. Reservations will suggest the right room or villa and share the best available rate. For instant availability, use <a href="${bookingUrl()}" data-book rel="noopener">online booking</a>.</p>
      <p data-reveal><a href="tel:${SITE.phones.reservations.tel}">${SITE.phones.reservations.display}</a> · <a href="mailto:${SITE.email}">${SITE.email}</a></p></div>
    ${enquiryForm('accommodation')}
  </div>
</section>
${ctaBand({ image: 'studio-balcony', title: 'Wake up to the hills of Igatpuri.' })}`;
  return {
    path: '/all-accommodations/',
    meta: {
      title: 'Luxury Rooms & Villas in Igatpuri | Manas Lifestyle Resort Stays',
      description: 'Compare luxury cottages, rooms, suites and private pool villas at Manas Lifestyle Resort, Igatpuri — sizes, beds, views and amenities. Book direct for the best rate.',
      path: '/all-accommodations/', image: 'suite-living',
      crumbs: crumbsStay,
      schema: [faqSchema(faqs), { '@type': 'ItemList', name: 'Accommodation at Manas Lifestyle Resort', itemListElement: [...ROOMS.map(roomUrl), ...VILLAS.map(villaUrl)].map((u, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(u) })) }],
    },
    body,
  };
}

// ---------------------------------------------------------------- Room / villa detail
function detail(r, url, crumbs, others) {
  const gallery = `<section class="section section--tight room-gallery" data-swiper="gallery" aria-label="${esc(fullName(r))} photos">
    <div class="swiper"><div class="swiper-wrapper">${r.images.map((k, i) => `<div class="swiper-slide"><a href="${imgUrl(k, 2400)}" data-lightbox="room" data-src="${imgUrl(k, 2400)}" data-caption="${esc(fullName(r))} — photo ${i + 1}" aria-label="Open photo ${i + 1} of ${r.images.length}">${pic(k, { alt: `${fullName(r)} at Manas Lifestyle Resort, Igatpuri — photo ${i + 1}`, sizes: '(max-width: 1023px) 80vw, 920px', eager: i === 0 })}</a></div>`).join('')}</div></div>
    <div class="container room-gallery__bar"><span class="room-gallery__count"><span data-count-current>01</span> / ${String(r.images.length).padStart(2, '0')}</span><div class="reviews__nav"><button class="prev" type="button" aria-label="Previous photo">${icon('arrow')}</button><button class="next" type="button" aria-label="Next photo">${icon('arrow')}</button></div></div>
  </section>`;
  const specs = [
    ['area', 'Size', r.size === 'On request' ? 'Ask reservations' : r.size],
    ['bed', r.kind === 'Villa' ? 'Bedrooms' : 'Bed', r.bed],
    ['eye', 'View', r.view],
    ['user', 'Occupancy', 'Confirmed by reservations at booking'],
  ];
  const isVilla = r.kind === 'Villa';
  // Use the sharpest available photo for the full-bleed hero.
  const heroKey = [...r.images].sort((a, b) => imgMeta(b).w - imgMeta(a).w)[0];
  const body = `
${pageHero({ image: heroKey, alt: `${fullName(r)} at Manas Lifestyle Resort`, eyebrow: isVilla ? r.subtitle : r.kind === 'Suite' ? 'Suite' : r.kind, title: fullName(r), lead: r.teaser, crumbs, size: 'md' })}
${gallery}
<section class="section" style="padding-top:2rem">
  <div class="container room-top">
    <div>
      ${eyebrow('The experience')}
      <h2 class="h2" data-split>Inside the ${fullName(r)}</h2>
      <div class="prose">
        <p class="lead" data-reveal>${r.intro}</p>
        ${r.body.map(p => `<p data-reveal>${p}</p>`).join('')}
      </div>
      <h3 class="h3" style="margin-top:3rem" data-reveal>Highlights</h3>
      <ul class="highlights" data-reveal>${r.highlights.map(h => `<li>${icon('check')}<span>${h}</span></li>`).join('')}</ul>
      <h3 class="h3" style="margin-top:3rem" data-reveal>Amenities</h3>
      <ul class="amenities" data-reveal>${r.amenities.map(a => `<li>${icon('check')}${a}</li>`).join('')}</ul>
      <h3 class="h3" style="margin-top:3rem" data-reveal>Ideal for</h3>
      <div class="ideal" data-reveal>${r.idealFor.map(x => `<span class="chip">${x}</span>`).join('')}</div>
    </div>
    <aside class="room-specs" aria-label="Room specifications">
      <dl>${specs.map(([ic, k, v]) => `<div>${icon(ic)}<dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      ${btn('Check availability', bookingUrl(), { variant: 'gold', attrs: 'data-book rel="noopener"' })}
      ${btn(isVilla ? 'Enquire about this villa' : 'Send an enquiry', '#enquire', { variant: 'line' })}
      <p class="room-specs__note">Rates vary by date and are shown live in the booking engine. ${isVilla ? 'Villa stays can also be arranged by calling' : 'Prefer to talk? Call'} <a href="tel:${SITE.phones.reservations.tel}">${SITE.phones.reservations.display}</a> or <a href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hello, I would like to enquire about the ${fullName(r)}.`)}" target="_blank" rel="noopener">WhatsApp us</a>.</p>
    </aside>
  </div>
</section>
${faqBlock(r.faqs, { title: `${fullName(r)}: good to know` })}
<section class="section section--sand" id="enquire">
  <div class="container contact-grid">
    <div>${eyebrow('Enquire')}<h2 class="h2" data-split>Plan your stay in the ${fullName(r)}</h2><p class="lead" data-reveal>Share your dates and group size and our reservations team will confirm availability and the best rate. This is an enquiry — your booking is confirmed only once the team replies.</p></div>
    ${enquiryForm('accommodation')}
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="shead"><div>${eyebrow('You may also like')}<h2 class="h2" data-split>Other ways to stay</h2></div>${btn('All accommodation', '/all-accommodations/', { variant: 'line' })}</div>
    <div class="related">${others.map(([o, href]) => stayCard(o, href, { sizes: '(max-width: 640px) 100vw, 33vw' })).join('')}</div>
  </div>
</section>
${reviewsSection({ title: 'What guests say about staying here' })}`;
  return {
    path: url,
    meta: {
      title: r.title, description: r.description, path: url, image: r.images[0], crumbs,
      schema: [accommodationSchema(r, url), faqSchema(r.faqs)],
    },
    body,
    swiper: true,
  };
}

export function roomPages() {
  return ROOMS.map((r, i) => {
    const others = [ROOMS[(i + 1) % ROOMS.length], ROOMS[(i + 2) % ROOMS.length], VILLAS[i % VILLAS.length]]
      .map(o => [o, o.kind === 'Villa' ? villaUrl(o) : roomUrl(o)]);
    return detail(r, roomUrl(r), [...crumbsStay, { label: r.name, href: roomUrl(r) }], others);
  });
}

export function villaPages() {
  return VILLAS.map((v, i) => {
    const others = [...VILLAS.filter(o => o !== v).slice(0, 2), ROOMS[7]].map(o => [o, o.kind === 'Villa' ? villaUrl(o) : roomUrl(o)]);
    return detail(v, villaUrl(v), [...crumbsStay, { label: 'Villas', href: '/villas/' }, { label: fullName(v), href: villaUrl(v) }], others);
  });
}

export function villasHub() {
  const faqs = [
    ['Which villas at Manas have a private pool?', 'The Royal Villa (4 BHK) and all three Urban Villas (4, 6 and 7 BHK) have their own private swimming pool.'],
    ['Do the villas have a kitchen?', 'The Urban Villas have a fully equipped kitchen. All villas list an induction cooktop, fridge and electric kettle among their amenities.'],
    ['Can I use the resort facilities while staying in a villa?', 'Yes. Villa guests can enjoy the resort’s restaurants, swimming pool, games and activities, along with daily housekeeping and in-room dining.'],
    ['Are there larger villas for big groups?', `The Manas villa collection also includes Ubud and other villas listed on <a href="${SITE.villasSite}" target="_blank" rel="noopener">manaslifestylevillas.com</a>. Call reservations to match a villa to your group size.`],
    ['Is a villa suitable for a wedding family?', 'Yes. The 6 and 7 BHK Urban Villas are popular with wedding families who want privacy close to the banquets and lawns.'],
  ];
  const crumbs = [...crumbsStay, { label: 'Villas', href: '/villas/' }];
  const body = `
${pageHero({ image: 'royal-pool', alt: 'Private pool of the Royal Villa at Manas Lifestyle Resort', eyebrow: 'Private pool villas', title: 'Luxury villas in Igatpuri with a pool of your own', lead: 'Four to seven bedrooms, a private swimming pool and the full resort on your doorstep — for families, friends and wedding parties.', crumbs })}
<section class="section">
  <div class="container split">
    <div class="split__text">
      ${eyebrow('Why a villa')}
      <h2 class="h2" data-split>All the privacy of a home. All the ease of a resort.</h2>
      <p class="lead" data-reveal>A villa at Manas gives your group its own front door, living room and pool — with housekeeping, in-room dining, restaurants and activities a short walk away.</p>
      <ul class="highlights" data-reveal>
        <li>${icon('check')}<span>Private swimming pool at every villa</span></li>
        <li>${icon('check')}<span>Four, six or seven bedrooms, each with its own bathroom</span></li>
        <li>${icon('check')}<span>Living and dining spaces, with a fully equipped kitchen in the Urban Villas</span></li>
        <li>${icon('check')}<span>Terrace spaces — the Royal Villa’s looks out to distant mountains</span></li>
      </ul>
    </div>
    <div class="split__media" data-clip>${pic('uv4-1', { alt: 'Living area of the Urban Villa 4 BHK', sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
  </div>
</section>
<section class="section section--dark">
  <div class="container">
    <div class="shead"><div>${eyebrow('The villas')}<h2 class="h2" data-split>Choose your villa</h2></div><p class="lead" data-reveal>Royal Villa 4 BHK · Urban Villa 4 BHK · Urban Villa 6 BHK · Urban Villa 7 BHK</p></div>
    <div class="stay-grid">${VILLAS.map(v => stayCard(v, villaUrl(v))).join('')}</div>
  </div>
</section>
${faqBlock(faqs, { title: 'Villa stays: good to know' })}
<section class="section section--sand" id="enquire">
  <div class="container contact-grid">
    <div>${eyebrow('Villa enquiry')}<h2 class="h2" data-split>Tell us about your group</h2><p class="lead" data-reveal>Share dates, the number of guests and the occasion. We will recommend the right villa and confirm availability.</p></div>
    ${enquiryForm('accommodation')}
  </div>
</section>
${ctaBand({ image: 'uv6-2', title: 'Your own pool. Your own pace.', secondary: ['Compare all stays', '/all-accommodations/'] })}`;
  return {
    path: '/villas/',
    meta: {
      title: 'Luxury Villas in Igatpuri with Private Pool | Manas Lifestyle',
      description: 'Private pool villas in Igatpuri at Manas Lifestyle Resort: Royal Villa 4 BHK and Urban Villas 4, 6 and 7 BHK with living rooms, kitchens and terraces. Enquire now.',
      path: '/villas/', image: 'royal-pool', crumbs,
      schema: [faqSchema(faqs), { '@type': 'ItemList', name: 'Private pool villas', itemListElement: VILLAS.map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(villaUrl(v)) })) }],
    },
    body,
  };
}
