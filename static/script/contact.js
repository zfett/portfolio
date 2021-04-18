const CONTACT_FORM   = document.getElementById("Contact Form")
const COMPANY_INPUT  = document.getElementById("organization")
const POSITION_INPUT = document.getElementById("position")
const SELECT_INPUT   = document.getElementById("reason")
const MESSAGE_INPUT  = document.getElementById("message")
const MESSAGE_LABEL  = document.querySelector("label[for=\"message\"]")
const WARNING_BOX    = document.getElementById("warning")
const SUBMIT_BTN     = document.getElementById("submit")
const CAPTCHA_ELEM   = document.getElementsByClassName("g-recaptcha")[0]

COMPANY_INPUT.addEventListener("input",function(){var isEmpty = (!COMPANY_INPUT.value == "") ? (POSITION_INPUT.required = true) : (POSITION_INPUT.required = false)})

SELECT_INPUT.addEventListener("input", function() {
  if (SELECT_INPUT.value == "Security Issue") {
    MESSAGE_INPUT.setAttribute("disabled","")
    MESSAGE_INPUT.style.display = "none"
    MESSAGE_LABEL.style.display = "none"
    WARNING_BOX.removeAttribute("disabled")
    WARNING_BOX.innerHTML = "<b>Please don't use this contact form to submit security vulnerabilities!</b><br><br>If you find a vulnerability in one of my GitHub or external projects, please notify me via encrypted email using the provided public key below this form."
    CONTACT_FORM.addEventListener("onsubmit", function(){return false})
    SUBMIT_BTN.setAttribute("disabled","")
    CAPTCHA_ELEM.style.display = "none"
  } else {
    MESSAGE_INPUT.removeAttribute("disabled")
    MESSAGE_INPUT.style.display = "block"
    MESSAGE_LABEL.style.display = "inline-block"
    WARNING_BOX.setAttribute("disabled","")
    WARNING_BOX.innerHTML = ""
    CONTACT_FORM.removeEventListener("onsubmit")
    SUBMIT_BTN.removeAttribute("disabled")
    CAPTCHA_ELEM.style.display = "block"
  }
})