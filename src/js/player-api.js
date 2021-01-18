
let searchParams = new URLSearchParams(document.location.search);
let paramsId = searchParams.get("id");

// PLAYER CONTROLS
let audio = document.getElementById("myAudio"); 
let play = document.querySelector(".playButton");
let pause = document.querySelector(".pauseButton");
let range = document.querySelector(".musicPlayer__timeSlide");

console.log(range)
function timeSlide() {
    
    range.setAttribute("max", audio.duration);

    setInterval(() => {
    range.value = audio.currentTime;
    }, 100);
    
}

play.addEventListener("click", ()=> {
    playAudio()
    timeSlide()
});

pause.addEventListener("click", pauseAudio)

function playAudio() { 
  audio.play(); 
    play.classList.add("hide");
    pause.classList.remove("hide");
} 

function pauseAudio() { 
  audio.pause(); 
  pause.classList.add("hide");
  play.classList.remove("hide");
} 

// PLAYER
fetch(`https://api.spotify.com/v1/tracks/${paramsId}`, {
    "method": "GET",
    headers: {
        'Authorization': `Bearer ${myToken}`
    }
})
    .then(response => response.json())
    .then(data => {

        let playerPortrait = document.querySelector(".player__img");
        playerPortrait.setAttribute("src", data.album.images[0].url);

        let playerArtistName = document.querySelector(".player__name_textBig")
        playerArtistName.innerHTML = `${data.name}`

        let playerArtistNameInfo = document.querySelector(".player__name_textSmall")
        playerArtistNameInfo.innerHTML = `${data.artists[0].name}`

        let playerTimes = document.querySelector(".musicPlayer__time")
        playerTimes.innerHTML = `${msToSecToMin(data.duration_ms)}`

        // PLAYER
        fetch(`https://api.spotify.com/v1/artists/${data.artists[0].id}`, {
            "method": "GET",
            headers: {
                'Authorization': `Bearer ${myToken}`
            }
        })
            .then(response => response.json())
            .then(data => {

                let PortraitImg = document.querySelector(".portraitBox__portrait");
                PortraitImg.setAttribute("src", data.images[1].url)
            });

            // TIME CALC FUNCTION
            function msToSecToMin(millis) {
                var minutes = Math.floor(millis / 60000);
                var seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }

    });
