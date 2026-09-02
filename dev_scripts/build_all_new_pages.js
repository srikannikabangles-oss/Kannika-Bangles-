const fs = require('fs');
const path = require('path');
const { getNavbarHtml, getFooterHtml } = require('./create_new_seo_pages');

// ══════════════════════════════════════════════════════════════
// 1. Muhurtham Jewellery Bangalore
// ══════════════════════════════════════════════════════════════
const muhurthamHtml = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Muhurtham Jewellery Bangalore | Traditional Wedding Bangles &amp; Sets | Sri Kannika</title>
  <meta name="description" content="Shop authentic Muhurtham bridal jewellery in Bangalore. Handcrafted Kemp stone chokers, Nakshi Lakshmi harams, green glass &amp; gold bangle stacks. Visit Malleshwaram showroom.">
  <meta name="keywords" content="muhurtham jewellery bangalore, traditional muhurtham bangles, south indian wedding bridal jewellery, kalyana jewellery set bangalore, kemp stone bridal choker, muhurtham kada bangalore">
  <meta name="author" content="Sri Kannika Bangles">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#8B6914">
  <link rel="canonical" href="https://kannikabangles.com/muhurtham-jewellery-bangalore">
  <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png">
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180.png">

  <!-- Open Graph -->
  <meta property="og:title" content="Muhurtham Jewellery Bangalore | Traditional Wedding Bangles &amp; Sets | Sri Kannika">
  <meta property="og:description" content="Shop authentic Muhurtham bridal jewellery in Bangalore. Handcrafted Kemp stone chokers, Nakshi Lakshmi harams, green glass &amp; gold bangle stacks.">
  <meta property="og:image" content="https://kannikabangles.com/images/hero-banner.png">
  <meta property="og:url" content="https://kannikabangles.com/muhurtham-jewellery-bangalore">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Kannika Bangles">
  <meta property="og:locale" content="en_IN">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Muhurtham Jewellery Bangalore | Traditional Wedding Sets">
  <meta name="twitter:description" content="Shop handcrafted Muhurtham bridal jewellery in Bangalore. Nakshi harams, Kemp stone chokers &amp; wedding bangles.">
  <meta name="twitter:image" content="https://kannikabangles.com/images/hero-banner.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/styles.css?v=20260821_103">
  <link rel="stylesheet" href="/css/pages.css?v=20260821_103">
  <link rel="stylesheet" href="/css/mobile.css?v=20260821_103">

  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" defer></script>

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JewelryStore",
        "@id": "https://kannikabangles.com/#organization",
        "name": "Sri Kannika Bangles",
        "url": "https://kannikabangles.com/",
        "logo": "https://kannikabangles.com/images/kannika_logo.jpeg",
        "image": "https://kannikabangles.com/images/hero-banner.png",
        "telephone": "+919844758450",
        "email": "Srikannikabangles@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "No. 157/108, 9th Cross, East Park Road, Malleshwaram",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "postalCode": "560003",
          "addressCountry": "IN"
        },
        "priceRange": "₹₹"
      },
      {
        "@type": "WebPage",
        "@id": "https://kannikabangles.com/muhurtham-jewellery-bangalore#webpage",
        "url": "https://kannikabangles.com/muhurtham-jewellery-bangalore",
        "name": "Muhurtham Jewellery Bangalore | Traditional Wedding Bangles & Sets | Sri Kannika",
        "description": "Authentic South Indian Muhurtham bridal jewellery collection featuring antique Nakshi harams, ruby Kemp chokers, Lakshmi kadas, and traditional bridal bangle stacks.",
        "isPartOf": {"@id": "https://kannikabangles.com/#website"},
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kannikabangles.com/"},
            {"@type": "ListItem", "position": 2, "name": "Bangalore Bridal", "item": "https://kannikabangles.com/bridal-jewellery-bangalore"},
            {"@type": "ListItem", "position": 3, "name": "Muhurtham Jewellery", "item": "https://kannikabangles.com/muhurtham-jewellery-bangalore"}
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What jewellery is essential for a South Indian Muhurtham ceremony?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A traditional South Indian Muhurtham ensemble requires a high Kemp choker (Kante / Hasli), a long Nakshi Lakshmi or mango haram, antique temple jhumkas with maattal, a traditional Mathapatti (Damini), and full Muhurtham bridal bangle stacks with green/red glass and gold kadas."
            }
          },
          {
            "@type": "Question",
            "name": "Why are green glass bangles worn with gold kadas for Muhurtham?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In Karnataka and South Indian wedding traditions, green glass bangles symbolize fertility, prosperity, and marital auspiciousness (Saubhagya). They are traditionally paired with handcrafted antique gold kadas at both ends for structural beauty."
            }
          },
          {
            "@type": "Question",
            "name": "Can I customize my Muhurtham bangle stack to match my Kanjeevaram saree?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! At Sri Kannika Bangles Malleshwaram, our bridal stylists create custom stacks matching your silk saree border, pallu zari, and wrist size. You can also share saree photos on WhatsApp (+91 98447 58450) for online curation."
            }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body class="page-bridal-jewellery">
${getNavbarHtml('bridal')}

  <!-- Hero Header -->
  <header class="page-hero" style="background: linear-gradient(135deg, rgba(59,24,62,0.92), rgba(24,19,22,0.96)), url('/images/hero-banner.png') center/cover no-repeat; padding: 100px 20px 70px; text-align: center; color: white;">
    <div class="container" style="max-width: 900px;">
      <div class="breadcrumb" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #FFE28A; margin-bottom: 16px;">
        <a href="/" style="color: inherit; text-decoration: none;">Home</a>
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        <a href="/bridal-jewellery-bangalore" style="color: inherit; text-decoration: none;">Bangalore Bridal</a>
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        <span>Muhurtham Jewellery</span>
      </div>
      <h1 style="font-family: 'Cinzel', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: #FDF9F9; line-height: 1.2; margin-bottom: 16px;">
        Traditional Muhurtham Jewellery in Bangalore
      </h1>
      <p style="font-size: 1.1rem; line-height: 1.7; color: rgba(255,255,255,0.88); max-width: 760px; margin: 0 auto 28px;">
        Adorn your most sacred wedding moments with heirloom majesty. Handcrafted Nakshi Lakshmi harams, ruby Kemp stone chokers, and authentic Muhurtham bridal bangle stacks crafted for South Indian brides.
      </p>
      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <a href="/bangles" class="btn btn--primary btn--lg" style="padding: 14px 28px; font-weight: 700;">Explore Muhurtham Bangles</a>
        <a href="/temple-jewellery-bangalore" class="btn btn--outline btn--lg" style="border-color: #D4AF37; color: #FFE28A; padding: 14px 28px; font-weight: 600;">View Temple Harams</a>
        <a href="https://wa.me/919844758450?text=Hi!%20I'm%20looking%20for%20Muhurtham%20jewellery%20and%20bangle%20stacks%20for%20my%20wedding." target="_blank" class="btn btn--outline btn--lg" style="border-color: #25D366; color: #25D366; background: rgba(37,211,102,0.1); padding: 14px 28px; font-weight: 600;">
          <i data-lucide="message-circle" style="width:18px;height:18px;margin-right:6px;display:inline-block;vertical-align:middle;"></i> WhatsApp Bridal Stylist
        </a>
      </div>
    </div>
  </header>

  <!-- Main Content Container -->
  <main class="container" style="padding: 60px 20px;">

    <!-- Section 1: Muhurtham Ceremony Essentials -->
    <section style="margin-bottom: 70px;">
      <div class="text-center" style="margin-bottom: 40px;">
        <p class="section-subtitle" style="font-family:'Cinzel',serif;color:var(--pink-primary);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;font-size:0.85rem;margin-bottom:6px;">Sacred Wedding Adornments</p>
        <h2 class="section-title" style="font-family:'Cinzel',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:var(--text-primary);margin-bottom:12px;">The 4 Pillars of <span class="text-gold" style="color:#B38F24;">Muhurtham Styling</span></h2>
        <div class="divider" style="width:60px;height:3px;background:var(--pink-primary);margin:0 auto 16px;"></div>
        <p style="max-width:700px;margin:0 auto;color:var(--text-muted);font-size:1rem;line-height:1.6;">During the Mangalyadharana and Kanyadaana rituals, every piece of jewellery carries spiritual significance and photographic grandeur.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="circle" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">1. Traditional Bangle Stacks</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">Green glass bangles framed by antique micro-gold kadas, ruby spacer thin bangles, and peacock side kadas.</p>
          <a href="/bangles" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Shop Bridal Bangles &rarr;</a>
        </div>

        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="gem" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">2. Nakshi Lakshmi Harams</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">3-tier layered antique long harams featuring Goddess Lakshmi motifs and auspicious mango / kemp stone vines.</p>
          <a href="/temple-jewellery-bangalore" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Browse Temple Harams &rarr;</a>
        </div>

        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="sparkles" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">3. Antique Chokers &amp; Kantes</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">High-neck matte gold chokers that frame the silk saree border with deep ruby kemp and emerald spinels.</p>
          <a href="/necklaces" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Explore Chokers &rarr;</a>
        </div>

        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="heart" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">4. Temple Jhumkas &amp; Maattal</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">Grand 3-step temple jhumkas with pearl hangings and ear-chain extensions for royal bridal posture.</p>
          <a href="/earrings" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Browse Jhumkas &rarr;</a>
        </div>
      </div>
    </section>

    <!-- Section 2: Muhurtham Saree & Bangle Stacking Guide -->
    <section style="margin-bottom: 70px; background: #FFFBF2; border: 1px solid rgba(212,175,55,0.25); border-radius: 16px; padding: 40px 30px;">
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-family:'Cinzel',serif; font-size: 1.8rem; color: #3B183E; text-align: center; margin-bottom: 20px;">
          How to Build the Perfect <span style="color:#B38F24;">Muhurtham Bangle Stack</span>
        </h2>
        <p style="color: #444; line-height: 1.8; margin-bottom: 24px; font-size: 1.02rem;">
          For a traditional Karnataka or South Indian Muhurtham, the wrist ensemble is layered systematically to blend heritage sanctity with camera-ready brilliance:
        </p>
        <ul style="line-height: 2; color: #333; font-size: 1rem; margin-left: 20px; margin-bottom: 28px;">
          <li><strong>Outer Kadas (2 pcs):</strong> Heavy Nakshi peacock or elephant-head openable kadas at both outer ends.</li>
          <li><strong>Accent Spacers (4–8 pcs):</strong> Ruby/Emerald kemp thin spacer bangles interspersed between glass.</li>
          <li><strong>Core Auspicious Layer (12–24 pcs):</strong> Hand-picked deep green or red glass bangles matching your silk saree zari.</li>
          <li><strong>Center Masterpiece:</strong> A centerpiece Jadau or antique broad cuff for maximum wrist grandeur.</li>
        </ul>
        <div style="text-align: center;">
          <a href="/bangles" class="btn btn--primary" style="padding: 12px 28px; font-weight: 700;">Build Your Bridal Stack Now</a>
        </div>
      </div>
    </section>

    <!-- Section 3: Curated Collections Deep-Dive -->
    <section style="margin-bottom: 70px;">
      <div class="text-center" style="margin-bottom: 36px;">
        <h2 style="font-family:'Cinzel',serif; font-size: 1.8rem; color: #3B183E;">Shop by Jewellery Style</h2>
        <div class="divider" style="width:50px;height:3px;background:var(--pink-primary);margin:8px auto 16px;"></div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px; text-align: center;">
          <h3 style="font-family:'Cinzel',serif; color:#B38F24; margin-bottom: 10px;">Antique Temple Jewellery</h3>
          <p style="color: #666; font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px;">Pure matte 24K micro-plated temple sets with zero unwanted camera glare.</p>
          <a href="/temple-jewellery-bangalore" class="btn btn--outline btn--sm" style="font-weight:600;">View Temple Sets</a>
        </div>
        <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px; text-align: center;">
          <h3 style="font-family:'Cinzel',serif; color:#B38F24; margin-bottom: 10px;">Bridal Bangles &amp; Kadas</h3>
          <p style="color: #666; font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px;">Over 500+ designs in sizes 2.2, 2.4, 2.6, 2.8, and 2.10 with custom curation.</p>
          <a href="/bangles" class="btn btn--outline btn--sm" style="font-weight:600;">View Bangles</a>
        </div>
        <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px; text-align: center;">
          <h3 style="font-family:'Cinzel',serif; color:#B38F24; margin-bottom: 10px;">Complete Bridal Suites</h3>
          <p style="color: #666; font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px;">Complete matching sets from Mathapatti, Vanki, Choker to Harams.</p>
          <a href="/bridal-jewellery-bangalore" class="btn btn--outline btn--sm" style="font-weight:600;">View Bridal Suites</a>
        </div>
      </div>
    </section>

    <!-- Section 4: FAQ Section -->
    <section style="margin-bottom: 60px; max-width: 800px; margin-left: auto; margin-right: auto;">
      <h2 style="font-family:'Cinzel',serif; font-size: 1.8rem; color: #3B183E; text-align: center; margin-bottom: 28px;">
        Frequently Asked Questions by Bangalore Brides
      </h2>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 20px;">
          <h3 style="font-family:'Cinzel',serif; font-size: 1.05rem; color: #3B183E; margin-bottom: 8px;">Q. What jewellery is essential for a South Indian Muhurtham?</h3>
          <p style="color: #555; font-size: 0.92rem; line-height: 1.6;">A high Kemp choker (Hasli), long Nakshi Lakshmi haram, temple jhumkas with maattal, and full green glass &amp; antique gold bridal bangle stacks.</p>
        </div>
        <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 20px;">
          <h3 style="font-family:'Cinzel',serif; font-size: 1.05rem; color: #3B183E; margin-bottom: 8px;">Q. Does imitation jewellery look genuine in wedding photos?</h3>
          <p style="color: #555; font-size: 0.92rem; line-height: 1.6;">Yes. Our 24K micro-gold plated matte finish mimics pure heirloom gold without reflective glare, capturing rich detail under 4K lenses.</p>
        </div>
        <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 20px;">
          <h3 style="font-family:'Cinzel',serif; font-size: 1.05rem; color: #3B183E; margin-bottom: 8px;">Q. Can I visit your showroom in Bangalore for a bridal trial?</h3>
          <p style="color: #555; font-size: 0.92rem; line-height: 1.6;">Yes! Bring your wedding saree to our Malleshwaram showroom (No. 157/108, 9th Cross, East Park Road) or book a consultation on WhatsApp.</p>
        </div>
      </div>
    </section>

    <!-- Section 5: Bottom CTA Banner -->
    <section style="background: linear-gradient(135deg, #3B183E, #20B2AA); border-radius: 16px; padding: 48px 30px; text-align: center; color: white;">
      <h2 style="font-family:'Cinzel',serif; font-size: 2rem; color: #FFE28A; margin-bottom: 12px;">Plan Your Muhurtham Look with Sri Kannika</h2>
      <p style="max-width: 600px; margin: 0 auto 24px; font-size: 1rem; line-height: 1.6; color: rgba(255,255,255,0.9);">
        Visit our Malleshwaram showroom or order online with express Bangalore delivery &amp; insured pan-India shipping.
      </p>
      <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
        <a href="/shop" class="btn btn--primary" style="background:#FFE28A; color:#3B183E; font-weight:700; padding:12px 28px;">Explore All Collections</a>
        <a href="https://wa.me/919844758450?text=Hello%20Kannika%20Bangles,%20I%20want%20to%20order%20Muhurtham%20jewellery" target="_blank" class="btn btn--outline" style="border-color:#fff; color:#fff; padding:12px 28px; font-weight:600;">
          <i data-lucide="message-circle" style="width:18px;height:18px;margin-right:6px;display:inline-block;vertical-align:middle;"></i> Chat on WhatsApp
        </a>
      </div>
    </section>

  </main>

${getFooterHtml()}
</body>
</html>`;

// ══════════════════════════════════════════════════════════════
// 2. Reception and Sangeet Jewellery Bangalore
// ══════════════════════════════════════════════════════════════
const receptionHtml = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reception &amp; Sangeet Jewellery Bangalore | Kundan &amp; AD Sets | Sri Kannika</title>
  <meta name="description" content="Explore luxury reception &amp; Sangeet jewellery in Bangalore. Handcrafted Kundan choker suites, sparkling AD diamond sets, cocktail kadas &amp; jhumkas. Visit Malleshwaram showroom.">
  <meta name="keywords" content="reception jewellery bangalore, sangeet jewellery bangalore, kundan choker sangeet, cz diamond bridal sets bangalore, cocktail jewellery bangalore, wedding reception jewellery for bride">
  <meta name="author" content="Sri Kannika Bangles">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#8B6914">
  <link rel="canonical" href="https://kannikabangles.com/reception-and-sangeet-jewellery-bangalore">
  <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png">
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180.png">

  <!-- Open Graph -->
  <meta property="og:title" content="Reception &amp; Sangeet Jewellery Bangalore | Kundan &amp; AD Sets | Sri Kannika">
  <meta property="og:description" content="Explore luxury reception &amp; Sangeet jewellery in Bangalore. Handcrafted Kundan choker suites, sparkling AD diamond sets, cocktail kadas &amp; jhumkas.">
  <meta property="og:image" content="https://kannikabangles.com/images/hero-banner.png">
  <meta property="og:url" content="https://kannikabangles.com/reception-and-sangeet-jewellery-bangalore">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Kannika Bangles">
  <meta property="og:locale" content="en_IN">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Reception &amp; Sangeet Jewellery Bangalore | Sri Kannika">
  <meta name="twitter:description" content="Kundan choker sets, sparkling AD diamond suites, and cocktail kadas for modern bridal receptions and sangeet nights.">
  <meta name="twitter:image" content="https://kannikabangles.com/images/hero-banner.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/styles.css?v=20260821_103">
  <link rel="stylesheet" href="/css/pages.css?v=20260821_103">
  <link rel="stylesheet" href="/css/mobile.css?v=20260821_103">

  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" defer></script>

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JewelryStore",
        "@id": "https://kannikabangles.com/#organization",
        "name": "Sri Kannika Bangles",
        "url": "https://kannikabangles.com/",
        "logo": "https://kannikabangles.com/images/kannika_logo.jpeg",
        "image": "https://kannikabangles.com/images/hero-banner.png",
        "telephone": "+919844758450",
        "email": "Srikannikabangles@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "No. 157/108, 9th Cross, East Park Road, Malleshwaram",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "postalCode": "560003",
          "addressCountry": "IN"
        },
        "priceRange": "₹₹"
      },
      {
        "@type": "WebPage",
        "@id": "https://kannikabangles.com/reception-and-sangeet-jewellery-bangalore#webpage",
        "url": "https://kannikabangles.com/reception-and-sangeet-jewellery-bangalore",
        "name": "Reception & Sangeet Jewellery Bangalore | Kundan & AD Sets | Sri Kannika",
        "description": "Exclusive reception & Sangeet jewellery in Bangalore: uncut Polki Kundan chokers, sparkling AD diamond suites, pastel bead strings, and cocktail designer kadas.",
        "isPartOf": {"@id": "https://kannikabangles.com/#website"},
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kannikabangles.com/"},
            {"@type": "ListItem", "position": 2, "name": "Bangalore Bridal", "item": "https://kannikabangles.com/bridal-jewellery-bangalore"},
            {"@type": "ListItem", "position": 3, "name": "Reception & Sangeet", "item": "https://kannikabangles.com/reception-and-sangeet-jewellery-bangalore"}
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What jewellery is best for a wedding reception in Bangalore?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For evening receptions, brides usually pair lehengas or contemporary gowns with royal Kundan-Polki chokers, American Diamond (CZ) necklace sets, or Russian emerald accent strings paired with sleek designer kadas and chandelier earrings."
            }
          },
          {
            "@type": "Question",
            "name": "How is Sangeet jewellery different from Muhurtham jewellery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While Muhurtham demands heavy traditional antique temple gold and kemp stones, Sangeet jewellery is dynamic, lightweight, and sparkling—featuring mirror-finish Kundan, pastel enamels, and lightweight dance-friendly earrings that catch evening party lights."
            }
          },
          {
            "@type": "Question",
            "name": "Do your Kundan sets have meenakari back-work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! All our premium Kundan and Jadau pieces feature exquisite hand-painted Meenakari enamel on the reverse side, ensuring skin comfort and authentic artisan heritage."
            }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body class="page-bridal-jewellery">
${getNavbarHtml('bridal')}

  <!-- Hero Header -->
  <header class="page-hero" style="background: linear-gradient(135deg, rgba(32,178,170,0.9), rgba(59,24,62,0.96)), url('/images/hero-banner.png') center/cover no-repeat; padding: 100px 20px 70px; text-align: center; color: white;">
    <div class="container" style="max-width: 900px;">
      <div class="breadcrumb" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #FFE28A; margin-bottom: 16px;">
        <a href="/" style="color: inherit; text-decoration: none;">Home</a>
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        <a href="/bridal-jewellery-bangalore" style="color: inherit; text-decoration: none;">Bangalore Bridal</a>
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        <span>Reception &amp; Sangeet</span>
      </div>
      <h1 style="font-family: 'Cinzel', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: #FDF9F9; line-height: 1.2; margin-bottom: 16px;">
        Reception &amp; Sangeet Jewellery in Bangalore
      </h1>
      <p style="font-size: 1.1rem; line-height: 1.7; color: rgba(255,255,255,0.88); max-width: 760px; margin: 0 auto 28px;">
        Dazzle under the evening spotlight. Uncut Polki Kundan chokers, sparkling AD diamond suites, cocktail kadas, and statement earrings crafted for glamorous Lehengas and Reception gowns.
      </p>
      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <a href="/necklaces" class="btn btn--primary btn--lg" style="padding: 14px 28px; font-weight: 700;">Shop Kundan Necklaces</a>
        <a href="/earrings" class="btn btn--outline btn--lg" style="border-color: #D4AF37; color: #FFE28A; padding: 14px 28px; font-weight: 600;">Browse Chandelier Earrings</a>
        <a href="https://wa.me/919844758450?text=Hi!%20I'm%20looking%20for%20Reception%20and%20Sangeet%20jewellery%20sets." target="_blank" class="btn btn--outline btn--lg" style="border-color: #25D366; color: #25D366; background: rgba(37,211,102,0.1); padding: 14px 28px; font-weight: 600;">
          <i data-lucide="message-circle" style="width:18px;height:18px;margin-right:6px;display:inline-block;vertical-align:middle;"></i> WhatsApp Styling Advice
        </a>
      </div>
    </div>
  </header>

  <!-- Main Content Container -->
  <main class="container" style="padding: 60px 20px;">

    <!-- Section 1: Evening Bridal Glamour -->
    <section style="margin-bottom: 70px;">
      <div class="text-center" style="margin-bottom: 40px;">
        <p class="section-subtitle" style="font-family:'Cinzel',serif;color:var(--pink-primary);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;font-size:0.85rem;margin-bottom:6px;">Glamour &amp; Radiance</p>
        <h2 class="section-title" style="font-family:'Cinzel',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:var(--text-primary);margin-bottom:12px;">Top Styles for <span class="text-gold" style="color:#B38F24;">Sangeet &amp; Reception</span></h2>
        <div class="divider" style="width:60px;height:3px;background:var(--pink-primary);margin:0 auto 16px;"></div>
        <p style="max-width:700px;margin:0 auto;color:var(--text-muted);font-size:1rem;line-height:1.6;">Move effortlessly on the dance floor and illuminate the reception stage with modern, sparkling silhouettes.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="sparkles" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">1. Polki &amp; Kundan Chokers</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">Uncut glass polki stones with pastel mint, blush pink, and emerald bead drops that pair seamlessly with designer lehengas.</p>
          <a href="/necklaces" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">View Kundan Chokers &rarr;</a>
        </div>

        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="gem" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">2. CZ &amp; AD Diamond Suites</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">High-grade American Diamond collar necklaces that deliver real diamond brilliance under reception chandeliers.</p>
          <a href="/necklaces" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Browse AD Diamond Sets &rarr;</a>
        </div>

        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="circle" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">3. Cocktail &amp; Openable Kadas</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">Single statement cuffs and two-piece Kundan openable kadas for a chic, minimal yet royal wrist look.</p>
          <a href="/bangles" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Explore Cocktail Kadas &rarr;</a>
        </div>

        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="sparkles" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">4. Chandelier &amp; Passa Earrings</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">Lightweight chandbalis and multi-tier danglers crafted to stay secure and comfortable during energetic dance sequences.</p>
          <a href="/earrings" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">View Party Earrings &rarr;</a>
        </div>
      </div>
    </section>

    <!-- Section 2: Outfit Pairing Guide -->
    <section style="margin-bottom: 70px; background: #F8F5FF; border: 1px solid rgba(139,105,20,0.2); border-radius: 16px; padding: 40px 30px;">
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-family:'Cinzel',serif; font-size: 1.8rem; color: #3B183E; text-align: center; margin-bottom: 20px;">
          Outfit Coordination for <span style="color:#B38F24;">Bangalore Receptions</span>
        </h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px;">
          <div style="background: white; padding: 20px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06);">
            <strong style="color: #3B183E; font-size: 1.05rem; display: block; margin-bottom: 6px;">Pastel Lehengas (Pink / Mint / Lavender)</strong>
            <p style="color: #555; font-size: 0.9rem; line-height: 1.6;">Pair with uncut Polki chokers featuring matching pastel hydro-beads and single pair of statement chandelier earrings.</p>
          </div>
          <div style="background: white; padding: 20px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06);">
            <strong style="color: #3B183E; font-size: 1.05rem; display: block; margin-bottom: 6px;">Western / Fusion Cocktail Gowns</strong>
            <p style="color: #555; font-size: 0.9rem; line-height: 1.6;">Opt for high-sparkle rhodium or rose-gold AD diamond collar necklaces paired with sleek single tennis bracelets.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: FAQ Section -->
    <section style="margin-bottom: 60px; max-width: 800px; margin-left: auto; margin-right: auto;">
      <h2 style="font-family:'Cinzel',serif; font-size: 1.8rem; color: #3B183E; text-align: center; margin-bottom: 28px;">
        Reception Jewellery FAQs
      </h2>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 20px;">
          <h3 style="font-family:'Cinzel',serif; font-size: 1.05rem; color: #3B183E; margin-bottom: 8px;">Q. Are the earrings heavy for dancing during Sangeet?</h3>
          <p style="color: #555; font-size: 0.92rem; line-height: 1.6;">No. We use lightweight brass alloys and hollow backings with secure silicone push-plugs, allowing you to dance comfortably for hours.</p>
        </div>
        <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 20px;">
          <h3 style="font-family:'Cinzel',serif; font-size: 1.05rem; color: #3B183E; margin-bottom: 8px;">Q. Can I mix Kundan necklaces with diamond bangles?</h3>
          <p style="color: #555; font-size: 0.92rem; line-height: 1.6;">Yes! Fusion styling is extremely popular for receptions. A polki necklace paired with AD spacer bangles creates an opulent, balanced sparkle.</p>
        </div>
      </div>
    </section>

    <!-- Section 4: Bottom CTA Banner -->
    <section style="background: linear-gradient(135deg, #3B183E, #20B2AA); border-radius: 16px; padding: 48px 30px; text-align: center; color: white;">
      <h2 style="font-family:'Cinzel',serif; font-size: 2rem; color: #FFE28A; margin-bottom: 12px;">Get Your Custom Sangeet Ensemble</h2>
      <p style="max-width: 600px; margin: 0 auto 24px; font-size: 1rem; line-height: 1.6; color: rgba(255,255,255,0.9);">
        Send us your outfit photo on WhatsApp for instant jewellery recommendations from our Bangalore stylists.
      </p>
      <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
        <a href="/shop" class="btn btn--primary" style="background:#FFE28A; color:#3B183E; font-weight:700; padding:12px 28px;">Shop All Jewellery</a>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20looking%20for%20Sangeet/Reception%20jewellery" target="_blank" class="btn btn--outline" style="border-color:#fff; color:#fff; padding:12px 28px; font-weight:600;">
          <i data-lucide="message-circle" style="width:18px;height:18px;margin-right:6px;display:inline-block;vertical-align:middle;"></i> WhatsApp Us Now
        </a>
      </div>
    </section>

  </main>

${getFooterHtml()}
</body>
</html>`;

// ══════════════════════════════════════════════════════════════
// 3. Haldi and Mehendi Jewellery Bangalore
// ══════════════════════════════════════════════════════════════
const haldiHtml = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Haldi &amp; Mehendi Jewellery Bangalore | Floral &amp; Antique Bangles | Sri Kannika</title>
  <meta name="description" content="Discover vibrant Haldi &amp; Mehendi jewellery in Bangalore. Lightweight antique floral chokers, colourful silk thread &amp; gold bangle combos. Visit Malleshwaram showroom.">
  <meta name="keywords" content="haldi jewellery sets bangalore, mehendi bangles combo, floral antique jewellery bangalore, yellow theme bridal accessories, haldi floral jewellery bangalore">
  <meta name="author" content="Sri Kannika Bangles">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#8B6914">
  <link rel="canonical" href="https://kannikabangles.com/haldi-and-mehendi-jewellery-bangalore">
  <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png">
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180.png">

  <!-- Open Graph -->
  <meta property="og:title" content="Haldi &amp; Mehendi Jewellery Bangalore | Floral &amp; Antique Bangles | Sri Kannika">
  <meta property="og:description" content="Discover vibrant Haldi &amp; Mehendi jewellery in Bangalore. Lightweight antique floral chokers, colourful silk thread &amp; gold bangle combos.">
  <meta property="og:image" content="https://kannikabangles.com/images/hero-banner.png">
  <meta property="og:url" content="https://kannikabangles.com/haldi-and-mehendi-jewellery-bangalore">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Kannika Bangles">
  <meta property="og:locale" content="en_IN">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Haldi &amp; Mehendi Jewellery Bangalore | Sri Kannika">
  <meta name="twitter:description" content="Lightweight floral antique sets, colourful bangle combos &amp; maang tikkas for Haldi &amp; Mehendi celebrations.">
  <meta name="twitter:image" content="https://kannikabangles.com/images/hero-banner.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/styles.css?v=20260821_103">
  <link rel="stylesheet" href="/css/pages.css?v=20260821_103">
  <link rel="stylesheet" href="/css/mobile.css?v=20260821_103">

  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" defer></script>

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JewelryStore",
        "@id": "https://kannikabangles.com/#organization",
        "name": "Sri Kannika Bangles",
        "url": "https://kannikabangles.com/",
        "logo": "https://kannikabangles.com/images/kannika_logo.jpeg",
        "image": "https://kannikabangles.com/images/hero-banner.png",
        "telephone": "+919844758450",
        "email": "Srikannikabangles@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "No. 157/108, 9th Cross, East Park Road, Malleshwaram",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "postalCode": "560003",
          "addressCountry": "IN"
        },
        "priceRange": "₹₹"
      },
      {
        "@type": "WebPage",
        "@id": "https://kannikabangles.com/haldi-and-mehendi-jewellery-bangalore#webpage",
        "url": "https://kannikabangles.com/haldi-and-mehendi-jewellery-bangalore",
        "name": "Haldi & Mehendi Jewellery Bangalore | Floral & Antique Bangles | Sri Kannika",
        "description": "Vibrant and lightweight Haldi and Mehendi jewellery sets in Bangalore featuring floral antique chokers, colourful yellow & green bangle stacks, mathapattis, and haathphools.",
        "isPartOf": {"@id": "https://kannikabangles.com/#website"},
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://kannikabangles.com/"},
            {"@type": "ListItem", "position": 2, "name": "Bangalore Bridal", "item": "https://kannikabangles.com/bridal-jewellery-bangalore"},
            {"@type": "ListItem", "position": 3, "name": "Haldi & Mehendi", "item": "https://kannikabangles.com/haldi-and-mehendi-jewellery-bangalore"}
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What jewellery is best for Haldi and Mehendi functions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For Haldi, brides prefer yellow & gold lightweight floral antique chokers, pearl drop maang tikkas, and bright yellow/marigold bangle combos. For Mehendi, openable floral cuffs, haathphools, and green glass bangles with kundan spacers are most popular."
            }
          },
          {
            "@type": "Question",
            "name": "Is your Haldi jewellery safe from water and turmeric stains?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our high-grade micro gold plating and anti-tarnish protective coatings are designed to resist water splashes and turmeric paste without discoloring or reacting with sensitive skin."
            }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body class="page-bridal-jewellery">
${getNavbarHtml('bridal')}

  <!-- Hero Header -->
  <header class="page-hero" style="background: linear-gradient(135deg, rgba(212,175,55,0.92), rgba(59,24,62,0.95)), url('/images/hero-banner.png') center/cover no-repeat; padding: 100px 20px 70px; text-align: center; color: white;">
    <div class="container" style="max-width: 900px;">
      <div class="breadcrumb" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #FFE28A; margin-bottom: 16px;">
        <a href="/" style="color: inherit; text-decoration: none;">Home</a>
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        <a href="/bridal-jewellery-bangalore" style="color: inherit; text-decoration: none;">Bangalore Bridal</a>
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        <span>Haldi &amp; Mehendi</span>
      </div>
      <h1 style="font-family: 'Cinzel', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: #FDF9F9; line-height: 1.2; margin-bottom: 16px;">
        Haldi &amp; Mehendi Jewellery in Bangalore
      </h1>
      <p style="font-size: 1.1rem; line-height: 1.7; color: rgba(255,255,255,0.88); max-width: 760px; margin: 0 auto 28px;">
        Celebrate colourful pre-wedding rituals with lightweight joy. Handcrafted yellow &amp; green bridal bangle sets, floral antique chokers, pearl drop maang tikkas, and haathphools.
      </p>
      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <a href="/bangles" class="btn btn--primary btn--lg" style="padding: 14px 28px; font-weight: 700;">Explore Haldi Bangles</a>
        <a href="/pendant-sets" class="btn btn--outline btn--lg" style="border-color: #D4AF37; color: #FFE28A; padding: 14px 28px; font-weight: 600;">Browse Lightweight Sets</a>
        <a href="https://wa.me/919844758450?text=Hi!%20I'm%20looking%20for%20Haldi%20and%20Mehendi%20jewellery%20combos." target="_blank" class="btn btn--outline btn--lg" style="border-color: #25D366; color: #25D366; background: rgba(37,211,102,0.1); padding: 14px 28px; font-weight: 600;">
          <i data-lucide="message-circle" style="width:18px;height:18px;margin-right:6px;display:inline-block;vertical-align:middle;"></i> WhatsApp Bridal Desk
        </a>
      </div>
    </div>
  </header>

  <!-- Main Content Container -->
  <main class="container" style="padding: 60px 20px;">

    <!-- Section 1: Pre-Wedding Ceremony Curation -->
    <section style="margin-bottom: 70px;">
      <div class="text-center" style="margin-bottom: 40px;">
        <p class="section-subtitle" style="font-family:'Cinzel',serif;color:var(--pink-primary);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;font-size:0.85rem;margin-bottom:6px;">Joyful Celebrations</p>
        <h2 class="section-title" style="font-family:'Cinzel',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:var(--text-primary);margin-bottom:12px;">Vibrant Pre-Wedding <span class="text-gold" style="color:#B38F24;">Jewellery Sets</span></h2>
        <div class="divider" style="width:60px;height:3px;background:var(--pink-primary);margin:0 auto 16px;"></div>
        <p style="max-width:700px;margin:0 auto;color:var(--text-muted);font-size:1rem;line-height:1.6;">Designed to be lightweight, photogenic, and skin-friendly during turmeric ceremonies and mehendi application.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="circle" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">1. Yellow &amp; Green Bangle Sets</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">Vibrant yellow silk and glass bangles paired with gold filigree spacers and openable floral end-kadas.</p>
          <a href="/bangles" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Shop Bangle Combos &rarr;</a>
        </div>

        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="sun" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">2. Floral Antique Chokers</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">Lightweight floral motif neckpieces that complement yellow organza sarees, shararas, and crop-top skirts.</p>
          <a href="/pendant-sets" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Browse Pendant Sets &rarr;</a>
        </div>

        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="sparkles" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">3. Pearl Maang Tikkas</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">Delicate single-strand pearl and gold forehead ornaments that add royal charm without disturbing haldi smearing.</p>
          <a href="/earrings" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Explore Accessories &rarr;</a>
        </div>

        <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid var(--border-subtle); background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(212,175,55,0.12); display: flex; align-items: center; justify-content: center; color: #B38F24; margin-bottom: 16px;">
            <i data-lucide="heart" style="width:24px;height:24px;"></i>
          </div>
          <h3 style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:8px;">4. Bridesmaids Bangle Favors</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:12px;">Bulk curated return gift bangle stacks for sisters, cousins, and guests attending your Bangalore wedding.</p>
          <a href="/bangles" style="color:var(--pink-primary);font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">Bulk Enquiries &rarr;</a>
        </div>
      </div>
    </section>

    <!-- Section 2: Bottom CTA Banner -->
    <section style="background: linear-gradient(135deg, #3B183E, #20B2AA); border-radius: 16px; padding: 48px 30px; text-align: center; color: white;">
      <h2 style="font-family:'Cinzel',serif; font-size: 2rem; color: #FFE28A; margin-bottom: 12px;">Curate Your Haldi &amp; Mehendi Sets</h2>
      <p style="max-width: 600px; margin: 0 auto 24px; font-size: 1rem; line-height: 1.6; color: rgba(255,255,255,0.9);">
        Express doorstep delivery across Bangalore &amp; bulk wedding favor discounts available.
      </p>
      <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
        <a href="/shop" class="btn btn--primary" style="background:#FFE28A; color:#3B183E; font-weight:700; padding:12px 28px;">Browse All Jewellery</a>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I%20need%20Haldi/Mehendi%20jewellery" target="_blank" class="btn btn--outline" style="border-color:#fff; color:#fff; padding:12px 28px; font-weight:600;">
          <i data-lucide="message-circle" style="width:18px;height:18px;margin-right:6px;display:inline-block;vertical-align:middle;"></i> Order via WhatsApp
        </a>
      </div>
    </section>

  </main>

${getFooterHtml()}
</body>
</html>`;

// ══════════════════════════════════════════════════════════════
// 4. Utility Blog 1: Wedding Jewellery Rental vs Buying Bangalore
// ══════════════════════════════════════════════════════════════
const rentalVsBuyHtml = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridal Jewellery Rental vs Buying in Bangalore: Cost &amp; Hygiene Comparison | Kannika</title>
  <meta name="description" content="Comparing bridal jewellery rental vs buying in Bangalore. Discover cost breakdown, hygiene factors, deposit risks, and why 1-gram gold sets offer better value.">
  <meta name="keywords" content="bridal jewellery for rent bangalore, rent vs buy bridal jewellery bangalore, imitation jewellery rent bangalore, wedding jewellery rental costs bangalore">
  <meta name="author" content="Sri Kannika Bangles">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#8B6914">
  <link rel="canonical" href="https://kannikabangles.com/blog/wedding-jewellery-rental-vs-buying-bangalore">
  <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png">
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180.png">

  <!-- Open Graph -->
  <meta property="og:title" content="Bridal Jewellery Rental vs Buying in Bangalore: Cost &amp; Hygiene Comparison">
  <meta property="og:description" content="Comparing bridal jewellery rental vs buying in Bangalore. Discover cost breakdown, hygiene factors, deposit risks, and why 1-gram gold sets offer better value.">
  <meta property="og:image" content="https://kannikabangles.com/images/hero-banner.png">
  <meta property="og:url" content="https://kannikabangles.com/blog/wedding-jewellery-rental-vs-buying-bangalore">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Kannika Bangles">
  <meta property="og:locale" content="en_IN">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/css/styles.css?v=20260821_103">
  <link rel="stylesheet" href="/css/home.css?v=20260821_103">
  <link rel="stylesheet" href="/css/mobile.css?v=20260821_103">
  <link rel="stylesheet" href="/css/pages.css?v=20260821_103">
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" defer></script>

  <style>
    .blog-article { max-width: 840px; margin: 0 auto; color: #2C1820; line-height: 1.85; font-size: 1.05rem; }
    .blog-article h2 { font-family: 'Cinzel', serif; color: #3B183E; margin-top: 40px; margin-bottom: 16px; font-size: 1.5rem; position: relative; padding-bottom: 12px; font-weight: 700; }
    .blog-article h2::after { content: ''; position: absolute; left: 0; bottom: 0; width: 50px; height: 3px; background: #20B2AA; border-radius: 2px; }
    .blog-article h3 { font-family: 'Cinzel', serif; color: #B38F24; margin-top: 28px; margin-bottom: 10px; font-size: 1.2rem; font-weight: 700; }
    .comparison-table { width: 100%; border-collapse: collapse; margin: 28px 0; font-size: 0.95rem; background: #fff; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border-radius: 8px; overflow: hidden; }
    .comparison-table th, .comparison-table td { padding: 14px 18px; border: 1px solid #EAEAEA; text-align: left; }
    .comparison-table th { background: #3B183E; color: #FFE28A; font-family: 'Cinzel', serif; }
    .comparison-table tr:nth-child(even) { background: #FAF9F6; }
    .highlight-buy { background: rgba(32,178,170,0.1); font-weight: 600; color: #007A78; }
  </style>

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Bridal Jewellery Rental vs Buying in Bangalore: Cost & Hygiene Comparison",
    "description": "A comprehensive comparison of renting bridal jewellery vs purchasing premium 1-gram gold imitation jewellery sets for Bangalore brides.",
    "image": "https://kannikabangles.com/images/hero-banner.png",
    "author": {
      "@type": "Organization",
      "name": "Sri Kannika Bangles",
      "url": "https://kannikabangles.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sri Kannika Bangles",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kannikabangles.com/images/kannika_logo.jpeg"
      }
    },
    "datePublished": "2026-09-01",
    "dateModified": "2026-09-01",
    "mainEntityOfPage": "https://kannikabangles.com/blog/wedding-jewellery-rental-vs-buying-bangalore"
  }
  </script>
</head>
<body>
${getNavbarHtml('blog')}

  <header class="page-hero" style="background: linear-gradient(135deg, rgba(59,24,62,0.92), rgba(24,19,22,0.96)), url('/images/hero-banner.png') center/cover no-repeat; padding: 100px 20px 60px; text-align: center; color: white;">
    <div class="container" style="max-width: 840px;">
      <div class="breadcrumb" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #FFE28A; margin-bottom: 16px;">
        <a href="/" style="color: inherit; text-decoration: none;">Home</a>
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        <a href="/blog" style="color: inherit; text-decoration: none;">Blog</a>
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        <span>Rental vs Buying Guide</span>
      </div>
      <h1 style="font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 700; color: #FDF9F9; line-height: 1.25; margin-bottom: 16px;">
        Bridal Jewellery: Rental vs Buying in Bangalore
      </h1>
      <p style="font-size: 1rem; color: rgba(255,255,255,0.85);">Updated for 2026 Bangalore Wedding Season • By Sri Kannika Bridal Stylists</p>
    </div>
  </header>

  <main class="container" style="padding: 50px 20px;">
    <article class="blog-article">
      <p style="font-size: 1.15rem; font-style: italic; color: #4A1E4D; margin-bottom: 28px; border-left: 4px solid #20B2AA; padding: 16px 20px; background: rgba(230,230,250,0.4); border-radius: 0 8px 8px 0;">
        Planning a wedding in Bangalore? Many brides debate between paying ₹5,000–₹12,000 for 24-hour jewellery rentals versus investing in brand-new 1-gram micro gold plated sets. Here is the realistic cost, hygiene, and convenience breakdown.
      </p>

      <h2>1. The Real Cost Comparison: Rental vs Buying</h2>
      <p>
        At first glance, renting bridal jewellery seems budget-friendly. However, when you factor in 3-day wedding festivities (Haldi, Sangeet, Muhurtham, Reception), rental costs quickly add up with heavy security deposits.
      </p>

      <div style="overflow-x: auto;">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Renting Bridal Sets</th>
              <th>Buying 1-Gram Gold Sets (Kannika)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Daily Cost</strong></td>
              <td>₹3,000 – ₹8,000 / day</td>
              <td>₹1,499 – ₹6,500 (One-time purchase)</td>
            </tr>
            <tr>
              <td><strong>Security Deposit</strong></td>
              <td>₹15,000 – ₹30,000 blocked cash</td>
              <td><span class="highlight-buy">₹0 Deposit Needed</span></td>
            </tr>
            <tr>
              <td><strong>Hygiene &amp; Safety</strong></td>
              <td>Worn by 30+ previous brides</td>
              <td><span class="highlight-buy">100% Fresh, Pristine &amp; Skin-Safe</span></td>
            </tr>
            <tr>
              <td><strong>Stress of Damage / Loss</strong></td>
              <td>High penalty deductions for loose stones</td>
              <td><span class="highlight-buy">Zero Anxiety — It's completely yours</span></td>
            </tr>
            <tr>
              <td><strong>Reusability</strong></td>
              <td>Must return within 24 hours</td>
              <td><span class="highlight-buy">Reusable for 5+ years for festivals &amp; functions</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>2. Why Buying 1-Gram Gold Jewellery is the Smarter Choice</h2>
      <p>
        When you purchase premium handcrafted 1-gram gold jewellery from Sri Kannika Bangles, you receive jewellery finished in <strong>24K micro gold plating</strong> with anti-tarnish micro coating. It looks and photographs exactly like solid gold hallmarked jewellery, without the fear of theft or deposit forfeiture.
      </p>

      <div style="background: #FFFBF2; border: 1.5px solid rgba(212,175,55,0.4); border-radius: 12px; padding: 24px; margin: 30px 0;">
        <h3 style="margin-top:0; color:#B38F24;">Key Benefits for Bangalore Brides:</h3>
        <ul style="line-height: 1.8; margin-left: 20px; color: #333;">
          <li><strong>Perfect Size Match:</strong> Custom-sized bangles tailored to your exact wrist (2.2 to 2.10) rather than standard loose rental fittings.</li>
          <li><strong>Heirloom Gifting:</strong> Keep your wedding bangles and necklace sets as cherished souvenirs for future family functions.</li>
          <li><strong>Zero Stress Deadlines:</strong> No need to rush family members to return boxes the morning after your wedding reception.</li>
        </ul>
      </div>

      <h2>3. Ready to Build Your Wedding Collection?</h2>
      <p>
        Explore over 500+ handcrafted bridal bangles, temple sets, and Kundan chokers at honest showroom prices with free Bangalore consultations.
      </p>

      <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; justify-content: center;">
        <a href="/bridal-jewellery-bangalore" class="btn btn--primary" style="padding: 12px 28px; font-weight:700;">Explore Bridal Sets</a>
        <a href="/bangles" class="btn btn--outline" style="border-color: #D4AF37; color: #B38F24; padding: 12px 28px; font-weight:600;">Shop Bridal Bangles</a>
        <a href="https://wa.me/919844758450?text=Hi!%20I'm%20comparing%20rental%20vs%20buying%20bridal%20jewellery." target="_blank" class="btn btn--outline" style="border-color:#25D366; color:#25D366; padding: 12px 28px; font-weight:600;">
          <i data-lucide="message-circle" style="width:16px;height:16px;margin-right:6px;display:inline-block;vertical-align:middle;"></i> Chat with Stylist
        </a>
      </div>
    </article>
  </main>

${getFooterHtml()}
</body>
</html>`;

// ══════════════════════════════════════════════════════════════
// 5. Utility Blog 2: Bangle Size Guide & Wrist Measurement
// ══════════════════════════════════════════════════════════════
const bangleSizeGuideHtml = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Indian Bangle Size Guide &amp; Wrist Measurement Chart | Kannika Bangles</title>
  <meta name="description" content="Find your perfect Indian bangle size (2.2 to 2.10). Detailed size conversion table in cm, mm, and inches with step-by-step wrist measurement instructions.">
  <meta name="keywords" content="bangle size finder, how to know bangle size, 2.4 2.6 2.8 bangle size converter, bangles size chart india, indian wrist size measurement">
  <meta name="author" content="Sri Kannika Bangles">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#8B6914">
  <link rel="canonical" href="https://kannikabangles.com/blog/bangle-size-guide-and-wrist-measurement">
  <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png">
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180.png">

  <!-- Open Graph -->
  <meta property="og:title" content="Indian Bangle Size Guide &amp; Wrist Measurement Chart | Kannika Bangles">
  <meta property="og:description" content="Find your perfect Indian bangle size (2.2 to 2.10). Detailed size conversion table in cm, mm, and inches with step-by-step wrist measurement instructions.">
  <meta property="og:image" content="https://kannikabangles.com/images/hero-banner.png">
  <meta property="og:url" content="https://kannikabangles.com/blog/bangle-size-guide-and-wrist-measurement">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Kannika Bangles">
  <meta property="og:locale" content="en_IN">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/css/styles.css?v=20260821_103">
  <link rel="stylesheet" href="/css/home.css?v=20260821_103">
  <link rel="stylesheet" href="/css/mobile.css?v=20260821_103">
  <link rel="stylesheet" href="/css/pages.css?v=20260821_103">
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" defer></script>

  <style>
    .blog-article { max-width: 840px; margin: 0 auto; color: #2C1820; line-height: 1.85; font-size: 1.05rem; }
    .blog-article h2 { font-family: 'Cinzel', serif; color: #3B183E; margin-top: 40px; margin-bottom: 16px; font-size: 1.5rem; position: relative; padding-bottom: 12px; font-weight: 700; }
    .blog-article h2::after { content: ''; position: absolute; left: 0; bottom: 0; width: 50px; height: 3px; background: #20B2AA; border-radius: 2px; }
    .blog-article h3 { font-family: 'Cinzel', serif; color: #B38F24; margin-top: 28px; margin-bottom: 10px; font-size: 1.2rem; font-weight: 700; }
    .size-table { width: 100%; border-collapse: collapse; margin: 28px 0; font-size: 0.95rem; background: #fff; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border-radius: 8px; overflow: hidden; }
    .size-table th, .size-table td { padding: 14px 16px; border: 1px solid #EAEAEA; text-align: center; }
    .size-table th { background: #3B183E; color: #FFE28A; font-family: 'Cinzel', serif; }
    .size-table tr:nth-child(even) { background: #FAF9F6; }
    .size-btn { display: inline-block; padding: 6px 14px; background: #20B2AA; color: white; border-radius: 4px; text-decoration: none; font-size: 0.82rem; font-weight: 600; }
    .size-btn:hover { background: #178D87; }
  </style>

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Indian Bangle Size Guide & Wrist Measurement Chart",
    "description": "Accurate Indian bangle size conversion chart in cm, mm, and inches. Master the ruler and knuckle measurement methods.",
    "image": "https://kannikabangles.com/images/hero-banner.png",
    "author": {
      "@type": "Organization",
      "name": "Sri Kannika Bangles",
      "url": "https://kannikabangles.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sri Kannika Bangles",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kannikabangles.com/images/kannika_logo.jpeg"
      }
    },
    "datePublished": "2026-09-01",
    "dateModified": "2026-09-01",
    "mainEntityOfPage": "https://kannikabangles.com/blog/bangle-size-guide-and-wrist-measurement"
  }
  </script>
</head>
<body>
${getNavbarHtml('blog')}

  <header class="page-hero" style="background: linear-gradient(135deg, rgba(59,24,62,0.92), rgba(24,19,22,0.96)), url('/images/hero-banner.png') center/cover no-repeat; padding: 100px 20px 60px; text-align: center; color: white;">
    <div class="container" style="max-width: 840px;">
      <div class="breadcrumb" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #FFE28A; margin-bottom: 16px;">
        <a href="/" style="color: inherit; text-decoration: none;">Home</a>
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        <a href="/blog" style="color: inherit; text-decoration: none;">Blog</a>
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        <span>Bangle Size Guide</span>
      </div>
      <h1 style="font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 700; color: #FDF9F9; line-height: 1.25; margin-bottom: 16px;">
        Indian Bangle Size Guide &amp; Conversion Chart
      </h1>
      <p style="font-size: 1rem; color: rgba(255,255,255,0.85);">Accurate Measurements in Centimeters, Millimeters &amp; Inches</p>
    </div>
  </header>

  <main class="container" style="padding: 50px 20px;">
    <article class="blog-article">
      <p style="font-size: 1.15rem; font-style: italic; color: #4A1E4D; margin-bottom: 28px; border-left: 4px solid #20B2AA; padding: 16px 20px; background: rgba(230,230,250,0.4); border-radius: 0 8px 8px 0;">
        Never order the wrong bangle size again! In India, bangle sizes are measured in inches and fractions of sixteenths (such as 2.4, 2.6, 2.8). Use our comprehensive chart below to find your exact fit.
      </p>

      <h2>1. Indian Bangle Size Chart (Conversion Matrix)</h2>
      <p>Measure the <strong>inner diameter</strong> of a bangle that currently fits you comfortably, then locate your size in the table below:</p>

      <div style="overflow-x: auto;">
        <table class="size-table">
          <thead>
            <tr>
              <th>Indian Size</th>
              <th>Inner Diameter (Inches)</th>
              <th>Inner Diameter (cm)</th>
              <th>Inner Diameter (mm)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>2.2</strong> (Extra Small)</td>
              <td>2 - 2/16" (2.125")</td>
              <td>5.40 cm</td>
              <td>54.0 mm</td>
              <td><a href="/bangles" class="size-btn">Shop Size 2.2</a></td>
            </tr>
            <tr>
              <td><strong>2.4</strong> (Small)</td>
              <td>2 - 4/16" (2.250")</td>
              <td>5.72 cm</td>
              <td>57.2 mm</td>
              <td><a href="/bangles" class="size-btn">Shop Size 2.4</a></td>
            </tr>
            <tr>
              <td><strong>2.6</strong> (Medium - Most Popular)</td>
              <td>2 - 6/16" (2.375")</td>
              <td>6.03 cm</td>
              <td>60.3 mm</td>
              <td><a href="/bangles" class="size-btn">Shop Size 2.6</a></td>
            </tr>
            <tr>
              <td><strong>2.8</strong> (Large)</td>
              <td>2 - 8/16" (2.500")</td>
              <td>6.35 cm</td>
              <td>63.5 mm</td>
              <td><a href="/bangles" class="size-btn">Shop Size 2.8</a></td>
            </tr>
            <tr>
              <td><strong>2.10</strong> (Extra Large)</td>
              <td>2 - 10/16" (2.625")</td>
              <td>6.67 cm</td>
              <td>66.7 mm</td>
              <td><a href="/bangles" class="size-btn">Shop Size 2.10</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>2. Two Quick Ways to Measure Your Bangle Size at Home</h2>
      
      <h3>Method A: Measuring an Existing Bangle (Easiest)</h3>
      <ol style="line-height: 1.8; margin-left: 20px; color: #333;">
        <li>Take a round bangle that fits your hand comfortably.</li>
        <li>Place it flat on a standard metric ruler.</li>
        <li>Measure the straight distance between the <strong>inside edges</strong> (do not measure the outer border).</li>
        <li>If the inner distance is 6.0 cm, your Indian bangle size is <strong>2.6</strong>!</li>
      </ol>

      <h3>Method B: Measuring Hand Knuckles (No Bangle Needed)</h3>
      <ol style="line-height: 1.8; margin-left: 20px; color: #333;">
        <li>Bring your thumb and little finger together, touching at the tips (as if slipping on a bangle).</li>
        <li>Wrap a thin strip of paper or measuring tape around the widest part of your knuckles.</li>
        <li>Mark the point where the tape overlaps and measure the length in centimeters.</li>
        <li>Compare circumference: 19 cm = Size 2.4 | 20 cm = Size 2.6 | 21 cm = Size 2.8.</li>
      </ol>

      <div style="background: #FFFBF2; border: 1.5px solid rgba(212,175,55,0.4); border-radius: 12px; padding: 24px; margin: 30px 0;">
        <h3 style="margin-top:0; color:#B38F24;">Still Unsure About Your Size?</h3>
        <p style="margin-bottom: 12px; color: #444;">Send a picture of your wrist next to a ruler to our bridal specialists on WhatsApp (+91 98447 58450) for immediate size confirmation!</p>
        <a href="https://wa.me/919844758450?text=Hi!%20Can%20you%20help%20me%20find%20my%20exact%20bangle%20size?" target="_blank" class="btn btn--primary" style="padding: 10px 22px; font-size: 0.9rem;">Ask Stylist on WhatsApp</a>
      </div>

      <div style="text-align: center; margin-top: 36px;">
        <a href="/bangles" class="btn btn--primary btn--lg" style="padding: 14px 32px; font-weight: 700;">Explore Handcrafted Bangle Collection</a>
      </div>
    </article>
  </main>

${getFooterHtml()}
</body>
</html>`;

// Write the 5 files
const rootDir = path.join(__dirname, '..');
fs.writeFileSync(path.join(rootDir, 'muhurtham-jewellery-bangalore.html'), muhurthamHtml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'reception-and-sangeet-jewellery-bangalore.html'), receptionHtml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'haldi-and-mehendi-jewellery-bangalore.html'), haldiHtml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'blog', 'wedding-jewellery-rental-vs-buying-bangalore.html'), rentalVsBuyHtml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'blog', 'bangle-size-guide-and-wrist-measurement.html'), bangleSizeGuideHtml, 'utf8');

console.log('✅ Successfully generated all 3 Group 1 pages and 2 Utility Blog pages!');
