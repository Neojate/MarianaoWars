using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    [Table("aspnetusers")]
    public class User
    {
        
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        //public string Password { get; set; }

    }
}
