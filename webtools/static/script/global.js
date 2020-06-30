function toggleMenu() { //Toggle menu element
  const menuElem = document.getElementById("header-menu");
  if (menuElem.classList.contains("active")) {
    menuElem.classList.remove("active");
  } else if (!menuElem.classList.contains("active")) {
    menuElem.classList.add("active");
  }
}

document.addEventListener("click", function(event) { //Check if menu is clicked out of
  const buttonElem = document.getElementsByClassName("header-menu-toggle")[0];
  const menuElem = document.getElementById("header-menu");

  var isClickInsideMenu = menuElem.contains(event.target);
  var isClickInsideButton = buttonElem.contains(event.target);

  if (!isClickInsideMenu && !isClickInsideButton) {
    menuElem.classList.remove("active");
  }
});

window.onload = function() {
  const hrefElem = document.body.querySelectorAll("[href]");
  for (i = 0; i < hrefElem.length; i++) {
    var link = hrefElem[i].getAttribute("href");
    hrefElem[i].setAttribute("onclick", "window.open('"+link+"', '_blank')");
    hrefElem[i].removeAttribute("href");
    hrefElem[i].title = "Navigate to '"+link+"' in a new tab.";
  }

  $("header-content").load("../../static/template/header.html");
  $("footer-content").load("../../static/template/footer.html");
}