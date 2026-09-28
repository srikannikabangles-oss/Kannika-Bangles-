const fs = require('fs');
const path = require('path');

const htmlFiles = [];
function findHtml(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'brain') findHtml(full);
    } else if (f.endsWith('.html') && !f.includes('admin.html') && !f.includes('google')) {
      htmlFiles.push(full);
    }
  }
}
findHtml(path.join(__dirname, '..'));

console.log(`Total HTML files found: ${htmlFiles.length}`);
for (const f of htmlFiles) {
  const c = fs.readFileSync(f, 'utf8');
  const hasNav = c.includes('id="navbar"');
  if (!hasNav) {
    console.log('NO NAVBAR:', path.relative(path.join(__dirname, '..'), f));
  }
}
