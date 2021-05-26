
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
    public class EventsController : ControllerBase
    {
        private IUserService _userService;
        private User user;
        private IContext _context;
        public EventsController(IUserService userService, IHttpContextAccessor httpContextAccessor, IContext context)
        {
            _userService = userService;
            user = (User)httpContextAccessor.HttpContext.Items["User"];
            Console.WriteLine(httpContextAccessor);
            _context = context;
        }


        [Authorize]
        [HttpGet("get_all")]
        public IActionResult GetAll(long from, long to)
        {
            var x = user;
            var y = _context.calendar.Query<Event>($"select e.*,u.Name as NameUser from Events as e,UserInfo as u where e.Uid=u.Id and e.Uid={user.Id} and StartTime BETWEEN {from} AND {to}").ToList();

            return Ok(y);
        }

        [Authorize]
        [HttpPost("create")]
        public IActionResult CreateEvent([FromBody] Event ev)
        {
            long update = (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            var x = user;
            var query = @$"INSERT INTO Events
           ([Uid]
           ,[Name]
           ,[Description]
           ,[StartTime]
           ,[EndTime]
           ,[UpdateTime]
           ,[IsPublic])
     VALUES
           ({user.Id}
           ,N'{ev.Name}'
           ,N'{ev.Description}'
           ,{ev.StartTime}
           ,{ev.EndTime}
           ,{update}
           ,{ev.IsPublic})";
            _context.calendar.Query<int>(query);

            ev.Uid = user.Id;
            return Ok(ev);
        }


        [Authorize]
        [HttpPost("update")]
        public IActionResult UpdateEvents(Event ev)
        {
            if(user.Id != ev.Uid)
            {
                return NotFound();
            }
            long update = (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            var x = user;
            var query = @$"UPDATE Events
   SET [Name] = N'{ev.Name}'
      ,[Description] = N'{ev.Description}'
      ,[StartTime] = {ev.StartTime}
      ,[EndTime] = {ev.EndTime}
      ,[UpdateTime] = {update}
      ,[IsPublic] = {ev.UpdateTime}
 WHERE Id = {ev.Id}";
            _context.calendar.Query<int>(query);
            return Ok(ev);
        }
        [Authorize]
        [HttpGet("delete")]
        public IActionResult UpdateEvents(int id)
        {
            long update = (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            var query = @$"DELETE FROM [dbo].[Events]
      WHERE Id = {id} and Uid ={user.Id}";
            _context.calendar.Query<int>(query);
            return Ok("ok");
        }

        [Authorize]
        [HttpGet("search")]
        public IActionResult Search(string text)
        {
            string[] words = text.Trim().Split(" ", StringSplitOptions.RemoveEmptyEntries);
            words = words.Select(w => $"(N'%{w}%')").ToArray();
            var value_like_operator = string.Join(",", words);
            long update = (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            var query = @$"
SELECT x.*
FROM
  ( VALUES {value_like_operator}) AS v (pattern)
  CROSS APPLY
  (  
    SELECT Events.*, UserInfo.Name as NameUser
    FROM       Events, UserInfo
    WHERE    Events.Uid= UserInfo.Id and  Events.Name like v.pattern and (Events.Uid={user.Id} or Events.IsPublic=1) 
  ) AS x
;";
            var rs = _context.calendar.Query<Event>(query).ToList();
            return Ok(rs);
        }
    }
}
