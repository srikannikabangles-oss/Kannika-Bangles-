const fs = require('fs');
const path = require('path');

const additions = {
  'bangle-size-chart-calculator.html': {
    targetMarker: '<!-- --- Specialized Bridal Categories Hub --- -->',
    html: `
  <!-- --- Bangalore Bridal Wrist Protocols & Sizing Advice --- -->
  <section class="section" id="bridalSizingProtocols" style="padding: 60px 20px; background: #ffffff; border-top: 1px solid #ebdccb;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 700;">Bangalore Wedding Practical Guide</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 3vw, 2.2rem); color: #2e2216; margin-top: 8px;">Bangalore Bridal Wrist Measurement Protocols & Swelling Management</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 16px auto;"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 30px;">
        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="thermometer" style="width: 20px; height: 20px; color: #8B6914;"></i> Mandap Heat & Wrist Swelling
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            During intense South Indian Muhurtham rituals, continuous exposure to sacred homa fire combined with heavy bridal Kanjivaram silk can elevate body temperature, causing mild peripheral swelling of hands by 0.5 to 1.0 bangle size. When curating non-flexible glass churis or solid temple kadas, our Malleshwaram master stylists recommend choosing one millimeter larger (e.g. 2-6 instead of tight 2-4) to ensure effortless glide throughout long ceremonial hours.
          </p>
        </div>

        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="sparkles" style="width: 20px; height: 20px; color: #8B6914;"></i> Mehendi Friction & Plastic Pouch Glide
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            Fresh wedding Mehendi eucalyptus and clove oils can increase friction when squeezing dry glass bangles past knuckles. Never force rigid bangles against swollen knuckles; instead, slip a smooth thin plastic grocery pouch or silk ribbon over the hand first. Bangles will glide painlessly into position in seconds without warping round geometries or fracturing delicate colored glass rims.
          </p>
        </div>
      </div>

      <div style="background: #fdfbf7; border-left: 4px solid #b38728; padding: 20px 24px; border-radius: 0 10px 10px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-bottom: 6px;">Screw Kada Security Inspection</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          For opening screw kadas and hinged cuffs, gently test the counter-clockwise threaded pin before stepping into the wedding hall. Sri Kannika’s 1-gram gold kadas are fitted with precision double-threaded safety screws and push-latch locks designed to resist accidental releases during vigorous bridal games like Ungaram ring fishing.
        </p>
      </div>
    </div>
  </section>
`
  },

  'temple-vaddanam-kamarbandh.html': {
    targetMarker: '<!-- --- Specialized Bridal Categories Hub --- -->',
    html: `
  <!-- --- Vaddanam Preservation & Ergonomics --- -->
  <section class="section" id="vaddanamCareGuide" style="padding: 60px 20px; background: #ffffff; border-top: 1px solid #ebdccb;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 700;">Artisanal Care & Bridal Comfort</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 3vw, 2.2rem); color: #2e2216; margin-top: 8px;">Preserving & Styling Your Temple Vaddanam for 8-Hour Muhurtham Rituals</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 16px auto;"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 30px;">
        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="shield-check" style="width: 20px; height: 20px; color: #8B6914;"></i> Zero-Snag Inner Casing Polish
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            Heavy Kanjivaram bridal silks woven with genuine gold zari threads can easily snag on poorly finished metal burrs. Sri Kannika’s master karigars apply a proprietary 3-stage mirror-buffing polish to the reverse inner casing of every Nakshi temple Vaddanam. This ensures smooth surface contact that glides over silk pleats without causing a single pulled thread or fiber fuzzing during standing ceremonies.
          </p>
        </div>

        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="compass" style="width: 20px; height: 20px; color: #8B6914;"></i> Pelvic Weight Distribution Architecture
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            A wide South Indian bridal waist belt must never press uncomfortably against abdominal soft tissue. Our articulated link design transfers center medallion weight directly downward across the anterior pelvic crest. This structural balance maintains posture elegance throughout the 7 pheras, Sapthapadi vows, and extended photo sessions at Bangalore reception venues.
          </p>
        </div>
      </div>

      <div style="background: #fdfbf7; border-left: 4px solid #b38728; padding: 20px 24px; border-radius: 0 10px 10px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-bottom: 6px;">Bangalore Weather Storage Instructions</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          Bangalore's monsoon and evening humidity can accelerate oxidation if jewellery is kept in acidic cardboard or adhesive velvet boxes. Always store your 1-gram micro gold temple Vaddanam wrapped inside unbleached pure cotton muslin or muslin saree bags alongside silica desiccants to preserve 24K luster for generations.
        </p>
      </div>
    </div>
  </section>
`
  },

  'bridal-matha-patti-maang-tikka.html': {
    targetMarker: '<!-- --- Specialized Bridal Categories Hub --- -->',
    html: `
  <!-- --- Hair Prep & Security Techniques --- -->
  <section class="section" id="hairPrepSecurityGuide" style="padding: 60px 20px; background: #ffffff; border-top: 1px solid #ebdccb;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 700;">Bridal Styling Mastery</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 3vw, 2.2rem); color: #2e2216; margin-top: 8px;">Bridal Hair Preparation & Security Techniques for All-Day Wear</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 16px auto;"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 30px;">
        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="scissors" style="width: 20px; height: 20px; color: #8B6914;"></i> Backcombed Anchor Base Construction
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            To keep a heavy Kundan or antique temple Maang Tikka firmly anchored without swinging sideways during movement, create a dense 1-inch backcombed cushion directly underneath your central hair parting. Secure two crisscrossed matte bobby pins against the natural hair root, looping the tikka’s tail hook directly under the pin intersection for an unshakeable mechanical lock.
          </p>
        </div>

        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="sparkles" style="width: 20px; height: 20px; color: #8B6914;"></i> Chemical & Setting Spray Safeguard
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            Aerosol hair setting sprays, facial setting mists, and synthetic perfumes contain alcohols and silicones that can pit micro-gold layers and cloud genuine Kemp cabochons. Ensure your bridal hair stylist completes all hair curling, backcombing, and spray setting at least 15 minutes before crowning your forehead with our artisanal Matha Patti.
          </p>
        </div>
      </div>

      <div style="background: #fdfbf7; border-left: 4px solid #b38728; padding: 20px 24px; border-radius: 0 10px 10px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-bottom: 6px;">Tension-Free Temple Positioning</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          When pinning multi-layered Sheeshpatti chains along the hairline, allow a natural microscopic curvature rather than pulling side chains taut. Taut tension causes scalp fatigue and headaches during 6-hour rituals. Sri Kannika’s lightweight flexible side links contour effortlessly to natural cranial contours.
        </p>
      </div>
    </div>
  </section>
`
  },

  'antique-vanki-baajuband.html': {
    targetMarker: '<!-- --- Specialized Bridal Categories Hub --- -->',
    html: `
  <!-- --- Blouse Sleeve Compatibility & Fitting Guide --- -->
  <section class="section" id="vankiStylingGuide" style="padding: 60px 20px; background: #ffffff; border-top: 1px solid #ebdccb;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 700;">Bridal Blouse Harmonization</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 3vw, 2.2rem); color: #2e2216; margin-top: 8px;">Blouse Sleeve Compatibility & Anti-Slip Armlet Anchoring</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 16px auto;"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 30px;">
        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="layers" style="width: 20px; height: 20px; color: #8B6914;"></i> Maggam Work & Sleeve Length Rules
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            For elbow-length bridal blouses adorned with heavy Aari or Maggam zardozi embroidery, position your antique Vanki approximately 1.5 to 2 inches above the sleeve cuff border. This prevents the pointed bottom apex of traditional V-shaped armlets from colliding with raised bullion threadwork, creating an elongated arm silhouette in wedding close-ups.
          </p>
        </div>

        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="shield" style="width: 20px; height: 20px; color: #8B6914;"></i> Anti-Pinch Ergonomic Inner Edge
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            Brides often experience painful skin pinching during active rituals like the Kashi Yatra, garlanding, and ungaram ring search. Sri Kannika hand-rounds every reverse metal rim of our antique bajubands with beveled micro-curves that adapt smoothly to bicep contraction, eliminating bruises or red marks even after 10 continuous hours of wear.
          </p>
        </div>
      </div>

      <div style="background: #fdfbf7; border-left: 4px solid #b38728; padding: 20px 24px; border-radius: 0 10px 10px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-bottom: 6px;">Malleable Core Calibration</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          Our proprietary annealed copper-brass core permits gentle, uniform contouring around your upper arm bicep without metal fatigue or creasing. Simply press inward with gentle palm pressure for a snug custom fit that never slips down your arm during Muhurtham blessings.
        </p>
      </div>
    </div>
  </section>
`
  },

  'wedding-glass-bangle-stacks.html': {
    targetMarker: '<!-- --- Specialized Bridal Categories Hub --- -->',
    html: `
  <!-- --- Sonic Resonance & Sourcing Guide --- -->
  <section class="section" id="glassBangleScience" style="padding: 60px 20px; background: #ffffff; border-top: 1px solid #ebdccb;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 700;">Vedic Tradition & Material Craft</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 3vw, 2.2rem); color: #2e2216; margin-top: 8px;">Glass Bangle Sourcing, Sonic Resonance & Longevity in Bangalore Weddings</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 16px auto;"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 30px;">
        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="music" style="width: 20px; height: 20px; color: #8B6914;"></i> Auspicious Sonic Resonance (Chooda Nada)
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            In traditional South Indian wedding philosophy, the gentle rhythmic chiming of pristine glass bangles (known as Chooda Nada) is revered as an auspicious acoustic shield. The high-frequency sonic resonance created when unbroken glass circles tap together disperses nervous bride tension, fosters emotional serenity, and creates a tranquil atmosphere during sacred Vedic wedding mantras.
          </p>
        </div>

        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="flame" style="width: 20px; height: 20px; color: #8B6914;"></i> High-Tensile Thermal Resilient Glass
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            Cheap industrial glass bangles frequently crack under the intense thermal radiation of sacred wedding homa fires. Sri Kannika procures exclusively kiln-fired, high-density raw glass bangles from premier heritage artisan kilns. Each piece is slowly cooled to eliminate microscopic internal air bubbles, ensuring superior shatter-resistance and vivid emerald or crimson transparency.
          </p>
        </div>
      </div>

      <div style="background: #fdfbf7; border-left: 4px solid #b38728; padding: 20px 24px; border-radius: 0 10px 10px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-bottom: 6px;">Zero-Breakage Mandap Donning Technique</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          Our Malleshwaram boutique staff are trained in rapid, zero-breakage bangle stacking. By wrapping the bride’s knuckles in talc-free surgical silk slips, a 24-piece bridal glass stack with micro gold kadas can be positioned effortlessly on both wrists in under two minutes without pulling mehendi skin or cracking a single bangle.
        </p>
      </div>
    </div>
  </section>
`
  },

  'wedding-return-gifts-bangles-bangalore.html': {
    targetMarker: '<!-- --- Specialized Bridal Categories Hub --- -->',
    html: `
  <!-- --- Bangalore Venue Logistics & Thamboolam Assembly --- -->
  <section class="section" id="thamboolamAssemblyGuide" style="padding: 60px 20px; background: #ffffff; border-top: 1px solid #ebdccb;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 700;">Event Host Logistics Guide</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 3vw, 2.2rem); color: #2e2216; margin-top: 8px;">Bangalore Venue Logistics, Packaging & Thamboolam Assembly Guide</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 16px auto;"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 30px;">
        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="truck" style="width: 20px; height: 20px; color: #8B6914;"></i> Direct Choultry & Hall Coordination
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            Hosting large guest gatherings at Palace Grounds, Gayatri Vihar, Princess Shrine, or South Bangalore kalyana mantapas requires impeccable punctuality. Sri Kannika provides dedicated direct-to-venue dispatch across Bangalore. Bulk wedding return gift boxes are packed with cushioned partitions and delivered 24 hours prior to the main Varapooja or reception ceremony.
          </p>
        </div>

        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="gift" style="width: 20px; height: 20px; color: #8B6914;"></i> The Auspicious Thamboolam Ensemble
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            Traditional South Indian Thamboolam gifting mandates presenting two auspicious items to married women (Sumangalis). Our return gift sets pair 2 micro gold bangles and 4 emerald green glass bangles alongside betel leaves, fresh supari, organic turmeric/kumkum packets, and a coconut inside reusable golden zari or potli pouches that guests cherish for years.
          </p>
        </div>
      </div>

      <div style="background: #fdfbf7; border-left: 4px solid #b38728; padding: 20px 24px; border-radius: 0 10px 10px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-bottom: 6px;">Post-Event Size Exchange Guarantee</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          Never worry about surplus or leftover sizes. Sri Kannika offers wedding families a unique 7-day post-event size exchange guarantee at our Malleshwaram store, allowing your close relatives to exchange any unworn, sealed gift boxes for their exact wrist measurements at zero extra cost.
        </p>
      </div>
    </div>
  </section>
`
  },

  'south-indian-bridal-jewellery-set.html': {
    targetMarker: '<!-- --- Specialized Bridal Categories Hub --- -->',
    html: `
  <!-- --- Wedding Day Timeline & Jewellery Transition Plan --- -->
  <section class="section" id="bridalTimelineGuide" style="padding: 60px 20px; background: #ffffff; border-top: 1px solid #ebdccb;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #b38728; font-weight: 700;">Muhurtham to Reception Masterclass</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 3vw, 2.2rem); color: #2e2216; margin-top: 8px;">Comprehensive Wedding Day Timeline & Jewellery Transition Plan</h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 16px auto;"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 30px;">
        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="clock" style="width: 20px; height: 20px; color: #8B6914;"></i> 45-Minute Rapid Ceremony Transitions
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            Bangalore weddings often transition swiftly from morning traditional Muhurtham rituals into grand evening receptions. Our 7-piece complete bridal suites are modularly engineered: detach the heavy temple Vaddanam and long Nakshi haram, keep the Kemp choker as an antique statement, and layer with high-brilliance Kundan or AD diamond earrings to effortlessly transform into a contemporary cocktail look in under 45 minutes.
          </p>
        </div>

        <div style="background: #faf7f2; border: 1px solid #ebdccb; border-radius: 12px; padding: 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="camera" style="width: 20px; height: 20px; color: #8B6914;"></i> 4K Strobe & Cinematic Flash Optimization
          </h3>
          <p style="font-size: 0.95rem; color: #4a3b2c; line-height: 1.65; margin: 0;">
            High-gloss jewelry often creates harsh white glare spots under intense wedding photography flash units, obscuring facial features. Sri Kannika’s signature antique matte 24K micro-gold finish absorbs and diffuses harsh camera flashes, ensuring warm, regal golden tones in high-definition 4K photography and 8K wedding cinema reels.
          </p>
        </div>
      </div>

      <div style="background: #fdfbf7; border-left: 4px solid #b38728; padding: 20px 24px; border-radius: 0 10px 10px 0;">
        <h3 style="font-family: 'Cinzel', serif; font-size: 1.05rem; color: #2e2216; margin-bottom: 6px;">Lifetime Re-Polishing & Safe Travel Trunk</h3>
        <p style="font-size: 0.92rem; color: #5c4a35; line-height: 1.6; margin: 0;">
          Every complete South Indian bridal set is delivered in our cushioned velvet-lined bridal organizer trunk with custom fitted slots for each ornament. Best of all, Sri Kannika provides lifetime micro-gold re-polishing support at our Malleshwaram workshop, keeping your wedding trousseau radiant for upcoming family festivals.
        </p>
      </div>
    </div>
  </section>
`
  }
};

console.log('Starting content addition of 200+ words to all 7 new pages...');

for (const [filename, data] of Object.entries(additions)) {
  const filePath = path.join(__dirname, '..', filename);
  if (!fs.existsSync(filePath)) {
    console.error('File not found: ' + filename);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find where "Explore Specialized Bridal Categories" is located
  const catIdx = content.indexOf('Explore Specialized Bridal Categories');
  if (catIdx !== -1) {
    // Find the opening <section tag right before catIdx
    const lastSectionIdx = content.lastIndexOf('<section', catIdx);
    if (lastSectionIdx !== -1) {
      content = content.slice(0, lastSectionIdx) + data.html + '\n  ' + content.slice(lastSectionIdx);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✅ Added 200+ words to: ' + filename);
      continue;
    }
  }
  console.warn('⚠️ Could not find section before categories in ' + filename);
}

console.log('All 7 new pages enriched with 200+ additional words!');

