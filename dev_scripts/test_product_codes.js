const http = require('http');

http.get('http://localhost:3001/api/products', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const products = JSON.parse(data);
    console.log(`Total products returned: ${products.length}`);
    const sampleBangle = products.find(p => p.category === 'bangles');
    const samplePendant = products.find(p => p.category === 'pendant-sets');
    const sampleNecklace = products.find(p => p.category === 'necklaces');
    const sampleEarring = products.find(p => p.category === 'earrings');

    console.log('Sample Bangle:', sampleBangle.name, '| Code:', sampleBangle.code);
    console.log('Sample Pendant:', samplePendant.name, '| Code:', samplePendant.code);
    console.log('Sample Necklace:', sampleNecklace.name, '| Code:', sampleNecklace.code);
    console.log('Sample Earring:', sampleEarring.name, '| Code:', sampleEarring.code);
  });
});
