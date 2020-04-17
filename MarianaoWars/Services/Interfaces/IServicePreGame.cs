using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Interfaces
{
    interface IServicePreGame
    {
        Task<Enrollment> CreateEnrollment(string userId, int instituteId);
    }
}
