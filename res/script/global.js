console.info("%cRecruiters & Employers: I'm looking for work if you need a front-end designer! @zfett on LinkedIn", "color: limegreen; font-size: 20px;");

const banner = document.getElementById("tracking_banner");

function cookieConsent() {
  document.cookie = "zfBannerShown=false; expires=Sat, 1 Jan 2050 12:00:00 UTC; path=/; secure=true; sameSite=true;";
  banner.remove();
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

if (!getCookie("zfBannerShown")) {
  banner.style.display = "block";
} else {
  banner.remove();
}