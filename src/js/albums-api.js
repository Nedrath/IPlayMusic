document.addEventListener("DOMContentLoaded", () => {

    // ALBUMS
    fetch('https://api.spotify.com/v1/browse/new-releases', {
        "method": "GET",
        headers: {
            'Authorization': `Bearer ${myToken}`
        }
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)

            let albumSlider = document.querySelector(".slider");

            data.albums.items.forEach(albums => {
                // console.log(albums)

                let sliderImg = document.createElement("img");
                sliderImg.className = "observeMe slider__img round shadow";
                sliderImg.setAttribute("data-src", albums.images[0].url)
                sliderImg.setAttribute("data-id", albums.id);

                sliderImg.addEventListener("click", function(){
                    location.href = `/album-details?id=${albums.id}`;
                });

                albumSlider.appendChild(sliderImg)
            });

            // LAZYLOAD
            var intersectionObserver = new IntersectionObserver(function (entries) {

                entries.forEach(entry => {
                    if (entry.intersectionRatio <= 0) return;

                    entry.target.src = entry.target.dataset.src;
                    entry.target.removeAttribute("data-src");
                    entry.target.classList.remove("observeMe");
                    intersectionObserver.unobserve(entry.target);
                    console.log('Loaded new items');
                })

            }, {
                threshold: 1
            });

            let images = document.querySelectorAll('.observeMe');
            images.forEach(image => intersectionObserver.observe(image));

        });


    // DETTE ER TIL SONGS I ALBUMS

    fetch('https://api.spotify.com/v1/browse/new-releases?country=GB&limit=15', {
        "method": "GET",
        headers: {
            'Authorization': `Bearer ${myToken}`
        }
    })
        .then(response => response.json())
        .then(data => {

            let songsBox = document.querySelector(".albums");

            data.albums.items.forEach(newSongs => {
                // console.log(data)

                let songsBoxLink = document.createElement("a");
                songsBoxLink.className = "songsBox songsBox_margin";
                songsBoxLink.setAttribute("href", "#")

                songsBoxLink.innerHTML = `
                <img data-id="${newSongs.id}" class="songsBox__img round" src='${newSongs.images[0].url}' alt='${newSongs.name}'>
                <div class="songsBox__text">
                <h3 class="small-title-fat small-title-fat_wrap songsBox__text_margin">${newSongs.name}</h3>
                <p class="small-text-lighter songsBox__text_margin">${newSongs.artists[0].name}</p>
                </div>
                <p class="small-text-lighter small-text-lighter_right ">${newSongs.total_tracks} Songs</p>
                `
                songsBox.appendChild(songsBoxLink);

            });

        });

});
