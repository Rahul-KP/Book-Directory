const express = require('express');
const JSONdb = require('simple-json-db');
const db = new JSONdb(__dirname + '/books.json');

const app = express();
const port = 4567;
app.use(express.json());

app.listen(port,function() {
	console.log("Listening on port "+ port);
	console.log(db.JSON());
});

app.get('/', function(req,res) {
	if(req.query.isbn) {
		console.log(req.query.isbn);
		if(db.has(req.query.isbn)) {
			let dir = db.get(req.query.isbn);
			res.send(dir);
		}
	}
});

app.post('/',function(req,res) {
	console.log(req.body);
	db.set(req.body.isbn,{"author":req.body.author,"title":req.body.title});
	res.send("Book details added\n");
});

app.put('/',function(req,res) {
	res.send("Starting put request");
	// console.log(req.body);
	if(db.has(req.body.isbn)) {
		db.set(req.body.isbn,{"author":req.body.author,"title":req.body.title});
	}
	// console.log(db.JSON());
});

app.delete('/',function(req,res) {
	if(db.has(req.body.isbn)) {
		db.delete(req.body.isbn);
		res.send("Entry deleted");
	}
	else {
		res.send("Entry does not exist");
	}
});