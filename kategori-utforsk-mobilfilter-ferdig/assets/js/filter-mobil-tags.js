
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("mobilCategorySelect");
  if (select) {
    select.addEventListener("change", () => {
      const valgtKategori = select.value.trim().toLowerCase();
      const kort = document.querySelectorAll("#kategoriContainer [data-category]");

      kort.forEach(card => {
        const kategori = (card.getAttribute("data-category") || "").trim().toLowerCase();
        card.style.display = (!valgtKategori || kategori === valgtKategori) ? "block" : "none";
      });
    });
  }
});
