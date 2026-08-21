const http = require('http');

function get(url) {
  return new Promise((resolve) => {
    http.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    });
  });
}

(async () => {
  const shop = await get('http://localhost:3001/shop');
  const cart = await get('http://localhost:3001/cart.html');
  const prod29 = await get('http://localhost:3001/product/29');

  console.log('Shop contains ?3,000:', shop.includes('?3,000'));
  console.log('Shop contains ?3,000:', shop.includes('?3,000'));
  console.log('Product 29 contains ?920:', prod29.includes('?920'));
  console.log('Product 29 contains ?920:', prod29.includes('?920'));
  console.log('Cart HTML contains ?49:', cart.includes('?49'));
  console.log('Cart HTML contains ?49:', cart.includes('?49'));
})();
