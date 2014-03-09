using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Validus.Console.DTO
{
    public class PageTemplateDto
    {
        public int Id { get; set; }
        public int PageSectionId { get; set; }
        public string TemplatedPage { get; set; }
        public string TeamTitle { get; set; }
        public string TemplateTitle { get; set; }
        public string TemplateUrl { get; set; }
        public string TemplateAfterRenderDomFunction { get; set; }
        public bool IsVisible { get; set; }
        public bool IsReadOnly { get; set; }
        public bool IsSiteStructureTemplate { get; set; }
    }
}