document.getElementById('sokefelt').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  // Dummy resultater
  document.getElementById('resultater').textContent = 'Fant resultater for: ' + query;
});