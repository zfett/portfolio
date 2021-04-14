const COMPANY_INPUT = document.getElementById("organization")
const POSITION_INPUT = document.getElementById("position")
COMPANY_INPUT.addEventListener("input",function(){var isEmpty = (!COMPANY_INPUT.value == "") ? (POSITION_INPUT.required = true) : (POSITION_INPUT.required = false)})