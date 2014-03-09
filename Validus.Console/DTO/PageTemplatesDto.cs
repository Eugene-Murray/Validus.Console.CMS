using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Validus.Console.DTO
{
    public class PageTemplatesDto
    {
        public int TeamId { get; set; }
        public int PageId { get; set; }
        public int PageStructureTemplateId { get; set; }
        public string PageStructureTemplateTitle { get; set; }
        public string PageStructureTemplateUrl { get; set; }
        public List<PageTemplateDto> SectionTemplates { get; set; }
    }
} 