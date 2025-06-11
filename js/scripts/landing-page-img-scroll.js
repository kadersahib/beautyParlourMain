 
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

setInterval(() => {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
}, 3000);
