const navToggle = document.getElementById("nav-toggle");
const mobileNav = document.getElementById("mobile-nav");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  mobileNav.classList.toggle("d-none")
  document.body.classList.toggle("active")
});
