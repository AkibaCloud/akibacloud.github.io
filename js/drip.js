function randomVideo() {
	var videoid = getArg("id");
	if (videoid !== null && videoid <= items.length) {
		currentID = videoid;
	} else {
		currentID = Math.floor(Math.random() * (items.length));
	}
	if (localStorage.getItem("locked") != null) {
		currentID = Number(localStorage.getItem("locked"));
	}
	switchVideo(currentID);
}

function drawid() {
	document.getElementById("videoid").innerText = "id: " + currentID;
}

function switchVideo(num) {
	if (num >= items.length) {
		num = 0;
	} else if (num < 0) {
		num = items.length-1;
	}
	currentID = num;
	document.getElementById("video").src = items[num];
}

function next() {
	switchVideo(++currentID);
	drawid();
}

function prev() {
	switchVideo(--currentID);
	drawid();
}

document.addEventListener("DOMContentLoaded", function () {
	setMode();
	randomVideo();
	drawid();

	var volStorage = localStorage.getItem("Volume") !== null && localStorage.getItem("Volume") !== "null";
	document.getElementById("site-info").innerText = document.getElementById("site-info").innerText.replace("%nigger%", items.length - 1);

	if (localStorage.getItem("muted") == null && volStorage) {
		localStorage.setItem("muted", muted);
	} else if (localStorage.getItem("muted") != null) {
		muted = (localStorage.getItem("muted") == "true");
	}
	video.muted = muted;

	if (volStorage) {
		var vol = parseFloat(localStorage.getItem("Volume"));
		document.getElementById("input").value = vol;
		changeVolume(vol);
		SetVolume(vol);
	} else {
		SetVolume(0);
		localStorage.setItem("Volume", 0);
		document.getElementById("input").value = 0;
		var volElem = document.getElementById("volume");
		volElem.innerText = "volume: 0%(muted)";
		volElem.style.width = "140px";
	}
	video.addEventListener("ended", () => {
		if (loopAll) {
			next();
		} else {
			video.play();
		}
	});
});

document.addEventListener("DOMContentLoaded", function () {
	var btn = document.getElementById("toggle");
	var playTxt = "[ ▷ ]", pauseTxt = "[ || ]";
	video.addEventListener("playing", function () {
		// console.log("video: playing");
		btn.innerText = pauseTxt;

		if (localStorage.getItem("locked") != null && currentID != Number(localStorage.getItem("locked"))) {
			var lock = document.getElementById("locked");
			lock.className = "fas fa-lock-open";
			lock.title = "unlocked";
		}
	}, false);
	video.addEventListener("pause", function () {
		// console.log("video: paused");
		btn.innerText = playTxt;
	}, false);
	video.addEventListener("loadedmetadata", function () {
		// console.log("video: loaded!");
	}, false);
	video.addEventListener("canplaythrough", function () {
		// console.log("video: suro-!");
		/*if (btn.innerText === playTxt) {
			btn.innerText = pauseTxt;
		} else {
			btn.innerText = playTxt;
		}*/
		//toggle();
	}, false);
	seekbar();
});

function changeVolume(value) {
	var vol = document.getElementById("volume");
	SetVolume(value);
	vol.innerText = "volume: " + value + "%" + (video.muted ? "(muted)" : "");
	localStorage.setItem("Volume", vol.innerText.replace("volume: ", "").replace("%", "").replace("(muted)", ""));
	changeMuteicon(value);
};

function changeMuteicon(value) {
	var icon = document.getElementById("mute"),
		int = Number(value);
	if (int === 0 || video.muted === true) {
		icon.className = "fas fa-volume-mute";
	} else if (int < 0) {
		video.muted = false;
	} else if (int < 15) {
		icon.className = "fas fa-volume-down";
		video.muted = false;
	} else {
		icon.className = "fas fa-volume-up";
		video.muted = false;
	}
}

function toggle() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
};

function muteToggle() {
	video.muted = !video.muted;
	localStorage.setItem("muted", muted = video.muted);
	changeMuteicon(Number(localStorage.getItem("Volume")));
	var vol = document.getElementById("volume");
	vol.innerText = video.muted ? vol.innerText + "(muted)" : vol.innerText.replace("(muted)", "");
};

function setMode() {
	if (localStorage.getItem("loopAll") == null) {
		localStorage.setItem("loopAll", loopAll);
	}
	loopAll = Boolean(localStorage.getItem("loopAll") == "true");
	document.getElementById("mode").innerText = loopAll ? "list loop" : "single loop";
}

function mode() {
	loopAll = !loopAll;
	document.getElementById("mode").innerText = loopAll ? "list loop" : "single loop";
	localStorage.setItem("loopAll", loopAll);
}

function inputHider() {
	var child = document.getElementById("input"), parent = child.parentElement;
	$(parent).hover(() => {;
		parent.style.width = "150px";
		child.style.display = "initial";
	}, () => {
		parent.style.width = muted ? "140px" : "95px";
		child.style.display = "none";
	})
}

function seekbar() {
	var seekbar = document.getElementById("seekbar");
	if (video.readyState > 0){
		seekbar.max = video.duration;
	} else {
		video.addEventListener("loadedmetadata", () => {
			seekbar.max = video.duration;
		});
	}
	seekbar.addEventListener("change", () => {
		video.currentTime = seekbar.value;
	}, false);
	video.addEventListener("timeupdate", () => {
		seekbar.value = video.currentTime;
	}, false);
};

function pipToggle() {
	if (document.pictureInPictureElement) {
		document.exitPictureInPicture().catch(console.error);
	} else {
		video.requestPictureInPicture().catch(console.error);
	}
}

function lock() {
	var doc = document.getElementById("locked");
	if (doc.className == "fas fa-lock-open") { // localStorage.getItem("locked") == null
		doc.className = "fas fa-lock";
		doc.title = "locked";
		localStorage.setItem("locked", currentID);
	} else {
		doc.className = "fas fa-lock-open";
		doc.title = "unlocked";
		localStorage.removeItem("locked");
	}
}

function lockIcon() {
	var doc = document.getElementById("locked");
	if (localStorage.getItem("locked") == null) {
		doc.className = "fas fa-lock-open";
		doc.title = "unlocked";
	} else {
		doc.className = "fas fa-lock";
		doc.title = "locked";
	}
}

var loopAll = true, currentID = 0, muted = true;
var items = [
	"https://www.dropbox.com/s/6dxwvqbzpz42kht/rakisuta.mp4?dl=1", 
	"https://www.dropbox.com/s/xyy0xu4hgazsugz/rakisuta-2.mp4?dl=1", 
	"https://www.dropbox.com/s/esjmu9wwlw8vaz5/dancing-2.mp4?dl=1", 
	"https://www.dropbox.com/s/4d8vjhlq1shngqq/dancing.mp4?dl=1", 
	"https://www.dropbox.com/s/sqrqithy4cdhkxw/dancing-3.mp4?dl=1", 
	"https://www.dropbox.com/s/42kts7mvjwiqb62/dancing-4.mp4?dl=1", 
	"https://www.dropbox.com/s/9qvedc1a7bm2iz2/Esta%20-%201738.mp4?dl=1", 
	"https://www.dropbox.com/s/nlo7o6czz5yj0dx/monogatari.mp4?dl=1", 
	"https://www.dropbox.com/s/b4o5v1lsvkq1x4j/trip.mp4?dl=1", 
	// "https://www.dropbox.com/s/ucsbkr32g03gucv/get_it_.mp4?dl=1",
	// "https://www.dropbox.com/s/anjnw5be3mwwo3t/%5B%E3%81%A0%E3%81%8C%E3%81%97%E3%81%8B%E3%81%97%5D%20AD.mp4?dl=1",
	"https://www.dropbox.com/s/hrupq3bykniuy0m/Evangelion_%202.0%20You%20Can%20%28Not%29%20Advance%20-%20Trailer%20%28deutsch_german%29.mp4?dl=1", 
	"https://www.dropbox.com/s/s72egzxwop4hq5v/Evangelion%203.33%20You%20Can%20%28Not%29%20Redo%20-%20Trailer%20%28deutsch_german%29.mp4?dl=1", 
	"https://www.dropbox.com/s/fwpyapl0uvf3yc2/pp5aJ2FWSi1PmxFY.mp4?dl=1", 
	"https://www.dropbox.com/s/ksfrbq5inq9nq0e/U%20got%20that.mp4?dl=1", 
	"https://www.dropbox.com/s/vwi5voi9q0ailqk/cream.mp4?dl=1", 
	"https://www.dropbox.com/s/khr8yz080j7x2ph/tsukinomito.mp4?dl=1", 
	// "https://www.dropbox.com/s/13iaqe9hnjhf34e/xqu-l14MjDaFvhl0.mp4?dl=1", 
	"https://www.dropbox.com/s/g6e07zo8gdara42/eMAqc9jhGF_UpDo5.mp4?dl=1",
	// "https://www.dropbox.com/s/74jhu4lsffa5jd0/rakisuta-3.mp4?dl=1" ,
	"https://www.dropbox.com/s/e6cqvve49c8vwal/U%20Got%20That%20%28Miku%20Mix%29.mp4?dl=1",
	"https://www.dropbox.com/s/uyhmkzvdtxuxdlv/Neko%20Mimi%20Mode.mp4?dl=1"
	];
