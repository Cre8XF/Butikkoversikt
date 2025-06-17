
fetch("assets/data/tips.json")
  .then(res => res.json())
  .then(tips => {
    const container = document.getElementById("tips-container");
    const buttons = document.querySelectorAll("#tips-filters button");

    const visMerKnapp = document.createElement("button");
    visMerKnapp.className = "btn btn-outline-light mt-3";
    visMerKnapp.textContent = "Vis alle";
    visMerKnapp.style.display = "none";

    let aktivFilter = "alle";

    function renderTips(filter, begrens = true) {
      container.innerHTML = "";
      let filtrertTips = tips.filter(t => filter === "alle" || t.guideCategory === filter);

      if (begrens && filtrertTips.length > 6) {
        visMerKnapp.style.display = "inline-block";
        visMerKnapp.onclick = () => renderTips(filter, false);
        filtrertTips = filtrertTips.slice(0, 6);
      } else {
        visMerKnapp.style.display = "none";
      }

      if (filtrertTips.length === 0) {
        container.innerHTML = "<p>Ingen guider funnet.</p>";
        return;
      }

      filtrertTips.forEach(tip => {
        const card = document.createElement("div");
        card.className = "tip-card";
        card.innerHTML = `
          <img src="${tip.image}" alt="${tip.alt}" class="tip-image">
          <h4><a href="${tip.url}" target="_blank" rel="noopener">${tip.title}</a></h4>
          <p>${tip.description}</p>
          ${tip.source ? `<small class="text-muted">${tip.source}</small>` : ""}
        `;
        container.appendChild(card);
      });

      container.appendChild(visMerKnapp);
    }

    // Initial visning
    renderTips("alle");

    buttons.forEach(btn =>
      btn.addEventListener("click", () => {
        aktivFilter = btn.dataset.filter;
        renderTips(aktivFilter, true);
      })
    );
  });
