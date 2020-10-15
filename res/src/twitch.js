const liveElem = document.getElementsByClassName("live-tag")[0];
$.ajax({
	type: "POST",
	url: "https://id.twitch.tv/oauth2/token?client_id="+{process.env.TWITCH_CLIENT_ID}+"&client_secret="+{process.env.TWITCH_AUTH_KEY}+"&grant_type=client_credentials",
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
				"client-id": {process.env.TWITCH_CLIENT_ID}
			},
			success: function (result){
				if (result.data[0].is_live === false) {
					return false;
				} else if (result.data[0].is_live === true) {
					return true;
				}
			}
		});
	}
});