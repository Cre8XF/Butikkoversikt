from flask import Flask, send_from_directory
import subprocess
from pathlib import Path

app = Flask(__name__)

# Rotmappen til prosjektet ditt
ROOT_DIR = Path(__file__).resolve().parent.parent
SCRIPT_DIR = ROOT_DIR / "Admin" / "scripts"

@app.route("/run/<script_name>")
def run_script(script_name):
    script_path = SCRIPT_DIR / f"{script_name}.py"
    if not script_path.exists():
        return f"❌ Skriptet '{script_name}' ble ikke funnet."

    try:
        result = subprocess.run(["python", str(script_path)], capture_output=True, text=True)
        return result.stdout or result.stderr
    except Exception as e:
        return f"🚨 Feil ved kjøring: {e}"

# 👇 Legg til dette for å servere HTML
@app.route("/Admin/<path:filename>")
def serve_admin_file(filename):
    return send_from_directory(ROOT_DIR / "Admin", filename)

if __name__ == "__main__":
    app.run(debug=True)
