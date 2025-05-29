import sys
from pathlib import Path
import json

import json
from pathlib import Path

# Manuell filsti til butikkdata
butikkdata_fil = Path("Admin/data/butikker.json")

with open(butikkdata_fil, "r", encoding="utf-8") as f:
    butikker = json.load(f)


# Initier liste for å samle butikker med feil
feil_liste = []

for butikk in butikker:
    feil = []
    navn = butikk.get("name", "").strip()
    url = butikk.get("url", "").strip()
    category = butikk.get("category", "").strip()
    subcategory = butikk.get("subcategory", [])
    image = butikk.get("image", "").strip()
    alt = butikk.get("alt", "").strip()
    description = butikk.get("description", "").strip()
    tags = butikk.get("tags", [])

    # Valider felter
    if not navn:
        feil.append("Mangler navn")
    if not url:
        feil.append("Mangler URL")
    if not category:
        feil.append("Mangler kategori")
    if not subcategory:
        feil.append("Mangler underkategori")
    if not image:
        feil.append("Mangler bilde")
    if not alt:
        feil.append("Mangler alt-tekst")
    if not description:
        feil.append("Mangler beskrivelse")
    if not isinstance(tags, list) or len(tags) < 3:
        feil.append("Få eller ugyldige tags")

    if feil:
        feil_liste.append({
            "name": navn,
            "url": url,
            "feil": ", ".join(feil)
        })

# Lagre rapport
rapport_fil = Path("Admin/data/butikkdata-valideringsrapport.txt")
rapport_fil.parent.mkdir(parents=True, exist_ok=True)

with open(rapport_fil, "w", encoding="utf-8") as f:
    for linje in feil_liste:
        f.write(f"{linje['name']} | {linje['url']} | {linje['feil']}\n")

print(f"[OK] {len(feil_liste)} butikker har mangler.")
print(f"[Fil] {rapport_fil}")
