﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Capstone_Connect.Model;

namespace Capstone_Connect.Dtos
{
    public class TeamInDto
    {
        public string TeamName { get; set; }
        public ICollection<Users> Members { get; set; }
    }
}
