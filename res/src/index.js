"use strict";

function setNavLinkActive(link) {
  const _sects = document.getElementsByTagName("section");
  const _nav = document.getElementById("nav-links");
  const _allLinks = _nav.getElementsByTagName("a");
  
  for (var i = 0; (i < _allLinks.length && i < _sects.length); i++) {
    if (i == link) {
      _allLinks[link].classList.add("active");
      _sects[link].classList.add("active");
    } else {
      _allLinks[i].classList.remove("active");
      _sects[i].classList.remove("active");
    }
  }
  
  return _allLinks[link].getAttribute("href");
}

window.onload = function() {
  const _hash = window.location.hash.substring(1);
  
  setNavLinkActive(0);
  
  if (_hash == "home") {
    setNavLinkActive(0);
  } else if (_hash == "about") {
    setNavLinkActive(1);
  } else if (_hash == "projects") {
    setNavLinkActive(2);
  } else if (_hash == "services") {
    setNavLinkActive(3);
  } else if (_hash == "contact") {
    setNavLinkActive(4);
  } else {
    window.location.hash = '#home';
    window.location.reload();
    setNavLinkActive(0);
  }
}