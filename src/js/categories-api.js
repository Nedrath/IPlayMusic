function hideShow(event) {
    if (event.target.parentElement.lastChild.classList.contains("subCatContainer")) {
        event.target.parentElement.lastChild.remove();
    }
}

// CATEGORIES
fetch('https://api.spotify.com/v1/browse/categories/?&local=en_GB', {
    "method": "GET",
    headers: {
        'Authorization': `Bearer ${myToken}`
    }
})
    .then(response => response.json())
    .then(data => {

        // console.log(data)
        let categoriesBox = document.querySelector(".categories");

        data.categories.items.forEach(categoriesName => {

            let categories = document.createElement("article");
            categories.className = "categories__article";

            categories.innerHTML = `
                    <button class="pickButtons pickButtons_alternative round button-text-white">
                        ${categoriesName.name}
                        <ion-icon style="color: white; height: 30px; width: 30px;" name="ellipsis-horizontal"></ion-icon>
                    </button>
                `
            // console.log(categoriesName.id)

            function showSub() {
                // SUB CATEGORIES
                fetch(`https://api.spotify.com/v1/browse/categories/${categoriesName.id}/playlists`, {
                    "method": "GET",
                    headers: {
                        'Authorization': `Bearer ${myToken}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {

                        let subCatContainer = document.createElement("div");
                        subCatContainer.className = "subCatContainer"

                        data.playlists.items.forEach(subCat => {

                            let foldout = document.createElement("div");
                            foldout.className = "categories__foldout";

                            foldout.innerHTML = `
                                <p class="categories__foldout_text">${subCat.name}</p>
                            `
                            subCatContainer.appendChild(foldout);
                        });
                        categories.appendChild(subCatContainer)
                    });
            }setTimeout(700);

            categoriesBox.appendChild(categories);

            categories.addEventListener("click", function () {
                let subCatContainer = document.querySelector(".subCatContainer")
                if (subCatContainer) {
                    {
                        hideShow(event)
                    }
                } else {
                    showSub()
                }
            })
        });

        (function () {
            var colors = ['#D70060', '#E54028', '#DAA520', '#F2BC06', '#5EB11C', '#3A7634', '#0ABEBE', '#00A1CB', '#115793'],

                divs = Array.from(document.querySelectorAll('button'));
            divs.forEach(function (button, index) {
                button.style.backgroundColor = colors[index % colors.length];
            });
        })();

    })




