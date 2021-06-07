using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectMongoDBReact.Models
{
    public class Pracownik
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string nazwisko { get; set; }

        public string imie { get; set; }

        public int nr_tel { get; set; }

        public string email { get; set; }
    }
}
