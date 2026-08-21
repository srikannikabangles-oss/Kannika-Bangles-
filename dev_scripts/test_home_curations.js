const http = require('http');

http.get('http://localhost:3001/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Check 4 circles
    const circles = [];
    const re = /class="cat-circle-card__name">([^<]+)<\/div>/g;
    let m;
    while ((m = re.exec(data)) !== null) {
      circles.push(m[1].trim());
    }
    console.log('Categories in circular cards:', circles);

    // Check 4 hero square cards
    const squareCards = [];
    const reSq = /class="hero-square-card__name">([^<]+)<\/span>/g;
    while ((m = reSq.exec(data)) !== null) {
      squareCards.push(m[1].trim());
    }
    console.log('Hero square cards (1 of each):', squareCards);
  });
});
