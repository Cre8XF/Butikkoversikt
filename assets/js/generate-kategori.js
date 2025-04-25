// generate-kategori.js - Oppdatert versjon

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const kategori = urlParams.get("kategori");

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

  if (underkategorierMap[kategori]) {
    const underkatWrapper = document.getElementById("underkategorier-wrapper");
    if (underkatWrapper) {
      underkatWrapper.classList.remove("d-none");
    }
  }

  fetch("assets/data/butikker.json")
    .then((response) => response.json())
    .then((butikker) => {
      const container = document.getElementById("butikk-container");
      container.innerHTML = "";

      const aktivSubkategori = document.querySelector(".filter-btn.active")?.dataset.subcategory || "alle";

      butikker
        .filter((butikk) => {
          return butikk.category === kategori && (aktivSubkategori === "alle" || butikk.subcategory === aktivSubkategori);
        })
        .forEach((butikk) => {
          const card = document.createElement("div");
          card.className = "col";
          card.innerHTML = `
            <div class="card h-100 border-0 shadow-sm hover-shadow">
              <img src="${butikk.image}" class="card-img-top" alt="${butikk.name}" />
              <div class="card-body">
                <h5 class="card-title">${butikk.name}</h5>
                <p class="card-text">${butikk.description}</p>
                <a href="${butikk.url}" class="btn btn-primary w-100" target="_blank" rel="noopener">Besøk butikk</a>
              </div>
            </div>
          `;
          container.appendChild(card);
        });
    });

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      const subkategori = e.target.dataset.subcategory;

      fetch("assets/data/butikker.json")
        .then((response) => response.json())
        .then((butikker) => {
          const container = document.getElementById("butikk-container");
          container.innerHTML = "";
          const aktivSubkategori = document.querySelector(".filter-btn.active")?.dataset.subcategory || "alle";
          const kategori = urlParams.get("kategori");
          const underkategori = underkategorierMap[kategori] || [];
          const subkategorier = underkategori.filter((subkat) => {
            return subkat !== "alle" && subkat !== aktivSubkategori;
          });
          const subkategoriContainer = document.getElementById("underkategorier");
          subkategoriContainer.innerHTML = "";
          subkategorier.forEach((subkat) => {
            const subkatBtn = document.createElement("button");
            subkatBtn.className = "btn btn-outline-secondary filter-btn";
            subkatBtn.dataset.subcategory = subkat;
            subkatBtn.innerText = subkat;
            subkategoriContainer.appendChild(subkatBtn);
          });
          const alleBtn = document.createElement("button");
          alleBtn.className = "btn btn-outline-secondary filter-btn";
          alleBtn.dataset.subcategory = "alle";
          alleBtn.innerText = "Alle";
          alleBtn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
            alleBtn.classList.add("active");
            fetch("assets/data/butikker.json")
              .then((response) => response.json())
              .then((butikker) => {
                container.innerHTML = "";
                butikker
                  .filter((butikk) => {
                    return butikk.category === kategori;
                  })
                  .forEach((butikk) => {
                    const card = document.createElement("div");
                    card.className = "col";
                    card.innerHTML = `
                      <div class="card h-100 border-0 shadow-sm hover-shadow">
                        <img src="${butikk.image}" class="card-img-top" alt="${butikk.name}" />
                        <div class="card-body">
                          <h5 class="card-title">${butikk.name}</h5>
                          <p class="card-text">${butikk.description}</p>
                          <a href="${butikk.url}" class="btn btn-primary w-100" target="_blank" rel="noopener">Besøk butikk</a>
                        </div>
                      </div>
                    `;
                    container.appendChild(card);
                  });
              })
              .catch((error) => {
                console.error("Error fetching butikker:", error);
              });
          });
        });
      });
    });
  });