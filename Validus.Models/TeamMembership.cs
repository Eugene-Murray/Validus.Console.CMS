using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using Validus.Core.Data.Interceptor.Interceptors;

namespace Validus.Models
{
    public class TeamMembership : ModelBase
    {
        public TeamMembership()
        {
            IsCurrent = true;
        }

        [DisplayName("Id")]
        public int Id { get; set; }

        [DisplayName("Team Id")]
        public int TeamId { get; set; }

        [DisplayName("Team"), ScriptIgnore, JsonIgnore]
        public Team Team { get; set; }

        [DisplayName("User Id")]
        public int UserId { get; set; }

        [DisplayName("User"), ScriptIgnore, JsonIgnore]
        public User User { get; set; }

        [Required, DisplayName("Start Date")]
        public DateTime StartDate { get; set; }

        [DisplayName("End Date")]
        public DateTime? EndDate { get; set; }

        [DisplayName("Primary TeamMembership")]
        public bool PrimaryTeamMembership { get; set; }

        [DisplayName("Is Current")]
        public bool IsCurrent { get; set; }

    }
}