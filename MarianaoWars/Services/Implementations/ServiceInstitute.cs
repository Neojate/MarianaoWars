using MarianaoWars.Data;
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

        public bool EnrollmentUser(string userId, int instituteId)
        {
            if (GetEnrollment(userId, instituteId) == null)
            {
                Enrollment enrollment = new Enrollment(GetUser(userId), GetInstitute(instituteId));
                context.Enrollment.Add(enrollment);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public Enrollment GetEnrollment(int enrollmentId)
        {
            return context.Enrollment
                .Find(enrollmentId);
        }

        public Enrollment GetEnrollment(string userId, int instituteId)
        {
            return context.Enrollment
                .Where(enrollment => enrollment.UserId.Equals(userId) && enrollment.InstituteId == instituteId)
                .FirstOrDefault();
        }

        public IEnumerable<Enrollment> GetEnrollmentsFromInstitute(int instituteId)
        {
            return context.Enrollment
                .Where(enrollment => enrollment.InstituteId == instituteId);
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
            //return GetEnrollments(instituteId).Count();
            return 0;
        }

        public IEnumerable<Institute> GetOpenInstitutes()
        {
            return context.Institute
                .Where(institute => !institute.IsClosed);
        }

        public ApplicationUser GetUser(string userId)
        {

            return context.Users.Find(userId);
        }

        public IEnumerable<ApplicationUser> GetUsers()
        {
            return context.Users;
        }

        public bool HasEnrollment(string userId, int instituteId)
        {
            return GetEnrollment(userId, instituteId) == null ? true : false; 
        }

        public void UpdateRank(ApplicationUser user, Institute institute)
        {
            throw new NotImplementedException();
        }

    }
}
