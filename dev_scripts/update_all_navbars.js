const fs = require('fs');
const path = require('path');

const newBangaloreBridalDropdown = `        <!-- Bangalore Bridal Dropdown -->
        <li role="none" class="navbar__dropdown-item">
          <a href="/bridal-jewellery-bangalore" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Bangalore Bridal</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/bridal-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Jewellery Bangalore</span><span class="navbar__dropdown-desc">Complete South Indian wedding suites &amp; sets</span></span></a></li>
            <li><a href="/temple-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Temple Jewellery Bangalore</span><span class="navbar__dropdown-desc">Antique matte Nakshi &amp; Lakshmi harams</span></span></a></li>
            <li><a href="/muhurtham-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="heart"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Muhurtham Jewellery</span><span class="navbar__dropdown-desc">Traditional wedding bangles &amp; Kemp chokers</span></span></a></li>
            <li><a href="/reception-and-sangeet-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Reception &amp; Sangeet</span><span class="navbar__dropdown-desc">Kundan, AD diamonds &amp; cocktail bridal sets</span></span></a></li>
            <li><a href="/haldi-and-mehendi-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sun"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Haldi &amp; Mehendi</span><span class="navbar__dropdown-desc">Floral antique jewellery &amp; colourful bangles</span></span></a></li>
          </ul>
        </li>`;

const simpleBlogLink = `        <!-- Simple Direct Blog Link -->
        <li role="none"><a href="/blog" class="navbar__link" role="menuitem"><span class="navbar__link-text">Blog</span></a></li>`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Replace Bangalore Bridal Dropdown
  const bridalRegex = /<!-- Bangalore Bridal Dropdown -->[\s\S]*?<\/li>\s*(?=\s*<li role="none"><a href="\/gallery)/i;
  if (bridalRegex.test(content)) {
    content = content.replace(bridalRegex, newBangaloreBridalDropdown + '\n\n');
  }

  // 2. Replace Blog Dropdown with simple Blog Link
  const blogDropdownRegex = /<!-- Blog Dropdown -->[\s\S]*?<\/ul>\s*<\/li>/i;
  if (blogDropdownRegex.test(content)) {
    content = content.replace(blogDropdownRegex, simpleBlogLink);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated navbar in: ${path.relative(path.join(__dirname, '..'), filePath)}`);
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
    } else if (item.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

const rootDir = path.join(__dirname, '..');
walkDir(rootDir);
console.log('✅ Navbar update completed across all HTML pages!');
