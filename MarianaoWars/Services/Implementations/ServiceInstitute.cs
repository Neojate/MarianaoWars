using MarianaoWars.Data;
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
    public class ServiceInstitute : IServiceInstitute
    {
        private readonly ApplicationDbContext context;

        public ServiceInstitute(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void CloseServers()
        {
            context.Institute.ToList().ForEach(institute =>
            {
                if (institute.CloseDate < DateTime.Today) institute.IsClosed = true;
            });
            context.SaveChanges();
        }

        public Institute GetInstitute (int instituteId)
        {
            return context.Institute
                .Find(instituteId);
        }

        public IEnumerable<Institute> GetInstitutes()
        {
            return context.Institute
                .ToList();
        }

        public IEnumerable<Institute> GetOpenInstitutes()
        {
            return context.Institute
                .Where(institute => !institute.IsClosed)
                .ToList();
        }

    }
}
