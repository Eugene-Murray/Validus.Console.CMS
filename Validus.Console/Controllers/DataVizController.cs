using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Validus.Console.Controllers
{
    public class DataVizController : Controller
    {
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult PieChart()
        {
            return PartialView("_PieChart");
        }

    }
}
