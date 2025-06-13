document.addEventListener('DOMContentLoaded', function () {
    const kategoriNavn = document.getElementById('kategoriTittel')?.textContent?.trim() || "Kategori";
    const kategoriSlug = window.location.search.match(/kategori=([a-z0-9-]+)/i)?.[1] || "";
  
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Butikkoversikt",
          "item": "https://butikkoversikt.no"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": kategoriNavn,
          "item": `https://butikkoversikt.no/kategori/${kategoriSlug}`
        }
      ]
    };
  
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumb);
    document.head.appendChild(script);
  });
  