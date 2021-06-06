var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/bazaDanych";
MongoClient.connect(url, function(err, db) {
if (err) throw err;

var dbo = db.db("bazaDanych");  
dbo.createCollection("pokoje", function(err, res) {
	if (err) throw err;
	console.log("Kolekcja Pokoje gotowa");
	db.close();
});

dbo.createCollection("pracownicy", function(err, res) {
	if (err) throw err;
	console.log("Kolekcja Pracownicy gotowa");
	db.close();
});

dbo.createCollection("klienci", function(err, res) {
	if (err) throw err;
	console.log("Kolekcja Klienci gotowa");
	db.close();
});

///////////////////////////////////////////////////////////////////

var pokoje = [ 
	{nr_pokoju: 1, nazwa: 'Uno', ile_osob: 1, cena: 100},
	{nr_pokoju: 2, nazwa: 'Due', ile_osob: 1, cena: 100},
	{nr_pokoju: 3, nazwa: 'Tre', ile_osob: 1, cena: 100},
	{nr_pokoju: 4, nazwa: 'Quattro', ile_osob: 1, cena: 100},
	
	{nr_pokoju: 5, nazwa: 'Ichi', ile_osob: 2, cena: 150},
	{nr_pokoju: 6, nazwa: 'Ni', ile_osob: 2, cena: 150},
	{nr_pokoju: 7, nazwa: 'San', ile_osob: 2, cena: 150},
	{nr_pokoju: 8, nazwa: 'Shi', ile_osob: 2, cena: 150},
	
	{nr_pokoju: 5, nazwa: 'Eins', ile_osob: 3, cena: 220},
	{nr_pokoju: 6, nazwa: 'Zwei', ile_osob: 3, cena: 220},
	{nr_pokoju: 7, nazwa: 'Drei', ile_osob: 3, cena: 220},
	{nr_pokoju: 8, nazwa: 'Vier', ile_osob: 3, cena: 220},
	
	{nr_pokoju: 9, nazwa: 'Un', ile_osob: 4, cena: 300},
	{nr_pokoju: 10, nazwa: 'Du', ile_osob: 4, cena: 300},
	{nr_pokoju: 11, nazwa: 'Trois', ile_osob: 4, cena: 300},
	{nr_pokoju: 12, nazwa: 'Quatre', ile_osob: 4, cena: 300}
];

dbo.collection("pokoje").insertMany(pokoje, function(err, res) {  
	if (err) throw err;
	console.log("Pokoje");
	db.close();
}); 

var pracownicy = [ 
	{nazwisko: 'Kowalski', imie: 'Jan', nr_tel: 500600700, email: 'kowalski.jan@gmail.com' },
	{nazwisko: 'Nowak', imie: 'Anna', nr_tel: 600700800, email: 'nowak.anna@gmail.com' },
	{nazwisko: 'Sawicki', imie: 'Tomasz', nr_tel: 700800900, email: 'sawicki.tomasz@gmail.com' },
	{nazwisko: 'Zawisza', imie: 'Krystyna', nr_tel: 800900100, email: 'zawisza.krystyna@gmail.com' },
	{nazwisko: 'Olszewski', imie: 'Damian', nr_tel: 900100200, email: 'olszewski.damian@gmail.com' }
];

dbo.collection("pracownicy").insertMany(pracownicy, function(err, res) {  
	if (err) throw err;
	console.log("Pracownicy");
	db.close();
}); 

var klienci = [ 
	{nazwisko: 'Wisniewska', imie: 'Aldona', nr_tel: 100200300, email: 'wisniewska.aldona@gmail.com' },
	{nazwisko: 'Kaminski', imie: 'Bartosz', nr_tel: 200300400, email: 'kamiskiB@onet.pl' },
	{nazwisko: 'Zielinska', imie: 'Martyna', nr_tel: 700800900, email: 'martyna999@o2.pl' },
	{nazwisko: 'Szymanski', imie: 'Kacper', nr_tel: 800900100, email: 'kacper1234@vp.pl' },
	{nazwisko: 'Wozniak', imie: 'Piotr', nr_tel: 900100200, email: 'wozniak.piotr@wp.pl' }
];

dbo.collection("klienci").insertMany(klienci, function(err, res) {  
	if (err) throw err;
	console.log("Klienci");
	db.close();
});  

});