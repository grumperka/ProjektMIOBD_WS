using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongodbDatabase.Services;
using ProjectMongoDBReact.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectMongoDBReact.Models
{

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PokojController : ControllerBase
        {
            private readonly PokojService _pokojService;
            private readonly PracownikService _pracownikService;

            public PokojController(PokojService pokojService, PracownikService pracownikService)
            {
                _pokojService = pokojService;
                _pracownikService = pracownikService;
            }

            [HttpGet(Name = "GetPokoje")]
            [Route("GetPokoje")]
            public IEnumerable<Pokoj> GetPokoje() =>
                _pokojService.GetPokoje();

            [HttpGet("{id:length(24)}", Name = "GetPokoj")]
            [Route("GetPokoj/{id}")]
            public ActionResult<Pokoj> Get(string id)
            {
                var p = _pokojService.Get(id);

                if (p == null)
                {
                    return NotFound();
                }

                return p;
            }

        [HttpGet(Name = "getVacancy")]
        [Route("getVacancy/{startDate}/{endDate}")]
        public IEnumerable<Pokoj> getVacancy(DateTime startDate, DateTime endDate)
        {
            var p = _pokojService.getVacancy(startDate, endDate);

            if (p == null)
            {
                return null;
            }

            return p;
        }

        [HttpPost]
            [Route("Post/{userName}")]
            public ActionResult<Pokoj> Create(Pokoj p, string userName)
            {
                _pokojService.Create(p, userName);

                return NoContent();
                //CreatedAtRoute("GetPokoj", new { id = p.Id.ToString() }, p);
            }

            [HttpPut("{id:length(24)}")]
            [Route("Put/{id}/{userName}")]
            public IActionResult Update(string id, Pokoj pokojIn, string userName)
            {
                var p = _pokojService.Get(id);

                if (p == null)
                {
                    return NotFound();
                }

                _pokojService.Update(id, pokojIn, userName);

                return NoContent();
            }

            [HttpDelete("{id:length(24)}")]
            [Route("Delete/{id}/{userName}")]
            public IActionResult Delete(string id, string userName)
            {
                var p = _pokojService.Get(id);

                if (p == null)
                {
                    return NotFound();
                }

                _pokojService.Remove(p.Id, userName);

                return NoContent();
            }
        }
}

