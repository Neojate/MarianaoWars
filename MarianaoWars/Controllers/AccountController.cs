using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarianaoWars.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MarianaoWars.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly ILogger<AccountController> _logger;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<AccountController> logger)
        {
            UserMgr = userManager;
            SignInMgr = signInManager;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<Boolean>> login()
        {
            var result = await SignInMgr.PasswordSignInAsync("prueba22@prueba.es", "Test123!", true, false);

            if (result.Succeeded)
            {
                return true;
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<IdentityResult>> Get(
            [FromBody] ApplicationUser appUser)
        {

            IdentityResult result;
            ApplicationUser user = await UserMgr.FindByNameAsync(appUser.Email); 

                if(user == null) 
                {
                    appUser.NormalizedUserName = appUser.Email;
                    result = await UserMgr.CreateAsync(appUser, "Test123!");
                    await SignInMgr.PasswordSignInAsync(appUser.Email, "Test123!", true, false);
                    return result;
                }
            return NoContent();
        }

        public UserManager<ApplicationUser> UserMgr { get; set; }
        public SignInManager<ApplicationUser> SignInMgr { get; set; }
    }
}