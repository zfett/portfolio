const MAIN = document.getElementsByTagName("main")[0];
const LABEL = document.getElementById("zoom_amount");
let _zoomLevel = 1.0;
let _curMode = "light";

function zoomPage(amount) {
  if (_zoomLevel >= 3 && amount > 0) {
    _zoomLevel += amount * 0;
  } else if (_zoomLevel <= 0.25 && amount < 0) {
    _zoomLevel += amount * 0;
  } else {
    _zoomLevel += amount;
    console.log(_zoomLevel);
    MAIN.style.transform = "scale("+_zoomLevel+")";
    LABEL.innerHTML = (_zoomLevel * 100)+"%";
  }
}

function toggleMode(mode) {
  if (mode == "light") {
    _curMode == "light";
    document.documentElement.classList.remove("dark");
  } else {
    _curMode == "dark";
    document.documentElement.classList.add("dark");
  }
}