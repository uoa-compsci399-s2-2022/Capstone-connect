﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Capstone_Connect.Data;
using Capstone_Connect.Dtos;
using Capstone_Connect.Model;

namespace Capstone_Connect.Controllers
{
    [Route("webapi")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ICapstoneConnectRepo _repository;
        public UserController(ICapstoneConnectRepo repository)
        {
            _repository = repository;
        }

        [HttpPost("Register")]
        public ActionResult Register(UserInDto user)
        {
            if (user.Email == "")
            {
                return Ok("Invalid Email");
            }
            User t = _repository.GetUserByEmail(user.Email);
            if (t != null)
            {
                return Ok("Email not available.");
            }
            else
            {
                User c = new User { Email = user.Email, Password = user.Password, FirstName = user.FirstName, LastName = user.LastName, UserLevel = "visitor"};
                User addedUser = _repository.RegisterUser(c);
                return Ok("User successfully registered");
            }
        }

        [Authorize(AuthenticationSchemes = "AuthenticationScheme")]
        [Authorize(Policy = "VisitorOnly")]
        [HttpGet("Login")]
        public ActionResult<string> Login(UserInDto user)
        {
            return Ok(_repository.Login(user.Email, user.Password, "visitor"));
        }


    }
}