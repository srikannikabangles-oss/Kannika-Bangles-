const fs = require('fs');
const path = require('path');

const version = '20260821_103';

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Update scripts version queries
  content = content.replace(/(src="[^"]*\.js)\?v=[^"]*(")/g, `$1?v=${version}$2`);
  content = content.replace(/(href="[^"]*\.css)\?v=[^"]*(")/g, `$1?v=${version}$2`);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated assets in: ${filePath}`);
  }
}

const files = fs.readdirSync('.');
for (const f of files) {
  if (f.endsWith('.html')) {
    updateFile(f);
  }
}
