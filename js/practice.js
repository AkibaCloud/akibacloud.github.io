document.addEventListener("DOMContentLoaded", () => {
	var windows = document.getElementsByClassName("window");
	for (var i = 0; i < windows.length; i++) {
		var aFrame = new frame();
		aFrame.x = Number(windows[i].style.width);
		aFrame.y = Number(windows[i].style.height);
		list.push(aFrame);
	}
});

function frame() {
	var x = 0, y = 0;
}

const list = new Array();