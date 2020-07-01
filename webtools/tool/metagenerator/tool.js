window.addEventListener('DOMContentLoaded', function() {
  $("header-content").load("../../static/template/header-tool.html");
  $("footer-content").load("../../static/template/footer.html");
});

function getQuery() {
  setTimeout(function(){
    const pageTitle = document.getElementById("pagetitle");
    pageTitle.innerHTML = "Card Validator";
  }, 50);
}
window.addEventListener("onload", getQuery());