function replaceListElem() {
	var doc = document.getElementsByClassName("list");
	for (var n in doc) {
		var elem = doc[n].children;
		for (var i in elem) {
			elem[i].innerHTML = " - " + elem[i].innerHTML;
		}
	}
}

function getArg(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function popup(url) {
	window.open(url, "popup", "width = auto, height = auto");
}
window.onload = () => {
	var doc = document.getElementsByClassName("hidden");
	for (var i = 0; i < doc.length; i++) doc[i].title = doc[i].innerText;
};