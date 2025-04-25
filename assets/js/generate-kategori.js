document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const valgtKategori = urlParams.get("kategori");

  const butikkContainer = document.getElementById("butikk-container");
  const underkatWrapper = document.getElementById("underkategorier-wrapper");
  const underkategoriFilter = document.getElementById("underkategori-lenker");
  const kategoriTittel = document.getElementById("kategori-tittel");

  const underkategorierMap = {
    "Klær og mote": ["Dameklær", "Herreklær", "Tilbehør og sko"],
    "Elektronikk og data": [
      "PC og tilbehør",
      "Mobil og nettbrett",
      "Lyd og bilde",
      "Smartprodukter og IoT",
      "Komponenter og gamingutstyr"
    ],
    "Helse og egenpleie": [
      "Apotek og helseprodukter",
      "Hud- og kroppspleie",
      "Hår- og skjønnhetspleie",
      "Sminke og kosmetikk",
      "Trening og velvære"
    ],
    "Barn og baby": [
      "Barneklær",
      "Babyutstyr",
      "Leker og spill",
      "Barnerom og møbler",
      "Bleier og hygiene",
      "Mat og amming"
    ],
    "Sport og fritid": [
      "Sportsklær og sko",
      "Trening og treningsutstyr",
      "Friluft og tur",
      "Sykkel og sykkelutstyr",
      "Fiske og jakt"
    ],
    "Møbler og interiør": [
      "Møbler",
      "Belysning",
      "Tekstiler og tepper",
      "Dekor og interiør"
    ],
    "Gaming og tilbehør": ["Gamingutstyr og komponenter"],
    "Fritid og gaver": ["Gadgets og gaver"]
  };

  if (!valgtKategori) {
    kategoriTittel.textContent = "Kategori ikke valgt.";
    return;
  }

  kategoriTittel.textContent = valgtKategori;

  fetch("/assets/data/butikker.json")
    .then((response) => response.json())
    .then((butikker) => {
      const butikkerIKategori = butikker.filter(
        (butikk) => butikk.kategori === valgtKategori
      );

      if (butikkerIKategori.length === 0) {
        butikkContainer.innerHTML = "<p>Ingen butikker funnet.</p>";
        return;
      }

      // Hvis underkategorier finnes, vis filteret
      const underkategorier = underkategorierMap[valgtKategori];
      if (underkategorier && underkategorier.length > 0) {
        underkatWrapper.classList.remove("d-none");
        
        // Lag "Vis alle" knapp
        const visAlleBtn = document.createElement("button");
        visAlleBtn.textContent = "Vis alle";
        visAlleBtn.className = "btn btn-outline-primary filter-btn active";
        visAlleBtn.dataset.underkategori = "alle";
        underkategoriFilter.appendChild(visAlleBtn);

        // Lag egne knapper for hver underkategori
        underkategorier.forEach((underkat) => {
          const btn = document.createElement("button");
          btn.textContent = underkat;
          btn.className = "btn btn-outline-primary filter-btn";
          btn.dataset.underkategori = underkat;
          underkategoriFilter.appendChild(btn);
        });
      }

      visButikker(butikkerIKategori); // Start med å vise alle

      underkategoriFilter.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") return;

        document.querySelectorAll(".filter-btn").forEach((btn) => {
          btn.classList.remove("active");
        });
        e.target.classList.add("active");

        const valgtUnderkat = e.target.dataset.underkategori;

        const filtrerte = valgtUnderkat === "alle"
          ? butikkerIKategori
          : butikkerIKategori.filter(
              (butikk) => butikk.underkategori === valgtUnderkat
            );

        visButikker(filtrerte);
      });
    })
    .catch((err) => {
      console.error("Feil ved lasting av butikker:", err);
    });

  function visButikker(butikker) {
    butikkContainer.innerHTML = "";

    butikker.forEach((butikk) => {
      const kort = document.createElement("div");
      kort.className = "col-md-4";

      kort.innerHTML = `
        <div class="card h-100 border-0 shadow-sm">
          <img src="${butikk.bilde}" class="card-img-top" alt="${butikk.navn}" />
          <div class="card-body">
            <h5 class="card-title">${butikk.navn}</h5>
            <p class="card-text">${butikk.beskrivelse}</p>
                  <a href="${butikk.lenke}" class="btn btn-primary">Besøk butikk</a>
                </div>
              </div>
            `;

