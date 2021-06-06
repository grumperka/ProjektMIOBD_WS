using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongodbDatabase.Services;
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

            public PokojController(PokojService pokojService)
            {
                _pokojService = pokojService;
            }

            [HttpGet]
            public IEnumerable<Pokoj> Get() =>
                _pokojService.Get();

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

            [HttpPost]
            public ActionResult<Pokoj> Create(Pokoj p)
            {
                _pokojService.Create(p);

                return NoContent();
                //CreatedAtRoute("GetPokoj", new { id = p.Id.ToString() }, p);
            }

            [HttpPut("{id:length(24)}")]
            [Route("Put/{id}")]
            public IActionResult Update(string id, Pokoj pokojIn)
            {
                var p = _pokojService.Get(id);

                if (p == null)
                {
                    return NotFound();
                }

                _pokojService.Update(id, pokojIn);

                return NoContent();
            }

            [HttpDelete("{id:length(24)}")]
            [Route("Delete/{id}")]
            public IActionResult Delete(string id)
            {
                var p = _pokojService.Get(id);

                if (p == null)
                {
                    return NotFound();
                }

                _pokojService.Remove(p.Id);

                return NoContent();
            }
        }
}

