const fs = require('fs');

const sharedNavbar = `  <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
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
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20visiting%20your%20website" class="btn btn--primary" style="padding: 8px 16px; font-size: 0.85rem;" target="_blank" rel="noopener">
          <i data-lucide="message-circle" style="width:16px;height:16px;margin-right:6px;"></i> WhatsApp Stylist
        </a>
      </div>
    </div>
  </nav>`;

const sharedCrossLinks = `  <section class="section" style="background: #FAF7F2; padding: 60px 20px; border-top: 1px solid rgba(212,175,55,0.2);">
    <div class="container" style="max-width: 1200px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 600;">Complete Kalyana Ensemble</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 8px;">Explore Specialized Bridal Categories</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <a href="/bangle-size-chart-calculator" style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.25); text-decoration: none; color: inherit; display: block; transition: transform 0.2s, box-shadow 0.2s;">
          <div style="font-size: 1.5rem; margin-bottom: 8px;">📏</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 6px;">Bangle Size Calculator</h3>
          <p style="font-size: 0.88rem; color: #665235; margin: 0; line-height: 1.5;">Dual-method wrist sizing chart with millimeter to Indian sizing conversions.</p>
        </a>
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
  </section>`;

const sharedFooter = `  <footer class="footer">
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
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) lucide.createIcons();
    });
  </script>`;

// ==========================================
// 4. WEDDING GLASS BANGLE STACKS
// ==========================================
const glassStacksPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridal Glass Bangle Stacks &amp; Gold Kadas | Sri Kannika</title>
  <meta name="description" content="Shop bridal glass bangle sets paired with antique gold kadas in Bangalore. Handcrafted green &amp; red Muhurtham stacks, velvet bangles. Visit Malleshwaram.">
  <link rel="canonical" href="https://kannikabangles.com/wedding-glass-bangle-stacks">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Bridal Glass Bangle Stacks &amp; Gold Kadas | Sri Kannika">
  <meta property="og:description" content="Discover vibrant Muhurtham green and crimson red glass bangle stacks paired with 1-gram gold kadas in Bangalore. Custom color matching with zero breakage shipping.">
  <meta property="og:url" content="https://kannikabangles.com/wedding-glass-bangle-stacks">
  <meta property="og:image" content="https://kannikabangles.com/images/glass_bangle_stacks.jpg">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Bridal Glass Bangle Stacks &amp; Gold Kadas | Sri Kannika">
  <meta name="twitter:description" content="Discover vibrant Muhurtham green and crimson red glass bangle stacks paired with 1-gram gold kadas in Bangalore. Custom color matching with zero breakage shipping.">
  <meta name="twitter:image" content="https://kannikabangles.com/images/glass_bangle_stacks.jpg">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css?v=20260929">
  <script src="https://unpkg.com/lucide@latest"></script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": "Muhurtham Bridal Glass Bangle Stack with Antique Gold Kadas",
        "description": "Traditional South Indian wedding glass bangle sets featuring bottle green and ruby red glass churis flanked by carved Nakshi kadas and ruby stone spacers.",
        "image": "https://kannikabangles.com/images/glass_bangle_stacks.jpg",
        "brand": { "@type": "Brand", "name": "Sri Kannika Bangles & Jewels" },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "850",
          "highPrice": "4500",
          "offerCount": "48",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "112"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://kannikabangles.com/wedding-glass-bangle-stacks#webpage",
        "url": "https://kannikabangles.com/wedding-glass-bangle-stacks",
        "name": "Bridal Glass Bangle Stacks & Gold Kadas | Sri Kannika",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kannikabangles.com/" },
            { "@type": "ListItem", "position": 2, "name": "Bangles", "item": "https://kannikabangles.com/bangles" },
            { "@type": "ListItem", "position": 3, "name": "Wedding Glass Bangle Stacks", "item": "https://kannikabangles.com/wedding-glass-bangle-stacks" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why are green glass bangles worn by brides in South Indian weddings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Deep bottle green glass bangles (Hasiru Bale in Kannada, Pachai Valai in Tamil) symbolize fertility, auspicious marital beginnings, and eternal marital prosperity. They are an essential ritual component of Muhurtham morning rituals."
            }
          },
          {
            "@type": "Question",
            "name": "How does Sri Kannika deliver fragile glass bangles without breakage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every glass bangle bundle is threaded on protective cotton cores, wrapped in triple-layer shockproof air bubble cushions, and placed inside rigid corrugated fiber cartons. We guarantee 0% breakage with instant free replacements."
            }
          }
        ]
      }
    ]
  }
  </script>

  <style>
    .color-matrix {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .color-card {
      background: #ffffff;
      border: 1px solid #ebdccb;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }
    .stack-blueprint {
      background: #fdfaf5;
      border: 1px solid #ebdccb;
      border-radius: 14px;
      padding: 32px;
      margin-top: 36px;
    }
  </style>
</head>
<body class="category-seo-page">

${sharedNavbar}

  <!-- --- Hero Header --- -->
  <section style="background: linear-gradient(135deg, #102319 0%, #1c3d2c 100%); color: #fff; padding: 70px 20px 80px; text-align: center;">
    <div class="container" style="max-width: 860px;">
      <span class="badge" style="background: rgba(212, 175, 55, 0.2); color: #e6ca65; border: 1px solid rgba(212, 175, 55, 0.4); padding: 6px 18px; border-radius: 30px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; display: inline-block; margin-bottom: 16px;">
        Auspicious Muhurtham Rituals &bull; Malleshwaram Master Curations
      </span>
      <h1 style="font-family: 'Cinzel', serif; font-size: 2.5rem; line-height: 1.25; margin-bottom: 16px; color: #fff;">
        Bridal Glass Bangle Stacks &amp; Antique Gold Kadas
      </h1>
      <p style="font-size: 1.1rem; color: #d6e8dc; line-height: 1.6; max-width: 740px; margin: 0 auto;">
        Experience the joyful musical chime of handcrafted <strong>glass bangles</strong>. Curated <strong>bangle stacks</strong> combining deep emerald green and blood ruby churis with carved antique <strong>gold kadas</strong> for Kannada, Tamil, and Telugu brides.
      </p>
    </div>
  </section>

  <!-- --- Section 1: Auspicious Color Symbolism --- -->
  <section style="padding: 70px 20px; background: #faf7f2;">
    <div class="container" style="max-width: 1100px;">
      <div style="text-align: center; margin-bottom: 36px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Auspicious Tradition</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2.1rem; color: #2e2216; margin-top: 6px;">
          The Sacred Color Matrix of Indian Wedding Glass Bangles
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div class="color-matrix">
        <div class="color-card" style="border-top: 4px solid #1c5234;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #1c5234; margin-bottom: 8px;">Bottle Green (Hasiru Bale)</h3>
          <p style="color: #554433; font-size: 0.92rem; line-height: 1.6;">
            The sacred emblem of Goddess Parvati. Represents fertility, flourishing life, and harmony. Essential for Karnataka Muhurthams and Gowri Pooja rituals.
          </p>
        </div>

        <div class="color-card" style="border-top: 4px solid #8B1A1A;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #8B1A1A; margin-bottom: 8px;">Blood Ruby Crimson</h3>
          <p style="color: #554433; font-size: 0.92rem; line-height: 1.6;">
            Symbolizes divine marital bond, energy, and auspicious Shakti. Worn during the Mangalsutra tying moment and Sindoor ceremonies.
          </p>
        </div>

        <div class="color-card" style="border-top: 4px solid #C49102;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #8B6914; margin-bottom: 8px;">Haldi Ochre &amp; Saffron</h3>
          <p style="color: #554433; font-size: 0.92rem; line-height: 1.6;">
            Auspicious radiance for pre-wedding Haldi, Mehendi, and Vratham functions. Blends exquisitely with yellow and mustard raw silk sarees.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- --- Section 2: The Symmetrical 2-Hand Stack Formula --- -->
  <section style="padding: 70px 20px; background: #ffffff;">
    <div class="container" style="max-width: 900px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Stylist Blueprint</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          The Perfect Symmetrical 24-Piece Bridal Stack Formula
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div class="stack-blueprint">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.25rem; color: #2e2216; margin-bottom: 14px;">Anatomy of Each Bridal Wrist:</h3>
        <ol style="color: #55412b; font-size: 0.95rem; line-height: 1.8; padding-left: 20px;">
          <li><strong>Lead Wrist Kada:</strong> 1 heavy carved Nakshi Gajra kada (size 2.4 or 2.6) at the wrist joint to stop sliding.</li>
          <li><strong>First Churi Run:</strong> 6 to 8 pure glass bangles in bottle green or ruby red.</li>
          <li><strong>Center Spacers:</strong> 2 micro-gold antique stone-studded bangles flanking a dangling jhumki latkan.</li>
          <li><strong>Second Churi Run:</strong> 6 to 8 matching glass bangles.</li>
          <li><strong>Forearm Guard Kada:</strong> 1 broad antique screw-kada that hugs the forearm taper snugly.</li>
        </ol>
      </div>

      <!-- Video Call WhatsApp CTA -->
      <div style="margin-top: 40px; background: linear-gradient(135deg, #fdfbf7 0%, #f6efe2 100%); border: 2px dashed #d4af37; border-radius: 16px; padding: 36px; text-align: center;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.6rem; color: #2e2216; margin-bottom: 12px;">
          Match Your Bangles with Saree Colors on 4K Video Call
        </h3>
        <p style="color: #665235; font-size: 1rem; max-width: 680px; margin: 0 auto 24px; line-height: 1.6;">
          WhatsApp us a photo of your wedding saree border. Our Malleshwaram stylists will build a custom symmetrical stack live on video before you spend ₹0.
        </p>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20please%20curate%20a%20bridal%20glass%20bangle%20stack%20for%20my%20saree" class="btn btn--primary" style="padding: 14px 32px; font-size: 1rem;" target="_blank" rel="noopener">
          <i data-lucide="video" style="width: 18px; height: 18px; margin-right: 8px;"></i> Build Custom Stack on Video Call
        </a>
      </div>
    </div>
  </section>

${sharedCrossLinks}

${sharedFooter}

</body>
</html>
`;

// ==========================================
// 5. WEDDING RETURN GIFTS BANGLES BANGALORE
// ==========================================
const returnGiftsPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wedding Return Gifts Bangles in Bangalore | Sri Kannika</title>
  <meta name="description" content="Shop wedding return gifts bangles in Bangalore in wholesale bulk. Auspicious Thamboolam glass &amp; gold bangles for weddings. Visit Malleshwaram.">
  <link rel="canonical" href="https://kannikabangles.com/wedding-return-gifts-bangles-bangalore">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Wedding Return Gifts Bangles in Bangalore | Wholesale | Sri Kannika">
  <meta property="og:description" content="Wholesale wedding return gift bangles in Bangalore. Custom Thamboolam packs, silk thread bangles, and assorted size bundles delivered directly to wedding halls.">
  <meta property="og:url" content="https://kannikabangles.com/wedding-return-gifts-bangles-bangalore">
  <meta property="og:image" content="https://kannikabangles.com/images/wedding_return_gifts.jpg">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Wedding Return Gifts Bangles in Bangalore | Wholesale | Sri Kannika">
  <meta name="twitter:description" content="Wholesale wedding return gift bangles in Bangalore. Custom Thamboolam packs, silk thread bangles, and assorted size bundles delivered directly to wedding halls.">
  <meta name="twitter:image" content="https://kannikabangles.com/images/wedding_return_gifts.jpg">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css?v=20260929">
  <script src="https://unpkg.com/lucide@latest"></script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": "Wholesale Wedding Return Gifts Bangles Bangalore",
        "description": "Bulk Thamboolam gift bangle sets in assorted sizes (2.4, 2.6, 2.8) packed in royal gold potlis for wedding ceremonies, Valaikaapu, and Seemantham in Bangalore.",
        "image": "https://kannikabangles.com/images/wedding_return_gifts.jpg",
        "brand": { "@type": "Brand", "name": "Sri Kannika Bangles & Jewels" },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "45",
          "highPrice": "350",
          "offerCount": "100",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "142"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://kannikabangles.com/wedding-return-gifts-bangles-bangalore#webpage",
        "url": "https://kannikabangles.com/wedding-return-gifts-bangles-bangalore",
        "name": "Wedding Return Gifts Bangles in Bangalore | Sri Kannika",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kannikabangles.com/" },
            { "@type": "ListItem", "position": 2, "name": "Bangles", "item": "https://kannikabangles.com/bangles" },
            { "@type": "ListItem", "position": 3, "name": "Wedding Return Gifts Bangles", "item": "https://kannikabangles.com/wedding-return-gifts-bangles-bangalore" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the minimum order quantity for wholesale wedding return gift bangles?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our wholesale bulk pricing starts from just 50 pairs. We cater to orders ranging from 50 to 5,000+ guest gift sets for large Bangalore wedding receptions and choultries."
            }
          },
          {
            "@type": "Question",
            "name": "How do you handle different bangle sizes for wedding guests?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We use our proven South Indian Wedding Guest Ratio: 20% Size 2.4, 50% Size 2.6, and 30% Size 2.8. Each gift potli is clearly size-labeled so your hospitality coordinators can distribute them effortlessly."
            }
          }
        ]
      }
    ]
  }
  </script>

  <style>
    .tier-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 36px;
    }
    .tier-card {
      background: #fff;
      border: 1px solid #ebdccb;
      border-radius: 14px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 6px 20px rgba(0,0,0,0.03);
    }
    .tier-card.featured {
      border: 2px solid #8B6914;
      background: #fffdfa;
      transform: scale(1.02);
    }
  </style>
</head>
<body class="category-seo-page">

${sharedNavbar}

  <!-- --- Hero Header --- -->
  <section style="background: linear-gradient(135deg, #2b1812 0%, #46251b 100%); color: #fff; padding: 70px 20px 80px; text-align: center;">
    <div class="container" style="max-width: 860px;">
      <span class="badge" style="background: rgba(212, 175, 55, 0.2); color: #e6ca65; border: 1px solid rgba(212, 175, 55, 0.4); padding: 6px 18px; border-radius: 30px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; display: inline-block; margin-bottom: 16px;">
        Direct Wholesale Pricing &bull; Express Choultry Delivery
      </span>
      <h1 style="font-family: 'Cinzel', serif; font-size: 2.5rem; line-height: 1.25; margin-bottom: 16px; color: #fff;">
        Wedding Return Gifts Bangles in Bangalore
      </h1>
      <p style="font-size: 1.1rem; color: #edd6d1; line-height: 1.6; max-width: 740px; margin: 0 auto;">
        Delight your wedding guests with auspicious <strong>wedding return gifts</strong>. Handcrafted <strong>thamboolam bangles</strong>, silk thread churis, and velvet kadas in ready-to-gift golden Potlis with <strong>wholesale</strong> pricing and direct hall delivery across Bangalore.
      </p>
    </div>
  </section>

  <!-- --- Section 1: Transparent Bulk Tiers --- -->
  <section style="padding: 70px 20px; background: #faf7f2;">
    <div class="container" style="max-width: 1100px;">
      <div style="text-align: center; margin-bottom: 36px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Direct Factory Rates</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2.1rem; color: #2e2216; margin-top: 6px;">
          Wholesale Bulk Pricing Packages for Bangalore Weddings
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div class="tier-grid">
        <div class="tier-card">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.3rem; color: #2e2216; margin-bottom: 8px;">Silver Thamboolam Pack</h3>
          <div style="font-size: 2rem; font-weight: 700; color: #8B6914; margin: 12px 0;">₹45 <span style="font-size: 0.9rem; color: #776;">/ guest</span></div>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            Pair of auspicious green/red glass bangles + gold spacer rings packed in organza gift pouch. Min order: 50 sets.
          </p>
        </div>

        <div class="tier-card featured">
          <span style="background: #8B6914; color: #fff; font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">Most Popular</span>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.3rem; color: #2e2216; margin-top: 10px; margin-bottom: 8px;">Royal Zari Potli Pack</h3>
          <div style="font-size: 2rem; font-weight: 700; color: #8B6914; margin: 12px 0;">₹95 <span style="font-size: 0.9rem; color: #776;">/ guest</span></div>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            Set of 4 bangles (2 glass + 2 antique matte micro gold kadas) presented in heavy zari drawstring potli bag with custom gift tag.
          </p>
        </div>

        <div class="tier-card">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.3rem; color: #2e2216; margin-bottom: 8px;">VIP Bridal Favours</h3>
          <div style="font-size: 2rem; font-weight: 700; color: #8B6914; margin: 12px 0;">₹180 <span style="font-size: 0.9rem; color: #776;">/ guest</span></div>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            Complete 8-piece silk thread and antique kada set in velvet presentation box. Perfect for close relatives, bridesmaids, and Valaikaapu ceremonies.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- --- Section 2: Guest Sizing Formula --- -->
  <section style="padding: 70px 20px; background: #ffffff;">
    <div class="container" style="max-width: 900px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Logistical Excellence</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          The 20-50-30 Guest Sizing Formula
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="background: #fdfaf5; border: 1px solid #e8dbc9; border-radius: 14px; padding: 32px 30px; line-height: 1.7; color: #55412b; font-size: 0.95rem;">
        <p>
          Organizing return gifts for 200 to 500 women guests? You cannot ask every aunt and cousin for their wrist size! Sri Kannika supplies pre-sorted guest distribution packs based on 30+ years of Bangalore wedding statistics:
        </p>
        <ul style="padding-left: 20px; margin-top: 14px;">
          <li><strong>20% Size 2.4 (Small/Medium):</strong> Suitable for teenagers, young women, and slender wrists.</li>
          <li><strong>50% Size 2.6 (Medium/Large):</strong> The universal standard size fitting the majority of Indian women.</li>
          <li><strong>30% Size 2.8 (Large):</strong> Ideal for senior family matriarchs and broad knuckles.</li>
        </ul>
        <p style="margin-top: 14px;">
          Each Potli bag is clearly labeled with removable gold size stickers, making guest gifting completely stress-free.
        </p>
      </div>

      <!-- Bulk Inquiries CTA -->
      <div style="margin-top: 40px; background: linear-gradient(135deg, #fdfbf7 0%, #f6efe2 100%); border: 2px dashed #d4af37; border-radius: 16px; padding: 36px; text-align: center;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.6rem; color: #2e2216; margin-bottom: 12px;">
          Request Wholesale Samples &amp; Choultry Delivery in Bangalore
        </h3>
        <p style="color: #665235; font-size: 1rem; max-width: 680px; margin: 0 auto 24px; line-height: 1.6;">
          Visiting Bangalore for wedding shopping? Drop by our Malleshwaram showroom to touch samples, or WhatsApp us your guest count for an instant quotation.
        </p>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20inquiring%20about%20wholesale%20wedding%20return%20gift%20bangles" class="btn btn--primary" style="padding: 14px 32px; font-size: 1rem;" target="_blank" rel="noopener">
          <i data-lucide="message-circle" style="width: 18px; height: 18px; margin-right: 8px;"></i> Get Wholesale Quote on WhatsApp (+91 9844758450)
        </a>
      </div>
    </div>
  </section>

${sharedCrossLinks}

${sharedFooter}

</body>
</html>
`;

// ==========================================
// 6. SOUTH INDIAN BRIDAL JEWELLERY SET
// ==========================================
const bridalSetPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>South Indian Bridal Jewellery Set Online | Sri Kannika</title>
  <meta name="description" content="Shop authentic South Indian bridal jewellery sets online. Complete wedding package: chokers, long harams, jhumkas, Vaddanam &amp; kadas. Visit Malleshwaram.">
  <link rel="canonical" href="https://kannikabangles.com/south-indian-bridal-jewellery-set">

  <meta property="og:type" content="website">
  <meta property="og:title" content="South Indian Bridal Jewellery Set Online | Sri Kannika">
  <meta property="og:description" content="Complete 7-piece South Indian bridal jewellery sets in Bangalore. 24K micro gold temple harams, chokers, Vaddanam, Vanki, and jhumkas with 4K WhatsApp video trial.">
  <meta property="og:url" content="https://kannikabangles.com/south-indian-bridal-jewellery-set">
  <meta property="og:image" content="https://kannikabangles.com/images/bridal_suite.jpg">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="South Indian Bridal Jewellery Set Online | Sri Kannika">
  <meta name="twitter:description" content="Complete 7-piece South Indian bridal jewellery sets in Bangalore. 24K micro gold temple harams, chokers, Vaddanam, Vanki, and jhumkas with 4K WhatsApp video trial.">
  <meta name="twitter:image" content="https://kannikabangles.com/images/bridal_suite.jpg">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css?v=20260929">
  <script src="https://unpkg.com/lucide@latest"></script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": "Complete 7-Piece South Indian Bridal Jewellery Set",
        "description": "Exquisite 7-piece Kalyana trousseau suite including Kemp choker, Kasu haram, temple jhumkas with mattal, Nakshi Vaddanam waist belt, twin Vanki armlets, Matha Patti, and bridal kadas.",
        "image": "https://kannikabangles.com/images/bridal_suite.jpg",
        "brand": { "@type": "Brand", "name": "Sri Kannika Bangles & Jewels" },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "12500",
          "highPrice": "28500",
          "offerCount": "18",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "96"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://kannikabangles.com/south-indian-bridal-jewellery-set#webpage",
        "url": "https://kannikabangles.com/south-indian-bridal-jewellery-set",
        "name": "South Indian Bridal Jewellery Set Online | Sri Kannika",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kannikabangles.com/" },
            { "@type": "ListItem", "position": 2, "name": "Bridal Jewellery", "item": "https://kannikabangles.com/bridal-jewellery-bangalore" },
            { "@type": "ListItem", "position": 3, "name": "South Indian Bridal Jewellery Set", "item": "https://kannikabangles.com/south-indian-bridal-jewellery-set" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What pieces are included in a complete South Indian bridal jewellery set?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The complete 7-piece Sri Kannika suite includes: 1. Antique Kemp Choker, 2. Long Temple Nakshi Haram, 3. Multi-tier Jhumkas with Mattal hair chains, 4. Sculpted Goddess Lakshmi Vaddanam, 5. Pair of Vanki armlets, 6. Matha Patti / Nethi Chutti, and 7. Pair of heavy carved bridal kadas."
            }
          },
          {
            "@type": "Question",
            "name": "Can I customize the stone colors to match my Muhurtham saree?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our Malleshwaram artisans customize ruby, emerald, uncut Polki, and pearl accents across all seven ornaments to achieve 100% color harmony with your Kanjivaram silk saree."
            }
          }
        ]
      }
    ]
  }
  </script>

  <style>
    .trousseau-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 36px;
    }
    .trousseau-card {
      background: #fff;
      border: 1px solid #ebdccb;
      border-radius: 14px;
      padding: 28px;
      box-shadow: 0 4px 18px rgba(0,0,0,0.03);
    }
  </style>
</head>
<body class="category-seo-page">

${sharedNavbar}

  <!-- --- Hero Header --- -->
  <section style="background: linear-gradient(135deg, #24141c 0%, #3e1e2d 100%); color: #fff; padding: 70px 20px 80px; text-align: center;">
    <div class="container" style="max-width: 860px;">
      <span class="badge" style="background: rgba(212, 175, 55, 0.2); color: #e6ca65; border: 1px solid rgba(212, 175, 55, 0.4); padding: 6px 18px; border-radius: 30px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; display: inline-block; margin-bottom: 16px;">
        Royal Kalyana Suite &bull; Complete 7-Piece Package
      </span>
      <h1 style="font-family: 'Cinzel', serif; font-size: 2.5rem; line-height: 1.25; margin-bottom: 16px; color: #fff;">
        South Indian Bridal Jewellery Set Online
      </h1>
      <p style="font-size: 1.1rem; color: #e8d0dc; line-height: 1.6; max-width: 740px; margin: 0 auto;">
        Step into your wedding mandap in peerless royal grandeur. Our handcrafted <strong>south indian bridal jewellery set</strong> provides head-to-toe trousseau perfection with 24K <strong>1 gram gold</strong> polish, genuine Kemp rubies, zero blind advance, and 4K live video styling.
      </p>
    </div>
  </section>

  <!-- --- Section 1: Unboxing the 7-Piece Suite --- -->
  <section style="padding: 70px 20px; background: #ffffff;">
    <div class="container" style="max-width: 1100px;">
      <div style="text-align: center; margin-bottom: 36px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Complete Kalyana Trousseau</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2.1rem; color: #2e2216; margin-top: 6px;">
          Unboxing the Essential 7-Piece South Indian Bridal Suite
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div class="trousseau-grid">
        <div class="trousseau-card">
          <div style="font-size: 1.5rem; color: #8B6914; margin-bottom: 8px;">👑</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #2e2216; margin-bottom: 8px;">1. Antique Kemp Choker</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6;">
            Snug high-neck collar set with uncut rubies, green emerald cabochons, and clustered pearl drops designed to frame the collarbone over high-neck silk blouses.
          </p>
        </div>

        <div class="trousseau-card">
          <div style="font-size: 1.5rem; color: #8B6914; margin-bottom: 8px;">📿</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #2e2216; margin-bottom: 8px;">2. Long Temple Nakshi Haram</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6;">
            A grand 28-inch Kasumala or Lakshmi Nakshi long chain that cascades regally across the chest pleats, invoking divine temple blessings.
          </p>
        </div>

        <div class="trousseau-card">
          <div style="font-size: 1.5rem; color: #8B6914; margin-bottom: 8px;">✨</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #2e2216; margin-bottom: 8px;">3. Temple Jhumkas &amp; Mattal</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6;">
            Three-tier bell jhumkas with ruby drops and triple-strand hair ear-chains (Mattal) that pin seamlessly into fresh jasmine bridal braids.
          </p>
        </div>

        <div class="trousseau-card">
          <div style="font-size: 1.5rem; color: #8B6914; margin-bottom: 8px;">⚜️</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #2e2216; margin-bottom: 8px;">4. Sculpted Temple Vaddanam</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6;">
            The signature bridal waist belt with carved Goddess Lakshmi centerpiece and adjustable 26" to 44" extension chain to cinch Kanjivaram pleats.
          </p>
        </div>

        <div class="trousseau-card">
          <div style="font-size: 1.5rem; color: #8B6914; margin-bottom: 8px;">💎</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #2e2216; margin-bottom: 8px;">5. Pair of Inverted Vanki Armlets</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6;">
            Twin peacock and cobra armlets with flexible spring bands that slide snugly over embroidered Maggam work blouse sleeves.
          </p>
        </div>

        <div class="trousseau-card">
          <div style="font-size: 1.5rem; color: #8B6914; margin-bottom: 8px;">🌸</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #2e2216; margin-bottom: 8px;">6. Matha Patti &amp; Nethi Chutti</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6;">
            Forehead adornment with side chains and pearl fringes that softly frame the eyes for close-up candid wedding photography.
          </p>
        </div>

        <div class="trousseau-card">
          <div style="font-size: 1.5rem; color: #8B6914; margin-bottom: 8px;">⭕</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #2e2216; margin-bottom: 8px;">7. Pair of Carved Bridal Kadas</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6;">
            Heavy openable screw-cuff bangles with Nakshi lions or peacocks to anchor your bridal glass bangle stacks on both wrists.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- --- Section 2: Real Gold vs 1-Gram Gold Financial Breakdown --- -->
  <section style="padding: 70px 20px; background: #faf7f2;">
    <div class="container" style="max-width: 960px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Financial Freedom</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          The ₹25 Lakhs vs. ₹18,500 Bridal Reality
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="background: #fff; border-radius: 12px; border: 1px solid #ebdccb; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
          <thead>
            <tr style="background: #2e2216; color: #f7e7ce; font-family: 'Cinzel', serif;">
              <th style="padding: 14px 18px;">Comparison Factor</th>
              <th style="padding: 14px 18px;">Solid 22K Gold 7-Piece Set</th>
              <th style="padding: 14px 18px;">Sri Kannika 1-Gram Micro Gold Set</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0eae1;">
              <td style="padding: 14px 18px; font-weight: 600;">Total Investment</td>
              <td style="padding: 14px 18px; color: #933;">₹22,00,000 &ndash; ₹35,00,000</td>
              <td style="padding: 14px 18px; color: #8B6914; font-weight: 700;">₹12,500 &ndash; ₹28,500</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0eae1; background: #faf7f2;">
              <td style="padding: 14px 18px; font-weight: 600;">Bank Locker Stress</td>
              <td style="padding: 14px 18px;">Permanent annual locker fees &amp; theft anxiety</td>
              <td style="padding: 14px 18px;">Keep in your home wardrobe peacefully</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0eae1;">
              <td style="padding: 14px 18px; font-weight: 600;">Wedding Hall Risk</td>
              <td style="padding: 14px 18px;">Requires dedicated relatives to guard jewellery</td>
              <td style="padding: 14px 18px;">Zero anxiety, 100% focused on wedding rituals</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; font-weight: 600;">Photo &amp; Video Quality</td>
              <td style="padding: 14px 18px;">Traditional antique look</td>
              <td style="padding: 14px 18px;">100% identical regal sheen on 4K cameras</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Live Video CTA Box -->
      <div style="margin-top: 40px; background: linear-gradient(135deg, #fdfbf7 0%, #f6efe2 100%); border: 2px dashed #d4af37; border-radius: 16px; padding: 36px; text-align: center;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.6rem; color: #2e2216; margin-bottom: 12px;">
          Inspect Your 7-Piece Set on Live 4K Video Before Paying
        </h3>
        <p style="color: #665235; font-size: 1rem; max-width: 680px; margin: 0 auto 24px; line-height: 1.6;">
          Our master stylists will lay out the entire 7-piece trousseau against your wedding saree swatch on WhatsApp video call. Zero blind payment, zero advance.
        </p>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20please%20show%20me%20your%20complete%207-piece%20South%20Indian%20bridal%20jewellery%20set%20on%20video%20call" class="btn btn--primary" style="padding: 14px 32px; font-size: 1rem;" target="_blank" rel="noopener">
          <i data-lucide="video" style="width: 18px; height: 18px; margin-right: 8px;"></i> Book Private 4K Video Consultation
        </a>
      </div>
    </div>
  </section>

${sharedCrossLinks}

${sharedFooter}

</body>
</html>
`;

fs.writeFileSync('wedding-glass-bangle-stacks.html', glassStacksPage, 'utf8');
console.log('✅ Generated comprehensive wedding-glass-bangle-stacks.html');

fs.writeFileSync('wedding-return-gifts-bangles-bangalore.html', returnGiftsPage, 'utf8');
console.log('✅ Generated comprehensive wedding-return-gifts-bangles-bangalore.html');

fs.writeFileSync('south-indian-bridal-jewellery-set.html', bridalSetPage, 'utf8');
console.log('✅ Generated comprehensive south-indian-bridal-jewellery-set.html');
