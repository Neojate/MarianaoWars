﻿using MarianaoWars.Data;
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
        private int pageSize = 10;

        public RepositoryInstitute(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }



        #region ATTACKSCRIPT
        public async Task<AttackScript> SaveAttackScript(AttackScript attackScript)
        {
            await dbContext.AttackScript.AddAsync(attackScript);
            await dbContext.SaveChangesAsync();
            return attackScript;
        }
        #endregion



        #region BUILDORDER
        public async Task<List<BuildOrder>> GetBuildOrders(int computerId)
        {
            return await dbContext.BuildOrder
                .Where(order => order.ComputerId == computerId)
                .ToListAsync();
        }

        public async Task<BuildOrder> SaveBuildOrder(BuildOrder buildOrder)
        {
            await dbContext.BuildOrder.AddAsync(buildOrder);
            await dbContext.SaveChangesAsync();

            return buildOrder;
        }
        #endregion



        #region COMPUTER
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

        public async Task<Computer> SaveComputer(Computer computer)
        {
            await dbContext.Computer.AddAsync(computer);
            await dbContext.SaveChangesAsync();
            return computer;
        }

        public async Task<Computer> UpdateComputer(Computer computer)
        {
            dbContext.Update(computer);
            await dbContext.SaveChangesAsync();
            return computer;
        }
        #endregion



        #region DEFENSESCRIPT
        public async Task<DefenseScript> SaveDefenseScript(DefenseScript defenseScript)
        {
            await dbContext.DefenseScript.AddAsync(defenseScript);
            await dbContext.SaveChangesAsync();
            return defenseScript;
        }
        #endregion



        #region ENROLLMENT
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

        public async Task<Enrollment> SaveEnrollment(Enrollment enrollment)
        {
            await dbContext.Enrollment.AddAsync(enrollment);
            await dbContext.SaveChangesAsync();
            return enrollment;
        }
        #endregion



        #region INSTITUTE
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
        #endregion



        #region MESSAGE
        public async Task<Message> GetMessage(int messageId)
        {
            return await dbContext.Message
                .FindAsync(messageId);
        }

        public async Task<List<Message>> GetMessages(int instituteId, string userId, int pageIndex)
        {
            return await dbContext.Message
                .Where(message => message.InstituteId == instituteId && message.UserId.Equals(userId))
                .OrderByDescending(message => message.Date)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<List<Message>> IsNotReadMessages(int instituteId, string userId)
        {
            return await dbContext.Message
                .Where(message => 
                    message.InstituteId == instituteId && 
                    message.UserId.Equals(userId) &&
                    !message.IsRead)
                .ToListAsync();
        }

        public async Task<Message> UpdateMessage(Message message)
        {
            dbContext.Update(message);
            await dbContext.SaveChangesAsync();
            return message;
        }

        void IRepositoryInstitute.DeleteMessage(int messageId)
        {
            Message message = GetMessage(messageId).Result;    
            dbContext.Message.Remove(message);
            dbContext.SaveChanges();
        }
        #endregion



        #region RESOURCE
        public async Task<Resource> GetResource(int resourceId)
        {
            return await dbContext.Resource.FindAsync(resourceId);
        }

        public async Task<Resource> SaveResource(Resource resource)
        {
            await dbContext.Resource.AddAsync(resource);
            await dbContext.SaveChangesAsync();
            return resource;
        }

        public async Task<Resource> UpdateResource(Resource resource)
        {
            dbContext.Update(resource);
            await dbContext.SaveChangesAsync();
            return resource;
        }

        public Resource NotAsyncUpdateResource(Resource resource)
        {
            dbContext.Update(resource);
            dbContext.SaveChanges();
            return resource;
        }
        #endregion



        #region SOFTWARE
        public async Task<Software> SaveSoftware(Software software)
        {
            await dbContext.Software.AddAsync(software);
            await dbContext.SaveChangesAsync();
            return software;
        }
        #endregion



        #region SYSTEMRESOURCE
        public async Task<List<SystemResource>> GetSystemResources()
        {
            return await dbContext.SystemResource
                .ToListAsync();
        }
        #endregion



        #region SYSTEMSOFTWARE
        public async Task<List<SystemSoftware>> GetSystemSoftwares()
        {
            return await dbContext.SystemSoftware
                .ToListAsync();
        }
        #endregion



        #region SYSTEMTALENT
        public async Task<List<SystemTalent>> GetSystemTalents()
        {
            return await dbContext.SystemTalent
                .ToListAsync();
        }
        #endregion



        #region TALENT
        public async Task<Talent> SaveTalent(Talent talent)
        {
            await dbContext.Talent.AddAsync(talent);
            await dbContext.SaveChangesAsync();
            return talent;
        }
        #endregion



        #region USER
        public async Task<ApplicationUser> GetUser(string userId)
        {
            return await dbContext.Users
                .FindAsync(userId);
        }

        public async Task<ApplicationUser> UpdateApplicationUser(ApplicationUser user)
        {
            dbContext.Update(user);
            await dbContext.SaveChangesAsync();
            return user;
        }        
        #endregion
















































    }
}
