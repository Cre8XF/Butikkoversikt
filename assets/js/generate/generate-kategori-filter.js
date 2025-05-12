document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const kategori = urlParams.get("kategori");

  const butikkContainer = document.getElementById("butikk-container");
  const subcategoryDropdown = document.getElementById("subcategoryMenu");

  // Henter butikkdata
  axios.get("assets/data/butikker.json")
      .then((response) => {
          const butikker = response.data;
          
          // Filtrerer butikkene basert på kategori
          const filtrerteButikker = butikker.filter((butikk) =>
              butikk.category.includes(kategori)
          );

          // Populerer butikkortene
          visButikker(filtrerteButikker);

          // Henter unike underkategorier
          const underkategorier = new Set();
          filtrerteButikker.forEach((butikk) => {
              butikk.subcategory.forEach((sub) => underkategorier.add(sub));
          });

          // Legger underkategoriene til i dropdown-menyen
          underkategorier.forEach((sub) => {
              const listItem = document.createElement("li");
              listItem.innerHTML = `<a class="dropdown-item" href="#">${sub}</a>`;
              listItem.addEventListener("click", () => {
                  const filtrerteUnderkategori = filtrerteButikker.filter((butikk) =>
                      butikk.subcategory.includes(sub)
                  );
                  visButikker(filtrerteUnderkategori);
              });
              subcategoryDropdown.appendChild(listItem);
          });

      })
      .catch((error) => {
          console.error("Feil ved lasting av butikkdata:", error);
      });

  function visButikker(butikker) {
      butikkContainer.innerHTML = "";
      butikker.forEach((butikk) => {
          const card = document.createElement("div");
          card.className = "col-md-4";
          card.innerHTML = `
              <div class="card border-0 shadow-sm">
                  <img src="${butikk.image}" class="card-img-top" alt="${butikk.alt}">
                  <div class="card-body">
                      <h5 class="card-title">${butikk.name}</h5>
                      <p class="card-text">${butikk.description}</p>
                      <a href="${butikk.url}" class="btn btn-primary">Besøk butikk</a>
                  </div>
              </div>
          `;
          butikkContainer.appendChild(card);
      });
  }
});
