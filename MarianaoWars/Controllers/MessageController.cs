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

        [HttpGet("messages")]
        public IEnumerable<Message> GetMessages(int instituteId, string userId, int pageIndex)
        {
            return context.GetMessages(instituteId, userId, pageIndex);
        }

        [HttpGet("message")]
        public Message GetMessage(int messageId)
        {
            return context.GetMessage(messageId);
        } 

        [HttpGet("messagereaded")]
        public void UpdateMessage(int messageId)
        {
            context.ReadMessage(messageId);
        }

    }
}
