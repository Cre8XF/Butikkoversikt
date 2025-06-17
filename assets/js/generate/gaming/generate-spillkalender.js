document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/spillkalender-2025.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("spillkalender-container");
      if (!container) return;

      // Sorter etter dato
      data.sort((a, b) => new Date(a.release) - new Date(b.release));

      // Lag tabell
      const table = document.createElement("table");
      table.className = "game-calendar";
      const thead = document.createElement("thead");
      thead.innerHTML = `<tr><th>Spill</th><th>Lansering</th><th>Plattformer</th></tr>`;
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      data.forEach((spill) => {
        const tr = document.createElement("tr");

        const tittelKolonne = spill.url
          ? `<a href="${spill.url}" target="_blank" rel="noopener noreferrer">${spill.title}</a>`
          : spill.title;

        tr.innerHTML = `
          <td>${tittelKolonne}</td>
          <td>${new Date(spill.release).toLocaleDateString("no-NO", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}</td>
          <td>${spill.platforms.map(p => `<span class="tag">${p}</span>`).join(" ")}</td>
        `;
        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      container.appendChild(table);
    })
    .catch((err) => {
      console.error("Kunne ikke laste spillkalender:", err);
    });
});
