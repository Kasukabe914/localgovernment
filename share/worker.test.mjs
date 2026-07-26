import { handleShare } from './worker.js';

const mk = (u, ua) => new Request(u, { headers: { 'user-agent': ua } });
const BOT = 'LinkedInBot/1.0 (compatible; Mozilla/5.0)';
const HUMAN = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126';
const base = 'https://share.example.nz/';
const q = new URLSearchParams({
  title: 'Megatron',
  desc: '3 of 5 councils would pay more, 2 would pay less. Waikato District pays $507 less a year.',
  name: 'Megatron: 3 of 5 councils would pay more...',
  result: 'https://kasukabe914.github.io/localgovernment/?m=1b26~Megatron:0:0a0b',
});

// 1. Crawler gets tags
let r = await handleShare(mk(base + '?' + q, BOT));
let html = await r.text();
const tag = (p) => (html.match(new RegExp(`<meta property="${p}" content="([^"]*)"`)) || [])[1];
const nmtag = (p) => (html.match(new RegExp(`<meta name="${p}" content="([^"]*)"`)) || [])[1];
console.log('crawler status  :', r.status);
console.log('og:title        :', tag('og:title'));
console.log('og:description  :', tag('og:description'));
console.log('og:image        :', tag('og:image'));
console.log('twitter:card    :', nmtag('twitter:card'));

// 2. Human gets redirect
r = await handleShare(mk(base + '?' + q, HUMAN));
console.log('human status    :', r.status, '->', r.headers.get('location'));

// 3. Legacy `name` only
const legacy = new URLSearchParams({ name: 'Aoraki Council: 1 of 3 councils would pay more.', result: 'https://kasukabe914.github.io/localgovernment/?m=x' });
r = await handleShare(mk(base + '?' + legacy, BOT));
html = await r.text();
console.log('legacy title    :', tag('og:title'));
console.log('legacy desc     :', tag('og:description'));

// 4. Open redirect blocked
const evil = new URLSearchParams({ result: 'https://evil.invalid/phish' });
r = await handleShare(mk(base + '?' + evil, HUMAN));
console.log('open redirect   :', r.status, '->', r.headers.get('location'));

// 5. HTML injection blocked
const inj = new URLSearchParams({ title: '"><script>alert(1)</script>', result: 'https://kasukabe914.github.io/localgovernment/' });
r = await handleShare(mk(base + '?' + inj, BOT));
html = await r.text();
console.log('injection escaped:', !html.includes('<script>alert(1)'), '| title:', tag('og:title'));

// 6. No params at all
r = await handleShare(mk(base, BOT));
html = await r.text();
console.log('bare title      :', tag('og:title'));
console.log('bare desc       :', tag('og:description'));
