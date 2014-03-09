using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Validus.Models
{
    public class PageTemplate : ModelBase
    {
        [Key, DisplayName("Page Template Id")]
        public int Id { get; set; }

        public int TemplateId { get; set; }

        public int PageSectionId { get; set; }
        
		[ForeignKey("TemplateId"), Required, DisplayName("Tempate")]
        public Template Template { get; set; }
        
        [Required]
	    public bool IsVisible { get; set; }

        [Required]
        public bool IsReadOnly { get; set; }

        public int TeamId { get; set; }
        
		[ForeignKey("TeamId"), Required, DisplayName("Team")]
        public Team Team { get; set; }

        public int TemplatedPageId { get; set; }
        
		[ForeignKey("TemplatedPageId"), Required, DisplayName("Templated Page")]
        public TemplatedPage TemplatedPage { get; set; }
	}
}