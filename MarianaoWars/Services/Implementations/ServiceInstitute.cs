﻿using MarianaoWars.Data;
using MarianaoWars.Models;
using MarianaoWars.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Implementations
{
    public class ServiceInstitute : IServiceInstitute
    {
        private readonly ApplicationDbContext context;

        public ServiceInstitute(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void CloseServers()
        {
            context.Institute
                .Where(institute => !institute.IsClosed && institute.CloseDate < DateTime.Today)
                .ToList()
                .ForEach(institute => institute.IsClosed = true);

            context.SaveChanges();
        }

        public void EnrollmentUser(ApplicationUser user, Institute institute)
        {
            Enrollment enrollment = new Enrollment(user, institute);
            context.Enrollment.Add(enrollment);
            context.SaveChanges();
        }

        public Enrollment GetEnrollment(int enrollmentId)
        {
            return context.Enrollment
                .Find(enrollmentId);
        }

        public IEnumerable<Enrollment> GetEnrollments(int instituteId)
        {
            return GetInstitute(instituteId).Enrollments;
        }

        public Institute GetInstitute (int instituteId)
        {
            return context.Institute
                .Find(instituteId);
        }

        public IEnumerable<Institute> GetInstitutes()
        {
            return context.Institute;
        }

        public int GetNumberEnrollments(int instituteId)
        {
            return GetEnrollments(instituteId).Count();
        }

        public IEnumerable<Institute> GetOpenInstitutes()
        {
            return context.Institute
                .Where(institute => !institute.IsClosed);
        }

        public ApplicationUser GetUser(int userId)
        {
            
            return context.Users
                .Where(user => user.Id.Equals(userId))
                .FirstOrDefault();
        }

        public ApplicationUser GetUser(string userEmail)
        {
            return context.Users
                .Where(user => user.Email.Equals(userEmail))
                .FirstOrDefault();
        }

        public IEnumerable<ApplicationUser> GetUsers()
        {
            return context.Users;
        }

        public void UpdateRank(ApplicationUser user, Institute institute)
        {
            throw new NotImplementedException();
        }

    }
}
