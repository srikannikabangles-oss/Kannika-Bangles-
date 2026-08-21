const fs = require('fs');
const path = require('path');

function fixInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix price filter options or text like ?5,000 or ?49 or ?5000+
  // Replace ? followed by digits when used as price symbol
  content = content.replace(/\?(\d[\d,]*)/g, '?$1');
  content = content.replace(/\?(\d+)/g, '?$1');
  content = content.replace(/-\?(\d+)/g, '-?$1');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed Rupee symbols in: ${filePath}`);
  }
}

// Fix all html files in root, areas, blog, seo
const dirs = ['.', './areas', './blog', './seo', './js'];
for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.html') || f.endsWith('.js')) {
      fixInFile(path.join(dir, f));
    }
  }
}

console.log('Finished fixing Rupee encoding across all files.');
