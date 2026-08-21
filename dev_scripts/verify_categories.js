const http = require('http');

const urls = ['/bangles', '/pendant-sets', '/necklaces', '/earrings', '/shop'];

function testUrl(path) {
  return new Promise((resolve) => {
    http.get('http://localhost:3001' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const h1Match = data.match(/<h1[^>]*id="seoMainH1"[^>]*>(.*?)<\/h1>/);
        const h1 = h1Match ? h1Match[1].trim() : 'No H1';
        const cards = (data.match(/class="card product-card"/g) || []).length;
        resolve({ path, status: res.statusCode, h1, cards });
      });
    }).on('error', e => resolve({ path, error: e.message }));
  });
}

async function main() {
  for (let u of urls) {
    console.log(await testUrl(u));
  }
}
main();
