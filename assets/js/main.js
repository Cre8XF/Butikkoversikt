// 📊 Google Analytics 4-sporing
(function () {
  const GA_MEASUREMENT_ID = 'G-H7E9JLM5J1'; // ← BYTT UT denne med din ekte ID fra GA4

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
})();


document.addEventListener("DOMContentLoaded", () => {
  // Søkefelt
  const searchToggle = document.querySelector(".search-toggle");
  const searchBar = document.getElementById("searchBar");
  const closeSearch = document.getElementById("closeSearch");

  if (searchToggle && searchBar && closeSearch) {
    searchToggle.addEventListener("click", (e) => {
      e.preventDefault();
      searchBar.classList.toggle("show");
    });
    closeSearch.addEventListener("click", () => {
      searchBar.classList.remove("show");
    });
  }

  // Vis alle / færre
  const toggleBtn = document.getElementById("toggleStoresBtn");
  const hiddenStores = document.querySelectorAll(".extra-store");

  toggleBtn?.addEventListener("click", () => {
    hiddenStores.forEach((store) => store.classList.toggle("d-none"));
    toggleBtn.textContent =
      toggleBtn.textContent === "Vis færre" ? "Vis alle" : "Vis færre";
  });

  // Kommentarboks
  document.querySelectorAll(".toggle-comment").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.nextElementSibling.classList.toggle("d-none");
    });
  });

  document.querySelectorAll(".send-comment").forEach((sendBtn) => {
    sendBtn.addEventListener("click", () => {
      const inputBox = sendBtn.previousElementSibling;
      const comment = inputBox.value.trim();
      if (comment) {
        const display = sendBtn
          .closest(".comment-box")
          .querySelector(".user-comment");
        display.textContent = comment;
        sendBtn.closest(".comment-input").classList.add("d-none");
        inputBox.value = "";
      }
    });
  });

  // Filter: dropdown
  const filterDropdown = document.getElementById("categoryFilter");
  const storeCards = document.querySelectorAll("#storeGrid .col-md-3");

  filterDropdown?.addEventListener("change", () => {
    const selectedCategory = filterDropdown.value.toLowerCase();

    storeCards.forEach((card) => {
      const badge = card.querySelector(".badge");
      const category = badge ? badge.textContent.replace("#", "").toLowerCase() : "";

      if (selectedCategory === "all" || category === selectedCategory) {
        card.classList.remove("d-none");
      } else {
        card.classList.add("d-none");
      }
    });
  });

  // Filter: klikkbare badges
  const badges = document.querySelectorAll(".filter-badge");
const stores = document.querySelectorAll("#storeGrid .col-md-3");

badges.forEach(badge => {
  badge.addEventListener("click", () => {
    const category = badge.dataset.category;

    stores.forEach(store => {
      const storeCategory = store.dataset.category?.toLowerCase();

      if (category === "all" || storeCategory === category.toLowerCase()) {
        store.classList.remove("d-none");
      } else {
        store.classList.add("d-none");
      }
    });

    badges.forEach(b => b.classList.remove("active"));
    badge.classList.add("active");

    // Endre knappetekst tilbake til "Vis alle"
    const toggleBtn = document.getElementById("toggleStoresBtn");
    if (toggleBtn) toggleBtn.textContent = "Vis alle";

    const section = document.getElementById("anbefalte");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});


  // Dynamisk annonselasting
  const adContainer = document.getElementById("adContainer");
  fetch("assets/data/ads.json")
    .then((res) => res.json())
    .then((ads) => {
      ads.forEach((ad) => {
        const a = document.createElement("a");
        a.href = ad.link;
        a.target = "_blank";
        a.innerHTML = `<img 
        src="${ad.image}" 
        alt="${ad.alt}" 
        width="400" 
        height="250" 
        loading="lazy" 
        style="object-fit: contain;">`;
      
        a.dataset.adId = ad.id;

        a.addEventListener("click", () => {
          console.log("Annonse klikket:", ad.id);
        });

        adContainer?.appendChild(a);
      });
    });
});

// Affiliate-lenkeoppsett
document.addEventListener("DOMContentLoaded", function () {
  // Velg alle lenker med data-affiliate-attributt
  const affiliateLinks = document.querySelectorAll('a[data-affiliate]');

  affiliateLinks.forEach(link => {
    link.setAttribute('rel', 'noopener sponsored');
    link.setAttribute('target', '_blank');
  });
});


document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Takk for at du meldte deg på! Vi sender deg våre beste tilbud snart.');
  this.reset();
});
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Takk for at du meldte deg på! Vi sender deg våre beste tilbud snart.');
    this.reset();
  });
}


