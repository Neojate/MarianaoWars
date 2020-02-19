using MarianaoWars.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Data
{
    public class MarianaoContext : DbContext
    {

        public DbSet<Instituto> Instituto { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=127.0.0.1;port=3306; database=marianaowars;user=root;password=");
        }
        

    }
}
