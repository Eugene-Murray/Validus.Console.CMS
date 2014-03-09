using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Validus.Core.Data.Interceptor.Interceptors;

namespace Validus.Models
{
    public class User : ModelBase
    {
        public User()
        {
            IsActive = true;
        }

		[DisplayName("Id")]
        public int Id { get; set; }

        [Required, DisplayName("Logon Name"), StringLength(256)]
        public string DomainLogon { get; set; }

		[DisplayName("Team Memberships")]
        public ICollection<TeamMembership> TeamMemberships { get; set; }

        [DisplayName("Active?")]
        public bool IsActive { get; set; }

    }
}