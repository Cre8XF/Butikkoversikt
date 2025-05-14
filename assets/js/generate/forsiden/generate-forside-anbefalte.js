// generate-forside-anbefalte.js

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("ukens-anbefalte");
    const visFlereBtn = document.getElementById("vis-flere-butikker");
    const visFærreBtn = document.getElementById("vis-færre-butikker");
  
    let alleButikker = [];
    let visAntall = 6;
  
    fetch("assets/data/butikker.json")
      .then((res) => res.json())
      .then((butikker) => {
        alleButikker = butikker.filter((butikk) => butikk.forside === true);
        visButikker();
      });
  
    function visButikker() {
      container.innerHTML = "";
      const utvalg = alleButikker.slice(0, visAntall);
      utvalg.forEach((butikk) => {
        const card = document.createElement("div");
        card.className = "col-sm-6 col-md-4 col-lg-3";
        card.innerHTML = `
          <div class="card category-card text-center h-100">
            <img src="${butikk.image}" alt="${butikk.alt}" class="card-img-top p-3" style="max-height:100px; object-fit:contain;">
            <div class="card-body">
              <h5 class="card-title">${butikk.name}</h5>
              <p class="card-text small text-muted">${butikk.description}</p>
              <a href="${butikk.url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Besøk butikk</a>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
  
      visFlereBtn.style.display = visAntall < alleButikker.length ? "inline-block" : "none";
      visFærreBtn.style.display = visAntall > 6 ? "inline-block" : "none";
    }
  
    visFlereBtn.addEventListener("click", () => {
      visAntall = alleButikker.length;
      visButikker();
    });
  
    visFærreBtn.addEventListener("click", () => {
      visAntall = 6;
      visButikker();
    });
  });
  