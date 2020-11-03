const _SECTION = document.getElementsByTagName("section");
for (i=1;i<_SECTION.length;i++) {
	_SECTION[i].style.animationDelay = "1."+i+"s";
}