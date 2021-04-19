const AC_BTNS = document.getElementsByClassName("accordian header");

function toggleAccordian(elem) {
  var contentElem = document.getElementById(elem.getAttribute("data-content"))
  if (contentElem.classList.contains("open")) {
    contentElem.classList.remove("open")
    elem.classList.remove("open")
  } else {
    contentElem.classList.add("open")
    elem.classList.add("open")
  }
}