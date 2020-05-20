using MarianaoWars.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using Newtonsoft.Json;
using MarianaoWars.Models;



namespace MarianaoWars.Controllers
{
    [ApiController]
    [Route("/game")]
    public class GameController
    {
        private IAsyncLogic context;

        public GameController(IAsyncLogic context)
        {
            this.context = context;
        }

        [HttpGet("createbuildorder")]
        public void CreateBuildOrder(int instituteId, int computerId, int buildId)
        {
            context.CreateBuildOrder(instituteId, computerId, buildId);
        }

        [HttpGet("getinstitute")]
        public string GetInstitute(int instituteId)
        {
            Institute institute = context.GetInstitute(instituteId);
            string output = JsonConvert.SerializeObject(institute, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            return output;

        }

        [HttpPost("updatecomputername")]
        public string UpdateComputerName([FromBody] JsonElement body)
        {

            Dictionary<string, string> json = JsonConvert.DeserializeObject<Dictionary<string, string>>(body.ToString());
            string computerId = json["computerId"];
            string computerName = json["computerName"];

            Computer computer = context.UpdateComputer(Int32.Parse(computerId), computerName);

            string output = JsonConvert.SerializeObject(computer, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            return output;
        }


        [HttpGet("iphascomputer")]
        public bool CheckIpHasComputer(int instituteId, string ip)
        {
            return context.CheckIpHasComputer(instituteId, ip);
        }
    }
}
