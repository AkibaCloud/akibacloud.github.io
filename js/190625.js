$( function() {
	$("#t1").css("top", ( $("#t1").text().length*6 ) + "px");

	var tag = $("a");
	for (var i = 0; i < tag.length; i++) {
		$(tag[i]).attr("title", $(tag[i]).text());
	}
} );