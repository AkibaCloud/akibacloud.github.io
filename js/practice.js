/*
 (c) akibacloud
*/

document.addEventListener("DOMContentLoaded", () => {
	registerWindows();
	registerTabs();
	renderTime();
});

function registerWindows() {
	$(".window:not(:first-child)").addClass("backward");
	updateWindow($(".windows").find(":first"));

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
	$(".tab ul.name li").addClass("other");
	$(".tab ul.name li:first-child").removeClass("other").addClass("current");

	$(".tab ul.display li").addClass("backward");
	$(".tab ul.display li:first-child").removeClass("backward").addClass("forward");

	$(".tab ul.name li").on("click", function() {
		var parent = $(this).parents(".tab");
		$(parent.find("ul.name li")).removeClass("current").addClass("other");
		$(this).removeClass("other").addClass("current");

		var index = $(parent.find("ul.name li.current")).index();
		
		$(parent.find("ul.display li")).removeClass("forward").addClass("backward");
		$($(parent.find("ul.display li"))[index]).removeClass("backward").addClass("forward");
		updateTabPath(parent);
		console.log(parent)
	});
	var tabs = $(".tab");
	for (var i = 0; i < tabs.length; i++) updateTabPath($(tabs[i]) );
}

function updateWindow(elem) {
	$("#currentWindow").text(elem.find(".title").text());
	$(".window").removeClass("forward").addClass("backward");
	$(elem).removeClass("backward").addClass("forward");
}

function updateTabPath(parent) {
	parent.find(".path").text("Drip > Portfolio > " + parent.grandpa().find(".title").text() + " > " + parent.find("ul.name li.current").text());
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
