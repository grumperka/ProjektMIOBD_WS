using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectMongoDBReact
{
    public class Pokoj
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int nr_pokoju { get; set; }

        public string nazwa { get; set; }

        public int ile_osob { get; set; }

        public int cena { get; set; }
    }
}
