const announcementBanner = document.getElementById("announcement-banner");
const pageHeader = document.getElementById("page-header-cont");

function closeAnnouncement() {
  if (pageHeader.classList == "announcement") {
    pageHeader.classList.remove("announcement");
    announcementBanner.classList.add("hidden");
  } else {
    pageHeader.classList.add("announcement");
    announcementBanner.classList.remove("hidden")
  }
}