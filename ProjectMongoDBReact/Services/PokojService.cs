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
        private readonly IMongoCollection<Pracownik> _pracownik;
        private readonly IMongoCollection<Rezerwacja> _rezerwacja;

        public PokojService(IMongoDBDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _pokoj = database.GetCollection<Pokoj>(settings.PokojCollectionName);
            _pracownik = database.GetCollection<Pracownik>(settings.PracownikCollectionName);
            _rezerwacja = database.GetCollection<Rezerwacja>(settings.RezerwacjaCollectionName);
        }

        public IEnumerable<Pokoj> GetPokoje()
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



        public IEnumerable<Pokoj> getVacancy(DateTime startDate, DateTime endDate)
        {
            String diff = (endDate - startDate).TotalDays.ToString();
            int ileDni = Int32.Parse(diff);

            if (ileDni > 0) {

                List<Rezerwacja> rezerwacje = _rezerwacja.Find<Rezerwacja>(f => f.czyAnulowana == false).ToList();
                List<string> zajete = new List<string>();

                foreach (Rezerwacja r in rezerwacje) {
                    bool czyZajetyPokoj = czyZajety(r.id_pokoju, startDate, endDate);

                    if (czyZajetyPokoj == true && zajete.Where(w => w == r.id_pokoju).Any() == false) {
                        zajete.Add(r.id_pokoju);
                    }
                }

                var pokojeW = _pokoj.Find<Pokoj>(f => !zajete.Contains(f.Id)).ToList();

                return pokojeW.Select(s => new Pokoj
                {
                    Id = s.Id,
                    nr_pokoju = s.nr_pokoju,
                    nazwa = s.nazwa,
                    ile_osob = s.ile_osob,
                    cena = s.cena
                }).ToArray();
            }
            else 
                return null;
        }



        public bool czyZajety(string id, DateTime begin, DateTime end)
        {
            var result0 = _rezerwacja.Find<Rezerwacja>(f => f.id_pokoju == id &&
            f.czyAnulowana == false &&
            ((begin >= f.poczatek && begin <= f.koniec) ||
            (end >= f.poczatek && end <= f.koniec))).Any();

            var result1 = _rezerwacja.Find<Rezerwacja>(f => f.id_pokoju == id &&
            f.czyAnulowana == false &&
            begin < f.poczatek &&
            end >= f.koniec).Any();

            if (result0 == false && result1 == false) { return false; }
            else
                return true;
        }

        public Pokoj Create(Pokoj p, string userName)
        {
            var pr = _pracownik.Find<Pracownik>(f => f.email == userName).FirstOrDefault();

            if (pr != null)
            {
                _pokoj.InsertOne(new Pokoj { nr_pokoju = p.nr_pokoju, cena = p.cena, ile_osob = p.ile_osob, nazwa = p.nazwa });

                return p;
            }
            return null;
        }



        public Pokoj Update(string id, Pokoj pokojIn, string userName) {

            var p = _pracownik.Find<Pracownik>(f => f.email == userName).FirstOrDefault();

            if (p == null)
            {
                return null;
            }

            _pokoj.ReplaceOne(p => p.Id == id, pokojIn);

            return pokojIn;
        }
            

        public void Remove(Pokoj pokojIn) =>
            _pokoj.DeleteOne(p => p.Id == pokojIn.Id);

        public void Remove(string id, string userName) {
            var p = _pracownik.Find<Pracownik>(f => f.email == userName).FirstOrDefault();

            if (p != null)
            {
                _pokoj.DeleteOne(p => p.Id == id);
            }
        }
            
    }
}

