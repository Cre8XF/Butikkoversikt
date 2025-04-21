
// Eventuelt interaktiv toggle for fremtidige funksjoner
// Kan utvides med å vise/skjule underkategorier dynamisk
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".toggle-underkategori");
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      target.classList.toggle("d-none");
    });
  });
});
