using MarianaoWars.Models;
using MarianaoWars.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        private IAsyncLogic context;

        public IntranetController(IAsyncLogic context)
        {
            this.context = context;
        }

        [HttpGet("computers")]
        public string GetUniverse(int instituteId, int broadcast)
        {
            List<Computer> computers = context.GetComputersBySector(instituteId, broadcast);
            
            string output = JsonConvert.SerializeObject(computers, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            return output;
        }

    }
}
