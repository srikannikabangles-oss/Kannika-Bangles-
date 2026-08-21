const http = require('http');

function get(url) {
  return new Promise(resolve => {
    http.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    });
  });
}

(async () => {
  const p1 = await get('http://localhost:3001/product/1');
  const p29 = await get('http://localhost:3001/product/29');

  console.log('p1 contains "Select Size":', p1.includes('Select Size'));
  console.log('p1 contains "Size & Fit":', p1.includes('Size & Fit'));
  console.log('p1 contains "pd__size-section":', p1.includes('pd__size-section'));
  console.log('p29 contains "Select Size":', p29.includes('Select Size'));
  console.log('p29 contains "Size & Fit":', p29.includes('Size & Fit'));
  console.log('p29 contains "pd__size-section":', p29.includes('pd__size-section'));
})();
