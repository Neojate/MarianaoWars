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
    [Route("/gamenav")]
    public class GameNavController
    {

        private IAsyncLogic context;

        public GameNavController(IAsyncLogic context)
        {
            this.context = context;
        }

        [HttpGet("getSytemResource")]
        public IEnumerable<SystemResource> GetSystemResource()
        {
            return context.GetSystemResources();
        }

        [HttpGet("getSystemSoftware")]
        public IEnumerable<SystemSoftware> GetSystemSoftware()
        {
            return context.GetSystemSoftwares();
        }

    }
}
