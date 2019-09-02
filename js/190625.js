$( function() {
	$("#toggle-font").on("click", () => {
		var text = $(".right-text"), btn = $("#toggle-font");

		if (text.css("font-family") == "UnifrakturCook") {
			text.css("font-family", "MS UI Gothic");
			btn.css("background-image", "linear-gradient(225deg, #d7d2cc 0%, #304352 100%)");
		} else {
			text.css("font-family", "UnifrakturCook");
			btn.css("background-image", "linear-gradient(45deg, #d7d2cc 0%, #304352 100%)");
		}
	});
} );