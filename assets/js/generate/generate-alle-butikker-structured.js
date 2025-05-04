
// Oppdatert visButikker-funksjon med samme struktur som Topp 25-kort

function visButikker(butikker) {
  const container = document.getElementById("butikk-container");
  const teller = document.getElementById("butikk-teller");
  container.innerHTML = "";

  butikker.forEach((butikk) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex";

    const card = document.createElement("div");
    card.className = "card category-card h-100 d-flex flex-column text-center";

    const imgLink = document.createElement("a");
    imgLink.href = butikk.url;
    imgLink.target = "_blank";
    imgLink.rel = "noopener";

    const img = document.createElement("img");
    img.src = butikk.image;
    img.alt = butikk.name;
    img.className = "card-img-top p-3";
    img.loading = "lazy";
    img.style.height = "120px";
    img.style.objectFit = "contain";

    imgLink.appendChild(img);
    card.appendChild(imgLink);

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column justify-content-between";

    const bodyInner = document.createElement("div");
    const title = document.createElement("h6");
    title.className = "card-title";
    title.textContent = butikk.name;

    const desc = document.createElement("p");
    desc.className = "card-text small text-muted";
    desc.textContent = butikk.description || "";

    bodyInner.appendChild(title);
    bodyInner.appendChild(desc);

    const btn = document.createElement("a");
    btn.href = butikk.url;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.className = "btn btn-primary mt-3";
    btn.textContent = "Besøk";

    body.appendChild(bodyInner);
    body.appendChild(btn);

    card.appendChild(body);
    col.appendChild(card);
    container.appendChild(col);
  });

  if (teller) {
    teller.textContent = `Viser ${butikker.length} butikker`;
  }
}
