using MarianaoWars.Data;
using MarianaoWars.Models;
using MarianaoWars.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Repositories.Implementations
{

    public class RepositoryInstitute : IRepositoryInstitute
    {
        private readonly ApplicationDbContext dbContext;

        public RepositoryInstitute(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Institute GetInstitute(int instituteId)
        {
            return dbContext.Institute.Find(instituteId);
        }

        public IEnumerable<Institute> GetInstitutes()
        {
            return dbContext.Institute;
        }

        public IEnumerable<Institute> GetOpenInstitutes()
        {
            return dbContext.Institute.Where(
                institute => !institute.IsClosed
                );
        }

        public void UpdateInstitute(Institute updatedInstitute)
        {
            dbContext.Entry(updatedInstitute).State = EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
    }
}
