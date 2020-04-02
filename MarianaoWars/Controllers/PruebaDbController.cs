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
    [Route("/caca")]
    public class PruebaDbController : ControllerBase
    {

        private readonly IServiceInstitute context;

        public PruebaDbController(IServiceInstitute context)
        {
            this.context = context;
            //context.CloseServers();
            //User user = context.GetUsers().ToList()[0];
            //Institute institute = context.GetInstitutes().ToList()[0];
            //context.EnrollmentUser(user, institute);
            //var x = context.GetEnrollment(4).Institute;
            //var enrollments = context.GetEnrollments(1);
        }        

        [HttpGet]
        [ActionName("usuaris")]
        public IEnumerable<User> GetUsers()
        {
            return context.GetUsers();
        }

        [HttpGet("institutes")]
        public IEnumerable<Institute> GetInstitutes()
        {
            return context.GetInstitutes();
        }

    }
}
