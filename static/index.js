function setEmail() { //function to (hopefully) stop email scraper bots. Sets href on body load.
  document.getElementById("email").href = "mailto:zachfett@protonmail.com?subject=Design%20Project%20Request%20%E2%80%94%20YOUR%20NAME%20HERE&body=Details%20about%20your%20project%20request%20go%20here.%20Things%20like%20design%20ideas%2C%20branding%20details%2C%20and%20soft%20deadlines%20are%20highly%20recommended.%20The%20more%20details%20provided%2C%20the%20more%20interested%20I%20become%20in%20the%20project!";
  return true;
}

function calculate_dates(birth_month, birth_day, birth_year) {
  today_date = new Date();
  today_year = today_date.getFullYear();
  today_month = today_date.getMonth();
  today_day = today_date.getDate();
  age = today_year - birth_year;

  if (today_month < (birth_month - 1)) {
    age--;
  }
  if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
    age--;
  }
  document.getElementById("age").innerHTML = age;
  document.getElementById("year").innerHTML = today_year;
	return true;
}

calculate_dates(1, 14, 2001);