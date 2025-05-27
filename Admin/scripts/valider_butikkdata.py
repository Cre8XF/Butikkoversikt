import json
from utils.config import BUTIKKDATA_PATH  # 👈 henter felles sti

# Last inn butikkdata
with open(BUTIKKDATA_PATH, encoding="utf-8") as f:
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

    # Legg til i listen hvis noen feil er funnet
    if feil:
        feil_liste.append({
            "name": navn,
            "url": url,
            "feil": ", ".join(feil)
        })

# Skriv resultat til fil
output_fil = Path("Admin/data/butikkdata-valideringsrapport.txt")
output_fil.parent.mkdir(parents=True, exist_ok=True)

with open(output_fil, "w", encoding="utf-8") as f:
    for linje in feil_liste:
        f.write(f"{linje['name']} | {linje['url']} | {linje['feil']}\n")

print(f"✅ Ferdig! {len(feil_liste)} butikker har mangler.")
print(f"📝 Rapport lagret i: {output_fil}")
