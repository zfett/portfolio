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

//Tool Script Below

function getCardData() {
  const siteURL = document.getElementById("siteURL");
  const rawOutput = document.getElementById("rawOutput");
  
  $.get("https://cors-anywhere.herokuapp.com/"+siteURL.value, function(data){
    var metaOgTitle = $(data).filter('meta[property="og:title"]').attr("content");
    rawOutput.innerHTML = data;
    rawOutput.style.height = "1px";
    rawOutput.style.height = (25+rawOutput.scrollHeight)+"px";
  });
}