"""Keyword-to-URL map: every keyword has exactly ONE target page (no cannibalisation).
Search volumes are NOT included — pull them from Search Console / a keyword tool before prioritising."""
import csv, os
K = {
 '/': ('primary', ['best resort in igatpuri', 'luxury resort in igatpuri', 'best luxury resort in igatpuri', 'resort in igatpuri', 'resorts in igatpuri near mumbai', 'resort near mumbai', 'best resort near mumbai', 'resort near nashik', 'best resorts near nashik', 'luxury stay in igatpuri', 'weekend getaway near mumbai', 'top resort in igatpuri', 'igatpuri resort booking', 'manas lifestyle resort', 'manas resort igatpuri', 'manas lifestyle resort igatpuri', 'luxury resort near mumbai', 'resort in igatpuri with activities', 'hill station resort near mumbai', 'resort on mumbai nashik highway']),
 '/all-accommodations/': ('primary', ['luxury accommodation in igatpuri', 'rooms in igatpuri', 'luxury rooms in igatpuri', 'hotel rooms in igatpuri', 'family rooms in igatpuri', 'best place to stay in igatpuri', 'igatpuri resort rooms', 'resort rooms near mumbai', 'stay in igatpuri', 'book resort in igatpuri']),
 '/rooms/luxury-cottage/': ('long-tail', ['luxury cottages in igatpuri', 'cottage in igatpuri', 'garden view cottage igatpuri', 'cottage stay near mumbai']),
 '/rooms/premium-room/': ('long-tail', ['premium rooms in igatpuri', 'family room near pool igatpuri', 'room with extra bed igatpuri']),
 '/rooms/urban-room/': ('long-tail', ['budget luxury room igatpuri', 'urban room manas']),
 '/rooms/luxe-room/': ('long-tail', ['pool view room igatpuri', 'luxe room igatpuri']),
 '/rooms/junior-suite/': ('long-tail', ['family suites in igatpuri', 'junior suite igatpuri']),
 '/rooms/studio-suite/': ('long-tail', ['suite with balcony igatpuri', 'pool view suite igatpuri']),
 '/rooms/suite/': ('long-tail', ['suite with living room igatpuri', 'family suite near mumbai']),
 '/rooms/signature-suite/': ('long-tail', ['room with bathtub igatpuri', 'honeymoon suite igatpuri', 'couple friendly resort in igatpuri', 'resort for couples in igatpuri', 'anniversary stay near mumbai']),
 '/rooms/harmony-suite/': ('long-tail', ['luxury suites in igatpuri', 'suite with bathtub near mumbai']),
 '/villas/': ('primary', ['luxury villas in igatpuri', 'private villa in igatpuri', 'villa with private pool in igatpuri', 'pool villa near mumbai', 'villas in igatpuri for groups', 'private pool villa igatpuri', 'luxury villa near nashik', 'villa for family gathering igatpuri']),
 '/villas/royal-villa-4bhk/': ('long-tail', ['4 bhk villa in igatpuri', 'royal villa igatpuri', '4 bhk villa with private pool near mumbai']),
 '/villas/urban-villa-4bhk/': ('long-tail', ['4 bhk private pool villa igatpuri', 'villa with kitchen igatpuri']),
 '/villas/urban-villa-6bhk/': ('long-tail', ['6 bhk villa in igatpuri', '6 bhk villa near mumbai', 'large villa for family igatpuri']),
 '/villas/urban-villa-7bhk/': ('long-tail', ['7 bhk villa in igatpuri', '7 bhk villa near mumbai', 'villa for big group near mumbai']),
 '/facilities/': ('primary', ['resort with swimming pool in igatpuri', 'swimming pool resort in igatpuri', 'resort with indoor games in igatpuri', 'resort with outdoor activities in igatpuri', 'resort with rain dance in igatpuri', 'rain dance resort near mumbai', 'resort with arcade games in igatpuri', 'resort with ev charging in igatpuri', 'family resort in igatpuri', 'resort for kids near mumbai', 'pottery activity igatpuri', 'resort with cricket turf igatpuri', 'pickleball near nashik']),
 '/dining/': ('primary', ['multi cuisine restaurant in igatpuri', 'restaurant in igatpuri', 'best restaurant in igatpuri', 'baithak restaurant igatpuri', 'cafe fusion igatpuri', 'bar in igatpuri', 'buffet in igatpuri', 'restaurant on mumbai nashik highway', 'malvani food igatpuri']),
 '/ird/': ('supporting', ['in-room dining igatpuri resort', 'manas room service menu']),
 '/weddings/': ('primary', ['wedding resort in igatpuri', 'destination wedding in igatpuri', 'destination wedding resort in maharashtra', 'wedding venues near mumbai', 'wedding resort near nashik', 'wedding destination near mumbai', 'luxury wedding resort igatpuri', 'wedding packages igatpuri', 'mehendi sangeet venue igatpuri', 'small wedding venue near mumbai']),
 '/banquets/': ('primary', ['banquet hall in igatpuri', 'wedding lawn in igatpuri', 'reception venue in igatpuri', 'banquet hall near nashik', 'pillarless banquet hall igatpuri', 'party hall in igatpuri', 'event venue for 1000 guests near mumbai', 'conference hall in igatpuri']),
 '/corporate/': ('primary', ['corporate resort in igatpuri', 'corporate outing near mumbai', 'corporate retreat near mumbai', 'corporate team outing in igatpuri', 'corporate event venue in igatpuri', 'corporate stay near nashik', 'offsite venue near mumbai', 'residential conference venue near mumbai', 'team building resort near mumbai', 'doctor conference venue maharashtra']),
 '/school-picnic/': ('primary', ['school picnic spot near mumbai', 'school picnic resort igatpuri', 'one day picnic resort near mumbai', 'school trip resort near nashik', 'picnic spot near thane for schools']),
 '/offers/': ('transactional', ['igatpuri resort offers', 'resort packages igatpuri', 'anniversary package resort near mumbai', 'birthday celebration resort igatpuri', 'resort deals near mumbai']),
 '/location/': ('informational', ['igatpuri distance from mumbai', 'how to reach igatpuri', 'resort near kasara', 'igatpuri distance from nashik', 'igatpuri distance from pune', 'resort near igatpuri railway station', 'resort near camel valley igatpuri', 'resort near bhatsa river valley']),
 '/gallery/': ('supporting', ['manas lifestyle resort photos', 'igatpuri resort images', 'manas resort video']),
 '/about/': ('brand', ['about manas lifestyle resort', 'ashoka group resort igatpuri']),
 '/contact/': ('transactional', ['manas lifestyle resort contact number', 'manas resort igatpuri phone', 'manas lifestyle resort address']),
 '/faq/': ('informational', ['is manas lifestyle resort pet friendly', 'outside food allowed manas resort', 'manas resort check in']),
 '/places-to-visit-in-igatpuri/': ('blog', ['places to visit in igatpuri', 'igatpuri tourist places', 'igatpuri in summer']),
 '/things-to-do-in-igatpuri-travel-guide/': ('blog', ['things to do in igatpuri', 'igatpuri travel guide']),
 '/resort-in-igatpuri-distance-from-mumbai-pune-nashik/': ('blog', ['mumbai to igatpuri by road', 'igatpuri by train']),
 '/monsoon-destination-near-mumbai-igatpuri-resort/': ('blog', ['monsoon getaway near mumbai', 'igatpuri in monsoon']),
 '/how-to-plan-a-destination-wedding-in-igatpuri/': ('blog', ['how to plan a destination wedding', 'destination wedding checklist maharashtra']),
 '/resorts-for-corporate-outing-near-mumbai/': ('blog', ['resorts for corporate outing near mumbai list']),
 '/mango-festival-2026-igatpuri/': ('blog', ['mango festival igatpuri']),
 '/family-resort-near-mumbai-igatpuri-2-day-weekend-plan/': ('blog', ['2 day trip igatpuri itinerary', 'family weekend plan near mumbai']),
}
n = 0
with open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '..', 'docs', 'keyword-map.csv'), 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['keyword', 'intent_type', 'target_url', 'rule'])
    for url, (t, kws) in K.items():
        for k in kws:
            n += 1
            w.writerow([k, t, url, 'Only this URL targets this keyword; other pages link to it with descriptive anchor text'])
print(n, 'keywords')
