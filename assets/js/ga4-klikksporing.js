// 📊 Google Analytics 4 – Klikksporing for butikkort, kampanjer og knapper
document.addEventListener('click', function (e) {
  const el = e.target.closest('[data-track-click]');
  if (!el) return;

  const category = el.dataset.trackCategory || 'ukjent';
  const label = el.dataset.trackLabel || el.href || 'ukjent';

  if (typeof gtag === 'function') {
    gtag('event', 'click', {
      event_category: category,
      event_label: label
    });
  }
});
