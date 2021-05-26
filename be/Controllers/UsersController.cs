using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using WebApi.Entities;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private User user;
        private IContext _context;
        public UsersController(IUserService userService, IHttpContextAccessor httpContextAccessor, IContext context)
        {
            _userService = userService;
            user = (User)httpContextAccessor.HttpContext.Items["User"];
            Console.WriteLine(httpContextAccessor);
            _context = context;
        }

        [HttpPost("authen")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("regis")]
        public IActionResult GetAll(AuthenticateRequest user)
        {
            var checkExist = _context.calendar.Query<User>($@"select * from UserInfo where Username='{user.Username}'").ToList();
            if (checkExist.Count > 0) return Ok(null);
            var y = _context.calendar.Query<int>($@"insert into UserInfo(Username,Password,Name) values ('{user.Username}','{user.Password}','{user.Name}')").ToList();
            
            return Ok("ok");
        }
    }
}
