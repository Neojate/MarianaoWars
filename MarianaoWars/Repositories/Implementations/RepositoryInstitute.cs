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

        /*public Institute GetInstitute(int instituteId)
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
        }*/

        public async Task<List<Institute>> GetOpenInstitutes()
        {
            return await dbContext.Institute
                .Where(institute => !institute.IsClosed)
                .ToListAsync();
        }

        public async Task<Enrollment> GetEnrollment(string userId, int instituteId)
        {
            return await dbContext.Enrollment
                .Where(enrollment => enrollment.UserId.Equals(userId) && enrollment.InstituteId == instituteId)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Enrollment>> GetEnrollments(int instituteId)
        {
            return await dbContext.Enrollment
                .Where(enrollment => enrollment.InstituteId == instituteId)
                .Include(enrollment => enrollment.Computers)
                .ToListAsync();
        }

        public async Task<List<Computer>> GetComputers(int enrollmentId)
        {
            return await dbContext.Computer
                .Where(computer => computer.EnrollmentId == enrollmentId)
                .Include(computer => computer.Resource)
                .Include(computer => computer.Software)
                .Include(computer => computer.Talent)
                .Include(computer => computer.AttackScript)
                .Include(computer => computer.DefenseScript)
                .ToListAsync();
        }

        public async Task SaveEnrollment(Enrollment enrollment)
        {
            await dbContext.Enrollment.AddAsync(enrollment);
            await dbContext.SaveChangesAsync();
        }
    }
}
