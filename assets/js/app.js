// assets/js/app.js
document.addEventListener('DOMContentLoaded', () => {
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);

    // Add other JS: animations, accordion, etc.
    // For accordion in FAQ
    // No need for form submit as it's static
});
