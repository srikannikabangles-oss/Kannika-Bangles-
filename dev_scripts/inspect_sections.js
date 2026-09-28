const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split(/\r?\n/);
lines.forEach((line, i) => {
  if (line.includes('<section') || line.includes('class="categories"') || line.includes('class="hero"')) {
    console.log((i+1) + ': ' + line.trim());
  }
});
