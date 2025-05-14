// footer.js – Henter inn og oppdaterer footer dynamisk

document.addEventListener("DOMContentLoaded", () => {
    // Sett riktig år automatisk
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  
    // Hent inn footer.html hvis placeholder finnes
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
      fetch("/components/footer.html")
        .then((res) => res.text())
        .then((html) => {
          footerPlaceholder.innerHTML = html;
  
          // Sett år på nytt dersom det ble hentet inn via innerHTML
          const year = footerPlaceholder.querySelector("#currentYear");
          if (year) {
            year.textContent = new Date().getFullYear();
          }
        })
        .catch((err) => {
          console.error("Klarte ikke å laste inn footer:", err);
        });
    }
  });
  