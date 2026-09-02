const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory() && file !== "node_modules" && file !== ".git") {
      results = results.concat(walk(full));
    } else if (file.endsWith(".html")) {
      results.push(full);
    }
  });
  return results;
}

const newNav = `<ul class="navbar__links" id="navLinks" role="menubar">
        <li role="none"><a href="/index.html" class="navbar__link" role="menuitem">Home</a></li>
        <li role="none" class="navbar__dropdown-item">
          <a href="/shop" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            Jewellery <i data-lucide="chevron-down" style="width: 13px; height: 13px; margin-left: 2px;"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/shop" class="navbar__dropdown-link"><i data-lucide="gem" style="width: 14px; height: 14px;"></i> All Collections</a></li>
            <li><a href="/bangles" class="navbar__dropdown-link"><i data-lucide="circle" style="width: 14px; height: 14px;"></i> Bangles</a></li>
            <li><a href="/pendant-sets" class="navbar__dropdown-link"><i data-lucide="sparkles" style="width: 14px; height: 14px;"></i> Pendant Sets</a></li>
            <li><a href="/necklaces" class="navbar__dropdown-link"><i data-lucide="gem" style="width: 14px; height: 14px;"></i> Necklaces</a></li>
            <li><a href="/earrings" class="navbar__dropdown-link"><i data-lucide="sparkles" style="width: 14px; height: 14px;"></i> Earrings</a></li>
          </ul>
        </li>
        <li role="none"><a href="/blog" class="navbar__link" role="menuitem">Blog</a></li>
        <li role="none"><a href="/areas" class="navbar__link" role="menuitem">Areas We Serve</a></li>
        <li role="none"><a href="/about.html" class="navbar__link" role="menuitem">About Us</a></li>
        <li role="none"><a href="/contact.html" class="navbar__link" role="menuitem">Contact Us</a></li>
      </ul>`;

const files = walk(".");
files.forEach(f => {
  let content = fs.readFileSync(f, "utf8");
  if (content.includes("id=\"navLinks\"")) {
    content = content.replace(/<ul class="navbar__links" id="navLinks"[\s\S]*?<\/ul>/, newNav);
    fs.writeFileSync(f, content, "utf8");
    console.log("Updated navbar in " + f);
  }
});
