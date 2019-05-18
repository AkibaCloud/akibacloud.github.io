/*
 (c) akibacloud
*/

document.addEventListener("DOMContentLoaded", () => {
	$(".window").draggable({
		handle: ".bar"
	});
	$(".window").on("drag", function() {
		update($(this));
	});
	$(".window").on("click", function() {
		update($(this));
	});
});

function getFrameFromElement(element) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].body == element) return list[i];
	}
}

function update(elem) {
	$("#currentWindow").text(elem.find(".title").text());
	$(".window").removeClass("forward").addClass("backward");
	$(elem).removeClass("backward").addClass("forward");
}
