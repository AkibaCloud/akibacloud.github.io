/*
 (c) akibacloud
*/

document.addEventListener("DOMContentLoaded", () => {
	$(".window").draggable({
		cancel: ".body"
	});
	$(".window").on("drag", function() {
		update($(this));
	});
	$(".window").on("click", function() {
		update($(this));
	});
});

window.onload = () => {
	registerAllWindows();
}

function registerAllWindows() {
	var windows = $(".window");
	for (var i = 0; i < windows.length; i++) {
		var aFrame = new frame(), rect = windows[i].getBoundingClientRect();
		aFrame.x = rect.left;
		aFrame.y = rect.top;
		aFrame.name = $(".bar")[i].innerText.clean();
		aFrame.body = windows[i];
		list.push(aFrame);
	}
	if (!list.isEmpty()) {
		currentWindow = list[0];
	}
}

function getFrameFromElement(element) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].body == element) return list[i];
	}
}

function frame() {
	var x = 0, y = 0;
	var name, body;
}

function update(elem) {
	$("#currentWindow").text(elem.find(".title").text());
	$(".window").removeClass("forward").addClass("backward");
	$(elem).removeClass("backward").addClass("forward");
}

var list = new Array(), currentWindow;
