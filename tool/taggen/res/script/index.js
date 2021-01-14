const PROJ_VER = "1.0.0";
document.getElementById("app_version").innerHTML = "Version "+PROJ_VER;

const SUPPORT_MODAL = document.getElementById("support_modal");

function toggleModal() {
  if (SUPPORT_MODAL.style.display == "none") {
    SUPPORT_MODAL.style.display = "block";
  } else if (SUPPORT_MODAL.style.display == "block") {
    SUPPORT_MODAL.style.display = "none";
  }
}