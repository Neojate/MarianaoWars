using MarianaoWars.Models;
using MarianaoWars.Services.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MarianaoWars.Controllers
{
    public class ServerLogic
    {
        private const int TIME_BBDD = 300000;

        private int millisecondsToSave = 0;

        private AsyncServicePregame pregame;

        public ServerLogic(AsyncServicePregame pregame)
        {
            

            while(true)
            {
                foreach (Institute institute in pregame.GetOpenInstitutes())
                {

                }

                millisecondsToSave++;
                Thread.Sleep(1000);

                if (millisecondsToSave > TIME_BBDD)
                {
                    millisecondsToSave = 0;

                    //TODO: hacer los saves
                }
            }
        }
    }
}
