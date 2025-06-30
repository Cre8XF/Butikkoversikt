fetch("assets/data/butikker.json")
  .then(res => res.json())
  .then(data => {
    const gamingContainer = document.getElementById("gamingButikker");
    const gamingStores = data.filter(b => b.category === "Gaming og tilbehør");

    gamingStores.forEach(store => {
      const card = document.createElement("div");
      card.className = "gaming-store-card";
      card.innerHTML = `
        <a href="${store.url}" target="_blank" rel="noopener">
          <img src="${store.image}" alt="${store.alt}" />
          <h4>${store.name}</h4>
          <p>${store.description || ""}</p>
        </a>
      `;
      gamingContainer.appendChild(card);
    });
  });
