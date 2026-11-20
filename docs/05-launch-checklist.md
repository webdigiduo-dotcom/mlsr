# Launch checklist and open questions

## Needs the resort's confirmation (nothing below was invented — these are gaps or conflicts)
| # | Item | Why |
|---|------|-----|
| 1 | **Booking-engine date pre-fill** | The booking bar sends `checkIn`, `checkOut`, `rooms` and `adults` to Simplotel. Ask Simplotel to confirm the parameter names; if they are ignored, guests land on the engine without dates (it still works). |
| 2 | **Banquet capacity wording** | The old site said "up to 400" (home page), "700–1,200" (weddings/FAQ) and gave per-venue figures (banquets). The new site uses the per-venue table: ballroom reception 500, Cottage Lawn 700, Royal Lawn 1,200. |
| 3 | **Room sizes and occupancy** | Sizes are unpublished for the Urban, Luxe, Signature and Harmony rooms and all Urban Villas, and maximum occupancy is unpublished everywhere. Pages say "on request". Send the figures and they go into `build/data/rooms.mjs`. |
| 4 | **Reversed logo** | `images/logo-reverse.*` was generated from the official logo (ink → ivory) for use over photos. It needs brand approval, or supply an official reversed file. |
| 5 | **Google rating** | "4.5 · 387 reviews" was copied from the old site's widget. Update it in `build/data/site.mjs` before launch and periodically after. |
| 6 | **Ubud / 2–15 BHK villas** | These live on manaslifestylevillas.com. The new site links there rather than duplicating them. Decide whether villa pages should exist on one domain only, to avoid the two sites competing for the same searches. |
| 7 | **In-room dining menu** | `/ird/` had no readable content. Supply the menu. |
| 8 | **Privacy policy and terms** | These are drafts and need legal review. |
| 9 | **Photography** | 52 photos are under 1000 px wide (most room galleries). See `asset-inventory.csv`. Please send hi-res originals, plus photos of the rain dance, the Royal and Cottage lawns set up for events, food close-ups, and a hero video. |
| 10 | **Analytics IDs** | Set `gtmId` (preferred) or `ga4Id` in `site.mjs`. Events already sent: `booking_click`, `booking_search`, `generate_lead`, `phone_click`, `whatsapp_click`. |

## Pre-launch (staging)
- [ ] `node build/audit.mjs` → No issues found
- [ ] Crawl staging with Screaming Frog. Compare titles, H1s and canonicals against `seo-baseline-old-site.csv`
- [ ] Test every row of `url-migration-map.csv` (200 for KEEP, a single 301 hop for redirects)
- [ ] Check the Rich Results Test on home, a room page, dining, the FAQ page and one article
- [ ] Submit each form type on staging and confirm the email arrives and `api/data/enquiries.csv` is written
- [ ] Run Lighthouse (mobile) on home, a room page and weddings. Targets: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1
- [ ] Block staging from indexing (password-protect it). Remove the protection at launch

## Launch day
- [ ] Deploy `site/`. Keep the old `/wp-content/uploads/` folder on the server if possible (images Google has indexed that we don't use)
- [ ] Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools; remove the old Rank Math sitemaps
- [ ] Inspect the home page and the top 10 landing pages with URL Inspection → Request indexing

## Monitoring (at 7, 14, 30, 60 and 90 days)
Compare against the pre-launch baseline: indexed pages, crawl errors, 404s, clicks and impressions by page, positions for the keywords in `keyword-map.csv`, and enquiry and booking-click conversions. If a page drops sharply, diagnose the cause (indexing, title change, content, internal links) before changing URLs or rewriting.
