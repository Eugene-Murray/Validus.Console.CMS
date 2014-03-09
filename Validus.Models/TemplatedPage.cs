using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Validus.Models
{
    public class TemplatedPage : ModelBase
    {
        public int Id { get; set; }
        [Required]
        public string ViewModel { get; set; }
        [Required]
        public string PageTitle { get; set; }
        [Required]
        public bool IsMenuLinkVisible { get; set; }
        [Required]
        public bool IsSeparateBrowserTab { get; set; }
    }
}
