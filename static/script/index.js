function changeSlide(slide) {
	var homeSlide = document.getElementById("home");
	var aboutSlide = document.getElementById("about");
	var projectsSlide = document.getElementById("projects");
	var contactSlide = document.getElementById("contact");
	var sidebarBtn = document.getElementsByClassName("sidebar-btn");
	var scrollElem = document.getElementById("slide-container");
	
	if (slide == "home") {
		homeSlide.classList.remove("hidden");
		aboutSlide.classList.add("hidden");
		projectsSlide.classList.add("hidden");
		contactSlide.classList.add("hidden");
		
		sidebarBtn[0].classList.add("active");
		sidebarBtn[1].classList.remove("active");
		sidebarBtn[2].classList.remove("active");
		sidebarBtn[3].classList.remove("active");
		
		window.location.hash = "home";
	} else if (slide == "about") {
		homeSlide.classList.add("hidden");
		aboutSlide.classList.remove("hidden");
		projectsSlide.classList.add("hidden");
		contactSlide.classList.add("hidden");
		
		sidebarBtn[0].classList.remove("active");
		sidebarBtn[1].classList.add("active");
		sidebarBtn[2].classList.remove("active");
		sidebarBtn[3].classList.remove("active");
		
		window.location.hash = "about";
	} else if (slide == "projects") {
		homeSlide.classList.add("hidden");
		aboutSlide.classList.add("hidden");
		projectsSlide.classList.remove("hidden");
		contactSlide.classList.add("hidden");
		
		sidebarBtn[0].classList.remove("active");
		sidebarBtn[1].classList.remove("active");
		sidebarBtn[2].classList.add("active");
		sidebarBtn[3].classList.remove("active");
		
		window.location.hash = "projects";
	} else if (slide == "contact") {
		homeSlide.classList.add("hidden");
		aboutSlide.classList.add("hidden");
		projectsSlide.classList.add("hidden");
		contactSlide.classList.remove("hidden");
		
		sidebarBtn[0].classList.remove("active");
		sidebarBtn[1].classList.remove("active");
		sidebarBtn[2].classList.remove("active");
		sidebarBtn[3].classList.add("active");
		
		window.location.hash = "contact";
	}
	scrollGradients();
	scrollElem.scrollTop = 0;
}

function parseHash() {
	var windowHash = window.location.hash.substr(1);
	return windowHash;
}

document.addEventListener("DOMContentLoaded", function() {
	setTimeout(navigateHash(), 150);
});

document.addEventListener("onhashchange", function() {
	setTimeout(navigateHash(), 50);
});

document.addEventListener("onload", scrollGradients);

function navigateHash() {
	var curHash = parseHash();
	if (curHash == "home") {
		changeSlide("home");
	} else if (curHash == "about") {
		changeSlide("about");
	} else if (curHash == "projects") {
		changeSlide("projects");
	} else if (curHash == "contact") {
		changeSlide("contact");
	}
}

function scrollGradients() {
	var topGrad = document.getElementById("grad-top");
	var bottomGrad = document.getElementById("grad-bottom");
	var scrollElem = document.getElementById("slide-container");
	
	if (scrollElem.scrollTopMax <= 0) {
		topGrad.classList.add("hidden");
		bottomGrad.classList.add("hidden");
	} else if (scrollElem.scrollTop >= 0 && scrollElem.scrollTop < 1) {
		topGrad.classList.add("hidden");
		bottomGrad.classList.remove("hidden");
	} else if (scrollElem.scrollTop < scrollElem.scrollTopMax || scrollElem.scrollTop > scrollElem.scrollTopMax) {
		topGrad.classList.remove("hidden");
		bottomGrad.classList.remove("hidden");
	} else if (scrollElem.scrollTop == scrollElem.scrollTopMax) {
		topGrad.classList.remove("hidden");
		bottomGrad.classList.add("hidden");
	}
}

async function copyText(fileUrl) {
	const diag = document.getElementById("copyDialog");
	let response = await fetch(fileUrl);
	let copyText = (await response.text()).toString();
	
	navigator.clipboard.writeText(copyText).then(function() {
		console.log('Async: Copying to clipboard was successful!');
	}, function(err) {
		diag.innerHTML = "Error: Could not copy text.";
	});
	
	diag.classList.add("visible");
	setTimeout(function() {
		diag.classList.remove("visible");
	}, 4000);
}

function visitPage(url) {
	window.open(url, '_blank');
}

window.isDark = true;

function toggleMode(mode) {	
	if (window.isDark == false || mode == 0) {
		window.isDark = true;
		document.documentElement.classList.add("dark-mode");
		document.getElementById("checkbox").checked = true;
	} else if (window.isDark == true || mode == 1) {
		window.isDark = false;
		document.documentElement.classList.remove("dark-mode");
		document.getElementById("checkbox").checked = false;
	}
}

function getPreferredColorScheme() {
	if (window.matchMedia) {
		if(window.matchMedia('(prefers-color-scheme: dark)').matches || getCookie("isDark") === "0"){
			return 0;
		} else {
			return 1;
		}
	}
	return 1;
}

window.addEventListener("onload", checkMode());

function checkMode() {
	if(window.matchMedia){
		var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		colorSchemeQuery.addEventListener('change', setTimeout(function(){toggleMode(getPreferredColorScheme())},200));
	}
}