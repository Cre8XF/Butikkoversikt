document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeMenu');

  if (toggle && menu && overlay) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  if (closeBtn && menu && overlay) {
    closeBtn.addEventListener('click', () => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
    });
  }
});
