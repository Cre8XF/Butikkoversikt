
const tags = [
  "Barn og baby", "baby", "barneklær", "leker", "klær", "sport", "elektronikk", "gaming",
  "gaver", "bøker", "møbler", "skjønnhet", "mat", "hobby", "reise", "popkultur"
];

const tagFilter = document.getElementById("tagFilter");
if (tagFilter) {
  tags.forEach(tag => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary btn-sm m-1";
    btn.textContent = tag;
    btn.setAttribute("data-tag", tag);
    btn.onclick = () => {
      const event = new CustomEvent("filterByTag", { detail: tag });
      document.dispatchEvent(event);
      const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("mobilFilter"));
      offcanvas?.hide();
    };
    tagFilter.appendChild(btn);
  });
}

document.addEventListener("filterByTag", (e) => {
  const valgtTag = e.detail.toLowerCase();
  document.querySelectorAll(".store-card").forEach(card => {
    const tags = (card.getAttribute("data-tags") || "").toLowerCase();
    card.style.display = tags.includes(valgtTag) ? "block" : "none";
  });
});
