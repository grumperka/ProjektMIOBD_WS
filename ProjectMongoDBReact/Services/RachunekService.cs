using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using ProjectMongoDBReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectMongoDBReact.Services
{
    public class RachunekService
    {
        private readonly IMongoCollection<Rachunek> _rachunek;
        private readonly IMongoCollection<Rezerwacja> _rezerwacja;

        public RachunekService(IMongoDBDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _rachunek = database.GetCollection<Rachunek>(settings.RachunekCollectionName);
            _rezerwacja = database.GetCollection<Rezerwacja>(settings.RezerwacjaCollectionName);
        }

        [HttpGet]
        public IEnumerable<Rachunek> Get()
        {
            var connectionString = "mongodb://localhost";
            var client = new MongoClient(connectionString);

            var db = client.GetDatabase("bazaDanych");
            var collection = db.GetCollection<Rachunek>("rachunki").Find(new BsonDocument()).ToList();

            return collection.Select(s => new Rachunek
            {
                Id = s.Id,
                id_rezerwacji = s.id_rezerwacji,
                koniec = s.koniec,
                koszt = s.koszt,
                czyUregulowany = s.czyUregulowany,
                dataUregulowania = s.dataUregulowania
            }).ToArray();
        }

        public Rachunek PayBill(string id, DateTime dateTime)
        {
            Rezerwacja found = _rezerwacja.Find<Rezerwacja>(p => p.Id == id).FirstOrDefault();

            if (found == null)
            { return null; }

           Rachunek rachunek = _rachunek.Find<Rachunek>(f => f.id_rezerwacji == id && f.czyUregulowany == false).FirstOrDefault();

            if (rachunek == null) {
                _rachunek.InsertOne(new Rachunek { id_rezerwacji = found.Id, koniec = found.koniec, koszt = found.koszt, czyUregulowany = true, dataUregulowania = dateTime }
                 );
                
                rachunek = _rachunek.Find<Rachunek>(f => f.id_rezerwacji == id).FirstOrDefault();
            }

            found.czyOplacona = true;

            _rezerwacja.ReplaceOne(p => p.Id == id, found);

            return rachunek;
        }
    }
}
