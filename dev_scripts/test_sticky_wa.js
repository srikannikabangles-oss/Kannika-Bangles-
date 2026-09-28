const { JSDOM } = require('jsdom');
const fs = require('fs');

const mainJs = fs.readFileSync('js/main.js', 'utf8');

// Test Case 1: Page with 0 buttons
{
  const dom = new JSDOM('<!DOCTYPE html><html><body><div id="floatingEnquiryBtn"></div></body></html>');
  global.window = dom.window;
  global.document = dom.window.document;
  global.navigator = dom.window.navigator;
  
  eval(mainJs);
  initStickyWhatsApp();
  const wa = document.querySelectorAll('.whatsapp-float');
  const enq = document.getElementById('floatingEnquiryBtn');
  console.log('Test 1 (0 buttons initially):');
  console.log('  whatsapp-float count:', wa.length, '(expected 1)');
  console.log('  floatingEnquiryBtn exists:', !!enq, '(expected false)');
  if (wa.length !== 1 || enq) process.exit(1);
}

// Test Case 2: Page with 2 buttons
{
  const dom = new JSDOM('<!DOCTYPE html><html><body><a class="whatsapp-float">1</a><a class="whatsapp-float">2</a></body></html>');
  global.window = dom.window;
  global.document = dom.window.document;
  global.navigator = dom.window.navigator;
  
  eval(mainJs);
  initStickyWhatsApp();
  const wa = document.querySelectorAll('.whatsapp-float');
  console.log('Test 2 (2 buttons initially):');
  console.log('  whatsapp-float count:', wa.length, '(expected 1)');
  if (wa.length !== 1) process.exit(1);
}

console.log('\n🎉 ALL STICKY BUTTON TESTS PASSED!');
