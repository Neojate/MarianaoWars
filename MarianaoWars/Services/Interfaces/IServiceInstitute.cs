using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Interfaces
{
    public interface IServiceInstitute
    {
        // Método que busca los servidores cuya fecha de expiración ha sucumbido y los cierra.
        public void CloseServers();

        // Método que devuelve un Instituto en función de su id.
        Institute GetInstitute(int instituteId);

        // Método que devuelve la lista de todos los Institutos.
        IEnumerable<Institute> GetInstitutes();

        // Método que devuelve la lista de todos los Institutos abiertos.
        IEnumerable<Institute> GetOpenInstitutes();

        // Método que devuelve la lista de todos los Usuarios.
        IEnumerable<User> GetUsers();


    }
}
