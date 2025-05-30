function transformerData() {
  const input = document.getElementById("jsonInput").value;
  try {
    const data = JSON.parse(input);
    const transformed = data.map(b => ({ ...b, partner: !!b.affiliateUrl }));
    document.getElementById("resultat").textContent = JSON.stringify(transformed, null, 2);
  } catch (e) {
    document.getElementById("resultat").textContent = "Ugyldig JSON: " + e.message;
  }
}