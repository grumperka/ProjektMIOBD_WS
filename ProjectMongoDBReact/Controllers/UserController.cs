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
    public class UserController : ControllerBase
    {
        private readonly KlientService _klientService;
        private readonly PracownikService _pracownikService;

        public UserController(KlientService klientService, PracownikService pracownikService)
        {
            _klientService = klientService;
            _pracownikService = pracownikService;
        }

        [HttpGet(Name = "GetKlient")]
        [Route("GetKlient/{name}/{phrase}")]
        public IEnumerable<Klient> GetKlienci(string name, string phrase)
        {
            var p = _klientService.Get(name, phrase);

            if (p == null)
            {
                return null;
            }

            return p;
        }

        [HttpGet(Name = "GetPracownik")]
        [Route("GetPracownik/{name}/{phrase}")]
        public IEnumerable<Pracownik> GetPracownicy(string name, string phrase)
        {
            var p = _pracownikService.Get(name, phrase);

            if (p == null)
            {
                return null;
            }

            return p;
        }

        [HttpGet(Name = "GetUser")]
        [Route("GetUser/{name}")]
        public object GetUser(string name)
        {
            var p = _pracownikService.GetUser(name);

            if (p == null)
            {
                var k = _klientService.GetUser(name);

                if (k == null)
                {
                    return null;
                }

                return k;
            }

            return p;
        }

        [HttpPut("{id:length(24)}")]
        [Route("Edit/{id}")]
        public IActionResult Edit(string id, Klient klient)
        {
            var p = _pracownikService.GetUser(klient.email);

            if (p == null)
            {
                var k = _klientService.GetUser(klient.email);

                if (k == null) {
                    return null;
                }

                _klientService.Edit(id, klient);
            }

            _pracownikService.Edit(id, new Pracownik { Id = klient.Id, imie = klient.imie, nazwisko = klient.nazwisko, nr_tel = klient.nr_tel, email = klient.email});

            return NoContent();
        }
    }
}
