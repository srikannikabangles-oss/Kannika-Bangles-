const http = require('http');

function check(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = (data.match(/product-card/g) || []).length;
        resolve({ url, status: res.statusCode, cards: matches });
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function run() {
  console.log(await check('http://localhost:3001/bangles'));
  console.log(await check('http://localhost:3001/pendant-sets'));
  console.log(await check('http://localhost:3001/necklaces'));
  console.log(await check('http://localhost:3001/earrings'));
  console.log(await check('http://localhost:3001/shop'));
}
run();
