using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Threading;
using MarianaoWars.Services.Interfaces;
using MarianaoWars.Models;
using Newtonsoft.Json;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        private IAsyncPregame game;
        private IServiceInitGame preGame;
        private IAsyncPostgame postGame;

        public ChatHub(IServiceInitGame preGame, IAsyncPregame game, IAsyncPostgame postGame)
        {
            this.preGame = preGame;
            this.game = game;
            this.postGame = postGame;
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

        public async Task UpdateResources(string userId, string instituteIdStr)
        {
            int instituteId = Int32.Parse(instituteIdStr);
            //List<SystemResource> systemResource = preGame.GetResource().ToList();
            while (true)
            {
               
                IEnumerable<Enrollment> enrollments = game.GetEnrollments(instituteId);

                //await Clients.Caller.SendAsync("nombreMetodoRecibido", enrollments);
                
                foreach (Enrollment enrollment in enrollments)
                {
                    IEnumerable<Computer> computers = game.GetComputers(enrollment.Id);
                    foreach (Computer computer in computers)
                    {
                        try
                        {
                            string output = JsonConvert.SerializeObject(computer, new JsonSerializerSettings()
                            {
                                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                                Formatting = Formatting.Indented
                            });

                            await Clients.Caller.SendAsync("nombreMetodoRecibido", output);
                        }
                        catch(Exception e)
                        {
                            await Clients.Caller.SendAsync("nombreMetodoRecibido", e.ToString());
                        }
                        
                    }
                    
                }
                
                //postGame.CreateEnrollment();
                Thread.Sleep(5000);
            }
            
        }

    }
}
