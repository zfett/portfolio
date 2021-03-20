const sections = document.getElementsByTagName("h2");

for (i=0;i<sections.length;i++) {
  sections[i].addEventListener("click", function() {
    var text = window.location.href + "#" + this.id;
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('URL copied to clipboard');
      })
      .catch(err => {
        alert('Error in copying URL: ', err);
      });
  })
}