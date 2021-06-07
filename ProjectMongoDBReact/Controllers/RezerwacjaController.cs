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

        [HttpPost]
        public ActionResult<Rezerwacja> Create(Rezerwacja r)
        {
            _rezerwacjaService.Create(r);

            return NoContent();
            //CreatedAtRoute("GetPokoj", new { id = p.Id.ToString() }, p);
        }
    }
}
