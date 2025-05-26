import json

with open('assets/data/Butikker.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for butikk in data:
    if "ukensAnbefalte" not in butikk:
        butikk["ukensAnbefalte"] = ""

with open('assets/data/Butikker.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Feltet 'ukensAnbefalte' er nå lagt til der det manglet.")

# This script adds the "ukensAnbefalte" field to each store in the Butikker.json file if it is missing.
# It reads the existing data, checks for the presence of the field, and writes the updated data back to the file.