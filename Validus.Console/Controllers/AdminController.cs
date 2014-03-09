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

namespace Validus.Console.Controllers
{
	//[Authorize(Roles = @"ConsoleRead, ConsoleAdmin")] // TODO: Add MvcModelStateFilter]
    public class AdminController : Controller
    {
        private readonly IAdminModuleManager AdminModuleManager;
	    private readonly ILogHandler LogHandler;
	    
        public AdminController(IAdminModuleManager adminModuleManager, ILogHandler logHandler, IWebSiteModuleManager webSiteModuleManager)
        {
            AdminModuleManager = adminModuleManager;
            LogHandler = logHandler;

            //this.ViewBag.TemplatedPageList = webSiteModuleManager.GetTemplatedPages();
        }

        [Authorize(Roles = @"ConsoleAdmin, ConsoleUW, ConsoleRead")]
        public ActionResult PersonalSettings()
        {
            return View();
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult SiteConfiguration()
        {
            return PartialView("_SiteConfiguration");
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult ManageTeams()
        {
            return PartialView("_ManageTeams");
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult ManageUsers()
        {
            return PartialView("_ManageUsers");
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult ManageLinks()
        {
            return PartialView("_ManageLinks");
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult ManageQuoteTemplates()
        {
            return PartialView("_ManageQuoteTemplates");
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult ManageUnderwriterSignature()
        {

            return PartialView("_ManageUnderwriterSignature");
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult ManageAccelerators()
        {
            return PartialView("_ManageAccelerators");
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult ManageMarketWordings()
        {
            return PartialView("_ManageMarketWordings");
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult ManageTermsNConditionWordings()
        {
            return PartialView("_ManageTermsNConditionWordings");
        }
           
        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult ManageSubjectToClauseWordings()
        {
            return PartialView("_ManageSubjectToClauseWordings");
        }

        [Authorize(Roles = @"ConsoleAdmin")]
        public ActionResult ManageWarrantyWordings()
        {
            return PartialView("_ManageWarrantyWordings");
        }

       

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetTeamsFullData()
        {
            try
            {
                var teamList = AdminModuleManager.GetTeamsFullData();

                return new JsonNetResult
                {
                    Data = teamList
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        //[HttpGet]
        //[OutputCache(CacheProfile = "NoCacheProfile")]
        //public ActionResult GetUser(int? userId)
        //{
        //    try
        //    {
        //        var user = AdminModuleManager.GetUser(userId);

        //        return new JsonNetResult
        //        {
        //            Data = user
        //        };

        //    }
        //    catch (Exception ex) // TODO: Remove
        //    {
        //        LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
        //        throw new HttpException(500, "Server Error");
        //    }
        //}

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetUsers()
        {
            try
            {
                var teamList = AdminModuleManager.GetUsers();

                return new JsonNetResult
                {
                    Data = teamList
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetUsersInTeam(int teamId)
        {
            try
            {
                var teamList = AdminModuleManager.GetUsersInTeam(teamId);

                return new JsonNetResult
                {
                    Data = teamList
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }


        //[HttpPost]
        //[OutputCache(CacheProfile = "NoCacheProfile")]
        //public ActionResult CreateTeam(TeamDto team)
        //{
        //    try
        //    {
        //        if (!ModelState.IsValid) // TODO: Throw new HttpException with status code of bad request
        //            throw new ArgumentException("'Title' and 'Default QuoteExpiry Days' are required");

        //        return new JsonNetResult
        //                {
        //                    Data = AdminModuleManager.CreateTeam(team)
        //                };
        //    }
        //    catch (ArgumentException ex) // TODO: Remove
        //    {
        //        LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
        //        this.Response.StatusCode = (int) HttpStatusCode.BadRequest;
        //        return Json(new {ErrorMessage = ex.Message});
        //    }
        //    catch (ApplicationException ex) // TODO: Remove
        //    {
        //        LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
        //        this.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
        //        return Json(new {ErrorMessage = ex.Message});
        //    }
        //    catch (Exception ex) // TODO: Remove
        //    {
        //        LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
        //        this.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
        //        return Json(new {ErrorMessage = ex.Message});
        //    }
        //}

        //[HttpPut]
        //[OutputCache(CacheProfile = "NoCacheProfile")]
        //public ActionResult EditTeam(TeamDto team)
        //{
        //    try
        //    {
        //        var updatedTeam = AdminModuleManager.EditTeam(team);

        //        return new JsonNetResult
        //        {
        //            Data = updatedTeam
        //        };
        //    }
        //    catch (Exception ex) // TODO: Remove
        //    {
        //        LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
        //        throw new HttpException(500, "Server Error");
        //    }
        //}

        [HttpDelete]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult DeleteTeam(Team team)
        {
            try
            {
                var result = AdminModuleManager.DeleteTeam(team);

                return new JsonNetResult
                {
                    Data = result
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }

        }


        [HttpPost]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult CreateUser(UserDto userDto)
        {
            try
            {
                var newUserId = AdminModuleManager.CreateUser(userDto);

                return new JsonNetResult
                    {
                        Data = newUserId
                    };
            }
            catch (ApplicationException ex)
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(409, ex.Message);
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        //[HttpPost]
        //[OutputCache(CacheProfile = "NoCacheProfile")]
        //public ActionResult EditUser(UserDto userDto)
        //{
        //    try
        //    {
        //        var updatedUserId = AdminModuleManager.EditUser(userDto);

        //        return new JsonNetResult
        //            {
        //                Data = updatedUserId
        //            };
        //    }
        //    catch (ApplicationException ex) // TODO: Are all application exceptions due to bad requests ?
        //    {
        //        LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
        //        throw new HttpException(400, "Bad Request: " + ex.ToString());
        //    }
        //    catch (Exception ex) // TODO: Remove
        //    {
        //        LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
        //        throw new HttpException(500, "Server Error");
        //    }
        //}

        [HttpDelete]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult DeleteUser(User user)
        {
            try
            {
                var result = AdminModuleManager.DeleteUser(user);

                return new JsonNetResult
                {
                    Data = result
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }

        }

        [HttpPost]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult CreateLink(Link link)
        {
            if (!ModelState.IsValid)
                throw new HttpException(406, "Not Acceptable - Invalid Data");

            try
            {
                var newLink = AdminModuleManager.CreateLink(link);

                return new JsonNetResult
                {
                    Data = newLink
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        [HttpPost]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult EditLink(Link link)
        {
            if (!ModelState.IsValid)
                throw new HttpException(406, "Not Acceptable - Invalid Data");

            try
            {
                var updatedLink = AdminModuleManager.EditLink(link);

                return new JsonNetResult
                {
                    Data = updatedLink
                };
            }
            catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        [HttpDelete]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult DeleteLink(Link link)
        {
            try
            {
                var result = AdminModuleManager.DeleteLink(link);

                return new JsonNetResult
                {
                    Data = result
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        //[HttpGet]
        //[OutputCache(CacheProfile = "NoCacheProfile")]
        //public ActionResult GetSelectedUserByName(string userName)
        //{
        //    try
        //    {
        //        var result = AdminModuleManager.GetSelectedUserByName(userName);

        //        return new JsonNetResult
        //        {
        //            Data = result
        //        };
        //    }
        //    catch (Exception ex) // TODO: Remove
        //    {
        //        LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
        //        throw new HttpException(500, "Server Error");
        //    }
        //}

        

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult SearchForUserByName(string userName)
        {
            try
            {
                var result = AdminModuleManager.SearchForUserByName(userName);

                return new JsonNetResult
                {
                    Data = result
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetLinks()
        {
            try
            {
                var linksList = AdminModuleManager.GetLinks();

                return new JsonNetResult
                {
                    Data = linksList
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetLinksForTeam(int? teamId)
        {
            try
            {
                var linksList = AdminModuleManager.GetLinksForTeam(teamId);

                return new JsonNetResult
                {
                    Data = linksList
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        [HttpPost]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult SaveLinksForTeam(TeamLinksDto teamLinksDto)
        {
            try
            {
                var result = AdminModuleManager.SaveLinksForTeam(teamLinksDto);

                return new JsonNetResult
                {
                    Data = result
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetRequiredDataCreateUser()
        {
            try
            {
                var result = AdminModuleManager.GetRequiredDataCreateUser();

                return new JsonNetResult
                {
                    Data = result
                };
            }
			catch (Exception ex) // TODO: Remove
            {
                LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
                throw new HttpException(500, "Server Error");
            }
        }

        //[HttpGet]
        //[OutputCache(CacheProfile = "NoCacheProfile")]
        //public ActionResult GetRequiredDataCreateTeam()
        //{
        //    try
        //    {
        //        var result = AdminModuleManager.GetRequiredDataCreateTeam();

        //        return new JsonNetResult
        //        {
        //            Data = result
        //        };
        //    }
        //    catch (Exception ex) // TODO: Remove
        //    {
        //        LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
        //        throw new HttpException(500, "Server Error");
        //    }
        //}

        //[HttpGet]
        //[OutputCache(CacheProfile = "NoCacheProfile")]
        //public ActionResult GetUserTeamLinks()
        //{
        //    try
        //    {
        //        var result = AdminModuleManager.GetUserTeamLinks();

        //        return new JsonNetResult
        //        {
        //            Data = result
        //        };
        //    }
        //    catch (Exception ex) // TODO: Remove
        //    {
        //        LogHandler.WriteLog(ex.ToString(), LogSeverity.Error, LogCategory.BusinessComponent);
        //        throw new HttpException(500, "Server Error");
        //    }
        //}


        

        

        

        

        

        

        
        
    }
}
