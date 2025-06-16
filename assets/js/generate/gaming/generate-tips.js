fetch("assets/data/tips.json")
  .then(res => res.json())
  .then(tips => {
    const container = document.getElementById("tips-container");
    const buttons = document.querySelectorAll("#tips-filters button");

    function renderTips(filter) {
      container.innerHTML = "";
      tips
        .filter(t => filter === "alle" || t.guideCategory === filter)
        .forEach(tip => {
          const card = document.createElement("div");
          card.className = "tip-card";
          card.innerHTML = `
  <img src="${tip.image}" alt="${tip.title}" class="tip-image">
  <h4><a href="${tip.url}" target="_blank">${tip.title}</a></h4>
  <p>${tip.description}</p>
  ${tip.source ? `<small>${tip.source}</small>` : ""}
`;
          container.appendChild(card);
        });
    }

    renderTips("alle");
    buttons.forEach(btn =>
      btn.addEventListener("click", () => renderTips(btn.dataset.filter))
    );
  });