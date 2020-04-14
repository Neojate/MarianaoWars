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
    [Route("[controller]")]
    public class SystemResourcesController : ControllerBase
    {
        private readonly IServiceInitGame context;

        public SystemResourcesController(IServiceInitGame context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<SystemResource> Get()
        {
            return context.GetResource();   
        }
    }
}
