const http = require('http');

http.get('http://localhost:3001/earrings', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const prices = [];
    const re = /<span itemprop="price" content="([^"]+)">/g;
    let m;
    while ((m = re.exec(data)) !== null) {
      prices.push(m[1].trim());
    }
    console.log('Earrings prices (1..12):', prices);
  });
});
