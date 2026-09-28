const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchBundle(url, cb) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      const nextUrl = res.headers.location.startsWith('http') ? res.headers.location : 'https://unpkg.com' + res.headers.location;
      return fetchBundle(nextUrl, cb);
    }
    let bundle = '';
    res.on('data', chunk => bundle += chunk);
    res.on('end', () => cb(bundle));
  }).on('error', err => console.error(err));
}

fetchBundle('https://unpkg.com/lucide@latest/dist/umd/lucide.js', (bundle) => {
    // Collect all data-lucide icons used in project
    const root = path.join(__dirname, '..');
    const iconsMap = new Map();

    function scan(dir) {
      for (const item of fs.readdirSync(dir)) {
        if (item === 'node_modules' || item === '.git' || item === 'dev_scripts') continue;
        const full = path.join(dir, item);
        if (fs.statSync(full).isDirectory()) {
          scan(full);
        } else if (item.endsWith('.html') || item.endsWith('.js')) {
          const content = fs.readFileSync(full, 'utf8');
          const matches = content.matchAll(/data-lucide=["']([^"']+)["']/g);
          for (const m of matches) {
            const name = m[1];
            if (name.includes('${')) continue; // template variable
            if (!iconsMap.has(name)) iconsMap.set(name, new Set());
            iconsMap.get(name).add(path.relative(root, full));
          }
        }
      }
    }
    scan(root);

    console.log(`Total unique static icon names found: ${iconsMap.size}`);
    const broken = [];
    for (const [icon, files] of iconsMap.entries()) {
      // In Lucide UMD, icon dictionary has keys in kebab-case or pascal-case
      // e.g. "shopping-bag" -> "ShoppingBag"
      const pascal = icon.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
      const inBundle = bundle.includes(`"${icon}"`) || bundle.includes(`'${icon}'`) || bundle.includes(`"${pascal}"`) || bundle.includes(`${pascal}:`);
      if (!inBundle) {
        broken.push({ icon, files: Array.from(files) });
      }
    }

    console.log(`\nBroken / Missing Lucide Icons: ${broken.length}`);
    for (const b of broken) {
      console.log(`❌ "${b.icon}" in: ${b.files.slice(0, 3).join(', ')}${b.files.length > 3 ? ' +' + (b.files.length - 3) + ' more' : ''}`);
    }
});
