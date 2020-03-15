using MarianaoWars.Data;
using MarianaoWars.Models;
using MarianaoWars.Repositories.Implementations;
using MarianaoWars.Repositories.Interfaces;
using MarianaoWars.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Controllers
{

    [ApiController]
    [Route("[Controller]")]
    public class PruebaDbController : ControllerBase
    {

        private readonly IServiceInstitute serviceInstitute;

        public PruebaDbController(IServiceInstitute context)
        {
            context.CloseServers();
            List<User> users = context.GetUsers().ToList();
        }

        public string Get()
        {
            return "asda";
        }
    }
}
