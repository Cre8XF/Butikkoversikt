import csv
import json
from pathlib import Path

# 🔧 Stier
csv_fil = Path("Admin/data/affiliate-import.csv")  # CSV du lager selv
json_fil = Path("../../assets/data/Butikker.json")

# 🔄 Laster inn butikkdata
with open(json_fil, encoding="utf-8") as f:
    butikker = json.load(f)

# 📥 Leser CSV med affiliate-lenker
with open(csv_fil, encoding="utf-8") as f:
    reader = csv.DictReader(f)
    oppdateringer = list(reader)

# 🔁 Oppdater JSON basert på navn (case-insensitiv)
antall_endret = 0
for rad in oppdateringer:
    navn_csv = rad["name"].strip().lower()
    affiliate_url = rad["affiliateUrl"].strip()

    for butikk in butikker:
        navn_json = butikk.get("name", "").strip().lower()
        if navn_csv == navn_json:
            butikk["affiliateUrl"] = affiliate_url
            butikk["affiliate"] = True
            antall_endret += 1
            break

# 💾 Lagre tilbake
with open(json_fil, "w", encoding="utf-8") as f:
    json.dump(butikker, f, indent=2, ensure_ascii=False)

print(f"✅ {antall_endret} butikker ble oppdatert med affiliate-lenker.")
