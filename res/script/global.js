console.info("%cRecruiters & Employers: I'm looking for work if you need a front-end designer! @zfett on LinkedIn", "color: limegreen; font-size: 20px;");

const curDateElem = document.getElementById("curDate");
const y = new Date().getFullYear();

if (y == "2020") {
  //do nothing
} else {
  curDateElem.innerHTML = " - "+y;
}

var a = document.getElementsByTagName('a');
var b = a.length;

while(b--){
  a[b].onclick = function(){
    if(this.href.indexOf('zachfetters.design')<0){
      var c = confirm('This link will take you to '+this.href+'. \n\nAre you sure you want to continue? Click "Cancel" to stay on this page or click "OK" to continue.');
      if (!c) {
        event.preventDefault();
      }
    }
  };
}