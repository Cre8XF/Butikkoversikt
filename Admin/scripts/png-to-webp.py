from PIL import Image
from pathlib import Path
import os

# 📁 Sett mapper manuelt
ROOT_DIR = Path(__file__).resolve().parent.parent.parent  # Går fra /Admin/scripts/ til rot
input_folder = ROOT_DIR / "assets" / "images" / "konverteres"
output_folder = input_folder  # Samme mappe for lagring

# 🔧 Sørg for at utmappe finnes
output_folder.mkdir(parents=True, exist_ok=True)

# 🔁 Gå gjennom PNG-filer og lagre som WebP
for file in os.listdir(input_folder):
    if file.lower().endswith(".png"):
        input_path = input_folder / file
        output_path = output_folder / (os.path.splitext(file)[0].lower() + ".webp")

        try:
            img = Image.open(input_path).convert("RGBA")
            img.save(output_path, "WEBP")
            print(f"✅ Konvertert: {file} → {output_path.name}")
        except Exception as e:
            print(f"❌ Feil med {file}: {e}")
