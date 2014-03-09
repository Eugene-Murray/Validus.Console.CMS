using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Validus.Models
{
    public class Team : ModelBase
	{
		[DisplayName("Id")]
        public int Id { get; set; }

        [Required, DisplayName("Title"), StringLength(256)]
        public string Title { get; set; }

		[DisplayName("Memebrships")]
        public ICollection<TeamMembership> Memberships { get; set; }

		[DisplayName("Links")]
        public ICollection<Link> Links { get; set; }
    }
}