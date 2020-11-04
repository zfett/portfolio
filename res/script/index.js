console.info("%cRecruiters & Employers: I'm looking for work if you need a front-end designer! @zfett on LinkedIn", "color: limegreen; font-size: 20px;");

const _SECTION = document.getElementsByTagName("section");
for (i=1;i<_SECTION.length;i++) {
	_SECTION[i].style.animationDelay = "1."+(i-1)+"s";
}

const _SOCIAL = document.getElementsByClassName("social");
for (i=0;i<_SOCIAL.length;i++) {
	_SOCIAL[i].style.animationDelay = (1+i*.2)+"s";
}