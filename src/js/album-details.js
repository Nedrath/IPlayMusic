
let searchParams = new URLSearchParams(document.location.search);
let paramsId = searchParams.get("id");

fetch(`https://api.spotify.com/v1/albums/${paramsId}`, {
    "method": "GET",
    headers: {
        'Authorization': `Bearer ${myToken}`
    }
})
    .then(response => response.json())
    .then(data => {

        // console.log(data)

        let albumDetails = document.querySelector(".albumDetails__img");
        albumDetails.setAttribute("src", data.images[0].url);

        let albumArtistName = document.querySelector(".albumDetails__title")
        albumArtistName.innerHTML = `${data.name}`

        let albumArtistSongs = document.querySelector(".albumDetails__text")
        albumArtistSongs.innerHTML = `${data.tracks.total} Songs`

    });

// DETTE ER TIL SONGS I ALBUMS
fetch(`https://api.spotify.com/v1/albums/${paramsId}`, {
    "method": "GET",
    headers: {
        'Authorization': `Bearer ${myToken}`
    }
})
    .then(response => response.json())
    .then(data => {

        // console.log(data)
        let songsBox = document.querySelector(".albumDetails");

        data.tracks.items.forEach(newSongs => {

            let songsBoxLink = document.createElement("div");
            songsBoxLink.className = "songsBox songsBox_details albumDetails__songs";

            songsBoxLink.innerHTML = `
                <img class="songsBox__img round hide" src='https://source.unsplash.com/random/50x50' alt=''>
                <div class="circle circle_button">
                <ion-icon class="icons_small white" name="play"></ion-icon>
                </div>
                <div class="songsBox__text">
                <h3 class="small-title-fat small-title-fat_wrap">${newSongs.name}</h3>
                <p class="small-text-lighter">${newSongs.artists[0].name}</p>
                </div>
                <p class="small-text-lighter small-text-lighter_right">3 : 58</p>
                `
            songsBox.appendChild(songsBoxLink);

            let songsLink = document.querySelector(".songsBox")

            songsLink.addEventListener("click", function () {
                location.href = `/player?id=${newSongs.id}`;
            })

        });
    });
