const fs = require('fs');
const path = require('path');

// 1. Fix bridal-matha-patti-maang-tikka.html table wrapper
let bmpPath = path.join(__dirname, '..', 'bridal-matha-patti-maang-tikka.html');
let bmp = fs.readFileSync(bmpPath, 'utf8');
bmp = bmp.replace(
  '<div style="background: #fff; border-radius: 12px; border: 1px solid #ebdccb; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">\n        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.93rem;">',
  '<div class="comparison-table-wrapper" style="background: #fff; border-radius: 12px; border: 1px solid #ebdccb; overflow-x: auto; -webkit-overflow-scrolling: touch; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">\n        <table style="width: 100%; min-width: 580px; border-collapse: collapse; text-align: left; font-size: 0.93rem;">'
);
fs.writeFileSync(bmpPath, bmp, 'utf8');
console.log('✅ Fixed table overflow in bridal-matha-patti-maang-tikka.html');

// 2. Fix south-indian-bridal-jewellery-set.html table wrapper
let sibPath = path.join(__dirname, '..', 'south-indian-bridal-jewellery-set.html');
let sib = fs.readFileSync(sibPath, 'utf8');
sib = sib.replace(
  '<div style="background: #fff; border-radius: 12px; border: 1px solid #ebdccb; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">\n        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">',
  '<div class="comparison-table-wrapper" style="background: #fff; border-radius: 12px; border: 1px solid #ebdccb; overflow-x: auto; -webkit-overflow-scrolling: touch; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">\n        <table style="width: 100%; min-width: 580px; border-collapse: collapse; text-align: left; font-size: 0.95rem;">'
);
fs.writeFileSync(sibPath, sib, 'utf8');
console.log('✅ Fixed table overflow in south-indian-bridal-jewellery-set.html');

// 3. Fix temple-vaddanam-kamarbandh.html table min-width
let tvPath = path.join(__dirname, '..', 'temple-vaddanam-kamarbandh.html');
let tv = fs.readFileSync(tvPath, 'utf8');
tv = tv.replace(
  '.comparison-table {\n      width: 100%;\n      border-collapse: collapse;',
  '.comparison-table {\n      width: 100%;\n      min-width: 580px;\n      border-collapse: collapse;'
);
fs.writeFileSync(tvPath, tv, 'utf8');
console.log('✅ Fixed table min-width in temple-vaddanam-kamarbandh.html');
