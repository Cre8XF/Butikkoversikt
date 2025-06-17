
document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/spillkalender-2025.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("spillkalender-container");
      if (!container) return;

      // Legg til filter UI
      const filterBox = document.createElement("div");
      filterBox.className = "filter-box";
      filterBox.innerHTML = `
        <div>
          <label for="plattformVelger" class="form-label mb-0 me-2">Plattform:</label>
          <select id="plattformVelger" class="form-select d-inline-block w-auto">
            <option value="alle">Alle</option>
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="Xbox Series X|S">Xbox Series X|S</option>
            <option value="Switch">Switch</option>
          </select>
        </div>
        <div>
          <label for="maanedVelger" class="form-label mb-0 me-2">Måned:</label>
          <select id="maanedVelger" class="form-select d-inline-block w-auto">
            <option value="alle">Alle</option>
            ${[...Array(12)].map((_, i) => {
              const m = String(i + 1).padStart(2, "0");
              const navn = new Date(2025, i, 1).toLocaleString("no-NO", { month: "long" });
              return `<option value="${m}">${navn.charAt(0).toUpperCase() + navn.slice(1)}</option>`;
            }).join("")}
          </select>
        </div>
        <div>
          <button id="nullstillFilter" class="btn btn-sm btn-secondary">Nullstill filter</button>
        </div>
      `;
      container.appendChild(filterBox);

      // Opprett tabell
      const table = document.createElement("table");
      table.className = "game-calendar";
      const thead = document.createElement("thead");
      thead.innerHTML = `
        <tr>
          <th>Spill</th>
          <th>Lansering</th>
          <th>Plattformer</th>
        </tr>`;
      const tbody = document.createElement("tbody");
      table.appendChild(thead);
      table.appendChild(tbody);
      container.appendChild(table);

      // Sticky header
      table.querySelector("thead").style.position = "sticky";
      table.querySelector("thead").style.top = "0";
      table.querySelector("thead").style.backgroundColor = "#1a1a1a";
      table.querySelector("thead").style.zIndex = "10";

      // Sorter data etter dato
      data.sort((a, b) => new Date(a.release) - new Date(b.release));

      const plattformVelger = document.getElementById("plattformVelger");
      const maanedVelger = document.getElementById("maanedVelger");
      const nullstillKnapp = document.getElementById("nullstillFilter");

      function render(dataToRender, begrens = true) {
        tbody.innerHTML = "";

        const gammelKnapp = container.querySelector(".vis-alle-knapp");
        if (gammelKnapp) gammelKnapp.remove();

        let spillSomVises = dataToRender;
        const maksAntall = 10;

        if (begrens && dataToRender.length > maksAntall) {
          spillSomVises = dataToRender.slice(0, maksAntall);

          const visAlleKnapp = document.createElement("button");
          visAlleKnapp.className = "btn btn-outline-light mt-3 vis-alle-knapp";
          visAlleKnapp.textContent = `Vis alle (${dataToRender.length}) spill`;
          visAlleKnapp.addEventListener("click", () => render(dataToRender, false));
          container.appendChild(visAlleKnapp);
        }

        if (spillSomVises.length === 0) {
          tbody.innerHTML = `<tr><td colspan="3">Ingen spill funnet.</td></tr>`;
          return;
        }

        spillSomVises.forEach((spill) => {
          const tr = document.createElement("tr");
          const tittelKolonne = spill.url
            ? `<a href="${spill.url}" target="_blank" rel="noopener noreferrer">${spill.title}</a>`
            : spill.title;

          const plattformIkoner = spill.platforms.map(p => {
            const iconMap = {
              "PC": "💻", "PS5": "🎮", "Xbox Series X|S": "🕹️", "Switch": "🧢"
            };
            return `<span class="tag">${iconMap[p] || ""} ${p}</span>`;
          }).join(" ");

          tr.innerHTML = `
            <td>${tittelKolonne}</td>
            <td>${new Date(spill.release).toLocaleDateString("no-NO", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}</td>
            <td>${plattformIkoner}</td>
          `;
          tbody.appendChild(tr);
        });
      }

      function applyFilter() {
        const valgtPlattform = plattformVelger.value;
        const valgtMaaned = maanedVelger.value;

        const filtrert = data.filter(spill => {
          const plattformMatch = valgtPlattform === "alle" || spill.platforms.includes(valgtPlattform);
          const maanedMatch = valgtMaaned === "alle" || (spill.release && spill.release.split("-")[1] === valgtMaaned);
          return plattformMatch && maanedMatch;
        });

        const brukBegrensning = valgtPlattform === "alle" && valgtMaaned === "alle";
        render(filtrert, brukBegrensning);
      }

      plattformVelger.addEventListener("change", applyFilter);
      maanedVelger.addEventListener("change", applyFilter);
      nullstillKnapp.addEventListener("click", () => {
        plattformVelger.value = "alle";
        maanedVelger.value = "alle";
        render(data, true);
      });

      // Forhåndsvelg inneværende måned
      const idagMaaned = new Date().toISOString().split("-")[1];
      maanedVelger.value = idagMaaned;

      applyFilter();
    })
    .catch((err) => {
      console.error("Kunne ikke laste spillkalender:", err);
    });
});
