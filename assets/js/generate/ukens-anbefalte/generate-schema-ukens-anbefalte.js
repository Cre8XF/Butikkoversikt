document.addEventListener("DOMContentLoaded", function () {
    fetch("/data/butikker.json")
      .then((res) => res.json())
      .then((butikker) => {
        const anbefalte = butikker
          .filter((butikk) => butikk.ukensAnbefalte === true && butikk.name && (butikk.url || butikk.affiliateUrl))
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
          "name": "Ukens anbefalte nettbutikker",
          "description": "Disse nettbutikkene anbefales denne uken av Butikkoversikt.no – utvalgt for kvalitet, tilbud og trygg handel.",
          "url": "https://butikkoversikt.no/ukens-anbefalte.html",
          "numberOfItems": anbefalte.length,
          "itemListElement": anbefalte
        };
  
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
  });
  