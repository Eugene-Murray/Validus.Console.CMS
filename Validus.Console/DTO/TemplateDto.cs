using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Validus.Console.DTO
{
    public class TemplateDto
    {
        public int Id { get; set; }
		public string Title { get; set; }
		public string Url { get; set; }
		public bool IsPageStructureTemplate { get; set; }
		public string AfterRenderDomFunction { get; set; }
        public string TemplatePictureUrl { get; set; }
    }
}