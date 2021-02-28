const MCVER = "1.0";
const MESSG = document.getElementById("event-container");
const BOARD = document.getElementsByTagName("board-container")[0]; //The base element for the board
const GRIDS = document.getElementsByTagName("grid"); //The list of indiv. grid elements
const ALPHA = ["A","B","C","D","E","F","G","H","I","J"]; //All column letters
const NUMBR = ["1","2","3","4","5","6","7","8","9","10"]; //All row numbers
const MNTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
let   PCIDS = []; //A piece list generated after board init
let   PCELM; //A elementlist of pieces
let   CTURN = "black"; //Whose turn is it?
let   SELPC = " "; //Selected piece

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
}

function initBoard() {
  for(i=0;i<=64;i++) {
    if (i>0 && i<=8) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[7]+"\" data-col=\""+NUMBR[i-1]+"\"></grid>";
    } else if (i>8 && i<=16) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[6]+"\" data-col=\""+NUMBR[i-9]+"\"></grid>";
    } else if (i>16 && i<=24) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[5]+"\" data-col=\""+NUMBR[i-17]+"\"></grid>";
    } else if (i>24 && i<=32) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[4]+"\" data-col=\""+NUMBR[i-25]+"\"></grid>";
    } else if (i>32 && i<=40) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[3]+"\" data-col=\""+NUMBR[i-33]+"\"></grid>";
    } else if (i>40 && i<=48) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[2]+"\" data-col=\""+NUMBR[i-41]+"\"></grid>";
    } else if (i>48 && i<=56) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[1]+"\" data-col=\""+NUMBR[i-49]+"\"></grid>";
    } else if (i>56 && i<=64) {
      BOARD.innerHTML += "<grid data-row=\""+ALPHA[0]+"\" data-col=\""+NUMBR[i-57]+"\"></grid>";
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
    PCELM[i].setAttribute("oncontextmenu", "kingPiece(this,this.attributes[1].nodeValue)");
  }

  console.info("Placed all pieces successfully");
  sendMessage("Welcome to version "+MCVER+" of MiniCheckers!","info");
  return true;
}

function selectPiece(pelem,pcid) {
  if (pelem.getAttribute("data-ptyp") !== CTURN) {
    console.warn("Cannot select an opponent's piece!");
    return false;
  }

  for(i=0;i<PCELM.length;i++) {
    if (PCELM[i].classList.contains("selected") && PCELM[i].getAttribute("data-pcid") !== pcid.toString()) {
      PCELM[i].classList.remove("selected");
      SELPC = " ";
    } else if (PCELM[i].getAttribute("data-pcid") == pcid.toString() && !pelem.classList.contains("selected")) {
      pelem.classList.add("selected");
      SELPC = pelem;
      sendMessage(CTURN.toUpperCase()+" selected piece at grid "+pelem.parentNode.getAttribute("data-row")+pelem.parentNode.getAttribute("data-col"),"update");
    } else if (PCELM[i].getAttribute("data-pcid") == pcid.toString() && pelem.classList.contains("selected")) {
      pelem.classList.remove("selected");
      SELPC = " ";
    }
  }
}

const AGRID = document.querySelectorAll("grid.active");
let OLDPARENT;
BOARD.addEventListener('click', function(e) {
  OLDPARENT = SELPC.parentNode;
  e = e || window.event;
  var target = e.target;
  if (target.tagName == "GRID" && SELPC !== " ") {
    target.classList.add("active");
    OLDPARENT.classList.remove("active");
    SELPC.classList.remove("selected");
    target.appendChild(SELPC);
    sendMessage(CTURN+" moved piece at "+OLDPARENT.attributes[0].nodeValue+OLDPARENT.attributes[1].nodeValue+" to grid "+target.attributes[0].nodeValue+target.attributes[1].nodeValue,"update");
    if (target.attributes[0].nodeValue == "H" && CTURN == "black") {
      kingPiece(SELPC, SELPC.attributes[1].nodeValue);
    } else if (target.attributes[0].nodeValue == "A" && CTURN == "white") {
      kingPiece(SELPC, SELPC.attributes[1].nodeValue);
    }
    (CTURN == "black") ? CTURN = "white" : CTURN = "black";
    sendMessage("It's "+CTURN+"'s turn!","info");
    SELPC = " ";
  }
}, false);

function kingPiece(pelem,pcid) {
  if (pelem.getAttribute("data-ptyp") !== CTURN) {
    console.warn("Cannot change status of pieces from opponent!");
    return false;
  } else if (pelem.getAttribute("data-ptyp") == "black" && pelem.parentNode.getAttribute("data-row") !== "H") {
    console.warn("Cannot king a black piece that is not on row \"H\"!");
    return false;
  } else if (pelem.getAttribute("data-ptyp") == "white" && pelem.parentNode.getAttribute("data-row") !== "A") {
    console.warn("Cannot king a white piece that is not on row \"A\"!");
    return false;
  } else if (pelem.getAttribute("data-pcid") == pcid && pelem.getAttribute("data-isking") == "false") {
    pelem.setAttribute("data-isking", "true");
    sendMessage(CTURN.toUpperCase()+" kinged piece at grid "+pelem.parentNode.getAttribute("data-row")+pelem.parentNode.getAttribute("data-col"),"update");
  } else if (pelem.getAttribute("data-pcid") == pcid && pelem.getAttribute("data-isking") == "true") {
    pelem.setAttribute("data-isking", "false");
    sendMessage(CTURN.toUpperCase()+" un-kinged piece at grid "+pelem.parentNode.getAttribute("data-row")+pelem.parentNode.getAttribute("data-col"),"update");
  }
}

function init() {
  if (initBoard() == true) {
    initPieces();
  }
}

window.addEventListener("DOMContentLoaded", init);