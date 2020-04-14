using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Interfaces
{
    public interface IServiceInitGame
    {
        Enrollment CreateEnrollment(string userId, int instituteId);

        IEnumerable<Institute> GetOpenInstitutes();

        Enrollment GetEnrollment(string userId, int instituteId);

        IEnumerable<Enrollment> GetEnrollments(int instituteId);

        bool HasEnrollment(string userId, int instituteId);

        SystemResource GetResource();
    }
}
