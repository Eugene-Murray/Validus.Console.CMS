﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Validus.Console.DTO
{
    public class RequiredDataCreateTeamDto
    {
        public IList<UserDto> AllUsers { get; set; }
        public IList<LinkDto> AllLinks { get; set; }
        
    }
}
