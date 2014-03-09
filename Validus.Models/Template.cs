using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Validus.Models
{
    public class Template : ModelBase
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public bool IsPageStructureTemplate { get; set; }

        public string AfterRenderDomFunction { get; set; }

        public string TemplatePictureUrl { get; set; }
    }
}
