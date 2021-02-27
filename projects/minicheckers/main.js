const BOARD = document.getElementsByTagName("board-container")[0]; //The base element for the board
let   GRIDS = document.getElementsByTagName("grid"); //The list of indiv. grid elements
const ALPHA = ["A","B","C","D","E","F","H","I"]; //All column names
const NUMBR = ["1","2","3","4","5","6","7","8"]; //All row numbers
const WHTSP = ["I2","I4","I6","I8","H1","H3","H5","H7","F2","F4","F6","F8"]; //The white piece starting points
const BLKSP = ["C1","C3","C5","C7","B2","B4","B6","B8","A1","A3","A5","A7"]; //The black piece starting points;

function initBoard() {
  for(i=0;i<=64;i++) {
    if (i>0 && i<=8) {
      BOARD.innerHTML += "<grid gridId=\""+ALPHA[7]+NUMBR[i-1]+"\"></grid>";
    } else if (i>8 && i<=16) {
      BOARD.innerHTML += "<grid gridId=\""+ALPHA[6]+NUMBR[i-9]+"\"></grid>";
    } else if (i>16 && i<=24) {
      BOARD.innerHTML += "<grid gridId=\""+ALPHA[5]+NUMBR[i-17]+"\"></grid>";
    } else if (i>24 && i<=32) {
      BOARD.innerHTML += "<grid gridId=\""+ALPHA[4]+NUMBR[i-25]+"\"></grid>";
    } else if (i>32 && i<=40) {
      BOARD.innerHTML += "<grid gridId=\""+ALPHA[3]+NUMBR[i-33]+"\"></grid>";
    } else if (i>40 && i<=48) {
      BOARD.innerHTML += "<grid gridId=\""+ALPHA[2]+NUMBR[i-41]+"\"></grid>";
    } else if (i>48 && i<=56) {
      BOARD.innerHTML += "<grid gridId=\""+ALPHA[1]+NUMBR[i-49]+"\"></grid>";
    } else if (i>56 && i<=64) {
      BOARD.innerHTML += "<grid gridId=\""+ALPHA[0]+NUMBR[i-57]+"\"></grid>";
    }
  }
  console.info("Board layout initialized");
  return true;
}

function initPieces() {
  for(i=0;i<=GRIDS.length/2;i++) {
    if (GRIDS[i].getAttribute("gridId") == WHTSP[i]) {
      GRIDS[i].innerHTML += "<piece white/>";
    }
  }

  console.info("Placed pieces");
  return true;
}

function init() {
  var stage1 = initBoard();
  if (stage1 == true) {
    initPieces();
  }
}

window.addEventListener("DOMContentLoaded", init);