import os
import json

# Bildekatalog
bildekatalog = "assets/images/butikker-webp"
output_fil = "assets/data/butikker-webp-index.json"

# Finn .webp-filer
webp_filer = [f for f in os.listdir(bildekatalog) if f.lower().endswith(".webp")]

# Skriv til JSON
with open(output_fil, "w", encoding="utf-8") as f:
    json.dump(webp_filer, f, indent=2, ensure_ascii=False)

print(f"✅ Skrev {len(webp_filer)} bildefiler til '{output_fil}'")