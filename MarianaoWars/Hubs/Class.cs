using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Threading;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessege(string user, string message)
        {
            await Clients.All.SendAsync("SendMessege", user, message);

        }
        public async Task InitCount(string user, string message)
        {   
            while (true)
    
            {
                for (int i = 0; i < 500; i++)
                {
                    await Clients.Caller.SendAsync("nombreMetodoRecibido", user, i);
                    
                }
                Thread.Sleep(1000);

            }


        }

    }
}
