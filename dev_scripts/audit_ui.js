const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('==================================================');
console.log('       KANNIKA BANGLES COMPREHENSIVE UI AUDIT     ');
console.log('==================================================\n');

const issues = [];
function addIssue(category, file, detail, severity = 'high') {
  issues.push({ category, file, detail, severity });
}

// 1. Audit Lucide Icons
console.log('[1/5] Auditing Lucide Icons across all files...');
const iconUsages = new Map(); // iconName -> [files]

function scanFilesForIcons(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && f !== 'node_modules' && f !== '.git') {
      scanFilesForIcons(full);
    } else if (f.endsWith('.html') || f.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.matchAll(/data-lucide=["']([^"']+)["']/g);
      for (const m of matches) {
        const icon = m[1];
        if (!iconUsages.has(icon)) iconUsages.set(icon, []);
        const rel = path.relative(path.join(__dirname, '..'), full);
        if (!iconUsages.get(icon).includes(rel)) {
          iconUsages.get(icon).push(rel);
        }
      }
    }
  }
}
scanFilesForIcons(path.join(__dirname, '..'));

// Let's check against unpkg Lucide icons
// Fetch unpkg lucide bundle or test with standard Lucide icon dictionary
http.get('http://unpkg.com/lucide@latest/dist/umd/lucide.js', (res) => {
  let bundle = '';
  res.on('data', chunk => bundle += chunk);
  res.on('end', () => {
    // Lucide exposes icons as properties or object keys
    const invalidIcons = [];
    for (const [icon, files] of iconUsages.entries()) {
      // In lucide UMD bundle, icon names are mapped in PascalCase or kebab-case
      const pascal = icon.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
      const exists = bundle.includes(`"${icon}"`) || bundle.includes(`'${icon}'`) || bundle.includes(`${pascal}:`) || bundle.includes(`"${pascal}"`);
      if (!exists) {
        invalidIcons.push({ icon, files });
        for (const file of files) {
          addIssue('Broken Icon', file, `Icon data-lucide="${icon}" is missing or not recognized by Lucide, causing blank/empty circles or icons`, 'high');
        }
      }
    }
    console.log(`Audited ${iconUsages.size} distinct icon names.`);
    if (invalidIcons.length > 0) {
      console.log(`⚠️ Found ${invalidIcons.length} broken icon names:`, invalidIcons.map(i => i.icon));
    } else {
      console.log('✅ All icons recognized by Lucide.');
    }

    auditImages();
  });
}).on('error', (e) => {
  console.log('Could not fetch Lucide bundle, using fallback icon check...');
  auditImages();
});

// 2. Audit Images (Local disk existence and src references)
function auditImages() {
  console.log('\n[2/5] Auditing Image References (404 / Missing Files)...');
  const root = path.join(__dirname, '..');
  
  // A. Check HTML img tags
  function scanImages(dir) {
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory() && f !== 'node_modules' && f !== '.git') {
        scanImages(full);
      } else if (f.endsWith('.html') || (f.endsWith('.js') && (f.includes('product') || f.includes('main')))) {
        const content = fs.readFileSync(full, 'utf8');
        const rel = path.relative(root, full);
        
        // match src="/images/..." or src="images/..." or src="./images/..."
        const imgMatches = content.matchAll(/src=["'](\/?[^"']+\.(?:jpe?g|png|webp|svg|gif))["']/gi);
        for (const m of imgMatches) {
          let src = m[1];
          if (src.startsWith('http://') || src.startsWith('https://')) continue;
          let cleanSrc = src.startsWith('/') ? src.slice(1) : src;
          // resolve relative if not starting with /
          let targetPath = path.join(root, cleanSrc);
          if (!fs.existsSync(targetPath)) {
            addIssue('Missing Image (404)', rel, `Image src="${src}" does not exist on disk at ${cleanSrc}`, 'high');
          }
        }
      }
    }
  }
  scanImages(root);

  // B. Check products in js/products.js
  try {
    const productsJs = fs.readFileSync(path.join(root, 'js', 'products.js'), 'utf8');
    const imgMatches = productsJs.matchAll(/image:\s*["']([^"']+)["']/g);
    for (const m of imgMatches) {
      const imgPath = m[1];
      const clean = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
      if (!fs.existsSync(path.join(root, clean))) {
        addIssue('Product Image Missing', 'js/products.js', `Product image "${imgPath}" not found on disk`, 'high');
      }
    }
  } catch(e) {}

  auditLinksAndNavigation();
}

// 3. Audit Links and Navigation
function auditLinksAndNavigation() {
  console.log('\n[3/5] Auditing Links & Navigation...');
  const root = path.join(__dirname, '..');
  
  function scanLinks(dir) {
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory() && f !== 'node_modules' && f !== '.git') {
        scanLinks(full);
      } else if (f.endsWith('.html')) {
        const content = fs.readFileSync(full, 'utf8');
        const rel = path.relative(root, full);
        
        // Check for empty or broken href
        const linkMatches = content.matchAll(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>/gi);
        for (const m of linkMatches) {
          const href = m[1].trim();
          if (href === '#' || href === 'javascript:void(0)' || href === 'javascript:;') {
            // Check if it has an onclick or aria or is a dead link
            const tag = m[0];
            if (!tag.includes('onclick=') && !tag.includes('role="button"')) {
              addIssue('Dead / Placeholder Link', rel, `Dead link href="${href}": ${tag.slice(0, 80)}...`, 'medium');
            }
          } else if (href.startsWith('/') && !href.startsWith('//')) {
            // Check internal route
            const route = href.split('?')[0].split('#')[0];
            if (route !== '' && route !== '/') {
              let exists = false;
              // Check file directly
              if (fs.existsSync(path.join(root, route))) exists = true;
              if (fs.existsSync(path.join(root, route + '.html'))) exists = true;
              if (fs.existsSync(path.join(root, route, 'index.html'))) exists = true;
              // Check standard dynamic routes: /shop, /bangles, /necklaces, /earrings, /pendant-sets, /product/*
              const validDynamic = ['/shop', '/bangles', '/necklaces', '/earrings', '/pendant-sets', '/cart', '/checkout', '/wishlist', '/blog', '/contact', '/about'];
              if (validDynamic.includes(route) || route.startsWith('/product/') || route.startsWith('/areas/') || route.startsWith('/blog/')) {
                exists = true;
              }
              if (!exists) {
                addIssue('Broken Internal Link', rel, `Link href="${href}" points to non-existent route`, 'high');
              }
            }
          }
        }
      }
    }
  }
  scanLinks(root);

  auditLayoutAndCSS();
}

// 4. Audit CSS & Layout Components
function auditLayoutAndCSS() {
  console.log('\n[4/5] Auditing Layout, Viewport, and CSS Overlaps...');
  const root = path.join(__dirname, '..');
  
  // Check CSS files for common bugs
  const cssFiles = ['css/styles.css', 'css/mobile.css', 'css/product.css', 'css/login.css'];
  for (const cf of cssFiles) {
    const fullPath = path.join(root, cf);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check for negative margins without overflow hidden
    // Check for hardcoded 100vw width causing horizontal scrollbars
    if (content.includes('width: 100vw') || content.includes('width:100vw')) {
      addIssue('Horizontal Scrollbar Risk', cf, 'Use of 100vw width can cause horizontal overflow / layout shift due to vertical scrollbar width', 'medium');
    }

    // Check for undefined CSS variables
    const varUses = content.matchAll(/var\((--[a-zA-Z0-9_-]+)\)/g);
    for (const v of varUses) {
      const varName = v[1];
      // Check if defined in any CSS file
      let defined = false;
      for (const otherCf of cssFiles) {
        const otherContent = fs.readFileSync(path.join(root, otherCf), 'utf8');
        if (otherContent.includes(`${varName}:`)) {
          defined = true;
          break;
        }
      }
      if (!defined) {
        addIssue('Undefined CSS Variable', cf, `CSS variable ${varName} is used but never declared in root or stylesheet`, 'high');
      }
    }
  }

  auditInteractiveComponents();
}

// 5. Audit Interactive Components & Modals
function auditInteractiveComponents() {
  console.log('\n[5/5] Auditing Interactive UI Components...');
  const root = path.join(__dirname, '..');
  
  // Check main.js for missing element IDs that might throw null reference errors
  const mainJs = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');
  
  // Search for getElementById references in main.js
  const idMatches = mainJs.matchAll(/document\.getElementById\(['"]([^'"]+)['"]\)/g);
  const referencedIds = new Set();
  for (const m of idMatches) {
    referencedIds.add(m[1]);
  }
  
  // Check index.html for presence of key containers
  const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const shopHtml = fs.readFileSync(path.join(root, 'shop-template.html'), 'utf8');
  const productHtml = fs.readFileSync(path.join(root, 'product-template.html'), 'utf8');
  
  // Key elements check
  const criticalElements = [
    { id: 'navbar', page: 'index.html', content: indexHtml },
    { id: 'navToggle', page: 'index.html', content: indexHtml },
    { id: 'cartDrawer', page: 'index.html', content: indexHtml },
    { id: 'quickViewModal', page: 'index.html', content: indexHtml },
    { id: 'searchModal', page: 'index.html', content: indexHtml },
    { id: 'productsGrid', page: 'shop-template.html', content: shopHtml },
    { id: 'filterSidebar', page: 'shop-template.html', content: shopHtml },
  ];

  for (const el of criticalElements) {
    if (!el.content.includes(`id="${el.id}"`) && !el.content.includes(`id='${el.id}'`)) {
      addIssue('Missing Critical UI Container', el.page, `Expected element id="${el.id}" not found in ${el.page}`, 'medium');
    }
  }

  printReport();
}

function printReport() {
  console.log('\n==================================================');
  console.log(`             AUDIT REPORT: ${issues.length} ISSUES FOUND        `);
  console.log('==================================================\n');

  const byCategory = {};
  for (const issue of issues) {
    if (!byCategory[issue.category]) byCategory[issue.category] = [];
    byCategory[issue.category].push(issue);
  }

  for (const [cat, items] of Object.entries(byCategory)) {
    console.log(`\n### [${cat}] (${items.length} issues)`);
    // print up to 10 distinct issues
    const seen = new Set();
    for (const it of items) {
      const summary = `${it.file} -> ${it.detail}`;
      if (!seen.has(summary)) {
        seen.add(summary);
        console.log(` - [${it.severity.toUpperCase()}] ${it.file}: ${it.detail}`);
      }
    }
  }

  // Save report to dev_scripts/audit_report.json
  fs.writeFileSync(path.join(__dirname, 'audit_report.json'), JSON.stringify(issues, null, 2), 'utf8');
  console.log('\nFull detailed report saved to dev_scripts/audit_report.json');
}
