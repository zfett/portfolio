const nameInput = document.getElementById("player_name");
const gameOutput = document.getElementById("game");
const saveNotif = document.getElementById("saved_notif");

// Save data variables
let playerName = "Player";
let curStage = "";
let startDate = null;
let curDate = null;

nameInput.addEventListener("keypress", function(e) {
  if (e.key == "Enter" && nameInput.value !== "") {
    playerName = escape(nameInput.value);
    showIntro();
  } else if (e.key == "Enter" && nameInput.value == "") {
    window.alert("Please provide a name!");
  }
});

function showIntro() {
  nameInput.parentNode.remove();
  gameOutput.innerHTML = `Welcome, <i>${playerName}</i>, to "Shuffler". Shuffler is a text-based adventure game playable entirely within your browser. To play: simply follow the story and type in commands for what you want to do as they appear. Don't worry about saving the game! Any time you advance in the story, the game saves to your browser's local data. When you are ready, press the '<b>Enter</b>' key...`;
  window.setTimeout(()=>{
    window.addEventListener("keypress", function(e) {
      if (e.key == "Enter") {
        gameOutput.innerHTML = "";
        startDate = new Date();
        setStage("ST_CAR_RIDE_INTRO");
      }
    });
  }, 100);
}

function saveState() {
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("curStage", curStage);
  localStorage.setItem("startDate", startDate);
  localStorage.setItem("curDate", new Date());

  saveNotif.classList.add("active");
  window.setTimeout(()=>{saveNotif.classList.remove("active")}, 3000);
}

function retrieveState() {
  playerName = localStorage.getItem("playerName");
  curStage = localStorage.getItem("curStage");
  startDate = localStorage.getItem("startDate");
  curDate = localStorage.getItem("curDate");
}

// Start of game logic

function setStage(id) {
  for (i in stage) {
    if (stage[i].id == id) {
      curStage = stage[i].id;
      saveState();
    }
  }
}