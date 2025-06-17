document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/data/nye-spill.json")
      .then((res) => res.json())
      .then((data) => {
        const container = document.getElementById("nyeSpillContainer");
        if (!container) return;
  
        data.forEach((spill) => {
          const card = document.createElement("div");
          card.className = "game-card";
          card.innerHTML = `
            <img src="${spill.image}" alt="${spill.title}" />
            <h4>${spill.title}</h4>
            <p>${spill.description}</p>
            <small>Lansering: ${spill.release} | Plattform: ${spill.platform}</small><br />
            <a href="${spill.url}" target="_blank">👉 Les mer</a>
          `;
          container.appendChild(card);
        });
      });
  });
  