document.addEventListener("DOMContentLoaded", () => {
	sizeClasses();
});

function sizeClasses() {
	for (var i = 0; i < 100; i++) {
		var style = { "width": 100, "height": 100, "transform": "" };

		style["width"] = (style["width"] - i) + "%";
		style["height"] = (style["height"] - i) + "%";
		style["transform"] = "translate(" +  ( (i/2) + "%," + (i/2) + "%" )  + ")";

		$(".mini-" + i).css(style);
	}
}