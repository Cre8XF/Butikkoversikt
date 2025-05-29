import json
import os
from urllib.parse import urlparse

# Sti til JSON-fil og bildekatalog
JSON_FIL = "assets/data/butikker.json"
BILDEMAPPE = "assets/images/butikker-webp/"
OUTPUT_FIL = "manglende-logoer-clearbit-urls.json"

# Last inn butikker
with open(JSON_FIL, "r", encoding="utf-8") as f:
    butikker = json.load(f)

manglende = []

for butikk in butikker:
    bilde_filnavn = butikk["image"].split("/")[-1]
    bilde_path = os.path.join(BILDEMAPPE, bilde_filnavn)

    if not os.path.exists(bilde_path):
        # Hent domenenavn for Clearbit-URL
        parsed_url = urlparse(butikk["url"])
        domain = parsed_url.netloc.replace("www.", "")
        clearbit_logo = f"https://logo.clearbit.com/{domain}"

        manglende.append({
            "name": butikk["name"],
            "image": bilde_path.replace("\\", "/"),
            "clearbitUrl": clearbit_logo
        })

# Lagre utdata
with open(OUTPUT_FIL, "w", encoding="utf-8") as f:
    json.dump(manglende, f, indent=2, ensure_ascii=False)

print(f"{len(manglende)} manglende logoer funnet. Lagret til {OUTPUT_FIL}")
