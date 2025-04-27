document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/butikker.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("anbefalte-butikker-list");

      const anbefalte = data.filter(b => b.forside === true);

      // Bygg kort
      anbefalte.forEach((butikk, index) => {
        const imageUrl = butikk.image && butikk.image.trim() !== "" 
          ? butikk.image 
          : "assets/images/logo-mangler.png";

        const col = document.createElement("div");
        col.className = "col d-flex store-card fade-in"; // fade-in for smooth innlasting

        col.innerHTML = `
          <div class="card store-showcase text-center w-100">
            <a href="${butikk.url}" target="_blank" rel="noopener noreferrer">
              <img src="${imageUrl}" alt="${butikk.alt || butikk.name}" loading="lazy" />
              <div class="card-body d-flex flex-column justify-content-between">
                <h6 class="card-title mt-2 mb-0">${butikk.name}</h6>
                ${butikk.description ? `<p class="card-text small text-muted">${butikk.description}</p>` : ""}
              </div>
            </a>
          </div>
        `;

        // Skjul butikker etter 4 stk
        if (index >= 4) {
          col.style.display = "none";
          col.classList.add("skjult-butikk");
        }

        container.appendChild(col);
      });

      // Aktiver fade-in etter kortene er på plass
      startFadeInObserver();

      // Vis flere-knapp
      const visFlereBtn = document.getElementById("vis-flere-butikker");
      if (visFlereBtn) {
        visFlereBtn.addEventListener("click", () => {
          document.querySelectorAll(".skjult-butikk").forEach(el => {
            el.style.display = "block";
          });
          visFlereBtn.style.display = "none"; // Skjul knapp etter klikk
        });
      }
    })
    .catch(err => {
      console.error("Feil ved lasting av anbefalte butikker:", err);
    });
});

// Fade-in effekt
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
