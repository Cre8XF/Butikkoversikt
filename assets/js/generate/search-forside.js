// ✅ Søkeskript som henter fra butikker.json og guider.json

const sokefelt = document.getElementById("sokefelt");
const resultatomrade = document.getElementById("sokeresultater");

let butikker = [];
let guider = [];
let kategorier = [];

Promise.all([
  fetch("assets/data/butikker.json").then(res => res.json()),
  fetch("assets/data/guider.json").then(res => res.json())
])
.then(([butikkData, guideData]) => {
  console.log("✅ Butikkdata lastet:", butikkData);
  console.log("✅ Guider lastet:", guideData);

  butikker = butikkData;
  guider = guideData;
})
.catch(error => {
  console.error("❌ Feil ved lasting av data:", error);


  const katSet = new Set();
  butikker.forEach(b => {
    if (b.category) katSet.add(b.category);
    if (b.subcategory) katSet.add(b.subcategory);
  });
  kategorier = Array.from(katSet);
});

sokefelt.addEventListener("input", () => {
  const query = sokefelt.value.toLowerCase().trim();
  resultatomrade.innerHTML = "";

  if (!query) return;

  const matcher = (text) => text && text.toLowerCase().includes(query);

  const resultater = [];

  butikker.forEach(b => {
    if (matcher(b.name) || matcher(b.category) || matcher(b.subcategory)) {
      resultater.push(`<div><a href="${b.url}" target="_blank">🛒 ${b.name}</a> <small class="text-muted">(${b.category})</small></div>`);
    }
  });

  guider.forEach(g => {
    if (matcher(g.title) || matcher(g.description)) {
      resultater.push(`<div><a href="${g.url}">📘 ${g.title}</a></div>`);
    }
  });

  kategorier.forEach(k => {
    if (matcher(k)) {
      resultater.push(`<div><a href="kategori.html?kat=${encodeURIComponent(k)}">📂 ${k}</a></div>`);
    }
  });

  resultatomrade.innerHTML = resultater.length ? resultater.join("") : "<p>Ingen treff.</p>";
});
