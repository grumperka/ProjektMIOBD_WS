using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using ProjectMongoDBReact;
using ProjectMongoDBReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongodbDatabase.Services
{
    public class PokojService
    {
        private readonly IMongoCollection<Pokoj> _pokoj;

        public PokojService(IMongoDBDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _pokoj = database.GetCollection<Pokoj>(settings.PokojCollectionName);
        }

        [HttpGet]
        public IEnumerable<Pokoj> Get()
        {
            var connectionString = "mongodb://localhost";
            var client = new MongoClient(connectionString);

            var db = client.GetDatabase("bazaDanych");
            var collection = db.GetCollection<Pokoj>("pokoje").Find(new BsonDocument()).ToList();

            return collection.Select(s => new Pokoj
            {
                Id = s.Id,
                nr_pokoju = s.nr_pokoju,
                nazwa = s.nazwa,
                ile_osob = s.ile_osob,
                cena = s.cena
            }).ToArray();
        }


        public Pokoj Get(string id) =>
            _pokoj.Find<Pokoj>(p => p.Id == id).FirstOrDefault(); 

        public Pokoj Create(Pokoj p)
        {
            _pokoj.InsertOne(new Pokoj { nr_pokoju = p.nr_pokoju, cena = p.cena, ile_osob = p.ile_osob, nazwa = p.nazwa });

            return p;
        }

       

        public void Update(string id, Pokoj pokojIn) =>
            _pokoj.ReplaceOne(p => p.Id == id, pokojIn);

        public void Remove(Pokoj pokojIn) =>
            _pokoj.DeleteOne(p => p.Id == pokojIn.Id);

        public void Remove(string id) =>
            _pokoj.DeleteOne(p => p.Id == id);
    }
}

