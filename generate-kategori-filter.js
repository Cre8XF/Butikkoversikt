document.addEventListener('DOMContentLoaded', function () {
    const butikkContainer = document.getElementById('butikk-container');
    const categoryList = document.getElementById('categoryList');

    // Kategorier og subkategorier
    const categories = [
        { name: "Elektronikk", icon: "💡", subcategories: ["TV", "Mobil", "PC"] },
        { name: "Klær og mote", icon: "👗", subcategories: ["Herreklær", "Dameklær", "Sko"] },
        { name: "Helse og skjønnhet", icon: "💄", subcategories: ["Parfyme", "Hudpleie", "Hårprodukter"] },
        { name: "Sport og fritid", icon: "⚽", subcategories: ["Treningsutstyr", "Friluftsliv"] },
        { name: "Barn og baby", icon: "🍼", subcategories: ["Leker", "Barnevogner"] }
    ];

    // Genererer kategori-listen dynamisk
    categories.forEach(category => {
        const mainCategory = document.createElement('div');
        mainCategory.classList.add('form-check', 'mb-2');
        mainCategory.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${category.name}" id="${category.name}">
            <label class="form-check-label" for="${category.name}">
                ${category.icon} ${category.name}
            </label>
        `;
        categoryList.appendChild(mainCategory);

        category.subcategories.forEach(subcat => {
            const subCategory = document.createElement('div');
            subCategory.classList.add('form-check', 'ms-3');
            subCategory.innerHTML = `
                <input class="form-check-input" type="checkbox" value="${subcat}" id="${subcat}">
                <label class="form-check-label" for="${subcat}">
                    ${subcat}
                </label>
            `;
            categoryList.appendChild(subCategory);
        });
    });

    // Søking i kategorier
    document.getElementById('searchCategories').addEventListener('input', function () {
        const filter = this.value.toLowerCase();
        document.querySelectorAll('#categoryList .form-check').forEach(el => {
            const label = el.querySelector('label').textContent.toLowerCase();
            el.style.display = label.includes(filter) ? '' : 'none';
        });
    });

    // Henter butikker fra JSON og filtrerer
    async function fetchButikker(categories) {
        const response = await fetch('assets/data/butikker.json');
        const butikker = await response.json();
        butikkContainer.innerHTML = '';

        // Søk på delvis tekstmatch
        const filtered = butikker.filter(butikk => 
            categories.some(category => butikk.category.includes(category))
        );

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

    // Lytter på "Filtrer"-knappen
    document.getElementById('applyFilter').addEventListener('click', () => {
        const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cat => cat.value);
        if (selectedCategories.length > 0) {
            fetchButikker(selectedCategories);
        }
    });
});
