import json
import sys
from typing import Dict, Any, List

from seo_mcp.clients.http import build_http_client
from seo_mcp.config import load_config
from seo_mcp.tools import onpage_tools, schema_tools, robots_tools, sitemap_tools, ai_readiness_tools

config = load_config()
http_client = build_http_client()
clients = {"http": http_client}

PAGES = [
    {"name": "Home Page", "url": "http://localhost:3001/"},
    {"name": "Bridal Jewellery Bangalore", "url": "http://localhost:3001/bridal-jewellery-bangalore"},
    {"name": "Temple Jewellery Bangalore", "url": "http://localhost:3001/temple-jewellery-bangalore"},
    {"name": "Muhurtham Jewellery Bangalore", "url": "http://localhost:3001/muhurtham-jewellery-bangalore"},
    {"name": "Reception & Sangeet Jewellery", "url": "http://localhost:3001/reception-and-sangeet-jewellery-bangalore"},
    {"name": "Haldi & Mehendi Jewellery", "url": "http://localhost:3001/haldi-and-mehendi-jewellery-bangalore"},
    {"name": "CZ & AD Diamond Jewellery", "url": "http://localhost:3001/cz-and-ad-diamond-jewellery-bangalore"},
    {"name": "Kundan & Jadau Jewellery", "url": "http://localhost:3001/kundan-and-jadau-jewellery-bangalore"},
    {"name": "Antique Matte Finish Jewellery", "url": "http://localhost:3001/antique-matte-finish-jewellery-bangalore"},
    {"name": "Bridal Bangles & Kadas", "url": "http://localhost:3001/bangles"},
    {"name": "Bridal Necklaces & Chokers", "url": "http://localhost:3001/necklaces"},
    {"name": "Pendant Sets", "url": "http://localhost:3001/pendant-sets"},
    {"name": "Earrings & Jhumkas", "url": "http://localhost:3001/earrings"},
]

results = {
    "tool": "SEO Monster (seo_mcp)",
    "target": "http://localhost:3001",
    "pages_audited": len(PAGES),
    "robots_audit": None,
    "sitemap_audit": None,
    "ai_readiness": None,
    "page_audits": []
}

# 1. Robots.txt
try:
    print("Checking robots.txt...")
    robots_res = robots_tools.robots_txt_validate({"site_url": "http://localhost:3001"}, config, clients)
    results["robots_audit"] = robots_res
except Exception as e:
    results["robots_audit"] = {"error": str(e)}

# 2. Sitemap.xml
try:
    print("Checking sitemap.xml...")
    sitemap_res = sitemap_tools.sitemap_validate({"sitemap_url": "http://localhost:3001/sitemap.xml"}, config, clients)
    results["sitemap_audit"] = sitemap_res
except Exception as e:
    results["sitemap_audit"] = {"error": str(e)}

# 3. AI Readiness
try:
    print("Checking AI readiness...")
    ai_res = ai_readiness_tools.ai_citation_readiness({"url": "http://localhost:3001/"}, config, clients)
    results["ai_readiness"] = ai_res
except Exception as e:
    results["ai_readiness"] = {"error": str(e)}

# 4. Each Page Audit
for p in PAGES:
    url = p["url"]
    name = p["name"]
    print(f"Auditing [{name}]: {url} ...")
    page_report = {
        "name": name,
        "url": url,
        "meta": None,
        "canonical": None,
        "mixed_content": None,
        "schema": None,
        "schema_validation": None
    }
    
    try:
        page_report["meta"] = onpage_tools.inspect_meta({"url": url}, config, clients)
    except Exception as e:
        page_report["meta"] = {"error": str(e)}
        
    try:
        page_report["canonical"] = onpage_tools.check_canonical({"url": url}, config, clients)
    except Exception as e:
        page_report["canonical"] = {"error": str(e)}

    try:
        page_report["mixed_content"] = onpage_tools.mixed_content_check({"url": url}, config, clients)
    except Exception as e:
        page_report["mixed_content"] = {"error": str(e)}

    try:
        page_report["schema"] = schema_tools.inspect_schema({"url": url}, config, clients)
    except Exception as e:
        page_report["schema"] = {"error": str(e)}

    try:
        page_report["schema_validation"] = schema_tools.validate_schema({"url": url}, config, clients)
    except Exception as e:
        page_report["schema_validation"] = {"error": str(e)}

    results["page_audits"].append(page_report)

output_path = "seomonster_technical_audit_results.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print(f"\n[OK] SEO Monster Audit complete! Results saved to {output_path}")
