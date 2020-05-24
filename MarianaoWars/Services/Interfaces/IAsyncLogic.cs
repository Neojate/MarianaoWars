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

        List<HackOrder> GetHackOrders(int computerId);

        List<SystemResource> GetSystemResources();

        List<SystemSoftware> GetSystemSoftwares();

        List<SystemTalent> GetSystemTalents();

        List<SystemScript> GetSystemScripts();

        // Método que devuelve los parametros de un Instituto.
        Institute GetInstitute(int instituteId);

        Message GetMessage(int messageId);

        List<Message> GetMessages(int computerId, int pageIndex);

        void DeleteMessage(int messageId);

        void DeleteAllMessage(int computerId);

        List<Computer> GetComputersBySector(int instituteId, int broadcast);

        void SaveComputer(Computer computer);

        void UpdateResource(Resource computer);

        Computer UpdateComputer(int computerId, string computerName);

        ApplicationUser UpdateUser(ApplicationUser user);

        Message ReadMessage(int messageId);

        List<Message> IsNotReadMesages(int computerId);

        BuildOrder CreateBuildOrder(int instituteId, int computerId, int buildId);

        HackOrder CreateHackOrder(int instituteId, int computerId, string to, int type,
            int variable, int conditional, int iterator, int json, int _class, int breakpoint,
            int knowledge, int ingenyous, int coffee);

        bool CheckIpHasComputer(int instituteId, string ip);

    }
}
