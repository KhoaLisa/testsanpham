document.querySelectorAll(".scroll-wrapper").forEach((wrapper) => {
  const content = wrapper.querySelector(".scroll-content");
  const thumb = wrapper.querySelector(".scroll-thumb");

  content.addEventListener("scroll", () => {
    const scrollTop = content.scrollTop;
    const scrollHeight = content.scrollHeight - content.clientHeight;
    const percent = scrollTop / scrollHeight;
    const thumbHeight =
      content.clientHeight * (content.clientHeight / content.scrollHeight);
    const top = percent * (content.clientHeight - thumbHeight);

    thumb.style.top = `${top}px`;
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.background = `linear-gradient(to bottom, #d6c3aa ${
      percent * 100
    }%, #d6c3aa ${percent * 100}%)`;
  });
});
