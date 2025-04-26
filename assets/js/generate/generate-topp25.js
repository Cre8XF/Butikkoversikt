document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("topp25-container");
      const teller = document.getElementById("teller");

      const topp25 = data.filter(b => b.topp25 === true);

      // Oppdater teller
      if (teller) {
        teller.textContent = `(${topp25.length})`;
      }

      // Bygg kort
      topp25.forEach(butikk => {
        const imageUrl = butikk.image && butikk.image.trim() !== "" 
          ? butikk.image 
          : "assets/images/logo-mangler.png";

        const card = document.createElement("div");
        card.className = "col-6 col-md-3 d-flex store-card fade-in"; // fade-in klassen inkludert!

        card.innerHTML = `
          <div class="card store-showcase text-center w-100">
            <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" loading="lazy" />
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">${butikk.name}</h5>
              ${butikk.description ? `<p class="card-text">${butikk.description}</p>` : ""}
              <a href="${butikk.url}" target="_blank" rel="noopener" class="btn btn-primary mt-auto">Besøk butikk</a>
            </div>
          </div>
        `;
        container.appendChild(card);
      });

      // Aktiver fade-in etter kortene er på plass
      startFadeInObserver();
    })
    .catch(err => {
      console.error("Feil ved lasting av Topp 25:", err);
    });
});

// Funksjon for fade-in observer
function startFadeInObserver() {
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));
}
