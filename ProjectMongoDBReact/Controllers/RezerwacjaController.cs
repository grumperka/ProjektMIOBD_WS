using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectMongoDBReact.Models;
using ProjectMongoDBReact.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace ProjectMongoDBReact.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class RezerwacjaController : ControllerBase
    {
        private readonly RezerwacjaService _rezerwacjaService;

        public RezerwacjaController(RezerwacjaService rezerwacjaService)
        {
            _rezerwacjaService = rezerwacjaService;
        }

        [HttpGet(Name = "GetRezerwacje")]
        [Route("GetRezerwacje/{name}")]
        public IEnumerable<Rezerwacja> Get(string name)
        {
            var p = _rezerwacjaService.GetRezerwacje(name);

            if (p == null)
            {
                return null;
            }

            return p;
        }

        [HttpPost]
        public ActionResult<Rezerwacja> Create(Rezerwacja r)
        {
            _rezerwacjaService.Create(r);

            return NoContent();
            //CreatedAtRoute("GetPokoj", new { id = p.Id.ToString() }, p);
        }

        [HttpPut("{id:length(24)}")]
        [Route("Cancel/{id}")]
        public IActionResult Cancel(string id)
        {
            var p = _rezerwacjaService.Get(id);

            if (p == null)
            {
                return NotFound();
            }

            _rezerwacjaService.Cancel(id);

            return NoContent();
        }

        [HttpPut("{id:length(24)}")]
        [Route("Edit/{id}")]
        public IActionResult Edit(string id, Rezerwacja rezerwacja)
        {
            var p = _rezerwacjaService.Get(id);

            if (p == null)
            {
                return NotFound();
            }

            _rezerwacjaService.Edit(id, rezerwacja);

            return NoContent();
        }
    }
}
