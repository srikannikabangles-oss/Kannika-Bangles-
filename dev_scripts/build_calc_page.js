const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Indian Bangle Size Chart &amp; Calculator | Sri Kannika</title>
  <meta name="description" content="Find your exact Indian bangle size in seconds with our interactive calculator &amp; visual size chart in inches &amp; mm. Free size verification on WhatsApp.">
  <link rel="canonical" href="https://kannikabangles.com/bangle-size-chart-calculator">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Indian Bangle Size Chart &amp; Calculator | Sri Kannika">
  <meta property="og:description" content="Find your exact Indian bangle size in seconds with our interactive calculator &amp; visual size chart in inches &amp; mm. Free size verification on WhatsApp.">
  <meta property="og:url" content="https://kannikabangles.com/bangle-size-chart-calculator">
  <meta property="og:image" content="https://kannikabangles.com/images/bangle_sizing_guide.jpg">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Indian Bangle Size Chart &amp; Calculator | Sri Kannika">
  <meta name="twitter:description" content="Find your exact Indian bangle size in seconds with our interactive calculator &amp; visual size chart in inches &amp; mm. Free size verification on WhatsApp.">
  <meta name="twitter:image" content="https://kannikabangles.com/images/bangle_sizing_guide.jpg">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css?v=20260929">
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Structured Data: Product, FAQPage & BreadcrumbList -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://kannikabangles.com/#organization",
        "name": "Sri Kannika Bangles & Jewels",
        "url": "https://kannikabangles.com/",
        "logo": "https://kannikabangles.com/images/kannika_logo.jpeg",
        "telephone": "+91-9844758450",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "No. 157/108, 9th Cross, East Park Road",
          "addressLocality": "Malleshwaram",
          "addressRegion": "Karnataka",
          "postalCode": "560003",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://kannikabangles.com/bangle-size-chart-calculator#webpage",
        "url": "https://kannikabangles.com/bangle-size-chart-calculator",
        "name": "Indian Bangle Size Chart & Calculator | Sri Kannika",
        "isPartOf": { "@id": "https://kannikabangles.com/#organization" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kannikabangles.com/" },
            { "@type": "ListItem", "position": 2, "name": "Bangles", "item": "https://kannikabangles.com/bangles" },
            { "@type": "ListItem", "position": 3, "name": "Bangle Size Chart & Calculator", "item": "https://kannikabangles.com/bangle-size-chart-calculator" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does Indian bangle sizing work compared to US or UK sizes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Indian bangle sizes represent inches and sixteenths of an inch. For example, size 2.4 means 2 inches plus 4/16 (2.25 inches or 57.2 mm inner diameter). Size 2.6 means 2 inches plus 6/16 (2.375 inches or 60.3 mm)."
            }
          },
          {
            "@type": "Question",
            "name": "What is the most common Indian bangle size for women?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Size 2.4 (57.2 mm) and size 2.6 (60.3 mm) are the two most common bangle sizes in India, accounting for over 70% of women's wrist measurements."
            }
          },
          {
            "@type": "Question",
            "name": "Should I order the same size for glass bangles and openable gold kadas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Rigid slip-on glass bangles require extra knuckle clearance, so if your standard size is 2.4, you may prefer 2.6 in glass bangles. Openable kadas with hinge screws fit directly over the wrist, so your exact snug measurement works best."
            }
          },
          {
            "@type": "Question",
            "name": "How do I measure my hand if I have wide knuckles but slender wrists?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Always measure around the widest knuckle circumference with your thumb folded inwards. Bangles must pass the knuckles first. Alternatively, choose screw-open antique kadas from Sri Kannika that contour snugly without needing knuckle clearance."
            }
          },
          {
            "@type": "Question",
            "name": "Can Sri Kannika verify my bangle size before dispatching an order?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Send a quick photo of your hand next to a standard ruler or ATM card on WhatsApp at +91 9844758450. Our Malleshwaram stylists will confirm your exact size in under 2 minutes."
            }
          }
        ]
      }
    ]
  }
  </script>

  <style>
    .calc-card {
      background: #ffffff;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 16px;
      padding: 36px 30px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.06);
      margin-top: -40px;
      position: relative;
      z-index: 10;
    }
    .calc-tabs {
      display: flex;
      gap: 12px;
      border-bottom: 2px solid #f0eae1;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .calc-tab {
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      background: #fdfaf6;
      color: #665235;
      transition: all 0.2s ease;
      font-size: 0.95rem;
    }
    .calc-tab.active {
      background: #8B6914;
      color: #ffffff;
    }
    .calc-result-box {
      background: linear-gradient(135deg, #fdfbf7 0%, #f6efe2 100%);
      border: 2px dashed #d4af37;
      border-radius: 14px;
      padding: 24px;
      text-align: center;
      margin-top: 24px;
    }
    .size-display-circle {
      width: 120px;
      height: 120px;
      border: 4px solid #8B6914;
      border-radius: 50%;
      margin: 16px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fff;
      box-shadow: 0 4px 15px rgba(139, 105, 20, 0.15);
      transition: transform 0.3s ease;
    }
    .bangle-table-wrapper {
      overflow-x: auto;
      margin-top: 24px;
    }
    .bangle-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.95rem;
    }
    .bangle-table th {
      background: #332211;
      color: #f7e7ce;
      padding: 14px 16px;
      font-family: 'Cinzel', serif;
      font-weight: 600;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
    }
    .bangle-table td {
      padding: 14px 16px;
      border-bottom: 1px solid #ebdccb;
      color: #3d2f21;
    }
    .bangle-table tr:nth-child(even) {
      background: #faf6f0;
    }
    .bangle-table tr.highlight-row {
      background: #fff9e6;
      font-weight: 600;
      border-left: 4px solid #d4af37;
    }
    .guide-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 30px;
    }
    .guide-card {
      background: #ffffff;
      border: 1px solid #ebdccb;
      border-radius: 12px;
      padding: 26px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.03);
    }
    .guide-card__number {
      width: 38px;
      height: 38px;
      background: #8B6914;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
      margin-bottom: 14px;
    }
    .tip-box {
      background: #fcf8ee;
      border-left: 4px solid #b38728;
      border-radius: 0 8px 8px 0;
      padding: 18px 22px;
      margin: 20px 0;
      font-size: 0.92rem;
      color: #5c4728;
      line-height: 1.6;
    }
  </style>
</head>
<body class="category-seo-page">

  <!-- --- Top Navigation --- -->
  <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
    <div class="navbar__inner">
      <div class="navbar__toggle-left" id="navToggle" role="button" aria-label="Open navigation menu" aria-expanded="false" tabindex="0">
        <span></span><span></span><span></span>
      </div>
      <a href="/" class="navbar__brand navbar__brand--royal" aria-label="Kannika Bangles Home">
        <img src="/images/kannika_logo.jpeg" alt="Kannika Bangles" class="navbar__logo-img">
        <div class="navbar__brand-text">
          <span class="brand-text__title">SRI KANNIKA</span>
          <span class="brand-text__subtitle">BANGLES &amp; JEWELS</span>
        </div>
      </a>
      <ul class="navbar__links" id="navLinks" role="menubar">
        <li class="mobile-drawer__header">
          <div class="mobile-drawer__brand">
            <img src="/images/kannika_logo.jpeg" alt="Kannika Bangles" class="mobile-drawer__logo-img">
            <span class="mobile-drawer__title">Sri Kannika Bangles</span>
          </div>
          <button class="mobile-drawer__close" id="navClose" aria-label="Close menu">
            <i data-lucide="x" style="width:22px;height:22px;"></i>
          </button>
        </li>
        <li role="none"><a href="/" class="navbar__link" role="menuitem"><span class="navbar__link-text">Home</span></a></li>
        <li role="none" class="navbar__dropdown-item">
          <a href="/shop" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Jewellery</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/bangles" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="circle"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bangles</span></span></a></li>
            <li><a href="/wedding-glass-bangle-stacks" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="layers"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Glass Bangle Stacks</span></span></a></li>
            <li><a href="/wedding-return-gifts-bangles-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gift"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Wedding Return Gifts</span></span></a></li>
            <li><a href="/necklaces" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Necklaces</span></span></a></li>
            <li><a href="/pendant-sets" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Pendant Sets</span></span></a></li>
            <li><a href="/earrings" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Earrings</span></span></a></li>
            <li><a href="/shop" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="grid"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">All Jewellery</span></span></a></li>
          </ul>
        </li>
        <li role="none" class="navbar__dropdown-item">
          <a href="/bridal-jewellery-bangalore" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Bridal</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu">
            <li><a href="/bridal-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Bridal Jewellery Bangalore</span></span></a></li>
            <li><a href="/south-indian-bridal-jewellery-set" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="crown"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Complete Bridal Sets</span></span></a></li>
            <li><a href="/temple-vaddanam-kamarbandh" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="shield"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Temple Vaddanam (Waist Belt)</span></span></a></li>
            <li><a href="/bridal-matha-patti-maang-tikka" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Matha Patti &amp; Maang Tikka</span></span></a></li>
            <li><a href="/antique-vanki-baajuband" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="award"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Antique Vanki &amp; Bajuband</span></span></a></li>
            <li><a href="/temple-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Temple Jewellery Bangalore</span></span></a></li>
            <li><a href="/muhurtham-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="heart"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Muhurtham Jewellery</span></span></a></li>
            <li><a href="/reception-and-sangeet-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Reception &amp; Sangeet</span></span></a></li>
            <li><a href="/haldi-and-mehendi-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sun"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Haldi &amp; Mehendi</span></span></a></li>
            <li><a href="/cz-and-ad-diamond-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="sparkles"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">CZ &amp; AD Diamond</span></span></a></li>
            <li><a href="/kundan-and-jadau-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="gem"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Kundan &amp; Jadau</span></span></a></li>
            <li><a href="/antique-matte-finish-jewellery-bangalore" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="crown"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Antique Matte Finish</span></span></a></li>
          </ul>
        </li>
        <li role="none"><a href="/bangle-size-chart-calculator" class="navbar__link" role="menuitem"><span class="navbar__link-text">Size Guide</span></a></li>
        <li role="none"><a href="/blog" class="navbar__link" role="menuitem"><span class="navbar__link-text">Blog</span></a></li>
        <li role="none" class="navbar__dropdown-item">
          <a href="/about" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">About &amp; Contact</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu navbar__dropdown-menu--right">
            <li><a href="/about" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="info"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">About Us</span></span></a></li>
            <li><a href="/contact" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="phone"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Contact Us</span></span></a></li>
          </ul>
        </li>
      </ul>
      <div class="navbar__actions">
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I%20need%20help%20finding%20my%20bangle%20size" class="btn btn--primary" style="padding: 8px 16px; font-size: 0.85rem;" target="_blank" rel="noopener">
          <i data-lucide="message-circle" style="width:16px;height:16px;margin-right:6px;"></i> WhatsApp Stylist
        </a>
      </div>
    </div>
  </nav>

  <!-- --- Hero Header --- -->
  <section class="category-hero" style="background: linear-gradient(135deg, #1f1610 0%, #3d2c1d 100%); color: #fff; padding: 70px 20px 80px; text-align: center;">
    <div class="container" style="max-width: 860px;">
      <span class="badge" style="background: rgba(212, 175, 55, 0.2); color: #e6ca65; border: 1px solid rgba(212, 175, 55, 0.4); padding: 6px 16px; border-radius: 30px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 16px;">
        100% Fit Guarantee &bull; Bangalore Master Artisans
      </span>
      <h1 style="font-family: 'Cinzel', serif; font-size: 2.5rem; line-height: 1.25; margin-bottom: 16px; color: #fff;">
        Indian Bangle Size Chart &amp; Interactive Calculator
      </h1>
      <p style="font-size: 1.1rem; color: #e0d5c1; line-height: 1.6; max-width: 740px; margin: 0 auto;">
        Determine your exact <strong>Indian bangle size</strong> in seconds. Use our interactive <strong>bangle size calculator</strong> to convert inner diameter millimeters or hand knuckle circumference into standard Indian sizing (2.2 to 2.12), ensuring your bridal stacks and everyday kadas slide on effortlessly.
      </p>
    </div>
  </section>

  <!-- --- Interactive Calculator Section --- -->
  <section style="padding: 0 20px 60px;">
    <div class="container" style="max-width: 880px;">
      <div class="calc-card">
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.6rem; color: #2e2216; margin-bottom: 8px; text-align: center;">
          Calculate Your Exact Bangle Size in Millimeters &amp; Inches
        </h2>
        <p style="text-align: center; color: #665235; font-size: 0.95rem; margin-bottom: 24px;">
          Select your preferred measurement method below for instant, verified sizing.
        </p>

        <div class="calc-tabs" role="tablist">
          <button class="calc-tab active" id="tabDiameter" onclick="switchTab('diameter')">
            Method 1: Measure Existing Bangle (Inner Diameter)
          </button>
          <button class="calc-tab" id="tabHand" onclick="switchTab('hand')">
            Method 2: Measure Hand Knuckles (Circumference)
          </button>
        </div>

        <!-- Method 1: Diameter -->
        <div id="methodDiameter">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div class="form-group">
              <label style="font-weight: 600; color: #44321d; display: block; margin-bottom: 6px; font-size: 0.9rem;">Measurement Unit</label>
              <select id="unitSelect" class="form-input" onchange="calculateSize()" style="width: 100%; padding: 12px; border: 1px solid #d4c5b3; border-radius: 8px; font-family: inherit;">
                <option value="mm">Millimeters (mm)</option>
                <option value="inches">Inches (in)</option>
                <option value="cm">Centimeters (cm)</option>
              </select>
            </div>
            <div class="form-group">
              <label style="font-weight: 600; color: #44321d; display: block; margin-bottom: 6px; font-size: 0.9rem;">Inner Diameter Measurement</label>
              <input type="number" id="diameterInput" class="form-input" placeholder="e.g. 57.2 or 2.25" step="0.1" value="57.2" oninput="calculateSize()" style="width: 100%; padding: 12px; border: 1px solid #d4c5b3; border-radius: 8px; font-family: inherit;">
            </div>
          </div>
          <div class="tip-box">
            <strong>💡 Pro Measuring Tip:</strong> Lay an existing bangle flat on a rigid ruler. Measure straight across the <em>inside hollow opening</em> from inner edge to inner edge. Do not include outer gold rims or heavy stone settings in your inner diameter calculation.
          </div>
        </div>

        <!-- Method 2: Hand Circumference -->
        <div id="methodHand" style="display: none;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div class="form-group">
              <label style="font-weight: 600; color: #44321d; display: block; margin-bottom: 6px; font-size: 0.9rem;">Measurement Unit</label>
              <select id="handUnitSelect" class="form-input" onchange="calculateHandSize()" style="width: 100%; padding: 12px; border: 1px solid #d4c5b3; border-radius: 8px; font-family: inherit;">
                <option value="inches">Inches (in)</option>
                <option value="cm">Centimeters (cm)</option>
                <option value="mm">Millimeters (mm)</option>
              </select>
            </div>
            <div class="form-group">
              <label style="font-weight: 600; color: #44321d; display: block; margin-bottom: 6px; font-size: 0.9rem;">Knuckle Circumference</label>
              <input type="number" id="handInput" class="form-input" placeholder="e.g. 7.0 or 17.8" step="0.1" value="7.0" oninput="calculateHandSize()" style="width: 100%; padding: 12px; border: 1px solid #d4c5b3; border-radius: 8px; font-family: inherit;">
            </div>
          </div>
          <div class="tip-box">
            <strong>💡 Pro Measuring Tip:</strong> Bring your thumb and little finger together tightly as if squeezing your hand into a tight bangle. Wrap a strip of paper or string around the widest knuckle section, mark the meeting point, and measure against a flat ruler.
          </div>
        </div>

        <!-- Result Box -->
        <div class="calc-result-box">
          <div style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px; color: #8B6914; font-weight: 700;">
            Your Verified Indian Bangle Size
          </div>
          <div class="size-display-circle" id="sizeCircle">
            <span style="font-size: 2.2rem; font-weight: 800; color: #8B6914; line-height: 1;" id="resultSize">2.4</span>
            <span style="font-size: 0.75rem; color: #88745d; font-weight: 600;" id="resultMm">57.2 mm</span>
          </div>
          <p id="resultText" style="font-size: 1rem; color: #3d2e1f; font-weight: 500; margin-bottom: 18px; line-height: 1.5;">
            Size <strong>2.4</strong> represents standard Indian Medium (2-4/16" or 57.2 mm inner diameter). Recommended for women with hand knuckle circumference of 7.0 to 7.4 inches.
          </p>
          <a id="whatsappShareBtn" href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20my%20calculated%20bangle%20size%20is%202.4.%20Can%20you%20show%20me%20bridal%20stacks%20in%20this%20size?" target="_blank" rel="noopener" class="btn btn--primary" style="display: inline-flex; align-items: center; justify-content: center; padding: 14px 28px; font-weight: 600; text-decoration: none;">
            <i data-lucide="message-circle" style="width:18px;height:18px;margin-right:8px;"></i> Verify &amp; View Stacks in Size <span id="btnSize" style="margin-left:4px;">2.4</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- --- Complete Standard Indian Bangle Size Chart --- -->
  <section style="background: #faf6f0; padding: 60px 20px;">
    <div class="container" style="max-width: 1000px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Universal Reference</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px; margin-bottom: 10px;">
          Standard Indian Bangle Size Chart &amp; Metric Conversion Table
        </h2>
        <p style="color: #665235; font-size: 1rem; max-width: 680px; margin: 0 auto; line-height: 1.6;">
          Indian bangle sizes are named in inches and sixteenths (e.g. 2.4 = 2 4/16 inches). Use this definitive table to cross-reference millimeter diameters and hand circumference.
        </p>
      </div>

      <div class="bangle-table-wrapper" style="background:#fff; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.04); overflow:hidden;">
        <table class="bangle-table">
          <thead>
            <tr>
              <th>Indian Bangle Size</th>
              <th>Inner Diameter (Inches)</th>
              <th>Inner Diameter (mm)</th>
              <th>Hand Circumference (Inches)</th>
              <th>Typical Fit Classification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>2.2</strong></td>
              <td>2 - 2/16" (2.125 in)</td>
              <td>54.0 mm</td>
              <td>6.5" to 6.9"</td>
              <td>Extra Small / Petite Wrists</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>2.4</strong> <span style="background: #8B6914; color: #fff; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">Most Popular</span></td>
              <td>2 - 4/16" (2.250 in)</td>
              <td>57.2 mm</td>
              <td>7.0" to 7.4"</td>
              <td>Standard Small / Medium Women</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>2.6</strong> <span style="background: #8B6914; color: #fff; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">Bridal Standard</span></td>
              <td>2 - 6/16" (2.375 in)</td>
              <td>60.3 mm</td>
              <td>7.5" to 7.9"</td>
              <td>Medium / Large (Comfort Fit)</td>
            </tr>
            <tr>
              <td><strong>2.8</strong></td>
              <td>2 - 8/16" (2.500 in)</td>
              <td>63.5 mm</td>
              <td>8.0" to 8.4"</td>
              <td>Large / Broader Knuckles</td>
            </tr>
            <tr>
              <td><strong>2.10</strong></td>
              <td>2 - 10/16" (2.625 in)</td>
              <td>66.7 mm</td>
              <td>8.5" to 8.9"</td>
              <td>Extra Large / Plus Sizing</td>
            </tr>
            <tr>
              <td><strong>2.12</strong></td>
              <td>2 - 12/16" (2.750 in)</td>
              <td>69.9 mm</td>
              <td>9.0"+</td>
              <td>Special Custom Handcrafted Size</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- --- Step-by-Step Measurement Guide --- -->
  <section style="padding: 70px 20px; background: #ffffff;">
    <div class="container" style="max-width: 1000px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Accurate DIY Measuring</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          How to Measure Your Bangle Size at Home in 3 Easy Steps
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div class="guide-card-grid">
        <div class="guide-card">
          <div class="guide-card__number">1</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #2e2216; margin-bottom: 10px;">Measure an Existing Bangle</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6;">
            Select a rigid circular bangle from your collection that slips over your knuckles comfortably without pinching. Place it flat over a ruler and record the inside diameter in millimeters at the widest middle span.
          </p>
        </div>

        <div class="guide-card">
          <div class="guide-card__number">2</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #2e2216; margin-bottom: 10px;">Compress Knuckles with String</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6;">
            If buying for someone else or without an existing bangle, fold your thumb inwards towards your pinky base. Wrap a non-stretchy string or measuring tape snugly around your knuckles to obtain circumference.
          </p>
        </div>

        <div class="guide-card">
          <div class="guide-card__number">3</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #2e2216; margin-bottom: 10px;">Consult Stylist on WhatsApp</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6;">
            Still unsure between two sizes? Take a photograph of your hand next to a standard debit card or ruler and WhatsApp our Malleshwaram boutique stylists for instant, verified recommendation.
          </p>
        </div>
      </div>

      <!-- Stylist Bangle Stacking Rules -->
      <div style="margin-top: 50px; background: #fdfaf5; border: 1px solid #e8dbc9; border-radius: 14px; padding: 32px 30px;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.35rem; color: #2e2216; margin-bottom: 14px;">
          Expert Bridal Sizing Rules: Openable Kadas vs. Slip-on Glass Bangles
        </h3>
        <p style="color: #665235; font-size: 0.95rem; line-height: 1.65; margin-bottom: 14px;">
          When building a royal 24-piece or 48-piece South Indian bridal bangle stack, brides frequently ask whether all pieces should share the exact same measurement. Here are three professional sizing secrets from Sri Kannika master craftsmen:
        </p>
        <ul style="color: #55412b; font-size: 0.92rem; line-height: 1.7; padding-left: 20px;">
          <li><strong>Screw-Open Antique Kadas:</strong> Solid 1-gram gold kadas with hinge screws can be purchased in your exact wrist size (e.g. 2.4). Because they do not need to squeeze past your knuckles, they sit flush and elegant.</li>
          <li><strong>Rigid Glass Bangle Stacks:</strong> Traditional wedding glass churis have zero flex. If your wrist is between sizes (such as 2.4 and 2.6), always order the larger size 2.6 in glass bangles to prevent breakage or hand bruising during wedding festivities.</li>
          <li><strong>Tapered Bridal Stacking:</strong> Wear larger 2.6 carved kadas near the forearm base and standard 2.4 kadas near the wrist. This creates a secure, graceful taper that stops bangles from tumbling downward.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- --- Sizing Help CTA --- -->
  <section style="background: linear-gradient(135deg, #2b1a11 0%, #4a301c 100%); color: #fff; padding: 60px 20px; text-align: center;">
    <div class="container" style="max-width: 800px;">
      <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #fff; margin-bottom: 14px;">
        Need Personal Size Assistance for Your Wedding?
      </h2>
      <p style="color: #e3d7c5; font-size: 1.05rem; line-height: 1.6; margin-bottom: 26px;">
        Our Malleshwaram bridal jewellery experts provide personalized 1-on-1 size consultations over WhatsApp video calls. Send us your measurements or visit our Bangalore showroom.
      </p>
      <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'd%20like%20free%20bangle%20size%20verification%20for%20my%20bridal%20shopping" class="btn btn--primary" style="padding: 14px 32px; font-size: 1rem; font-weight: 600;" target="_blank" rel="noopener">
        <i data-lucide="phone" style="width: 18px; height: 18px; margin-right: 8px;"></i> Free WhatsApp Size Consultation (+91 9844758450)
      </a>
    </div>
  </section>

  <!-- --- Frequently Asked Questions Accordion --- -->
  <section style="padding: 70px 20px; background: #faf7f2;">
    <div class="container" style="max-width: 860px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Got Questions?</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          Bangle Size Chart &amp; Measurement FAQs
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div class="faq-accordion" style="display: flex; flex-direction: column; gap: 14px;">
        <div style="background: #fff; border-radius: 10px; border: 1px solid #ebdccb; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">How does Indian bangle sizing work compared to US or UK sizes?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Indian bangle sizing denotes inches and sixteenths of an inch. A 2.4 size means 2 inches and 4/16 (2.25 inches or 57.2 mm inner diameter). A 2.6 size means 2 inches and 6/16 (2.375 inches or 60.3 mm). Unlike Western sizing which often measures wrist circumference, Indian sizing prioritizes knuckle passage.
          </p>
        </div>

        <div style="background: #fff; border-radius: 10px; border: 1px solid #ebdccb; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">What is the most common Indian bangle size for women?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Sizes <strong>2.4 (57.2 mm)</strong> and <strong>2.6 (60.3 mm)</strong> represent more than 70% of all bangle purchases across South India. If you are gifting wedding return bangles and do not know guest sizes, an assortment of 2.4 and 2.6 will comfortably fit the vast majority of recipients.
          </p>
        </div>

        <div style="background: #fff; border-radius: 10px; border: 1px solid #ebdccb; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">What should I do if my knuckles are broad but my wrists are slim?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Always size for your knuckles so the bangle slides on without pain. However, to prevent a loose bangle from spinning excessively on a slender wrist, choose openable kadas with side screws or hinge clips, or sandwich larger glass bangles between two snug kadas.
          </p>
        </div>

        <div style="background: #fff; border-radius: 10px; border: 1px solid #ebdccb; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">Can I exchange bangles if the size does not fit?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Yes, our Malleshwaram boutique provides hassle-free size exchanges for unworn bangles. To ensure 100% first-time satisfaction, we also offer live video call verification before packing your parcel.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════════════
       EXPLORE COMPLEMENTARY BRIDAL JEWELLERY & SIZING
       ═══════════════════════════════════════════════════ -->
  <section class="section" style="background: #FAF7F2; padding: 60px 20px; border-top: 1px solid rgba(212,175,55,0.2);">
    <div class="container" style="max-width: 1200px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 600;">Complete Kalyana Ensemble</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 8px;">Explore Specialized Bridal Categories</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <a href="/south-indian-bridal-jewellery-set" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">👑</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">7-Piece Bridal Set</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Complete Muhurtham Kalyana package crafted in antique matte micro gold.</p>
        </a>
        <a href="/temple-vaddanam-kamarbandh" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">✨</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Temple Vaddanam</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Adjustable waist belts (Ottiyanam) with Lakshmi &amp; peacock Nakshi carvings.</p>
        </a>
        <a href="/bridal-matha-patti-maang-tikka" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">🌸</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Matha Patti &amp; Tikka</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Temple Nethi Chutti and multi-tier Kundan forehead adornments.</p>
        </a>
        <a href="/antique-vanki-baajuband" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">💎</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Antique Vanki &amp; Bajuband</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Traditional inverted V-shaped bridal armlets with non-slip velvet linings.</p>
        </a>
        <a href="/wedding-glass-bangle-stacks" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">🔴</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Glass Bangle Stacks</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Emerald green &amp; ruby red Muhurtham glass churi sets with antique kadas.</p>
        </a>
        <a href="/wedding-return-gifts-bangles-bangalore" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">🎁</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Wedding Return Gifts</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Wholesale Thamboolam gift bangle sets in assorted sizes with potli pouches.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- --- Standard Footer --- -->
  <footer class="footer">
    <div class="container" style="margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid rgba(212, 175, 55, 0.25);">
      <div class="superpower-trust-strip">
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="shield-check" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text"><strong>Zero Blind Payment</strong><span>Pay ₹0 today online</span></div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="video" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text"><strong>Live Video Call</strong><span>Inspect in 4K before paying</span></div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="camera" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text"><strong>Bridal Saree Match</strong><span>1-on-1 stylist color pairing</span></div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="ruler" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text"><strong>Exact Wrist Sizing</strong><span>Custom fit from 2.2 to 2.10</span></div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="map-pin" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text"><strong>Malleshwaram Store</strong><span>Real Bangalore showroom</span></div>
        </div>
      </div>
    </div>

    <div class="footer__grid">
      <div class="footer__col">
        <div class="footer__brand-name"><span>Kannika</span> Bangles</div>
        <p class="footer__desc">Turning every bride's dream into a beautiful reality. Handcrafted bangles blending tradition with modern style since generations.</p>
        <div class="footer__social" style="margin-top: 16px;">
          <a href="https://wa.me/919844758450" target="_blank" rel="noopener" class="footer__social-link" aria-label="WhatsApp" style="color:#25D366;border-color:rgba(37,211,102,0.4);"><i data-lucide="message-circle" style="width:18px;height:18px;"></i></a>
        </div>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Quick Links</h4>
        <a href="/" class="footer__link">Home</a>
        <a href="/shop" class="footer__link">Shop All</a>
        <a href="/bangle-size-chart-calculator" class="footer__link">Bangle Size Calculator</a>
        <a href="/bridal-jewellery-bangalore" class="footer__link">Bridal Jewellery</a>
        <a href="/temple-jewellery-bangalore" class="footer__link">Temple Jewellery</a>
        <a href="/muhurtham-jewellery-bangalore" class="footer__link">Muhurtham Jewellery</a>
        <a href="/about.html" class="footer__link">Our Story</a>
        <a href="/contact.html" class="footer__link">Contact Us</a>
        <a href="/blog" class="footer__link">Blog &amp; Guides</a>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Bridal Special</h4>
        <a href="/south-indian-bridal-jewellery-set" class="footer__link">Complete Bridal Sets</a>
        <a href="/temple-vaddanam-kamarbandh" class="footer__link">Temple Vaddanam</a>
        <a href="/bridal-matha-patti-maang-tikka" class="footer__link">Matha Patti &amp; Tikka</a>
        <a href="/antique-vanki-baajuband" class="footer__link">Antique Vanki Armlets</a>
        <a href="/wedding-glass-bangle-stacks" class="footer__link">Glass Bangle Stacks</a>
        <a href="/wedding-return-gifts-bangles-bangalore" class="footer__link">Wedding Return Gifts</a>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Policies</h4>
        <a href="/no-return-policy.html" class="footer__link">No Return Policy</a>
        <a href="/exchange-policy.html" class="footer__link">Exchange Policy</a>
        <a href="/delivery-policy.html" class="footer__link">Delivery Policy</a>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Get in Touch</h4>
        <div class="footer__contact-item">
          <i data-lucide="map-pin" style="width:18px;height:18px;"></i>
          <span>No. 157/108, 9th Cross, East Park Road, Malleshwaram, Bengaluru, Karnataka 560003</span>
        </div>
        <div class="footer__contact-item">
          <i data-lucide="phone" style="width:18px;height:18px;"></i>
          <a href="tel:+919844758450">+91 98447 58450</a>
        </div>
        <div class="footer__contact-item">
          <i data-lucide="mail" style="width:18px;height:18px;"></i>
          <a href="mailto:Srikannikabangles@gmail.com">Srikannikabangles@gmail.com</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p>&copy; 2026 Kannika Bangles. All rights reserved. Handcrafted in Bengaluru.</p>
    </div>
  </footer>

  <!-- Interactive Sizing Calculator Script -->
  <script>
    const sizes = [
      { size: "2.2", mm: 54.0, inches: 2.125, circInches: 6.7 },
      { size: "2.4", mm: 57.2, inches: 2.250, circInches: 7.1 },
      { size: "2.6", mm: 60.3, inches: 2.375, circInches: 7.5 },
      { size: "2.8", mm: 63.5, inches: 2.500, circInches: 7.9 },
      { size: "2.10", mm: 66.7, inches: 2.625, circInches: 8.3 },
      { size: "2.12", mm: 69.9, inches: 2.750, circInches: 8.7 }
    ];

    function switchTab(type) {
      const tabD = document.getElementById('tabDiameter');
      const tabH = document.getElementById('tabHand');
      const methodD = document.getElementById('methodDiameter');
      const methodH = document.getElementById('methodHand');

      if (type === 'diameter') {
        tabD.classList.add('active');
        tabH.classList.remove('active');
        methodD.style.display = 'block';
        methodH.style.display = 'none';
        calculateSize();
      } else {
        tabH.classList.add('active');
        tabD.classList.remove('active');
        methodH.style.display = 'block';
        methodD.style.display = 'none';
        calculateHandSize();
      }
    }

    function calculateSize() {
      const unit = document.getElementById('unitSelect').value;
      const rawVal = parseFloat(document.getElementById('diameterInput').value);
      if (isNaN(rawVal) || rawVal <= 0) return;

      let mmVal = rawVal;
      if (unit === 'inches') mmVal = rawVal * 25.4;
      if (unit === 'cm') mmVal = rawVal * 10;

      let closest = sizes[0];
      let minDiff = Math.abs(mmVal - sizes[0].mm);

      for (let i = 1; i < sizes.length; i++) {
        const diff = Math.abs(mmVal - sizes[i].mm);
        if (diff < minDiff) {
          minDiff = diff;
          closest = sizes[i];
        }
      }

      updateDisplay(closest, mmVal);
    }

    function calculateHandSize() {
      const unit = document.getElementById('handUnitSelect').value;
      const rawVal = parseFloat(document.getElementById('handInput').value);
      if (isNaN(rawVal) || rawVal <= 0) return;

      let inchVal = rawVal;
      if (unit === 'cm') inchVal = rawVal / 2.54;
      if (unit === 'mm') inchVal = rawVal / 25.4;

      let closest = sizes[0];
      let minDiff = Math.abs(inchVal - sizes[0].circInches);

      for (let i = 1; i < sizes.length; i++) {
        const diff = Math.abs(inchVal - sizes[i].circInches);
        if (diff < minDiff) {
          minDiff = diff;
          closest = sizes[i];
        }
      }

      updateDisplay(closest, closest.mm);
    }

    function updateDisplay(obj, mmVal) {
      document.getElementById('resultSize').innerText = obj.size;
      document.getElementById('resultMm').innerText = obj.mm.toFixed(1) + ' mm';
      document.getElementById('btnSize').innerText = obj.size;
      document.getElementById('resultText').innerHTML = 'Size <strong>' + obj.size + '</strong> (' + obj.mm.toFixed(1) + ' mm inner diameter) corresponds to ' + obj.inches.toFixed(3) + ' inches. Hand circumference: ~' + obj.circInches + ' inches.';
      document.getElementById('whatsappShareBtn').href = "https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20my%20calculated%20bangle%20size%20is%20" + obj.size + ".%20Can%20you%20show%20me%20bridal%20stacks%20in%20this%20size?";
      
      const scale = 0.85 + (obj.mm - 54) * 0.015;
      document.getElementById('sizeCircle').style.transform = 'scale(' + Math.min(1.25, Math.max(0.85, scale)) + ')';
    }

    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) lucide.createIcons();
      calculateSize();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('bangle-size-chart-calculator.html', htmlContent, 'utf8');
console.log('✅ Generated comprehensive, structured bangle-size-chart-calculator.html');
