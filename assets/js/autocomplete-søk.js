document.addEventListener("DOMContentLoaded", () => {
  const søkefelt = document.getElementById("searchInput");
  const liste = document.getElementById("autocomplete-list");

  let alleForslag = [];

  async function hentData() {
    const butikkerRes = await fetch("assets/data/butikker.json");
    const guiderRes = await fetch("assets/data/guider.json");

    const butikker = await butikkerRes.json();
    const guider = await guiderRes.json();

    const kategorier = [
      "Klær og mote", "Elektronikk og data", "Helse og skjønnhet",
      "Barn og baby", "Møbler og interiør", "Sport og fritid",
      "Spill og underholdning", "Mat og drikke", "Hobby og DIY",
      "Reise og opplevelser", "Gaver og gadgets", "Bøker og media", "Alt-mulig butikker"
    ];

    alleForslag = [
  ...butikker
    .filter(b => b.name)
    .map(b => ({ name: b.name, type: "butikk" })),
  ...guider
    .filter(g => g.tittel)
    .map(g => ({ name: g.tittel, type: "guide" })),
  ...kategorier
    .filter(k => k)
    .map(k => ({ name: k, type: "kategori" }))
];
  }

  hentData();

  søkefelt.addEventListener("input", function () {
    const val = this.value.trim().toLowerCase();
    liste.innerHTML = "";

    if (val.length < 2) return;

    const treff = alleForslag.filter(item =>
      item.name.toLowerCase().includes(val)
    ).slice(0, 10);

    treff.forEach(item => {
      const li = document.createElement("li");

      const regex = new RegExp(`(${val})`, "gi");
      const markertNavn = item.name.replace(regex, "<strong>$1</strong>");

      let ikon = "";
      if (item.type === "butikk") ikon = "🏪";
      if (item.type === "kategori") ikon = "🏷️";
      if (item.type === "guide") ikon = "📘";

      li.innerHTML = `${ikon} ${markertNavn}`;
      li.dataset.type = item.type;
      li.dataset.name = item.name;
      li.addEventListener("click", () => {
        if (item.type === "butikk") {
          window.location.href = `butikk.html?navn=${encodeURIComponent(item.name)}`;
        } else if (item.type === "guide") {
          window.location.href = `guider/guide.html?tittel=${encodeURIComponent(item.name)}`;
        } else if (item.type === "kategori") {
          window.location.href = `kategori.html?kategori=${encodeURIComponent(item.name)}`;
        }
      });
      liste.appendChild(li);
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target !== søkefelt && !liste.contains(e.target)) {
      liste.innerHTML = "";
    }
  });
});
