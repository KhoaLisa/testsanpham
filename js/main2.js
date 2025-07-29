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
  const defaultItem = langOptions.querySelector(`li[data-lang="${savedLang}"]`);
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
