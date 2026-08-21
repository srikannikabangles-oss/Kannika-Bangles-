const http = require('http');

http.get('http://localhost:3001/shop', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const cats = [];
    const re = /class="card__category">([^<]+)<\/span>/g;
    let m;
    while ((m = re.exec(data)) !== null) {
      cats.push(m[1].trim());
    }
    console.log('Total products on /shop:', cats.length);
    console.log('First 16 categories in order on /shop:');
    for (let i = 0; i < Math.min(16, cats.length); i += 4) {
      console.log(`Row ${Math.floor(i/4) + 1}:`, cats.slice(i, i + 4).join(' | '));
    }
  });
});
