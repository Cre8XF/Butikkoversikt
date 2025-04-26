// category-animate.js
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.category-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
