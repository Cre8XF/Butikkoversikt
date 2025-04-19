document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    const sections = document.querySelectorAll('.filter-section');

    sections.forEach(section => {
      const category = section.getAttribute('data-category');
      if (filter === 'alle' || category === filter) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });

    document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});
