using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Script.Serialization;
using Newtonsoft.Json;

namespace Validus.Models
{
    public class Link : ModelBase
	{
		[DisplayName("Id")]
        public int Id { get; set; }

		[Required, DisplayName("Url"), DataType(DataType.Url), StringLength(2048)]
        public string Url { get; set; }

		[Required, DisplayName("Title"), StringLength(256)]
        public string Title { get; set; }

		[DisplayName("Category"), StringLength(256)]
        public string Category { get; set; }

		[DisplayName("Teams"), ScriptIgnore, JsonIgnore]
		public ICollection<Team> Teams { get; set; }
    }
}