using MarianaoWars.Models;
using MarianaoWars.Services.Interfaces;
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
        private IAsyncLogic context;

        public IntranetController(IAsyncLogic context)
        {
            this.context = context;
        }

        [HttpGet("/ordinadors")]
        public IEnumerable<Computer> GetUniverse(int instituteId, string broadcast)
        {
            return context.GetComputersBySector(instituteId, broadcast);
        }

    }
}
