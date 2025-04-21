document.addEventListener("DOMContentLoaded", () => {
  fetch("butikker.json")
    .then(response => response.json())
    .then(data => {
      console.log("Butikker lastet inn:", data);  // 🔍 legg til denne
      
      const container = document.getElementById("forsideAnbefalte");
      const anbefalte = data.filter(butikk => butikk.fremhevet === true);


      anbefalte.forEach(butikk => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-3";

        col.innerHTML = `
          <a href="${butikk.url}" target="_blank" rel="noopener" class="text-decoration-none text-dark">
            <div class="card h-100 text-center p-3">
              <img src="${butikk.image}" alt="${butikk.alt}" class="img-fluid mb-2" loading="lazy" onerror="this.src='assets/images/logo-mangler.png'" />
              <h6>${butikk.name}</h6>
              <p class="small text-muted">${butikk.description || ''}</p>
            </div>
          </a>
        `;
        container.appendChild(col);
      });
    })
    .catch(error => {
      console.error("Feil ved lasting av butikkdata:", error);  // 🔍 og denne
    });
});
