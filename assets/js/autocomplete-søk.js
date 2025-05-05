
// autocomplete-søk-renset.js – forbedret autocomplete med filtrering og duplikatsjekk

document.addEventListener("DOMContentLoaded", () => {
  const søkefelt = document.getElementById("searchInput");
  const liste = document.getElementById("autocomplete-list");

  let alleForslag = [];

  // Last inn data fra butikker.json
  fetch("assets/data/butikker.json")
    .then((res) => res.json())
    .then((data) => {
      const navn = data.map(b => b.name);
      const kategorier = data.map(b => b.category);
      const underkategorier = data.flatMap(b => b.subcategory || []);
      alleForslag = [...new Set([...navn, ...kategorier, ...underkategorier].filter(Boolean))];
    });

  søkefelt.addEventListener("input", function () {
    const val = this.value.toLowerCase();
    liste.innerHTML = "";

    if (!val) return;

    const treff = alleForslag
      .filter(f => f.toLowerCase().includes(val))
      .slice(0, 8);

    treff.forEach(forslag => {
      const li = document.createElement("li");
      li.textContent = forslag;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        søkefelt.value = forslag;
        liste.innerHTML = "";
        søkefelt.dispatchEvent(new Event("input")); // trigger søk
      });
      liste.appendChild(li);
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target !== søkefelt) {
      liste.innerHTML = "";
    }
  });
});
