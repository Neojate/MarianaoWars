using MarianaoWars.Models;
using MarianaoWars.Repositories.Interfaces;
using MarianaoWars.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Implementations
{
    public class AsyncServicePostgame : IAsyncPostgame
    {
        private IRepositoryInstitute repository;

        public AsyncServicePostgame(IRepositoryInstitute repository)
        {
            this.repository = repository;
        }

        public void CreateEnrollment()
        {
            Enrollment enrollment = new Enrollment();
            enrollment.UserId = "asdasda";
            enrollment.InstituteId = 12;
            enrollment.InitDate = DateTime.Today;
            enrollment.Rank = 0;

            repository.SaveEnrollment(enrollment);

        }
    }
}
