document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/data/anmeldelser.json")
      .then((res) => res.json())
      .then((data) => {
        const container = document.getElementById("anmeldelse-list");
        const filterButtons = document.querySelectorAll("#anmeldelse-filters button");
  
        function render(dataToRender) {
          container.innerHTML = "";
          dataToRender.forEach((anmeldelse) => {
            const card = document.createElement("div");
            card.className = "review-card"; // Bruk samme stil som tips
  
            card.innerHTML = `
              <img src="${anmeldelse.image}" alt="${anmeldelse.title}" class="tip-image">
              <h4><a href="${anmeldelse.url}" target="_blank" rel="noopener">${anmeldelse.title}</a></h4>
              <p>${anmeldelse.description}</p>
              <div class="tip-meta">
                <span class="tag">${anmeldelse.platform}</span>
                ${anmeldelse.score ? `<span class="tag highlight">${anmeldelse.score}</span>` : ""}
                ${anmeldelse.source ? `<small class="source">Kilde: ${anmeldelse.source}</small>` : ""}
              </div>
            `;
            container.appendChild(card);
          });
        }
  
        render(data); // Vis alle ved oppstart
  
        filterButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            const filtered =
              filter === "alle"
                ? data
                : data.filter((a) => a.platform.toLowerCase() === filter.toLowerCase());
            render(filtered);
          });
        });
      });
  });
  