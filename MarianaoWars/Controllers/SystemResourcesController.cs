using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarianaoWars.Data;
using Microsoft.AspNetCore.Mvc;
using MarianaoWars.Services.Interfaces;
using MarianaoWars.Models;

namespace MarianaoWars.Controllers
{
    [ApiController]
    [Route("/game")]
    public class SystemResourcesController : ControllerBase
    {
        private readonly IServiceInitGame context;

        public SystemResourcesController(IServiceInitGame context)
        {
            this.context = context;
        }

        [HttpGet("getSytemResource")]
        public IEnumerable<SystemResource> GetSystemResource()
        {
            return context.GetResource();   
        }


    }
}
