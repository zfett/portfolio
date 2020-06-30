function toggleMenu() {
  const menuElem = document.getElementById("header-menu");
  if (menuElem.classList.contains("active")) {
    menuElem.classList.remove("active");
  } else if (!menuElem.classList.contains("active")) {
    menuElem.classList.add("active");
  }
}