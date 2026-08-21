const http = require('http');

function get(url) {
  return new Promise((resolve) => {
    http.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
  });
}

(async () => {
  // Test /product/1
  const p1 = await get('http://localhost:3001/product/1');
  console.log('GET /product/1 -> status:', p1.status, '| contains title:', p1.data.includes('Antique Gold Kada'));

  // Test /product/29 (Necklace)
  const p29 = await get('http://localhost:3001/product/29');
  console.log('GET /product/29 -> status:', p29.status, '| contains title:', p29.data.includes('Floral Kundan Tikka'));

  // Test /product/35 (Earring)
  const p35 = await get('http://localhost:3001/product/35');
  console.log('GET /product/35 -> status:', p35.status, '| contains title:', p35.data.includes('Floral Pearl Jhumka'));

  // Test /shop for "View Details"
  const shop = await get('http://localhost:3001/shop');
  const viewDetailsCount = (shop.data.match(/View Details/g) || []).length;
  console.log('GET /shop -> "View Details" button count:', viewDetailsCount);

  // Test /areas for "View Details"
  const areas = await get('http://localhost:3001/areas');
  const areasViewDetails = (areas.data.match(/View Details/g) || []).length;
  console.log('GET /areas -> "View Details" button count:', areasViewDetails);
})();
