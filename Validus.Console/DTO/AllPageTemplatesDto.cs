using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Validus.Console.DTO
{
    public class AllPageTemplatesDto
    {
        public int Id { get; set; }
        public string TemplateTitle { get; set; }
        public bool IsVisible { get; set; }
    }
}