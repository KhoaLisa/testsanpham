// Image slider logic
const images = [
  "/img/so3.jpg",
  "/img/so2.jpg",
  "/img/so1.webp",
  "/img/so4.webp",
  "/img/so5.jpg",
];

const slides = [document.getElementById("bg1"), document.getElementById("bg2")];
let current = 0;
let showing = 0;
let interval;

function showNext(nextIndex = (current + 1) % images.length) {
  showing = 1 - showing;
  slides[showing].src = images[nextIndex];
  slides[showing].classList.add("active");
  slides[1 - showing].classList.remove("active");
  current = nextIndex;
}

interval = setInterval(showNext, 3000);

document.getElementById("prev").addEventListener("click", () => {
  let next = (current - 1 + images.length) % images.length;
  clearInterval(interval);
  showNext(next);
  interval = setInterval(showNext, 3000);
});

document.getElementById("next").addEventListener("click", () => {
  let next = (current + 1) % images.length;
  clearInterval(interval);
  showNext(next);
  interval = setInterval(showNext, 3000);
});

// Scroll: Change menu background
const menu = document.querySelector(".menu");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    menu.classList.add("scrolled");
  } else {
    menu.classList.remove("scrolled");
  }
});

// Activate underline on click
const links = document.querySelectorAll(".nav-links a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Pulsing effect for fixed icons
const icons = document.querySelectorAll(".fixed-icons a");
setInterval(() => {
  icons.forEach((icon, i) => {
    setTimeout(() => {
      icon.classList.add("pulsing");
      setTimeout(() => {
        icon.classList.remove("pulsing");
      }, 1500);
    }, i * 300);
  });
}, 2000);
