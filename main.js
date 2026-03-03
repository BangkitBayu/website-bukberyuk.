const navToggle = document.getElementById("nav-toggle");
const mobileNav = document.getElementById("mobile-nav");
const desktopNav = document.getElementById("desktop-nav");
const header = document.querySelector("header");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  mobileNav.classList.toggle("d-none");
  document.body.classList.toggle("active");
});

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  if (window.scrollY > 200) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});
