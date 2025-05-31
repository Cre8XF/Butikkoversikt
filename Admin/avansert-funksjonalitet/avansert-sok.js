
let butikker = [];
fetch('/assets/data/butikker.json')
  .then(res => res.json())
  .then(data => { butikker = data; });

function highlight(txt, q) {
  if (!q) return txt;
  const pattern = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  return txt.replace(pattern, '<span class="highlight">$1</span>');
}

document.getElementById('sokefelt').addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  const container = document.getElementById('resultat');
  if (!q) { container.innerHTML = ''; return; }
  const res = butikker.filter(b =>
    (b.name || '').toLowerCase().includes(q) ||
    (b.description || '').toLowerCase().includes(q) ||
    (b.category || '').toLowerCase().includes(q) ||
    (Array.isArray(b.subcategory) ? b.subcategory.join(',') : (b.subcategory||"")).toLowerCase().includes(q) ||
    (Array.isArray(b.tags) ? b.tags.join(',') : (b.tags||"")).toLowerCase().includes(q)
  );
  if (!res.length) { container.innerHTML = '<em>Ingen treff.</em>'; return; }
  container.innerHTML = res.map(b =>
    `<div class="result-card">
      <h4>${highlight(b.name||'', q)}</h4>
      <div>${highlight(b.description||'', q)}</div>
      <div>Kategori: <b>${highlight(b.category||'', q)}</b> / ${highlight((Array.isArray(b.subcategory)?b.subcategory.join(', '):b.subcategory||''), q)}</div>
      <div class="tags">Tags: ${(b.tags||[]).map(t=>highlight(t, q)).join(', ')}</div>
    </div>`
  ).join("");
});
