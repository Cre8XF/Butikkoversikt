from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/meta")
def api_meta():
    url = request.args.get("url", "")
    if not url.startswith("http"):
        return jsonify({"error": "Ugyldig URL"}), 400

    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        meta_desc = soup.find("meta", attrs={"name": "description"})
        if meta_desc and meta_desc.get("content"):
            return jsonify({"description": meta_desc["content"].strip()})

        title_tag = soup.find("title")
        if title_tag:
            return jsonify({"description": title_tag.text.strip()})

        return jsonify({"description": "(Ingen beskrivelse funnet)"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
