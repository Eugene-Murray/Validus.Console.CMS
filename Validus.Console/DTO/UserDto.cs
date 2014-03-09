using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Validus.Models;

namespace Validus.Console.DTO
{
    public class UserDto
    {
        public Int32 Id { get; set; }

        [Required, DisplayName("Logon Name"), StringLength(256)]
        public String DomainLogon { get; set; }

        public ICollection<TeamMembershipDto> TeamMemberships { get; set; }
       
        public ICollection<UserDto> FilterMembers { get; set; }
        
        public ICollection<UserDto> AdditionalUsers { get; set; }

        public ICollection<TeamMembershipDto> AllTeamMemberships { get; set; }
        
        public ICollection<UserDto> AllFilterMembers { get; set; }
        
        public ICollection<UserDto> AllAdditionalUsers { get; set; }

       
        

        [DisplayName("DefaultBroker")]
        public string DefaultBroker { get; set; }

        public List<UserDto> DefaultUWList { get; set; }
        [DisplayName("Default Underwriter")]
        public UserDto DefaultUW { get; set; }

        //public virtual ICollection<Tab> OpenTabs { get; set; }

        [DisplayName("Active?")]
        public Boolean IsActive { get; set; }

        [StringLength(3)]
        public String UnderwriterId { get; set; }

        public bool IsCurrentMembership { get; set; }
    }
}