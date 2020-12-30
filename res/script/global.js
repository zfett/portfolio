console.info("%cRecruiters & Employers: I'm looking for work if you need a front-end designer! @zfett on LinkedIn", "color: limegreen; font-size: 20px;");

const curDateElem = document.getElementById("curDate");
const y = new Date().getFullYear();

if (y == "2020") {
  //do nothing
} else {
  curDateElem.innerHTML = " - "+y;
}