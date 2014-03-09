using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Validus.Console.DTO
{
    public class TemplatedPageDto
    {
        public int Id { get; set; }
        public string PageTitle { get; set; }
        public string ViewModel { get; set; }
        public bool IsMenuLinkVisible { get; set; }
        public bool IsSeparateBrowserTab { get; set; }
    }
}