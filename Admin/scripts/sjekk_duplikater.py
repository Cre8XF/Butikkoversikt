import json
from utils.config import BUTIKKDATA_PATH  # 👈 henter felles sti

# Last inn butikkdata
filsti = BUTIKKDATA_PATH
with open(filsti, encoding="utf-8") as f:
    butikker = json.load(f)

navn_sett = set()
url_sett = set()
duplikater = []

for butikk in butikker:
    navn = butikk.get("name", "").strip().lower()
    url = butikk.get("url", "").strip().lower().rstrip('/')

    # Lag en identifikator for duplikatkontroll
    identifikator = f"{navn}|{url}"

    if navn in navn_sett or url in url_sett:
        duplikater.append({
            "name": butikk.get("name", ""),
            "url": butikk.get("url", ""),
            "category": butikk.get("category", ""),
            "description": butikk.get("description", "")
        })
    else:
        navn_sett.add(navn)
        url_sett.add(url)

# Lagre til fil
output_fil = Path("Admin/data/duplikater-funnet.txt")
output_fil.parent.mkdir(parents=True, exist_ok=True)

with open(output_fil, "w", encoding="utf-8") as f:
    for b in duplikater:
        f.write(f"{b['name']} | {b['url']} | {b['category']}\n")

print(f"🔎 Fant {len(duplikater)} mulige duplikater.")
print(f"📄 Lagret i: {output_fil}")
