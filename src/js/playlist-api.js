document.addEventListener("DOMContentLoaded", () => {

    // SLIDER
    fetch('https://api.spotify.com/v1/browse/featured-playlists?country=GB&locale=gb_EN&limit=15', {
        "method": "GET",
        headers: {
            'Authorization': `Bearer ${myToken}`
        }
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            let playlistSlider = document.querySelector(".slider-playlist");
            let playlistTopBox = document.querySelector(".playlistTop");

            data.playlists.items.forEach(playlist => {

                let sliderImg = document.createElement("img");
                sliderImg.className = "observeMe slider-playlist slider-playlist__img round shadow";
                sliderImg.setAttribute("data-src", playlist.images[0].url);
                sliderImg.setAttribute("data-id", playlist.id);
                
                sliderImg.addEventListener("click", function () {
                    
                    sliderImg.classList.toggle("clicked-animation")
                    
                    let playlistTopBox = document.querySelector(".playlistTop");
                    playlistTopBox.innerHTML = " ";
                    
                    let albumTextBox = document.createElement("div")
                    albumTextBox.className = "playlistTop__box";
                    
                    playlistTopBox.innerHTML = `
                    <p class="playlistTop__text">${playlist.name}</p>
                    <p style="font-size: 15px;" class="playlistTop__text">${playlist.description}</p>
                    `
                    playlistTopBox.appendChild(albumTextBox);

                    // LOGIK DER SKIFTER TITEL OG INFO
                    getPlaylist(event)
                });

                playlistTopBox.innerHTML = `
                <p class="playlistTop__text">Top 50</p>
                <p class="playlistTop__text">${playlist.name}</p>
                `
                playlistSlider.appendChild(sliderImg);
            });

            // LAZYLOAD
            var intersectionObserver = new IntersectionObserver(function (entries) {

                entries.forEach(entry => {
                    if (entry.intersectionRatio <= 0) return;

                    entry.target.src = entry.target.dataset.src;
                    entry.target.removeAttribute("data-src");
                    entry.target.classList.remove("observeMe");
                    intersectionObserver.unobserve(entry.target);

                })

            }, {
                threshold: 0.5
            });

            let images = document.querySelectorAll('.observeMe');
            images.forEach(image => intersectionObserver.observe(image));

        });

    function getPlaylist(event) {
        let id = event.target.getAttribute("data-id")
        // console.log(id)

        // SONGS
        fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?&limit=15`, {
            "method": "GET",
            headers: {
                'Authorization': `Bearer ${myToken}`
            }
        })
            .then(response => response.json())
            .then(data => {

                let songsBox = document.querySelector(".playlist-songs");
                songsBox.innerHTML = " ";

                data.items.forEach(playlistSongs => {
                    //   console.log(playlistSongs)

                    let songsBoxLink = document.createElement("a");
                    songsBoxLink.className = "links";
                    songsBoxLink.setAttribute("href", `/player?id=${playlistSongs.track.id}`);

                    songsBoxLink.innerHTML = `
                    <div class="songsBox songsBox_details margin-left-right">
                    <img class="songsBox__img round hide" src='https://source.unsplash.com/random/50x50' alt=''>
                    <div class="circle circle_button">
                    <ion-icon class="icons_small white" name="play"></ion-icon>
                    </div>
                    <div class="songsBox__text">
                    <h3 class="small-title-fat small-title-fat_wrap">${playlistSongs.track.name}</h3>
                    <p class="small-text-lighter textWrap">${playlistSongs.track.artists[0].name}</p>
                    </div>
                    <p class="small-text-lighter small-text-lighter_right">${msToSecToMin(playlistSongs.track.duration_ms)}</p>
                    </div>
                    `
                    songsBox.appendChild(songsBoxLink);

                });

                // TIME CALC FUNCTION
                function msToSecToMin(millis) {
                    var minutes = Math.floor(millis / 60000);
                    var seconds = ((millis % 60000) / 1000).toFixed(0);
                    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                }

            });

    }

});
