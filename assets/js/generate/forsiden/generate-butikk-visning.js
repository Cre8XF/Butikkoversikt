document.addEventListener('DOMContentLoaded', function () {
    const butikkContainer = document.getElementById('butikk-container');

    async function fetchButikker(category) {
        const response = await fetch('assets/data/butikker.json');
        const butikker = await response.json();
        butikkContainer.innerHTML = '';

        const filtered = butikker.filter(butikk => butikk.category.includes(category));

        if (filtered.length > 0) {
            filtered.forEach(butikk => {
                const card = document.createElement('div');
                card.classList.add('col-md-4');
                card.innerHTML = `
                    <div class="card shadow-sm">
                        <img src="${butikk.image}" class="card-img-top" alt="${butikk.alt}">
                        <div class="card-body">
                            <h5 class="card-title">${butikk.name}</h5>
                            <p class="card-text">${butikk.description}</p>
                            <a href="${butikk.url}" class="btn btn-primary" target="_blank">Besøk butikk</a>
                        </div>
                    </div>
                `;
                butikkContainer.appendChild(card);
            });
        } else {
            butikkContainer.innerHTML = '<p class="text-muted">Ingen treff i denne kategorien.</p>';
        }
    }

    document.getElementById('applyFilter').addEventListener('click', () => {
        const selectedCategory = document.querySelector('input[type="checkbox"]:checked');
        if (selectedCategory) {
            fetchButikker(selectedCategory.value);
        }
    });
});
