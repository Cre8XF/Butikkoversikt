document.addEventListener('DOMContentLoaded', function () {
    fetch('/data/kampanjer.json')
      .then(res => res.json())
      .then(kampanjer => {
        const kampanjerSchema = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Aktuelle kampanjer fra nettbutikker",
          "description": "Ukentlige tilbud og kampanjer fra norske nettbutikker – spar penger på elektronikk, mote, sport og mer.",
          "url": "https://butikkoversikt.no/kampanjer.html",
          "numberOfItems": kampanjer.length,
          "itemListElement": kampanjer.slice(0, 12).map((kampanje, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": kampanje.title || kampanje.tittel || "Kampanje",
            "url": kampanje.url || kampanje.lenke
          }))
        };
  
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(kampanjerSchema);
        document.head.appendChild(script);
      });
  });
  