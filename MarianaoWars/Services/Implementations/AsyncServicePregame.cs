using MarianaoWars.Models;
using MarianaoWars.Repositories.Implementations;
using MarianaoWars.Repositories.Interfaces;
using MarianaoWars.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Implementations
{
    public class AsyncServicePregame : IAsyncPregame
    {
        private IRepositoryInstitute repository;

        public AsyncServicePregame(IRepositoryInstitute repository)
        {
            this.repository = repository;
        }

        public List<Computer> GetComputers(int enrollmentId)
        {
            return repository.GetComputers(enrollmentId).Result;
        }

        public List<Enrollment> GetEnrollments(int instituteId)
        {
            return repository.GetEnrollments(instituteId).Result;
        }

    }
}
