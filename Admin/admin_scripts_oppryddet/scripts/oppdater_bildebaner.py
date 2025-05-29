import json
import os
from urllib.parse import urlparse

# 📁 Mappen der WebP-logoer ligger
logomappe = ROOT_DIR / "assets" / "images" / "butikker-webp"
logomappe.mkdir(parents=True, exist_ok=True)

# 📄 Loggfil for manglende logo-URL-er
utfil = ROOT_DIR / "Admin" / "data" / "manglende-logoer-clearbit-urls.txt"
utfil.parent.mkdir(parents=True, exist_ok=True)

# 📖 Last inn butikker
    butikker = json.load(f)

# 🔎 Sjekk hvilke som mangler logoer i mappen
mangler_logo = []

for butikk in butikker:
    navn = butikk.get("name", "").strip()
    url = butikk.get("url", "").strip()
    image_path = butikk.get("image", "").strip()

    if not navn or not url or not image_path:
        continue

    expected_file = logomappe / os.path.basename(image_path)
    if not expected_file.exists():
        domain = urlparse(url).netloc.replace("www.", "")
        logo_url = f"https://logo.clearbit.com/{domain}"
        mangler_logo.append(logo_url)

# 💾 Lagre listen til fil
with open(utfil, "w", encoding="utf-8") as f:
    for logo_url in sorted(set(mangler_logo)):
        f.write(f"{logo_url}\n")

print(f"🔍 Ferdig! Fant {len(mangler_logo)} butikker som mangler logo.")
print(f"📄 Liste lagret i: {utfil}")
# 📂 Opprett mappen for manglende logoer hvis den ikke finnes