using System;
using System.Collections.Specialized;
using System.Collections.Generic;
using System.Web.Mvc;
using Validus.Console.BusinessLogic;
using Validus.Console.Properties;
using System.Linq;

namespace Validus.Console.Controllers
{
	//[Authorize(Roles = @"ConsoleRead")]
    public class HomeController : Controller
    {
        private readonly IWebSiteModuleManager _webSiteModuleManager;

        public HomeController(IWebSiteModuleManager webSiteModuleManager)
        //public HomeController()
        {
            try
            {
                this._webSiteModuleManager = webSiteModuleManager;
            }
            catch (Exception ex)
            {
                var err = ex.ToString();
            }

            
        }

        public ActionResult Index()
        {
            //var user = this._webSiteModuleManager.EnsureCurrentUser();
            
           // this.ViewBag.TeamMemberships = user.TeamMemberships;

            this.ViewBag.TemplatedPageList = this._webSiteModuleManager.GetTemplatedPages();
            //this.ViewBag.IsWorldCheckUser = User.IsInRole(Settings.Default.WorldCheckGroup);
            
            return View();
        }

        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult _DefaultHomeTemplate()
        {
            return PartialView();
        }

        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult _Search()
        {
            return PartialView();
        }

        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult _SearchResults()
        {
            return PartialView();
        }

        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult _Preview()
        {
            return PartialView();
        }

        protected override void Dispose(bool disposing)
        {
            this._webSiteModuleManager.Dispose();

            base.Dispose(disposing);
        }
    }
}