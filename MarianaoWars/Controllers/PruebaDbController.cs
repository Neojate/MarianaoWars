using MarianaoWars.Data;
using MarianaoWars.Models;
using MarianaoWars.Repositories.Implementations;
using MarianaoWars.Repositories.Interfaces;
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
        IInstitutoRepository institutoRepo = new InstitutoImp();

        public PruebaDbController()
        {
            Instituto instituto = new Instituto(
                "Marianao",
                "Primer servidor de prueba",
                DateTime.Now,
                DateTime.Now,
                1,
                1,
                1,
                DateTime.Now);

            institutoRepo.CreateInstituto(instituto);
        }

        public string Get()
        {
            return "hola";
        }
    }
}
