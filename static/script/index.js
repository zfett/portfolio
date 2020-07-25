function getCurrentDate() {
	const d = new Date();
	const dateObj = document.getElementsByClassName("date");
	var month = [];
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	var convDate = month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	
	dateObj[0].innerHTML = convDate;
}

getCurrentDate();