document.addEventListener("DOMContentLoaded", function () {
    fetch("/data/butikker.json")
      .then((res) => res.json())
      .then((butikker) => {
        const itemList = butikker
          .filter((butikk) => butikk.name && butikk.url)
          .slice(0, 20)
          .map((butikk, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": butikk.name,
            "url": butikk.affiliateUrl || butikk.url
          }));
  
        const schema = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Alle nettbutikker på Butikkoversikt.no",
          "description": "Full oversikt over norske nettbutikker. Utforsk kategorier og finn trygge butikker.",
          "url": "https://butikkoversikt.no/alle-butikker.html",
          "numberOfItems": itemList.length,
          "itemListElement": itemList
        };
  
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
  });
  