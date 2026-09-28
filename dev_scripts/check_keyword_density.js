const fs = require('fs');

const pages = [
  { file: 'bangle-size-chart-calculator.html', primary: 'bangle size chart', secondary: ['calculator', 'inner diameter', 'indian bangle size'] },
  { file: 'temple-vaddanam-kamarbandh.html', primary: 'temple vaddanam', secondary: ['kamarbandh', 'waist belt', 'ottiyanam'] },
  { file: 'bridal-matha-patti-maang-tikka.html', primary: 'bridal matha patti', secondary: ['maang tikka', 'nethi chutti', 'sheeshpatti'] },
  { file: 'antique-vanki-baajuband.html', primary: 'antique vanki', secondary: ['baajuband', 'bridal armlet', '1 gram gold'] },
  { file: 'wedding-glass-bangle-stacks.html', primary: 'glass bangles', secondary: ['bangle stacks', 'muhurtham', 'gold kadas'] },
  { file: 'wedding-return-gifts-bangles-bangalore.html', primary: 'wedding return gifts', secondary: ['thamboolam bangles', 'wholesale', 'bangalore'] },
  { file: 'south-indian-bridal-jewellery-set.html', primary: 'south indian bridal jewellery set', secondary: ['complete bridal set', 'kalyana', '1 gram gold'] }
];

console.log('=== KEYWORD DENSITY REPORT ===\n');

for (const p of pages) {
  if (!fs.existsSync(p.file)) continue;
  const content = fs.readFileSync(p.file, 'utf8');
  // Strip tags
  const text = content.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                      .replace(/<[^>]+>/g, ' ')
                      .toLowerCase();
  const words = text.match(/\b[a-z0-9-]+\b/g) || [];
  const totalWords = words.length;

  function countOccurrences(phrase) {
    const regex = new RegExp('\\b' + phrase.toLowerCase().replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'g');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  }

  const primaryCount = countOccurrences(p.primary);
  const primaryDensity = ((primaryCount * p.primary.split(/\s+/).length / totalWords) * 100).toFixed(2);

  console.log(`Page: ${p.file}`);
  console.log(`  Total Words: ${totalWords}`);
  console.log(`  Primary "${p.primary}": ${primaryCount} times (${primaryDensity}%)`);
  
  for (const s of p.secondary) {
    const secCount = countOccurrences(s);
    const secDensity = ((secCount * s.split(/\s+/).length / totalWords) * 100).toFixed(2);
    console.log(`    Secondary "${s}": ${secCount} times (${secDensity}%)`);
  }
  console.log('');
}
