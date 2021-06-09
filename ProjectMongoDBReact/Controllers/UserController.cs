using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectMongoDBReact.Models;
using ProjectMongoDBReact.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectMongoDBReact.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly KlientService _klientService;
        private readonly PracownikService _pracownikService;

        public UserController(KlientService klientService, PracownikService pracownikService)
        {
            _klientService = klientService;
            _pracownikService = pracownikService;
        }

        [HttpGet(Name = "GetKlient")]
        [Route("GetKlient/{name}")]
        public IEnumerable<Klient> GetKlienci(string name)
        {
            var p = _klientService.Get(name);

            if (p == null)
            {
                return null;
            }

            return p;
        }

        [HttpGet(Name = "GetPracownik")]
        [Route("GetPracownik/{name}")]
        public IEnumerable<Pracownik> GetPracownicy(string name)
        {
            var p = _pracownikService.Get(name);

            if (p == null)
            {
                return null;
            }

            return p;
        }
    }
}
