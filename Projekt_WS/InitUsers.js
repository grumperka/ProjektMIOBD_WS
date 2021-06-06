var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
if (err) throw err;

var dbo = db.db("mydb");
dbo.createCollection("users", function(err, res) {
	if (err) throw err;
	console.log("Kolekcja Userow Utworzona!");
	db.close();
});

var myUsers = [
		{	email: "admin@mail.com",	pswd: "password"	},
		{	email: "user@mail.com",	pswd: "password"	}
];

dbo.collection("users").insertMany(myUsers, function(err, res) {
	if (err) throw err;
	console.log("Baza userow zaaktualizowana");
	db.close();
}); 

dbo.collection("users").find({}, { email: 1, pswd: 1}).toArray(function(err, result) {
	if (err) throw err;
	console.log(result);
	db.close();
});

});