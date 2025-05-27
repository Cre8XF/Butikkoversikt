import json
from utils.config import BUTIKKDATA_PATH

# Åpne JSON-filen
with open(BUTIKKDATA_PATH, 'r', encoding='utf-8') as f:
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
with open(BUTIKKDATA_PATH, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Ferdig! Alle butikker har nå fått feltet 'ukensAnbefalte'.")
