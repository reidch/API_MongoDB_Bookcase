var BookView = require('./views/bookView');

var makeRequest = function(url, callback){
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.addEventListener('load', callback);
	request.send();
}

var requestComplete = function(){
	if(this.status !== 200) return;
	var bookString = this.responseText;
	var books = JSON.parse(bookString);
	var ui = new BookView(books);
}

var app = function(){
	var url = '/books';
	makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
