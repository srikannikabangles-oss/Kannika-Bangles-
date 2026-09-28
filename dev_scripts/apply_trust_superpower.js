const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Update index.html
function updateIndexHtml() {
  const filePath = path.join(rootDir, 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Remove duplicate/empty comments at top of body
  const badCommentsRegex = /<body class="home-page">[\s\S]*?<nav class="navbar"/i;
  if (badCommentsRegex.test(html)) {
    html = html.replace(badCommentsRegex, '<body class="home-page">\n  <!-- ─── Navigation ─── -->\n  <nav class="navbar"');
  }

  // Update Hero Subtitle
  html = html.replace(
    'Discover handcrafted bridal bangles, heritage temple nakshi harams, and royal jewellery tailored for Bengaluru brides. 35 years of trusted craftsmanship on Sampige Road, Malleshwaram.',
    'Discover handcrafted bridal bangles, heritage temple nakshi harams, and royal jewellery tailored for Bengaluru brides. <strong>Pay ₹0 online today</strong> — inspect your exact pieces on live WhatsApp HD video before paying a single rupee.'
  );

  // Update Hero Trust Strip
  const oldTrustRegex = /<!-- Trust Badges Strip \(3 Columns\) -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- RIGHT COLUMN/i;
  const newTrustStrip = `<!-- Trust Badges Strip (3 Columns) -->
          <div class="lux-hero__trust-strip">
            <div class="lux-hero__trust-item">
              <div class="lux-hero__trust-icon">
                <i data-lucide="shield-check" style="width:24px;height:24px;"></i>
              </div>
              <div class="lux-hero__trust-text">
                <span class="lux-hero__trust-title">Zero Blind Payment</span>
                <span class="lux-hero__trust-desc">Pay ₹0 Today • Inspect on Video</span>
              </div>
            </div>

            <div class="lux-hero__trust-item">
              <div class="lux-hero__trust-icon">
                <i data-lucide="video" style="width:24px;height:24px;"></i>
              </div>
              <div class="lux-hero__trust-text">
                <span class="lux-hero__trust-title">Live 4K Inspection</span>
                <span class="lux-hero__trust-desc">WhatsApp Video &amp; Saree Match</span>
              </div>
            </div>

            <div class="lux-hero__trust-item">
              <div class="lux-hero__trust-icon">
                <i data-lucide="map-pin" style="width:24px;height:24px;"></i>
              </div>
              <div class="lux-hero__trust-text">
                <span class="lux-hero__trust-title">Bangalore Showroom</span>
                <span class="lux-hero__trust-desc">Malleshwaram (Since 1991)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN`;

  if (oldTrustRegex.test(html)) {
    html = html.replace(oldTrustRegex, newTrustStrip);
  }

  // Insert Superpower Section right after hero section
  const superpowerHTML = `
  <!-- =====================================================
       SECTION: OUR SUPERPOWER — ZERO BLIND PAYMENT & CONCIERGE
       ===================================================== -->
  <section class="superpower-section" id="superpowerSection">
    <div class="container">
      <div class="superpower-header">
        <div class="superpower-badge">
          <i data-lucide="shield-check" style="width:16px;height:16px;color:#0A6C38;"></i>
          <span>Our Superpower • Zero Blind Payments</span>
        </div>
        <h2 class="superpower-title">
          Why We Don't Take <span>Blind Online Payments</span>
        </h2>
        <p class="superpower-subtitle">
          Fine bridal jewellery should never be bought blindly from a picture. You deserve to see the real stone radiance in natural daylight, verify exact bangle sizing, and match colors with your wedding outfit. Here is our 100% risk-free 4-step personal concierge.
        </p>
      </div>

      <!-- 4-Step Personal Concierge Cards -->
      <div class="concierge-steps-grid">
        <!-- Step 1 -->
        <div class="concierge-step-card">
          <span class="concierge-step-num">01</span>
          <div class="concierge-step-icon">
            <i data-lucide="shopping-bag" style="width:26px;height:26px;"></i>
          </div>
          <span class="concierge-step-badge">₹0 Due Right Now</span>
          <h3 class="concierge-step-title">Shortlist Online</h3>
          <p class="concierge-step-desc">
            Browse our catalog of handcrafted bridal bangles, temple sets, and kadas. Add your favorites to your bag with <strong>zero advance payment</strong> and no card details required.
          </p>
        </div>

        <!-- Step 2 -->
        <div class="concierge-step-card">
          <span class="concierge-step-num">02</span>
          <div class="concierge-step-icon">
            <i data-lucide="video" style="width:26px;height:26px;"></i>
          </div>
          <span class="concierge-step-badge">100% Real-Time View</span>
          <h3 class="concierge-step-title">Live 4K Video Call</h3>
          <p class="concierge-step-desc">
            Our Malleshwaram showroom stylists connect with you on WhatsApp HD video. We inspect every stone, nakshi carving, clasp, and luster in natural showroom lighting.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="concierge-step-card">
          <span class="concierge-step-num">03</span>
          <div class="concierge-step-icon">
            <i data-lucide="sparkles" style="width:26px;height:26px;"></i>
          </div>
          <span class="concierge-step-badge">Guaranteed Perfect Fit</span>
          <h3 class="concierge-step-title">Saree &amp; Size Match</h3>
          <p class="concierge-step-desc">
            Send us a photo of your bridal saree or lehenga. We hold the jewellery side-by-side to match zari shades and test bangle circumferences on precision sizing cones.
          </p>
        </div>

        <!-- Step 4 -->
        <div class="concierge-step-card">
          <span class="concierge-step-num">04</span>
          <div class="concierge-step-icon">
            <i data-lucide="shield-check" style="width:26px;height:26px;"></i>
          </div>
          <span class="concierge-step-badge">Pay After Approval</span>
          <h3 class="concierge-step-title">Verified Dispatch</h3>
          <p class="concierge-step-desc">
            Watch your approved jewellery packed and sealed on video with your custom name-tag. Pay securely only then via UPI/Bank transfer, or pick up directly at our showroom!
          </p>
        </div>
      </div>

      <!-- Superpower Trust Emblems Bar (5 Emblems Strip) -->
      <div class="superpower-trust-strip">
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon">
            <i data-lucide="shield-check" style="width:20px;height:20px;"></i>
          </div>
          <div class="superpower-trust-pill-text">
            <strong>Zero Blind Payment</strong>
            <span>Pay ₹0 today online</span>
          </div>
        </div>

        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon">
            <i data-lucide="video" style="width:20px;height:20px;"></i>
          </div>
          <div class="superpower-trust-pill-text">
            <strong>Live Video Call</strong>
            <span>Inspect in 4K before paying</span>
          </div>
        </div>

        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon">
            <i data-lucide="camera" style="width:20px;height:20px;"></i>
          </div>
          <div class="superpower-trust-pill-text">
            <strong>Bridal Saree Match</strong>
            <span>1-on-1 stylist color pairing</span>
          </div>
        </div>

        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon">
            <i data-lucide="ruler" style="width:20px;height:20px;"></i>
          </div>
          <div class="superpower-trust-pill-text">
            <strong>Exact Wrist Sizing</strong>
            <span>Custom fit from 2.2 to 2.10</span>
          </div>
        </div>

        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon">
            <i data-lucide="map-pin" style="width:20px;height:20px;"></i>
          </div>
          <div class="superpower-trust-pill-text">
            <strong>Malleshwaram Store</strong>
            <span>Real Bangalore showroom</span>
          </div>
        </div>
      </div>

      <!-- Quick Action CTA -->
      <div style="text-align: center; margin-top: 36px;">
        <a href="https://wa.me/919844758450?text=Hi%20Sri%20Kannika%20Bangles,%20I%20would%20like%20to%20book%20a%20live%20video%20call%20consultation%20for%20bridal%20jewellery%20and%20saree%20matching." target="_blank" class="btn btn--primary btn--lg" style="display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; font-size: 1rem; box-shadow: 0 8px 24px rgba(59, 12, 24, 0.2);">
          <i data-lucide="video" style="width: 20px; height: 20px;"></i>
          <span>Book Free Live Video Consultation on WhatsApp</span>
        </a>
        <p style="font-size: 0.82rem; color: #6B5B5A; margin-top: 10px;">
          Available Monday – Sunday • 10:00 AM – 8:30 PM IST • Direct Showroom Connection
        </p>
      </div>

    </div>
  </section>
`;

  if (!html.includes('id="superpowerSection"')) {
    const heroEndIdx = html.indexOf('</section>', html.indexOf('id="hero"'));
    if (heroEndIdx !== -1) {
      const insertionPoint = heroEndIdx + '</section>'.length;
      html = html.slice(0, insertionPoint) + '\n\n' + superpowerHTML + '\n\n' + html.slice(insertionPoint);
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✅ Updated index.html with Superpower section!');
}

// 2. Update js/product-detail.js
function updateProductDetailJs() {
  const filePath = path.join(rootDir, 'js', 'product-detail.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace old pd__trust item texts
  content = content.replace(
    /<span>100% Handcrafted<\/span>[\s\S]*?<span>Delivery in 10 Days<\/span>[\s\S]*?<span>Micro Gold Polish<\/span>/i,
    `<span>Zero Blind Payment (Pay ₹0 Today)</span>
          </div>
          <div class="pd__trust-item" style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">
            <i data-lucide="video" style="width:20px;height:20px;color:var(--gold-primary);"></i>
            <span>Live HD Video Inspection</span>
          </div>
          <div class="pd__trust-item" style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">
            <i data-lucide="sparkles" style="width:20px;height:20px;color:var(--gold-primary);"></i>
            <span>Free Saree &amp; Size Matching</span>`
  );

  // Upgrade the transparency box to the Superpower Concierge Box
  const oldAiBoxRegex = /<!-- Studio Visuals & Raw Photo Transparency Box -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*`;/i;
  const newConciergeBox = `<!-- Superpower Concierge & Zero Blind Payment Box -->
        <div class="superpower-callout-card" style="margin-top: 18px;">
          <div class="superpower-callout-card__header">
            <div class="superpower-callout-card__header-icon">
              <i data-lucide="shield-check" style="width: 18px; height: 18px;"></i>
            </div>
            <h4 class="superpower-callout-card__title">Our Superpower: Zero Blind Payments</h4>
            <span class="superpower-callout-card__badge">₹0 Due Today</span>
          </div>
          <div class="superpower-callout-card__body">
            You never have to pay for jewellery you haven't seen in real life. When you reserve this piece or click WhatsApp, our Malleshwaram showroom stylists connect on live HD video to show you every stone, test the bangle size on sizing cones, and match with your wedding outfit before you pay!
            <ul class="superpower-callout-card__bullets">
              <li><i data-lucide="check-circle-2"></i> 1-on-1 Live WhatsApp Video Call</li>
              <li><i data-lucide="check-circle-2"></i> 4K Close-up Stone &amp; Polish Check</li>
              <li><i data-lucide="check-circle-2"></i> Free Bridal Saree &amp; Bangle Matching</li>
              <li><i data-lucide="check-circle-2"></i> Pay Only After 100% Satisfaction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  \`;`;

  if (oldAiBoxRegex.test(content)) {
    content = content.replace(oldAiBoxRegex, newConciergeBox);
  }

  // Update Add to Cart / WhatsApp buttons text
  content = content.replace(
    'Add to Cart\n            </button>',
    'Reserve Piece (₹0 Due)\n            </button>'
  );
  content = content.replace(
    'Buy via WhatsApp\n            </button>',
    'Inspect via Live Video\n            </button>'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Updated js/product-detail.js with Superpower Concierge Guarantee!');
}

// 3. Update cart.html and js/cart.js
function updateCart() {
  // cart.html
  const cartHtmlPath = path.join(rootDir, 'cart.html');
  let cartHtml = fs.readFileSync(cartHtmlPath, 'utf8');

  const oldCartTrust = /<div class="cart-trust">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;
  const newCartTrust = `<div class="superpower-callout-card" style="margin-top: 20px;">
            <div class="superpower-callout-card__header">
              <div class="superpower-callout-card__header-icon">
                <i data-lucide="shield-check" style="width: 18px; height: 18px;"></i>
              </div>
              <h4 class="superpower-callout-card__title">Zero Blind Payment Guarantee</h4>
              <span class="superpower-callout-card__badge">₹0 Due Today</span>
            </div>
            <div class="superpower-callout-card__body">
              <strong>No payment is taken online today!</strong> When you place your reservation, our showroom stylists arrange a live HD WhatsApp video call so you can verify each piece, check sizing, and match with your saree before spending ₹1.
              <ul class="superpower-callout-card__bullets">
                <li><i data-lucide="check-circle-2"></i> Pay ₹0 today online</li>
                <li><i data-lucide="check-circle-2"></i> Live WhatsApp video inspection</li>
                <li><i data-lucide="check-circle-2"></i> 1-on-1 Saree &amp; Size matching</li>
                <li><i data-lucide="check-circle-2"></i> 24–48 hr Bangalore dispatch</li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;

  if (oldCartTrust.test(cartHtml)) {
    cartHtml = cartHtml.replace(oldCartTrust, newCartTrust);
    fs.writeFileSync(cartHtmlPath, cartHtml, 'utf8');
    console.log('✅ Updated cart.html with Superpower Reassurance Box!');
  }

  // js/cart.js
  const cartJsPath = path.join(rootDir, 'js', 'cart.js');
  let cartJs = fs.readFileSync(cartJsPath, 'utf8');

  cartJs = cartJs.replace(
    '<span>Total</span>\n        <span>${formatPrice(total)}</span>',
    '<span>Total Value</span>\n        <span>${formatPrice(total)}</span>\n      </div>\n      <div class="cart-summary__row" style="background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.35); padding: 8px 12px; border-radius: 6px; margin-top: 10px; font-weight: 700;">\n        <span style="color: #0A6C38; display: flex; align-items: center; gap: 6px;"><i data-lucide="shield-check" style="width: 16px; height: 16px;"></i> Due Today:</span>\n        <span style="color: #0A6C38; font-size: 1.05rem;">₹0 (Pay After Video Call)</span>'
  );

  fs.writeFileSync(cartJsPath, cartJs, 'utf8');
  console.log('✅ Updated js/cart.js with ₹0 Due Today clarity!');
}

// 4. Update checkout.html and js/checkout.js
function updateCheckout() {
  const checkoutHtmlPath = path.join(rootDir, 'checkout.html');
  let checkoutHtml = fs.readFileSync(checkoutHtmlPath, 'utf8');

  // Replace Cart Trust in checkout.html with Progress steps & Superpower card
  const progressStepsHTML = `
      <!-- Concierge 4-Step Progress Indicator -->
      <div class="concierge-progress-steps">
        <div class="concierge-progress-step active">
          <span class="concierge-progress-step-num">1</span>
          <span>Reserve Online (₹0)</span>
        </div>
        <i data-lucide="chevron-right" style="width: 16px; height: 16px; color: #D4AF37;"></i>
        <div class="concierge-progress-step">
          <span class="concierge-progress-step-num">2</span>
          <span>Live HD Video Call</span>
        </div>
        <i data-lucide="chevron-right" style="width: 16px; height: 16px; color: #D4AF37;"></i>
        <div class="concierge-progress-step">
          <span class="concierge-progress-step-num">3</span>
          <span>Sizing &amp; Saree Match</span>
        </div>
        <i data-lucide="chevron-right" style="width: 16px; height: 16px; color: #D4AF37;"></i>
        <div class="concierge-progress-step">
          <span class="concierge-progress-step-num">4</span>
          <span>Pay &amp; Dispatch</span>
        </div>
      </div>
  `;

  if (!checkoutHtml.includes('class="concierge-progress-steps"')) {
    checkoutHtml = checkoutHtml.replace(
      /(<section class="checkout-page">\s*<div class="container">\s*)(<div class="checkout-header">)/i,
      `$1${progressStepsHTML}\n      $2`
    );
  }

  // Update header title in checkout.html
  checkoutHtml = checkoutHtml.replace(
    /<h1>Checkout<\/h1>/i,
    '<h1>Reserve Jewellery &amp; Request Live Video</h1>'
  );


  // Replace button text in checkout.html
  checkoutHtml = checkoutHtml.replace(
    'Place Order via WhatsApp\n              </button>',
    'Reserve Items &amp; Request Live Video Preview\n              </button>'
  );

  checkoutHtml = checkoutHtml.replace(
    "Your order will be saved and you'll be redirected to WhatsApp to confirm.",
    "Pay ₹0 Today. Your pieces will be reserved and you'll be connected directly on WhatsApp for live video verification."
  );

  // Replace old checkout trust strip
  const oldCheckoutTrust = /<div class="cart-trust" style="margin-top:16px;">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;
  const newCheckoutTrust = `<div class="superpower-callout-card" style="margin-top: 18px;">
            <div class="superpower-callout-card__header">
              <div class="superpower-callout-card__header-icon">
                <i data-lucide="shield-check" style="width: 18px; height: 18px;"></i>
              </div>
              <h4 class="superpower-callout-card__title">Why You Pay ₹0 Online Today</h4>
              <span class="superpower-callout-card__badge">Zero Risk</span>
            </div>
            <div class="superpower-callout-card__body">
              We never ask for blind payments. When you complete this reservation:
              <ul class="superpower-callout-card__bullets" style="grid-template-columns: 1fr; margin-top: 8px;">
                <li><i data-lucide="check-circle-2"></i> Our Malleshwaram stylist sends 4K video clips &amp; sets up a live video call.</li>
                <li><i data-lucide="check-circle-2"></i> We check bangle sizing (2.2 – 2.10) &amp; match your wedding saree border.</li>
                <li><i data-lucide="check-circle-2"></i> You only pay (via UPI/Bank/Store Pickup) after you are 100% delighted!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;

  if (oldCheckoutTrust.test(checkoutHtml)) {
    checkoutHtml = checkoutHtml.replace(oldCheckoutTrust, newCheckoutTrust);
  }

  fs.writeFileSync(checkoutHtmlPath, checkoutHtml, 'utf8');
  console.log('✅ Updated checkout.html with Progress Steps & Superpower Guarantee!');

  // js/checkout.js
  const checkoutJsPath = path.join(rootDir, 'js', 'checkout.js');
  let checkoutJs = fs.readFileSync(checkoutJsPath, 'utf8');

  checkoutJs = checkoutJs.replace(
    '<span>Total Payable</span>\n        <span>${formatPrice(total)}</span>',
    '<span>Total Value</span>\n        <span>${formatPrice(total)}</span>\n      </div>\n      <div class="cart-summary__row" style="background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.35); padding: 8px 12px; border-radius: 6px; margin-top: 10px; font-weight: 700;">\n        <span style="color: #0A6C38; display: flex; align-items: center; gap: 6px;"><i data-lucide="shield-check" style="width: 16px; height: 16px;"></i> Due Today:</span>\n        <span style="color: #0A6C38; font-size: 1.05rem;">₹0 (Pay After Video Approval)</span>'
  );

  fs.writeFileSync(checkoutJsPath, checkoutJs, 'utf8');
  console.log('✅ Updated js/checkout.js with ₹0 Due Today total clarification!');
}

// 5. Update js/main.js WhatsApp order message header
function updateMainJs() {
  const filePath = path.join(rootDir, 'js', 'main.js');
  let mainJs = fs.readFileSync(filePath, 'utf8');

  mainJs = mainJs.replace(
    '*Online Order Booking Request*',
    '*Jewellery Reservation & Live Video Consultation Request*\n*(Zero Blind Payment Guarantee — ₹0 Advance Paid)*'
  );

  mainJs = mainJs.replace(
    '*Total Amount Payable: ${formatPrice(total)}*\\n\\nKindly confirm stock availability & dispatch schedule. Thank you!',
    '*Total Order Value: ${formatPrice(total)}*\\n*Amount Paid Today: ₹0.00 (Zero Blind Payment)*\\n\\n📹 *Please arrange a Live WhatsApp Video Call & share close-up clips before confirming dispatch. Also assisting with sizing/saree match.* Thank you!'
  );

  fs.writeFileSync(filePath, mainJs, 'utf8');
  console.log('✅ Updated js/main.js WhatsApp message with Superpower Concierge text!');
}

// 6. Add royal-trust-bar into key shopping pages
function updateKeyPageHeaders() {
  const trustBarHTML = `
  <!-- Royal Trust Bar: Zero Blind Payments & Concierge -->
  <div class="royal-trust-bar">
    <div class="royal-trust-bar__inner">
      <span class="royal-trust-bar__pill">
        <span class="royal-trust-bar__pill-badge">Zero Blind Payments</span>
        <strong>Pay ₹0 Today:</strong> Inspect any jewellery on Live WhatsApp HD Video before paying!
      </span>
      <span class="royal-trust-bar__pill">
        <i data-lucide="sparkles" style="width:14px;height:14px;color:#FFDF8C;"></i>
        Free Bridal Saree &amp; Bangle Sizing Match
      </span>
      <span class="royal-trust-bar__pill">
        <i data-lucide="map-pin" style="width:14px;height:14px;color:#FFDF8C;"></i>
        Malleshwaram Showroom, Bengaluru
      </span>
    </div>
  </div>`;

  const files = ['shop-template.html', 'product-template.html', 'cart.html', 'checkout.html'];
  files.forEach(file => {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('class="royal-trust-bar"')) {
        content = content.replace('</nav>', '</nav>\n' + trustBarHTML);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Added royal-trust-bar to ${file}`);
      }
    }
  });
}

try {
  updateIndexHtml();
  updateProductDetailJs();
  updateCart();
  updateCheckout();
  updateMainJs();
  updateKeyPageHeaders();
  console.log('\n🌟 ALL SUPERPOWER AND TRUST EMBLEM UPDATES COMPLETED SUCCESSFULLY!');
} catch (e) {
  console.error('Error applying updates:', e);
}

