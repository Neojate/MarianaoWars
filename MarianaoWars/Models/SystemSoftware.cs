using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class SystemSoftware
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int LastVersion { get; set; }

        public string Memmory { get; set; }

        public string Action1 { get; set; }

        public string Time { get; set; }

        public string RequireKnowledge { get; set; }

        public string RequireIngenyous { get; set; }

        public string RequireCoffee { get; set; }
    }
}
