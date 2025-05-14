document.addEventListener("DOMContentLoaded", () => {
    const placeholder = document.getElementById("header-placeholder");
    if (placeholder) {
      fetch("/components/header.html")
        .then((res) => res.text())
        .then((html) => {
          placeholder.innerHTML = html;
        })
        .catch((err) => {
          console.error("Kunne ikke laste header:", err);
        });
    }
  });
  