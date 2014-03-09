using System;
using System.Collections.Generic;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Validus.Console.BusinessLogic;
using Validus.Console.DTO;
using Validus.Core.LogHandling;
using Validus.Core.MVC;
using Validus.Models;
using System.Linq;

namespace Validus.Console.Controllers
{
    //[Authorize(Roles = @"ConsoleRead")]
    public class UserController : Controller
    {
        public readonly IWebSiteModuleManager _websiteModuleManager;
        public readonly ILogHandler _logHandler;

        public UserController(IWebSiteModuleManager websiteModuleManager, ILogHandler logHandler)
        {
            this._websiteModuleManager = websiteModuleManager;
            this._logHandler = logHandler;
        }

        

        
    }
}
