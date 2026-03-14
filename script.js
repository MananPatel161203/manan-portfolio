const navLinks = document.querySelectorAll('header nav a[href^="#"]');
const navToggle = document.querySelector(".nav-toggle");
const navRight = document.querySelector(".nav-right");
const backToTopBtn = document.getElementById("backToTop");
const themeToggleBtn = document.getElementById("themeToggle");
const sections = document.querySelectorAll("main section[id]");
const THEME_KEY = "manan-theme";

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
    navRight.classList.remove("open");
  });
});

function setActiveLink() {
  const scrollPos = window.scrollY || window.pageYOffset;
  let currentId = null;

  sections.forEach(section => {
    const offsetTop = section.offsetTop - 100;
    const offsetBottom = offsetTop + section.offsetHeight;
    if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
      currentId = section.id;
    }
  });

  if (!currentId) return;

  navLinks.forEach(link => {
    const id = link.getAttribute("href").slice(1);
    link.classList.toggle("active-link", id === currentId);
  });
}

function toggleBackToTop() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("scroll", toggleBackToTop);

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navToggle.addEventListener("click", () => {
  navRight.classList.toggle("open");
});

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggleBtn.setAttribute("aria-pressed", "true");
  themeToggleBtn.textContent = "☀";
} else if (savedTheme === "dark") {
  document.body.classList.remove("light-theme");
  themeToggleBtn.setAttribute("aria-pressed", "false");
  themeToggleBtn.textContent = "☾";
}

themeToggleBtn.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light-theme");
  document.body.classList.toggle("light-theme", isLight);
  themeToggleBtn.setAttribute("aria-pressed", isLight ? "true" : "false");
  themeToggleBtn.textContent = isLight ? "☀" : "☾";
  localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
});

setActiveLink();
toggleBackToTop();
