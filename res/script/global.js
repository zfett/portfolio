console.info("%cRecruiters & Employers: I'm looking for work if you need a front-end designer! @zfett on LinkedIn", "color: limegreen; font-size: 20px;");

let curSlide = 0;
const imgList = document.getElementsByClassName("slide_img");
function imageSlide() {
  var i;
  for (i = 0; i < imgList.length; i++) {
    imgList[i].classList.remove("active");
  }
  curSlide++;
  if (curSlide > imgList.length) {curSlide = 1}    
  imgList[curSlide-1].classList.add("active");
  setTimeout(imageSlide, 8000);
}

imageSlide();