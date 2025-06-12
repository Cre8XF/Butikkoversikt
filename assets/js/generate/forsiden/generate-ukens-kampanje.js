document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/ukens-kampanje.json")
    .then(response => response.json())
    .then(data => {
      const now = new Date();
      const kampanje = data.find(k => {
        if (!k.endDate) return true;
        const end = new Date(k.endDate);
        end.setHours(23, 59, 59, 999);
        return end >= now;
      });

      if (kampanje) {
        document.getElementById("kampanje-bilde").src = kampanje.image;
        document.getElementById("kampanje-bilde").alt = kampanje.title;
        document.getElementById("kampanje-tittel").textContent = kampanje.title;
        document.getElementById("kampanje-beskrivelse").textContent = kampanje.description;
        document.getElementById("kampanje-lenke").href = kampanje.url;
      }
    })
    .catch(err => console.error("Kunne ikke laste kampanje:", err));
});
