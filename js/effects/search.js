document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const søk = params.get("k")?.toLowerCase() || "";
  const resultContainer = document.getElementById("search-results");

  if (!søk || søk.length < 2) {
    resultContainer.innerHTML = "<p>Vennligst skriv inn minst 2 tegn for å søke.</p>";
    return;
  }

  fetch("assets/data/butikker.json")
    .then(response => response.json())
    .then(data => {
      const treff = data.filter(butikk =>
        butikk.name.toLowerCase().includes(søk) ||
        butikk.category?.toLowerCase().includes(søk) ||
        butikk.description?.toLowerCase().includes(søk)
      );

      if (treff.length === 0) {
        resultContainer.innerHTML = "<p>Ingen treff på <strong>" + søk + "</strong>.</p>";
        return;
      }

      resultContainer.innerHTML = treff.map(butikk => {
        const image = butikk.image && butikk.image.trim() !== "" 
          ? butikk.image 
          : "assets/images/logo-mangler.png";

        return `
          <div class="col-12 col-md-6 col-lg-4">
            <div class="store-showcase">
              <img src="${image}" alt="${butikk.name}" class="card-logo" loading="lazy" />
              <h5>${butikk.name}</h5>
              <p>${butikk.description || ""}</p>
              <a href="${butikk.url}" target="_blank" rel="noopener sponsored">Besøk butikk</a>
            </div>
          </div>
        `;
      }).join("");
    })
    .catch(error => {
      console.error("Feil ved lasting av butikker:", error);
      resultContainer.innerHTML = "<p>Det oppstod en feil ved søket.</p>";
    });
});
