console.info("MiniCheckers JS library, version 1.0 (2021FEB27)")

const BOARD = document.getElementsByTagName("board-container")[0]; //The base element for the board
const GRIDS = document.getElementsByTagName("grid"); //The list of indiv. grid elements
const ALPHA = ["A","B","C","D","E","F","G","H","I","J"]; //All column letters
const NUMBR = ["1","2","3","4","5","6","7","8","9","10"]; //All row numbers
let   PCIDS = []; //A piece list generated after board init
let   PCELM; //A elementlist of pieces
let   CTURN = "black"; //Whose turn is it?

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
    } else if (PCELM[i].getAttribute("data-pcid") == pcid.toString() && !pelem.classList.contains("selected")) {
      pelem.classList.add("selected");
      console.info(CTURN.toUpperCase()+" selected "+pelem.getAttribute("data-ptyp")+" piece at grid "+pelem.parentNode.getAttribute("data-row")+pelem.parentNode.getAttribute("data-col"));
    } else if (PCELM[i].getAttribute("data-pcid") == pcid.toString() && pelem.classList.contains("selected")) {
      pelem.classList.remove("selected");
      console.info(CTURN.toUpperCase()+" de-selected "+pelem.getAttribute("data-ptyp")+" piece at grid "+pelem.parentNode.getAttribute("data-row")+pelem.parentNode.getAttribute("data-col"));
    }
  }
}

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
    console.info(CTURN.toUpperCase()+" kinged "+pelem.getAttribute("data-ptyp")+" piece at grid "+pelem.parentNode.getAttribute("data-row")+pelem.parentNode.getAttribute("data-col"));
  } else if (pelem.getAttribute("data-pcid") == pcid && pelem.getAttribute("data-isking") == "true") {
    pelem.setAttribute("data-isking", "false");
    console.info(CTURN.toUpperCase()+" un-kinged "+pelem.getAttribute("data-ptyp")+" piece at grid "+pelem.parentNode.getAttribute("data-row")+pelem.parentNode.getAttribute("data-col"));
  }
}

function checkMove(curRow, curCol, movRow, movCol) {
  //check if move is valid
}

function init() {
  var initFlag = false;
  if (initBoard() == true) {
    initPieces();
    initFlag = true;
  } else if (initFlag) {
    //do something
  }
}

window.addEventListener("DOMContentLoaded", init);