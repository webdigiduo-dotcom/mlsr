import { pic, btn, eyebrow, icon, ctaBand, faqBlock, faqSchema, pageHero, enquiryForm, abs, imgUrl, SITE, HOTEL_ID } from '../lib.mjs';
import { EXPERIENCES, FACILITY_GROUPS, FACILITY_CHARGES } from '../data/content.mjs';
import { reviewsSection } from './home.mjs';

// ---------------------------------------------------------------- /facilities/ (Experiences & activities)
export function facilities() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Experiences & facilities', href: '/facilities/' }];
  const faqs = [
    ['Does Manas Lifestyle Resort have a swimming pool?', 'Yes — a swimming pool with different depths for families, along with a rain dance area, slides and swings.'],
    ['What indoor games are available?', 'Table tennis, a pool table, chess, carrom, Ludo, Snakes & Ladders, Sequence, Jenga, Monopoly and playing cards, plus an arcade with air hockey, car racing, bike racing and basketball.'],
    ['What outdoor activities can we do?', 'Cricket turf, cricket, badminton, football and a pickleball court, plus wooden challenge games such as Foot Fight, Coin Combat and Tilt Tower.'],
    ['Are activities free?', 'Many are included. The cricket turf and pickleball court are charged by the hour, arcade games per game, the pool table at ₹100 per game and pot making at ₹100 per pot. Please confirm current timings and charges with the resort.'],
    ['Is there an EV charging station?', 'Yes, there is an electric-vehicle charging station on site for guests.'],
    ['Is the resort good for kids?', 'Very. Between the pool, rain dance, arcade, games, magic shows and pottery, children have plenty to do — and parents get to relax.'],
  ];
  const body = `
${pageHero({ image: 'pool-1', alt: 'Swimming pool and lawns at Manas Lifestyle Resort', eyebrow: 'Live well, play more', title: 'Experiences &amp; activities at the resort', lead: 'A pool and rain dance, an arcade, indoor and outdoor games, magic shows and pottery — enough to fill a weekend without once getting in the car.', crumbs })}
<section class="section">
  <div class="container">
    <div class="shead"><div>${eyebrow('Signature experiences')}<h2 class="h2" data-split>Eight reasons the weekend flies by</h2></div><p class="lead" data-reveal>Resort with indoor games, outdoor sports and a rain dance in Igatpuri — made for families, friends and colleagues alike.</p></div>
  </div>
  ${EXPERIENCES.map((x, i) => `<div class="container split ${i % 2 ? 'split--rev' : ''}" id="${x.key}" style="margin-bottom:clamp(3rem,7vw,7rem)">
    <div class="split__media" data-clip>${pic(x.image, { alt: `${x.name} at Manas Lifestyle Resort, Igatpuri`, sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
    <div class="split__text"><span class="feature__n">${String(i + 1).padStart(2, '0')}</span><h2 class="h2" data-split>${x.name}</h2><p class="lead" data-reveal>${x.text}</p>${extra(x.key)}</div>
  </div>`).join('')}
</section>
<section class="section section--dark">
  <div class="container">
    <div class="shead"><div>${eyebrow('Full list')}<h2 class="h2" data-split>Everything to do at Manas</h2></div><p class="lead" data-reveal>As published by the resort. Some activities depend on season and availability.</p></div>
    <div class="features">${FACILITY_GROUPS.map((g, i) => `<div class="feature" data-reveal><span class="feature__n">${String(i + 1).padStart(2, '0')}</span><h3>${g.title}</h3><ul>${g.items.map(t => `<li>${t}</li>`).join('')}</ul></div>`).join('')}</div>
    <div class="placeholder-note" style="margin-top:3rem;border-color:var(--champagne);color:var(--ivory);background:rgba(194,164,107,.1)" data-reveal><strong>Guest information.</strong> ${FACILITY_CHARGES.join(' ')}</div>
  </div>
</section>
${faqBlock(faqs, { title: 'Activities: what guests ask' })}
${reviewsSection({ title: 'Fun, by our guests’ account' })}
${ctaBand({ image: 'arcade', title: 'Come for the pool. Stay for everything else.', secondary: ['Plan a group outing', '/corporate/'] })}`;
  return {
    path: '/facilities/',
    meta: {
      title: 'Resort Activities & Facilities in Igatpuri | Manas Lifestyle',
      description: 'Swimming pool, rain dance, arcade, indoor and outdoor games, magic shows, pottery and EV charging at Manas Lifestyle Resort, Igatpuri. See the full activity list.',
      path: '/facilities/', image: 'pool-1', crumbs,
      schema: [faqSchema(faqs)],
    },
    body,
    swiper: true,
  };
}

function extra(key) {
  const map = {
    pool: '<p data-reveal>Shallow and deeper sections make it easy for every age to swim safely, and the lawns around it are perfect for drying off in the sun. Pair it with <a href="/rooms/premium-room/">a Premium Room</a> or <a href="/rooms/studio-suite/">Studio Suite</a> for the shortest walk to the water.</p>',
    rain: '<p data-reveal>A favourite of families and school groups, the rain dance turns an ordinary afternoon into a party. Slides, swings and — subject to availability — an inflatable balloon add to the fun.</p>',
    arcade: '<p data-reveal>Challenge friends to air hockey, race cars and bikes, or shoot hoops on the basketball arcade. Arcade games are charged per game.</p>',
    indoor: '<p data-reveal>When the monsoon sets in, the indoor games room comes alive: table tennis, a pool table (₹100 per game), carrom and chess, plus Ludo, Sequence, Jenga, Monopoly and more.</p>',
    outdoor: '<p data-reveal>Book the cricket turf or pickleball court by the hour, or join a friendly game of badminton or football on the lawns. Wooden challenge games like Foot Fight, Coin Combat and Tilt Tower bring out everyone’s competitive side.</p>',
    magic: '<p data-reveal>Our magician’s sleight of hand and mind-boggling illusions are a highlight for children — and a surprise hit with the adults.</p>',
    pottery: '<p data-reveal>A calm, creative hour at the potter’s wheel, guided by skilled instructors. Pot making is ₹100 per pot.</p>',
    ev: '<p data-reveal>Driving electric from Mumbai or Nashik? Charge on site while you enjoy your stay.</p>',
  };
  return map[key] || '';
}

// ---------------------------------------------------------------- /dining/
export function dining() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Dining', href: '/dining/' }];
  const faqs = [
    ['What restaurants are there at Manas Lifestyle Resort?', 'Baithak (à la carte Indian cuisine), Café Fusion (all-day dining with breakfast, lunch and dinner buffets) and Sweet Poison (bar lounge with mocktails and cocktails). In-room dining is also available.'],
    ['Is Manas a multi-cuisine restaurant in Igatpuri?', 'Yes. Guests enjoy Indian — including Maharashtrian and Malvani dishes — alongside continental, Chinese and Thai favourites, according to guest reviews and our menus.'],
    ['Can non-resident guests dine at the restaurant?', 'Please call the resort on +91 98500 02234 to check availability for walk-in or group dining.'],
    ['Do you cater for weddings and corporate events?', 'Yes. Our chefs plan menus for weddings, receptions and conferences, including Jain, Gujarati and Rajasthani spreads and international cuisine.'],
    ['Is outside food allowed?', 'Outside food and beverages are not permitted at the resort.'],
  ];
  const outlet = (o, i) => `<article class="outlet" id="${o.id}">
    <div class="outlet__media">
      <div class="o1" data-clip>${pic(o.images[0], { alt: o.alts[0], sizes: '(max-width: 1023px) 100vw, 40vw' })}</div>
      <div class="o2" data-clip>${pic(o.images[1], { alt: o.alts[1], sizes: '20vw' })}</div>
      <div class="o3" data-clip>${pic(o.images[2], { alt: o.alts[2], sizes: '20vw' })}</div>
    </div>
    <div class="outlet__text">
      <span class="outlet__kicker">${o.kicker}</span>
      <h2 data-split>${o.name}</h2>
      ${o.text.map(t => `<p data-reveal>${t}</p>`).join('')}
      <div class="outlet__actions" data-reveal>${o.menu ? btn('View menu (PDF)', o.menu, { variant: 'line', attrs: 'target="_blank" rel="noopener"' }) : ''}${btn('Reserve a table', `tel:${SITE.phones.reservations.tel}`, { variant: 'solid' })}</div>
    </div>
  </article>`;
  const outlets = [
    { id: 'baithak', name: 'Baithak', kicker: 'Indian · À la carte', images: ['baithak-1', 'baithak-2', 'baithak-3'], alts: ['Baithak restaurant seating', 'Baithak dining area', 'Baithak interiors'],
      menu: '/wp-content/uploads/2025/09/Baithak-Menu.pdf',
      text: ['Inspired by the traditional gathering it is named after, Baithak is warm, welcoming and proudly Indian. The à la carte menu travels the country — rich North Indian curries, Maharashtrian classics and coastal Malvani flavours — each dish prepared with care and authenticity.', 'Guests often mention the Chicken Manchow soup, biryani, Burmese khow suey and, in season, the aamras pani puri. In the monsoon, a window table with the hills disappearing into the mist is the best seat in Igatpuri.'] },
    { id: 'cafe-fusion', name: 'Café Fusion', kicker: 'All-day dining · Buffets', images: ['cf-main', 'cf-salad', 'cf-dessert-2'], alts: ['Café Fusion buffet main course', 'Café Fusion salad bar', 'Café Fusion dessert counter'],
      text: ['Bright, cheerful and home-style, Café Fusion is where the resort gathers for breakfast, lunch and dinner buffets. Families, friends and colleagues fill their plates from a main-course spread, a salad bar and the dessert counters our guests rave about.', 'Prefer something specific? The kitchen is happy to accommodate chef-crafted preferences — and yes, some tables have swings for chairs.'] },
    { id: 'sweet-poison', name: 'Sweet Poison', kicker: 'Bar lounge', images: ['sp-sitout', 'sp-bar', 'sp-1'], alts: ['Sweet Poison lounge sit-out', 'Sweet Poison bar counter', 'Sweet Poison lounge interiors'],
      menu: '/wp-content/uploads/2025/09/Sweet-poison-Menu.pdf',
      text: ['Pre-dinner drinks, post-dinner conversations and quiet celebrations: the Sweet Poison bar lounge is made for unwinding. Choose from cocktails and mocktails in a relaxed, versatile space indoors and on the sit-out.', 'Ask the bar team about seasonal specials — the mango mocktail is a guest favourite in summer.'] },
  ];
  const body = `
${pageHero({ image: 'dining-feature', alt: 'Entrance to Baithak restaurant at Manas Lifestyle Resort', eyebrow: 'Taste the extraordinary', title: 'Multi-cuisine dining in Igatpuri', lead: 'Three distinct spaces — Baithak, Café Fusion and the Sweet Poison bar lounge — plus in-room dining, all from one generous kitchen.', crumbs })}
<section class="section">
  <div class="container split">
    <div class="split__text">
      ${eyebrow('Food is the key to the heart')}
      <h2 class="h2" data-split>Bold flavours, warm interiors, unhurried meals.</h2>
      <p class="lead" data-reveal>From sumptuous vegetarian fare to international favourites, dining at Manas is designed around every palate — and around the long, happy meals that make a holiday.</p>
      <p data-reveal>Our chefs cook Indian, Maharashtrian, Malvani, continental and Asian dishes, and for weddings and events they build menus around Jain, Gujarati and Rajasthani traditions too. Celebrating? Ask about candle-lit dinners, poolside dining and customised menus.</p>
    </div>
    <div class="split__media" data-clip>${pic('chef', { alt: 'Chef at work in the Manas Lifestyle Resort kitchen', sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
  </div>
</section>
<section class="section section--sand" style="padding-top:2rem"><div class="container">${outlets.map(outlet).join('')}</div></section>
<section class="section">
  <div class="container split split--rev">
    <div class="split__media" data-clip>${pic('cf-sitout', { alt: 'Café Fusion sit-out area', sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
    <div class="split__text">${eyebrow('In-room dining')}<h2 class="h2" data-split>Dinner, without leaving the room.</h2><p class="lead" data-reveal>Every room, suite and villa offers in-room dining — ideal for slow breakfasts and rainy evenings.</p><div data-reveal>${btn('In-room dining', '/ird/', { variant: 'line' })}</div></div>
  </div>
</section>
${faqBlock(faqs, { title: 'Dining at Manas' })}
<section class="section section--sand" id="enquire">
  <div class="container contact-grid">
    <div>${eyebrow('Group dining & events')}<h2 class="h2" data-split>Planning a meal for a group?</h2><p class="lead" data-reveal>Birthdays, family lunches, corporate dinners and celebrations — tell us the occasion and the number of guests.</p></div>
    ${enquiryForm('general')}
  </div>
</section>
${ctaBand({ image: 'cf-dessert', title: 'Come hungry. Leave happy.', secondary: ['Plan a celebration', '/weddings/'] })}`;
  const restaurants = outlets.map(o => ({
    '@type': o.id === 'sweet-poison' ? 'BarOrPub' : 'Restaurant',
    '@id': `${abs('/dining/')}#${o.id === 'baithak' ? 'baithak' : o.id}`,
    name: `${o.name} at ${SITE.name}`,
    servesCuisine: o.id === 'sweet-poison' ? ['Cocktails', 'Mocktails'] : ['Indian', 'Maharashtrian', 'Multi-cuisine'],
    ...(o.menu ? { hasMenu: o.menu } : {}),
    image: abs(imgUrl(o.images[0], 1600)),
    address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.locality, addressRegion: SITE.address.region, postalCode: SITE.address.postalCode, addressCountry: 'IN' },
    telephone: SITE.phones.reservations.tel,
    containedInPlace: { '@id': HOTEL_ID },
  }));
  return {
    path: '/dining/',
    meta: {
      title: 'Luxury Multi-Cuisine Restaurant in Igatpuri | Manas Lifestyle Dining',
      description: 'Dine at Baithak (Indian à la carte), Café Fusion (buffets) and the Sweet Poison bar lounge at Manas Lifestyle Resort — a multi-cuisine restaurant in Igatpuri.',
      path: '/dining/', image: 'dining-feature', crumbs,
      schema: [...restaurants, faqSchema(faqs)],
    },
    body,
  };
}

// ---------------------------------------------------------------- /ird/ (in-room dining) — preserved URL
export function ird() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Dining', href: '/dining/' }, { label: 'In-room dining', href: '/ird/' }];
  const body = `
${pageHero({ image: 'cf-dessert-2', alt: 'Desserts prepared by the Manas kitchen', eyebrow: 'In-room dining', title: 'In-room dining menu', lead: 'Meals from our multi-cuisine kitchen, delivered to your room, suite or villa.', crumbs, size: 'sm' })}
<section class="section">
  <div class="container container--narrow prose">
    <p class="lead" data-reveal>In-room dining is available in every room category at Manas Lifestyle Resort — perfect for a lazy breakfast on the veranda, a private dinner in your suite or a late snack after the games room.</p>
    <p data-reveal>The in-room dining menu is placed in your room on arrival. To order, dial the in-house number from your room phone. For dietary requirements or a special celebration dinner, speak to the team at reception.</p>
    <p class="placeholder-note" data-reveal><strong>Content needed:</strong> the current in-room dining menu (PDF or item list) was not published on the old page. Upload it here before launch so this URL keeps its value. See docs/04-asset-inventory.md.</p>
    <p data-reveal>${btn('Restaurant menus & dining', '/dining/', { variant: 'line' })}</p>
  </div>
</section>`;
  return {
    path: '/ird/',
    meta: { title: 'In-Room Dining Menu | Manas Lifestyle Resort Igatpuri', description: 'In-room dining at Manas Lifestyle Resort, Igatpuri — multi-cuisine meals from our kitchen delivered to your room, suite or villa.', path: '/ird/', image: 'cf-dessert-2', crumbs },
    body,
  };
}
