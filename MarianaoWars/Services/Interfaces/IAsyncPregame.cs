using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Interfaces
{
    public interface IAsyncPregame
    {
        // Método que crea una matrícula de un jugador en un instituto.
        Enrollment CreateEnrollment(string userId, int instituteId);

        // Método que devuelve la lista de todos los ordenadores de una matrícula.
        List<Computer> GetComputers(int enrollmentId);

        // Método que devuelve la matrícula de un instituto y un usuario.
        Enrollment GetEnrollment(string userid, int instituteId);

        // Método que devuelve la lista de todas las matrículas de un instituto.
        List<Enrollment> GetEnrollments(int instituteId);

        // Método que devuelve todos los institutos abiertos.
        List<Institute> GetOpenInstitutes();

        // Método que dice si un jugador tiene matrícula en un instituto concreto.
        bool HasEnrollment(string userId, int instituteId);

        

    }
}
