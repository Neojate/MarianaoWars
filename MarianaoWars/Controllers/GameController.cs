using MarianaoWars.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
    }
}
