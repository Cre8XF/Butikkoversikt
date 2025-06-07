document.addEventListener("DOMContentLoaded", function () {
    // === Generer kampanjer ===
    fetch("assets/data/kampanjer-forside.json")
      .then((res) => res.json())
      .then((data) => {
        const kampanjeContainer = document.getElementById("forside-kampanjer");
        if (!kampanjeContainer) return;
        data.forEach((kampanje) => {
          const div = document.createElement("div");
          div.className = "kampanje-kort";
          div.innerHTML = `
            <a href="${kampanje.url}" class="text-decoration-none">
  <div class="kort-bilde">
    <img 
      src="${kampanje.image}" 
      alt="${kampanje.title}" 
      width="400" 
      height="250" 
      loading="lazy" 
      style="object-fit: contain; width: 100%; height: 160px; background: #fff; border-radius: 0.5rem 0.5rem 0 0;">
  </div>
  <div class="kort-innhold">
    <h3>${kampanje.title}</h3>
    <p>${kampanje.description}</p>
  </div>
</a>

          `;
          kampanjeContainer.appendChild(div);
        });
      });
  
    // === Generer guider ===
    fetch("assets/data/guider.json")
      .then((res) => res.json())
      .then((data) => {
        const guiderContainer = document.getElementById("forside-guider");
        if (!guiderContainer) return;
        const visGuider = data.slice(0, 2); // Vis 2 guider
        visGuider.forEach((guide) => {
          const div = document.createElement("div");
          div.className = "guide-kort";
          div.innerHTML = `
            <a href="${guide.url}" class="text-decoration-none">
  <div class="kort-bilde">
    <img 
      src="${guide.image}" 
      alt="${guide.title}" 
      width="400" 
      height="250" 
      loading="lazy" 
      style="object-fit: contain; width: 100%; height: 160px; background: #fff; border-radius: 0.5rem 0.5rem 0 0;">
  </div>
  <div class="kort-innhold">
    <h3>${guide.title}</h3>
    <p>${guide.description}</p>
  </div>
</a>

          `;
          guiderContainer.appendChild(div);
        });
      });
  
    // === Generer annonser ===
    fetch("assets/data/annonser.json")
      .then((res) => res.json())
      .then((data) => {
        const annonseContainer = document.getElementById("forside-annonser");
        if (!annonseContainer) return;
        const visAnnonser = data.slice(0, 2); // Vis 2 annonser
        visAnnonser.forEach((annonse) => {
          const div = document.createElement("div");
          div.className = "annonse-kort";
          div.innerHTML = `
            <a href="${annonse.url}" class="text-decoration-none" target="_blank" rel="noopener">
  <div class="kort-bilde">
    <img 
      src="${annonse.image}" 
      alt="${annonse.title}" 
      width="400" 
      height="250" 
      loading="lazy" 
      style="object-fit: contain; width: 100%; height: 160px; background: #fff; border-radius: 0.5rem 0.5rem 0 0;">
  </div>
  <div class="kort-innhold">
    <h3>${annonse.title}</h3>
    <p>${annonse.description}</p>
  </div>
</a>

          `;
          annonseContainer.appendChild(div);
        });
      });
  });
  