document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("header-placeholder");
  const html = document.documentElement;

  // 1. Sett tidligere valgt tema fra localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
  }

  if (placeholder) {
    fetch("components/header.html")
      .then((res) => res.text())
      .then((htmlContent) => {
        placeholder.innerHTML = htmlContent;

        // 🌗 Theme-knapp
        const btn = document.getElementById("themeToggleBtn");

        function setTheme(mode) {
          html.setAttribute("data-theme", mode);
          localStorage.setItem("theme", mode);
          if (btn) btn.innerHTML = mode === "dark" ? "🌞 Lys" : "🌙 Mørk";
        }

        const stored = localStorage.getItem("theme") || "light";
        setTheme(stored);

        if (btn) {
          btn.addEventListener("click", () => {
            const current = localStorage.getItem("theme") || "light";
            const next = current === "light" ? "dark" : "light";
            setTheme(next);
          });
        }

        // 🔎 Last inn søkescript etter at header er lagt inn
        const script = document.createElement("script");
        script.src = "/assets/js/autocomplete-sok.js";
        script.defer = true;
        document.body.appendChild(script);
      })
      .catch((err) => {
        console.error("Kunne ikke laste header:", err);
      });
  }
});
  
