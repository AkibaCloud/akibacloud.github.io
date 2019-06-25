/*
  (c) AkibaCloud
*/

document.addEventListener("DOMContentLoaded", () => {
	// audio init
	initAudio();

	// list loop
	$(audio).on("ended", () => {
		play(++current);
	});

	// audio controll
	seekbar();
	registerButtons();
});

function initAudio() {
	var audio = $("#audio")[0];
	audio.muted = false;
	audio.volume = 0.05;

	if (localStorage.getItem("190524") == null) {
		localStorage.setItem("190524", JSON.stringify(settings));
	} else {
		settings = JSON.parse(localStorage.getItem("190524"));
	}

	audio.currentTime = settings["time"];
	play(current = settings["id"]);
	
	autoSave();
}

function autoSave() {
	localStorage.setItem("190524", JSON.stringify(settings));
	setTimeout(function() { autoSave(); }, 500)
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
	var seekbar = document.getElementById("seekbar");
	if (audio.readyState > 0){
		seekbar.max = audio.duration;
	} else {
		$(audio).on("loadedmetadata", () => {
			seekbar.max = audio.duration;
		});
	}

	// change or input
	// inputの方が良い。 timepudateとクリックした時のタイミングが重なった時、changeだと無かったことになる(valueが元の位置に戻る)
	$(seekbar).on("input", () => {
		audio.currentTime = seekbar.value;
	});
	$(audio).on("timeupdate", () => {
		settings["time"] = seekbar.value = audio.currentTime;
	});
};

function play(number) {
	if (number >= list.length) {
		number = 0;
	} else if (number < 0) {
		number = list.length-1;
	}
	settings["id"] = current = number;
	audio.src = "../assets/audios/" + list[current];
	return "Playing: " + list[current];
}

var current = 0, 
	list = [
		"cYsmix feat Emmy - Tear Rain.mp3", 
		"From Under Cover [Foreground Eclipse].mp3", 
		"MISATO - Necro Fantasia.mp3"
	],
	settings = {
		"time": 0,
		"id": 0
	};