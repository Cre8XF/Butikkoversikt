document.addEventListener("DOMContentLoaded", async () => {
    const kategoriContainer = document.getElementById("butikk-container");
    const kategoriTittel = document.getElementById("kategoriTittel");
    const subcategoryDropdown = document.getElementById("subcategoryMenu");
    const dropdownButton = document.getElementById("subcategoryDropdown");
  
    // Hent kategori fra URL
    const params = new URLSearchParams(window.location.search);
    const kategori = params.get("kategori");
  
    if (!kategoriContainer || !kategori) {
        console.error("Elementer mangler: butikkContainer eller kategori er ikke definert.");
        return;
    }
  
    kategoriTittel.textContent = kategori;
  
    try {
        const response = await axios.get("assets/data/butikker.json");
        const butikker = response.data;
  
        const filtrerteButikker = butikker.filter(butikk => butikk.category.includes(kategori));
  
        kategoriContainer.innerHTML = "";
  
        // Hent unike underkategorier
        const underkategorier = new Set();
        filtrerteButikker.forEach((butikk) => {
            butikk.subcategory.forEach((sub) => underkategorier.add(sub));
        });
  
        // Legg til "Vis alle" i dropdown
        const visAlleItem = document.createElement("li");
        visAlleItem.innerHTML = `<a class="dropdown-item" href="#">Vis alle</a>`;
        visAlleItem.addEventListener("click", () => {
            visButikker(filtrerteButikker);
            dropdownButton.textContent = `Vis alle (${filtrerteButikker.length})`;
        });
        subcategoryDropdown.appendChild(visAlleItem);
  
        // Legg til underkategorier i dropdown-menyen
        underkategorier.forEach((sub) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a class="dropdown-item" href="#">${sub}</a>`;
            
            listItem.addEventListener("click", () => {
                const filtrerteUnderkategori = filtrerteButikker.filter((butikk) =>
                    butikk.subcategory.includes(sub)
                );
                visButikker(filtrerteUnderkategori);
  
                // Oppdater knappetekst med valgt underkategori og teller
                dropdownButton.textContent = `${sub} (${filtrerteUnderkategori.length})`;
            });
  
            subcategoryDropdown.appendChild(listItem);
        });
  
        // Vis alle butikker først
        visButikker(filtrerteButikker);
  
    } catch (error) {
        console.error("Feil ved lasting av butikker: ", error);
    }
  
    function visButikker(butikker) {
        kategoriContainer.style.opacity = 0;
        setTimeout(() => {
            kategoriContainer.innerHTML = "";
            butikker.forEach((butikk) => {
                const card = document.createElement("div");
                card.className = "col-lg-3 col-md-4 col-sm-6 mb-4";
                card.innerHTML = `
                    <div class="card shadow-sm h-100 hover-zoom">
                        <img src="${butikk.image}" class="card-img-top p-2" alt="${butikk.alt}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title mb-2">${butikk.name}</h5>
                            <p class="card-text mb-3">${butikk.description}</p>
                            <a href="${butikk.url}" target="_blank" rel="noopener" class="btn btn-primary mt-auto">Besøk butikk</a>
                        </div>
                    </div>
                `;
                kategoriContainer.appendChild(card);
            });
            kategoriContainer.style.opacity = 1;
        }, 300);
    }
  });
  