using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectMongoDBReact.Models
{
    public class Rezerwacja
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string id_pokoju { get; set; }

        public string id_klienta { get; set; }

        public string id_rezerwujacego { get; set; }

        public DateTime poczatek { get; set; }

        public DateTime koniec { get; set; }

        public float koszt { get; set; }

        public bool czyEdytowana { get; set; }

        public DateTime dataEdycji { get; set; }

        public bool czyAnulowana { get; set; }
    }
}
