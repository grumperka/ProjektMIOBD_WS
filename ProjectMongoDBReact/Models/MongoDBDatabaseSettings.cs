using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectMongoDBReact.Models
{
    public class MongoDBDatabaseSettings : IMongoDBDatabaseSettings
    {
        public string PokojCollectionName { get; set; }
        public string RezerwacjaCollectionName { get; set; }
        public string KlientCollectionName { get; set; }
        public string PracownikCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IMongoDBDatabaseSettings
    {
        string PokojCollectionName { get; set; }
        string RezerwacjaCollectionName { get; set; }
        string KlientCollectionName { get; set; }
        string PracownikCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
