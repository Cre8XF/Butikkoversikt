document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/kampanjer-gaming.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("gamingKampanjer");
      if (!container) return;

      container.classList.add("kampanje-grid");

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "kampanje-card";

        card.innerHTML = `
          <img src="${item.image}" alt="${item.tittel}" />
          <h4><a href="${item.url}" target="_blank" rel="noopener">${item.tittel}</a></h4>
          <p>${item.beskrivelse}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Feil ved innlasting av kampanjer:", err);
    });
});
