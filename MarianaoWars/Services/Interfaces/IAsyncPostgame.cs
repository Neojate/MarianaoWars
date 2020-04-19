using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Interfaces
{
    public interface IAsyncPostgame
    {
        void CreateEnrollment();

        void UpdateResource(Resource resource, List<SystemResource> systemResources);

        List<SystemResource> GetSystemResources();

        List<Computer> GetComputersBySector(int instituteId, int sector);

    }
}
