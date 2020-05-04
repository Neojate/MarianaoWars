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
        private IAsyncLogic postGame;

        public ChatHub(IAsyncPregame game, IAsyncLogic postGame)
        {
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

        public async Task InitUpdate(string user, int computerId)
        {

            Computer computer = game.GetComputer(computerId);

            string output = JsonConvert.SerializeObject(computer, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            await Clients.Caller.SendAsync("updateResources", output);
            
        }

        public async Task BuildOrders(string user, int computerId)
        {

            Computer computer = game.GetComputer(computerId);

            string output = JsonConvert.SerializeObject(computer, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            await Clients.Caller.SendAsync("updateResources", output);

        }

    }
}
