// generate-forside-guider.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/guider.json")
    .then((response) => response.json())
    .then((guider) => {
      const container = document.getElementById("guide-container");
      guider.slice(0, 3).forEach((guide) => {
        const col = document.createElement("div");
        col.className = "col-sm-6 col-md-4 mb-4";

        const card = document.createElement("a");
        card.href = guide.url;
        card.className = "guide-card d-block h-100";

        card.innerHTML = `
          <div class="guide-img">
            <img src="${guide.image}" alt="${guide.title}" />
          </div>
          <div class="guide-card-body">
            <h4>${guide.title}</h4>
            <p>${guide.description}</p>
          </div>
        `;

        col.appendChild(card);
        container.appendChild(col);
      });
    });
});
