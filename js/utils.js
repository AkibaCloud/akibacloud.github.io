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

function hiddenTitle() {
	var doc = document.getElementsByClassName("hidden");
	for (var i = 0; i < doc.length; i++) doc[i].title = doc[i].innerText;
};

String.prototype.replaceAll = function (oldChar, newChar) {
	return this.split(oldChar).join(newChar);
}

String.prototype.equalsIgnoreCase = function (text) {
	return this.toLowerCase() == text.toLowerCase();
}

String.prototype.clean = function (text) {
	return this.replaceAll(" ", "").replaceAll("\n", "");
}

Array.prototype.isEmpty = function() {
	return this.length == 0;
}