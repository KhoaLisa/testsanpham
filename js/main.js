// Đảm bảo DOM tải xong trước khi chạy
document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // SLIDER ẢNH CHÍNH
  // ==========================
  const slides = document.querySelectorAll(".slide");
  let current = 0;
  let interval;

  function showSlide(index) {
    if (!slides.length) {
      console.error("Không tìm thấy các slide!");
      return;
    }
    slides.forEach((img, i) => {
      img.classList.remove("active");
      if (i === index) img.classList.add("active");
    });
    current = index;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (current - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
  }

  showSlide(current);
  startInterval();

  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      console.log("Clicked next");
      clearInterval(interval);
      nextSlide();
      startInterval();
    });
    prevBtn.addEventListener("click", () => {
      console.log("Clicked prev");
      clearInterval(interval);
      prevSlide();
      startInterval();
    });
  } else {
    console.error("Không tìm thấy nút next hoặc prev!");
  }

  // ==========================
  // SLIDER DỊCH VỤ COMBO CARD
  // ==========================
  const track = document.getElementById("sliderTrack");
  const cards = document.querySelectorAll(".combo-card");
  let currentIndex = 0;
  let direction = 1;

  function updateSlider() {
    if (!track || !cards.length) {
      console.error("Không tìm thấy track hoặc cards!");
      return;
    }
    const cardWidth = cards[0].offsetWidth + 30;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function moveSlide(step) {
    const maxIndex = cards.length - 3;
    currentIndex += step;
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;
    updateSlider();
  }

  function autoSlide() {
    const maxIndex = cards.length - 3;
    if (currentIndex === maxIndex) direction = -1;
    else if (currentIndex === 0) direction = 1;
    moveSlide(direction);
  }

  setInterval(autoSlide, 5000);
  updateSlider(); // Khởi tạo slider

  const sliderButtons = document.querySelectorAll(".slider-buttons button");
  if (sliderButtons.length === 2) {
    sliderButtons[0].addEventListener("click", () => {
      console.log("Clicked prev combo");
      moveSlide(-1);
    });
    sliderButtons[1].addEventListener("click", () => {
      console.log("Clicked next combo");
      moveSlide(1);
    });
  } else {
    console.error("Không tìm thấy đủ nút trong .slider-buttons!");
  }

  // ==========================
  // SLIDER ẢNH NGANG (CAROUSEL)
  // ==========================
  const trackWrapper = document.querySelector(".carousel-track-wrapper");
  const trackCarousel = document.querySelector(".carousel-track");
  const items = trackCarousel.querySelectorAll(".image-item");
  const prevCarouselBtn = document.querySelector(".carousel-btn.prev");
  const nextCarouselBtn = document.querySelector(".carousel-btn.next");
  let currentCarouselIndex = 0;

  if (
    trackWrapper &&
    trackCarousel &&
    items.length > 0 &&
    prevCarouselBtn &&
    nextCarouselBtn
  ) {
    const itemWidth = items[0].offsetWidth + 8;
    const totalItems = items.length;

    function updateScroll() {
      trackWrapper.scrollTo({
        left: currentCarouselIndex * itemWidth,
        behavior: "smooth",
      });
    }

    function autoScroll() {
      currentCarouselIndex = (currentCarouselIndex + 1) % totalItems;
      updateScroll();
    }

    let autoScrollTimer = setInterval(autoScroll, 4000);

    prevCarouselBtn.addEventListener("click", () => {
      console.log("Clicked prev carousel");
      clearInterval(autoScrollTimer);
      currentCarouselIndex =
        (currentCarouselIndex - 1 + totalItems) % totalItems;
      updateScroll();
      autoScrollTimer = setInterval(autoScroll, 4000);
    });

    nextCarouselBtn.addEventListener("click", () => {
      console.log("Clicked next carousel");
      clearInterval(autoScrollTimer);
      currentCarouselIndex = (currentCarouselIndex + 1) % totalItems;
      updateScroll();
      autoScrollTimer = setInterval(autoScroll, 4000);
    });

    let isDragging = false;
    let startX, scrollLeft;

    trackWrapper.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - trackWrapper.offsetLeft;
      scrollLeft = trackWrapper.scrollLeft;
      clearInterval(autoScrollTimer);
      trackWrapper.style.cursor = "grabbing";
    });

    trackWrapper.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - trackWrapper.offsetLeft;
      const walk = x - startX;
      trackWrapper.scrollLeft = scrollLeft - walk;
      currentCarouselIndex =
        Math.round(trackWrapper.scrollLeft / itemWidth) % totalItems;
      if (currentCarouselIndex < 0) currentCarouselIndex += totalItems;
    });

    ["mouseup", "mouseleave"].forEach((event) =>
      trackWrapper.addEventListener(event, () => {
        if (isDragging) {
          isDragging = false;
          trackWrapper.style.cursor = "grab";
          currentCarouselIndex =
            Math.round(trackWrapper.scrollLeft / itemWidth) % totalItems;
          if (currentCarouselIndex < 0) currentCarouselIndex += totalItems;
          updateScroll();
          autoScrollTimer = setInterval(autoScroll, 4000);
        }
      })
    );

    let touchStartX = 0;
    let touchScrollLeft = 0;

    trackWrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].pageX - trackWrapper.offsetLeft;
      touchScrollLeft = trackWrapper.scrollLeft;
      clearInterval(autoScrollTimer);
    });

    trackWrapper.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX - trackWrapper.offsetLeft;
      const walk = x - touchStartX;
      trackWrapper.scrollLeft = touchScrollLeft - walk;
      currentCarouselIndex =
        Math.round(trackWrapper.scrollLeft / itemWidth) % totalItems;
      if (currentCarouselIndex < 0) currentCarouselIndex += totalItems;
    });

    trackWrapper.addEventListener("touchend", () => {
      currentCarouselIndex =
        Math.round(trackWrapper.scrollLeft / itemWidth) % totalItems;
      if (currentCarouselIndex < 0) currentCarouselIndex += totalItems;
      updateScroll();
      autoScrollTimer = setInterval(autoScroll, 4000);
    });
  } else {
    console.error("Thiếu các phần tử DOM cần thiết cho carousel!");
  }
  // ==========================
  // VIDEO AUTOPLAY
  // ==========================
  const video = document.getElementById("videoStar");
  if (video) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video
              .play()
              .catch((e) => console.log("Không thể phát tự động:", e));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
  } else {
    console.error("Không tìm thấy video!");
  }

  // ==========================
  // ĐỔI MÀU MENU KHI CUỘN
  // ==========================
  const menu = document.querySelector(".menu");
  if (menu) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        menu.classList.add("scrolled");
      } else {
        menu.classList.remove("scrolled");
      }
    });
  } else {
    console.error("Không tìm thấy menu!");
  }

  // ==========================
  // HIỆU ỨNG PULSE CHO ICON
  // ==========================
  const icons = document.querySelectorAll(".fixed-icons a");
  if (icons.length) {
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
  } else {
    console.error("Không tìm thấy icons!");
  }

  // ==========================
  // ĐỔI NGÔN NGỮ
  // ==========================
  const languageSwitcher = document.getElementById("languageSwitcher");
  const langOptions = document.getElementById("langOptions");

  if (languageSwitcher && langOptions) {
    function switchLanguage(lang) {
      document.querySelectorAll(`[data-lang-${lang}]`).forEach((el) => {
        const content = el.getAttribute(`data-lang-${lang}`);
        if (content) el.textContent = content;
      });
      localStorage.setItem("language", lang);
    }

    languageSwitcher.addEventListener("click", () => {
      langOptions.style.display =
        langOptions.style.display === "block" ? "none" : "block";
    });

    langOptions.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        const lang = item.getAttribute("data-lang");
        const img = item.querySelector("img").src;
        languageSwitcher.querySelector(".icon").src = img;
        languageSwitcher.querySelector("span").textContent =
          lang === "vi" ? "NGÔN NGỮ" : "LANGUAGE";
        switchLanguage(lang);
        langOptions
          .querySelectorAll("li")
          .forEach((li) => li.classList.remove("selected"));
        item.classList.add("selected");
        langOptions.style.display = "none";
      });
    });

    document.addEventListener("click", (e) => {
      if (!languageSwitcher.contains(e.target)) {
        langOptions.style.display = "none";
      }
    });

    const savedLang = localStorage.getItem("language") || "vi";
    const defaultItem = langOptions.querySelector(
      `li[data-lang="${savedLang}"]`
    );
    if (defaultItem) {
      const img = defaultItem.querySelector("img").src;
      languageSwitcher.querySelector(".icon").src = img;
      languageSwitcher.querySelector("span").textContent =
        savedLang === "vi" ? "NGÔN NGỮ" : "LANGUAGE";
      switchLanguage(savedLang);
      defaultItem.classList.add("selected");
    }
  } else {
    console.error("Không tìm thấy languageSwitcher hoặc langOptions!");
  }
});
