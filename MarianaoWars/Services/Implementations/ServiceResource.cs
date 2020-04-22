using MarianaoWars.Data;
using MarianaoWars.Models;
using MarianaoWars.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Implementations
{
    public class ServiceResource : IServiceResource
    {

        private readonly ApplicationDbContext dbContext;

        public ServiceResource(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Computer GetComputer (int computerId)
        {
            return dbContext.Computer
                .Where(c => c.Id == computerId)
                .Include(c => c.Resource)
                .Include(c => c.Software)
                .Include(c => c.Talent)
                .Include(c => c.AttackScript)
                .Include(c => c.DefenseScript)
                .FirstOrDefault();
        }

        public IEnumerable<Computer> GetComputers(int enrollmentId)
        {
            return dbContext.Computer
                .Where(c => c.EnrollmentId == enrollmentId);
        }

    }
}
