var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.classList.contains("active")) {
      panel.classList.remove("active");
    } else {
      panel.classList.add("active");
    }
  });
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(function() {
    diag.innerHTML = "Text was copied to the clipboard!";
  }, function(err) {
    diag.innerHTML = "Error: Could not copy text.";
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const copyElem = document.body.querySelectorAll("[copy]");
  for (i = 0; i < copyElem.length; i++) {
    var text = copyElem[i].getAttribute("copy");
    copyElem[i].setAttribute("onclick", "copyText('"+text+"')");
    copyElem[i].removeAttribute("copy");
    copyElem[i].title = "Copy '"+text+"' to the clipboard.";
  }
});