const MCVER = "1.1";
const MESSG = document.getElementById("event-container");
const BOARD = document.getElementsByTagName("board-container")[0]; //The base element for the board
const GRIDS = document.getElementsByTagName("grid"); //The list of indiv. grid elements
const BSCBD = document.getElementsByClassName("scoreboard")[0];
const WSCBD = document.getElementsByClassName("scoreboard")[1];
const BLKSC = document.getElementById("black-scoreboard");
const WHTSC = document.getElementById("white-scoreboard");
const WINBR = document.getElementById("win-banner");
const ALPHA = ["A","B","C","D","E","F","G","H","I","J"]; //All column letters
const NUMBR = ["1","2","3","4","5","6","7","8","9","10"]; //All row numbers
const MNTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const CLOCK = document.getElementById("match-time");

let   MCHTM = "00:00"; //Total match time
let   PCIDS = []; //A piece list generated after board init
let   PCELM; //A elementlist of pieces
let   CTURN = "black"; //Whose turn is it?
let   SELPC = " "; //Selected piece
let   BLKPT = 0; //Points for black
let   WHTPT = 0; //Points for white
let   BLPCS = 12; //Total black pieces
let   WTPCS = 12; //Total white pieces
let   GMEND = false; //Is game ended?

let firstMove = false;

let stopwatch;

const AGRID = document.querySelectorAll("grid.active");
let OLDPARENT;
let target;

function playSound(path, volume) {
  var audioSrc = new Audio(path);
  if (volume !== null) {
    audioSrc.volume = volume;
    audioSrc.play();
  } else {
    audioSrc.play();
  }
}

function sendMessage(text,type) {
  const D = new Date();
  var timestamp = D.getFullYear().toString() + " " + MNTHS[D.getUTCMonth()] + " " + D.getUTCDate().toString().padStart(2,"0") + " " + D.getUTCHours().toString().padStart(2,"0") + ":" + D.getUTCMinutes().toString().padStart(2,"0") + ":" + D.getUTCSeconds().toString().padStart(2,"0") + " UTC";
  switch (type) {
    case "error":
      MESSG.innerHTML += "<event data-ts=\""+timestamp+"\" class=\""+type+"\">"+text.toUpperCase()+"</event>";
      break;
    case "warning":
      MESSG.innerHTML += "<event data-ts=\""+timestamp+"\" class=\""+type+"\">"+text.toUpperCase()+"</event>";
      break;
    case "info":
      MESSG.innerHTML += "<event data-ts=\""+timestamp+"\" class=\""+type+"\">"+text.toUpperCase()+"</event>";
      break;
    case "update":
      MESSG.innerHTML += "<event data-ts=\""+timestamp+"\" class=\""+type+"\">"+text.toUpperCase()+"</event>";
      break;
    default:
      MESSG.innerHTML += "<event data-ts=\""+timestamp+"\">"+text.toUpperCase()+"</event>";
  }
  MESSG.scrollTop = MESSG.scrollHeight;
}

function initBoard() {
  for(i=0;i<=64;i++) {
    if (i>0 && i<=8) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[7]+"\" data-col=\""+NUMBR[i-1]+"\" title=\"Grid "+ALPHA[7]+NUMBR[i-1]+"\"></grid>";
    } else if (i>8 && i<=16) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[6]+"\" data-col=\""+NUMBR[i-9]+"\" title=\"Grid "+ALPHA[6]+NUMBR[i-9]+"\"></grid>";
    } else if (i>16 && i<=24) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[5]+"\" data-col=\""+NUMBR[i-17]+"\" title=\"Grid "+ALPHA[5]+NUMBR[i-17]+"\"></grid>";
    } else if (i>24 && i<=32) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[4]+"\" data-col=\""+NUMBR[i-25]+"\" title=\"Grid "+ALPHA[4]+NUMBR[i-25]+"\"></grid>";
    } else if (i>32 && i<=40) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[3]+"\" data-col=\""+NUMBR[i-33]+"\" title=\"Grid "+ALPHA[3]+NUMBR[i-33]+"\"></grid>";
    } else if (i>40 && i<=48) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[2]+"\" data-col=\""+NUMBR[i-41]+"\" title=\"Grid "+ALPHA[2]+NUMBR[i-41]+"\"></grid>";
    } else if (i>48 && i<=56) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[1]+"\" data-col=\""+NUMBR[i-49]+"\" title=\"Grid "+ALPHA[1]+NUMBR[i-49]+"\"></grid>";
    } else if (i>56 && i<=64) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[0]+"\" data-col=\""+NUMBR[i-57]+"\" title=\"Grid "+ALPHA[0]+NUMBR[i-57]+"\"></grid>";
    }
  }
  console.info("Board layout initialized");
  return true;
}

function initPieces() {
  for(i=0;i<=GRIDS.length-1;i++) {
    var gCol = GRIDS[i].attributes[0].nodeValue;
    var gRow = parseInt(GRIDS[i].attributes[1].nodeValue);
    if (gCol == "H" && gRow%2 == 0) { //don't ask
      GRIDS[i].innerHTML += "<piece data-ptyp=\"white\" data-pcid=\""+i+"\" data-isking=\"false\">";
      PCIDS.push(i);
      GRIDS[i].classList.add("active");
    } else if (gCol == "G" && gRow%2 !== 0) {
      GRIDS[i].innerHTML += "<piece data-ptyp=\"white\" data-pcid=\""+i+"\" data-isking=\"false\">";
      PCIDS.push(i);
      GRIDS[i].classList.add("active");
    } else if (gCol == "F" && gRow%2 == 0) {
      GRIDS[i].innerHTML += "<piece data-ptyp=\"white\" data-pcid=\""+i+"\" data-isking=\"false\">";
      PCIDS.push(i);
      GRIDS[i].classList.add("active");
    } else if (gCol == "A" && gRow%2 !== 0) {
      GRIDS[i].innerHTML += "<piece data-ptyp=\"black\" data-pcid=\""+i+"\" data-isking=\"false\">";
      PCIDS.push(i);
      GRIDS[i].classList.add("active");
    } else if (gCol == "B" && gRow%2 == 0) {
      GRIDS[i].innerHTML += "<piece data-ptyp=\"black\" data-pcid=\""+i+"\" data-isking=\"false\">";
      PCIDS.push(i);
      GRIDS[i].classList.add("active");
    } else if (gCol == "C" && gRow%2 !== 0) {
      GRIDS[i].innerHTML += "<piece data-ptyp=\"black\" data-pcid=\""+i+"\" data-isking=\"false\">";
      PCIDS.push(i);
      GRIDS[i].classList.add("active");
    }
  }

  PCELM = document.getElementsByTagName("piece");

  for(i=0;i<PCELM.length;i++) {
    PCELM[i].setAttribute("onclick", "selectPiece(this,this.attributes[1].nodeValue)");
  }

  console.info("Placed all pieces successfully");
  return true;
}

function init() {
  if (initBoard() == true) {
    initPieces();
    //wierd hack to "preload" the audio
    playSound("res/snd/Clack.ogg",0.0);
    playSound("res/snd/King.ogg",0.0);
    playSound("res/snd/Win.ogg",0.0);
  }
  document.getElementById("version").innerHTML = "Version "+MCVER;
}

function setTurn(team) {
  if (team == "black") {
    BSCBD.classList.remove("turn");
    WSCBD.classList.add("turn");
  } else if (team == "white") {
    BSCBD.classList.add("turn");
    WSCBD.classList.remove("turn");
  }
}

function selectPiece(pelem,pcid) {
  if (pelem.getAttribute("data-ptyp") !== CTURN) {
    sendMessage("Cannot select an opponent's piece!", "warning");
    return false;
  }

  for(i=0;i<PCELM.length;i++) {
    if (PCELM[i].classList.contains("selected") && PCELM[i].getAttribute("data-pcid") !== pcid.toString()) {
      PCELM[i].classList.remove("selected");
      SELPC = " ";
    } else if (PCELM[i].getAttribute("data-pcid") == pcid.toString() && !pelem.classList.contains("selected")) {
      pelem.classList.add("selected");
      SELPC = pelem;
    } else if (PCELM[i].getAttribute("data-pcid") == pcid.toString() && pelem.classList.contains("selected")) {
      pelem.classList.remove("selected");
      SELPC = " ";
    }
  }
}

function checkEnd() {
  if (WTPCS == 0) {
    WINBR.classList.add("visible");
    WINBR.innerHTML = "BLACK WINS!";
    sendMessage("Black wins with a final score of "+BLKPT,"info");
    endClock();
    GMEND = true;
    playSound("res/snd/Win.ogg",1.0);
    return true;
  } else if (BLPCS == 0) {
    WINBR.classList.add("visible");
    WINBR.innerHTML = "WHITE WINS!";
    sendMessage("White wins with a final score of "+WHTPT,"info");
    endClock();
    GMEND = true;
    playSound("res/snd/Win.ogg",1.0);
    return true;
  } else {
    return false;
  }
}

function givePoints(team, col, row) {
  checkEnd();
  if (team == "white") {
    WHTPT += 1;
    BLPCS -= 1;
    WHTSC.innerHTML += "<div class=\"piece black\"></div>";
    sendMessage("White has taken Black's piece at grid "+row+col, "info");
  } else if (team == "black") {
    BLKPT += 1;
    WTPCS -= 1;
    BLKSC.innerHTML += "<div class=\"piece white\"></div>";
    sendMessage("Black has taken White's piece at grid "+row+col, "info");
  }
  return true;
}

function checkPiece(row, col, isKing) {
  checkEnd();
  if (row == undefined || col < 0) {
    return false;
  } else {
    var gridCoord = (((8 - (ALPHA.indexOf(row) + 1)) * 8) + parseInt(col)) - 1;
    if (GRIDS[gridCoord].children.length >= 1) {
      var childInfo = GRIDS[gridCoord].children[0].getAttribute("data-ptyp");
      var kingInfo = GRIDS[gridCoord].children[0].getAttribute("data-isking");
      if (childInfo == CTURN) {
        return false;
      } else if (childInfo == "black" || childInfo == "white") {
        if (isKing == "false" && kingInfo == "false") {
          sendMessage(CTURN+" moved piece at "+OLDPARENT.attributes[0].nodeValue+OLDPARENT.attributes[1].nodeValue+" to grid "+target.attributes[0].nodeValue+target.attributes[1].nodeValue,"update");
          GRIDS[gridCoord].children[0].remove();
          GRIDS[gridCoord].classList.remove("active");
          childInfo == "black" ? givePoints("white", col, row) : givePoints("black", col, row);
          playSound("res/snd/Clack.ogg",1.0);
          return true;
        } else if (isKing == "true" && kingInfo == "false") {
          sendMessage(CTURN+" moved piece at "+OLDPARENT.attributes[0].nodeValue+OLDPARENT.attributes[1].nodeValue+" to grid "+target.attributes[0].nodeValue+target.attributes[1].nodeValue,"update");
          GRIDS[gridCoord].children[0].remove();
          GRIDS[gridCoord].classList.remove("active");
          childInfo == "black" ? givePoints("white", col, row) : givePoints("black", col, row);
          playSound("res/snd/Clack.ogg",1.0);
          return true;
        } else if (isKing == "true" && kingInfo == "true") {
          sendMessage(CTURN+" moved piece at "+OLDPARENT.attributes[0].nodeValue+OLDPARENT.attributes[1].nodeValue+" to grid "+target.attributes[0].nodeValue+target.attributes[1].nodeValue,"update");
          GRIDS[gridCoord].children[0].remove();
          GRIDS[gridCoord].classList.remove("active");
          childInfo == "black" ? givePoints("white", col, row) : givePoints("black", col, row);
          playSound("res/snd/Clack.ogg",1.0);
          return true;
        } else if (isKing == "false" && kingInfo == "true") {
          return false;
        }
      }
    } else if (GRIDS[gridCoord].children.length == 0) {
      return false;
    }
  }
}

function checkMove(oldCol, oldRow, newCol, newRow, oldGrid, newGrid) {
  checkEnd();

  var rowDiff = ALPHA.indexOf(newRow) - ALPHA.indexOf(oldRow);
  var colDiff = parseInt(newCol) - parseInt(oldCol);
  var newGridBG = window.getComputedStyle(newGrid).getPropertyValue("background-image");

  var colorCheck = oldGrid.children[0].getAttribute("data-ptyp");
  var kingCheck = oldGrid.children[0].getAttribute("data-isking");

  var middleRow = ALPHA[(parseInt(ALPHA.indexOf(newRow)+ALPHA.indexOf(oldRow))/2)];
  var middleCol = ((parseInt(oldCol)+parseInt(newCol))/2);

  if (Math.abs(rowDiff) == Math.abs(colDiff)) { //only diagonal moves
    if (Math.abs(rowDiff) > 2 && Math.abs(colDiff) > 2) {
      return false;
    } else if (Math.abs(rowDiff) < 1 || Math.abs(colDiff) < 1) {
      return false;
    } else if (!newGridBG.includes("GridWhite.png")) {
      if (colorCheck == "black" && kingCheck == "false" && rowDiff < 0) {
        return false;
      } else if (colorCheck == "white" && kingCheck == "false" && rowDiff > 0) {
        return false;
      } else if (Math.abs(rowDiff) == 1 && Math.abs(colDiff) == 1) {
        sendMessage(CTURN+" moved piece at "+OLDPARENT.attributes[0].nodeValue+OLDPARENT.attributes[1].nodeValue+" to grid "+target.attributes[0].nodeValue+target.attributes[1].nodeValue,"update");
        playSound("res/snd/Clack.ogg",1.0);
        return true;
      } else {
        return checkPiece(middleRow, middleCol, kingCheck);
      }
    } else {
      return false;
    }
  }
}

BOARD.addEventListener('click', function(e) {
  OLDPARENT = SELPC.parentNode;
  e = e || window.event;
  target = e.target;
  if (target.tagName == "GRID" && SELPC !== " ") {
    if (checkMove(OLDPARENT.attributes[1].nodeValue, OLDPARENT.attributes[0].nodeValue, target.attributes[1].nodeValue, target.attributes[0].nodeValue, OLDPARENT, target) == true && GMEND == false) {
      if (!firstMove) {
        firstMove = true;
        startClock();
      }
      target.classList.add("active");
      OLDPARENT.classList.remove("active");
      SELPC.classList.remove("selected");
      target.appendChild(SELPC);
      if (target.attributes[0].nodeValue == "H" && CTURN == "black") {
        kingPiece(SELPC, SELPC.attributes[1].nodeValue);
      } else if (target.attributes[0].nodeValue == "A" && CTURN == "white") {
        kingPiece(SELPC, SELPC.attributes[1].nodeValue);
      }
      if (CTURN == "black") {
        setTurn(CTURN);
        CTURN = "white";
      } else if (CTURN == "white") {
        setTurn(CTURN);
        CTURN = "black";
      }
      checkEnd();
      if (!GMEND) {
        sendMessage("It's "+CTURN+"'s turn!","update");
      }
      SELPC = " ";
    } else {
      sendMessage("Invalid movement for "+CTURN, "warning");
    }
  }
}, false);

function kingPiece(pelem,pcid) {
  if (pelem.getAttribute("data-pcid") == pcid && pelem.getAttribute("data-isking") == "false") {
    playSound("res/snd/King.ogg",1.0);
    pelem.setAttribute("data-isking", "true");
    sendMessage(CTURN.toUpperCase()+" kinged piece at grid "+pelem.parentNode.getAttribute("data-row")+pelem.parentNode.getAttribute("data-col"),"update");
  }
}

function restart() {
  console.clear();
  BOARD.innerHTML = "";
  CTURN = "black";
  GMEND = false;
  BSCBD.classList.add("turn");
  WSCBD.classList.remove("turn");
  BLKSC.innerHTML = "";
  WHTSC.innerHTML = "";
  WINBR.classList.remove("visible");
  WINBR.innerHTML = "";
  PCIDS = [];
  PCELM = [];
  SELPC = "";
  BLKPT = 0;
  WHTPT = 0;
  BLPCS = 12;
  WTPCS = 12;
  MESSG.innerHTML = "";
  endClock();
  CLOCK.innerHTML = "--:--";
  MCHTM = "00:00";
  firstMove = false;
  init();
  sendMessage("Restarted game","info");
}

function exportEvents() {
  const D = new Date();
  let EXPORT = "";
  for (i=0;i<MESSG.children.length;i++) {
    EXPORT += ("[" + MESSG.children[i].className.toUpperCase()+ "] ").padEnd(10, " ") + MESSG.children[i].getAttribute("data-ts") + ": " + MESSG.children[i].innerHTML + "\n";
  }
  
  var filename = "MiniCheckers Events List - " + D.getFullYear().toString() + MNTHS[D.getUTCMonth()] + D.getUTCDate().toString().padStart(2,"0") + "T" + D.getUTCHours().toString().padStart(2,"0") + D.getUTCMinutes().toString().padStart(2,"0") + D.getUTCSeconds().toString().padStart(2,"0") + " UTC.txt";
  var file = new Blob([EXPORT], {type: "text/plain"});
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    var a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);  
    }, 0); 
  }
}

function startClock() {
  CLOCK.innerHTML = "00:00";
  var start = Date.now();
  var minute = 0;
  stopwatch = setInterval(function() {
      var delta = Date.now() - start;
      var seconds = Math.floor(delta / 1000);
      if (seconds%60==0) {
        start = Date.now();
        minute += 1;
      }
      CLOCK.innerHTML = minute.toString().padStart(2,"0") + ":" + seconds.toString().padStart(2, "0");
      if (seconds>=60) {
        CLOCK.innerHTML = minute.toString().padStart(2,"0") + ":00";
      }
      if (CLOCK.innerHTML == "99:59") {
        endClock();
      }
      MCHTM = CLOCK.innerHTML;
  }, 1000);
}

function endClock() {
  clearInterval(stopwatch);
  sendMessage("Match over! Final time: "+MCHTM, "info");
}

function saveGame() {
  const D = new Date();
  var HTML = BOARD.innerHTML;
  var EVENTS = MESSG.innerHTML;
  var data = JSON.stringify({PCIDS,CTURN,BLKPT,WHTPT,BLPCS,WTPCS,GMEND,EVENTS,HTML});

  var filename = "MiniCheckers Save Game - " + D.getFullYear().toString() + MNTHS[D.getUTCMonth()] + D.getUTCDate().toString().padStart(2,"0") + "T" + D.getUTCHours().toString().padStart(2,"0") + D.getUTCMinutes().toString().padStart(2,"0") + D.getUTCSeconds().toString().padStart(2,"0") + " UTC.json";
  var file = new Blob([data], {type: "application/json"});
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    var a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);  
    }, 0); 
  }
}

function loadGame(input) {
  let reader = new FileReader();
  let file = input.files[0];
  let json;

  reader.readAsText(file);

  reader.onload = function() {
    json = JSON.parse(reader.result);
    restart();
    PCIDS = json.PCIDS;
    CTURN = json.CTURN;
    setTurn(json.CTURN);
    BLKSC.innerHTML = "";
    WHTSC.innerHTML = "";
    for (i=0;i<json.BLKPT;i++) {
      BLKSC.innerHTML += "<div class=\"piece white\"></div>";
    }
    for (i=0;i<json.WHTPT;i++) {
      WHTSC.innerHTML += "<div class=\"piece black\"></div>";
    }
    BLPCS = json.BLPCS;
    WTPCS = json.WTPCS;
    GMEND = json.GMEND;
    MESSG.innerHTML = json.EVENTS;
    BOARD.innerHTML = json.HTML;
  };

  reader.onerror = function() {
    console.log(reader.error);
  };
}

function setPoints(team, amount) {
  if (team == "black") {
    for (i=0;i<amount;i++) {
      BLKSC.innerHTML += "<div class=\"piece white\"></div>";
    }
  } else if (team == "white") {
    for (i=0;i<amount;i++) {
      WHTSC.innerHTML += "<div class=\"piece black\"></div>";
    }
  }
}

window.addEventListener("DOMContentLoaded", function() {
  init();
  sendMessage("Welcome to version "+MCVER+" of MiniCheckers!","info");
});