let iron      = document.getElementById("iron");
let diamond   = document.getElementById("diamond");
let emerald   = document.getElementById("emerald");
let result    = document.getElementById("result");

function clearInput() {
  iron.value    = "0";
  diamond.value = "0";
  emerald.value = "0";
  result.value  = "¤0";

  return false;
}

function calcValues() {
  var finalValue = (parseInt(iron.value) + 
                   (parseInt(diamond.value) * 9) + 
                   (parseInt(emerald.value) * 162));

  return result.value = "¤" + new Intl.NumberFormat("en-US", {style: "decimal"}).format(finalValue);
}