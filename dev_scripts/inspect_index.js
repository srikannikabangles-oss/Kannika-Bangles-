const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Find navbar
const navStart = index.indexOf('<ul class="navbar__links"');
const navEnd = index.indexOf('</ul>', navStart) + 5;
console.log('--- NAVBAR CURRENT ---');
console.log(index.substring(navStart, navEnd));

// Find footer
const footStart = index.indexOf('<footer class="footer"');
const footEnd = index.indexOf('</footer>', footStart) + 9;
console.log('--- FOOTER CURRENT ---');
console.log(index.substring(footStart, footEnd));
