const fs = require('fs');
const path = require('path');

const blog2Html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridal Jewellery for Every Wedding Function | Complete Guide</title>
  <meta name="description" content="Discover what jewellery to wear for Haldi, Mehendi, Sangeet, Muhurtham and Reception, with ideas for chokers, harams, bangles, jhumkas and more.">
  <meta name="author" content="Sri Kannika Bangles Bridal Styling Team">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#8B1E3F">
  <link rel="canonical" href="https://kannikabangles.com/blog/bridal-jewellery-for-wedding-functions">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="Bridal Jewellery for Every Wedding Function | Complete Guide">
  <meta property="og:description" content="Discover what jewellery to wear for Haldi, Mehendi, Sangeet, Muhurtham and Reception, with ideas for chokers, harams, bangles, jhumkas and more.">
  <meta property="og:image" content="https://kannikabangles.com/images/hero-banner.png">
  <meta property="og:url" content="https://kannikabangles.com/blog/bridal-jewellery-for-wedding-functions">
  <meta property="og:site_name" content="Sri Kannika Bangles">
  <meta property="og:locale" content="en_IN">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Bridal Jewellery for Every Wedding Function | Complete Guide">
  <meta name="twitter:description" content="Complete function-by-function bridal jewellery styling guide for Haldi, Mehendi, Sangeet, Muhurtham and Reception by Sri Kannika Bangles.">
  <meta name="twitter:image" content="https://kannikabangles.com/images/hero-banner.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">

  <!-- Site Stylesheets -->
  <link rel="stylesheet" href="/css/styles.css?v=20260916_202">
  <link rel="stylesheet" href="/css/home.css?v=20260916_202">
  <link rel="stylesheet" href="/css/mobile.css?v=20260916_202">
  <link rel="stylesheet" href="/css/pages.css?v=20260916_202">

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png">
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180.png">

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://kannikabangles.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://kannikabangles.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Bridal Jewellery for Every Wedding Function",
        "item": "https://kannikabangles.com/blog/bridal-jewellery-for-wedding-functions"
      }
    ]
  }
  </script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kannikabangles.com/blog/bridal-jewellery-for-wedding-functions"
    },
    "headline": "Bridal Jewellery for Every Wedding Function: Haldi to Reception",
    "description": "Discover what jewellery to wear for Haldi, Mehendi, Sangeet, Muhurtham and Reception, with ideas for chokers, harams, bangles, jhumkas and more.",
    "image": "https://kannikabangles.com/images/hero-banner.png",
    "author": {
      "@type": "Organization",
      "name": "Sri Kannika Bangles Bridal Styling Team",
      "url": "https://kannikabangles.com/about.html"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sri Kannika Bangles",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kannikabangles.com/images/kannika_logo.jpeg"
      }
    },
    "datePublished": "2026-09-30",
    "dateModified": "2026-09-30"
  }
  </script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What jewellery should a bride wear for Haldi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For the Haldi ceremony, choose lightweight, moisture-resistant jewellery such as delicate floral pendant sets, minimal micro-gold drops, and cheerful yellow or green glass bangles. Avoid heavy solid gold, dense stone settings, or fragile clasps that can trap turmeric paste or snag on wet clothes."
        }
      },
      {
        "@type": "Question",
        "name": "What jewellery is best for Mehendi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best jewellery for Mehendi embraces colorful, bohemian grace: pastel Kundan chokers, lightweight dangling chandbalis, and a statement maang tikka. Keep the forearms and wrists minimal or wear easily removable kadas so your hands remain free for intricate henna application."
        }
      },
      {
        "@type": "Question",
        "name": "What bridal jewellery should I wear for Sangeet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sangeet calls for sparkling statement pieces that catch stage spotlights while allowing effortless dancing: a dazzling American Diamond (AD) choker, lightweight chandelier earrings or chandbalis, and secure screw kadas instead of noisy, heavy bangle stacks."
        }
      },
      {
        "@type": "Question",
        "name": "What jewellery is traditionally worn for Muhurtham?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional South Indian Muhurtham jewellery is rooted in antique temple architecture: a high choker, an auspicious 28–32 inch Goddess Lakshmi or Kasu haram, grand Kemp jhumkas with matilu hair chains, a nethi chutti, antique vanki for upper arms, an intricate bridal bangle stack, and a sculpted temple vaddanam waist belt."
        }
      },
      {
        "@type": "Question",
        "name": "Should I wear a choker and long Haram together?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, wearing a snug collar choker paired with a 28–32 inch long haram is the classic South Indian bridal standard. It frames your neckline while creating a regal vertical line down the torso that highlights the central sacred medallion above the vaddanam."
        }
      },
      {
        "@type": "Question",
        "name": "What jewellery should I wear for a wedding reception?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For the reception, transition into contemporary luxury with an American Diamond (AD) collar choker, royal Kundan polki set, or oversized statement earrings paired with sleek diamond bracelets or dual statement kadas that complement designer lehengas or evening gowns."
        }
      },
      {
        "@type": "Question",
        "name": "Can I reuse bridal jewellery across wedding functions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. A versatile Kundan choker worn with jhumkas for Mehendi can be re-styled for the reception with sleek AD studs. Similarly, antique kadas from your Muhurtham stack can be worn as standalone statement cuffs for post-wedding celebrations."
        }
      },
      {
        "@type": "Question",
        "name": "How do I match bridal jewellery with different sarees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Match the metal finish to your saree's zari tone: antique matte gold for authentic gold zari, and rhodium or dual-tone plating for silver zari. Match gemstone colors with your border (e.g., ruby Kemp on red or green silk) or create intentional contrast (emerald green stones on mustard yellow silk)."
        }
      }
    ]
  }
  </script>

  <style>
    :root {
      --article-gold: #D4AF37;
      --article-maroon: #8B1E3F;
      --article-dark: #2C1820;
      --article-cream: #FAF4EB;
      --article-border: #EFE2E6;
    }
    body.has-announcement {
      padding-top: 104px;
    }
    @media (max-width: 768px) {
      body.has-announcement {
        padding-top: 96px;
      }
    }
    .blog-article-container {
      max-width: 860px;
      margin: 0 auto;
      padding: 30px 20px 80px;
      font-family: 'Lora', Georgia, serif;
      font-size: 1.06rem;
      line-height: 1.82;
      color: #2D2529;
    }
    .blog-article-container h2 {
      font-family: 'Playfair Display', serif;
      font-size: 1.7rem;
      color: var(--article-maroon);
      margin-top: 48px;
      margin-bottom: 18px;
      font-weight: 700;
      line-height: 1.35;
      position: relative;
      padding-bottom: 12px;
      border-bottom: 2px solid rgba(212, 175, 55, 0.35);
    }
    .blog-article-container h3 {
      font-family: 'Poppins', sans-serif;
      font-size: 1.22rem;
      color: #7A1733;
      margin-top: 28px;
      margin-bottom: 12px;
      font-weight: 600;
      line-height: 1.4;
    }
    .blog-article-container p {
      margin-bottom: 18px;
      color: #332B30;
    }
    .blog-article-container strong {
      color: #1F151A;
      font-weight: 700;
    }
    .blog-article-container ul, .blog-article-container ol {
      margin: 16px 0 22px 24px;
      color: #332B30;
    }
    .blog-article-container li {
      margin-bottom: 8px;
      line-height: 1.72;
    }
    .blog-hero {
      background: linear-gradient(135deg, rgba(44, 24, 32, 0.94) 0%, rgba(20, 10, 15, 0.98) 100%);
      color: #FFFFFF;
      padding: 48px 20px;
      text-align: center;
      position: relative;
    }
    .blog-hero__breadcrumb {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'Poppins', sans-serif;
      font-size: 0.85rem;
      color: #FFE28A;
      margin-bottom: 18px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .blog-hero__breadcrumb a {
      color: #FFE28A;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .blog-hero__breadcrumb a:hover {
      color: #FFFFFF;
      text-decoration: underline;
    }
    .blog-hero__title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.85rem, 3.8vw, 2.75rem);
      font-weight: 700;
      line-height: 1.25;
      color: #FFFFFF;
      max-width: 920px;
      margin: 0 auto 16px;
    }
    .blog-hero__meta {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      font-family: 'Poppins', sans-serif;
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.82);
      flex-wrap: wrap;
    }
    .blog-toc-card {
      background: var(--article-cream);
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 14px;
      padding: 22px 26px;
      margin: 32px 0 40px;
      font-family: 'Poppins', sans-serif;
    }
    .blog-toc-card__title {
      font-size: 1.08rem;
      font-weight: 700;
      color: var(--article-maroon);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .blog-toc-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px 20px;
    }
    @media (max-width: 680px) {
      .blog-toc-list {
        grid-template-columns: 1fr;
      }
    }
    .blog-toc-list li a {
      color: #55333F;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      display: inline-block;
      transition: color 0.2s ease, transform 0.2s ease;
    }
    .blog-toc-list li a:hover {
      color: var(--article-maroon);
      transform: translateX(4px);
      text-decoration: underline;
    }
    .editorial-callout {
      background: #FFFDF9;
      border-left: 4px solid var(--article-gold);
      border-radius: 0 12px 12px 0;
      padding: 20px 24px;
      margin: 28px 0;
      font-style: italic;
      color: #3C3036;
      box-shadow: 0 3px 14px rgba(0,0,0,0.03);
    }
    .editorial-table-wrap {
      overflow-x: auto;
      margin: 24px 0 32px;
      border: 1px solid var(--article-border);
      border-radius: 12px;
      box-shadow: 0 4px 18px rgba(0,0,0,0.04);
      background: #FFFFFF;
    }
    .editorial-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Poppins', sans-serif;
      font-size: 0.92rem;
      text-align: left;
    }
    .editorial-table th {
      background: #2C1820;
      color: #FFE28A;
      font-weight: 600;
      padding: 12px 16px;
      letter-spacing: 0.03em;
      border-bottom: 2px solid var(--article-gold);
    }
    .editorial-table td {
      padding: 12px 16px;
      border-bottom: 1px solid #F1E5E9;
      color: #332B30;
      vertical-align: top;
      line-height: 1.55;
    }
    .editorial-table tr:last-child td {
      border-bottom: none;
    }
    .editorial-table tr:nth-child(even) td {
      background: #FDF9F7;
    }
    /* Layering Hierarchy Diagram */
    .layering-hierarchy-card {
      background: linear-gradient(135deg, #FFFDF9 0%, #FAF2EA 100%);
      border: 2px solid #D4AF37;
      border-radius: 16px;
      padding: 28px 24px;
      margin: 32px 0;
      text-align: center;
      font-family: 'Poppins', sans-serif;
      box-shadow: 0 6px 20px rgba(139, 30, 63, 0.06);
    }
    .layering-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 8px 0;
    }
    .layering-node {
      background: #FFFFFF;
      border: 1.5px solid #8B1E3F;
      border-radius: 10px;
      padding: 10px 20px;
      font-weight: 600;
      color: #8B1E3F;
      font-size: 0.95rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .layering-arrow {
      color: #D4AF37;
      font-size: 1.2rem;
      line-height: 1;
      margin: 4px 0;
      font-weight: bold;
    }
    /* Product Look Cards */
    .look-card {
      background: #FFFFFF;
      border: 1.5px solid #EFE2E6;
      border-radius: 16px;
      overflow: hidden;
      margin: 28px 0;
      box-shadow: 0 4px 18px rgba(0,0,0,0.05);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .look-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(139, 30, 63, 0.12);
      border-color: #D4AF37;
    }
    .look-card__header {
      background: #2C1820;
      color: #FFE28A;
      padding: 14px 20px;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 1.05rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .look-card__body {
      padding: 22px;
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 22px;
      align-items: center;
    }
    @media (max-width: 650px) {
      .look-card__body {
        grid-template-columns: 1fr;
      }
    }
    .look-card__img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 10px;
      border: 1px solid #EFE2E6;
    }
    .look-card__details {
      font-family: 'Poppins', sans-serif;
    }
    .look-card__product-name {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--article-maroon);
      margin-bottom: 4px;
    }
    .look-card__category {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #8B6914;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .look-card__styling-text {
      font-family: 'Lora', serif;
      font-size: 0.96rem;
      color: #4A3E45;
      line-height: 1.65;
      margin-bottom: 14px;
    }
    .faq-block {
      margin: 36px 0;
    }
    .faq-card {
      border: 1px solid #EFE2E6;
      background: #FFFFFF;
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    }
    .faq-question {
      font-family: 'Poppins', sans-serif;
      font-size: 1.12rem;
      font-weight: 700;
      color: #8B1E3F;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .faq-answer {
      font-family: 'Lora', serif;
      font-size: 1rem;
      line-height: 1.75;
      color: #3C3036;
      margin-bottom: 0;
    }
    .author-bio-card {
      background: #FFFDF9;
      border: 1.5px solid rgba(212, 175, 55, 0.4);
      border-radius: 16px;
      padding: 26px;
      margin: 44px 0;
      display: flex;
      gap: 20px;
      align-items: center;
      font-family: 'Poppins', sans-serif;
    }
    @media (max-width: 600px) {
      .author-bio-card {
        flex-direction: column;
        text-align: center;
      }
    }
    .author-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid #D4AF37;
      object-fit: cover;
      flex-shrink: 0;
    }
    .author-title {
      font-size: 1.12rem;
      font-weight: 700;
      color: var(--article-maroon);
      margin-bottom: 4px;
    }
    .author-role {
      font-size: 0.84rem;
      color: #8B6914;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
    }
    .author-desc {
      font-family: 'Lora', serif;
      font-size: 0.94rem;
      line-height: 1.62;
      color: #4A3E45;
      margin: 0;
    }
    .cta-banner-royal {
      background: linear-gradient(135deg, #2A121C 0%, #15090F 100%);
      border: 2px solid #D4AF37;
      border-radius: 18px;
      padding: 36px 28px;
      text-align: center;
      color: #FFFFFF;
      margin: 44px 0 20px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.15);
      font-family: 'Poppins', sans-serif;
    }
    .cta-banner-royal h2 {
      font-family: 'Playfair Display', serif;
      color: #FFE28A;
      font-size: 1.8rem;
      margin-top: 0;
      margin-bottom: 12px;
      border-bottom: none;
      padding-bottom: 0;
    }
    .cta-banner-royal p {
      font-family: 'Lora', serif;
      font-size: 1.02rem;
      color: rgba(255, 255, 255, 0.88);
      max-width: 640px;
      margin: 0 auto 22px;
      line-height: 1.68;
    }
    .cta-buttons-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
    }
  </style>
</head>

<body class="blog-post-page has-announcement">

  <!-- Top Royal Announcement Bar: Strictly Single Line Only -->
  <div class="royal-trust-bar" id="royalTrustBar" role="region" aria-label="Store Announcement">
    <div class="royal-trust-bar__inner">
      <div class="royal-trust-bar__track">
        <div class="royal-trust-bar__content">
          <span class="royal-trust-bar__badge">✨ Zero Blind Payments</span>
          <span class="royal-trust-bar__item"><strong>Pay ₹0 Today:</strong> Inspect on Live WhatsApp HD Video</span>
          <span class="royal-trust-bar__sep" aria-hidden="true">•</span>
          <span class="royal-trust-bar__item"><i data-lucide="truck" class="royal-trust-icon"></i> Express 24–48h Bangalore Delivery</span>
          <span class="royal-trust-bar__sep" aria-hidden="true">•</span>
          <span class="royal-trust-bar__item"><i data-lucide="repeat-2" class="royal-trust-icon"></i> 7-Day Size Exchange</span>
          <span class="royal-trust-bar__sep royal-trust-bar__desktop-only" aria-hidden="true">•</span>
          <span class="royal-trust-bar__item royal-trust-bar__desktop-only"><i data-lucide="map-pin" class="royal-trust-icon"></i> Malleshwaram Showroom (Open 7 Days)</span>
        </div>
        <div class="royal-trust-bar__content royal-trust-bar__mobile-duplicate" aria-hidden="true">
          <span class="royal-trust-bar__badge">✨ Zero Blind Payments</span>
          <span class="royal-trust-bar__item"><strong>Pay ₹0 Today:</strong> Inspect on Live WhatsApp HD Video</span>
          <span class="royal-trust-bar__sep">•</span>
          <span class="royal-trust-bar__item"><i data-lucide="truck" class="royal-trust-icon"></i> Express 24–48h Bangalore Delivery</span>
          <span class="royal-trust-bar__sep">•</span>
          <span class="royal-trust-bar__item"><i data-lucide="repeat-2" class="royal-trust-icon"></i> 7-Day Size Exchange</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ─── Navigation ─── -->
  <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
    <div class="navbar__inner">
      <div class="navbar__toggle-left" id="navToggle" role="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="navLinks" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
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

        <li role="none" class="navbar__dropdown-item">
          <a href="/areas" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">Areas</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu navbar__dropdown-menu--right">
            <li><a href="/areas" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">All Bangalore Areas</span></span></a></li>
            <li><a href="/areas/malleshwaram" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Malleshwaram</span></span></a></li>
            <li><a href="/areas/jayanagar" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Jayanagar</span></span></a></li>
            <li><a href="/areas/commercial-street" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Commercial Street</span></span></a></li>
            <li><a href="/areas/chickpet" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Chickpet</span></span></a></li>
            <li><a href="/areas/indiranagar" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Indiranagar</span></span></a></li>
            <li><a href="/areas/koramangala" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Koramangala</span></span></a></li>
            <li><a href="/areas/rajajinagar" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Rajajinagar</span></span></a></li>
            <li><a href="/areas/whitefield" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="map-pin"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Whitefield</span></span></a></li>
          </ul>
        </li>

        <li role="none"><a href="/blog" class="navbar__link" role="menuitem"><span class="navbar__link-text">Blog</span></a></li>

        <li role="none" class="navbar__dropdown-item">
          <a href="/about" class="navbar__link navbar__link--has-dropdown" role="menuitem" aria-haspopup="true">
            <span class="navbar__link-text">About &amp; Contact</span> <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </a>
          <ul class="navbar__dropdown-menu navbar__dropdown-menu--right">
            <li><a href="/about.html" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="info"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">About Us</span></span></a></li>
            <li><a href="/contact.html" class="navbar__dropdown-link"><span class="navbar__dropdown-icon"><i data-lucide="phone"></i></span><span class="navbar__dropdown-text"><span class="navbar__dropdown-title">Contact Us</span></span></a></li>
          </ul>
        </li>

        <li class="mobile-drawer__footer">
          <div class="mobile-drawer__contact">
            <a href="tel:+919844758450" class="mobile-drawer__btn mobile-drawer__btn--call">
              <i data-lucide="phone" style="width:18px;height:18px;"></i> Call Showroom
            </a>
            <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'm%20visiting%20your%20website" class="mobile-drawer__btn mobile-drawer__btn--whatsapp">
              <i data-lucide="message-circle" style="width:18px;height:18px;"></i> WhatsApp
            </a>
          </div>
        </li>
      </ul>

      <div class="navbar__actions">
        <a href="/wishlist" class="navbar__action-btn navbar__wishlist-btn" aria-label="Wishlist" title="Wishlist">
          <i data-lucide="heart" style="width:19px;height:19px;"></i>
          <span class="navbar__wishlist-badge" id="wishlistBadge">0</span>
        </a>
        <div class="navbar__user-menu">
          <a href="/login" class="navbar__auth-btn" id="navbarAuthBtn">Login / Register</a>
        </div>
        <a href="/cart" class="navbar__cart" aria-label="Shopping Bag" title="Bag">
          <i data-lucide="shopping-bag" style="width:19px;height:19px;"></i>
          <span class="navbar__cart-badge">0</span>
        </a>
      </div>
    </div>
  </nav>

  <!-- Page Hero Header -->
  <header class="blog-hero">
    <div class="blog-hero__breadcrumb">
      <a href="/">Home</a>
      <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
      <a href="/blog">Blog</a>
      <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
      <span>Bridal Jewellery for Wedding Functions</span>
    </div>
    <h1 class="blog-hero__title">Bridal Jewellery for Every Wedding Function: Haldi to Reception</h1>
    <div class="blog-hero__meta">
      <span><i data-lucide="calendar" style="width:15px;height:15px;vertical-align:middle;margin-right:4px;"></i> September 30, 2026</span>
      <span>•</span>
      <span><i data-lucide="clock" style="width:15px;height:15px;vertical-align:middle;margin-right:4px;"></i> 10 min read</span>
      <span>•</span>
      <span><i data-lucide="user-check" style="width:15px;height:15px;vertical-align:middle;margin-right:4px;"></i> Sri Kannika Bangles Bridal Styling Team</span>
    </div>
  </header>

  <!-- Main Article Content -->
  <main class="blog-article-container">

    <!-- Introduction Section (approx 135 words) -->
    <div class="editorial-callout" style="margin-top:0;">
      <p style="font-size:1.1rem; line-height:1.8; margin-bottom:10px; font-weight:500;">
        A wedding celebration is not a single uniform occasion, and your bridal jewellery does not need to look identical at every event. Today's multi-day festivities span vibrant, energetic rituals and sacred Vedic ceremonies: Haldi, Mehendi, Sangeet, the auspicious Muhurtham, and an elegant evening Reception.
      </p>
      <p style="font-size:1rem; line-height:1.75; margin-bottom:0;">
        Thoughtful trousseau curation allows your jewellery to evolve dynamically across ceremonies—moving effortlessly from lightweight, colorful, and moisture-resistant ornaments for daytime rituals, to grand, multi-tiered temple heirlooms for the sacred wedding vows, and finally into sleek, dazzling contemporary glamour for the reception stage.
      </p>
    </div>

    <!-- Table of Contents -->
    <div class="blog-toc-card">
      <div class="blog-toc-card__title">
        <i data-lucide="list-checks" style="width:20px;height:20px;color:var(--article-gold);"></i> Table of Contents: Function-by-Function Styling
      </div>
      <ul class="blog-toc-list">
        <li><a href="#quick-guide">1. Quick Guide by Function</a></li>
        <li><a href="#haldi">2. Jewellery for Haldi Ceremony</a></li>
        <li><a href="#mehendi">3. Jewellery for Mehendi Ceremony</a></li>
        <li><a href="#sangeet">4. Jewellery for the Sangeet</a></li>
        <li><a href="#muhurtham">5. Jewellery for the Muhurtham</a></li>
        <li><a href="#reception">6. Jewellery for the Reception</a></li>
        <li><a href="#engagement">7. Engagement &amp; Ring Ceremony</a></li>
        <li><a href="#reuse-jewellery">8. Reusing Jewellery Across Functions</a></li>
        <li><a href="#outfit-matching">9. Matching Jewellery With Outfits</a></li>
        <li><a href="#how-much-is-too-much">10. How Much Jewellery Is Too Much?</a></li>
        <li><a href="#5-complete-looks">11. 5 Complete Bridal Looks</a></li>
        <li><a href="#planning-checklist">12. Wedding Planning Checklist Table</a></li>
        <li><a href="#faqs">13. Frequently Asked Questions</a></li>
      </ul>
    </div>

    <!-- Section 1: Quick Guide by Wedding Function Table -->
    <section id="quick-guide">
      <h2>Bridal Jewellery by Wedding Function: Quick Guide</h2>
      <p>
        Use this quick reference matrix to select the right jewellery silhouette, weight, and metal style for each wedding event:
      </p>

      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>Function</th>
              <th>Necklace</th>
              <th>Earrings</th>
              <th>Bangles</th>
              <th>Head Jewellery</th>
              <th>Overall Style</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Haldi</strong></td>
              <td>Minimal / lightweight pendant</td>
              <td>Lightweight drops or studs</td>
              <td>Colourful / minimal glass bangles</td>
              <td>Optional delicate floral tikka</td>
              <td>Fresh, cheerful &amp; comfortable</td>
            </tr>
            <tr>
              <td><strong>Mehendi</strong></td>
              <td>Kundan / light choker</td>
              <td>Jhumkas or chandbalis</td>
              <td>Colourful glass &amp; metal stack</td>
              <td>Maang Tikka</td>
              <td>Vibrant, bohemian &amp; photogenic</td>
            </tr>
            <tr>
              <td><strong>Sangeet</strong></td>
              <td>Statement choker / AD suite</td>
              <td>Chandbalis / statement drops</td>
              <td>Statement kadas (no loose stack)</td>
              <td>Optional sleek maang tikka</td>
              <td>Glamorous, secure &amp; dance-ready</td>
            </tr>
            <tr>
              <td><strong>Muhurtham</strong></td>
              <td>Choker + 30-inch Long Haram</td>
              <td>Temple Jhumkas with matilu</td>
              <td>Temple &amp; Kemp bridal stack</td>
              <td>Nethi Chutti (Matha Patti)</td>
              <td>Sacred, traditional &amp; majestic</td>
            </tr>
            <tr>
              <td><strong>Reception</strong></td>
              <td>AD / Kundan / modern collar</td>
              <td>Statement chandelier earrings</td>
              <td>Elegant cuffs or minimal bangles</td>
              <td>Optional / hair brooches</td>
              <td>Contemporary, sleek &amp; royal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Section 2: Jewellery for the Haldi Ceremony -->
    <section id="haldi">
      <h2>Jewellery for the Haldi Ceremony</h2>
      <p>
        The Haldi ceremony is an intimate, energetic ritual filled with raw turmeric paste, floral blessings, and joyful water showers. Your jewellery must combine festive sunshine brightness with practical comfort and water resistance.
      </p>

      <h3>Best Necklace Styles for Haldi</h3>
      <p>
        Avoid heavy solid collar chokers that trap damp paste against your collarbones. Opt for minimalist short chains with bright floral lockets or lightweight anti-tarnish micro-gold pendant sets that sit cleanly above your yellow saree or kurta neckline. Browse our <a href="/pendant-sets">bridal pendant sets collection</a> for delicate options.
      </p>

      <h3>Earrings for Haldi</h3>
      <p>
        Choose small temple studs, floral-inspired drops, or lightweight jhumkas under 15 grams. Bulky chandeliers can easily catch on towels during cleansing rituals. Explore ergonomic <a href="/earrings">bridal earrings</a>.
      </p>

      <h3>Bangles for Haldi</h3>
      <p>
        Bangles bring energetic rhythm to Haldi songs. Mix sunny yellow and forest green glass bangles with 2 textured micro-gold filigree spacers. Glass bangles wipe clean effortlessly after turmeric application. Discover curated <a href="/wedding-glass-bangle-stacks">bridal glass bangle stacks</a>.
      </p>

      <h3>What to Avoid for Haldi</h3>
      <p>
        Leave high-value heirloom solid gold, porous pearls, and intricate open-back gemstone settings safely in their pouches. Turmeric stains porous stones and can lodge behind delicate prongs, requiring professional sonic cleaning.
      </p>
    </section>

    <!-- Section 3: Jewellery for the Mehendi Ceremony -->
    <section id="mehendi">
      <h2>Jewellery for the Mehendi Ceremony</h2>
      <p>
        Mehendi celebrations are bohemian, relaxed, and visually vibrant. Because the bride must sit still for several hours while intricate henna is applied, comfort and forearm accessibility are paramount.
      </p>

      <h3>Kundan Jewellery for Mehendi</h3>
      <p>
        Kundan choker sets backed with colorful meenakari enamel work pair spectacularly with printed lehengas, shararas, and floral silk drapes. Explore authentic designs in our <a href="/kundan-and-jadau-jewellery-bangalore">Kundan and Jadau jewellery collection</a>.
      </p>

      <h3>Colourful Bridal Bangles</h3>
      <p>
        Keep your forearms bare during the application, but have openable screw kadas ready to slip on once the henna paste dries. Browse openable <a href="/bangles">bridal kadas and bangles</a>.
      </p>

      <h3>Maang Tikka for Mehendi</h3>
      <p>
        A central statement maang tikka resting on loose bridal beach waves or an effortless side braid frames your face for portrait photography while keeping hair neatly off your forehead. See our <a href="/bridal-matha-patti-maang-tikka">bridal maang tikka collection</a>.
      </p>

      <h3>Lightweight Jhumkas and Chandbalis</h3>
      <p>
        Crescent-shaped chandbalis encrusted with faux polki and pearl clusters add romantic movement without pulling on your earlobes while you laugh and recline during henna sessions.
      </p>

      <h3>Jewellery Colours That Work With Mehendi Outfits</h3>
      <p>
        Mehendi outfits embrace lively color palettes: lime green, mango yellow, tangerine, and blush pink. Contrast combinations work wonders: mint green Kundan stones on yellow silk, or ruby Kemp accents against an olive green lehenga.
      </p>
    </section>

    <!-- Section 4: Jewellery for the Sangeet -->
    <section id="sangeet">
      <h2>Jewellery for the Sangeet</h2>
      <p>
        The Sangeet is an evening of theatrical performances, pulsating music, and celebratory dance. Your jewellery must withstand intense stage movement while sparkling brilliantly under moving spotlights.
      </p>

      <h3>Statement Chokers</h3>
      <p>
        A snug, broad collar choker resting securely on the collarbone creates high-impact drama that looks immaculate in high-definition video. Discover statement <a href="/necklaces">bridal chokers</a>.
      </p>

      <h3>AD and Stone Jewellery</h3>
      <p>
        American Diamond (AD) and precision-cut cubic zirconia sets come alive under ballroom chandeliers, reflecting dazzling prismatic flashes across the dance floor. Browse our <a href="/cz-and-ad-diamond-jewellery-bangalore">CZ and AD diamond jewellery collection</a>.
      </p>

      <h3>Chandbalis and Statement Earrings</h3>
      <p>
        Choose statement earrings with secure push-back closures. Ensure the backing has a broad silicone disc to hold the earring flush against the earlobe during pirouettes and dance choreography.
      </p>

      <h3>Kadas Instead of Heavy Bangle Stacks</h3>
      <p>
        Replace noisy multi-piece bangle stacks with two statement screw kadas—one on each wrist. This prevents bangles from clattering against microphones or catching on dupatta borders during dance lifts.
      </p>

      <h3>Choose Jewellery You Can Dance In</h3>
      <p>
        Check three practical factors before walking onto the dance floor: test that back thread doris are double-knotted, confirm necklace prongs do not snag on your sheer netted dupatta, and verify that earrings do not cause painful lobe pull when swaying.
      </p>
    </section>

    <!-- Section 5: Jewellery for the Muhurtham -->
    <section id="muhurtham">
      <h2>Jewellery for the Muhurtham</h2>
      <p>
        The sacred Muhurtham is the crowning pinnacle of South Indian wedding sanctity. Centered around Vedic rituals, the sacred agni fire, and handwoven Kanjivaram silk, this ceremony commands pure architectural heritage. Explore our dedicated <a href="/muhurtham-jewellery-bangalore">Muhurtham jewellery Bangalore showcase</a>.
      </p>

      <h3>Temple Choker</h3>
      <p>
        A high antique collar choker sculpted with Nakshi motifs of Goddess Lakshmi or Lord Venkateshwara sits snugly above your blouse collar, establishing the foundation of your bridal portraiture. View our <a href="/temple-jewellery-bangalore">temple jewellery collection</a>.
      </p>

      <h3>Long Haram</h3>
      <p>
        An auspicious 28 to 32-inch haram flows gracefully past the chest pleats. Whether choosing a classic Kasu Malai (coin necklace), a mango-leaf chain, or a grand repoussé Lakshmi medallion, the long haram centers your trousseau with royal majesty. Browse <a href="/necklaces">temple harams</a>.
      </p>

      <h3>Traditional Jhumkas</h3>
      <p>
        Grand multi-tier bell jhumkas with pearl tassels and hair-anchoring matilu chains frame your face with divine grace. Explore traditional <a href="/earrings">temple jhumkas</a>.
      </p>

      <h3>Bridal Bangles and Kadas</h3>
      <p>
        A complete Muhurtham wrist stack combines antique Nakshi kadas on the outer ends, textured gold spacers, and red and green auspicious glass bangles in the center. Discover curated <a href="/bangles">bridal bangles</a>.
      </p>

      <h3>Vanki or Baajuband</h3>
      <p>
        The sacred inverted V-shaped vanki wraps gracefully around the upper arm, highlighting traditional short blouse sleeves. Browse <a href="/antique-vanki-baajuband">antique vanki and bajuband designs</a>.
      </p>

      <h3>Vaddanam or Kamarbandh</h3>
      <p>
        The temple waist belt holds heavy silk saree pleats impeccably in place during hours of seated rituals while emphasizing a regal posture. View our <a href="/temple-vaddanam-kamarbandh">temple vaddanam collection</a>.
      </p>

      <h3>Nethi Chutti or Matha Patti</h3>
      <p>
        Adorning the central hair parting, the South Indian nethi chutti symbolizes divine protection, featuring the sacred Surya (Sun) and Chandra (Moon) brooches. Discover <a href="/bridal-matha-patti-maang-tikka">nethi chutti designs</a>.
      </p>

      <h3>How to Layer Muhurtham Jewellery (Visual Hierarchy)</h3>
      <p>
        Achieving cohesive bridal grandeur requires observing an ergonomic vertical hierarchy from head to waist:
      </p>

      <div class="layering-hierarchy-card">
        <h4 style="color:#8B1E3F; font-size:1.15rem; margin-top:0; margin-bottom:16px;">The Sacred South Indian Bridal Layering Hierarchy</h4>
        <div class="layering-step">
          <div class="layering-node"><i data-lucide="crown" style="width:16px;height:16px;"></i> Nethi Chutti / Matha Patti (Forehead &amp; Hair Parting)</div>
          <div class="layering-arrow">↓</div>
        </div>
        <div class="layering-step">
          <div class="layering-node"><i data-lucide="sparkles" style="width:16px;height:16px;"></i> Temple Jhumkas + Matilu Hair Chains (Face Framing)</div>
          <div class="layering-arrow">↓</div>
        </div>
        <div class="layering-step">
          <div class="layering-node"><i data-lucide="gem" style="width:16px;height:16px;"></i> Short Antique Collar Choker (12–14 in, Clavicle Anchor)</div>
          <div class="layering-arrow">↓</div>
        </div>
        <div class="layering-step">
          <div class="layering-node"><i data-lucide="heart" style="width:16px;height:16px;"></i> Long Goddess Lakshmi Haram (28–32 in, Torso Center)</div>
          <div class="layering-arrow">↓</div>
        </div>
        <div class="layering-step">
          <div class="layering-node"><i data-lucide="award" style="width:16px;height:16px;"></i> Antique Vanki / Bajuband (Upper Arm Sleeve Border)</div>
          <div class="layering-arrow">↓</div>
        </div>
        <div class="layering-step">
          <div class="layering-node"><i data-lucide="circle" style="width:16px;height:16px;"></i> Bridal Bangle Stack &amp; Statement Kadas (Wrist Cadence)</div>
          <div class="layering-arrow">↓</div>
        </div>
        <div class="layering-step">
          <div class="layering-node"><i data-lucide="shield" style="width:16px;height:16px;"></i> Temple Vaddanam / Kamarbandh (Waist &amp; Pleat Anchor)</div>
        </div>
      </div>
    </section>

    <!-- Section 6: Jewellery for the Wedding Reception -->
    <section id="reception">
      <h2>Jewellery for the Wedding Reception</h2>
      <p>
        The evening reception marks a departure from traditional temple protocol into contemporary red-carpet glamour. Brides frequently wear pastel lehengas, Indo-Western gowns, or modern designer drapes. Explore our curated <a href="/reception-and-sangeet-jewellery-bangalore">reception and sangeet jewellery showcase</a>.
      </p>

      <h3>Contemporary Bridal Choker</h3>
      <p>
        Sleek, sculpted chokers featuring multi-row pearls, marquise AD stones, or emerald drop accents create regal sophistication that complements open necklines and sweetheart cuts.
      </p>

      <h3>Kundan Jewellery for Reception</h3>
      <p>
        High-grade uncut polki Kundan suites with mint green or blush pink meenakari deliver royal North Indian luxury that pairs effortlessly with heavily embellished lehengas.
      </p>

      <h3>AD Jewellery for Reception</h3>
      <p>
        Cubic zirconia pieces mounted on rhodium or rose-gold plating deliver radiant diamond sparkle that mirrors luxury ballroom decor.
      </p>

      <h3>Statement Earrings</h3>
      <p>
        Dramatic cascading chandeliers or wide multi-layered ear cuffs draw focus upwards, balancing voluminous lehenga skirts and high-fashion hairstyles.
      </p>

      <h3>Minimal Bangles or Statement Kadas</h3>
      <p>
        The reception look rarely requires the full traditional Muhurtham stack. A single bold statement kada or a sleek diamond tennis bracelet on each wrist creates a sophisticated, uncluttered look.
      </p>
    </section>

    <!-- Section 7: Jewellery for Engagement or Ring Ceremony -->
    <section id="engagement">
      <h2>Jewellery for Engagement or Ring Ceremony</h2>
      <p>
        The engagement or ring ceremony is typically an intimate, elegant precursor to the wedding celebrations:
      </p>

      <h3>Pendant Sets</h3>
      <p>
        Delicate matching pendant sets featuring teardrop emeralds, ruby halos, or floral motifs provide understated elegance for organza or chiffon sarees. Explore <a href="/pendant-sets">bridal pendant sets</a>.
      </p>

      <h3>Elegant Chokers</h3>
      <p>
        Single-strand collar necklaces or light pastel Kundan chokers frame your neck gracefully without looking overly bridal before the main wedding ceremonies.
      </p>

      <h3>Statement Earrings</h3>
      <p>
        A pair of grand drop earrings can stand entirely on its own with an embroidered gown or high-neck blouse, skipping a heavy necklace altogether.
      </p>
    </section>

    <!-- Section 8: How to Reuse Jewellery Across Wedding Functions -->
    <section id="reuse-jewellery">
      <h2>How to Reuse Jewellery Across Wedding Functions</h2>
      <p>
        Investing in versatile, modular bridal jewellery allows you to restyle pieces creatively across multiple celebrations without wearing identical combinations:
      </p>
      <ul>
        <li><strong>Example 1: The Versatile Kundan Choker:</strong> Wear your Kundan choker paired with lightweight jhumkas and playful glass bangles for the Mehendi. For the Reception, re-style the exact same choker with dramatic statement chandelier earrings and a sleek wrist cuff for red-carpet glamour.</li>
        <li><strong>Example 2: The Temple Jhumka:</strong> During the Muhurtham, wear your grand temple jhumkas attached to ornate matilu hair chains as part of your complete temple set. For post-wedding temple visits or Satyanarayana pujas, detach the hair chains and wear the jhumkas as standalone statement earrings with a simple handloom saree.</li>
        <li><strong>Example 3: The Antique Kada:</strong> Flank your heavy 20-piece bridal bangle stack with antique Nakshi kadas during the Muhurtham. For the Reception or Sangeet, wear one solitary kada on each hand to add a touch of heritage gold to an Indo-Western outfit.</li>
      </ul>
    </section>

    <!-- Section 9: How to Match Jewellery With Your Outfit -->
    <section id="outfit-matching">
      <h2>How to Match Jewellery With Your Outfit</h2>
      <p>
        Harmonizing metal finishes and silhouettes with your fabric structure ensures visual synergy:
      </p>

      <h3>Kanjivaram Saree</h3>
      <p>
        Heavy silk drapes require jewellery with equivalent physical and visual substance: antique matte 24K micro-gold, Nakshi repoussé work, and deep red Kemp stones. Review our comprehensive guide on <a href="/blog/how-to-match-bridal-jewellery-with-kanjivaram-silk-sarees">how to match bridal jewellery with a Kanjivaram saree</a>.
      </p>

      <h3>Lehenga</h3>
      <p>
        Voluminous skirts and heavily embroidered dupattas pair best with Kundan polki, Jadau, or radiant American Diamond collar chokers that rest flush against bare skin above a sweetheart neckline.
      </p>

      <h3>Silk Saree (Mysore Silk, Tussar, Banarasi)</h3>
      <p>
        Lighter silks allow for delicate filigree chokers, two-tone temple pendants, or subtle pearl-drop necklaces that drape smoothly without pulling fine woven threads.
      </p>

      <h3>Indo-Western Reception Outfit</h3>
      <p>
        Gowns, cape sets, and concept sarees require contemporary silhouettes: oversized geometric chandelier earrings, sleek single-line tennis chokers, and sculpted wrist cuffs.
      </p>
    </section>

    <!-- Section 10: How Much Bridal Jewellery Is Too Much? -->
    <section id="how-much-is-too-much">
      <h2>How Much Bridal Jewellery Is Too Much?</h2>
      <p>
        Achieving bridal elegance is about visual balance rather than piling on every available ornament. Follow these practical styling guidelines:
      </p>
      <ul>
        <li><strong>When Blouse Embroidery Is Heavy:</strong> If your blouse features dense zardozi or cutwork around the collar, skip multi-tiered necklaces and wear a single bold collar choker with grand statement jhumkas.</li>
        <li><strong>When Matha Patti Is Elaborate:</strong> If your forehead ornament features wide side bands and temple plaques, opt for medium-sized jhumkas rather than oversized shoulder-grazing chandeliers.</li>
        <li><strong>When Wearing Choker + Long Haram:</strong> With two prominent neckpieces, choose streamlined armlets and simple bangle spacers so your chest and arms do not look overcrowded.</li>
        <li><strong>Embellished Fabrics:</strong> With heavily sequined or stone-studded lehengas, limiting your jewellery to two focal points (e.g., grand earrings and a statement choker) creates an uncluttered, sophisticated aesthetic.</li>
      </ul>
    </section>

    <!-- Section 11: 5 Complete Bridal Jewellery Looks -->
    <section id="5-complete-looks">
      <h2>5 Complete Bridal Jewellery Looks</h2>
      <p>
        To help you visualize your trousseau, here are 5 complete, ceremony-tested bridal looks curated directly from Sri Kannika Bangles' authentic handcrafted collections:
      </p>

      <!-- Look 1 -->
      <div class="look-card">
        <div class="look-card__header">
          <span>Look 1: Traditional South Indian Bride</span>
          <span style="font-size:0.85rem; color:#FFE28A;">Muhurtham Ceremony</span>
        </div>
        <div class="look-card__body">
          <img src="/images/necklaces/IMG-20260717-WA0012.jpg" alt="Grand Bridal Choker - South Indian Bride" class="look-card__img">
          <div class="look-card__details">
            <div class="look-card__product-name">Grand Bridal Choker &amp; Lakshmi Haram</div>
            <div class="look-card__category">Necklaces &amp; Temple Sets</div>
            <p class="look-card__styling-text">
              The definitive South Indian Muhurtham ensemble. A sculpted antique matte choker paired with a 30-inch Goddess Lakshmi temple haram, handcrafted Classic Temple Jhumkas, and a Kemp bridal bangle stack flanked by Classic Temple Kadas.
            </p>
            <a href="/products/grand-bridal-choker" class="btn btn--primary btn--sm">View Grand Bridal Choker</a>
          </div>
        </div>
      </div>

      <!-- Look 2 -->
      <div class="look-card">
        <div class="look-card__header">
          <span>Look 2: Classic Kundan Bride</span>
          <span style="font-size:0.85rem; color:#FFE28A;">Mehendi &amp; Sangeet</span>
        </div>
        <div class="look-card__body">
          <img src="/images/necklaces/IMG-20260717-WA0013.jpg" alt="Kundan Pearl Choker - Classic Kundan Bride" class="look-card__img">
          <div class="look-card__details">
            <div class="look-card__product-name">Kundan Pearl Choker &amp; Ruby Tikka</div>
            <div class="look-card__category">Kundan &amp; Jadau Suites</div>
            <p class="look-card__styling-text">
              Uncut glass stones set in pure gold foils with cluster pearl drops. Paired with our Ruby Pearl Tikka and Kundan Bridal Bangles, this look delivers effortless Mughal royalty for pastel lehengas.
            </p>
            <a href="/products/kundan-pearl-choker" class="btn btn--primary btn--sm">View Kundan Pearl Choker</a>
          </div>
        </div>
      </div>

      <!-- Look 3 -->
      <div class="look-card">
        <div class="look-card__header">
          <span>Look 3: Antique Gold Bride</span>
          <span style="font-size:0.85rem; color:#FFE28A;">Varapooja &amp; Reception</span>
        </div>
        <div class="look-card__body">
          <img src="/images/bangles/IMG-20260805-WA0007.jpg" alt="Antique Gold Kada - Antique Gold Bride" class="look-card__img">
          <div class="look-card__details">
            <div class="look-card__product-name">Antique Gold Kada &amp; Kemp Suite</div>
            <div class="look-card__category">Antique Matte Collection</div>
            <p class="look-card__styling-text">
              Warm, burnished 24K micro-gold finish without harsh camera glare. Features bold Antique Gold Kadas, Heritage Kemp Bangles, and Antique Ruby Studs for understated heritage luxury.
            </p>
            <a href="/products/antique-gold-kada" class="btn btn--primary btn--sm">View Antique Gold Kada</a>
          </div>
        </div>
      </div>

      <!-- Look 4 -->
      <div class="look-card">
        <div class="look-card__header">
          <span>Look 4: Minimal Bridal Look</span>
          <span style="font-size:0.85rem; color:#FFE28A;">Haldi &amp; Ring Ceremony</span>
        </div>
        <div class="look-card__body">
          <img src="/images/pendant-sets/IMG-20260821-WA0005.jpg" alt="Floral AD Pendant - Minimal Bridal Look" class="look-card__img">
          <div class="look-card__details">
            <div class="look-card__product-name">Floral AD Pendant &amp; Pearl Drops</div>
            <div class="look-card__category">Pendant Sets &amp; Lightweight Jewellery</div>
            <p class="look-card__styling-text">
              Clean, feather-light sophistication. A delicate floral pendant set paired with Pearl Drop Earrings and a solitary Grand Royal Kada for brides who value modern simplicity.
            </p>
            <a href="/products/floral-ad-pendant" class="btn btn--primary btn--sm">View Floral AD Pendant</a>
          </div>
        </div>
      </div>

      <!-- Look 5 -->
      <div class="look-card">
        <div class="look-card__header">
          <span>Look 5: Glamorous Reception Bride</span>
          <span style="font-size:0.85rem; color:#FFE28A;">Evening Reception</span>
        </div>
        <div class="look-card__body">
          <img src="/images/earrings/IMG-20260720-WA0020.jpg" alt="Royal Peacock Jhumka - Glamorous Reception Bride" class="look-card__img">
          <div class="look-card__details">
            <div class="look-card__product-name">Royal Peacock Jhumka &amp; Diamond Bangles</div>
            <div class="look-card__category">Reception &amp; CZ Diamond Sets</div>
            <p class="look-card__styling-text">
              High-impact stage sparkle. Precision-cut cubic zirconia collar choker paired with Royal Peacock Jhumkas and Floral Diamond Bangles that dazzle under evening chandeliers.
            </p>
            <a href="/products/royal-peacock-jhumka" class="btn btn--primary btn--sm">View Royal Peacock Jhumka</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 12: Wedding Jewellery Planning Checklist Table -->
    <section id="planning-checklist">
      <h2>Wedding Jewellery Planning Checklist</h2>
      <p>
        Use this interactive trousseau planning table to track your progress for each wedding ceremony:
      </p>

      <div class="editorial-table-wrap">
        <table class="editorial-table">
          <thead>
            <tr>
              <th>Function</th>
              <th>Outfit</th>
              <th>Necklace</th>
              <th>Earrings</th>
              <th>Bangles</th>
              <th>Accessories</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Haldi</strong></td>
              <td>☐ Yellow saree / suit</td>
              <td>☐ Floral / light pendant</td>
              <td>☐ Lightweight drops</td>
              <td>☐ Glass bangles</td>
              <td>☐ Hair flowers</td>
            </tr>
            <tr>
              <td><strong>Mehendi</strong></td>
              <td>☐ Green / floral lehenga</td>
              <td>☐ Kundan choker</td>
              <td>☐ Chandbalis</td>
              <td>☐ Openable kadas</td>
              <td>☐ Maang tikka</td>
            </tr>
            <tr>
              <td><strong>Sangeet</strong></td>
              <td>☐ Indo-Western / lehenga</td>
              <td>☐ Statement AD choker</td>
              <td>☐ Chandelier earrings</td>
              <td>☐ Statement kadas</td>
              <td>☐ Hair brooch</td>
            </tr>
            <tr>
              <td><strong>Muhurtham</strong></td>
              <td>☐ Kanjivaram silk saree</td>
              <td>☐ Choker + Long Haram</td>
              <td>☐ Temple jhumkas + matilu</td>
              <td>☐ Kemp bridal stack</td>
              <td>☐ Nethi chutti, vanki, vaddanam</td>
            </tr>
            <tr>
              <td><strong>Reception</strong></td>
              <td>☐ Designer gown / lehenga</td>
              <td>☐ Contemporary collar</td>
              <td>☐ Statement chandeliers</td>
              <td>☐ Sleek cuffs</td>
              <td>☐ Ring &amp; clutch</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style="font-weight:600; color:#8B1E3F;">
        Planning your shopping timeline and checklist in Bangalore? Read our comprehensive <a href="/blog/bridal-jewellery-shopping-guide-bangalore">bridal jewellery shopping guide for Bangalore</a>.
      </p>
    </section>

    <!-- Section 13: Frequently Asked Questions -->
    <section id="faqs" class="faq-block">
      <h2>Frequently Asked Questions About Bridal Jewellery for Wedding Functions</h2>

      <div class="faq-card">
        <h3 class="faq-question">What jewellery should a bride wear for Haldi?</h3>
        <p class="faq-answer">
          Choose lightweight, moisture-resistant jewellery such as delicate floral pendant sets, minimal micro-gold drops, and cheerful yellow or green glass bangles. Avoid heavy solid gold, dense stone settings, or fragile clasps that can trap turmeric paste or snag on wet clothes.
        </p>
      </div>

      <div class="faq-card">
        <h3 class="faq-question">What jewellery is best for Mehendi?</h3>
        <p class="faq-answer">
          The best jewellery for Mehendi embraces colorful, bohemian grace: pastel Kundan chokers, lightweight dangling chandbalis, and a statement maang tikka. Keep the forearms and wrists minimal or wear easily removable kadas so your hands remain free for intricate henna application.
        </p>
      </div>

      <div class="faq-card">
        <h3 class="faq-question">What bridal jewellery should I wear for Sangeet?</h3>
        <p class="faq-answer">
          Sangeet calls for sparkling statement pieces that catch stage spotlights while allowing effortless dancing: a dazzling American Diamond (AD) choker, lightweight chandelier earrings or chandbalis, and secure screw kadas instead of noisy, heavy bangle stacks.
        </p>
      </div>

      <div class="faq-card">
        <h3 class="faq-question">What jewellery is traditionally worn for Muhurtham?</h3>
        <p class="faq-answer">
          Traditional South Indian Muhurtham jewellery is rooted in antique temple architecture: a high choker, an auspicious 28–32 inch Goddess Lakshmi or Kasu haram, grand Kemp jhumkas with matilu hair chains, a nethi chutti, antique vanki for upper arms, an intricate bridal bangle stack, and a sculpted temple vaddanam waist belt.
        </p>
      </div>

      <div class="faq-card">
        <h3 class="faq-question">Should I wear a choker and long Haram together?</h3>
        <p class="faq-answer">
          Yes, wearing a snug collar choker paired with a 28–32 inch long haram is the classic South Indian bridal standard. It frames your neckline while creating a regal vertical line down the torso that highlights the central sacred medallion above the vaddanam.
        </p>
      </div>

      <div class="faq-card">
        <h3 class="faq-question">What jewellery should I wear for a wedding reception?</h3>
        <p class="faq-answer">
          For the reception, transition into contemporary luxury with an American Diamond (AD) collar choker, royal Kundan polki set, or oversized statement earrings paired with sleek diamond bracelets or dual statement kadas that complement designer lehengas or evening gowns.
        </p>
      </div>

      <div class="faq-card">
        <h3 class="faq-question">Can I reuse bridal jewellery across wedding functions?</h3>
        <p class="faq-answer">
          Absolutely. A versatile Kundan choker worn with jhumkas for Mehendi can be re-styled for the reception with sleek AD studs. Similarly, antique kadas from your Muhurtham stack can be worn as standalone statement cuffs for post-wedding celebrations.
        </p>
      </div>

      <div class="faq-card">
        <h3 class="faq-question">How do I match bridal jewellery with different sarees?</h3>
        <p class="faq-answer">
          Match the metal finish to your saree's zari tone: antique matte gold for authentic gold zari, and rhodium or dual-tone plating for silver zari. Match gemstone colors with your border (e.g., ruby Kemp on red or green silk) or create intentional contrast (emerald green stones on mustard yellow silk).
        </p>
      </div>
    </section>

    <!-- Author / E-E-A-T Box -->
    <div class="author-bio-card">
      <img src="/images/kannika_logo.jpeg" alt="Sri Kannika Bangles Bridal Styling Team" class="author-avatar">
      <div>
        <div class="author-title">Sri Kannika Bangles Bridal Styling Team</div>
        <div class="author-role">Master Bridal Jewellery Curators • Malleshwaram, Bengaluru</div>
        <p class="author-desc">
          Specializing in multi-function wedding trousseau curation, the bridal styling team at Sri Kannika Bangles guides brides across South India in coordinating jewellery from Haldi to Reception. With deep expertise in temple Nakshi heirlooms, Kundan polki craftsmanship, and ergonomic bridal layering, our consultants help each bride achieve timeless elegance.
        </p>
      </div>
    </div>

    <!-- Final CTA Banner (approx 95 words) -->
    <div class="cta-banner-royal">
      <h2>Build Your Complete Bridal Jewellery Look</h2>
      <p>
        From vibrant Haldi and Mehendi celebrations to the sacred Muhurtham vows and glamorous evening Reception, Sri Kannika Bangles offers complete trousseau solutions. Visit our Malleshwaram showroom to try our collections with your wedding outfits, or schedule an exclusive WhatsApp live video consultation with zero blind payments and express delivery across Bangalore.
      </p>
      <div class="cta-buttons-group">
        <a href="/bridal-jewellery-bangalore" class="btn btn--primary">Explore Bridal Jewellery</a>
        <a href="/temple-jewellery-bangalore" class="btn btn--secondary">Explore Temple Jewellery</a>
        <a href="/bangles" class="btn btn--outline" style="color:#FFE28A; border-color:#FFE28A;">Shop Bridal Bangles</a>
        <a href="/necklaces" class="btn btn--outline" style="color:#FFFFFF; border-color:#FFFFFF;">Explore Necklaces</a>
        <a href="/earrings" class="btn btn--outline" style="color:#FFFFFF; border-color:#FFFFFF;">Explore Earrings</a>
        <a href="https://wa.me/919844758450?text=Hi%20Kannika%20Bangles,%20I'd%20like%20to%20style%20my%20jewellery%20for%20my%20wedding%20functions" target="_blank" rel="noopener" class="btn btn--primary" style="background:#25D366; border-color:#25D366; color:#FFFFFF;">
          <i data-lucide="message-circle" style="width:16px;height:16px;margin-right:6px;"></i> WhatsApp for Bridal Styling
        </a>
      </div>
    </div>

  </main>

  <!-- --- Superpower / Trust Strip --- -->
  <footer class="footer" style="margin-top:0;">
    <div class="superpower-trust-strip">
      <div class="superpower-trust-inner">
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="video" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text">
            <strong>Video Call Shopping</strong>
            <span>Inspect on WhatsApp HD Video</span>
          </div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="truck" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text">
            <strong>Express Bangalore Delivery</strong>
            <span>Doorstep dispatch in 24–48h</span>
          </div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="shield-check" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text">
            <strong>7-Day Size Exchange</strong>
            <span>Hassle-free bangle fitting</span>
          </div>
        </div>
        <div class="superpower-trust-pill">
          <div class="superpower-trust-pill-icon"><i data-lucide="map-pin" style="width:20px;height:20px;"></i></div>
          <div class="superpower-trust-pill-text">
            <strong>Malleshwaram Store</strong>
            <span>Real Bangalore showroom (Open 7 Days)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__grid">
      <div class="footer__col">
        <div class="footer__brand-name"><span>Kannika</span> Bangles</div>
        <p class="footer__desc">Turning every bride's dream into a beautiful reality. Handcrafted bangles and bridal jewels blending tradition with modern elegance since generations.</p>
        <div class="footer__social" style="margin-top: 16px;">
          <a href="https://wa.me/919844758450" target="_blank" rel="noopener" class="footer__social-link" aria-label="WhatsApp" style="color:#25D366;border-color:rgba(37,211,102,0.4);"><i data-lucide="message-circle" style="width:18px;height:18px;"></i></a>
        </div>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Quick Links</h4>
        <a href="/" class="footer__link">Home</a>
        <a href="/shop" class="footer__link">Shop All</a>
        <a href="/bridal-jewellery-bangalore" class="footer__link">Bridal Jewellery</a>
        <a href="/temple-jewellery-bangalore" class="footer__link">Temple Jewellery</a>
        <a href="/muhurtham-jewellery-bangalore" class="footer__link">Muhurtham Jewellery</a>
        <a href="/about.html" class="footer__link">Our Story</a>
        <a href="/contact.html" class="footer__link">Contact Us</a>
        <a href="/blog" class="footer__link">Blog &amp; Guides</a>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Categories</h4>
        <a href="/bangles" class="footer__link">Bangles</a>
        <a href="/necklaces" class="footer__link">Necklaces</a>
        <a href="/pendant-sets" class="footer__link">Pendant Sets</a>
        <a href="/earrings" class="footer__link">Earrings</a>
        <a href="/wedding-glass-bangle-stacks" class="footer__link">Bridal Glass Bangle Stacks</a>
        <a href="/south-indian-bridal-jewellery-set" class="footer__link">Complete Bridal Sets</a>
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

  <!-- Sticky WhatsApp Floating Button -->
  <a href="https://wa.me/919844758450?text=Hi!%20I'm%20reading%20your%20Bridal%20Jewellery%20Function%20Guide%20and%20would%20like%20styling%20advice." class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>

  <!-- Scripts -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" defer></script>
  <script src="/js/auth.js?v=20260916_201"></script>
  <script src="/js/main.js?v=12"></script>
</body>
</html>
`;

const targetPath = path.join(__dirname, '..', 'blog', 'bridal-jewellery-for-wedding-functions.html');
fs.writeFileSync(targetPath, blog2Html, 'utf8');

const mainMatch = blog2Html.match(/<main[\s\S]*?<\/main>/);
if (mainMatch) {
  const cleanText = mainMatch[0]
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const articleWords = cleanText.split(' ').filter(Boolean).length;
  console.log('Successfully wrote Blog 2 to:', targetPath);
  console.log('Main Article Body Words:', articleWords);
}
