using MarianaoWars.Models;
using MarianaoWars.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Controllers
{
    [ApiController]
    [Route("/message")]
    public class MessageController
    {
        private IAsyncLogic context;

        public MessageController(IAsyncLogic context)
        {
            this.context = context;
        }

        [HttpGet("getmessages")]
        public IEnumerable<Message> GetMessages(int enrollmentId)
        {
            return context.GetMessages(enrollmentId);
        }

    }
}
