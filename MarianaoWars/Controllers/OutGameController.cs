using MarianaoWars.Models;
using MarianaoWars.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MarianaoWars.Controllers
{

    [ApiController]
    [Route("/instituts")]
    public class OutGameController
    {
        private readonly IServiceInstitute context;

        public OutGameController(IServiceInstitute context)
        {
            this.context = context;
        }

        [HttpGet("openinstitutes")]
        public IEnumerable<Institute> GetInstitutes()
        {
            return context.GetOpenInstitutes();
        }

        [HttpGet("toinstitute")]
        public void ToInstitute(int instituteId)
        {            
            Institute institute = context.GetInstitute(instituteId);
        }
    }

}
