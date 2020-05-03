using MarianaoWars.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MarianaoWars.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        
        public DbSet<Enrollment> Enrollment { get; set; }

        public DbSet<Institute> Institute { get; set; }

        public DbSet<Computer> Computer { get; set; }

        public DbSet<Resource> Resource { get; set; }

        public DbSet<Software> Software { get; set; }

        public DbSet<Talent> Talent { get; set; }

        public DbSet<AttackScript> AttackScript { get; set; }

        public DbSet<DefenseScript> DefenseScript { get; set; }

        public DbSet<SystemResource> SystemResource { get; set; }

        public DbSet<SystemSoftware> SystemSoftware { get; set; }

        public DbSet<BuildOrder> BuildOrder { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

    }
}
