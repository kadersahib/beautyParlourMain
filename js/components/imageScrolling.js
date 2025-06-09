
const imageScrolling = [
  {
    src: "./public/images/scrolling-image-1.png",
    text: "Everything you need for flawless beauty, all in one place."
  },
  {
    src: "./public/images/scrolling-image-2.png",
    text: "Your go-to tools for effortless glam and self-care."
  },
  {
    src: "./public/images/scrolling-image-3.png",
    text: "All the essentials to elevate your beauty routine."
  }
];

const bgImage = document.getElementById("bgImage");
const textContainer = document.querySelector(".scrolling-text");
const textParagraphs = textContainer.querySelectorAll("p");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function changeImageAndText() {
  // Fade out image and text
  bgImage.classList.add("fade-out");
  textContainer.classList.add("fade-out");

  setTimeout(() => {
    // Update index
    currentIndex = (currentIndex + 1) % imageScrolling.length;

    // Update image
    bgImage.src = imageScrolling[currentIndex].src;

    // Update text
    textParagraphs.forEach((p, index) => {
      p.style.display = index === 0 ? "block" : "none";
      if (index === 0) p.textContent = imageScrolling[currentIndex].text;
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    // Fade in image and text
    bgImage.classList.remove("fade-out");
    bgImage.classList.add("fade-in");
    textContainer.classList.remove("fade-out");
    textContainer.classList.add("fade-in");

    setTimeout(() => {
      bgImage.classList.remove("fade-in");
      textContainer.classList.remove("fade-in");
    }, 500);
  }, 500);
}

setInterval(changeImageAndText, 2000);
