using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Validus.Console.DTO
{
    public class RequiredDataUserDto
    {
        // Team List
        public List<TeamMembershipDto> AllTeamMemberships { get; set; }
        
        public List<UserDto> AllFilterMembers { get; set; }
        
        public List<UserDto> AllAdditionalUsers { get; set; }

       
        public List<UserDto> AllDefaultUnderwriters { get; set; }
    }
}
