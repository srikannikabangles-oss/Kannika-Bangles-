const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const missing = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(root, filePath);
  
  // match img src, data-src, background: url()
  const patterns = [
    /<img[^>]+src=["']([^"']+)["']/gi,
    /<img[^>]+data-src=["']([^"']+)["']/gi,
    /url\(["']?([^"')]+)["']?\)/gi,
    /image:\s*["']([^"']+)["']/gi
  ];

  for (const regex of patterns) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const src = match[1].trim();
      if (!src || src.startsWith('http') || src.startsWith('data:') || src.startsWith('//')) continue;
      
      // clean query params and hashes
      const cleanPath = src.split('?')[0].split('#')[0].replace(/^\.?\//, '');
      const fullPath = path.join(root, cleanPath);
      
      if (!fs.existsSync(fullPath)) {
        missing.push({ file: rel, src, fullPath: cleanPath });
      }
    }
  }
}

function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.git' || item === 'dev_scripts') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (item.endsWith('.html') || item.endsWith('.css') || item.endsWith('.js')) {
      checkFile(full);
    }
  }
}

walk(root);

console.log(`Found ${missing.length} missing image/asset references:\n`);
const uniqueMissing = new Map();
for (const m of missing) {
  if (!uniqueMissing.has(m.src)) uniqueMissing.set(m.src, []);
  uniqueMissing.get(m.src).push(m.file);
}

for (const [src, files] of uniqueMissing.entries()) {
  console.log(`❌ Missing: ${src}`);
  console.log(`   Referenced in (${files.length} files): ${files.slice(0, 5).join(', ')}${files.length > 5 ? ' ...' : ''}\n`);
}
