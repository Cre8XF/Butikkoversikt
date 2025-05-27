import json
from utils.config import BUTIKKDATA_PATH  # 👈 henter felles sti

# Sett med irrelevante eller overflødige tags du ønsker å fjerne
ugyldige_tags = {
    "butikk", "shopping", "nettbutikk", "varer", "ting", "kjøp", "netthandel"
}

# Last inn butikkdata
with open(BUTIKKDATA_PATH, encoding="utf-8") as f:
    butikker = json.load(f)

endret = 0

for butikk in butikker:
    tags = butikk.get("tags", [])
    if not isinstance(tags, list):
        continue

    # Rens: trim, små bokstaver, fjern duplikater og ugyldige
    renset = list(sorted({
        t.strip().lower()
        for t in tags
        if t.strip().lower() not in ugyldige_tags
    }))

    if renset != tags:
        butikk["tags"] = renset
        butikk["tagCount"] = len(renset)
        endret += 1

# Skriv tilbake til samme fil (eller lag en kopi hvis ønskelig)
with open(filsti, "w", encoding="utf-8") as f:
    json.dump(butikker, f, indent=2, ensure_ascii=False)

print(f"✅ Ferdig! {endret} butikker fikk oppdaterte tags.")
