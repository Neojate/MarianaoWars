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

        List<SystemScript> GetSystemScripts();

        // Método que devuelve los parametros de un Instituto.
        Institute GetInstitute(int instituteId);

        Message GetMessage(int messageId);

        List<Message> GetMessages(int instituteId, string userId, int pageIndex);

        void DeleteMessage(int messageId);

        List<Computer> GetComputersBySector(int instituteId, int broadcast);

        void SaveComputer(Computer computer);

        void UpdateResource(Resource computer);

        Computer UpdateComputer(int computerId, string computerName);

        ApplicationUser UpdateUser(ApplicationUser user);

        Message ReadMessage(int messageId);

        List<Message> IsNotReadMesages(int instituteId, string userId);

        BuildOrder CreateBuildOrder(int instituteId, int computerId, int buildId);

        bool CheckIpHasComputer(int instituteId, string ip);

    }
}
