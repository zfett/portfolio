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

const tx = document.getElementsByTagName("textarea");

for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}