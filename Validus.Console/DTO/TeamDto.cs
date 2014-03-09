using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using DataAnnotationsExtensions;
using Validus.Models;

namespace Validus.Console.DTO
{
    public class TeamDto
    {
        public Int32 Id { get; set; }

        [Required, StringLength(256)]
        public String Title { get; set; }

        public IList<BasicUserDto> Users { get; set; }
        public IList<LinkDto> Links { get; set; }
        

        public IList<BasicUserDto> AllUsers { get; set; }
        public IList<LinkDto> AllLinks { get; set; }
        

        
    }
}