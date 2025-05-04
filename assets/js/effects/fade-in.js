document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target); // Slutt å observere etter fade-in
      }
    });
  }, {
    threshold: 0.1
  });

  fadeEls.forEach(el => observer.observe(el));
});
