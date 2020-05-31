window.browserVer = 0;

function checkIE() {
	var browserInfo = document.getElementById("browserInfo");
	var ua = window.navigator.userAgent;
	console.log(ua);
	browserInfo.innerHTML = ("Your browser information: " + ua);
	var trident = ua.indexOf('Trident/');
	var edge = ua.indexOf('Edge/');
	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		window.browserVer = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	} else if (trident > 0) {
		var rv = ua.indexOf('rv:');
		window.browserVer = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	} else if (edge > 0) {
		window.browserVer = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	} else {
		window.browserVer = 0;
	}
	
	var warningElem = document.getElementsByTagName("ie-warning");
	var blurElem = document.getElementById("blur-filter");
	warningElem[0].style.display = "none";
	blurElem.classList.remove("enabled");
	
	if (!window.browserVer == 0) {
		warningElem[0].style.display = "block";
		blurElem.classList.add("enabled");
		console.log("Your browser is unsupported. Please consider using a different browser or upgrading your current one.");
		return false;
	} else {
		warningElem[0].style.display = "none";
		blurElem.classList.remove("enabled");
		console.log("Your browser is supported!");
		return true;
	}
}

checkIE();