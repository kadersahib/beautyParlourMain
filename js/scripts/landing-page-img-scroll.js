 
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

setInterval(() => {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
}, 3000);
document.addEventListener('DOMContentLoaded', () => {
  const bookNowButtons = document.querySelectorAll('.services-card .book-now-btn');
  const sliderContainer = document.querySelector('.slider-container');

  bookNowButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (sliderContainer) {
        sliderContainer.style.zIndex = '0';
      }
    });
  });
});
