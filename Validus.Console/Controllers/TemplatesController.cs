using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Validus.Console.BusinessLogic;
using Validus.Console.DTO;
using Validus.Core.LogHandling;
using Validus.Core.MVC;

namespace Validus.Console.Controllers
{
    public class TemplatesController : Controller
    {
        private readonly ITemplatesModule TemplatesModule;
        private readonly ILogHandler LogHandler;

        public TemplatesController(ITemplatesModule templatesModule, ILogHandler logHandler)
        {
            this.TemplatesModule = templatesModule;
            this.LogHandler = logHandler;
        }

        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult BaseTemplate()
        {
            return PartialView("_BaseTemplate");
        }

        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult _1SectionTemplate()
        {
            return PartialView();
        }

        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult _2SectionTemplate()
        {
            return PartialView();
        }

        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult _4SectionTemplate()
        {
            return PartialView();
        }

        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult _5SectionTemplate()
        {
            return PartialView();
        }

        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult _8SectionTemplate()
        {
            return PartialView();
        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetAllPageTemplatesByTeamId(int teamId)
        {
            var allPageTemplatesList = TemplatesModule.GetAllPageTemplatesByTeamId(teamId);

            return new JsonNetResult
            {
                Data = allPageTemplatesList
            };
        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetPageTemplates(string templatedPageTitle)
        {
            var pageTemplatesDto = TemplatesModule.GetPageTemplates(templatedPageTitle);

            return new JsonNetResult
            {
                Data = pageTemplatesDto
            };

        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetAllTemplatedPages()
        {
            var siteTemplatedPagesDto = TemplatesModule.GetAllTemplatedPages();

            return new JsonNetResult
            {
                Data = siteTemplatedPagesDto
            };

        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetAllTemplates()
        {
            var templatesDto = TemplatesModule.GetAllTemplates();

            return new JsonNetResult
            {
                Data = templatesDto
            };

        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetTeamTemplatedPages(int teamId)
        {
            var teamTemplatedPages = TemplatesModule.GetTeamTemplatedPages(teamId);

            return new JsonNetResult
            {
                Data = teamTemplatedPages
            };

        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetAllPageStructureTemplates()
        {
            var allPageStructureTemplates = TemplatesModule.GetAllPageStructureTemplates();

            return new JsonNetResult
            {
                Data = allPageStructureTemplates
            };

        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetAllSectionTemplates()
        {
            var allPageStructureTemplates = TemplatesModule.GetAllSectionTemplates();

            return new JsonNetResult
            {
                Data = allPageStructureTemplates
            };

        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetAllTemplatesForPageByTeamAndPageId(int teamId, int pageId)
        {
            var pageTemplatesDto = TemplatesModule.GetAllTemplatesForPageByTeamAndPageId(teamId, pageId);

            return new JsonNetResult
            {
                Data = pageTemplatesDto
            };

        }

        [HttpGet]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult GetTemplate(int templateId)
        {
            var pageTemplatesDto = TemplatesModule.GetTemplate(templateId);

            return new JsonNetResult
            {
                Data = pageTemplatesDto
            };

        }

        [HttpPost]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult UpdatePageTemplates(PageTemplatesDto pageTemplatesDto)
        {
            TemplatesModule.UpdatePageTemplates(pageTemplatesDto);

            return new JsonNetResult
            {
                Data = Json(new { Result = "Successfully updated Page Templates" })
            };

        }

        [HttpPost]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult UpdateAllPageTemplates(List<AllPageTemplatesDto> allPageTemplatesDtoList)
        {
            TemplatesModule.UpdateAllPageTemplates(allPageTemplatesDtoList);

            return new JsonNetResult
            {
                Data = Json(new { Result = "Successfully updated Page Templates" })
            };

        }


        [HttpPost]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult UpdateTemplatedPage(TemplatedPageDto templatePageDto)
        {
            TemplatesModule.UpdateTemplatedPage(templatePageDto);

            return new JsonNetResult
            {
                Data = Json(new { Result = "Successfully updated Template Page" })
            };

        }

        [HttpPost]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult UpdateTemplate(TemplateDto templateDto)
        {
            TemplatesModule.UpdateTemplate(templateDto);

            return new JsonNetResult
            {
                Data = Json(new { Result = "Successfully updated Template Page" })
            };

        }

        [HttpPost]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult CreateTemplatedPage(TemplatedPageDto templatedPageDto)
        {
            var teplatedPage = TemplatesModule.CreateTemplatedPage(templatedPageDto);

            return new JsonNetResult
            {
                Data = Json(teplatedPage)
            };

        }

        [HttpPost]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult CreateTemplate(TemplateDto templateDto)
        {

            var template = TemplatesModule.CreateTemplate(templateDto);

            return new JsonNetResult
            {
                Data = Json(template)
            };

        }

        [HttpDelete]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult DeleteTemplatedPage(TemplatedPageDto templatedPageDto)
        {
            TemplatesModule.DeleteTemplatedPage(templatedPageDto);

            return new JsonNetResult
            {
                Data = Json(new { Result = "Successfully Deleted Templated Page" })
            };

        }

        [HttpDelete]
        [OutputCache(CacheProfile = "NoCacheProfile")]
        public ActionResult DeleteTemplate(TemplateDto templateDto)
        {
            TemplatesModule.DeleteTemplate(templateDto);

            return new JsonNetResult
            {
                Data = Json(new { Result = "Successfully Deleted Template" })
            };

        }

    }

}
