
document.getElementById('batchBtn').onclick = function() {
  try {
    const arr = JSON.parse(document.getElementById('inn').value);
    const feltStr = document.getElementById('nyttFelt').value;
    if (!Array.isArray(arr)) throw "Ikke et JSON-array";
    let felt = {};
    feltStr.split(',').forEach(p => {
      const [k, v] = p.split('=').map(s => s.trim());
      if (k) {
        if (v === "true") felt[k] = true;
        else if (v === "false") felt[k] = false;
        else if (!isNaN(v)) felt[k] = Number(v);
        else felt[k] = v;
      }
    });
    arr.forEach(b => Object.assign(b, felt));
    document.getElementById('ut').textContent = JSON.stringify(arr, null, 2);
  } catch(e) {
    document.getElementById('ut').textContent = "Feil i input eller felt: " + e;
  }
};
