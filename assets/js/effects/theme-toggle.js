
// Theme toggle script for light/dark mode
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('themeToggleBtn');

  function setTheme(mode) {
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      btn.innerHTML = '☀️ Lys';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem('theme', 'light');
      btn.innerHTML = '🌙 Mørk';
    }
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  btn.addEventListener('click', function() {
    const current = localStorage.getItem('theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
  });
});

