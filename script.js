// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('header nav a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });

    // close mobile menu after click
    navRight.classList.remove("open");
  });
});

// Scroll spy (active nav link)
const sections = document.querySelectorAll("main section[id]");
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
window.addEventListener("scroll", setActiveLink);

// Back to top button
const backToTopBtn = document.getElementById("backToTop");
function toggleBackToTop() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
}
window.addEventListener("scroll", toggleBackToTop);

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navRight = document.querySelector(".nav-right");

navToggle.addEventListener("click", () => {
  navRight.classList.toggle("open");
});

// Initial state
setActiveLink();
toggleBackToTop();
