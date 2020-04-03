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
        private readonly ApplicationDbContext context;

        public RepositoryInstitute(ApplicationDbContext context)
        {
            this.context = context;
        }

        public Institute GetInstitute(int instituteId)
        {
            return context.Institute.Find(instituteId);
        }

        public IEnumerable<Institute> GetInstitutes()
        {
            return context.Institute;
        }

        public IEnumerable<Institute> GetOpenInstitutes()
        {
            return context.Institute.Where(
                institute => !institute.IsClosed
                );
        }

        public void UpdateInstitute(Institute updatedInstitute)
        {
            context.Entry(updatedInstitute).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}
