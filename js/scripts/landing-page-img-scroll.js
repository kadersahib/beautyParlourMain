  const slider = document.querySelector('.slider');
  let scrollAmount = 0;
  const slideWidth = slider.offsetWidth;

  setInterval(() => {
    scrollAmount += slideWidth;
    if (scrollAmount >= slider.scrollWidth) {
      scrollAmount = 0;
    }
    slider.scrollTo({
      left: scrollAmount,
      behavior: 'auto'
    });
  }, 3000); // Change image every 3 seconds
