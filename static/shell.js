const userInput = document.getElementById("shell-input");
const shellOutput = document.getElementById("shell-output-wrap");

function initShell() {
  userInput.value = "";
  shellOutput.innerHTML = "";
  console.log("initalizing ZShell...");
}

function submitCmd() {
  var _CMD = (userInput.value).toString().toLowerCase().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");

  if (_CMD == "help" || _CMD == "?") {
    shellOutput.innerHTML += "<p id='shell-output'>admin@zfett.github.io:~$ " + _CMD + "</p>";
    shellOutput.innerHTML += "<p id='shell-output'>ZShell for Ubuntu-Web. (C) Zachary Fetters, 2020. Not a real Ubuntu shell.</p>";
    shellOutput.innerHTML += "<p id='shell-output'>---</p>";
    shellOutput.innerHTML += "<p id='shell-output'>These shell commands are defined internally. Type 'help' or '?' to see this list.</p>";
    shellOutput.innerHTML += "<p id='shell-output'>---</p>";
    shellOutput.innerHTML += "<p id='shell-output'>help&nbsp;&nbsp;&nbsp;&nbsp;:: Lists all available shell commands.</p>";
    shellOutput.innerHTML += "<p id='shell-output'>about&nbsp;&nbsp;&nbsp;:: Lists information about me!</p>";
    shellOutput.innerHTML += "<p id='shell-output'>contact&nbsp;:: Lists methods of contact.</p>";
    shellOutput.innerHTML += "<p id='shell-output'>ping&nbsp;&nbsp;&nbsp;&nbsp;:: Pong!</p>";
    shellOutput.innerHTML += "<p id='shell-output'>pgp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:: Gives a URL to download my public PGP key.</p>";
    shellOutput.innerHTML += "<p id='shell-output'>clear&nbsp;&nbsp;&nbsp;:: Clears the terminal screen.</p>";
    userInput.value = "";
  } else if (_CMD == "about") {
    shellOutput.innerHTML += "<p id='shell-output'>admin@zfett.github.io:~$ " + _CMD + "</p>";
    shellOutput.innerHTML += "<p id='shell-output'>Hey, I'm Zach and I am a freelance web developer and designer. Welcome to my portfolio site! Hope you enjoy your stay!</p>";
    userInput.value = "";
  } else if (_CMD == "contact") {
    shellOutput.innerHTML += "<p id='shell-output'>admin@zfett.github.io:~$ " + _CMD + "</p>";
    shellOutput.innerHTML += "<p id='shell-output'>Twitter&nbsp;&nbsp;&nbsp;:: @zachary_fetters</p>";
    shellOutput.innerHTML += "<p id='shell-output'>Facebook&nbsp;&nbsp;:: /zachary.fetters</p>";
    shellOutput.innerHTML += "<p id='shell-output'>Instagram&nbsp;:: @zacharyfetters</p>";
    shellOutput.innerHTML += "<p id='shell-output'>LinkedIn&nbsp;&nbsp;:: /zfett</p>";
    shellOutput.innerHTML += "<p id='shell-output'>Keybase&nbsp;&nbsp;&nbsp;:: @zfett</p>";
    shellOutput.innerHTML += "<p id='shell-output'>E-mail&nbsp;&nbsp;&nbsp;&nbsp;:: zachary.fetters@yahoo.com</p>";
    userInput.value = "";
  } else if (_CMD == "ping") {
    shellOutput.innerHTML += "<p id='shell-output'>admin@zfett.github.io:~$ " + _CMD + "</p>";
    shellOutput.innerHTML += "<p id='shell-output'>Pong!</p>";
    userInput.value = "";
  } else if (_CMD == "clear" || _CMD == "cls") {
    shellOutput.innerHTML = "";
    shellOutput.innerHTML += "<p id='shell-output'>Cleared the terminal.</p>";
    userInput.value = "";
  } else if (_CMD == "pgp") {
    shellOutput.innerHTML += "<p id='shell-output'>admin@zfett.github.io:~$ " + _CMD + "</p>";
    shellOutput.innerHTML += "<p id='shell-output'>Use this link to download a copy of my public key: https://zfett.keybase.pub/A987A420B9E1533D7DB194BC70AEC2A00F0D55F3.txt</p>";
    userInput.value = "";
  } else if (_CMD == "close" || _CMD == "quit" || _CMD == "exit" || _CMD == "leave") {
    shellOutput.innerHTML += "<p id='shell-output'>admin@zfett.github.io:~$ " + _CMD + "</p>";
    shellOutput.innerHTML += "<p id='shell-output'>To close this terminal, click the red 'X' icon in the terminal's titlebar.</p>";
    userInput.value = "";
  } else {
    shellOutput.innerHTML += "<p id='shell-output'>admin@zfett.github.io:~$ " + _CMD + "</p>";
    shellOutput.innerHTML += "<p id='shell-output'>" + _CMD + ": command not found</p>";
    userInput.value = "";
  }
}

userInput.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    submitCmd();
  }
});