// Single source of truth for verified business facts (NAP, contacts, booking engine).
// Every value here was taken from the live site on 17 Nov 2026 — see docs/01-seo-baseline.md.
// Items marked VERIFY need confirmation from the resort before launch.

export const SITE = {
  origin: 'https://manaslifestyleresort.in',
  name: 'Manas Lifestyle Resort',
  legalNote: 'A unit of Ashoka Group',
  tagline: 'Luxury resort in Igatpuri',
  locale: 'en_IN',
  address: {
    street: '286-A, Mumbai Agra Highway, Talegaon',
    locality: 'Igatpuri',
    district: 'Nashik',
    region: 'Maharashtra',
    postalCode: '422403',
    country: 'IN',
    full: '286-A, Mumbai Agra Highway, Talegaon, Igatpuri, Nashik, Maharashtra 422403',
  },
  headOffice: 'A 908, Pranik Chambers, Saki Vihar Road, Saki Naka, Andheri (E), Mumbai 400072',
  geo: { lat: 19.6979148, lng: 73.5265175 },
  mapsUrl: 'https://maps.app.goo.gl/QMkVTZCfUPnTer6X9',
  phones: {
    reservations: { label: 'Room reservations', tel: '+919850002234', display: '+91 98500 02234' },
    corporate: { label: 'Corporate & groups', tel: '+919850002245', display: '+91 98500 02245' },
    weddings: { label: 'Weddings', tel: '+919850002247', display: '+91 98500 02247' },
    weddings2: { label: 'Weddings', tel: '+919850002238', display: '+91 98500 02238' },
  },
  whatsapp: '919850002234',
  email: 'sales@manaslifestyleresort.in',
  weddingEmail: 'vivaah@manaslifestyleresort.in',
  booking: {
    // Simplotel booking engine already used by the live site. Date pre-fill params: VERIFY with Simplotel.
    base: 'https://bookings.manaslifestyleresort.in/',
    propertyId: '6207',
    promocode: 'manas15',
  },
  social: {
    facebook: 'https://www.facebook.com/manaslifestyleresortigatpuri',
    instagram: 'https://www.instagram.com/manaslifestyleresortigatpuri/',
    youtube: 'https://www.youtube.com/channel/UCRI4mBQCVnqNJViSo7myNEg',
    tripadvisor: 'https://www.tripadvisor.in/Hotel_Review-g1156428-d1173013-Reviews-Manas_Lifestyle_Resort-Igatpuri_Nashik_District_Maharashtra.html',
    googleReview: 'https://g.page/r/CacZb7jMZfWgEBM/review',
  },
  villasSite: 'https://www.manaslifestylevillas.com/',
  tourVideo: 'he9q2bRLa1Y',
  // Shown on the live site (Google widget) on 17 Nov 2026. VERIFY before launch; refresh periodically.
  rating: { value: '4.5', count: 387, source: 'Google' },
  distances: [
    { from: 'Mumbai', km: '120 km', time: 'about 2.5 hours by road' },
    { from: 'Thane', km: 'about 100 km', time: 'a little over 2 hours' },
    { from: 'Kalyan', km: 'about 90 km', time: 'a little over 2 hours' },
    { from: 'Nashik', km: '40 km', time: 'about 40 minutes' },
    { from: 'Pune', km: 'about 230 km', time: 'around 5 hours by road' },
    { from: 'Mumbai airport (CSMIA)', km: 'about 140 km', time: 'roughly 3 hours by taxi' },
  ],
  // Analytics IDs are intentionally empty; fill before launch (see docs/06-deployment.md).
  gtmId: '',
  ga4Id: '',
  enquiryEndpoint: '/api/enquiry.php',
};

export const bookingUrl = ({ checkIn, checkOut } = {}) => {
  const u = new URL(SITE.booking.base);
  u.searchParams.set('propertyId', SITE.booking.propertyId);
  u.searchParams.set('promocode', SITE.booking.promocode);
  if (checkIn) u.searchParams.set('checkIn', checkIn);
  if (checkOut) u.searchParams.set('checkOut', checkOut);
  return u.toString();
};

export const NAV = [
  {
    label: 'Stay', href: '/all-accommodations/', children: [
      { label: 'All accommodation', href: '/all-accommodations/' },
      { label: 'Rooms & suites', href: '/all-accommodations/#rooms' },
      { label: 'Private pool villas', href: '/villas/' },
      { label: 'Special offers', href: '/offers/' },
    ],
  },
  { label: 'Experiences', href: '/facilities/' },
  { label: 'Dining', href: '/dining/' },
  {
    label: 'Celebrate', href: '/weddings/', children: [
      { label: 'Weddings', href: '/weddings/' },
      { label: 'Banquets & lawns', href: '/banquets/' },
      { label: 'Corporate events', href: '/corporate/' },
      { label: 'School picnics', href: '/school-picnic/' },
    ],
  },
  { label: 'Gallery', href: '/gallery/' },
  {
    label: 'Resort', href: '/about/', children: [
      { label: 'About Manas', href: '/about/' },
      { label: 'Location & nearby', href: '/location/' },
      { label: 'Journal', href: '/blog/' },
      { label: 'FAQs', href: '/faq/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];
