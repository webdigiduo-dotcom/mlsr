import { layout, pic, btn, eyebrow, icon, bookingBar, ctaBand, faqBlock, faqSchema, hotelSchema, imgUrl, esc, SITE, bookingUrl } from '../lib.mjs';
import { ROOMS, VILLAS, roomUrl, villaUrl, fullName } from '../data/rooms.mjs';
import { EXPERIENCES, REVIEWS } from '../data/content.mjs';

export const reviewsSection = ({ title = 'In our guests’ words', bg = 'section--sand' } = {}) => `
<section class="section ${bg} reviews" aria-labelledby="reviews-title" data-swiper="reviews">
  <div class="container">
    <div class="shead">
      <div>${eyebrow('Guest reviews')}<h2 class="h2" id="reviews-title" data-split>${title}</h2></div>
      <div>
        <p class="lead" data-reveal>Rated <strong>${SITE.rating.value}/5</strong> from ${SITE.rating.count} reviews on ${SITE.rating.source}. Reviews below are reproduced from verified guest platforms.</p>
        <div class="reviews__nav" data-reveal><button class="prev" type="button" aria-label="Previous review">${icon('arrow')}</button><button class="next" type="button" aria-label="Next review">${icon('arrow')}</button></div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="swiper"><div class="swiper-wrapper">
      ${REVIEWS.map(r => `<article class="swiper-slide review">
        <div class="review__stars" aria-label="${r.rating} out of 5 stars">${icon('star').repeat(r.rating)}</div>
        <blockquote><p>“${esc(r.text)}”</p></blockquote>
        <footer><strong>${esc(r.name)}</strong>Review on ${r.source}</footer>
      </article>`).join('')}
    </div></div>
    <div class="reviews__platforms" data-reveal>
      <a href="${SITE.social.googleReview}" target="_blank" rel="noopener">${icon('star')} Write a Google review</a>
      <a href="${SITE.social.tripadvisor}" target="_blank" rel="noopener">${icon('tripadvisor')} Read reviews on Tripadvisor</a>
    </div>
  </div>
</section>`;

export const stayCard = (r, href, { sizes = '(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 40vw' } = {}) => `
<a class="stay-card" href="${href}" data-reveal>
  <div class="stay-card__media" data-clip>
    ${pic(r.images[0], { alt: `${fullName(r)} at Manas Lifestyle Resort, Igatpuri`, sizes })}
    <span class="stay-card__tag">${r.kind === 'Villa' ? `${r.bedrooms} BHK villa` : r.kind}</span>
    <span class="stay-card__more">${icon('arrow')}</span>
  </div>
  <div class="stay-card__body"><h3 class="stay-card__name">${fullName(r)}</h3><span class="stay-card__meta">${r.size !== 'On request' ? r.size : r.view}</span></div>
  <p class="stay-card__teaser">${r.teaser}</p>
</a>`;

export default function home() {
  const groups = [
    { id: 'rooms', label: 'Cottages & rooms', items: ROOMS.filter(r => r.kind !== 'Suite').map(r => [r, roomUrl(r)]) },
    { id: 'suites', label: 'Suites', items: ROOMS.filter(r => r.kind === 'Suite').map(r => [r, roomUrl(r)]) },
    { id: 'villas', label: 'Private pool villas', items: VILLAS.map(v => [v, villaUrl(v)]) },
  ];
  const EXP_TAGS = { pool: 'Water', rain: 'Water', arcade: 'Play · charged per game', indoor: 'Play', outdoor: 'Sport', magic: 'Evenings', pottery: 'Create · ₹100 per pot', ev: 'Convenience' };
  const all = [...ROOMS.map(r => [r, roomUrl(r)]), ...VILLAS.map(v => [v, villaUrl(v)])];
  const faqs = [
    ['Where is Manas Lifestyle Resort?', `On the Mumbai–Agra Highway at Talegaon, Igatpuri, in Nashik district, Maharashtra — about 120 km (roughly 2.5 hours) from Mumbai and 40 km (about 40 minutes) from Nashik. <a href="/location/">Directions and nearby places</a>.`],
    ['What types of accommodation are available?', `Luxury Cottages, Premium, Urban and Luxe Rooms, Junior, Studio, Signature and Harmony Suites, a Suite with a separate living room, and private pool villas from 4 to 7 bedrooms. <a href="/all-accommodations/">Compare all stays</a>.`],
    ['Is the resort good for families with children?', 'Yes. There is a swimming pool with different depths, a rain dance, an arcade, indoor and outdoor games, magic shows and pottery, plus family rooms with an extra bed.'],
    ['Can I host a wedding or corporate event here?', `Yes. The pillarless Mist Ballroom hosts up to 500 guests reception-style and the Royal Lawn up to 1,200. See <a href="/weddings/">weddings</a> and <a href="/corporate/">corporate events</a>.`],
    ['How do I get the best rate?', 'Book directly on this website or call reservations on +91 98500 02234. Current packages are listed on the <a href="/offers/">offers page</a>.'],
  ];

  const body = `
<section class="hero" data-hero>
  <div class="hero__media">${pic('pool-2', { alt: 'Swimming pool at Manas Lifestyle Resort, Igatpuri, at dusk', eager: true, priority: true, sizes: '100vw' })}</div>
  <div class="hero__shade"></div>
  <div class="hero__content container">
    <a class="hero__rating" href="#reviews-title">${icon('star')}${icon('star')}${icon('star')}${icon('star')}${icon('star')} <span>${SITE.rating.value} · ${SITE.rating.count} ${SITE.rating.source} reviews</span></a>
    ${eyebrow('Luxury resort in Igatpuri')}
    <h1 class="hero__title" data-split>Escape into an experience <em>beyond ordinary.</em></h1>
    <p class="hero__lead">Discover the perfect blend of luxury, relaxation and unforgettable experiences at Manas Lifestyle Resort, Igatpuri — two and a half hours from Mumbai, a world away from it.</p>
    <div class="hero__actions">
      ${btn('Discover the resort', '#discover', { variant: 'ghost' })}
      ${btn('Book your stay', bookingUrl(), { variant: 'gold', attrs: 'data-book rel="noopener"' })}
    </div>
  </div>
  <a class="hero__scroll" href="#discover">Scroll</a>
  <div class="hero__booking container">${bookingBar({ id: 'hero-booking' })}</div>
</section>

<section class="section" id="discover">
  <div class="container intro">
    <div class="intro__media">
      <div data-clip>${pic('resort-exterior', { alt: 'Manas Lifestyle Resort building and gardens in Igatpuri', cls: 'frame-a', sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
      <div class="frame-b" data-parallax="0.25">${pic('entrance-fountain', { alt: 'Entrance fountain at Manas Lifestyle Resort', sizes: '25vw' })}</div>
    </div>
    <div class="intro__text">
      ${eyebrow('Welcome to Manas')}
      <h2 class="h2" data-split>A destination where every moment becomes a memory.</h2>
      <p class="lead" data-reveal>Set in the green folds of the Sahyadri hills at Talegaon, Igatpuri, Manas Lifestyle Resort is where city weekends slow down — mist on the lawns in the monsoon, long lunches, a pool that glows after dark.</p>
      <p data-reveal>Stay in a garden cottage, a pool-view suite or a private pool villa; spend the day between the swimming pool, the rain dance and the games zone; dine at Baithak, Café Fusion and the Sweet Poison bar lounge. And when life calls for a celebration, our ballroom and lawns host everything from intimate engagements to weddings of 1,200 guests. ${SITE.legalNote}.</p>
      <div class="intro__stats" data-reveal>
        <div><span class="stat__num"><span data-count="120">120</span> km</span><span class="stat__label">from Mumbai</span></div>
        <div><span class="stat__num"><span data-count="40">40</span> km</span><span class="stat__label">from Nashik</span></div>
        <div><span class="stat__num" data-count="1200">1,200</span><span class="stat__label">guests on the Royal Lawn</span></div>
      </div>
      <p data-reveal style="margin-top:2rem">${btn('Our story', '/about/', { variant: 'line' })}</p>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div class="marquee__track">${Array(2).fill(['Cottages', 'Suites', 'Pool villas', 'Weddings', 'Banquets', 'Dining', 'Igatpuri'].map(w => `<span>${w}</span>`).join('')).join('')}</div></div>

<section class="section stays" aria-labelledby="stay-title">
  <div class="container">
    <div class="shead">
      <div>${eyebrow('Accommodation')}<h2 class="h2" id="stay-title" data-split>Rooms, suites &amp; private pool villas</h2></div>
      <p class="lead" data-reveal>Thirteen ways to stay — from 290 sq ft garden cottages to a 2,000 sq ft villa with its own pool. Every one with daily housekeeping, Wi-Fi and in-room dining.</p>
    </div>
    <div class="stays__tabs" role="tablist" aria-label="Accommodation type" data-reveal>
      ${groups.map((g, gi) => `<button type="button" role="tab" id="tab-${g.id}" aria-controls="panel-${g.id}" aria-selected="${gi === 0}" tabindex="${gi === 0 ? 0 : -1}" data-tab="${g.id}">${g.label}<span>${g.items.length}</span></button>`).join('')}
    </div>
    ${groups.map((g, gi) => `<div class="stays__panel" role="tabpanel" id="panel-${g.id}" aria-labelledby="tab-${g.id}" data-panel="${g.id}"${gi === 0 ? '' : ' hidden'}>
      <ul class="stays__list" aria-label="${g.label}">
        ${g.items.map(([r], i) => `<li><button type="button" class="stays__pick" aria-pressed="${i === 0}" data-pick="${g.id}-${i}"><span class="stays__pick-name">${fullName(r)}</span><span class="stays__pick-meta">${r.size !== 'On request' ? r.size : r.view}</span></button></li>`).join('')}
      </ul>
      <div class="stays__stage">
        ${g.items.map(([r, href], i) => `<article class="stay-feature" data-feature="${g.id}-${i}"${i === 0 ? '' : ' hidden'}>
          <a class="stay-feature__media" href="${href}" aria-label="${fullName(r)} — view details">
            ${pic(r.images[0], { alt: `${fullName(r)} at Manas Lifestyle Resort, Igatpuri`, sizes: '(max-width: 1023px) 100vw, 45vw' })}
            <span class="stay-card__tag">${r.kind === 'Villa' ? `${r.bedrooms} BHK villa` : r.kind}</span>
          </a>
          <div class="stay-feature__thumbs">${r.images.slice(1, 4).map(k => pic(k, { alt: '', sizes: '120px' })).join('')}</div>
          <div class="stay-feature__body">
            <h3 class="h3">${fullName(r)}</h3>
            <p>${r.teaser}</p>
            <dl class="stay-feature__specs">
              <div>${icon('area')}<dt>Size</dt><dd>${r.size === 'On request' ? 'On request' : r.size}</dd></div>
              <div>${icon('bed')}<dt>${r.kind === 'Villa' ? 'Bedrooms' : 'Beds'}</dt><dd>${r.bed}</dd></div>
              <div>${icon('eye')}<dt>View</dt><dd>${r.view}</dd></div>
            </dl>
            <ul class="stay-feature__hl">${r.highlights.slice(0, 3).map(h => `<li>${icon('check')}${h}</li>`).join('')}</ul>
            <p class="stay-feature__ideal">Ideal for: ${r.idealFor.join(' · ')}</p>
            <div class="stay-feature__actions">${btn('View details', href, { variant: 'solid', cls: 'btn--sm' })}${btn('Check availability', bookingUrl(), { variant: 'line', cls: 'btn--sm', attrs: 'data-book rel="noopener"' })}</div>
          </div>
        </article>`).join('')}
      </div>
    </div>`).join('')}
    <p class="stays__all" data-reveal>${btn('Compare all 13 stays', '/all-accommodations/', { variant: 'line' })}</p>
  </div>
</section>

<section class="hx" data-hscroll aria-labelledby="exp-title">
  <div class="hx__pin">
    <div class="container hx__head">
      <div class="shead">
        <div>${eyebrow('Experiences')}<h2 class="h2" id="exp-title" data-split>Days that fill themselves.</h2></div>
        <div>
          <p class="lead" data-reveal>Splash, play, create, unwind. Everything happens within the resort — no planning, no driving.</p>
          <ul class="hx__facts" data-reveal><li><strong>30+</strong> games &amp; activities</li><li><strong>Pool</strong> with different depths</li><li><strong>EV</strong> charging on site</li></ul>
        </div>
      </div>
    </div>
    <div class="hx__track">
      ${EXPERIENCES.map((x, i) => `<a class="hx-card" href="/facilities/#${x.key}">
        ${pic(x.image, { alt: `${x.name} at Manas Lifestyle Resort`, sizes: '(max-width: 1023px) 78vw, 420px' })}
        <span class="hx-card__tag">${EXP_TAGS[x.key]}</span>
        <div class="hx-card__body"><span class="hx-card__n">${String(i + 1).padStart(2, '0')} / ${String(EXPERIENCES.length).padStart(2, '0')}</span><h3>${x.name}</h3><p>${x.text}</p><span class="hx-card__more">Explore ${icon('arrow')}</span></div>
      </a>`).join('')}
      <a class="hx-card hx-card--end" href="/facilities/"><div class="hx-card__body"><span class="hx-card__n">And much more</span><h3>See every activity</h3><p>Cricket turf, pickleball, badminton, football, slides, swings, carrom, chess, Jenga, wooden challenge games, DJ and live-band nights (subject to availability).</p><span class="hx-card__more">All experiences ${icon('arrow')}</span></div></a>
    </div>
    <div class="hx__progress" aria-hidden="true"><i></i></div>
  </div>
</section>

<section class="section section--sand" aria-labelledby="dine-title">
  <div class="container dine">
    <div class="dine__media">
      <div data-clip>${pic('dining-feature', { alt: 'Baithak restaurant entrance at Manas Lifestyle Resort', cls: 'm1', sizes: '(max-width: 1023px) 100vw, 58vw' })}</div>
      <div class="m2" data-parallax="0.3">${pic('cf-dessert', { alt: 'Dessert counter at Café Fusion', sizes: '25vw' })}</div>
    </div>
    <div class="dine__text">
      ${eyebrow('Dining')}
      <h2 class="h2" data-split>Three tables, one generous kitchen.</h2>
      <p data-reveal>From Maharashtrian thalis to Thai curries and a dessert counter guests write home about, dining at Manas is unhurried and abundant.</p>
      <ul class="venues-list">
        <li data-reveal><h3>Baithak</h3><p>À la carte Indian cuisine in a warm, traditional setting.</p></li>
        <li data-reveal><h3>Café Fusion</h3><p>All-day dining with buffets for breakfast, lunch and dinner.</p></li>
        <li data-reveal><h3>Sweet Poison</h3><p>Bar lounge for mocktails, cocktails and slow conversations.</p></li>
      </ul>
      <div data-reveal>${btn('Explore dining', '/dining/')}</div>
    </div>
  </div>
</section>

<section class="section wed" aria-labelledby="wed-title">
  <div class="container wed__grid">
    <div class="wed__collage">
      <div class="w1" data-clip>${pic('wedding-4', { alt: 'Wedding celebration at Manas Lifestyle Resort, Igatpuri', sizes: '(max-width: 1023px) 50vw, 30vw' })}</div>
      <div class="w2" data-clip>${pic('wedding-1', { alt: 'Bride’s entry with phoolon ki chadar on the lawn', sizes: '(max-width: 1023px) 50vw, 28vw' })}</div>
      <div class="w3" data-clip>${pic('wedding-6', { alt: 'Wedding guests celebrating at the resort', sizes: '(max-width: 1023px) 50vw, 28vw' })}</div>
    </div>
    <div class="wed__text">
      ${eyebrow('Weddings & celebrations')}
      <h2 class="h2" data-split>You dream the day. We bring it to life.</h2>
      <p class="lead" data-reveal>A pillarless ballroom, two open-air lawns, rooms and villas for every guest, and chefs who cook Jain, Gujarati, Rajasthani and international menus with equal care.</p>
      <div class="wed__facts" data-reveal>
        <div><span class="stat__num" data-count="1200">1,200</span><span class="stat__label">guests, Royal Lawn reception</span></div>
        <div><span class="stat__num"><span data-count="22500">22,500</span></span><span class="stat__label">sq ft Royal Lawn</span></div>
        <div><span class="stat__num" data-count="500">500</span><span class="stat__label">guests, Mist Ballroom reception</span></div>
        <div><span class="stat__num">4</span><span class="stat__label">indoor &amp; outdoor venues</span></div>
      </div>
      <div class="phero__actions" data-reveal>${btn('Plan your wedding', '/weddings/', { variant: 'gold' })}${btn('Explore venues', '/banquets/', { variant: 'ghost' })}</div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="events-title">
  <div class="container">
    <div class="shead">
      <div>${eyebrow('Corporate & banquets')}<h2 class="h2" id="events-title" data-split>Meet, gather, celebrate.</h2></div>
      <p class="lead" data-reveal>Residential conferences, annual events, team outings and family functions — with venues, rooms and kitchens under one roof.</p>
    </div>
    <div class="duo">
      <a class="duo-card" href="/corporate/" data-reveal>${pic('mist-theatre', { alt: 'Mist Ballroom set up theatre-style for a conference', sizes: '(max-width: 1023px) 100vw, 50vw' })}<div class="duo-card__body">${eyebrow('Corporate')}<h3>Offsites that people remember</h3><p>Day and residential conferences, doctor conferences, seminars and staff outings — 120 km from Mumbai.</p><span class="link-arrow">Corporate events ${icon('arrow')}</span></div></a>
      <a class="duo-card" href="/banquets/" data-reveal>${pic('mist-cluster-blue', { alt: 'Banquet hall set with cluster seating', sizes: '(max-width: 1023px) 100vw, 50vw' })}<div class="duo-card__body">${eyebrow('Banquets')}<h3>Four venues, 50 to 1,200 guests</h3><p>Mist Ballroom, Mist I &amp; II, the Royal Lawn and the Cottage Lawn — compare sizes and seating.</p><span class="link-arrow">Banquets &amp; lawns ${icon('arrow')}</span></div></a>
    </div>
  </div>
</section>

<section class="section section--ivory2" aria-labelledby="gal-title">
  <div class="container">
    <div class="shead">
      <div>${eyebrow('Gallery')}<h2 class="h2" id="gal-title" data-split>See it for yourself.</h2></div>
      ${btn('Open the gallery', '/gallery/', { variant: 'line' })}
    </div>
    <div class="home-gallery">
      <button class="masonry__item masonry__item--video" type="button" data-lightbox="home" data-video="${SITE.tourVideo}" data-caption="Resort tour film" aria-label="Play the resort tour film">${pic('lawn-top', { alt: 'Aerial view of Manas Lifestyle Resort and its lawn', sizes: '(max-width: 1023px) 100vw, 42vw' })}</button>
      <button class="masonry__item" type="button" data-lightbox="home" data-src="${imgUrl('royal-pool', 1600)}" data-caption="Royal Villa private pool">${pic('royal-pool', { alt: 'Private pool of the Royal Villa', sizes: '25vw' })}</button>
      <button class="masonry__item" type="button" data-lightbox="home" data-src="${imgUrl('sp-sitout', 1600)}" data-caption="Sweet Poison sit-out">${pic('sp-sitout', { alt: 'Sweet Poison bar lounge sit-out', sizes: '33vw' })}</button>
      <button class="masonry__item" type="button" data-lightbox="home" data-src="${imgUrl('uv6-1', 1600)}" data-caption="Urban Villa bedroom">${pic('uv6-1', { alt: 'Bedroom in the Urban Villa', sizes: '33vw' })}</button>
      <button class="masonry__item" type="button" data-lightbox="home" data-src="${imgUrl('cf-main', 1600)}" data-caption="Café Fusion buffet">${pic('cf-main', { alt: 'Café Fusion buffet main course', sizes: '25vw' })}</button>
      <div><p class="lead" style="margin:0">Architecture, rooms, the pool, food, weddings and the hills around us — <a href="/gallery/">browse the full gallery</a>.</p></div>
    </div>
  </div>
</section>

${reviewsSection()}

${faqBlock(faqs, { title: 'Before you visit', intro: 'Quick answers to what guests ask most. More on our <a href="/faq/">FAQ page</a>.' })}

${ctaBand({ image: 'royal-pool' })}
`;
  return {
    path: '/',
    meta: {
      title: 'Best Resort in Igatpuri | Luxury & Wedding Resort | Manas Lifestyle',
      description: 'Luxury resort in Igatpuri near Mumbai: cottages, suites and private pool villas, multi-cuisine dining, a pool and games, and banquets for weddings and events.',
      path: '/',
      image: 'pool-2',
      preload: `<link rel="preload" as="image" type="image/avif" imagesrcset="${['480', '960', '1600'].map(w => `/images/pool-2-${w}.avif ${w}w`).join(', ')}" imagesizes="100vw" fetchpriority="high">`,
      schema: [hotelSchema(), faqSchema(faqs)],
    },
    body,
    swiper: true,
  };
}
