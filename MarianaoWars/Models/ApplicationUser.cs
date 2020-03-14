using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    /**
     * Con identity
     * 
    public class ApplicationUser : IdentityUser<int>
    */
    /**
     * con identity server
     */
    public class ApplicationUser : IdentityUser
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

    }
}
