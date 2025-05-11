document.addEventListener('DOMContentLoaded', function () {
    const butikkContainer = document.getElementById('butikk-container');
    const searchInput = document.getElementById('searchCategories');
    const filterButtons = document.querySelectorAll('.filter-button');
    
    // Henter butikker fra JSON
    async function fetchButikker() {
        const response = await fetch('assets/data/butikker.json');
        const butikker = await response.json();
        renderButikker(butikker);
    }

    // Viser butikkortene på siden
    function renderButikker(butikker) {
        butikkContainer.innerHTML = '';

        if (butikker.length > 0) {
            butikker.forEach(butikk => {
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

    // Søkefunksjon
    searchInput.addEventListener('input', async (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const response = await fetch('assets/data/butikker.json');
        const butikker = await response.json();

        const filtered = butikker.filter(butikk => 
            butikk.name.toLowerCase().includes(searchTerm) || 
            butikk.description.toLowerCase().includes(searchTerm) || 
            butikk.category.some(cat => cat.toLowerCase().includes(searchTerm))
        );

        renderButikker(filtered);
    });

    // Filtreringsknapper
    filterButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const category = button.dataset.category;
            const response = await fetch('assets/data/butikker.json');
            const butikker = await response.json();

            const filtered = butikker.filter(butikk => butikk.category.includes(category));
            renderButikker(filtered);
        });
    });

    // Hent butikker ved start
    fetchButikker();
});
