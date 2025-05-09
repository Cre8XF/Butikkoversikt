document.addEventListener('DOMContentLoaded', function () {
    const categories = [
        { name: "Elektronikk", icon: "💡", subcategories: ["TV", "Mobil", "PC"] },
        { name: "Klær og mote", icon: "👗", subcategories: ["Herreklær", "Dameklær", "Sko"] },
        { name: "Helse og skjønnhet", icon: "💄", subcategories: ["Parfyme", "Hudpleie", "Hårprodukter"] },
        { name: "Sport og fritid", icon: "⚽", subcategories: ["Treningsutstyr", "Friluftsliv"] },
        { name: "Barn og baby", icon: "🍼", subcategories: ["Leker", "Barnevogner"] }
    ];

    const categoryList = document.getElementById('categoryList');
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
});
