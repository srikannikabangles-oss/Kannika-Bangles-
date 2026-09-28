const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file === 'areas' || file === 'blog') {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html') && !file.startsWith('google') && file !== 'admin.html') {
      results.push(fullPath);
    }
  });
  return results;
}

const rootDir = path.resolve(__dirname, '..');
const files = getHtmlFiles(rootDir);
let updatedCount = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('main.js') && !content.includes('auth.js')) {
    const regex = /(<script\s+src=["']\/js\/main\.js[^"']*["'][^>]*><\/script>)/i;
    if (regex.test(content)) {
      content = content.replace(regex, '<script src="/js/auth.js?v=20260916_201"></script>\n  $1');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Added auth.js to:', path.relative(rootDir, filePath));
      updatedCount++;
    }
  }
});
console.log('Total files updated:', updatedCount);
