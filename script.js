const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

function setTheme(dark) {
  body.classList.toggle("dark", dark);
  themeIcon.textContent = dark ? "☀" : "☾";
  localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
}

setTheme(localStorage.getItem("portfolio-theme") === "dark");

themeToggle.addEventListener("click", () => {
  setTheme(!body.classList.contains("dark"));
});

menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function updateActiveLink() {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

document.getElementById("year").textContent = new Date().getFullYear();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formNote.textContent = "Thanks! This demo form is ready to connect to your email/backend.";
  form.reset();
});