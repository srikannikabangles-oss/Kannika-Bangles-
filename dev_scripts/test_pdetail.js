const http = require('http');

http.get('http://localhost:3001/product/1', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    console.log('Contains productDetail element:', data.includes('id="productDetail"'));
    console.log('Contains relatedProducts element:', data.includes('id="relatedProducts"'));
    console.log('Product 1 title:', data.includes('Antique Gold Kada'));
  });
});
