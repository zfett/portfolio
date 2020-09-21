window.onscroll = function() {myFunction()};
var header = document.getElementById("page_header");
function myFunction() {
  if (window.pageYOffset > window.innerHeight) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
} 