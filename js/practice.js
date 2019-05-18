document.addEventListener("DOMContentLoaded", () => {
});

window.onload = () => {
	registerAllWindows();
	$(".window").draggable();
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
		currentWindow.body.style["z-index"] = 1;
	}
}

function drag() {
	for (var i = 0; i < list.length; i++) {
		list[i];
	}
}

function frame() {
	var x = 0, y = 0;
	var name, body;
}

var list = new Array(), currentWindow;
