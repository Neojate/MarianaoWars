using MarianaoWars.Models;
using MarianaoWars.Repositories.Interfaces;
using MarianaoWars.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Implementations
{
    public class AsyncServicePostgame : IAsyncPostgame
    {
        private IRepositoryInstitute repository;

        public AsyncServicePostgame(IRepositoryInstitute repository)
        {
            this.repository = repository;
        }

        public void CreateEnrollment()
        {
            Enrollment enrollment = new Enrollment();
            enrollment.UserId = "asdasda";
            enrollment.InstituteId = 12;
            enrollment.InitDate = DateTime.Today;
            enrollment.Rank = 0;

            repository.SaveEnrollment(enrollment);

        }

        public List<Computer> GetComputersBySector(int instituteId, int sector)
        {
            List<Computer> computers = new List<Computer>();
            List<Enrollment> enrollments = repository.GetEnrollments(instituteId).Result;

            foreach (Enrollment enrollment in enrollments)
            {
                foreach (Computer computer in computers)
                {
                    int value = int.Parse(computer.IpDirection.Split('.')[2]);
                    if (value == sector)
                        computers.Add(computer);
                }
            }

            return computers;
        }

        public List<SystemResource> GetSystemResources()
        {
            return repository.GetSystemResources().Result;
        }

        public void UpdateResource(Resource resource, List<SystemResource> systemResources)
        {
            
            //conocimiento
            resource.Knowledge += (int)(systemResources[0].IncrementKnowledge * resource.KnowledgeLevel * systemResources[0].Knowledge / 60);

            //ingenio
            resource.Ingenyous += (int)(systemResources[0].IncrementIngenyous * resource.IngenyousLevel * systemResources[1].Ingenyous / 60);

            //café
            resource.Coffe += (int)(systemResources[0].IncrementCoffe * resource.CoffeLevel * systemResources[2].Coffe / 60);

            //sleep
            resource.StressLevel += (int)(systemResources[0].IncrementSleep * resource.StressLevel * systemResources[2].Sleep / 60);
            
        }


    }
}
