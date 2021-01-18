
var intersectionObserver = new IntersectionObserver(function (entries) {

    entries.forEach(entry => {
        if (entry.intersectionRatio <= 0) return;

        entry.target.src = entry.target.dataset.src;
        entry.target.removeAttribute("data-src");
        entry.target.classList.remove("observeMe");
        intersectionObserver.unobserve(entry.target);
        // console.log('Loaded new items');
    })

}, {
    threshold: 0.5
});

let images = document.querySelectorAll('.observeMe');
images.forEach(image => intersectionObserver.observe(image));
