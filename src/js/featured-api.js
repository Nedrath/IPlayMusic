document.addEventListener("DOMContentLoaded", () => {

    // IMAGECARD
    fetch('https://api.spotify.com/v1/browse/featured-playlists?country=GB&locale=gb_EN&limit=15', {
        "method": "GET",
        headers: {
            'Authorization': `Bearer ${myToken}`
        }
    })
        .then(response => response.json())
        .then(data => {

            let featured = document.querySelector(".featured");

            data.playlists.items.forEach(playlist => {

                let imageCard = document.createElement("article");
                imageCard.className = "imageCard";
                imageCard.addEventListener("click", function(){
                    location.href = "playlist/index.html";
                })

                imageCard.innerHTML = `
                <img class="observeMe imageCard__img round shadow imgShadowBottom" data-src='${playlist.images[0].url}'
                alt='${playlist.name}'>
            <svg version="1.1" class="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="150px"  height="150px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
            <path opacity="0.2" fill="#DAA510" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
              s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
              c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
            <path fill="#DAA520" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
              C22.32,8.481,24.301,9.057,26.013,10.047z">
              <animateTransform attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="0.5s"
                repeatCount="indefinite"/>
              </path>
            </svg>

                <div class="imageCard__textBox">
                <h1 class="imageCard__title hide">
                    The Greatest Showman
                </h1>
                <p class="imageCard__text">${playlist.type}</p>
                </div>
                
                `
                featured.appendChild(imageCard)

            });

            // LAZYLOAD
            var intersectionObserver = new IntersectionObserver(function (entries) {

                entries.forEach(entry => {
                    if (entry.intersectionRatio <= 0) return;

                    entry.target.src = entry.target.dataset.src;
                    entry.target.removeAttribute("data-src");
                    entry.target.classList.remove("observeMe");
                    intersectionObserver.unobserve(entry.target);
                    let spinner = entry.target.querySelector(".loader-1")
                    entry.target.closest("article").removeChild(entry.target.nextElementSibling)
                    // console.log(entry.target.nextElementSibling)
                    console.log('Loaded new items');
                })

            }, {
                threshold: 0.5
            });

            let images = document.querySelectorAll('.observeMe');
            images.forEach(image => intersectionObserver.observe(image));

        });

});
