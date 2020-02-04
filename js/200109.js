document.addEventListener("DOMContentLoaded", function () {
	replaceListElem();
	
	play( current = Math.floor( Math.random() * list.length ) );

	$(video).on("loadedmetadata", function() {
		let height = Number( $(this).css("height").replace("px", "") ),
			width = Number( $(this).css("width").replace("px", "") );

		if (height == width || height >= width) {
			$(this).css("min-width", "0%");
		} else {
			$(this).css("min-width", "90%");
		}
	});
	$(video).on("ended", function() {
		let val = ( current == (list.length - 1) );
		play( current = ( val ? 0 : current + 1 ) );
	});

	// $("a").attr("target", "blank");
	Scroll();
});


function play(number) {
	video.src = list[number][0];
	video.volume = list[number][1]
}

function Scroll() {
	document.title = msg.substring(pos, msg.length) + space + msg.substring(0,pos);
	pos++;
	if (pos > msg.length) pos = 0;
	window.setTimeout("Scroll()", speed);
}


var space = " ", speed = "200", pos = 0, msg = document.title, current = 0, list = [[
	"https://www.dropbox.com/s/58hicjzw991ptt8/dancing%20%282%29.mp4?dl=1", 0.05
], [
	"https://www.dropbox.com/s/sqrqithy4cdhkxw/dancing-3.mp4?dl=1", 0.2
], [
	"https://www.dropbox.com/s/khr8yz080j7x2ph/tsukinomito.mp4?dl=1", 0.05
], [
	"https://www.dropbox.com/s/xnnorr6s8kd6wo4/droptop.mp4?dl=1", 0.05
]]; 