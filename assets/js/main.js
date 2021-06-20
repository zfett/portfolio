const sectElem = document.querySelectorAll("main section");
const ageElem = document.getElementById("age");

window.addEventListener("DOMContentLoaded", function() {
  for (i=0;i<sectElem.length;i++) {
    sectElem[i].style.animation = "slide-down .5s ease-in-out "+(.5+(i/8))+"s 1";
  }

  const bDay = new Date('1/14/2001');
  const cTime = new Date();
  const diffTime = cTime - bDay;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  ageElem.innerHTML = Math.floor(diffDays / 365);
})