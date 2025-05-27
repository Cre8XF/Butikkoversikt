import os
import requests
from PIL import Image
from io import BytesIO

# Les logo-URLer fra fil
with open("Admin/data/manglende-logoer-clearbit-urls.txt", "r", encoding="utf-8") as f:
    urls = [line.strip() for line in f if line.strip()]

# Opprett output-mappe
output_dir = "assets/images/butikker-webp"
os.makedirs(output_dir, exist_ok=True)

# Last ned og konverter logoene
for url in urls:
    try:
        domain = url.split("//logo.clearbit.com/")[-1]
        file_name = domain.replace(".", "-").lower() + ".webp"
        out_path = os.path.join(output_dir, file_name)

        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content)).convert("RGBA")
            img.save(out_path, "WEBP")
            print(f"✅ Lagret: {file_name}")
        else:
            print(f"❌ Feilet: {file_name} (HTTP {response.status_code})")
    except Exception as e:
        print(f"⚠️ Feil med {url}: {e}")
