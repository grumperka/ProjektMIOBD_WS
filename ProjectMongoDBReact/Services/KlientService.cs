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
    public class KlientService
    {
        private readonly IMongoCollection<Klient> _klient;
        private readonly IMongoCollection<Pracownik> _pracownik;

        public KlientService(IMongoDBDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _klient = database.GetCollection<Klient>(settings.KlientCollectionName);
            _pracownik = database.GetCollection<Pracownik>(settings.PracownikCollectionName);
        }

        [HttpGet]
        public IEnumerable<Klient> Get(string name)
        {
            Pracownik pracownik = _pracownik.Find<Pracownik>(f => f.email == name).FirstOrDefault();

            if (pracownik == null)
            {
                return null;
            }
            else
            {
                var connectionString = "mongodb://localhost";
            var client = new MongoClient(connectionString);

            var db = client.GetDatabase("bazaDanych");
            var collection = db.GetCollection<Klient>("klienci").Find(new BsonDocument()).ToList();

            return collection.Select(s => new Klient
            {
                Id = s.Id,
                nazwisko = s.nazwisko,
                imie = s.imie,
                nr_tel = s.nr_tel,
                email = s.email
            }).ToArray();

            }
        }

        [HttpGet]
        public Klient GetUser(string name)
        {
                var connectionString = "mongodb://localhost";
                var client = new MongoClient(connectionString);

                var db = client.GetDatabase("bazaDanych");
                var collection = db.GetCollection<Klient>("klienci").Find(new BsonDocument()).ToList();

                return collection.Where(w => w.email == name).FirstOrDefault();

        }

        public void Edit(string id, Klient klient)
        {
            _klient.ReplaceOne(p => p.Id == id, klient);
        }
    }
}
