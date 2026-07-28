import { handleShare } from './worker.js';

const mk = (u, ua) => new Request(u, { headers: { 'user-agent': ua } });
const BOT = 'LinkedInBot/1.0 (compatible; Mozilla/5.0)';
const HUMAN = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126';
const base = 'https://share.example.nz/';
const q = new URLSearchParams({
  title: 'Megatron',
  desc: 'Three published council averages are above the household-weighted comparison and two are below it. Waikato District is $507 below the comparison.',
  name: 'Megatron: Three published council averages are above the comparison...',
  result: 'https://www.amalgamator.nz/?m=1b26~Megatron:0:0a0b',
});
const compact = new URLSearchParams({
  m: '1b6~The%20Winterless%20Council:0:0001',
});

// 1. Crawler gets compact-link tags
let r = await handleShare(mk(base + '?' + compact, BOT));
let html = await r.text();
const tag = (p) => (html.match(new RegExp(`<meta property="${p}" content="([^"]*)"`)) || [])[1];
const nmtag = (p) => (html.match(new RegExp(`<meta name="${p}" content="([^"]*)"`)) || [])[1];
console.log('crawler status  :', r.status);
console.log('og:title        :', tag('og:title'));
console.log('og:description  :', tag('og:description'));
console.log('og:image        :', tag('og:image'));
console.log('twitter:card    :', nmtag('twitter:card'));

// 2. Human gets exact compact-link redirect
r = await handleShare(mk(base + '?' + compact, HUMAN));
console.log('human status    :', r.status, '->', r.headers.get('location'));

// 3. Full legacy query remains supported
r = await handleShare(mk(base + '?' + q, BOT));
html = await r.text();
console.log('full legacy title:', tag('og:title'));
console.log('full legacy desc :', tag('og:description'));

// 4. Legacy `name` only
const legacy = new URLSearchParams({ name: 'Aoraki Council: One published council average is above the comparison.', result: 'https://www.amalgamator.nz/?m=x' });
r = await handleShare(mk(base + '?' + legacy, BOT));
html = await r.text();
console.log('legacy title    :', tag('og:title'));
console.log('legacy desc     :', tag('og:description'));

// 5. Open redirect blocked
const evil = new URLSearchParams({ result: 'https://evil.invalid/phish' });
r = await handleShare(mk(base + '?' + evil, HUMAN));
console.log('open redirect   :', r.status, '->', r.headers.get('location'));

// 6. HTML injection blocked
const inj = new URLSearchParams({ title: '"><script>alert(1)</script>', result: 'https://www.amalgamator.nz/' });
r = await handleShare(mk(base + '?' + inj, BOT));
html = await r.text();
console.log('injection escaped:', !html.includes('<script>alert(1)'), '| title:', tag('og:title'));

// 7. Invalid compact state is rejected
const invalid = new URLSearchParams({ m: '1b6~Bad Name:0:0001&result=https://evil.invalid' });
r = await handleShare(mk(base + '?' + invalid, HUMAN));
console.log('invalid state   :', r.status, '->', r.headers.get('location'));

// 8. No params at all
r = await handleShare(mk(base, BOT));
html = await r.text();
console.log('bare title      :', tag('og:title'));
console.log('bare desc       :', tag('og:description'));
