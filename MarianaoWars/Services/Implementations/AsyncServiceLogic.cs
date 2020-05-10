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

        public List<BuildOrder> GetBuildOrders(int computerId)
        {
            return repository.GetBuildOrders(computerId).Result;
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

        public BuildOrder CreateBuildOrder(int computerId, int buildId)
        {
            Computer computer = repository.GetComputer(computerId).Result;

            int milliToFinish = 60000;
            int building = buildId % 20;

            int buildLevel = calculateBuildLevel(computer, buildId) - 1;

            switch(buildId / 20)
            {
                case 0:
                    SystemResource sysResource = repository.GetSystemResources().Result[building - 1];

                    int needKnowledge = int.Parse(sysResource.NeedKnowledge.Split(',')[buildLevel]);
                    int needIngenyous = int.Parse(sysResource.NeedIngenyous.Split(',')[buildLevel]);

                    //se comprueba si hay suficientes recursos
                    if (computer.Resource.Knowledge < needKnowledge || computer.Resource.Ingenyous < needIngenyous)
                        return null;

                    //se comprueba que no hay otra orden
                    foreach (BuildOrder b in repository.GetBuildOrders(computerId).Result)
                        if (b.BuildId < 40)
                            return null;
                    
                    computer.Resource.Knowledge -= needKnowledge;
                    computer.Resource.Ingenyous -= needIngenyous;

                    milliToFinish *= int.Parse(sysResource.Time.Split(',')[buildLevel + 1]);

                    repository.NotAsyncUpdateResource(computer.Resource);
                    break;

                case 1:
                    SystemSoftware sysSoftware = repository.GetSystemSoftwares().Result[building - 1];
                    switch(building)
                    {
                        case 1:
                            milliToFinish *= int.Parse(sysSoftware.Time.Split(',')[computer.Software.GeditVersion]);
                            break;
                        case 2:
                            milliToFinish *= int.Parse(sysSoftware.Time.Split(',')[computer.Software.MySqlVersion]);
                            break;
                    }
                    break;
            }
        
            BuildOrder buildOrder = new BuildOrder(computerId, milliToFinish, buildId);
            return repository.SaveBuildOrder(buildOrder).Result;            
        }

        private int calculateBuildLevel(Computer computer, int buildId)
        {
            switch (buildId)
            {
                case 1: return computer.Resource.KnowledgeLevel;
                case 2: return computer.Resource.IngenyousLevel;
                case 3: return computer.Resource.CoffeLevel;
                case 4: return computer.Resource.StressLevel;

                case 21: return computer.Software.GeditVersion;
                case 22: return computer.Software.MySqlVersion;
                case 23: return computer.Software.GitHubVersion;
                case 24: return computer.Software.StackOverFlowVersion;
                case 25: return computer.Software.PostManVersion;
                case 26: return computer.Software.VirtualMachineVersion;

                default: return 0;
            }
        }

    }
}
