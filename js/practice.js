/*
 (c) akibacloud
*/

document.addEventListener("DOMContentLoaded", () => {
	registerWindows();
	registerTabs();
	renderTime();
});

function registerWindows() {
	$(".window").draggable({
		handle: ".bar"
	});
	$(".window").on("drag", function() {
		updateWindow($(this));
	});
	$(".window").on("click", function() {
		updateWindow($(this));
	});
}

function registerTabs() {
	$(".tab ul.title li").addClass("other");
	$(".tab ul.title li:first-child").removeClass("other").addClass("current");
}

function updateWindow(elem) {
	$("#currentWindow").text(elem.find(".title").text());
	$(".window").removeClass("forward").addClass("backward");
	$(elem).removeClass("backward").addClass("forward");
}

function renderTime() {
	var currentTime = new Date(), diem = "am";
	var h = currentTime.getHours(), m = currentTime.getMinutes(), s = currentTime.getSeconds();
	setTimeout("renderTime();", 1000);
	if (h == 0) {
		h = 12;
	} else if (h > 12) {
		h = h - 12;
		diem = "pm";
	}
	if (h < 10) {
		h = "0" + h;
	}
	if (m < 10) {
		m = "0" + m;
	}
	if (s < 10) {
		s = "0" + s;
	}
	$("#time :first-child").text(h + ":" + m + ":" + s + " " + diem);
}
