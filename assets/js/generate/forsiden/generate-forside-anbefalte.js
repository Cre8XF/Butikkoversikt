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
      const lenke = (butikk.affiliate && butikk.affiliateUrl && butikk.affiliateUrl.trim() !== "")
  ? butikk.affiliateUrl
  : butikk.url;  // 👈 NY linje
      const col = document.createElement("div");
      col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

      const card = document.createElement("a");
      card.href = lenke;
      card.target = "_blank";
      card.rel = "noopener";
      card.className = "store-card";

      card.innerHTML = `
  <div class="store-card-img">
   <img src="${butikk.image}" alt="${butikk.alt || butikk.name}" width="400" height="250" loading="lazy">
  </div>
  <div class="store-card-body">
    <h4>${butikk.name}</h4>
    <p>${butikk.description || ""}</p>

    ${(butikk.affiliate && butikk.affiliateUrl) || butikk.eksternFrakt ? `
      <div class="store-tags mt-2 small text-muted">
        ${butikk.affiliate && butikk.affiliateUrl ? `🔗 Affiliatebutikk` : ""}
        ${butikk.affiliate && butikk.affiliateUrl && butikk.eksternFrakt ? " • " : ""}
        ${butikk.eksternFrakt ? `🌍 Sender fra utlandet` : ""}
      </div>
    ` : ""}
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