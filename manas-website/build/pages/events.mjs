import { pic, btn, eyebrow, icon, ctaBand, faqBlock, faqSchema, pageHero, enquiryForm, abs, imgUrl, SITE, HOTEL_ID } from '../lib.mjs';
import { VENUES } from '../data/content.mjs';
import { reviewsSection } from './home.mjs';

const capTable = v => `<table class="capacity"><thead><tr>${Object.keys(v.capacity).map(k => `<th scope="col">${k}</th>`).join('')}</tr></thead><tbody><tr>${Object.values(v.capacity).map(n => `<td>${n.toLocaleString('en-IN')}</td>`).join('')}</tr></tbody></table>`;

const venueBlock = v => `<article class="venue" id="${v.key}">
  <div class="venue__media" data-clip>${pic(v.image, { alt: `${v.name} at Manas Lifestyle Resort, Igatpuri`, sizes: '(max-width: 1023px) 100vw, 55vw' })}</div>
  <div>
    <span class="outlet__kicker">${v.type}</span>
    <h2 class="h2" data-split>${v.name}</h2>
    <p class="venue__big" data-reveal><span data-count="${v.area.replace(',', '')}">${v.area}</span><small style="font-size:.3em;letter-spacing:.1em"> SQ FT</small></p>
    <p data-reveal>${v.text}</p>
    <p class="muted" data-reveal>Dimensions: ${v.dims}</p>
    <div data-reveal>${capTable(v)}</div>
  </div>
</article>`;

const venueSchema = () => ({
  '@type': 'EventVenue', '@id': `${abs('/banquets/')}#venues`, name: `Banquet halls and lawns at ${SITE.name}`,
  containedInPlace: { '@id': HOTEL_ID }, url: abs('/banquets/'),
  maximumAttendeeCapacity: 1200,
  amenityFeature: VENUES.map(v => ({ '@type': 'LocationFeatureSpecification', name: `${v.name} (${v.area} sq ft)`, value: true })),
});

// ---------------------------------------------------------------- /weddings/
export function weddings() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Weddings', href: '/weddings/' }];
  const faqs = [
    ['How many guests can a wedding at Manas host?', 'Our venues host from intimate ceremonies to grand celebrations: the Mist Ballroom takes up to 500 guests reception-style, the Cottage Lawn up to 700 and the Royal Lawn up to 1,200.'],
    ['Do you host pre-wedding functions?', 'Yes — Mehendi, Sangeet, Haldi and engagement ceremonies, using the lawns and halls across the resort.'],
    ['Can guests stay at the resort?', 'Yes. Cottages, rooms, suites and private pool villas mean most of your guests can stay on site. Ask the wedding team to block rooms for your dates.'],
    ['What food can be served?', 'Our chefs create personally curated menus — authentic Jain, Gujarati and Rajasthani dishes through to international spreads.'],
    ['Do you offer destination wedding packages?', 'Yes. Packages can cover venues, décor, catering and accommodation. Share your date and guest count for a tailored proposal.'],
    ['Can you host a small or intimate wedding?', 'Yes. Mist I and Mist II, or a section of the Cottage Lawn, work beautifully for smaller ceremonies and private functions.'],
  ];
  const body = `
${pageHero({ image: 'wedding-4', alt: 'Wedding celebration at Manas Lifestyle Resort, Igatpuri', eyebrow: 'Love’s eternal celebration', title: 'Wedding resort in Igatpuri', lead: 'A pillarless ballroom, two open-air lawns, rooms for every guest and a kitchen that cooks your family’s favourite dishes — 120 km from Mumbai.', crumbs, actions: btn('Plan my wedding', '#enquire', { variant: 'gold' }) + btn(`Call ${SITE.phones.weddings.display}`, `tel:${SITE.phones.weddings.tel}`, { variant: 'ghost' }) })}
<section class="section">
  <div class="container split">
    <div class="split__text">
      ${eyebrow('You dream it, we fulfil it')}
      <h2 class="h2" data-split>A destination wedding, a short drive from Mumbai.</h2>
      <p class="lead" data-reveal>Your wedding happens once. Our wedding team’s job is to make sure every detail — from the baraat to the bidaai — feels effortless for you and unforgettable for your guests.</p>
      <p data-reveal>Manas offers one of the largest pillarless banquets in Igatpuri and multiple venues across the resort, together hosting approximately 700–1,200 guests. Hill views make a natural backdrop for photographs, while cottages, suites and villas keep the whole family under one roof for every function.</p>
    </div>
    <div class="split__media" data-clip>${pic('wedding-1', { alt: 'Bride’s entry under a floral canopy on the lawn', sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
  </div>
</section>
<section class="section section--dark">
  <div class="container">
    <div class="shead"><div>${eyebrow('Why couples choose Manas')}<h2 class="h2" data-split>Everything for the wedding, in one place.</h2></div></div>
    <div class="features">
      <div class="feature" data-reveal><span class="feature__n">01</span><h3>Scenic splendour</h3><p>Green lawns and the Sahyadri hills create a romantic backdrop for ceremonies and pictures.</p></div>
      <div class="feature" data-reveal><span class="feature__n">02</span><h3>Fascinating venues</h3><p>From the Mist Ballroom to the Cottage Lawn, with seating customised to your plan. <a href="/banquets/">Compare venues</a>.</p></div>
      <div class="feature" data-reveal><span class="feature__n">03</span><h3>Luxury accommodation</h3><p>Rooms, suites and private pool villas for family and guests, right beside the celebrations. <a href="/all-accommodations/">See stays</a>.</p></div>
      <div class="feature" data-reveal><span class="feature__n">04</span><h3>Curated dining</h3><p>Jain, Gujarati and Rajasthani specialities to grand international spreads, cooked by our chefs.</p></div>
      <div class="feature" data-reveal><span class="feature__n">05</span><h3>Every function</h3><p>Mehendi, Haldi, Sangeet, engagement, wedding and reception — each in a setting of its own.</p></div>
      <div class="feature" data-reveal><span class="feature__n">06</span><h3>A dedicated team</h3><p>Our wedding team arranges the small things and the big ones, to your requirements.</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="shead"><div>${eyebrow('Venues')}<h2 class="h2" data-split>Where the celebrations happen</h2></div>${btn('Full venue details', '/banquets/', { variant: 'line' })}</div>
    <div class="related">${VENUES.slice(0, 3).map(v => `<a class="stay-card" href="/banquets/#${v.key}" data-reveal><div class="stay-card__media" data-clip>${pic(v.image, { alt: v.name, sizes: '(max-width: 640px) 100vw, 33vw' })}<span class="stay-card__more">${icon('arrow')}</span></div><div class="stay-card__body"><h3 class="stay-card__name">${v.name}</h3><span class="stay-card__meta">Up to ${v.capacity.Reception.toLocaleString('en-IN')} guests</span></div><p class="stay-card__teaser">${v.type} · ${v.area} sq ft</p></a>`).join('')}</div>
  </div>
</section>
<section class="section section--ivory2" aria-labelledby="wg-title">
  <div class="container">
    <div class="shead"><div>${eyebrow('Captivating visuals')}<h2 class="h2" id="wg-title" data-split>Weddings at Manas</h2></div><p class="lead" data-reveal>Real celebrations hosted at the resort.</p></div>
    <div class="masonry">${['wedding-1', 'wedding-2', 'wedding-3', 'wedding-4', 'wedding-5', 'wedding-6', 'wedding-7', 'wedding-8', 'wedding-9'].map((k, i) => `<button class="masonry__item" type="button" data-lightbox="wed" data-src="${imgUrl(k, 2400)}" data-caption="Wedding at Manas Lifestyle Resort" data-reveal>${pic(k, { alt: `Wedding celebration at Manas Lifestyle Resort, Igatpuri — photo ${i + 1}`, sizes: '(max-width: 640px) 100vw, 33vw' })}</button>`).join('')}</div>
  </div>
</section>
${faqBlock(faqs, { title: 'Planning your wedding' })}
<section class="section section--sand" id="enquire">
  <div class="container contact-grid">
    <div>${eyebrow('Wedding enquiry')}<h2 class="h2" data-split>Let’s plan your wedding</h2>
      <p class="lead" data-reveal>Share your date, guest count and functions. Our wedding team will call you with venue availability and a tailored proposal.</p>
      <div class="contact-cards" data-reveal>
        <div class="contact-card"><h3>Wedding desk</h3><p><a href="tel:${SITE.phones.weddings2.tel}">${SITE.phones.weddings2.display}</a><br><a href="tel:${SITE.phones.weddings.tel}">${SITE.phones.weddings.display}</a></p></div>
        <div class="contact-card"><h3>Email</h3><p><a href="mailto:${SITE.weddingEmail}" style="font-size:1.1rem">${SITE.weddingEmail}</a></p></div>
      </div>
    </div>
    ${enquiryForm('wedding')}
  </div>
</section>
${reviewsSection({ title: 'From families who celebrated here' })}
${ctaBand({ image: 'wedding-6', title: 'Your forever begins in Igatpuri.', primary: ['Enquire now', '#enquire'], secondary: ['Explore venues', '/banquets/'] })}`;
  return {
    path: '/weddings/',
    meta: {
      title: 'Luxury Wedding Resort in Igatpuri | Manas Lifestyle Resort',
      description: 'Plan a destination wedding at Manas Lifestyle Resort, Igatpuri: a pillarless ballroom, lawns for up to 1,200 guests, on-site stays and curated menus. Enquire today.',
      path: '/weddings/', image: 'wedding-4', crumbs,
      schema: [venueSchema(), faqSchema(faqs)],
    },
    body,
    swiper: true,
  };
}

// ---------------------------------------------------------------- /banquets/
export function banquets() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Banquets & lawns', href: '/banquets/' }];
  const faqs = [
    ['What is the largest banquet hall at Manas?', 'The Mist Ballroom: 4,660 sq ft (88′ × 53′ × 13′), seating 350 theatre-style or 500 for a reception.'],
    ['How many guests can the lawns hold?', 'The Royal Lawn (22,500 sq ft) holds up to 1,200 for a reception and the Cottage Lawn (17,400 sq ft) up to 700.'],
    ['Can the ballroom be divided?', 'Yes. Mist I and Mist II are 2,330 sq ft each and seat 100 theatre-style or 200 for a reception.'],
    ['Which events can I host?', 'Weddings and receptions, engagements, birthdays and anniversaries, conferences, seminars, training programmes and corporate celebrations.'],
    ['Is there parking for guests and buses?', 'Yes, ample free parking is available, including space for buses.'],
  ];
  const body = `
${pageHero({ image: 'mist-cluster-blue', alt: 'Mist Ballroom banquet set-up at Manas Lifestyle Resort', eyebrow: 'Where celebrations become legendary', title: 'Banquet halls &amp; lawns in Igatpuri', lead: 'Two indoor halls and two open-air lawns — from a 50-person boardroom to a 1,200-guest reception.', crumbs, actions: btn('Check venue availability', '#enquire', { variant: 'gold' }) })}
<section class="section">
  <div class="container">
    <div class="shead"><div>${eyebrow('Unforgettable celebrations in elegant spaces')}<h2 class="h2" data-split>Four venues. Every kind of occasion.</h2></div><p class="lead" data-reveal>Weddings, corporate gatherings and social events, planned meticulously and executed by a dedicated team.</p></div>
    <div class="prose" style="max-width:none" data-reveal><table>
      <thead><tr><th>Venue</th><th>Area (sq ft)</th><th>Theatre</th><th>Classroom</th><th>Cluster</th><th>U-shape</th><th>Reception</th><th>Boardroom</th></tr></thead>
      <tbody>${VENUES.map(v => `<tr><td><a href="#${v.key}">${v.name}</a></td><td>${v.area}</td>${['Theatre', 'Classroom', 'Cluster', 'U-shape', 'Reception', 'Boardroom'].map(k => `<td>${v.capacity[k] ? v.capacity[k].toLocaleString('en-IN') : '—'}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>
    ${VENUES.map(venueBlock).join('')}
  </div>
</section>
${faqBlock(faqs, { title: 'Venue questions' })}
<section class="section section--sand" id="enquire">
  <div class="container contact-grid">
    <div>${eyebrow('Book a banquet')}<h2 class="h2" data-split>Check venue availability</h2><p class="lead" data-reveal>Tell us the date, the occasion and how many guests. We will confirm availability and send seating options.</p>
      <p data-reveal>Weddings: <a href="tel:${SITE.phones.weddings.tel}">${SITE.phones.weddings.display}</a><br>Corporate: <a href="tel:${SITE.phones.corporate.tel}">${SITE.phones.corporate.display}</a></p></div>
    ${enquiryForm('banquet')}
  </div>
</section>
${ctaBand({ image: 'lawn-top', title: 'Room for every guest you love.', primary: ['Enquire now', '#enquire'], secondary: ['Weddings at Manas', '/weddings/'] })}`;
  return {
    path: '/banquets/',
    meta: {
      title: 'Banquet Halls & Lawn Venues in Igatpuri | Manas Lifestyle Resort',
      description: 'Banquet halls and lawns in Igatpuri: the 4,660 sq ft Mist Ballroom, Mist I & II, the Royal Lawn and Cottage Lawn — for 50 to 1,200 guests.',
      path: '/banquets/', image: 'mist-cluster-blue', crumbs,
      schema: [venueSchema(), faqSchema(faqs)],
    },
    body,
  };
}

// ---------------------------------------------------------------- /corporate/
export function corporate() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Corporate events', href: '/corporate/' }];
  const services = ['Annual events', 'Doctor conferences', 'Day conferences', 'Residential conferences', 'Quarterly meets', 'Seminars', 'Educational tours', 'Staff outings', 'Corporate day picnics'];
  const faqs = [
    ['Is Manas a good venue for a corporate offsite near Mumbai?', 'Yes. The resort is about 120 km (around 2.5 hours) from Mumbai and 40 km from Nashik, with conference halls, lawns, rooms and villas, dining and team activities on one campus.'],
    ['What conference facilities are available?', 'The Mist Ballroom seats up to 350 theatre-style or 120 boardroom-style, and Mist I and II each seat 100 theatre-style. The resort lists fully equipped conference rooms, projectors, audio systems and high-speed internet.'],
    ['Can you organise team-building activities?', 'Yes — cricket turf, pickleball, badminton, football, wooden challenge games, indoor games and group activities can be arranged for teams.'],
    ['Do you offer residential conference packages?', 'Yes. Packages can be tailored for day and residential conferences, combining venues, accommodation and meals.'],
    ['Who do I contact for corporate bookings?', `Call the corporate desk on ${SITE.phones.corporate.display} or email ${SITE.email}.`],
  ];
  const body = `
${pageHero({ image: 'mist-theatre', alt: 'Mist Ballroom set theatre-style for a corporate conference', eyebrow: 'Where spreadsheets meet the Sahyadris', title: 'Corporate event venue in Igatpuri', lead: 'Conferences, offsites and team outings with halls, lawns, rooms and dining on one campus — a 2.5-hour drive from Mumbai.', crumbs, actions: btn('Request a proposal', '#enquire', { variant: 'gold' }) + btn(`Call ${SITE.phones.corporate.display}`, `tel:${SITE.phones.corporate.tel}`, { variant: 'ghost' }) })}
<section class="section">
  <div class="container split">
    <div class="split__text">
      ${eyebrow('Corporate retreats near Mumbai')}
      <h2 class="h2" data-split>Get the team out of the office — and into the hills.</h2>
      <p class="lead" data-reveal>From a one-day strategy session to a three-day residential conference, Manas gives your team space to think, meet and play.</p>
      <p data-reveal>Work in the pillarless Mist Ballroom or the smaller Mist I and II, break for lunch at Café Fusion, and end the day with cricket on the turf or a quiet drink at Sweet Poison. Rooms, suites and private pool villas keep the whole group on site, with customisable packages and a team that supports you from planning to execution.</p>
    </div>
    <div class="split__media" data-clip>${pic('corp-2', { alt: 'Corporate group at Manas Lifestyle Resort', sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
  </div>
</section>
<section class="section section--dark">
  <div class="container">
    <div class="shead"><div>${eyebrow('Our corporate event services')}<h2 class="h2" data-split>Events we host</h2></div></div>
    <div class="features">${services.map((s, i) => `<div class="feature" data-reveal><span class="feature__n">${String(i + 1).padStart(2, '0')}</span><h3>${s}</h3></div>`).join('')}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="shead"><div>${eyebrow('Why Manas')}<h2 class="h2" data-split>Built for productive gatherings</h2></div></div>
    <div class="features">
      <div class="feature" data-reveal><span class="feature__n">01</span><h3>Large banquet, multiple venues</h3><p>A pillarless ballroom, divisible halls, two lawns and a spacious lounge for team-building.</p></div>
      <div class="feature" data-reveal><span class="feature__n">02</span><h3>Scenic, tranquil setting</h3><p>Nature all around — a calm backdrop for focused sessions and real downtime.</p></div>
      <div class="feature" data-reveal><span class="feature__n">03</span><h3>Modern facilities</h3><p>Equipped conference spaces, comfortable rooms and high-speed internet access.</p></div>
      <div class="feature" data-reveal><span class="feature__n">04</span><h3>Customisable packages</h3><p>Tailored to your group size, agenda, budget and duration.</p></div>
      <div class="feature" data-reveal><span class="feature__n">05</span><h3>Dedicated support</h3><p>An experienced team with you at every step, from planning to execution.</p></div>
      <div class="feature" data-reveal><span class="feature__n">06</span><h3>Exceptional dining</h3><p>Buffets, à la carte and themed dinners across our on-site restaurants.</p></div>
    </div>
  </div>
</section>
<section class="section section--ivory2">
  <div class="container">
    <div class="shead"><div>${eyebrow('Multimedia showcase')}<h2 class="h2" data-split>Corporate events at Manas</h2></div></div>
    <div class="masonry">${['corp-1', 'corp-2', 'corp-3', 'corp-4', 'corp-5', 'corp-6', 'mist-theatre-2', 'mist-cluster-black-2'].map((k, i) => `<button class="masonry__item" type="button" data-lightbox="corp" data-src="${imgUrl(k, 1600)}" data-caption="Corporate event at Manas Lifestyle Resort" data-reveal>${pic(k, { alt: `Corporate event at Manas Lifestyle Resort — photo ${i + 1}`, sizes: '(max-width: 640px) 100vw, 33vw' })}</button>`).join('')}</div>
  </div>
</section>
${faqBlock(faqs, { title: 'Corporate events: FAQs' })}
<section class="section section--sand" id="enquire">
  <div class="container contact-grid">
    <div>${eyebrow('Corporate enquiry')}<h2 class="h2" data-split>Request a proposal</h2><p class="lead" data-reveal>Share your dates, headcount and format. The corporate desk will respond with venue options and a package.</p><p data-reveal><a href="tel:${SITE.phones.corporate.tel}">${SITE.phones.corporate.display}</a> · <a href="mailto:${SITE.email}">${SITE.email}</a></p></div>
    ${enquiryForm('corporate')}
  </div>
</section>
${ctaBand({ image: 'mist-cluster-black', title: 'Your next offsite, sorted.', primary: ['Request a proposal', '#enquire'], secondary: ['See venues', '/banquets/'] })}`;
  return {
    path: '/corporate/',
    meta: {
      title: 'Corporate Resort & Event Venue in Igatpuri | Manas Lifestyle',
      description: 'Conferences, offsites and team outings near Mumbai at Manas Lifestyle Resort, Igatpuri — halls for up to 350 theatre-style, rooms, dining and activities.',
      path: '/corporate/', image: 'mist-theatre', crumbs,
      schema: [venueSchema(), faqSchema(faqs)],
    },
    body,
  };
}

// ---------------------------------------------------------------- /school-picnic/ (preserved URL)
export function schoolPicnic() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'School picnics', href: '/school-picnic/' }];
  const faqs = [
    ['What is the minimum and maximum group size for a school picnic?', 'We host groups of all sizes, from small classes to several hundred students at a time. Share your numbers and we will confirm availability.'],
    ['Do you offer one-day and overnight picnics?', 'Yes, both one-day picnics and overnight school trips.'],
    ['What meals are included?', 'Packages usually include breakfast, lunch and evening tea with snacks. Menus are child-friendly, include vegetarian options and can be customised.'],
    ['Is the resort safe for children?', 'Yes. The campus is secure, staff are trained and activity areas are supervised. Teachers remain in charge of their students and our team supports them throughout.'],
    ['How far is the resort from Mumbai?', 'About 120 km, on the Mumbai–Agra Highway at Talegaon, Igatpuri — a convenient day-trip destination.'],
    ['Is there parking for school buses?', 'Yes, there is ample parking for multiple buses.'],
    ['How can I book a school picnic?', `Call the corporate and group desk on ${SITE.phones.corporate.display} or email ${SITE.email} with your school name, date, group size and requirements.`],
  ];
  const schedule = [['9:00 AM', 'Arrival and welcome drink'], ['9:30 AM', 'Breakfast'], ['10:30 AM', 'Games, sports and arcade zone'], ['12:00 PM', 'Swimming pool and water fun (as per season)'], ['1:30 PM', 'Lunch'], ['2:30 PM', 'Indoor games, wooden games and creative activities'], ['4:00 PM', 'Tea and snacks'], ['4:30 PM', 'Group photos and departure']];
  const body = `
${pageHero({ image: 'outdoor-games', alt: 'Outdoor games area at Manas Lifestyle Resort', eyebrow: 'Where learning takes a break', title: 'School picnic resort in Igatpuri', lead: 'A safe, spacious and fun-filled day out for schools from Mumbai, Thane, Nashik and nearby cities.', crumbs, actions: btn('Enquire now', '#enquire', { variant: 'gold' }) })}
<section class="section">
  <div class="container split">
    <div class="split__text">
      ${eyebrow('Trusted by schools')}
      <h2 class="h2" data-split>More than 80 school picnics a year.</h2>
      <p class="lead" data-reveal>Surrounded by the green Sahyadri hills, Manas gives students a refreshing break from the classroom — open lawns, a swimming pool, games, good food and a team that looks after every detail.</p>
      <p data-reveal>Every year we host <strong>more than 80 school picnics</strong>, including large, well-known schools travelling in big groups. That experience means we can manage hundreds of students at a time, smoothly and safely, so teachers can relax and children can enjoy a day they will remember. From the moment your buses arrive until they leave, we handle the welcome, seating, activities, meals and supervision support.</p>
    </div>
    <div class="split__media" data-clip>${pic('indoor-games', { alt: 'Indoor games room for students', sizes: '(max-width: 1023px) 100vw, 50vw' })}</div>
  </div>
</section>
<section class="section section--dark">
  <div class="container">
    <div class="shead"><div>${eyebrow('Why schools choose Manas')}<h2 class="h2" data-split>Safe, spacious and genuinely fun</h2></div></div>
    <div class="features">
      <div class="feature" data-reveal><span class="feature__n">01</span><h3>80+ picnics a year</h3><p>The experience to handle large student groups with ease and care.</p></div>
      <div class="feature" data-reveal><span class="feature__n">02</span><h3>Large halls &amp; lawns</h3><p>Spacious banquet halls and wide lawns where hundreds of students can gather, play and eat comfortably.</p></div>
      <div class="feature" data-reveal><span class="feature__n">03</span><h3>Fun-filled activities</h3><p>Pool, rain dance, arcade, wooden games, indoor games, sports and creative activities for every age.</p></div>
      <div class="feature" data-reveal><span class="feature__n">04</span><h3>Safe &amp; student-friendly</h3><p>A secure campus, trained staff and clean surroundings for complete peace of mind.</p></div>
      <div class="feature" data-reveal><span class="feature__n">05</span><h3>Tasty, hygienic meals</h3><p>Fresh breakfast, lunch, snacks and evening tea, with menus planned for children.</p></div>
      <div class="feature" data-reveal><span class="feature__n">06</span><h3>Customisable packages</h3><p>Matched to your group size, budget, duration and activity preferences.</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div class="split__text">
      ${eyebrow('A typical one-day picnic')}
      <h2 class="h2" data-split>The day, hour by hour</h2>
      <ol class="timeline" data-reveal>${schedule.map(([t, d]) => `<li><time>${t}</time>${d}</li>`).join('')}</ol>
      <p class="muted" data-reveal>Timings can be customised to suit your school.</p>
    </div>
    <div class="split__text">
      ${eyebrow('Our school picnic services')}
      <ul class="highlights" data-reveal>${['One-day school picnics', 'Overnight school trips', 'Annual day outings', 'Primary school picnics', 'Secondary and junior college picnics', 'Kindergarten and nursery picnics', 'Educational tours', 'Teachers’ Day and staff outings', 'Sports day and team-building trips'].map(s => `<li>${icon('check')}<span>${s}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>
${faqBlock(faqs, { title: 'School picnic FAQs' })}
<section class="section section--sand" id="enquire">
  <div class="container contact-grid">
    <div>${eyebrow('Enquire')}<h2 class="h2" data-split>Plan your school picnic</h2><p class="lead" data-reveal>Tell us your school, preferred date and number of students. We will share a package and confirm availability.</p></div>
    ${enquiryForm('school')}
  </div>
</section>`;
  return {
    path: '/school-picnic/',
    meta: {
      title: 'School Picnic Resort in Igatpuri near Mumbai | Manas Lifestyle',
      description: 'Safe, fun school picnics in Igatpuri — 80+ hosted a year, with pool, games, child-friendly meals and bus parking. One-day and overnight trips.',
      path: '/school-picnic/', image: 'outdoor-games', crumbs,
      schema: [faqSchema(faqs)],
    },
    body,
  };
}

// ---------------------------------------------------------------- /service/ (preserved URL, services overview)
export function services() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/service/' }];
  const items = [
    ['Weddings', '/weddings/', 'wedding-1', 'Destination weddings and every pre-wedding function, with venues, rooms and catering in one place.'],
    ['Banquets', '/banquets/', 'mist-cluster-blue', 'Halls and lawns for 50 to 1,200 guests, with seating for every format.'],
    ['Corporate events', '/corporate/', 'mist-theatre', 'Conferences, offsites, seminars and staff outings near Mumbai and Nashik.'],
    ['Restaurants & bar', '/dining/', 'baithak-1', 'Baithak, Café Fusion and the Sweet Poison bar lounge, plus in-room dining.'],
    ['Accommodation', '/all-accommodations/', 'signature-1', 'Cottages, rooms, suites and private pool villas.'],
    ['School picnics', '/school-picnic/', 'outdoor-games', 'One-day and overnight trips for schools, with 80+ picnics hosted a year.'],
  ];
  const body = `
${pageHero({ image: 'entrance-fountain-2', alt: 'Entrance fountain at Manas Lifestyle Resort', eyebrow: 'Where excellence meets convenience', title: 'Luxury resort services in Igatpuri', lead: 'Stays, dining, weddings, banquets and corporate events — impeccable hospitality under one roof.', crumbs, size: 'md' })}
<section class="section">
  <div class="container">
    <div class="shead"><div>${eyebrow('Exceptional services, memorable experiences')}<h2 class="h2" data-split>What we can do for you</h2></div><p class="lead" data-reveal>Our contemporary resort brings together cottages, rooms and suites with venues and kitchens built for celebrations.</p></div>
    <div class="related">${items.map(([t, h, k, d]) => `<a class="stay-card" href="${h}" data-reveal><div class="stay-card__media" data-clip>${pic(k, { alt: t, sizes: '(max-width: 640px) 100vw, 33vw' })}<span class="stay-card__more">${icon('arrow')}</span></div><div class="stay-card__body"><h2 class="stay-card__name">${t}</h2></div><p class="stay-card__teaser">${d}</p></a>`).join('')}</div>
  </div>
</section>
${ctaBand({ image: 'pool-2' })}`;
  return {
    path: '/service/',
    meta: { title: 'Luxury Resort Services in Igatpuri | Manas Lifestyle Resort', description: 'Weddings, banquets, corporate events, dining, accommodation and school picnics at Manas Lifestyle Resort, Igatpuri — all the services of a luxury resort near Mumbai.', path: '/service/', image: 'entrance-fountain-2', crumbs },
    body,
  };
}
