using MongoDB.Bson;
using MongoDB.Driver;
using ProjectMongoDBReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ProjectMongoDBReact.Services
{
    public class RezerwacjaService
    {
        private readonly IMongoCollection<Rezerwacja> _rezerwacja;
        private readonly IMongoCollection<Klient> _klient;
        private readonly IMongoCollection<Pracownik> _pracownik;
        private readonly IMongoCollection<Pokoj> _pokoj;

        public RezerwacjaService(IMongoDBDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _rezerwacja = database.GetCollection<Rezerwacja>(settings.RezerwacjaCollectionName);
            _klient = database.GetCollection<Klient>(settings.KlientCollectionName);
            _pracownik = database.GetCollection<Pracownik>(settings.PracownikCollectionName);
            _pokoj = database.GetCollection<Pokoj>(settings.PokojCollectionName);
        }

        public Rezerwacja Create(Rezerwacja r)
        {
            var klient = _klient.Find<Klient>(f => f.email == r.id_rezerwujacego).FirstOrDefault();

            if (klient == null) {
                _klient.InsertOne(new Klient { email = r.id_rezerwujacego, imie = "Joe/Jane", nazwisko = "Doe", nr_tel = 000000000 });
            }

            klient = _klient.Find<Klient>(f => f.email == r.id_rezerwujacego).FirstOrDefault();

            var pokoj = _pokoj.Find<Pokoj>(f => f.Id == r.id_pokoju).FirstOrDefault();

            if (pokoj == null) { return null; }

            String diff = (r.koniec - r.poczatek).TotalDays.ToString();

            int ileDni = Int32.Parse(diff);

            Rezerwacja nowa = new Rezerwacja { id_klienta = klient.Id, id_rezerwujacego = klient.Id, id_pokoju = r.id_pokoju, poczatek = r.poczatek, koniec = r.koniec, koszt = r.koszt * ileDni, dataEdycji = r.dataEdycji, czyAnulowana = r.czyAnulowana, czyEdytowana = r.czyEdytowana };
            _rezerwacja.InsertOne(nowa);
            return nowa;
        }
    }
}
