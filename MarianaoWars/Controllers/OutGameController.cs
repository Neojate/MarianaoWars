using MarianaoWars.Models;
using MarianaoWars.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MarianaoWars.Controllers
{

    [ApiController]
    [Route("/institutes")]
    public class OutGameController
    {
        private readonly IServiceInitGame context;

        public OutGameController(IServiceInitGame context, IServiceResource game)
        {
            this.context = context;
            var x = game.GetComputer(13);
            var y = context.GetResource();
         }

        // Petición que obtiene la lista de todos los institutos abiertos.
        [HttpGet("openinstitutes")]
        public IEnumerable<Institute> GetInstitutes()
        {
            return context.GetOpenInstitutes();
        }

        // Petición que devuelve si un usuario está matriculado en un instituto en concreto.
        [HttpGet("hasenrollment")]
        public bool HasEnrollment(string userId, int instituteId)
        {
            return context.HasEnrollment(userId, instituteId);
        }

        // Petición que matricula a un usuario en un instituto en concreto.
        [HttpGet("createenrollment")]
        public void ToInstitute(string userId, int instituteId)
        {
            context.CreateEnrollment(userId, instituteId);
        }
    }

}
