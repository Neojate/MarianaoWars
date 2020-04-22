using MarianaoWars.Models;
using MarianaoWars.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text.Json;
using Newtonsoft.Json;
using System.Threading;

namespace MarianaoWars.Controllers
{

    [ApiController]
    [Route("/institutes")]
    public class OutGameController : ControllerBase
    {
        private readonly IServiceInitGame contextx;
        private readonly IAsyncPregame context;

        public OutGameController(IAsyncPregame context, IAsyncLogic game)
        {
            this.context = context;
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

        
        [HttpPost("enrollmentcomputer")]
        public string EnrollmentComputerPost([FromBody] JsonElement body)
        {
            Dictionary<string, string> json = JsonConvert.DeserializeObject<Dictionary<string, string>>(body.ToString());

            string userId = json["userId"];
            string instituteId = json["instituteId"];

            Enrollment enrollment = context.GetEnrollment(userId, Int32.Parse(instituteId));

            List < Computer > computers = context.GetComputers(enrollment.Id);

            string output = JsonConvert.SerializeObject(computers, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            return output;
        }

    }

}
