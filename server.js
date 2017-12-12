var express = require('express');
var parser = require('body-parser');
var app = express();
var path = require("path");
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static('client/build'));

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/bookcase", function(err, client){
	if(err){
		return console.log(err);
	}
	db = client.db("bookcase");

	console.log(db);

	app.listen(3000, function(){
		console.log("Listening on port 3000");
	});
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/build/index.html');
});

// getting all the books in the bookcase
app.get('/books', function(req, res){
	db.collection('books').find().toArray(function(err, results){
		if(err){
			return console.log(err);
		}
		res.json(results);
	});
});

// adding a new book to bookcase
app.post('/books', function(req, res){
	db.collection('books').save(req.body, function(err, result){
		if(err){
			return console.log(err);
		}
		console.log("saved to database");
		res.redirect('/');
	});
});

app.post('/delete', function(req, res){
	db.collection('books').remove();
	res.redirect('/');
})
