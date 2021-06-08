﻿using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using ProjectMongoDBReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectMongoDBReact.Services
{
    public class PracownikService
    {
        private readonly IMongoCollection<Pracownik> _pracownik;

        public PracownikService(IMongoDBDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _pracownik = database.GetCollection<Pracownik>(settings.PracownikCollectionName);
        }

        [HttpGet]
        public IEnumerable<Pracownik> Get()
        {
            var connectionString = "mongodb://localhost";
            var client = new MongoClient(connectionString);

            var db = client.GetDatabase("bazaDanych");
            var collection = db.GetCollection<Pracownik>("pracownicy").Find(new BsonDocument()).ToList();

            return collection.Select(s => new Pracownik
            {
                Id = s.Id,
                nazwisko = s.nazwisko,
                imie = s.imie,
                nr_tel = s.nr_tel,
                email = s.email
            }).ToArray();
        }
    }
}