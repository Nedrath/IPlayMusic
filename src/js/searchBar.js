
let searchIcon = document.querySelector(".search-icon")
let headerSearch = document.querySelector(".header-search")
// let results = document.querySelector(".header-search__results")

searchIcon.addEventListener("click", function () {
    headerSearch.classList.toggle("hide")
    // console.log(headerSearch)
})

// CATEGORIES
fetch('https://api.spotify.com/v1/search?q=Muse&type=track&market=US&limit=10&offset=5', {
    "method": "GET",
    headers: {
        'Authorization': `Bearer ${myToken}`
    }
})
    .then(response => response.json())
    .then(data => {

        let searchBox = document.querySelector(".header-search");
        // let search = document.querySelector(".header-search__input")

        data.tracks.items.forEach(searchResult => {

            let searchBar = document.createElement("div");
            searchBar.className = "header-search__box";

            searchBar.innerHTML = `
                <a href="" class="header-search__results"></i>${searchResult.artists[0].name} -> ${searchResult.name} </a> 
                `
            searchBox.appendChild(searchBar);
        });

    });