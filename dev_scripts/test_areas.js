const http = require('http');

http.get('http://localhost:3001/areas', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const categories = [];
    const re = /class="product-card__category">([^<]+)<\/div>/g;
    let m;
    while ((m = re.exec(data)) !== null) {
      categories.push(m[1].trim());
    }
    console.log('Categories rendered in /areas curation grid:', categories);
  });
});
