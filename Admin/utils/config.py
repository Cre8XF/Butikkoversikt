from pathlib import Path

# Rotmappe til prosjektet ditt (tilpasses etter behov)
ROOT_DIR = Path(__file__).resolve().parent.parent.parent

# Filstier
BUTIKKDATA_PATH = ROOT_DIR / "assets" / "data" / "Butikker.json"
KAMPANJER_PATH = ROOT_DIR / "assets" / "data" / "kampanjer.json"
ANNONSER_PATH = ROOT_DIR / "assets" / "data" / "annonser.json"

# Importfiler (CSV etc.)
AFFILIATE_IMPORT_CSV = ROOT_DIR / "Admin" / "data" / "affiliate-import.csv"

# Output-rapporter
VALIDERINGSRAPPORT = ROOT_DIR / "Admin" / "data" / "butikkdata-valideringsrapport.txt"
DUPLIKAT_RAPPORT = ROOT_DIR / "Admin" / "data" / "duplikater-funnet.txt"

# Andre innstillinger
UGYLDIGE_TAGS = {
    "butikk", "shopping", "nettbutikk", "varer", "ting", "kjøp", "netthandel"
}
