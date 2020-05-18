using MarianaoWars.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using SignalRChat.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Implementations
{
    public class DatabaseChangeNotificationService : IDatabaseChangeNotificationService
    {
        private readonly IConfiguration configutation;
        private readonly IHubContext<ChatHub> chatHub;

        public DatabaseChangeNotificationService(IConfiguration config, IHubContext<ChatHub> chat)
        {
            configutation = config;
            chatHub = chat;
        }

        public void Config()
        {
            ChangeEmail();
        }

        private void ChangeEmail()
        {
            string connnectionString = configutation.GetConnectionString("DefaultConnection");
            /*using (var conn = new MySqlConnection(connnectionString))
            {

            }*/
            
        }
    }
}
