/*
  (c) AkibaCloud
*/

document.addEventListener("DOMContentLoaded", () => {
	links();
	setInterval(() => {
		let text = $("#text");
		text.css("display", text.text().length == 0 ? "none" : "block");
	}, 500);

	// audio init
	initAudio();

	// audio controll
	seekbar();
	volume();
	registerButtons();
});

function links() {
	let links = $("#profile a");
	for (let i = 0; i < links.length; i++) {
		links.attr("target", "_blank");
	}
}

function initAudio() {
	audio = $("audio")[0];

	if (localStorage.getItem("191031") == null) {
		localStorage.setItem("191031", JSON.stringify(settings));
	} else {
		settings = JSON.parse(localStorage.getItem("191031"));
	}

	audio.currentTime = settings["time"];
	play(current = settings["id"]);
	audio.volume = settings["volume"];
	
	autoSave();

	$(audio).on("ended", () => {
		play(++current);
	});
}

function autoSave() {
	localStorage.setItem("191031", JSON.stringify(settings));
	setTimeout(() => { autoSave(); }, 500)
}

function registerButtons() {
	// clicks
	$("#toggle").on("click", function() {
		toggle();
	})
	$("#prev").on("click", function() {
		play(--current);
	})
	$("#next").on("click", function() {
		play(++current);
	})

	// audio events
	$(audio).on("playing", function () {
		$("#toggle").text("[ || ]");
	});
	$(audio).on("pause", function () {
		$("#toggle").text("[ ▷ ]");
	});
}

function toggle() {
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
}

function seekbar() {
	let seekbar = $("#seekbar")[0];
	if (audio.readyState > 0){
		seekbar.max = audio.duration;
	} else {
		$(audio).on("loadedmetadata", () => {
			seekbar.max = audio.duration;
		});
	}

	$(seekbar).on("input", () => {
		audio.currentTime = seekbar.value;
	});
	$(audio).on("timeupdate", () => {
		settings["time"] = seekbar.value = audio.currentTime;
	});
};

function volume() {
	let volBar = $("#volume")[0];
	if (audio.readyState > 0){
		volBar.value = audio.volume*100;
	} else {
		$(audio).on("loadedmetadata", () => {
			volBar.value = audio.volume*100;
		});
	}

	$(volBar).on("input", () => {
		settings["volume"] = audio.volume = parseFloat(volBar.value/100);
	});
};

function play(number) {
	if (number >= list.length) {
		number = 0;
	} else if (number < 0) {
		number = list.length-1;
	}
	settings["id"] = current = number;
	audio.src = "assets/audios/" + list[current];
	$("#text").text("▷ " + list[current].replace(".mp3", ""));
	return "Playing: " + list[current];
}

var audio = null, current = 0, 
	list = [
		"KOHH - Paris (Sam Tiba Remix).mp3"
	],
	settings = {
		"time": 0,
		"id": 0,
		"volume": 0.05
	};