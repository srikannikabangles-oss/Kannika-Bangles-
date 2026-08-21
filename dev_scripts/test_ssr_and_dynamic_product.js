const http = require('http');

function testUrl(url) {
  return new Promise((resolve) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
  });
}

(async () => {
  // Test /product/29 (The one in user screenshot!)
  const p29 = await testUrl('http://localhost:3001/product/29');
  console.log('\n--- TESTING /product/29 (Floral Kundan Tikka) ---');
  console.log('Status Code:', p29.status);
  console.log('Has Product Name in H1:', p29.data.includes('Floral Kundan Tikka'));
  console.log('Has Product ID Badge KB-NEC-029:', p29.data.includes('KB-NEC-029'));
  console.log('Has 10-Day Delivery Banner:', p29.data.includes('Delivery Across India Within 10 Days'));
  console.log('Has Shining & Polishing Assurance:', p29.data.includes('Premium Micro Gold Polish'));
  console.log('Has Price ?920:', p29.data.includes('?920'));
  console.log('Has Related Products Grid Content:', p29.data.includes('View Details'));
  console.log('Has Pre-rendered Product Detail Div (not empty):', !p29.data.includes('<div id="productDetail" class="product-detail__content"></div>'));

  // Test /product/1
  const p1 = await testUrl('http://localhost:3001/product/1');
  console.log('\n--- TESTING /product/1 (Antique Gold Kada) ---');
  console.log('Status Code:', p1.status);
  console.log('Has Product Name:', p1.data.includes('Antique Gold Kada'));
  console.log('Has Product ID KB-BAN-001:', p1.data.includes('KB-BAN-001'));
  console.log('Has Size options (2.4, 2.6, 2.8):', p1.data.includes('2.4') && p1.data.includes('2.6'));

  // Test /product/35 (Earring)
  const p35 = await testUrl('http://localhost:3001/product/35');
  console.log('\n--- TESTING /product/35 (Floral Pearl Jhumka) ---');
  console.log('Status Code:', p35.status);
  console.log('Has Product Name:', p35.data.includes('Floral Pearl Jhumka'));
  console.log('Has Product ID KB-EAR-035:', p35.data.includes('KB-EAR-035'));
  console.log('Has Price ?760:', p35.data.includes('?760'));
})();
