fetch("assets/data/kampanjer.json")
  .then(res => res.json())
  .then(data => {
    if (!data.length) return;

    const kampanje = data[0]; // evt. random: data[Math.floor(Math.random() * data.length)]

    document.getElementById("kampanje-tittel").textContent = kampanje.title;
    document.getElementById("kampanje-beskrivelse").textContent = kampanje.description;
    document.getElementById("kampanje-bilde").src = kampanje.image;
    document.getElementById("kampanje-bilde").alt = kampanje.title;
    document.getElementById("kampanje-lenke").href = kampanje.link;

    document.getElementById("ukens-kampanje").classList.remove("d-none");
  })
  .catch(err => console.error("Klarte ikke å hente kampanje:", err));
