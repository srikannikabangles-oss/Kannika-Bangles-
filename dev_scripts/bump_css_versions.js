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

const v = "?v=20260821_101";

const files = walk(".");
files.forEach(f => {
  let content = fs.readFileSync(f, "utf8");
  content = content.replace(/\/css\/styles\.css(\?v=[^"'\s>]+)?/g, `/css/styles.css${v}`);
  content = content.replace(/\/css\/mobile\.css(\?v=[^"'\s>]+)?/g, `/css/mobile.css${v}`);
  content = content.replace(/\/css\/shop\.css(\?v=[^"'\s>]+)?/g, `/css/shop.css${v}`);
  content = content.replace(/\/css\/pages\.css(\?v=[^"'\s>]+)?/g, `/css/pages.css${v}`);
  content = content.replace(/\/css\/home\.css(\?v=[^"'\s>]+)?/g, `/css/home.css${v}`);
  fs.writeFileSync(f, content, "utf8");
  console.log("Bumped CSS version in " + f);
});
