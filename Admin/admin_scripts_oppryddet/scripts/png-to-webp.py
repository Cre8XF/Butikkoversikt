from PIL import Image
import os
from utils.config import ROOT_DIR

# 📁 Mapper
input_folder = ROOT_DIR / "assets" / "images" / "konverteres"       # Her legger du PNG-bildene
output_folder = ROOT_DIR / "assets" / "images" / "butikker-webp"    # Konvertert lagres her
output_folder.mkdir(parents=True, exist_ok=True)

# 🔁 Gå gjennom PNG-filer og lagre som WebP
for file in os.listdir(input_folder):
    if file.lower().endswith(".png"):
        input_path = input_folder / file
        output_path = output_folder / (os.path.splitext(file)[0].lower() + ".webp")
        
        img = Image.open(input_path).convert("RGBA")
        img.save(output_path, "WEBP")
        print(f"✅ Konvertert: {file} → {output_path.name}")
