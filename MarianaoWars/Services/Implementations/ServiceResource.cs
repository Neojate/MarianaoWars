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
    public class ServiceResource : IServiceResource
    {

        private readonly ApplicationDbContext dbContext;

        public ServiceResource(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void UpdateResources(Computer computerToUpdate, List<SystemResource> systemResources)
        {
            //conocimiento
            computerToUpdate.Resource.Knowledge += (int)(systemResources[0].IncrementKnowledge * computerToUpdate.Resource.KnowledgeLevel * systemResources[0].Knowledge / 60);

            //ingenio
            computerToUpdate.Resource.Ingenyous += (int)(systemResources[0].IncrementIngenyous * computerToUpdate.Resource.IngenyousLevel * systemResources[1].Ingenyous / 60);

            //café
            computerToUpdate.Resource.Coffe += (int)(systemResources[0].IncrementCoffe * computerToUpdate.Resource.CoffeLevel * systemResources[2].Coffe / 60);

            //sleep
            computerToUpdate.Resource.StressLevel += (int)(systemResources[0].IncrementSleep * computerToUpdate.Resource.StressLevel * systemResources[2].Sleep / 60);
        }

        public Computer GetComputer (int computerId)
        {
            return dbContext.Computer
                .Where(c => c.Id == computerId)
                .Include(c => c.Resource)
                .Include(c => c.Software)
                .Include(c => c.Talent)
                .Include(c => c.AttackScript)
                .Include(c => c.DefenseScript)
                .FirstOrDefault();
        }

        public IEnumerable<Computer> GetComputers(int enrollmentId)
        {
            return dbContext.Computer
                .Where(c => c.EnrollmentId == enrollmentId);
        }

    }
}
