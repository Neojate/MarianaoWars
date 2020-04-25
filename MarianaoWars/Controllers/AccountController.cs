﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarianaoWars.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using Newtonsoft.Json;

namespace MarianaoWars.Controllers
{
    [ApiController]
    [Route("/user")]
    public class AccountController : ControllerBase
    {

        private readonly ILogger<AccountController> _logger;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<AccountController> logger)
        {
            UserMgr = userManager;
            SignInMgr = signInManager;
            _logger = logger;
        }

        [HttpPost("userLogin")]
        public async Task<ActionResult<Boolean>> login([FromBody] JsonElement body)
        {
            Dictionary<string, string> json = JsonConvert.DeserializeObject<Dictionary<string, string>>(body.ToString());
            
            var result = await SignInMgr.PasswordSignInAsync(json["email"], json["password"], true, false);

            if (result.Succeeded)
            {
                return true;
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("userRegister")]
        public async Task<ActionResult<IdentityResult>> post([FromBody] JsonElement body) 
        {

            Dictionary<string, string> json = JsonConvert.DeserializeObject<Dictionary<string, string>>(body.ToString());           
            string password = json["password"];

            ApplicationUser appUser = new ApplicationUser(json["userName"], json["firstName"], json["lastName"], json["email"]);
            IdentityResult result;

            ApplicationUser user = await UserMgr.FindByNameAsync(appUser.Email); 

                if(user == null) 
                {
                    appUser.NormalizedUserName = appUser.Email;
                    result = await UserMgr.CreateAsync(appUser, password);

                    //emaim, password, mantiente login, bloqueo por fallos
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