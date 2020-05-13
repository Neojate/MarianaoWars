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

        public List<SystemTalent> GetSystemTalents()
        {
            return repository.GetSystemTalents().Result;
        }

        public void SaveComputer(Computer computer)
        {
            repository.SaveComputer(computer);
        }

        public void UpdateResource(Resource resource)
        {
            repository.UpdateResource(resource);
        }

        public BuildOrder CreateBuildOrder(int instituteId, int computerId, int buildId)
        {
            Computer computer = repository.GetComputer(computerId).Result;
            Institute institute = repository.GetInstitute(instituteId).Result;

            int milliToFinish = 60000 / (int)institute.RateTime;
            int building = buildId % 20;

            int buildLevel = calculateBuildLevel(computer, buildId);

            int needKnowledge = 0;
            int needIngenyous = 0;
            int needCoffee = 0;
            int needBuild = 0;

            switch(buildId / 20)
            {
                case 0:
                    SystemResource sysResource = repository.GetSystemResources().Result[building - 1];

                    needKnowledge = int.Parse(sysResource.NeedKnowledge.Split(',')[buildLevel]);
                    needIngenyous = int.Parse(sysResource.NeedIngenyous.Split(',')[buildLevel]);

                    //se comprueba si hay suficientes recursos
                    if (computer.Resource.Knowledge < needKnowledge || computer.Resource.Ingenyous < needIngenyous)
                        return null;

                    //se comprueba que no hay otra orden
                    foreach (BuildOrder b in repository.GetBuildOrders(computerId).Result)
                        if (b.BuildId < 40)
                            return null;

                    //se comprueba que no hayas llegado al límite
                    if (building == 1 && computer.Resource.KnowledgeLevel >= sysResource.LastVersion)
                        return null;
                    else if (building == 2 && computer.Resource.IngenyousLevel >= sysResource.LastVersion)
                        return null;
                    else if (building == 3 && computer.Resource.CoffeLevel >= sysResource.LastVersion)
                        return null;
                    else if (building == 4 && computer.Resource.StressLevel >= sysResource.LastVersion)
                        return null;
                    
                    milliToFinish *= int.Parse(sysResource.Time.Split(',')[buildLevel]);

                    repository.NotAsyncUpdateResource(computer.Resource);
                    break;

                case 1:
                    SystemSoftware sysSoftware = repository.GetSystemSoftwares().Result[building - 1];

                    needKnowledge = int.Parse(sysSoftware.NeedKnowledge.Split(',')[buildLevel]);
                    needIngenyous = int.Parse(sysSoftware.NeedIngenyous.Split(',')[buildLevel]);
                    needCoffee = int.Parse(sysSoftware.NeedCoffee.Split(',')[buildLevel]);

                    //se comprueba si hay suficientes recursos
                    if (computer.Resource.Knowledge < needKnowledge || computer.Resource.Ingenyous < needIngenyous || computer.Resource.Coffe < needCoffee)
                        return null;

                    //se comprueba que no hay otra orden
                    foreach (BuildOrder b in repository.GetBuildOrders(computerId).Result)
                        if (b.BuildId < 40)
                            return null;

                    //se comprueba que no hayas llegado al límite
                    if (building == 1 && computer.Software.GeditVersion >= sysSoftware.LastVersion)
                        return null;
                    else if (building == 2 && computer.Software.MySqlVersion >= sysSoftware.LastVersion)
                        return null;
                    else if (building == 3 && computer.Software.GitHubVersion >= sysSoftware.LastVersion)
                        return null;
                    else if (building == 4 && computer.Software.StackOverFlowVersion >= sysSoftware.LastVersion)
                        return null;
                    else if (building == 5 && computer.Software.PostManVersion >= sysSoftware.LastVersion)
                        return null;
                    else if (building == 6 && computer.Software.VirtualMachineVersion >= sysSoftware.LastVersion)
                        return null;

                    milliToFinish *= int.Parse(sysSoftware.Time.Split(',')[buildLevel]);

                    repository.NotAsyncUpdateResource(computer.Resource);
                    break;

                case 2:
                    SystemTalent sysTalent = repository.GetSystemTalents().Result[building - 1];

                    needKnowledge = int.Parse(sysTalent.NeedKnowledge.Split(',')[buildLevel]);
                    needIngenyous = int.Parse(sysTalent.NeedIngenyous.Split(',')[buildLevel]);
                    needCoffee = int.Parse(sysTalent.NeedCoffee.Split(',')[buildLevel]);
                    needBuild = int.Parse(sysTalent.NeedBuild.Split(',')[buildLevel]);

                    //se comprueba si hay suficientes recursos
                    if (computer.Resource.Knowledge < needKnowledge || computer.Resource.Ingenyous < needIngenyous || computer.Resource.Coffe < needCoffee || computer.Software.StackOverFlowVersion < needBuild)
                        return null;

                    //se comprueba que no haya otra orden
                    foreach (BuildOrder b in repository.GetBuildOrders(computerId).Result)
                        if (b.BuildId >= 40 && b.BuildId < 60)
                            return null;

                    //se comprueba que no hayas llegado al límite
                    if (building == 1 && computer.Talent.RefactorLevel >= sysTalent.LastVersion)
                        return null;
                    else if (building == 2 && computer.Talent.InheritanceLevel >= sysTalent.LastVersion)
                        return null;
                    else if (building == 3 && computer.Talent.InjectionLevel >= sysTalent.LastVersion)
                        return null;
                    else if (building == 4 && computer.Talent.UdpLevel >= sysTalent.LastVersion)
                        return null;
                    else if (building == 5 && computer.Talent.TcpIpLevel >= sysTalent.LastVersion)
                        return null;
                    else if (building == 6 && computer.Talent.SftpLevel >= sysTalent.LastVersion)
                        return null;
                    else if (building == 7 && computer.Talent.EcbLevel >= sysTalent.LastVersion)
                        return null;
                    else if (building == 8 && computer.Talent.RsaLevel >= sysTalent.LastVersion)
                        return null;
                    else if (building == 9 && computer.Talent.SslLevel >= sysTalent.LastVersion)
                        return null;

                    milliToFinish *= int.Parse(sysTalent.Time.Split(',')[buildLevel]);

                    repository.NotAsyncUpdateResource(computer.Resource);
                    break;
            }

            //consumo de recursos
            computer.Resource.Knowledge -= needKnowledge;
            computer.Resource.Ingenyous -= needIngenyous;
            computer.Resource.Coffe -= needCoffee;

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

                case 41: return computer.Talent.RefactorLevel;
                case 42: return computer.Talent.InheritanceLevel;
                case 43: return computer.Talent.InjectionLevel;
                case 44: return computer.Talent.UdpLevel;
                case 45: return computer.Talent.TcpIpLevel;
                case 46: return computer.Talent.SftpLevel;
                case 47: return computer.Talent.EcbLevel;
                case 48: return computer.Talent.RsaLevel;
                case 49: return computer.Talent.SslLevel;

                default: return 0;
            }
        }

    }
}
