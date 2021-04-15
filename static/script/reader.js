const LINK_CONT = document.getElementById("header_links");
const BTN = document.getElementById("reader_mode");
const CUR_URL = window.location.href;
const BTN_LINK = document.getElementById("reader_link");

//Yes, I know people can spoof their user-agents. Most won't, however, so this is good enough.
if (navigator.userAgent.search("Firefox") > -1) {
  BTN_LINK.href = "about:reader?url="+CUR_URL;
  LINK_CONT.classList.add("reader");
} else {
  LINK_CONT.classList.remove("reader");
  BTN.remove();
  BTN_LINK.remove();
}