const fs = require('fs');
const path = require('path');

function removeGalleryFromFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Remove Gallery from navbar
  content = content.replace(/<li role="none">\s*<a href="\/gallery\.html"[^>]*>[\s\S]*?<\/li>\s*/gi, '');
  content = content.replace(/<li role="none">\s*<a href="\/gallery"[^>]*>[\s\S]*?<\/li>\s*/gi, '');

  // Remove Photo Gallery from footer
  content = content.replace(/<li>\s*<a href="\/gallery\.html"[^>]*>.*?<\/a>\s*<\/li>\s*/gi, '');
  content = content.replace(/<li>\s*<a href="\/gallery"[^>]*>.*?<\/a>\s*<\/li>\s*/gi, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removed gallery links from: ${path.relative(path.join(__dirname, '..'), filePath)}`);
  }
}

function walkDir(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git') {
        walkDir(fullPath);
      }
    } else if (item.endsWith('.html') || item.endsWith('.js')) {
      if (item !== 'remove_gallery.js' && item !== 'generate_gallery.js') {
        removeGalleryFromFile(fullPath);
      }
    }
  }
}

const rootDir = path.join(__dirname, '..');
walkDir(rootDir);

// Delete gallery.html if exists
const galleryFile = path.join(rootDir, 'gallery.html');
if (fs.existsSync(galleryFile)) {
  fs.unlinkSync(galleryFile);
  console.log('Deleted gallery.html');
}

console.log('✅ Gallery removal completed!');
