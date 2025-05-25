import json
import os
from urllib.parse import urlparse

# Korrekte stier
json_fil = "../assets/data/Butikker.json"
bilde_mappe = "../assets/images/butikker-webp"
logg_fil = "mangler-bilder-logg.txt"

# Last inn butikkdata
with open(json_fil, "r", encoding="utf-8") as f:
    butikker = json.load(f)

# Hent tilgjengelige bilde-filer
filnavn = os.listdir(bilde_mappe)
filnavn_renset = {
    f.replace(".webp", "").replace("-", "").replace(".", "").lower(): f
    for f in filnavn
}

oppdatert = 0
mangler = []

for butikk in butikker:
    url = butikk.get("url", "")
    if not url:
        mangler.append(butikk["name"])
        continue

    parsed = urlparse(url)
    host = parsed.hostname or ""
    domain = host.replace("www.", "").replace("-", "").replace(".", "").lower()

    bilde_fil = filnavn_renset.get(domain)
    if bilde_fil:
        butikk["image"] = f"assets/images/butikker-webp/{bilde_fil}"
        oppdatert += 1
    else:
        mangler.append(butikk["name"])

# Skriv tilbake til JSON
with open(json_fil, "w", encoding="utf-8") as f:
    json.dump(butikker, f, ensure_ascii=False, indent=2)

# Valgfri logg
if mangler:
    with open(logg_fil, "w", encoding="utf-8") as f:
        f.write("\n".join(mangler))

print(f"\n✅ Oppdatert {oppdatert} butikker med bildebaner.")
if mangler:
    print(f"⚠️ {len(mangler)} butikker mangler fortsatt bilder (se '{logg_fil}')")
