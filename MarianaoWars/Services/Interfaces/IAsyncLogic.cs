using MarianaoWars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Services.Interfaces
{
    public interface IAsyncLogic
    {

        List<BuildOrder> GetBuildOrders(int computerId);

        List<SystemResource> GetSystemResources();

        List<SystemSoftware> GetSystemSoftwares();

        List<SystemTalent> GetSystemTalents();

        Message GetMessage(int messageId);

        List<Message> GetMessages(int instituteId, string userId, int pageIndex);

        void DeleteMessage(int messageId);

        List<Computer> GetComputersBySector(int instituteId, int broadcast);

        void SaveComputer(Computer computer);

        void UpdateResource(Resource computer);

        Message ReadMessage(int messageId);

        BuildOrder CreateBuildOrder(int instituteId, int computerId, int buildId);

    }
}
