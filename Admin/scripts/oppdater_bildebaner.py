import json
from pathlib import Path

json_path = Path("assets/data/butikker.json")
bilder_path = Path("assets/images/butikker-webp")

# Last inn JSON-data
with open(json_path, "r", encoding="utf-8") as f:
    butikker = json.load(f)

# Hent tilgjengelige bilde-filer
bilder = {f.stem.lower(): f.name for f in bilder_path.glob("*.webp")}

oppdatert = 0

for butikk in butikker:
    # Lag en søkenøkkel som matcher lettere
    navn_key = butikk["name"].lower().replace(" ", "").replace("-", "").replace(".", "")
    
    # Finn bilde som matcher nøkkelen
    match = next((filename for key, filename in bilder.items() if navn_key in key), None)
    
    if match:
        ny_sti = f"assets/images/butikker-webp/{match}"
        if butikk["image"] != ny_sti:
            butikk["image"] = ny_sti
            oppdatert += 1

# Lagre tilbake
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(butikker, f, ensure_ascii=False, indent=2)

print(f"✅ Oppdaterte bildebane for {oppdatert} butikker.")
