using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Controllers
{
    [ApiController]
    [Route("/intranet")]
    public class IntranetController
    {
        [HttpGet("/ordinadors")]
        public string GetUniverse(string ipDirection)
        {
            return null;
        }
    }
}
