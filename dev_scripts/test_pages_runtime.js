const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const http = require('http');
const fs = require('fs');
const path = require('path');

const urlsToTest = [
  '/',
  '/shop',
  '/bangles',
  '/necklaces',
  '/earrings',
  '/pendant-sets',
  '/product/1',
  '/cart',
  '/checkout',
  '/login',
  '/wishlist',
  '/about.html',
  '/contact',
  '/bridal-jewellery-bangalore',
  '/temple-jewellery-bangalore',
  '/blog',
  '/blog/bridal-bangles-guide-bangalore-wedding',
  '/areas/malleshwaram',
  '/delivery-policy.html',
  '/exchange-policy.html',
  '/no-return-policy.html'
];

async function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3001${urlPath}`, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        return resolve(fetchPage(res.headers.location));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data, url: urlPath }));
    }).on('error', reject);
  });
}

async function auditPageRuntime(urlPath) {
  const pageResult = await fetchPage(urlPath);
  const errors = [];
  const warnings = [];
  
  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.on('jsdomError', (err) => {
    errors.push(`JSDOM Error: ${err.message}`);
  });
  virtualConsole.on('error', (err) => {
    errors.push(`Console Error: ${typeof err === 'object' ? err.message || JSON.stringify(err) : err}`);
  });
  virtualConsole.on('warn', (warn) => {
    warnings.push(`Console Warn: ${typeof warn === 'object' ? warn.message || JSON.stringify(warn) : warn}`);
  });

  const dom = new JSDOM(pageResult.html, {
    url: `http://localhost:3001${urlPath}`,
    runScripts: 'dangerously',
    resources: 'usable',
    virtualConsole,
    beforeParse(win) {
      win.IntersectionObserver = class {
        constructor() {}
        observe() {}
        unobserve() {}
        disconnect() {}
      };
    }
  });

  // Wait 1.5 seconds for DOMContentLoaded and async scripts to run
  await new Promise(r => setTimeout(r, 1500));

  const doc = dom.window.document;

  // 1. Check for un-rendered lucide icons: <i data-lucide="..."> that didn't get replaced with <svg>
  const unrenderedLucide = [];
  doc.querySelectorAll('i[data-lucide]').forEach(el => {
    unrenderedLucide.push(el.getAttribute('data-lucide'));
  });

  // 2. Check for missing images
  const brokenImages = [];
  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (!src || src.trim() === '' || src === '#' || src === 'undefined') {
      brokenImages.push({ src, alt: img.getAttribute('alt') });
    } else if (src.startsWith('/') || src.startsWith('./') || !src.includes('://')) {
      const cleanPath = src.split('?')[0].replace(/^\.?\//, '');
      const fullDiskPath = path.join(__dirname, '..', cleanPath);
      if (!fs.existsSync(fullDiskPath)) {
        brokenImages.push({ src, alt: img.getAttribute('alt'), reason: 'File does not exist on disk' });
      }
    }
  });

  // 3. Check for broken links
  const deadLinks = [];
  doc.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '#' && !a.getAttribute('onclick') && !a.className.includes('tab') && !a.getAttribute('role')) {
      deadLinks.push({ text: a.textContent.trim().slice(0, 30), href });
    }
  });

  // 4. Check for undefined or NaN in text content
  const nanTexts = [];
  const walker = doc.createTreeWalker(doc.body, 4 /* NodeFilter.SHOW_TEXT */);
  while (walker.nextNode()) {
    const txt = walker.currentNode.nodeValue;
    if (txt && (txt.includes('NaN') || txt.includes('undefined') || txt.includes('null'))) {
      if (!walker.currentNode.parentElement.closest('script, style')) {
        const parent = walker.currentNode.parentElement;
        nanTexts.push({ text: txt.trim().slice(0, 50), tag: parent ? parent.tagName : 'unknown' });
      }
    }
  }

  return {
    url: urlPath,
    status: pageResult.status,
    title: doc.title,
    errors,
    unrenderedLucide,
    brokenImages,
    deadLinks,
    nanTexts
  };
}

async function run() {
  console.log(`Auditing ${urlsToTest.length} primary routes in live simulated browser...\n`);
  const summary = [];

  for (const u of urlsToTest) {
    try {
      const res = await auditPageRuntime(u);
      summary.push(res);
      console.log(`Tested: ${u.padEnd(45)} | Status: ${res.status} | Lucide unrendered: ${res.unrenderedLucide.length} | Broken Img: ${res.brokenImages.length} | Errors: ${res.errors.length}`);
      if (res.unrenderedLucide.length > 0) {
        console.log(`   -> Unrendered icons: ${[...new Set(res.unrenderedLucide)].join(', ')}`);
      }
      if (res.brokenImages.length > 0) {
        console.log(`   -> Broken images: ${res.brokenImages.map(i => i.src).join(', ')}`);
      }
      if (res.errors.length > 0) {
        console.log(`   -> Runtime errors: ${res.errors.slice(0, 3).join(' | ')}`);
      }
    } catch(err) {
      console.error(`Failed testing ${u}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'runtime_audit.json'), JSON.stringify(summary, null, 2), 'utf8');
  console.log('\nAudit complete! Results written to dev_scripts/runtime_audit.json');
}

run();
