var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/bazaDanych";
MongoClient.connect(url, function(err, db) {
if (err) throw err;

var dbo = db.db("bazaDanych"); 

var pokoje1;

var pokoje = dbo.collection("pokoje").find({},{'nazwa': 1}).toArray();
console.log(pokoje[1]);
db.close();

/*
dbo.createCollection("rezerwacje", function(err, res) {
	if (err) throw err;
	console.log("Kolekcja Rezerwacje gotowa");
	db.close();
});

dbo.createCollection("rachunki", function(err, res) {
	if (err) throw err;
	console.log("Kolekcja Rachunki gotowa");
	db.close();
});

dbo.createCollection("uzytkownicy", function(err, res) {
	if (err) throw err;
	console.log("Kolekcja Uzytkownicy gotowa");
	db.close();*/
}); 