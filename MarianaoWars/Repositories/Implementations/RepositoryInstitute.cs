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

        public async Task<Computer> GetComputer(int computerId)
        {
            return await dbContext.Computer
                .AsNoTracking()
                .Where(computer => computer.Id == computerId)
                .Include(computer => computer.Resource)
                .Include(computer => computer.Software)
                .Include(computer => computer.Talent)
                .Include(computer => computer.AttackScript)
                .Include(computer => computer.DefenseScript)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Computer>> GetComputers(int enrollmentId)
        {
            return await dbContext.Computer
                .AsNoTracking()
                .Where(computer => computer.EnrollmentId == enrollmentId)
                .Include(computer => computer.Resource)
                .Include(computer => computer.Software)
                .Include(computer => computer.Talent)
                .Include(computer => computer.AttackScript)
                .Include(computer => computer.DefenseScript)
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

        public async Task<Institute> GetInstitute(int instituteId)
        {
            return await dbContext.Institute
                .FindAsync(instituteId);
        }

        public async Task<List<Institute>> GetOpenInstitutes()
        {
            return await dbContext.Institute
                .Where(institute => !institute.IsClosed)
                .ToListAsync();
        }

        public async Task<List<SystemResource>> GetSystemResources()
        {
            return await dbContext.SystemResource
                .ToListAsync();
        }

        public async Task<List<SystemSoftware>> GetSystemSoftwares()
        {
            return await dbContext.SystemSoftware
                .ToListAsync();
        }

        public async Task<ApplicationUser> GetUser(string userId)
        {
            return await dbContext.Users
                .FindAsync(userId);
        }

        public async Task<AttackScript> SaveAttackScript(AttackScript attackScript)
        {
            await dbContext.AttackScript.AddAsync(attackScript);
            await dbContext.SaveChangesAsync();
            return attackScript;
        }

        public async Task<BuildOrder> SaveBuildOrder(BuildOrder buildOrder)
        {
            await dbContext.BuildOrder.AddAsync(buildOrder);
            await dbContext.SaveChangesAsync();
            
            return buildOrder;
        }

        public async Task<Computer> SaveComputer(Computer computer)
        {
            await dbContext.Computer.AddAsync(computer);
            await dbContext.SaveChangesAsync();
            return computer;
        }

        public async Task<Enrollment> SaveEnrollment(Enrollment enrollment)
        {
            await dbContext.Enrollment.AddAsync(enrollment);
            await dbContext.SaveChangesAsync();
            return enrollment;
        }

        public async Task<DefenseScript> SaveDefenseScript(DefenseScript defenseScript)
        {
            await dbContext.DefenseScript.AddAsync(defenseScript);
            await dbContext.SaveChangesAsync();
            return defenseScript;
        }

        public async Task<Resource> SaveResource(Resource resource)
        {
            await dbContext.Resource.AddAsync(resource);
            await dbContext.SaveChangesAsync();
            return resource;
        }

        public async Task<Software> SaveSoftware(Software software)
        {
            await dbContext.Software.AddAsync(software);
            await dbContext.SaveChangesAsync();
            return software;
        }

        public async Task<Talent> SaveTalent(Talent talent)
        {
            await dbContext.Talent.AddAsync(talent);
            await dbContext.SaveChangesAsync();
            return talent;
        }

        public async Task<Resource> UpdateResource(Resource resource)
        {
            dbContext.Update(resource);
            await dbContext.SaveChangesAsync();
            return resource;
        }

        public async Task<Resource> GetResource(int resourceId)
        {
            return await dbContext.Resource.FindAsync(resourceId);
        }

    }
}
