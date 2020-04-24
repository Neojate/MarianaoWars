using MarianaoWars.Models;
using MarianaoWars.Repositories.Implementations;
using MarianaoWars.Repositories.Interfaces;
using MarianaoWars.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Implementations
{
    public class AsyncServicePregame : IAsyncPregame
    {
        private IRepositoryInstitute repository;

        public AsyncServicePregame(IRepositoryInstitute repository)
        {
            this.repository = repository;
        }

        public Enrollment CreateEnrollment(string userId, int instituteId)
        {
            ApplicationUser user = repository.GetUser(userId).Result;
            Institute institute = repository.GetInstitute(instituteId).Result;

            //inicializamos recursos
            Resource resource = repository.SaveResource(new Resource()).Result;

            //inicializamos software
            Software software = repository.SaveSoftware(new Software()).Result;

            //inicializamos talentos
            Talent talent = repository.SaveTalent(new Talent()).Result;

            //inicializamos scripts de ataque
            AttackScript attackScript = repository.SaveAttackScript(new AttackScript()).Result;

            //inicializamos scripts de defensa
            DefenseScript defenseScript = repository.SaveDefenseScript(new DefenseScript()).Result;

            //TODO: inicializamos profesores

            //creamos la matrícula
            Enrollment enrollment = repository.SaveEnrollment(new Enrollment(user, institute)).Result;

            //inicializamos el ordenador
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
            computer = repository.SaveComputer(computer).Result;

            return enrollment;
        }

        public List<Computer> GetComputers(int enrollmentId)
        {
            return repository.GetComputers(enrollmentId).Result;
        }

        public Computer GetComputer(int computerId)
        {
            return repository.GetComputer(computerId).Result;
        }

        public Enrollment GetEnrollment(string userid, int instituteId)
        {
            return repository.GetEnrollment(userid, instituteId).Result;
        }

        public List<Enrollment> GetEnrollments(int instituteId)
        {
            return repository.GetEnrollments(instituteId).Result;
        }

        public List<Institute> GetOpenInstitutes()
        {
            return repository.GetOpenInstitutes().Result;
        }

        public bool HasEnrollment(string userId, int instituteId)
        {
            return repository.GetEnrollment(userId, instituteId).Result == null ? false : true;
        }

        public Resource GetResource(int resourceId)
        {
            return repository.GetResource(resourceId).Result;
        }



        #region MÉTODOS PRIVADOS
        private string generatePosition(int instituteId)
        {
            string ipDirection = "";
            Random random = new Random();
            do
            {
                int x = random.Next(10);
                int y = random.Next(50);
                ipDirection = string.Format("192.168.{0}.{1}", x, y);
            }
            while (repeatPosition(ipDirection, instituteId));

            return ipDirection;
        }

        private bool repeatPosition(string ipDirection, int instituteId)
        {
            List<Enrollment> enrollments = repository.GetEnrollments(instituteId).Result;
                

            if (enrollments.Count == 1)
                return false;

            foreach (Enrollment enrollment in enrollments)
                foreach (Computer computer in enrollment.Computers)
                    if (computer.IpDirection.Equals(ipDirection))
                        return true;

            return false;
        }
        #endregion



    }
}
