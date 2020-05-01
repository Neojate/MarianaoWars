using MarianaoWars.Models;
using MarianaoWars.Repositories.Interfaces;
using MarianaoWars.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Implementations
{
    public class AsyncServiceLogic : IAsyncLogic
    {
        private IRepositoryInstitute repository;

        public AsyncServiceLogic(IRepositoryInstitute repository)
        {
            this.repository = repository;
        }

        public List<Computer> GetComputersBySector(int instituteId, int broadcast)
        {
            List<Computer> computers = new List<Computer>();
            List<Enrollment> enrollments = repository.GetEnrollments(instituteId).Result;

            foreach (Enrollment enrollment in enrollments)
            {
                foreach (Computer computer in repository.GetComputers(enrollment.Id).Result)
                {
                    int value = int.Parse(computer.IpDirection.Split('.')[3]);
                    if (value == broadcast)
                        computers.Add(computer);
                }
            }
            return computers;
        }

        public List<SystemResource> GetSystemResources()
        {
            return repository.GetSystemResources().Result;
        }

        public List<SystemSoftware> GetSystemSoftwares()
        {
            return repository.GetSystemSoftwares().Result;
        }

        public void SaveComputer(Computer computer)
        {
            repository.SaveComputer(computer);
        }

        public void UpdateResource(Resource resource)
        {
            repository.UpdateResource(resource);
        }

        public void CreateBuildOrder(int computerId, int buildId)
        {
            int milliToFinish = 60000;
            int building = buildId % 10;
            switch(buildId/10)
            {
                case 0:

                    break;
                case 1:
                    SystemSoftware sysSoftware = repository.GetSystemSoftwares().Result[building - 1];
                    Software software = repository.GetComputer(computerId).Result.Software;
                    switch(building)
                    {
                        case 1:
                            milliToFinish *= int.Parse(sysSoftware.Time.Split(',')[software.GeditVersion]);
                            break;
                        case 2:
                            milliToFinish *= int.Parse(sysSoftware.Time.Split(',')[software.MySqlVersion]);
                            break;
                    }
                    break;
            }
            Build buildOrder = new Build(computerId, milliToFinish, buildId);
            /*Build buildOrder = new Build(1, 1000, 11);*/
            repository.SaveBuildOrder(buildOrder);
        }



    }
}
