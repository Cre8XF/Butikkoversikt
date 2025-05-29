import csv
import json

# 🔄 Laster inn butikkdata
    butikker = json.load(f)

# 📥 Leser CSV med affiliate-lenker
with open(AFFILIATE_IMPORT_CSV, encoding="utf-8") as f:
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
    json.dump(butikker, f, indent=2, ensure_ascii=False)

print(f"✅ {antall_endret} butikker ble oppdatert med affiliate-lenker.")
