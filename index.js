const express = require('express');
const JSONdb = require('simple-json-db');
const db = new JSONdb(__dirname + '/books.json');

const app = express();
const port = 4567;
app.use(express.json());

app.listen(port,function() {
	console.log("Listening on port "+ port);
});

app.get('/', function(req,res) {
	if(req.query.isbn) {
		console.log(req.query.isbn);
		if(db.has(req.query.isbn)) {
			let dir = db.get(req.query.isbn);
			res.send(dir);
		}
	}
	// res.send("<h1> pineapple pizza </h1>");
});
