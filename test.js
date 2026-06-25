const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const html = fs.readFileSync('index.html', 'utf8');
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on('log', (...args) => { console.log('LOG:', ...args); });
virtualConsole.on('error', (...args) => { console.error('ERROR:', ...args); });
const modifiedHtml = html.replace('function init() {', 'function init() { console.log(\'PRODUCTS IS:\', typeof PRODUCTS); console.log(\'BanglesGrid IS:\', document.getElementById(\'banglesGrid\')); ');
const dom = new JSDOM(modifiedHtml, { runScripts: 'dangerously', resources: 'usable', virtualConsole });
setTimeout(() => {
}, 2000);
