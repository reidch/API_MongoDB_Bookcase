var BookView = function(books){
	this.render(books);
}

BookView.prototype = {
	render: function(books){

		console.log(books);
		books.forEach(function(book){
			var li = document.createElement('li');
			var text = document.createElement('p');
			var ul = document.getElementById('books');
			text.innerText = book.title + " by " + book.author;
			li.appendChild(text);
			ul.appendChild(li);
		})
	}
}

module.exports = BookView;
