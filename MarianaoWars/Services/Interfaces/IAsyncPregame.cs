using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Interfaces
{
    public interface IAsyncPregame
    {
        List<Enrollment> GetEnrollments(int instituteId);

        List<Computer> GetComputers(int enrollmentId);

    }
}
