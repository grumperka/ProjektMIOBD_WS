using MongoDB.Driver;
using ProjectMongoDBReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectMongoDBReact.Services
{
    public class RezerwacjaService
    {
        private readonly IMongoCollection<Rezerwacja> _rezerwacja;

        public RezerwacjaService(IMongoDBDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _rezerwacja = database.GetCollection<Rezerwacja>(settings.PokojCollectionName);
        }

        public Rezerwacja Create(Rezerwacja r)
        {
            _rezerwacja.InsertOne(r);
            return r;
        }
    }
}
