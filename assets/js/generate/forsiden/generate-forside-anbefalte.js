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
      const lenke = butikk.affiliateUrl?.trim() || butikk.url;  // 👈 NY linje
      const col = document.createElement("div");
      col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

      const card = document.createElement("a");
      card.href = lenke;
      card.target = "_blank";
      card.rel = "noopener";
      card.className = "store-card";

      card.innerHTML = `
        <div class="store-card-img">
          <img src="${butikk.image}" alt="${butikk.alt || butikk.name}">
        </div>
        <div class="store-card-body">
          <h4>${butikk.name}</h4>
    ${butikk.affiliate ? `<span class="affiliate-badge">💰 Gir provisjon</span>` : ""}
          <p>${butikk.description}</p>
${butikk.eksternFrakt ? `<div class="frakt-info">🌍 <span class="tooltip-text" title="${butikk.fraktKommentar || 'Toll og MVA kan påløpe.'}">Sender fra utlandet</span></div>` : ""}

        </div>
      `;

      col.appendChild(card);
      container.appendChild(col);
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