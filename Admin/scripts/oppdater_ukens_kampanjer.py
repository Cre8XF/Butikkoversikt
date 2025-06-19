from datetime import date, timedelta
import json

# Sti til JSON-filen
json_path = "assets/data/kampanjer.json"  # Endre sti hvis filen ligger et annet sted

# Last inn eksisterende kampanjer
try:
    with open(json_path, "r", encoding="utf-8") as f:
        kampanjer = json.load(f)
except FileNotFoundError:
    print("❌ Fant ikke kampanjer.json")
    kampanjer = []

# Finn inneværende uke
dag_i_dag = date.today()
uke_nr = dag_i_dag.isocalendar().week
start_dato = dag_i_dag.isoformat()
slutt_dato = (dag_i_dag + timedelta(days=6)).isoformat()

# Oppdater kampanjer med alwaysOn = true
for kampanje in kampanjer:
    if kampanje.get("alwaysOn") is True:
        butikk_navn = kampanje.get("alt", "Ukjent butikk").split("–")[0].strip()
        kampanje["title"] = f"Ukens kampanje hos {butikk_navn} – uke {uke_nr}"
        kampanje["description"] = f"Sjekk ukens kampanje fra {butikk_navn} – gyldig i uke {uke_nr}!"
        kampanje["startDate"] = start_dato
        kampanje["expiry"] = slutt_dato

# Lagre tilbake til samme fil
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(kampanjer, f, indent=2, ensure_ascii=False)

print("✅ Ukens kampanjer oppdatert.")
