using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectMongoDBReact.Models
{
    public class Rachunek
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string id_rezerwacji { get; set; }

        public DateTime koniec { get; set; }

        public float koszt { get; set; }

        public bool czyUregulowany { get; set; }

        public DateTime dataUregulowania { get; set; }
    }
}
