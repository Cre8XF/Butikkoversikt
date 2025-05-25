from PIL import Image
import os

input_folder = "assets/images/konverteres"   # Endre til der dine .png ligger
output_folder = "assets/images/butikker-webp"
os.makedirs(output_folder, exist_ok=True)

for file in os.listdir(input_folder):
    if file.endswith(".png"):
        img = Image.open(os.path.join(input_folder, file)).convert("RGBA")
        webp_name = os.path.splitext(file)[0].lower() + ".webp"
        img.save(os.path.join(output_folder, webp_name), "WEBP")
        print(f"✅ Konvertert: {file} → {webp_name}")
