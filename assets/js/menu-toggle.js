
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    menu.classList.remove('active');
    overlay.classList.remove('active');
  });
});
document.getElementById('closeMenu').addEventListener('click', () => {
  document.getElementById('sideMenu').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
});
