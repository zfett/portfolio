const lastHeading = document.querySelector("section:last-of-type h2");
const asideElem = document.getElementsByTagName("aside")[0];
const winLoadTime = new Date().getTime();

window.addEventListener("scroll", function() {
  const rect = lastHeading.getBoundingClientRect();
  let scrollTime = new Date().getTime();
  const timeDiff = scrollTime - winLoadTime;

  if (rect.top <= 80) {
    asideElem.classList.add("scroll");
    asideElem.classList.remove("unscroll");
  } else if (rect.top > 80 && timeDiff > 3000) {
    asideElem.classList.remove("scroll");
    asideElem.classList.add("unscroll");
  }
})