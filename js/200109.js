document.addEventListener("DOMContentLoaded", function () {
	play( current = Math.floor( Math.random() * list.length ) );

	$(video).on("ended", () => {
		let val = ( current == (list.length - 1) );
		play( current = ( val ? 0 : current + 1 ) );
	});

	// $("a").attr("target", "blank");
});


function play(number) {
	video.src = list[number][0];
	video.volume = list[number][1]
}

var current = 0, list = [[
	"https://www.dropbox.com/s/4d8vjhlq1shngqq/dancing.mp4?dl=1", 0.05
], [
	"https://www.dropbox.com/s/sqrqithy4cdhkxw/dancing-3.mp4?dl=1", 0.2
], [
	"https://www.dropbox.com/s/khr8yz080j7x2ph/tsukinomito.mp4?dl=1", 0.05
], [
	"https://www.dropbox.com/s/9qvedc1a7bm2iz2/Esta%20-%201738.mp4?dl=1", 0.05
]]; 