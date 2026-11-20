import { pic, btn, eyebrow, icon, ctaBand, faqBlock, faqSchema, pageHero, enquiryForm, abs, imgUrl, imgMeta, esc, SITE, HOTEL_ID, hotelSchema, bookingUrl } from '../lib.mjs';
import { ROOMS, VILLAS, roomUrl, villaUrl, fullName } from '../data/rooms.mjs';
import { reviewsSection } from './home.mjs';

const H = [{ label: 'Home', href: '/' }];

// ---------------------------------------------------------------- /about/
export function about() {
  const crumbs = [...H, { label: 'About', href: '/about/' }];
  const body = `
${pageHero({ image: 'lawn-top', alt: 'Aerial view of Manas Lifestyle Resort, Igatpuri', eyebrow: 'Our story', title: 'A luxury resort in the hills of Igatpuri', lead: 'Where tranquillity meets luxury — a retreat from everyday life, close enough to Mumbai and Nashik for a weekend.', crumbs })}
<section class="section">
  <div class="container intro">
    <div class="intro__media">
      <div data-clip>${pic('resort-driveway', { alt: 'Driveway and buildings at Manas Lifestyle Resort', cls: 'frame-a', sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
      <div class="frame-b" data-parallax="0.25">${pic('garden', { alt: 'Garden area at the resort', sizes: '25vw' })}</div>
    </div>
    <div class="intro__text">
      ${eyebrow('Welcome to Manas Lifestyle Resort')}
      <h2 class="h2" data-split>Comfort, elegance and nature — in harmony.</h2>
      <p class="lead" data-reveal>Nestled in Igatpuri amid the serene beauty of the Sahyadri hills, Manas Lifestyle Resort is a retreat that invites you to slow down.</p>
      <p data-reveal>We are a full-service resort on the Mumbai–Agra Highway at Talegaon: cottages, rooms, suites and private pool villas; three dining spaces; a swimming pool, rain dance and games for every age; and banquet halls and lawns where families celebrate weddings and companies gather their teams. Our dedicated team makes sure every need is met with care — whether you are here for a quiet weekend, a family holiday or the biggest day of your life.</p>
      <p data-reveal>Manas Lifestyle Resort is ${SITE.legalNote.toLowerCase()}, with its head office in Andheri (E), Mumbai.</p>
    </div>
  </div>
</section>
<section class="section section--dark">
  <div class="container">
    <div class="shead"><div>${eyebrow('Manas in numbers')}<h2 class="h2" data-split>Facts, not adjectives</h2></div><p class="lead" data-reveal>Every figure below is published by the resort.</p></div>
    <div class="features">
      <div class="feature" data-reveal><span class="stat__num"><span data-count="13">13</span></span><p>room, suite and villa types</p></div>
      <div class="feature" data-reveal><span class="stat__num"><span data-count="4660">4,660</span></span><p>sq ft pillarless Mist Ballroom</p></div>
      <div class="feature" data-reveal><span class="stat__num"><span data-count="1200">1,200</span></span><p>guests for a Royal Lawn reception</p></div>
      <div class="feature" data-reveal><span class="stat__num"><span data-count="80">80</span>+</span><p>school picnics hosted every year</p></div>
      <div class="feature" data-reveal><span class="stat__num">${SITE.rating.value}/5</span><p>from ${SITE.rating.count} ${SITE.rating.source} reviews</p></div>
      <div class="feature" data-reveal><span class="stat__num"><span data-count="120">120</span> km</span><p>from Mumbai · 40 km from Nashik</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container split split--rev">
    <div class="split__media" data-clip>${pic('pool-2', { alt: 'Swimming pool at dusk', sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
    <div class="split__text">
      ${eyebrow('What we believe')}
      <h2 class="h2" data-split>Hospitality is in the details.</h2>
      <p data-reveal>It is the welcome drink after the ghat drive, the extra bed already made up for the children, the chef who cooks something that is not on the menu because a guest asked. Our reviews mention staff by name more often than they mention the pool — and we are proud of that.</p>
      <div class="phero__actions" data-reveal>${btn('Explore stays', '/all-accommodations/')}${btn('Plan a celebration', '/weddings/', { variant: 'line' })}</div>
    </div>
  </div>
</section>
${reviewsSection()}
${ctaBand({ image: 'pool-1' })}`;
  return {
    path: '/about/',
    meta: { title: 'About Manas Lifestyle Resort — A Premier Luxury Resort in Igatpuri', description: 'Discover Manas Lifestyle Resort, a premier luxury resort in Igatpuri for family getaways, weddings, corporate events and couple stays, 120 km from Mumbai.', path: '/about/', image: 'lawn-top', crumbs, schema: [hotelSchema()] },
    body, swiper: true,
  };
}

// ---------------------------------------------------------------- /gallery/
const GALLERY = [
  ['resort', 'lawn-top', 'Aerial view of the resort and Royal Lawn'], ['resort', 'pool-2', 'Swimming pool at dusk'], ['resort', 'pool-1', 'Swimming pool'], ['resort', 'entrance-fountain', 'Entrance fountain'], ['resort', 'resort-exterior', 'Resort exterior'], ['resort', 'garden', 'Garden area'], ['resort', 'resort-driveway', 'Resort driveway'], ['resort', 'entrance-fountain-2', 'Fountain at night'],
  ['rooms', 'cottage-3', 'Luxury Cottage'], ['rooms', 'cottage-bath', 'Luxury Cottage bathroom'], ['rooms', 'premium-1', 'Premium Room'], ['rooms', 'premium-bath', 'Premium Room bathroom'], ['rooms', 'junior-1', 'Junior Suite'], ['rooms', 'studio-1', 'Studio Suite bedroom'], ['rooms', 'studio-balcony', 'Studio Suite balcony'], ['rooms', 'suite-living', 'Suite living room'], ['rooms', 'signature-1', 'Signature Suite'], ['rooms', 'harmony-1', 'Harmony Suite'], ['rooms', 'luxe-1', 'Luxe Room'], ['rooms', 'urban-room-1', 'Urban Room'],
  ['villas', 'royal-pool', 'Royal Villa private pool'], ['villas', 'royal-1', 'Royal Villa'], ['villas', 'uv4-1', 'Urban Villa 4 BHK'], ['villas', 'uv6-1', 'Urban Villa 6 BHK bedroom'], ['villas', 'uv6-3', 'Urban Villa 6 BHK'], ['villas', 'uv7-3', 'Urban Villa 7 BHK'],
  ['dining', 'dining-feature', 'Baithak restaurant'], ['dining', 'baithak-1', 'Baithak seating'], ['dining', 'cf-main', 'Café Fusion buffet main course'], ['dining', 'cf-salad', 'Café Fusion salad bar'], ['dining', 'cf-dessert', 'Café Fusion desserts'], ['dining', 'sp-sitout', 'Sweet Poison sit-out'], ['dining', 'sp-bar', 'Sweet Poison bar'], ['dining', 'chef', 'In the kitchen'],
  ['weddings', 'wedding-1', 'Bride’s entry'], ['weddings', 'wedding-2', 'Wedding celebration'], ['weddings', 'wedding-3', 'Wedding celebration'], ['weddings', 'wedding-4', 'Wedding celebration'], ['weddings', 'wedding-5', 'Wedding celebration'], ['weddings', 'wedding-6', 'Wedding guests'],
  ['events', 'mist-theatre', 'Mist Ballroom, theatre set-up'], ['events', 'mist-cluster-blue', 'Mist Ballroom, cluster set-up'], ['events', 'mist-cluster-black', 'Banquet cluster set-up'], ['events', 'corp-2', 'Corporate event'], ['events', 'corp-4', 'Corporate event'],
  ['activities', 'arcade', 'Arcade games'], ['activities', 'indoor-games', 'Indoor games'], ['activities', 'outdoor-games', 'Outdoor games'], ['activities', 'magic-show', 'Magic show'], ['activities', 'pottery', 'Pottery making'], ['activities', 'ev-charging', 'EV charging station'],
];
const VIDEOS = [[SITE.tourVideo, 'Resort tour film'], ['PXxpgJsGQJI', 'Resort short'], ['h8GvENIMBlM', 'Resort short'], ['xnppq1ALcOQ', 'Resort short']];

export function gallery() {
  const crumbs = [...H, { label: 'Gallery', href: '/gallery/' }];
  const cats = [['all', 'All'], ['resort', 'Resort'], ['rooms', 'Rooms'], ['villas', 'Villas'], ['dining', 'Dining'], ['weddings', 'Weddings'], ['events', 'Events'], ['activities', 'Activities'], ['video', 'Video']];
  const body = `
${pageHero({ image: 'royal-pool', alt: 'Royal Villa pool at Manas Lifestyle Resort', eyebrow: 'Explore the beauty', title: 'Resort gallery', lead: 'Architecture, rooms and villas, the pool, food, weddings and the hills of Igatpuri — photographed at Manas.', crumbs, size: 'md' })}
<section class="section">
  <div class="container">
    <div class="filters" role="group" aria-label="Filter gallery" data-filters="#masonry">${cats.map(([k, l], i) => `<button type="button" data-filter="${k}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>
    <div class="masonry" id="masonry">
      ${VIDEOS.map(([id, cap]) => `<button class="masonry__item masonry__item--video" type="button" data-cat="video" data-lightbox="g" data-video="${id}" data-caption="${cap}" aria-label="Play video: ${cap}"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" width="480" height="360" alt="${cap} — Manas Lifestyle Resort" loading="lazy" decoding="async"><figcaption>${cap}</figcaption></button>`).join('')}
      ${GALLERY.map(([c, k, cap]) => `<button class="masonry__item" type="button" data-cat="${c}" data-lightbox="g" data-src="${imgUrl(k, 2400)}" data-caption="${esc(cap)}">${pic(k, { alt: `${cap} — Manas Lifestyle Resort, Igatpuri`, sizes: '(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw' })}<figcaption>${esc(cap)}</figcaption></button>`).join('')}
    </div>
    <p class="muted" style="margin-top:2rem">More on <a href="${SITE.social.instagram}" target="_blank" rel="noopener">Instagram</a> and <a href="${SITE.social.youtube}" target="_blank" rel="noopener">YouTube</a>.</p>
  </div>
</section>
${ctaBand({ image: 'wedding-6', title: 'Picture yourself here.' })}`;
  return {
    path: '/gallery/',
    meta: {
      title: 'Manas Lifestyle Resort Gallery – View Photos of Rooms & Facilities',
      description: 'Photos and videos of Manas Lifestyle Resort, Igatpuri: rooms, suites, pool villas, swimming pool, restaurants, weddings, banquets and activities.',
      path: '/gallery/', image: 'royal-pool', crumbs,
      schema: [{ '@type': 'ImageGallery', name: 'Manas Lifestyle Resort gallery', associatedMedia: GALLERY.slice(0, 20).map(([, k, cap]) => ({ '@type': 'ImageObject', contentUrl: abs(imgUrl(k, 1600)), caption: cap })) }],
    },
    body,
  };
}

// ---------------------------------------------------------------- /offers/
export function offers() {
  const crumbs = [...H, { label: 'Offers', href: '/offers/' }];
  const body = `
${pageHero({ image: 'signature-2', alt: 'Signature Suite at Manas Lifestyle Resort', eyebrow: 'Book before you miss out', title: 'Resort offers in Igatpuri', lead: 'Exclusive packages for celebrations and longer stays — available when you book directly with us.', crumbs, size: 'md' })}
<section class="section">
  <div class="container offers">
    <article class="offer" data-reveal>
      ${pic('signature-3', { alt: 'Suite decorated for a celebration', sizes: '(max-width: 1023px) 100vw, 50vw' })}
      <div class="offer__body">
        <span class="offer__badge">Celebration</span>
        <h2>Birthday &amp; Anniversary Package</h2>
        <p>Let your dream celebration come true. Our team decorates your room for the occasion — balloons, rose petals, towel art, cake and more — to create the perfect ambience for your special day.</p>
        <ul class="offer__terms"><li>Prices are subject to change based on availability.</li><li>Package availability may vary — book in advance.</li><li>Add-ons are available at an additional cost.</li><li>Discounts cannot be combined with other promotions or offers.</li></ul>
        ${btn('Enquire about this package', '#enquire')}
      </div>
    </article>
    <article class="offer" data-reveal>
      ${pic('studio-balcony', { alt: 'Studio Suite balcony overlooking the pool', sizes: '(max-width: 1023px) 100vw, 50vw' })}
      <div class="offer__body">
        <span class="offer__badge">Long weekend</span>
        <h2>Three-Night Stay: 15% off the third night</h2>
        <p>Plan a long weekend with our exclusive three-night offer — the perfect chance to relax, explore Igatpuri and make your getaway even more memorable.</p>
        <ul class="offer__terms"><li>Minimum stay of three nights.</li><li>Not valid on blackout dates.</li><li>Late checkout is subject to availability.</li><li>The 15% discount applies to the third night’s rate only.</li><li>Discounts cannot be combined with other promotions or offers.</li></ul>
        ${btn('Book three nights', bookingUrl(), { variant: 'gold', attrs: 'data-book rel="noopener"' })}
      </div>
    </article>
  </div>
  <div class="container"><p class="placeholder-note" style="margin-top:2.5rem"><strong>For the resort team:</strong> list any new seasonal packages here with their exact terms. Do not publish prices or discounts that are not live in the booking engine.</p></div>
</section>
<section class="section section--sand" id="enquire">
  <div class="container contact-grid">
    <div>${eyebrow('Enquire')}<h2 class="h2" data-split>Ask about an offer</h2><p class="lead" data-reveal>Tell us the occasion and your dates; reservations will confirm availability and the final price.</p></div>
    ${enquiryForm('accommodation')}
  </div>
</section>
${ctaBand({ image: 'royal-pool' })}`;
  return {
    path: '/offers/',
    meta: { title: 'Best Resort Offers in Igatpuri | Manas Lifestyle Resort Deals', description: 'Current offers at Manas Lifestyle Resort, Igatpuri: Birthday & Anniversary room décor package and 15% off the third night on three-night stays. Book direct.', path: '/offers/', image: 'signature-2', crumbs },
    body,
  };
}

// ---------------------------------------------------------------- /location/ (new)
export function location() {
  const crumbs = [...H, { label: 'Location & nearby', href: '/location/' }];
  const nearby = [
    ['Bhatsa River Valley', 'Less than 3 km from the resort. Sweeping valley views and a cool breeze — best at sunrise and sunset.'],
    ['Camel Valley', 'A short distance beyond the Bhatsa valley; a steep slope that drops more than 1,000 ft with waterfalls in the monsoon. Stay behind the railings.'],
    ['Kasara Ghat', 'The scenic climb on the way from Mumbai — mist and waterfalls during the rains.'],
    ['Vihigaon Waterfall', 'Roughly 120 ft high and at its best in the monsoon.'],
    ['Vipassana International Academy (Dhamma Giri)', 'A renowned meditation centre in Igatpuri — please visit quietly.'],
    ['Tringalwadi Fort', 'A historic hill fort popular with trekkers for its views.'],
    ['Vaitarna Lake', 'A calm, scenic reservoir for a slow afternoon drive.'],
    ['Kalsubai Peak', 'The highest peak in the Sahyadri range, about 35 km from Igatpuri — an early-morning trek.'],
    ['Trimbakeshwar Temple', 'One of the twelve Jyotirlingas, a popular pilgrimage from Igatpuri.'],
  ];
  const faqs = [
    ['How far is Manas Lifestyle Resort from Mumbai?', 'About 120 km — roughly 2.5 hours by road via the Mumbai–Nashik highway, Thane and Kasara Ghat.'],
    ['How far is the resort from Nashik?', 'About 40 km, around 40 minutes by road.'],
    ['How far is it from Pune?', 'Roughly 230 km, around 5 hours by road depending on traffic.'],
    ['Can I reach the resort by train?', 'Yes. Mumbai suburban trains run to Kasara, and long-distance trains stop at Igatpuri. Take a taxi or auto for the final stretch, and call reservations beforehand so the team can guide your driver.'],
    ['Is there parking at the resort?', 'Yes, free parking is available, including space for buses.'],
  ];
  const mapEmbed = `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=14&output=embed`;
  const body = `
${pageHero({ image: 'lawn-top', alt: 'Aerial view of Manas Lifestyle Resort', eyebrow: 'Talegaon · Igatpuri · Nashik district', title: 'Location &amp; how to reach us', lead: 'On the Mumbai–Agra Highway at Talegaon, Igatpuri — a little before Igatpuri town when you drive up from Mumbai.', crumbs, size: 'md' })}
<section class="section">
  <div class="container contact-grid">
    <div>
      ${eyebrow('Find us')}
      <h2 class="h2" data-split>Resort in Igatpuri near Mumbai &amp; Nashik</h2>
      <address style="font-style:normal" data-reveal><p class="lead">${SITE.address.full}</p></address>
      <p data-reveal>${btn('Open in Google Maps', SITE.mapsUrl, { variant: 'solid', attrs: 'target="_blank" rel="noopener"' })}</p>
      <table class="distance-table" data-reveal><thead><tr><th>From</th><th>Distance</th><th>Travel time</th></tr></thead><tbody>${SITE.distances.map(d => `<tr><td>${d.from}</td><td>${d.km}</td><td>${d.time}</td></tr>`).join('')}</tbody></table>
      <p class="muted" style="font-size:.85rem;margin-top:1rem">Times are approximate and change with traffic and weather.</p>
    </div>
    <div class="map" data-map="${mapEmbed}" data-reveal>
      <div class="map__placeholder">${pic('lawn-top', { alt: '', sizes: '50vw', cls: 'map__bg' })}<div style="position:absolute;inset:0;display:grid;place-items:center;background:rgba(14,28,21,.55);color:var(--ivory)"><div><p class="lead" style="color:inherit;margin-inline:auto">Interactive map</p><button class="btn btn--gold" type="button"><span class="btn__label">Load Google map</span></button></div></div></div>
    </div>
  </div>
</section>
<section class="section section--sand">
  <div class="container">
    <div class="shead"><div>${eyebrow('Getting here')}<h2 class="h2" data-split>By road, rail or coach</h2></div></div>
    <div class="features">
      <div class="feature" data-reveal><span class="feature__n">01</span><h3>By road from Mumbai</h3><p>Follow the Mumbai–Nashik highway through Thane and the Shahapur belt, then climb Kasara Ghat. Leaving before 7 am usually means a clear ghat and an early check-in by the pool.</p></div>
      <div class="feature" data-reveal><span class="feature__n">02</span><h3>By train</h3><p>Suburban trains from Mumbai end at Kasara; long-distance trains stop at Igatpuri station. Rail from Mumbai takes close to 3 hours. Take a taxi or auto for the last stretch.</p></div>
      <div class="feature" data-reveal><span class="feature__n">03</span><h3>From Nashik &amp; Pune</h3><p>Nashik is 40 km away — an easy day trip. From Pune (about 230 km) most families book two nights so the journey is worth it.</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="shead"><div>${eyebrow('Nearby attractions')}<h2 class="h2" data-split>Places to visit around Igatpuri</h2></div><p class="lead" data-reveal>Ask the front desk for timings and the best season for each. Our guide to <a href="/places-to-visit-in-igatpuri/">places to visit in Igatpuri</a> and <a href="/things-to-do-in-igatpuri-travel-guide/">things to do</a> has more.</p></div>
    <div class="features">${nearby.map(([n, d], i) => `<div class="feature" data-reveal><span class="feature__n">${String(i + 1).padStart(2, '0')}</span><h3>${n}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
${faqBlock(faqs, { title: 'Travel questions' })}
${ctaBand({ image: 'pool-2', title: 'Two and a half hours from the city. Worlds away.' })}`;
  return {
    path: '/location/',
    meta: {
      title: 'Resort Location in Igatpuri & Distance from Mumbai | Manas',
      description: 'Manas Lifestyle Resort is on the Mumbai–Agra Highway at Talegaon, Igatpuri — 120 km from Mumbai, 40 km from Nashik. Directions, train options and nearby attractions.',
      path: '/location/', image: 'lawn-top', crumbs,
      schema: [hotelSchema(), faqSchema(faqs), { '@type': 'ItemList', name: 'Attractions near Manas Lifestyle Resort', itemListElement: nearby.map(([n], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) }],
    },
    body,
  };
}

// ---------------------------------------------------------------- /contact/
export function contact() {
  const crumbs = [...H, { label: 'Contact', href: '/contact/' }];
  const P = SITE.phones;
  const body = `
${pageHero({ image: 'entrance-fountain', alt: 'Entrance fountain at Manas Lifestyle Resort', eyebrow: 'Get in touch', title: 'Contact Manas Lifestyle Resort', lead: 'Room bookings, weddings, corporate events or a simple question — we are happy to help.', crumbs, size: 'sm' })}
<section class="section">
  <div class="container contact-grid">
    <div class="contact-cards">
      <div class="contact-card" data-reveal><h2>Room reservations</h2><p><a href="tel:${P.reservations.tel}">${P.reservations.display}</a></p></div>
      <div class="contact-card" data-reveal><h2>Corporate &amp; group queries</h2><p><a href="tel:${P.corporate.tel}">${P.corporate.display}</a></p></div>
      <div class="contact-card" data-reveal><h2>Wedding queries</h2><p><a href="tel:${P.weddings.tel}">${P.weddings.display}</a> · <a href="tel:${P.weddings2.tel}">${P.weddings2.display}</a></p></div>
      <div class="contact-card" data-reveal><h2>Email</h2><p><a href="mailto:${SITE.email}" style="font-size:1.15rem">${SITE.email}</a><br><a href="mailto:${SITE.weddingEmail}" style="font-size:1.15rem">${SITE.weddingEmail}</a> (weddings)</p></div>
      <div class="contact-card" data-reveal><h2>WhatsApp</h2><p><a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp_click">Chat with reservations</a></p></div>
      <div class="contact-card" data-reveal><h2>Resort address</h2><address style="font-style:normal">${SITE.address.full}<br><a href="${SITE.mapsUrl}" target="_blank" rel="noopener" style="font-family:var(--font-sans);font-size:.9rem">Get directions →</a></address></div>
      <div class="contact-card" data-reveal><h2>Head office</h2><address style="font-style:normal">${SITE.headOffice}</address></div>
    </div>
    <div>${enquiryForm('general', { heading: 'Ask us anything', intro: 'We value your questions and feedback and usually reply within one working day.' })}</div>
  </div>
</section>
<section class="section section--sand">
  <div class="container">
    <div class="shead"><div>${eyebrow('Specific plans?')}<h2 class="h2" data-split>Use a dedicated enquiry form</h2></div></div>
    <div class="related">
      <a class="stay-card" href="/all-accommodations/#enquire" data-reveal><div class="stay-card__media">${pic('studio-1', { alt: 'Studio Suite', sizes: '33vw' })}<span class="stay-card__more">${icon('arrow')}</span></div><div class="stay-card__body"><h3 class="stay-card__name">Stays</h3></div></a>
      <a class="stay-card" href="/weddings/#enquire" data-reveal><div class="stay-card__media">${pic('wedding-2', { alt: 'Wedding', sizes: '33vw' })}<span class="stay-card__more">${icon('arrow')}</span></div><div class="stay-card__body"><h3 class="stay-card__name">Weddings</h3></div></a>
      <a class="stay-card" href="/corporate/#enquire" data-reveal><div class="stay-card__media">${pic('mist-theatre-2', { alt: 'Conference', sizes: '33vw' })}<span class="stay-card__more">${icon('arrow')}</span></div><div class="stay-card__body"><h3 class="stay-card__name">Corporate &amp; banquets</h3></div></a>
    </div>
  </div>
</section>`;
  return {
    path: '/contact/',
    meta: { title: 'Contact Manas Lifestyle Resort — Book a Stay or Event in Igatpuri', description: 'Contact Manas Lifestyle Resort, Igatpuri: reservations +91 98500 02234, corporate +91 98500 02245, weddings +91 98500 02247, sales@manaslifestyleresort.in.', path: '/contact/', image: 'entrance-fountain', crumbs, schema: [hotelSchema()] },
    body,
  };
}

// ---------------------------------------------------------------- /faq/
export function faqPage() {
  const crumbs = [...H, { label: 'FAQs', href: '/faq/' }];
  const groups = [
    ['Location & getting here', [
      ['Where is Manas Lifestyle Resort located?', 'At 286-A, Mumbai–Agra Highway, Talegaon, Igatpuri, Nashik district, Maharashtra 422403 — a convenient weekend getaway from Mumbai and Nashik.'],
      ['How far is the resort from Mumbai and Nashik?', 'About 120 km (roughly 2.5 hours) from Mumbai and 40 km (about 40 minutes) from Nashik. <a href="/location/">See directions</a>.'],
      ['Is there parking available?', 'Yes, ample free parking, including space for buses — convenient for weddings, corporate events and family groups.'],
      ['What is the best time to visit?', 'The resort is lovely all year. The monsoon is special, when mist and fog drift across the hills and lawns; winter brings cool, clear days.'],
      ['Which tourist attractions are nearby?', 'Bhatsa River Valley, Camel Valley, Kasara Ghat, Vihigaon Waterfall, the Vipassana International Academy, Tringalwadi Fort, Kalsubai Peak, Trimbakeshwar Temple and Sandhan Valley.'],
    ]],
    ['Rooms & villas', [
      ['What types of rooms and villas are available?', 'Luxury Cottages, Premium, Urban and Luxe Rooms, Junior, Studio, Signature and Harmony Suites, a 650 sq ft Suite, and private pool villas: Royal Villa 4 BHK and Urban Villas 4, 6 and 7 BHK. <a href="/all-accommodations/">Compare all stays</a>.'],
      ['Do you have luxury villas with private pools?', 'Yes. The Royal Villa and every Urban Villa have a private swimming pool. The wider Manas villa collection, including Ubud villas, is listed on manaslifestylevillas.com.'],
      ['Are the villas suitable for long stays?', 'Yes. Villas have living areas and kitchen facilities (fully equipped kitchens in the Urban Villas), making them comfortable for extended family holidays and retreats.'],
      ['Can I book a villa for a family gathering or a weekend with friends?', 'Yes — the 4, 6 and 7 BHK villas are designed for exactly that. <a href="/villas/">See the villas</a>.'],
      ['Is the resort couple-friendly?', 'Absolutely. The Luxury Cottage, Signature Suite and Harmony Suite are favourites with couples, and our team can arrange romantic dinners, proposals and surprise décor.'],
    ]],
    ['Families & activities', [
      ['Is Manas Lifestyle Resort family-friendly?', 'Yes. Families enjoy the pool, rain dance, lawns, arcade, indoor and outdoor games, magic shows and pottery, plus rooms with an extra bed.'],
      ['Does the resort have a swimming pool?', 'Yes — a well-maintained pool with different depths, plus a rain dance area.'],
      ['What activities can guests enjoy?', 'Swimming, rain dance, arcade games, table tennis, pool table, carrom and board games, cricket turf, badminton, football, pickleball, wooden challenge games, magic shows, pottery and, subject to availability, DJ or live band nights. <a href="/facilities/">Full list</a>.'],
      ['Are activities chargeable?', 'Most are included. The cricket turf and pickleball court are charged hourly, arcade games per game, pool table ₹100 per game and pot making ₹100 per pot.'],
      ['Do you have an EV charging station?', 'Yes, there is an EV charging station for guests.'],
      ['Is the resort pet-friendly?', 'We love animals, but pets are not permitted inside the resort, to maintain hygiene and comfort for all guests.'],
      ['Do you host birthdays and anniversaries?', 'Yes. Our Birthday & Anniversary package decorates your room with balloons, rose petals, towel art and a cake. <a href="/offers/">See offers</a>.'],
    ]],
    ['Dining', [
      ['What dining options are available?', 'Baithak (Indian à la carte), Café Fusion (all-day dining with buffets), Sweet Poison (bar lounge) and in-room dining.'],
      ['Is outside food allowed?', 'No, outside food and beverages are not permitted. Our restaurants serve a wide variety of freshly prepared meals.'],
      ['Do you arrange special dining experiences?', 'Yes — candle-lit dinners, poolside dining and customised menus for celebrations, weddings and corporate groups.'],
    ]],
    ['Weddings & events', [
      ['Does the resort host weddings?', 'Yes. Manas offers banquet halls, lawns and customisable packages for weddings in Igatpuri. <a href="/weddings/">Weddings at Manas</a>.'],
      ['How many guests can the banquet halls and lawns accommodate?', 'The Mist Ballroom hosts up to 500 guests reception-style, the Cottage Lawn up to 700 and the Royal Lawn up to 1,200. <a href="/banquets/">Compare venues</a>.'],
      ['Do you offer destination wedding packages?', 'Yes, covering décor, catering, accommodation and event planning support.'],
      ['Can small weddings or intimate ceremonies be hosted?', 'Yes, in Mist I or Mist II or on the lawns.'],
      ['Do you host pre-wedding functions?', 'Yes — Mehendi, Sangeet, Haldi and engagement ceremonies.'],
      ['Can corporate events and conferences be hosted?', 'Yes — day and residential conferences, doctor conferences, seminars, annual events and staff outings. <a href="/corporate/">Corporate events</a>.'],
      ['Are team-building activities available?', 'Yes, including outdoor sports, indoor games and group activities.'],
    ]],
    ['Booking', [
      ['How can I get the best rate?', 'Book directly through this website’s booking engine or call reservations on +91 98500 02234.'],
      ['Can I book through travel websites?', 'Yes, the resort is listed on major travel platforms, but direct bookings come with our own offers and packages.'],
      ['Who do I call for weddings or corporate bookings?', 'Weddings: +91 98500 02247 / +91 98500 02238. Corporate and groups: +91 98500 02245.'],
    ]],
  ];
  const all = groups.flatMap(g => g[1]);
  const body = `
${pageHero({ image: 'garden', alt: 'Gardens at Manas Lifestyle Resort', eyebrow: 'Frequently asked questions', title: 'FAQs — Manas Lifestyle Resort, Igatpuri', lead: 'Everything guests ask about stays, villas, dining, weddings and corporate events near Mumbai and Nashik.', crumbs, size: 'sm' })}
${groups.map(([t, list], i) => faqBlock(list, { title: t, id: `faq-${i + 1}` })).join('')}
<section class="section section--sand"><div class="container contact-grid"><div>${eyebrow('Still curious?')}<h2 class="h2" data-split>Ask us directly</h2><p class="lead">We usually reply within one working day.</p></div>${enquiryForm('general')}</div></section>`;
  return {
    path: '/faq/',
    meta: { title: 'FAQs — Manas Lifestyle Resort Igatpuri near Mumbai', description: 'Answers about Manas Lifestyle Resort, Igatpuri: location, rooms and villas, pool and activities, dining, weddings, banquets, corporate events and booking.', path: '/faq/', image: 'garden', crumbs, schema: [faqSchema(all)] },
    body,
  };
}

// ---------------------------------------------------------------- Legal
const legal = (path, title, desc, sections) => ({
  path,
  meta: { title: `${title} | Manas Lifestyle Resort`, description: desc, path, image: 'garden', crumbs: [...H, { label: title, href: path }] },
  solidHeader: true,
  body: `<section class="section" style="padding-top:calc(var(--header-h) + 4rem)"><div class="container container--narrow prose">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">${title}</li></ol></nav>
    <h1 class="h1">${title}</h1>
    <p class="placeholder-note"><strong>Draft for legal review.</strong> This text is a starting point written for the new website and must be reviewed and approved by the resort’s legal adviser before launch. Last updated: 17 November 2026.</p>
    ${sections.map(([h, ps]) => `<h2>${h}</h2>${ps.map(p => `<p>${p}</p>`).join('')}`).join('')}
  </div></section>`,
});

export function privacy() {
  return legal('/privacy-policy/', 'Privacy Policy', 'How Manas Lifestyle Resort collects, uses and protects personal information shared through this website.', [
    ['Who we are', [`This website is operated by ${SITE.name} (${SITE.legalNote}), ${SITE.address.full}. Contact: <a href="mailto:${SITE.email}">${SITE.email}</a>.`]],
    ['Information we collect', ['When you submit an enquiry form we collect the details you provide — such as your name, phone number, email address, preferred dates, guest numbers and message. When you book online, the booking is handled by our booking-engine provider, which collects the information needed to complete your reservation under its own terms.', 'We may also collect technical information such as device type, pages visited and referring website through analytics cookies, where you have allowed them.']],
    ['How we use it', ['To respond to your enquiry, to manage bookings and events, to improve this website and, if you agree, to tell you about offers. We do not sell your personal information.']],
    ['Sharing', ['We share information only with service providers who help us run the resort and this website (for example the booking engine, email delivery and analytics), and where required by law.']],
    ['Retention & security', ['We keep enquiry information only as long as needed for the purposes above and apply reasonable technical and organisational safeguards.']],
    ['Your rights', ['You may ask to access, correct or delete your personal information, or withdraw consent to marketing, by emailing us. Requests are handled in line with the Digital Personal Data Protection Act, 2023, and other applicable law.']],
    ['Cookies', ['We use essential storage to make the site work (for example, remembering that the intro animation has played). Analytics cookies are used only once configured and, where required, with your consent.']],
  ]);
}

export function terms() {
  return legal('/terms-and-conditions/', 'Terms and Conditions', 'Terms of use for the Manas Lifestyle Resort website and general conditions for stays and enquiries.', [
    ['Using this website', ['Content on this website is provided for general information. We work to keep details such as facilities, room descriptions and venue capacities accurate, but they may change. Please confirm anything important with the resort before you travel.']],
    ['Bookings and enquiries', ['Online reservations are processed through our booking engine and are subject to the rates, availability and cancellation terms shown at the time of booking. Submitting an enquiry form does not confirm a booking; a reservation is confirmed only when you receive confirmation from the resort or the booking engine.']],
    ['Offers', ['Offers are subject to availability, blackout dates and their stated terms, and cannot be combined with other promotions unless stated.']],
    ['Resort policies', ['Outside food and beverages are not permitted. Pets are not permitted inside the resort. Certain activities are chargeable or subject to availability. Check-in and check-out times are communicated at the time of booking.']],
    ['Intellectual property', [`Photographs, text and branding on this website belong to ${SITE.name} or are used with permission and may not be reused without written consent.`]],
    ['Contact', [`Questions about these terms: <a href="mailto:${SITE.email}">${SITE.email}</a>.`]],
  ]);
}

// ---------------------------------------------------------------- HTML sitemap (preserved URL /sitemap/)
export function htmlSitemap(posts) {
  const crumbs = [...H, { label: 'Sitemap', href: '/sitemap/' }];
  const col = (t, links) => `<section><h2>${t}</h2><ul>${links.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></section>`;
  const body = `<section class="section" style="padding-top:calc(var(--header-h) + 4rem)"><div class="container">
  <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Sitemap</li></ol></nav>
  <h1 class="h1">Sitemap</h1>
  <div class="sitemap-cols">
    ${col('Resort', [['Home', '/'], ['About', '/about/'], ['Location & nearby', '/location/'], ['Gallery', '/gallery/'], ['Offers', '/offers/'], ['FAQs', '/faq/'], ['Contact', '/contact/'], ['Services', '/service/']])}
    ${col('Accommodation', [['All accommodation', '/all-accommodations/'], ...ROOMS.map(r => [r.name, roomUrl(r)])])}
    ${col('Villas', [['All villas', '/villas/'], ...VILLAS.map(v => [fullName(v), villaUrl(v)])])}
    ${col('Experiences & dining', [['Experiences & facilities', '/facilities/'], ['Dining', '/dining/'], ['In-room dining', '/ird/']])}
    ${col('Events', [['Weddings', '/weddings/'], ['Banquets & lawns', '/banquets/'], ['Corporate events', '/corporate/'], ['School picnics', '/school-picnic/']])}
    ${col('Journal', [['All articles', '/blog/'], ...posts.map(p => [p.h1 || p.title, p.url])])}
    ${col('Legal', [['Privacy policy', '/privacy-policy/'], ['Terms and conditions', '/terms-and-conditions/']])}
  </div></div></section>`;
  return { path: '/sitemap/', meta: { title: 'Sitemap — Manas Lifestyle Resort Igatpuri Official Website', description: 'All pages on the Manas Lifestyle Resort website: accommodation, villas, dining, weddings, corporate events, gallery, journal and contact.', path: '/sitemap/', image: 'garden', crumbs }, body, solidHeader: true };
}

export function notFound() {
  return {
    path: '/404.html',
    meta: { title: 'Page not found | Manas Lifestyle Resort', description: 'The page you are looking for could not be found on the Manas Lifestyle Resort website.', path: '/404.html', noindex: true },
    solidHeader: true,
    body: `<section class="notfound"><div class="container container--narrow">${eyebrow('404')}<h1 class="h1">Lost in the mist.</h1><p class="lead" style="margin-inline:auto">The page you were looking for has moved or no longer exists. These might help:</p><p class="phero__actions" style="justify-content:center">${btn('Home', '/')}${btn('Accommodation', '/all-accommodations/', { variant: 'line' })}${btn('Contact', '/contact/', { variant: 'line' })}</p></div></section>`,
  };
}
