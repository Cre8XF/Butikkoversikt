function genererTags() {
  const dummy = {
    name: "Eksempelbutikk",
    beskrivelse: "Vi selger alt innen sport og fritid, inkludert sykler og turutstyr.",
    tags: ["sport", "fritid", "sykkel", "tur"]
  };
  document.getElementById("output").textContent = JSON.stringify(dummy, null, 2);
}