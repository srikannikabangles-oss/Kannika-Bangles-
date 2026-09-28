const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('blog.html', 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;
const cards = doc.querySelectorAll('.blog-card');
console.log(`Total blog cards on blog.html: ${cards.length}`);

cards.forEach((c, idx) => {
  const title = c.querySelector('.blog-card__title')?.textContent?.trim();
  const href = c.getAttribute('href');
  console.log(`  ${idx + 1}. [${title}] -> ${href}`);
});
