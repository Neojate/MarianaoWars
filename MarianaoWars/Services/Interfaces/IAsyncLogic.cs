using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Interfaces
{
    public interface IAsyncLogic
    {
       

        List<SystemResource> GetSystemResources();

        List<Computer> GetComputersBySector(int instituteId, int sector);

        void SaveComputer(Computer computer);

        void UpdateResource(Resource computer);

    }
}
