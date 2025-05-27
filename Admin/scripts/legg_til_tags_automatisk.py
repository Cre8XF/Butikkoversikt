import json
from pathlib import Path

# 🔧 Juster sti hvis nødvendig
filsti = Path("../../assets/data/Butikker.json")

# Ordbok med nøkkelord per kategori og underkategori
tag_ordsamling = {
    "Helse og egenpleie": ["helse", "skjønnhet", "vitaminer", "hudpleie", "kosttilskudd"],
    "Klær og mote": ["klær", "mote", "tilbehør", "sko", "barneklær", "herreklær", "dameklær"],
    "Barn og baby": ["baby", "leker", "barneutstyr", "småbarn", "familie"],
    "Gaming og tilbehør": ["gaming", "pc", "spill", "konsoll", "utstyr", "komponenter"],
    "Digitale tjenester": ["vpn", "hosting", "strømming", "nett", "passord", "sikkerhet"],
    "Mat og drikke": ["mat", "drikke", "dagligvarer", "frokost", "vin", "snacks"],
    "Reise og opplevelser": ["reise", "bagasje", "kart", "friluft", "tur", "guider"],
    "Sport og fritid": ["sport", "trening", "sykkel", "fritid", "klær", "turklær"],
    "Møbler og interiør": ["møbler", "interiør", "belysning", "sofa", "seng", "lampe"],
    "Bøker og media": ["bøker", "ebok", "lydbok", "fagbøker", "lesing", "studier"]
}

# Last inn data
with open(filsti, encoding="utf-8") as f:
    butikker = json.load(f)

antall_oppdatert = 0

for butikk in butikker:
    eksisterende = set(t.lower().strip() for t in butikk.get("tags", []))
    ekstra = set()

    # Basert på kategori og underkategori
    kategori = butikk.get("category", "").strip()
    under = butikk.get("subcategory", [])
    beskrivelse = butikk.get("description", "").lower()
    navn = butikk.get("name", "").lower()

    # Legg til tags basert på hovedkategori
    ekstra.update(tag_ordsamling.get(kategori, []))

    # Legg til tags basert på beskrivelse og navn
    for ordsamling in tag_ordsamling.values():
        for ord in ordsamling:
            if ord in beskrivelse or ord in navn:
                ekstra.add(ord)

    # Slå sammen og oppdater hvis nytt
    kombinasjon = sorted(eksisterende.union(ekstra))
    if set(kombinasjon) != eksisterende:
        butikk["tags"] = kombinasjon
        butikk["tagCount"] = len(kombinasjon)
        antall_oppdatert += 1

# Lagre tilbake
with open(filsti, "w", encoding="utf-8") as f:
    json.dump(butikker, f, indent=2, ensure_ascii=False)

print(f"✅ Foreslåtte tags lagt til for {antall_oppdatert} butikker.")
