using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Threading;
using MarianaoWars.Services.Interfaces;
using MarianaoWars.Models;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        private IServiceResource resource;
        private IServiceInitGame preGame;

        public ChatHub(IServiceInitGame preGame, IServiceResource resource)
        {
            this.preGame = preGame;
            this.resource = resource;
        }

        public async Task SendMessege(string user, string message)
        {
            await Clients.All.SendAsync("SendMessege", user, message);

        }
        public async Task InitCount(string user, string message)
        {   
            //while (true)
    
            //{
                for (int i = 0; i < 10; i++)
                {
                    await Clients.Caller.SendAsync("nombreMetodoRecibido", user, i);
                }
                Thread.Sleep(1000);

            //}


        }

        public async Task UpdateResources(int instituteId)
        {
            SystemResource systemResource = preGame.GetResource();
            while (true)
            {
                IEnumerable<Enrollment> enrollments = preGame.GetEnrollments(instituteId);
                foreach (Enrollment enrollment in enrollments)
                {
                    IEnumerable<Computer> computers = resource.GetComputers(enrollment.Id);
                    foreach (Computer computer in computers)
                    {
                        //enviar respuesta con este resultado -> resource.UpdateResources(computer, systemResource);
                    }
                }
                Thread.Sleep(1000);
            }
            
        }

    }
}
