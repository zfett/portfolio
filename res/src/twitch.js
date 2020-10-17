const liveElem = document.getElementsByClassName("live-tag")[0];
const liveCont = document.getElementById("live");
$.ajax({
	type: "POST",
	url: "https://id.twitch.tv/oauth2/token?client_id="+process.env.TWITCH_CLIENT_ID+"&client_secret="+process.env.TWITCH_AUTH_KEY+"&grant_type=client_credentials",
	async: false,
	dataType: 'json',
	success: function (data){
		$.ajax({
			type: "GET",
			url: "https://api.twitch.tv/helix/search/channels?query=zachsdesigncorner",
			dataType: 'json',
			async: false,
			headers: {
				"Authorization": "Bearer "+data.access_token,
				"client-id": process.env.TWITCH_CLIENT_ID
			},
			success: function (result){
				liveElem.title = "I'm live on Twitch: "+result.data[0].title;
				if (result.data[0].is_live === false) {
					liveCont.remove();
				} else if (result.data[0].is_live === true) {
					liveElem.classList.add("active");
				}
			}
		});
	}
});