using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Interfaces
{
    public interface IServiceResource
    {
        // Método que devuelve la lista de todos los ordenadores de una matrícula.
        IEnumerable<Computer> GetComputers(int enrollmentId);

        // Método que devuelve un ordenador en función de su id.
        Computer GetComputer(int computerId);

        void UpdateResources(Computer computerToUpdate, List<SystemResource> systemResources);

    }
}
