using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Interfaces
{
    public interface IServiceInstitute
    {
        // Método que busca los institutos cuya fecha de expiración ha sucumbido y los cierra.
        void CloseServers();

        // Método que matricula un usuario en un instituto. Devuelve true en caso de hacerlo, false si ya está matriculado.
        bool EnrollmentUser(string userId, int instituteId);

        // Método que devuelve una matrícula en función de su id.
        Enrollment GetEnrollment(int enrollmentId);

        // Método que devuelve una matrícula en función del usuario y un instituto.
        Enrollment GetEnrollment(string userId, int instituteId);

        // Método que devuelve la lista de todos las matrículas de un insituto.
        IEnumerable<Enrollment> GetEnrollmentsFromInstitute(int instituteId);

        // Método que devuelve un Instituto en función de su id.
        Institute GetInstitute(int instituteId);

        // Método que devuelve la lista de todos los Institutos.
        IEnumerable<Institute> GetInstitutes();

        // Método que devuelve el número de matrículas que tiene un insituto.
        int GetNumberEnrollments(int instituteId);

        // Método que devuelve la lista de todos los Institutos abiertos.
        IEnumerable<Institute> GetOpenInstitutes();

        // Método que devuelve un User en función de su id.
        ApplicationUser GetUser(string userId);

        // Método que devuelve la lista de todos los Usuarios.
        IEnumerable<ApplicationUser> GetUsers();

        // Método que devuelve si un usuario tiene  matrícula en un instituto determinado.
        bool HasEnrollment(string userId, int instituteId);

        // Método que modifica el rango de un usuario (se debería hacer auto, es decir, que el recorra todos los usuarios)
        void UpdateRank(ApplicationUser user, Institute institute);


    }
}
