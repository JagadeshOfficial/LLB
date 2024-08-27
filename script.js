document.addEventListener('DOMContentLoaded', function () {
    var dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function(dropdown) {
        var btn = dropdown.querySelector('.dropbtn');
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            dropdowns.forEach(function(otherDropdown) {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('open');
                }
            });
            dropdown.classList.toggle('open');
        });
    });

    window.addEventListener('click', function(e) {
        if (!e.target.matches('.dropbtn')) {
            dropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('open');
            });
        }
    });
});
































let slideIndex = 0;

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    // Increment slide index
    slideIndex++;

    // Reset slide index if it exceeds the number of slides
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    // Automatically change slide every 3 seconds
    setTimeout(showSlides, 3000); // Change the duration to suit your needs
}

// Start the slideshow
showSlides();


