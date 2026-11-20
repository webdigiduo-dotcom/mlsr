// Shared verified content: guest reviews (as already published on the live site),
// experiences and facilities (from /facilities/), banquet venues (from /banquets/).

// Reviews are reproduced from the resort's own website (Google/Tripadvisor widgets) on 17 Nov 2026.
// Light trimming only, marked with an ellipsis. Do not add reviews that are not real.
export const REVIEWS = [
  { name: 'Navina Bole', source: 'Google', rating: 5, text: 'The food here is very good in terms of taste, quantity and quality. Spacious, neat and clean rooms… the staff is very helpful… Big swimming pool. I wished to extend the stay but the resort was running full.' },
  { name: 'Pooja Sharma', source: 'Google', rating: 5, text: 'Absolutely amazing experience! It’s the perfect place for a family trip, the ambience is so beautiful… Gaming zone, entertainment zone and activities are very entertaining. I highly recommend their seafood platter — and their dessert counters are the best!' },
  { name: 'Sachin N.', source: 'Google', rating: 5, text: 'The resort is very beautiful with a lot of activities including arcade games and indoor games… The dining area is very pretty, with a few tables having a swing as a chair, which we found very unique. The staff here is literally the best.' },
  { name: 'Sapan M', source: 'Tripadvisor', rating: 5, text: 'Delicious food. The staff is very supportive. We had a pleasant stay for 2 days. Property is very neat and clean… The foggy environment of Igatpuri was the cherry on the cake.' },
  { name: 'Bartosz K', source: 'Tripadvisor', rating: 5, text: 'We enjoyed the resort and the great restaurant. Dinner is tasty, quick service, nice staff… We planned to stay one night, but changed plans and stayed in the resort two nights.' },
  { name: 'Rupali N', source: 'Tripadvisor', rating: 5, text: 'It was my daughter’s wedding at Manas Lifestyle Resort. The service, food and hospitality were very good. All guests enjoyed the wedding… Staff very cooperative and helpful.' },
  { name: 'Nilesh P.', source: 'Google', rating: 5, text: 'A great place to relax and have fun. The rooms are clean and comfortable, the food is delicious, and the staff is friendly and helpful. There are plenty of activities to keep you entertained.' },
];

export const EXPERIENCES = [
  { key: 'pool', name: 'Swimming Pool', image: 'pool-2', text: 'A generous pool with different depths — easy family swims by day, glowing reflections by night.', cat: 'water' },
  { key: 'rain', name: 'Rain Dance', image: 'pool-1', text: 'Music, open sky and a rain shower to dance under until you are happily exhausted.', cat: 'water' },
  { key: 'arcade', name: 'Arcade Games', image: 'arcade', text: 'Air hockey, car and bike racing and basketball arcade — classic and modern games for every age.', cat: 'play' },
  { key: 'indoor', name: 'Indoor Games', image: 'indoor-games', text: 'Table tennis, pool table, chess, carrom and a shelf of board games for lazy afternoons.', cat: 'play' },
  { key: 'outdoor', name: 'Outdoor Games', image: 'outdoor-games', text: 'Cricket turf, badminton, football and a pickleball court in the fresh hill air.', cat: 'play' },
  { key: 'magic', name: 'Magic Shows', image: 'magic-show', text: 'Sleight of hand and mind-bending illusions that leave children — and parents — spellbound.', cat: 'evening' },
  { key: 'pottery', name: 'Pottery Making', image: 'pottery', text: 'Sit at the wheel with a skilled instructor and shape something to take home.', cat: 'create' },
  { key: 'ev', name: 'EV Charging', image: 'ev-charging', text: 'An on-site electric-vehicle charging station, so you can arrive and leave fully charged.', cat: 'convenience' },
];

export const FACILITY_GROUPS = [
  { title: 'Pool & water fun', items: ['Swimming pool', 'Rain dance', 'Slides', 'Swings', 'Inflatable balloon (subject to availability)'] },
  { title: 'Sports & adventure', items: ['Cricket turf', 'Cricket', 'Badminton', 'Football', 'Pickleball court'] },
  { title: 'Arcade games', items: ['Air hockey', 'Car racing', 'Bike racing', 'Basketball arcade game'] },
  { title: 'Indoor games & leisure', items: ['Table tennis', 'Pool table', 'Chess', 'Carrom', 'Ludo', 'Snakes & ladders', 'Sequence', 'Jenga', 'Monopoly', 'Playing cards'] },
  { title: 'Wooden games & fun challenges', items: ['Foot Fight', 'Coin Combat', 'Dare Drop', 'Snake Ball', 'Tilt Tower', 'Tic Tac Toe'] },
  { title: 'Creative & entertainment', items: ['Pot making with an instructor', 'Magic shows', 'DJ / live band (subject to availability)'] },
];

export const FACILITY_CHARGES = [
  'Cricket turf and pickleball court are chargeable by the hour.',
  'Arcade games are charged per game.',
  'Pool table: ₹100 per game.',
  'Pot making: ₹100 per pot.',
  'Inflatable balloon and DJ / live band are subject to availability.',
  'Please check activity timings and other charges with the resort team.',
];

export const VENUES = [
  {
    key: 'mist-ballroom', name: 'Mist Ballroom', type: 'Indoor · pillarless ballroom', image: 'mist-theatre',
    area: '4,660', dims: '88′ × 53′ × 13′',
    text: 'The grandest indoor space at Manas and one of the largest in Igatpuri — a pillarless ballroom that moves easily from a 350-seat conference to a 500-guest reception.',
    capacity: { Theatre: 350, Classroom: 180, Cluster: 150, 'U-shape': 120, Reception: 500, Boardroom: 120 },
  },
  {
    key: 'mist-1-2', name: 'Mist I & Mist II', type: 'Indoor · divisible halls', image: 'mist-cluster-black',
    area: '2,330', dims: '44′ × 53′ × 13′',
    text: 'The ballroom divides into two self-contained halls — right-sized for board meetings, training sessions, engagements and intimate receptions.',
    capacity: { Theatre: 100, Classroom: 60, Cluster: 50, 'U-shape': 50, Reception: 200, Boardroom: 50 },
  },
  {
    key: 'royal-lawn', name: 'Royal Lawn', type: 'Outdoor · open-air lawn', image: 'lawn-top',
    area: '22,500', dims: '225′ × 100′',
    text: 'A majestic open lawn framed by greenery — the setting for grand weddings, sangeet nights and receptions of up to 1,200 guests.',
    capacity: { Theatre: 800, Cluster: 400, Reception: 1200 },
  },
  {
    key: 'cottage-lawn', name: 'Cottage Lawn', type: 'Outdoor · garden lawn', image: 'garden',
    area: '17,400', dims: '174′ × 100′',
    text: 'A charming garden lawn beside the cottages, beautiful for haldi and mehendi mornings, cocktail evenings and receptions of up to 700.',
    capacity: { Theatre: 350, Cluster: 150, Reception: 700 },
  },
];
