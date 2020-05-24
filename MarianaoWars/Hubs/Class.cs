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

        public async Task InitUpdate(string user, int computerId)
        {

            //computers
            Computer computer = game.GetComputer(computerId);

            string output = JsonConvert.SerializeObject(computer, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            await Clients.Caller.SendAsync("updateResources", output);


            //builds
            List<BuildOrder> buildOrders = postGame.GetBuildOrders(computerId);

            string builds = JsonConvert.SerializeObject(buildOrders, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            await Clients.Caller.SendAsync("buildOrders", builds);

            //hacksOrders
            List<HackOrder> hackOrders = postGame.GetHackOrders(computerId);

            string hacks = JsonConvert.SerializeObject(hackOrders, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            await Clients.Caller.SendAsync("hackOrders", hacks);

        }

        public async Task BuildOrdersList(string user, int computerId)
        {

            List<BuildOrder> buildOrders = postGame.GetBuildOrders(computerId);

            string output = JsonConvert.SerializeObject(buildOrders, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            await Clients.Caller.SendAsync("buildOrders", output);

        }

        
        public async Task NotReadMessages(int instituteId, string user, int computerId)
        {

            //mensajes
            List<Message> messages = postGame.IsNotReadMesages(computerId);

            string messagesNotRead = JsonConvert.SerializeObject(messages, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            await Clients.Caller.SendAsync("notReadMessagesResponse", messagesNotRead);


            //computers
            List<Computer> computers = game.GetComputers(game.GetEnrollment(user, instituteId).Id);

            string computersString = JsonConvert.SerializeObject(computers, new JsonSerializerSettings()
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                Formatting = Formatting.Indented
            });

            await Clients.Caller.SendAsync("computers", computersString);



        }

    }
}
