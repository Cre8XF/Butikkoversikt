import json

# Åpne JSON-filen
    data = json.load(f)

# Oppdater hver butikk
for butikk in data:
    # Hvis partner og affiliate er satt til true → marker som ukens anbefalte
    if butikk.get("affiliate") is True and butikk.get("partner") is True:
        butikk["ukensAnbefalte"] = True
    # Hvis feltet ikke finnes → legg det til med tom verdi
    elif "ukensAnbefalte" not in butikk:
        butikk["ukensAnbefalte"] = ""

# Lagre endringer
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Ferdig! Alle butikker har nå fått feltet 'ukensAnbefalte'.")
