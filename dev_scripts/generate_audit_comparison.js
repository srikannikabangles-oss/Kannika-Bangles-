const fs = require('fs');
const path = require('path');

const sm = JSON.parse(fs.readFileSync('seomonster_technical_audit_results.json', 'utf8'));
const bs = JSON.parse(fs.readFileSync('C:\\Users\\KIIT0001\\beyondseo_audit_kannika_findings\\audit.json', 'utf8'));

console.log('=======================================================');
console.log('       SEO MONSTER & BEYONDSEO TECHNICAL AUDIT         ');
console.log('=======================================================');

console.log('\n[1] ROBOTS.TXT DIAGNOSTICS (SEO Monster)');
console.log('    Status:', sm.robots_audit.data.status);
console.log('    Disallowed Rules Count:', sm.robots_audit.data.groups[0].rules.filter(r => r.type === 'disallow').length);
console.log('    Sitemaps Declared:', sm.robots_audit.data.sitemaps);
console.log('    Findings:', sm.robots_audit.data.findings);

console.log('\n[2] SITEMAP.XML DIAGNOSTICS (SEO Monster)');
console.log('    Status:', sm.sitemap_audit.data.kind);
console.log('    Entry Count:', sm.sitemap_audit.data.entry_count);
console.log('    Missing Lastmod:', sm.sitemap_audit.data.missing_lastmod_count);
console.log('    Cross-host check note:', sm.sitemap_audit.data.findings);

console.log('\n[3] AI CITATION READINESS (SEO Monster - KDD 2024 Framework)');
const ai = sm.ai_readiness.data;
console.log('    Rendered Blind (SSR vs SPA):', ai.rendered_blind);
console.log('    Server Word Count:', ai.word_count);
console.log('    AI Readiness Score:', ai.readiness.score * 100 + '% (' + ai.readiness.band.toUpperCase() + ')');
console.log('    Extractable Score:', ai.readiness.components.extractable);
console.log('    Statistics Density:', ai.readiness.components.statistics);
console.log('    Cited Sources:', ai.readiness.components.cited_sources);
console.log('    Keyword Stuffing Flagged:', ai.stuffing.flagged, '(Top Term Ratio:', (ai.stuffing.top_term_ratio * 100).toFixed(2) + '%)');

console.log('\n[4] BEYONDSEO CRAWL & TECHNICAL AUDIT');
console.log('    Total URLs Crawled:', bs.crawl_coverage.attempted_urls);
console.log('    HTML Documents Validated:', bs.crawl_coverage.html_documents);
console.log('    Total Discovered URLs:', bs.crawl_coverage.discovered_urls);
console.log('    HTTP Errors / 4xx / 5xx:', bs.crawl_coverage.failed_or_http_error_urls);
console.log('    High Severity Defects:', bs.crawl_coverage.severity_counts.high || 0);
console.log('    Medium Severity Defects:', bs.crawl_coverage.severity_counts.medium || 0);
console.log('    Low Severity Items:', bs.crawl_coverage.severity_counts.low || 0);
console.log('    Info Items:', bs.crawl_coverage.severity_counts.info || 0);

console.log('\n[5] INDIVIDUAL BRIDAL PAGES & HOME PAGE AUDIT (SEO Monster + BeyondSEO)');
sm.page_audits.forEach((p, idx) => {
  const meta = (p.meta && p.meta.data) || {};
  const schema = (p.schema && p.schema.data) || {};
  const val = (p.schema_validation && p.schema_validation.data) || {};
  const canon = (p.canonical && p.canonical.data) || {};
  const mixed = (p.mixed_content && p.mixed_content.data) || {};

  console.log(`\n--- [Page ${idx + 1}] ${p.name} ---`);
  console.log('    Path:', p.url.replace('http://localhost:3001', ''));
  console.log('    HTTP Status:', meta.status);
  console.log('    Title Tag (' + meta.title_length + ' chars):', meta.title);
  console.log('    Meta Description (' + meta.meta_description_length + ' chars):', meta.meta_description);
  console.log('    H1 Tag Count:', meta.h1_count, meta.h1_count === 1 ? '✅ (Perfect Single H1)' : '⚠️ (Review H1 structure)');
  console.log('    Canonical Target:', meta.canonical);
  console.log('    Canonical Verdict:', canon.verdict || 'is_canonical');
  console.log('    OpenGraph Title:', meta.open_graph ? meta.open_graph['og:title'] : 'None');
  console.log('    OpenGraph Image:', meta.open_graph ? meta.open_graph['og:image'] : 'None');
  console.log('    Twitter Card:', meta.twitter ? meta.twitter['twitter:card'] : 'None');
  console.log('    Mixed Content Issues:', mixed.findings ? mixed.findings.length : 0);
  console.log('    JSON-LD Schema Blocks:', schema.block_count || 0);
  if (schema.schemas) {
    const types = [];
    schema.schemas.forEach(s => {
      if (s['@type']) types.push(s['@type']);
      if (s['@graph']) s['@graph'].forEach(g => types.push(g['@type']));
    });
    console.log('    Structured Data Types Detected:', Array.from(new Set(types)).join(', '));
  }
});
