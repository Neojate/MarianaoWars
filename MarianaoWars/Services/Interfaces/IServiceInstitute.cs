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
        void CloseServers();

        // Método que matricula un usuario en un servidor
        void EnrollmentUser(User user, Institute institute);

        // Método que devuelve una matrícula en función de su id.
        Enrollment GetEnrollment(int enrollmentId);

        // Método que devuelve la lista de todos las matrículas de un servidor.
        IEnumerable<Enrollment> GetEnrollments(int instituteId);

        // Método que devuelve un Instituto en función de su id.
        Institute GetInstitute(int instituteId);

        // Método que devuelve la lista de todos los Institutos.
        IEnumerable<Institute> GetInstitutes();

        // Método que devuelve el número de matrículas que tiene un servidor.
        int GetNumberEnrollments(int instituteId);

        // Método que devuelve la lista de todos los Institutos abiertos.
        IEnumerable<Institute> GetOpenInstitutes();

        // Método que devuelve un User en función de su id.
        User GetUser(int userId);

        // Método que devuelve un User en función de su email.
        User GetUser(string userEmail);

        // Método que devuelve la lista de todos los Usuarios.
        IEnumerable<User> GetUsers();

        // Método que modifica el rango de un usuario (se debería hacer auto, es decir, que el recorra todos los usuarios)
        void UpdateRank(User user, Institute institute);


    }
}
