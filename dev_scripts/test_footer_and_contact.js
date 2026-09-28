const fs = require('fs');
const path = require('path');
const http = require('http');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
  }
}

// 1. Check all HTML pages for footer social
console.log('\n--- 1. Testing Footer Social across all HTML files ---');
let htmlFiles = [];
function findHtml(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && f !== 'node_modules' && f !== '.git') {
      findHtml(full);
    } else if (f.endsWith('.html') && !f.includes('admin.html') && !f.includes('google')) {
      htmlFiles.push(full);
    }
  }
}
findHtml(path.join(__dirname, '..'));

let allFootersClean = true;
let pagesChecked = 0;
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('class="footer__social"')) {
    pagesChecked++;
    const match = content.match(/<div class="footer__social[\s\S]*?<\/div>/);
    if (match) {
      const socialBlock = match[0];
      if (socialBlock.includes('instagram.com') || socialBlock.includes('facebook.com')) {
        console.error(`File still has social citations: ${file}`);
        allFootersClean = false;
      }
      if (!socialBlock.includes('wa.me/919844758450')) {
        console.error(`File missing WhatsApp: ${file}`);
        allFootersClean = false;
      }
    }
  }
}
assert(allFootersClean && pagesChecked >= 38, `All ${pagesChecked} HTML pages have ONLY WhatsApp in footer (no Instagram/Facebook)`);

// 2. Check main.js inclusion for Global Contact Enquiry Form
console.log('\n--- 2. Testing Contact Form & main.js presence ---');
let allHaveMainJs = true;
for (const file of htmlFiles) {
  if (file.includes('seo\\') || file.includes('seo/')) continue; // partials
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('main.js')) {
    console.error(`File missing main.js: ${file}`);
    allHaveMainJs = false;
  }
}
assert(allHaveMainJs, 'All public pages include main.js for global contact enquiry form');

// 3. Test HTTP Server endpoints
console.log('\n--- 3. Testing Local Server Endpoints (http://localhost:3001) ---');
function fetchUrl(pathName) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3001${pathName}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

function postJson(pathName, payload) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const req = http.request(`http://localhost:3001${pathName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, json: JSON.parse(data) });
        } catch(e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runHttpTests() {
  try {
    const homeRes = await fetchUrl('/');
    assert(homeRes.status === 200, 'Home page (/) returns 200 OK');
    assert(homeRes.data.includes('wa.me/919844758450'), 'Home page contains WhatsApp in footer');
    assert(!homeRes.data.includes('class="footer__social-link" aria-label="Instagram"'), 'Home page footer has no Instagram link');

    const blogRes = await fetchUrl('/blog');
    assert(blogRes.status === 200, 'Blog page (/blog) returns 200 OK');
    assert(blogRes.data.includes('wa.me/919844758450'), 'Blog page contains WhatsApp in footer');
    assert(!blogRes.data.includes('aria-label="Instagram"'), 'Blog page footer has no Instagram link');

    const contactRes = await fetchUrl('/contact');
    assert(contactRes.status === 200, 'Contact page (/contact) returns 200 OK');
    assert(contactRes.data.includes('id="contactForm"'), 'Contact page has dedicated contactForm');
    assert(contactRes.data.includes('wa.me/919844758450'), 'Contact page contains WhatsApp in footer');
    assert(!contactRes.data.includes('aria-label="Instagram"'), 'Contact page footer has no Instagram link');

    // Test API inquiry submission
    const testInquiry = {
      name: 'Verification Bot',
      email: 'bot@kannikatest.com',
      phone: '9844758450',
      message: 'Automated test of global inquiry and contact form system.',
      source: 'Verification Suite'
    };
    const inquiryRes = await postJson('/api/inquiries', testInquiry);
    assert(inquiryRes.status === 200 && inquiryRes.json.success === true, 'POST /api/inquiries saves inquiry successfully');
    console.log(`Saved Inquiry ID: ${inquiryRes.json?.inquiryId}`);

    console.log(`\n================================`);
    console.log(`SUMMARY: ${passedTests} / ${totalTests} tests passed`);
    console.log(`================================\n`);
  } catch (err) {
    console.error('HTTP Test Error:', err);
  }
}

runHttpTests();
