const header_toggle = document.getElementById("header_toggle");
const header_links = document.getElementById("header_links");

header_toggle.addEventListener("click", function() {
  header_toggle.classList.toggle("active");
  header_links.classList.toggle("active");
})