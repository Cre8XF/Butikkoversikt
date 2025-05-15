document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("header-placeholder");
  const html = document.documentElement;

  // 1. Sett tidligere valgt tema fra localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
  }

  // 2. Last inn headeren og aktiver knapp etterpå
  if (placeholder) {
    fetch("/components/header.html")
      .then((res) => res.text())
      .then((htmlContent) => {
        placeholder.innerHTML = htmlContent;

        // Nå som headeren er lastet, legg til knapp-funksjonalitet
        const btn = document.getElementById("themeToggleBtn");
        if (btn) {
          btn.addEventListener("click", () => {
            const current = html.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";
            html.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
          });
        }
      })
      .catch((err) => {
        console.error("Kunne ikke laste header:", err);
      });
  }
});
