using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarianaoWars.Services.Interfaces;
using MarianaoWars.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Newtonsoft.Json;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace MarianaoWars.Controllers
{
    [ApiController]
    [Route("/user")]
    public class AccountController : ControllerBase
    {

        private readonly ILogger<AccountController> _logger;
        private IAsyncLogic context;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<AccountController> logger, IAsyncLogic context)
        {
            UserMgr = userManager;
            SignInMgr = signInManager;
            _logger = logger;
            this.context = context;
        }

        [HttpPost("userLogin")]
        public async Task<Microsoft.AspNetCore.Identity.SignInResult> login([FromBody] JsonElement body)
        {
            Dictionary<string, string> json = JsonConvert.DeserializeObject<Dictionary<string, string>>(body.ToString());

            Microsoft.AspNetCore.Identity.SignInResult result = await SignInMgr.PasswordSignInAsync(json["email"], json["password"], true, false);

            return result;
        }

        [HttpPost("userRegister")]
        public async Task<ActionResult<IdentityResult>> post([FromBody] JsonElement body) 
        {

            Dictionary<string, string> json = JsonConvert.DeserializeObject<Dictionary<string, string>>(body.ToString());           
            string password = json["password"];

            ApplicationUser appUser = new ApplicationUser(json["email"], json["firstName"], json["lastName"], json["email"]);
            IdentityResult result;

            ApplicationUser user = await UserMgr.FindByNameAsync(appUser.Email); 

                if(user == null) 
                {
                    //appUser.NormalizedUserName = appUser.Email;
                    result = await UserMgr.CreateAsync(appUser, password);
                    user = await UserMgr.FindByNameAsync(appUser.Email);

                    //update
                    user.UserName = json["userName"];
                    context.UpdateUser(appUser);
                
                    //emaim, password, mantiente login, bloqueo por x fallos
                    await SignInMgr.PasswordSignInAsync(appUser.Email, password, true, false);
                    return result;
                }
                else
                {
                    IdentityError error = new IdentityError();
                    error.Code = "10";
                    error.Description = "Usuario existente";
                    return IdentityResult.Failed(error);
                }

        }

        public UserManager<ApplicationUser> UserMgr { get; set; }
        public SignInManager<ApplicationUser> SignInMgr { get; set; }
    }
}