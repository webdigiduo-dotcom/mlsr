# Deployment

## Option A: the current host (Apache or LiteSpeed with PHP; recommended)
1. Back up the WordPress site and database.
2. Configure `site/api/enquiry.php`: set the `$ROUTES` emails and `$FROM` (an address on your own domain with SPF/DKIM set up). Switch to SMTP if the host's `mail()` is unreliable.
3. Upload the **contents** of `site/` to the web root. `.htaccess` handles HTTPS, non-www, 301s, caching and security headers.
4. Make sure `api/data/` is writable by PHP and not publicly readable (its `.htaccess` denies access).
5. Leave `/wp-content/uploads/` in place (old indexed images and the menu PDFs).

## Option B: Netlify or Cloudflare Pages
Deploy `site/`. `_redirects` and `_headers` are included. PHP will not run there, so point `enquiryEndpoint` in `build/data/site.mjs` at a form service (Netlify Forms, Formspree or a serverless function) and rebuild.

## Updating content
Edit `build/data/*.mjs` or `build/pages/*.mjs`, then run `node build/build.mjs && node build/audit.mjs`, and upload `site/`.

## Libraries and fonts (self-hosted)
gsap 3.12.5 (+ScrollTrigger), lenis 1.1.13, split-type 0.3.4 and swiper 11.1.14 (only on pages with carousels) live in `site/js/vendor/`. Fonts (Libre Caslon Display, Outfit; Latin subset) live in `site/fonts/` and are preloaded. No third-party requests are needed to render a page.
