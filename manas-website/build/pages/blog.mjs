import { pic, btn, eyebrow, icon, ctaBand, pageHero, abs, imgUrl, ogUrl, esc, SITE, ORG_ID, bookingUrl } from '../lib.mjs';

const fmt = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
const slugify = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

// Topic → the commercial landing page each article should support (prevents cannibalisation:
// articles link UP to the money page for their intent; they never compete for its head term).
const TOPICS = [
  [/wedding/, ['Weddings at Manas', '/weddings/']],
  [/corporate/, ['Corporate events', '/corporate/']],
  [/restaurant|cuisine|mango/, ['Dining at Manas', '/dining/']],
  [/places|things-to-do|distance|monsoon|fog/, ['Location & nearby', '/location/']],
  [/couple/, ['Signature Suite', '/rooms/signature-suite/']],
  [/family/, ['Family rooms & suites', '/all-accommodations/']],
  [/swimming-pool/, ['Experiences & pool', '/facilities/']],
  [/.*/, ['Rooms & villas', '/all-accommodations/']],
];
const topicFor = slug => TOPICS.find(([re]) => re.test(slug))[1];

function cleanBody(html) {
  let s = html
    .replace(/<h2>\s*$/g, '')
    .replace(/(<(h2|h3|p|ul|ol|li|strong|em)>)\s*$/g, '')
    .replace(/<a href="tel:[^"]*">\s*Enquire Now\s*<\/a>/gi, '')
    .replace(/<h2>Plan Your[^<]*<\/h2>\s*$/i, '');
  // Balance any element left open at the end of the migrated content.
  const stack = [];
  s.replace(/<(\/?)(h2|h3|h4|p|ul|ol|li|strong|em|a|table|thead|tbody|tr|td|th|blockquote)\b[^>]*>/g, (m, close, tag) => {
    if (close) { const i = stack.lastIndexOf(tag); if (i > -1) stack.splice(i, 1); } else stack.push(tag);
    return m;
  });
  s += stack.reverse().map(t => `</${t}>`).join('');
  // Fix heading order from the old CMS: a heading that skips a level is promoted one step.
  let lastLvl = 2;
  const opened = [];
  s = s.replace(/<(\/?)h([2-4])>/g, (m, close, n) => {
    if (close) return `</h${opened.pop() || n}>`;
    let lvl = +n;
    if (lvl > lastLvl + 1) lvl = lastLvl + 1;
    lastLvl = lvl;
    opened.push(lvl);
    return `<h${lvl}>`;
  });
  // Anchor ids for in-page navigation.
  const seen = new Set();
  s = s.replace(/<h2>(.*?)<\/h2>/g, (m, inner) => {
    let id = slugify(inner) || 'section';
    while (seen.has(id)) id += '-2';
    seen.add(id);
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return s;
}

export function blogIndex(posts) {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Journal', href: '/blog/' }];
  const body = `
${pageHero({ image: 'garden', alt: 'Gardens at Manas Lifestyle Resort', eyebrow: 'The Manas journal', title: 'Igatpuri travel ideas &amp; resort guides', lead: 'Weekend plans, monsoon escapes, wedding planning and local guides from the team at Manas Lifestyle Resort.', crumbs, size: 'sm' })}
<section class="section">
  <div class="container posts">
    ${posts.map((p, i) => `<a class="post-card" href="${p.url}" data-reveal>
      ${pic(p.imageKey, { alt: p.h1 || p.title, sizes: i === 0 ? '(max-width: 1023px) 100vw, 66vw' : '(max-width: 640px) 100vw, 33vw' })}
      <time datetime="${p.datePublished}">${fmt(p.datePublished)}</time>
      <${i === 0 ? 'h2' : 'h3'}>${esc(p.h1 || p.title)}</${i === 0 ? 'h2' : 'h3'}>
    </a>`).join('')}
  </div>
</section>
${ctaBand({ image: 'pool-2' })}`;
  return {
    path: '/blog/',
    meta: {
      title: 'Manas Lifestyle Journal | Igatpuri Resort Tips & Travel Ideas',
      description: 'Travel tips, Igatpuri guides, monsoon getaways, wedding planning and family weekend ideas from Manas Lifestyle Resort.',
      path: '/blog/', image: 'garden', crumbs,
      schema: [{ '@type': 'Blog', '@id': `${abs('/blog/')}#blog`, name: 'Manas Lifestyle Journal', publisher: { '@id': ORG_ID }, blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.h1 || p.title, url: abs(p.url), datePublished: p.datePublished })) }],
    },
    body,
  };
}

export function blogPosts(posts) {
  return posts.map((p, i) => {
    const crumbs = [{ label: 'Home', href: '/' }, { label: 'Journal', href: '/blog/' }, { label: p.h1 || p.title, href: p.url }];
    const [topicLabel, topicHref] = topicFor(p.slug);
    const related = posts.filter(o => o !== p).sort((a, b) => sim(b.slug, p.slug) - sim(a.slug, p.slug)).slice(0, 4);
    const html = cleanBody(p.html);
    const toc = [...html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].slice(0, 10);
    const body = `
<section class="phero phero--md" data-phero>
  <div class="phero__media" data-parallax="0.15">${pic(p.imageKey, { alt: p.h1 || p.title, eager: true, priority: true })}</div>
  <div class="phero__shade"></div>
  <div class="phero__content container">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/blog/">Journal</a></li><li aria-current="page">Article</li></ol></nav>
    <p class="article__meta">Published ${fmt(p.datePublished)}${p.dateModified && p.dateModified.slice(0, 10) !== p.datePublished.slice(0, 10) ? ` · Updated ${fmt(p.dateModified)}` : ''} · ${Math.max(3, Math.round(p.words / 220))} min read</p>
    <h1 class="phero__title" style="max-width:22ch;font-size:clamp(2.2rem,1.4rem + 3vw,4.4rem)" data-split>${esc(p.h1 || p.title)}</h1>
  </div>
</section>
<section class="section">
  <div class="container article">
    <article class="prose">${html}</article>
    <aside class="article__aside">
      <div class="aside-card">
        ${eyebrow('Stay with us')}
        <h2>Manas Lifestyle Resort, Igatpuri</h2>
        <p>Cottages, suites and private pool villas, 120 km from Mumbai.</p>
        ${btn('Check availability', bookingUrl(), { variant: 'gold', cls: 'btn--sm', attrs: 'data-book rel="noopener"' })}
      </div>
      ${toc.length > 2 ? `<nav class="aside-links" aria-label="In this article"><h2>In this article</h2><ul>${toc.map(([, id, t]) => `<li><a href="#${id}">${t.replace(/<[^>]+>/g, '')}</a></li>`).join('')}</ul></nav>` : ''}
      <div class="aside-links"><h2>Plan your visit</h2><ul><li><a href="${topicHref}">${topicLabel}</a></li><li><a href="/all-accommodations/">Rooms &amp; villas</a></li><li><a href="/location/">How to reach Igatpuri</a></li><li><a href="/offers/">Current offers</a></li></ul></div>
    </aside>
  </div>
</section>
<section class="section section--sand">
  <div class="container">
    <div class="shead"><div>${eyebrow('Keep reading')}<h2 class="h2">More from the journal</h2></div>${btn('All articles', '/blog/', { variant: 'line' })}</div>
    <div class="posts" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">${related.map(o => `<a class="post-card" href="${o.url}" style="grid-column:auto">${pic(o.imageKey, { alt: o.h1 || o.title, sizes: '(max-width: 640px) 100vw, 25vw' })}<time datetime="${o.datePublished}">${fmt(o.datePublished)}</time><h3>${esc(o.h1 || o.title)}</h3></a>`).join('')}</div>
  </div>
</section>
${ctaBand({ image: i % 2 ? 'pool-2' : 'royal-pool' })}`;
    return {
      path: p.url,
      meta: {
        title: p.title, description: p.description || (p.h1 || p.title), path: p.url, image: p.imageKey, type: 'article', crumbs,
        schema: [{
          '@type': 'BlogPosting', '@id': `${abs(p.url)}#article`, headline: (p.h1 || p.title).slice(0, 110), description: p.description,
          image: ogUrl(p.imageKey), datePublished: p.datePublished, dateModified: p.dateModified || p.datePublished,
          author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID }, mainEntityOfPage: abs(p.url), wordCount: p.words, inLanguage: 'en-IN',
        }],
      },
      body,
    };
  });
}

function sim(a, b) {
  const A = new Set(a.split('-')); return b.split('-').filter(w => A.has(w) && w.length > 3).length;
}
