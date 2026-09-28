const fs = require('fs');

console.log('Enriching pages with deep FAQ accordions, comparison matrices, and high-ranking editorial sections...');

const anchor = '<section class="section" style="background: #FAF7F2; padding: 60px 20px; border-top: 1px solid rgba(212,175,55,0.2);">';

// 1. Enrich bridal-matha-patti-maang-tikka.html
let mathaPatti = fs.readFileSync('bridal-matha-patti-maang-tikka.html', 'utf8');

const mathaPattiFaqAndHairstyle = `
  <!-- --- Section: Hairstyle Compatibility Matrix --- -->
  <section style="padding: 60px 20px; background: #faf7f2;">
    <div class="container" style="max-width: 960px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Hairstyle Harmony</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          Bridal Hairstyle Compatibility Matrix
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="background: #fff; border-radius: 12px; border: 1px solid #ebdccb; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.93rem;">
          <thead>
            <tr style="background: #2e2216; color: #f7e7ce; font-family: 'Cinzel', serif;">
              <th style="padding: 14px 16px;">Bridal Hairstyle</th>
              <th style="padding: 14px 16px;">Recommended Forehead Ornament</th>
              <th style="padding: 14px 16px;">Styling &amp; Pinning Protocol</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0eae1;">
              <td style="padding: 14px 16px; font-weight: 600;">Traditional Jadai Braid with Poola Jada</td>
              <td style="padding: 14px 16px; color: #8B6914; font-weight: 600;">Temple Nethi Chutti with Kemp Rubies</td>
              <td style="padding: 14px 16px;">Anchor center hook directly into the base of the braid; weave fresh Mallige (jasmine) flowers over side chains.</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0eae1; background: #faf7f2;">
              <td style="padding: 14px 16px; font-weight: 600;">Low Textured Floral Bun (Chignon)</td>
              <td style="padding: 14px 16px; color: #8B6914; font-weight: 600;">Multi-Tier Kundan Sheeshpatti</td>
              <td style="padding: 14px 16px;">Rest the triple bands like a royal tiara 1 inch behind the hairline, securing side loops into the bun pins.</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0eae1;">
              <td style="padding: 14px 16px; font-weight: 600;">Open Glamour Waves / Half-Updo</td>
              <td style="padding: 14px 16px; color: #8B6914; font-weight: 600;">Solitary Chandbali Maang Tikka</td>
              <td style="padding: 14px 16px;">Backcomb a small center crown section, pin the solitary chain flat, and allow side curls to flow naturally.</td>
            </tr>
            <tr>
              <td style="padding: 14px 16px; font-weight: 600;">Sangeet High Messy Puff</td>
              <td style="padding: 14px 16px; color: #8B6914; font-weight: 600;">Antique Rajasthani Borla with Pearl String</td>
              <td style="padding: 14px 16px;">Seat the circular borla directly at the peak of the forehead; the pearl string passes over the puff crown.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- --- Section: FAQs --- -->
  <section style="padding: 60px 20px; background: #ffffff;">
    <div class="container" style="max-width: 860px;">
      <div style="text-align: center; margin-bottom: 36px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Expert Answers</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          Bridal Matha Patti &amp; Maang Tikka FAQs
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">Will a heavy Matha Patti cause headaches during long rituals?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            No. Sri Kannika forehead jewellery is cast using lightweight copper alloys with hollowed reverse cavities, reducing weight by over 40% compared to heavy traditional brass pieces. The weight is distributed evenly across multiple hair anchors so you experience zero tension headaches.
          </p>
        </div>
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">Can I wear a Matha Patti with glasses or a veil?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Yes. For brides wearing a bridal dupatta or veil, our side bands sit flush against the skull so the sheer fabric drapes smoothly over without snagging. If you wear glasses, we recommend our sleek single-chain Sheeshpatti to ensure comfortable temple clearance.
          </p>
        </div>
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">How do I match my forehead jewellery with my choker and earrings?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Our Malleshwaram artisans ensure matching metal undertones (antique matte gold, yellow micro gold, or Meenakari white) and identical Kemp ruby or pearl shades so your entire bridal facial frame looks cohesive and regal.
          </p>
        </div>
      </div>
    </div>
  </section>
`;

if (!mathaPatti.includes('Bridal Hairstyle Compatibility Matrix')) {
  mathaPatti = mathaPatti.replace(anchor, `${mathaPattiFaqAndHairstyle}\n\n  ${anchor}`);
  fs.writeFileSync('bridal-matha-patti-maang-tikka.html', mathaPatti, 'utf8');
  console.log('✅ Enriched bridal-matha-patti-maang-tikka.html');
}

// 2. Enrich antique-vanki-baajuband.html
let vanki = fs.readFileSync('antique-vanki-baajuband.html', 'utf8');

const vankiMotifsAndFaqs = `
  <!-- --- Section: The 4 Iconic Vanki Motifs --- -->
  <section style="padding: 60px 20px; background: #faf7f2;">
    <div class="container" style="max-width: 960px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Heritage Iconography</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          The 4 Traditional South Indian Bridal Vanki Motifs
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 8px;">Gajalakshmi Nakshi Vanki</h3>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            Goddess of wealth flanked by royal elephants. Hand-carved repoussé embossing with Kemp ruby floral clusters, invoking divine abundance for the new bride.
          </p>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 8px;">Twin Mayur (Peacock) Vanki</h3>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            Facing peacocks with ornate trailing plumage. Adorned with emerald drops and antique matte gold polish, reflecting grace and beauty on the bridal arm.
          </p>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 8px;">Sheshnaag Cobra Finials</h3>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            Protective coiled cobra motifs hugging both sides of the bicep. An ancient martial and royal talisman guarding the bride from negative influences.
          </p>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 8px;">Contemporary Kundan Bajuband</h3>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            Flexible Meenakari-backed Kundan slabs with dangling basra pearl tassels. Favored for modern reception evening gowns and sleeveless blouses.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- --- Section: FAQs --- -->
  <section style="padding: 60px 20px; background: #ffffff;">
    <div class="container" style="max-width: 860px;">
      <div style="text-align: center; margin-bottom: 36px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Helpful Guidance</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          Antique Vanki &amp; Baajuband FAQs
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">How do I measure my bicep for an armlet?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Wear your wedding blouse and wrap a flexible tailor's tape around your upper bicep muscle midway between your elbow and shoulder. Standard Indian bridal arm sizes range from 10 inches to 13.5 inches. Our spring bands flex comfortably across this entire spectrum.
          </p>
        </div>
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">Are bridal Vankis sold as single pieces or pairs?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Traditionally, South Indian brides wear a single Vanki on the right arm (facing the holy sacred fire during Muhurtham). However, many modern brides choose symmetrical twin pairs for balanced royal portrait photography. We offer both single pieces and matched pairs.
          </p>
        </div>
      </div>
    </div>
  </section>
`;

if (!vanki.includes('The 4 Traditional South Indian Bridal Vanki Motifs')) {
  vanki = vanki.replace(anchor, `${vankiMotifsAndFaqs}\n\n  ${anchor}`);
  fs.writeFileSync('antique-vanki-baajuband.html', vanki, 'utf8');
  console.log('✅ Enriched antique-vanki-baajuband.html');
}

// 3. Enrich wedding-glass-bangle-stacks.html
let glass = fs.readFileSync('wedding-glass-bangle-stacks.html', 'utf8');

const glassRitualsAndFaqs = `
  <!-- --- Section: South Indian Wedding Bangle Rituals --- -->
  <section style="padding: 60px 20px; background: #faf7f2;">
    <div class="container" style="max-width: 960px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Living Traditions</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          South Indian Wedding Bangle Rituals &amp; Celebrations
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 20px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #1c5234; margin-bottom: 8px;">Kannada Bale Shastra</h3>
          <p style="color: #554433; font-size: 0.9rem; line-height: 1.6;">
            A joyous pre-wedding celebration where the maternal uncle and elder sumangalis adorn the bride's wrists with auspicious green and red glass bangles along with turmeric and betel nuts.
          </p>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B1A1A; margin-bottom: 8px;">Tamil Valaikaapu</h3>
          <p style="color: #554433; font-size: 0.9rem; line-height: 1.6;">
            The sacred bangles ceremony invoking divine blessings for mother and baby. Hundreds of green and red glass churis are stacked on both arms to ward off negative vibrations through harmonious chimes.
          </p>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 8px;">Telugu Gajula Utsavam</h3>
          <p style="color: #554433; font-size: 0.9rem; line-height: 1.6;">
            Traditional bridal blessing where female relatives gift hand-selected glass bangles to the bride, each whispering heartfelt prayers for lifelong happiness and marital prosperity.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- --- Section: FAQs --- -->
  <section style="padding: 60px 20px; background: #ffffff;">
    <div class="container" style="max-width: 860px;">
      <div style="text-align: center; margin-bottom: 36px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Common Queries</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          Bridal Glass Bangle Stacks FAQs
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">Should I order the same size for glass bangles as metal kadas?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Because glass bangles have zero flexibility, we recommend choosing <strong>one size up</strong> (for example, size 2.6 in glass if your metal kada size is 2.4). This ensures the bangles slide smoothly over your knuckles without any risk of pinching or breaking during busy wedding events.
          </p>
        </div>
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">What happens if a glass bangle breaks during transit?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Sri Kannika guarantees <strong>100% zero-breakage delivery</strong>. Every set is bubble-wrapped in shockproof air cushions. In the rare event of transit damage, simply WhatsApp us a quick unboxing video and we will dispatch a free replacement within 24 hours across Bangalore.
          </p>
        </div>
      </div>
    </div>
  </section>
`;

if (!glass.includes('South Indian Wedding Bangle Rituals & Celebrations')) {
  glass = glass.replace(anchor, `${glassRitualsAndFaqs}\n\n  ${anchor}`);
  fs.writeFileSync('wedding-glass-bangle-stacks.html', glass, 'utf8');
  console.log('✅ Enriched wedding-glass-bangle-stacks.html');
}

// 4. Enrich wedding-return-gifts-bangles-bangalore.html
let gifts = fs.readFileSync('wedding-return-gifts-bangles-bangalore.html', 'utf8');

const giftsVenuesAndFaqs = `
  <!-- --- Section: Bangalore Choultry Delivery & Logistics --- -->
  <section style="padding: 60px 20px; background: #faf7f2;">
    <div class="container" style="max-width: 960px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Citywide Logistics</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          Direct Delivery to Bangalore Wedding Choultries &amp; Convention Centers
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
        <p style="color: #665235; font-size: 0.95rem; max-width: 680px; margin: 0 auto; line-height: 1.6;">
          Save precious wedding preparation time. Sri Kannika delivers bulk return gift cartons directly to your wedding venue coordinator in Bangalore:
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
        <div style="background: #fff; padding: 18px; border-radius: 10px; border: 1px solid #ebdccb; text-align: center;">
          <h4 style="font-family: 'Cinzel', serif; font-size: 1rem; color: #2e2216; margin-bottom: 4px;">Palace Grounds</h4>
          <span style="color: #8B6914; font-size: 0.85rem; font-weight: 600;">Gayatri Vihar, Princess Shrine</span>
        </div>
        <div style="background: #fff; padding: 18px; border-radius: 10px; border: 1px solid #ebdccb; text-align: center;">
          <h4 style="font-family: 'Cinzel', serif; font-size: 1rem; color: #2e2216; margin-bottom: 4px;">Malleshwaram</h4>
          <span style="color: #8B6914; font-size: 0.85rem; font-weight: 600;">Canara Union, Sri Rama Mandira</span>
        </div>
        <div style="background: #fff; padding: 18px; border-radius: 10px; border: 1px solid #ebdccb; text-align: center;">
          <h4 style="font-family: 'Cinzel', serif; font-size: 1rem; color: #2e2216; margin-bottom: 4px;">Jayanagar &amp; JP Nagar</h4>
          <span style="color: #8B6914; font-size: 0.85rem; font-weight: 600;">Parijatha, MLR Convention</span>
        </div>
        <div style="background: #fff; padding: 18px; border-radius: 10px; border: 1px solid #ebdccb; text-align: center;">
          <h4 style="font-family: 'Cinzel', serif; font-size: 1rem; color: #2e2216; margin-bottom: 4px;">Whitefield &amp; Outer Ring Rd</h4>
          <span style="color: #8B6914; font-size: 0.85rem; font-weight: 600;">Prestige Srihari, Elaan</span>
        </div>
      </div>
    </div>
  </section>

  <!-- --- Section: FAQs --- -->
  <section style="padding: 60px 20px; background: #ffffff;">
    <div class="container" style="max-width: 860px;">
      <div style="text-align: center; margin-bottom: 36px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Event Planning FAQs</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          Wedding Return Gifts Bangles FAQs
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">How many days in advance should I place bulk return gift orders?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            For standard Thamboolam packs of 50 to 250 sets, we fulfill orders within 48 to 72 hours. For custom silk thread color matching or personalized bride/groom name tags on Potlis, we recommend ordering 7 to 10 days before your wedding ceremony.
          </p>
        </div>
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">Can we return or exchange unused leftover bangles after the wedding?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Yes, Sri Kannika allows return or exchange of up to 15% of unopened, intact return gift packages within 7 days following your wedding reception, giving you complete financial flexibility.
          </p>
        </div>
      </div>
    </div>
  </section>
`;

if (!gifts.includes('Direct Delivery to Bangalore Wedding Choultries')) {
  gifts = gifts.replace(anchor, `${giftsVenuesAndFaqs}\n\n  ${anchor}`);
  fs.writeFileSync('wedding-return-gifts-bangles-bangalore.html', gifts, 'utf8');
  console.log('✅ Enriched wedding-return-gifts-bangles-bangalore.html');
}

// 5. Enrich south-indian-bridal-jewellery-set.html
let bridalSet = fs.readFileSync('south-indian-bridal-jewellery-set.html', 'utf8');

const bridalSetHarmonyAndFaqs = `
  <!-- --- Section: Saree Color Harmonization Matrix --- -->
  <section style="padding: 60px 20px; background: #faf7f2;">
    <div class="container" style="max-width: 960px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Color Theory</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          Muhurtham Saree &amp; Jewellery Color Harmonization Matrix
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #992222; margin-bottom: 8px;">Crimson Red &amp; Gold Zari</h3>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            <strong>Jewellery Pairing:</strong> Deep Antique Matte 24K Micro Gold with Chidambaram Kemp Rubies and South Sea clustered pearl drops. Creates a timeless royal contrast.
          </p>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #1c5234; margin-bottom: 8px;">Parrot Green &amp; Rani Pink</h3>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            <strong>Jewellery Pairing:</strong> Dual-tone Kemp Emerald and Ruby Nakshi Kasumala with twin peacock motif Vanki and Goddess Lakshmi Ottiyanam.
          </p>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #8B6914; margin-bottom: 8px;">Mustard Yellow &amp; Maroon</h3>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            <strong>Jewellery Pairing:</strong> Warm 1-Gram micro gold plating with uncut Polki stones and deep maroon spinel cabochons for radiant ceremony warmth.
          </p>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #ebdccb;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #1a3c66; margin-bottom: 8px;">Peacock Royal Blue &amp; Violet</h3>
          <p style="color: #665235; font-size: 0.9rem; line-height: 1.6;">
            <strong>Jewellery Pairing:</strong> High-sparkle AD Diamond and CZ choker set paired with antique matte gold Vaddanam and hanging chandelier jhumkas.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- --- Section: FAQs --- -->
  <section style="padding: 60px 20px; background: #ffffff;">
    <div class="container" style="max-width: 860px;">
      <div style="text-align: center; margin-bottom: 36px;">
        <span style="color: #b38728; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px;">Bride Essentials</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; color: #2e2216; margin-top: 6px;">
          South Indian Bridal Jewellery Set FAQs
        </h2>
        <div style="width: 60px; height: 2px; background: #d4af37; margin: 12px auto;"></div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">Should I buy or rent my South Indian bridal jewellery set?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Rental sets often cost ₹6,000 to ₹12,000 for just 24 hours and carry strict late penalties, missing stone charges, and hygiene concerns from multiple prior wears. At Sri Kannika, you can <strong>own your complete brand-new 7-piece handcrafted bridal set for ₹12,500 to ₹28,500</strong>, keeping it forever as an heirloom for future family celebrations.
          </p>
        </div>
        <div style="background: #fdfaf5; border: 1px solid #ebdccb; border-radius: 10px; padding: 20px 24px;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: #2e2216; margin-bottom: 8px;">Does Sri Kannika offer lifetime polish support?</h3>
          <p style="color: #665235; font-size: 0.92rem; line-height: 1.6; margin: 0;">
            Yes! All Sri Kannika bridal suites come with our Malleshwaram boutique guarantee. We offer complimentary inspection and affordable micro-gold re-polishing services whenever you wish to refresh your jewellery for future anniversaries or family weddings.
          </p>
        </div>
      </div>
    </div>
  </section>
`;

if (!bridalSet.includes('Muhurtham Saree & Jewellery Color Harmonization Matrix')) {
  bridalSet = bridalSet.replace(anchor, `${bridalSetHarmonyAndFaqs}\n\n  ${anchor}`);
  fs.writeFileSync('south-indian-bridal-jewellery-set.html', bridalSet, 'utf8');
  console.log('✅ Enriched south-indian-bridal-jewellery-set.html');
}

console.log('All 5 pages enriched successfully!');
