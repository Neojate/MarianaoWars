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
    public class ServiceInitGame : IServiceInitGame
    {
        private ApplicationDbContext dbContext;

        public ServiceInitGame(ApplicationDbContext context)
        {
            dbContext = context;
        }

        public Enrollment CreateEnrollment(string userId, int instituteId)
        {
            if (HasEnrollment(userId, instituteId)) return null;

            ApplicationUser user = dbContext.Users.Find(userId);
            Institute institute = dbContext.Institute.Find(instituteId);

            //inicializar recursos
            Resource resource = new Resource();
            dbContext.Resource.Add(resource);
            dbContext.SaveChanges();

            //inicializamos edificios
            Software software = new Software();
            dbContext.Software.Add(software);
            dbContext.SaveChanges();

            //incializamos tecnologías
            Talent talent = new Talent();
            dbContext.Talent.Add(talent);
            dbContext.SaveChanges();

            //incialiamos scripts de ataque
            AttackScript attackScript = new AttackScript();
            dbContext.AttackScript.Add(attackScript);
            dbContext.SaveChanges();

            //inicializamos scripts de defensa
            DefenseScript defenseScript = new DefenseScript();
            dbContext.DefenseScript.Add(defenseScript);
            dbContext.SaveChanges();

            //TODO: inicializamos profesores

            //creamos la matrícula
            Enrollment enrollment = new Enrollment(user, institute);
            dbContext.Enrollment.Add(enrollment);
            dbContext.SaveChanges();

            //inicializamos el ordenador de escritorio
            Computer computer = new Computer(
                string.Format("Ordenador de {0}", user.UserName), 
                generatePosition(instituteId), 
                true, 
                resource, 
                software, 
                talent, 
                attackScript, 
                defenseScript, 
                enrollment);
            dbContext.Computer.Add(computer);
            dbContext.SaveChanges();

            return enrollment;
        }

        public Enrollment GetEnrollment(string userId, int instituteId)
        {
            return dbContext.Enrollment
                .Where(enrollment => enrollment.UserId.Equals(userId) && enrollment.InstituteId == instituteId)
                .FirstOrDefault();
        }

        public IEnumerable<Institute> GetOpenInstitutes()
        {
            return dbContext.Institute
                .Where(institute => !institute.IsClosed);
        }

        public IEnumerable<Enrollment> GetEnrollments(int instituteId)
        {
            return dbContext.Enrollment
                .Where(enrollment => enrollment.InstituteId == instituteId);
        }

        public bool HasEnrollment(string userId, int instituteId)
        {
            return GetEnrollment(userId, instituteId) == null ? false : true;
        }

        public IEnumerable<SystemResource> GetResource()
        {
            return dbContext.SystemResource;
        }



        #region MÉTODOS PRIVADOS
        private string generatePosition(int instituteId)
        {
            string ipDirection = "";
            Random random = new Random();
            do
            {
                int x = random.Next(255);
                int y = random.Next(255);
                ipDirection = string.Format("192.168.{0}.{1}", x, y);
            }
            while (repeatPosition(ipDirection, instituteId));

            return ipDirection;
        }

        private bool repeatPosition(string ipDirection, int instituteId)
        {
            List<Enrollment> enrollments = dbContext.Enrollment
                .Include(e => e.Computers)
                .Where(e => e.InstituteId == instituteId)
                .ToList();

            if (enrollments.Count == 0)
                return false;

            foreach (Enrollment enrollment in enrollments)
                foreach (Computer computer in enrollment.Computers)
                    if (!computer.IpDirection.Equals(ipDirection)) 
                        return false;

            return true;
        }
        #endregion
    }
}
