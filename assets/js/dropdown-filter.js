document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("mobilCategorySelect");
  if (!select) return;

  select.addEventListener("change", (e) => {
    const valgtKategori = e.target.value.toLowerCase();
    document.querySelectorAll(".store-card").forEach(card => {
      const kategori = (card.getAttribute("data-category") || "").toLowerCase();
      card.style.display = !valgtKategori || kategori === valgtKategori ? "block" : "none";
    });
  });
});
