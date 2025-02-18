// Image Slider
const slides = document.querySelectorAll('.slide');
const leftArrow = document.getElementById('left');
const rightArrow = document.getElementById('right');
let activeSlide = 0;

function setActiveSlide() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === activeSlide);
  });
}

function nextSlide() {
  activeSlide = (activeSlide + 1) % slides.length;
  setActiveSlide();
}

function prevSlide() {
  activeSlide = (activeSlide - 1 + slides.length) % slides.length;
  setActiveSlide();
}

rightArrow.addEventListener('click', nextSlide);
leftArrow.addEventListener('click', prevSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// FAQ Toggle
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const answer = toggle.nextElementSibling;
    const icon = toggle.querySelector('.icon');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    icon.classList.toggle('rotate');
  });
});
