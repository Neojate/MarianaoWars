using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Repositories.Interfaces
{
    public interface IRepositoryInstitute
    {/*
        // Método que devuelve un instituto en función de su ID
        Institute GetInstitute(int instituteId);

        // Método que devuelve la lista de institutos
        IEnumerable<Institute> GetInstitutes();

        // Método que devuelve la lista de los institutos abiertos.
        IEnumerable<Institute> GetOpenInstitutes();

        // Método que updatea un instituto
        void UpdateInstitute(Institute updatedInstitute);*/

        Task<List<Institute>> GetOpenInstitutes();

        Task<List<Computer>> GetComputers(int enrollmentId);

        Task<Enrollment> GetEnrollment(string userId, int instituteId);

        Task<List<Enrollment>> GetEnrollments(int instituteId);

        Task SaveEnrollment(Enrollment enrollment);



    }
}
