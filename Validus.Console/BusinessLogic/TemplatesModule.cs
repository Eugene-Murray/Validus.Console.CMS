using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Validus.Console.DTO;
using Validus.Console.Data;
using Validus.Core.HttpContext;
using Validus.Core.LogHandling;
using Validus.Models;

namespace Validus.Console.BusinessLogic
{
    public class TemplatesModule : ITemplatesModule
    {
        private readonly IConsoleRepository ConsoleRepository;
        private readonly ILogHandler LogHandler;
        private readonly ICurrentHttpContext CurrentHttpContext;
        private readonly IWebSiteModuleManager WebSiteModuleManager;

        public TemplatesModule(IConsoleRepository consoleRepository, ILogHandler logHandler,
                                  ICurrentHttpContext currentHttpContext, IWebSiteModuleManager webSiteModuleManager)
        {
            this.LogHandler = logHandler;
            this.ConsoleRepository = consoleRepository;
            this.CurrentHttpContext = currentHttpContext;
            this.WebSiteModuleManager = webSiteModuleManager;
        }

        public List<PageTemplateDto> GetAllPageTemplatesByTeamId(int teamId)
        {
            var templatesDtoList = new List<PageTemplateDto>();

            using (ConsoleRepository)
            {
                var pageTemplates = new List<PageTemplate>();
                if (teamId == 0) // Take all teams...
                {
                    pageTemplates = ConsoleRepository
                        .Query<PageTemplate>(pt => pt.Template, pt => pt.TemplatedPage, pt => pt.Team)
                        .OrderBy(pt => pt.TeamId)
                        .ToList();
                }
                else
                {
                    pageTemplates = ConsoleRepository
                        .Query<PageTemplate>(pt => pt.Template, pt => pt.TemplatedPage, pt => pt.Team)
                        .Where(pt => pt.Team.Id == teamId)
                        .OrderBy(pt => pt.TeamId)
                        .ToList();
                }

                pageTemplates.ForEach(pt => templatesDtoList.Add(new PageTemplateDto
                {
                    Id = pt.Id,
                    PageSectionId = pt.PageSectionId,
                    TemplatedPage = pt.TemplatedPage.PageTitle,
                    TeamTitle = pt.Team.Title,
                    TemplateTitle = pt.Template.Title,
                    TemplateUrl = pt.Template.Url,
                    TemplateAfterRenderDomFunction = pt.Template.AfterRenderDomFunction,
                    IsSiteStructureTemplate = pt.Template.IsPageStructureTemplate,
                    IsVisible = pt.IsVisible,
                    IsReadOnly = pt.IsReadOnly
                }));

            }

            return templatesDtoList;
        }

        public PageTemplatesDto GetPageTemplates(string templatedPageTitle)
        {
            var pageTemplateDto = new PageTemplatesDto();

            var primaryTeamMembership = new TeamMembership {TeamId = 1};
                //WebSiteModuleManager.EnsureCurrentUser().TeamMemberships.FirstOrDefault(t => t.PrimaryTeamMembership);

            if (primaryTeamMembership == null)
                return SetDefaultTemplateValues();


            var templateList = new List<PageTemplateDto>();
            using (ConsoleRepository)
            {
                var page = ConsoleRepository.Query<TemplatedPage>().FirstOrDefault(tp => tp.PageTitle == templatedPageTitle);
                
                var pageTemplates = ConsoleRepository.Query<PageTemplate>(pt => pt.Template, pt => pt.TemplatedPage, pt => pt.Team)
                    .Where(pt => pt.TemplatedPageId == page.Id && pt.TeamId == primaryTeamMembership.TeamId).ToList();

                if (pageTemplates == null || pageTemplates.Count == 0)
                    throw new Exception("Page Templates not found");
                
                var pageStructureTemplate = pageTemplates.FirstOrDefault(pt => pt.Template.IsPageStructureTemplate);
                pageTemplateDto.PageStructureTemplateUrl = pageStructureTemplate.Template.Url;

                pageTemplates.Remove(pageStructureTemplate);
                pageTemplates.ForEach(p => templateList.Add(new PageTemplateDto
                {
                    TemplateUrl = p.Template.Url,
                    TemplateAfterRenderDomFunction = p.Template.AfterRenderDomFunction,
                    IsVisible = p.IsVisible,
                    IsReadOnly = p.IsReadOnly,
                    PageSectionId = p.PageSectionId
                }));

                pageTemplateDto.SectionTemplates = templateList;
            }

            return pageTemplateDto;
        }

        private PageTemplatesDto SetDefaultTemplateValues()
        {
            return new PageTemplatesDto
            {
                PageStructureTemplateUrl = "/Home/_DefaultHomeTemplate", 
                SectionTemplates = new List<PageTemplateDto>{
                    SetHoldingTemplate(1),
                    SetHoldingTemplate(2),
                    SetHoldingTemplate(3),
                    SetHoldingTemplate(4),
                    SetHoldingTemplate(5),
                    SetHoldingTemplate(6),
                    SetHoldingTemplate(7),
                    SetHoldingTemplate(8)
                    }
            };
        }

        private PageTemplateDto SetHoldingTemplate(int pageSectionId)
        {
            return new PageTemplateDto
                {
                    TemplateUrl = "holding-template",
                    TemplateAfterRenderDomFunction = "",
                    IsVisible = true,
                    IsReadOnly = true,
                    PageSectionId = pageSectionId
                };
        }

        public List<TemplatedPageDto> GetAllTemplatedPages()
        {
            var siteTemplatedPageList = new List<TemplatedPageDto>();

            using (ConsoleRepository)
            {
                var pageTemplates = ConsoleRepository
                    .Query<TemplatedPage>()
                    .ToList();

                pageTemplates.ForEach(stp => siteTemplatedPageList.Add(new TemplatedPageDto
                {
                    Id = stp.Id,
                    PageTitle = stp.PageTitle,
                    ViewModel = stp.ViewModel,
                    IsMenuLinkVisible = stp.IsMenuLinkVisible,
                    IsSeparateBrowserTab = stp.IsSeparateBrowserTab
                }));

            }

            return siteTemplatedPageList;
        }

        public List<TemplateDto> GetAllTemplates()
        {
            var templateList = new List<TemplateDto>();

            using (ConsoleRepository)
            {
                var pageTemplates = ConsoleRepository
                    .Query<Template>()
                    .OrderBy(t => t.IsPageStructureTemplate)
                    .ToList();

                pageTemplates.ForEach(t => templateList.Add(new TemplateDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Url = t.Url,
                    IsPageStructureTemplate = t.IsPageStructureTemplate,
                    AfterRenderDomFunction = t.AfterRenderDomFunction,
                    TemplatePictureUrl = t.TemplatePictureUrl
                }));

            }

            return templateList;
        }

        public List<TemplatedPageDto> GetTeamTemplatedPages(int teamId)
        {
            var templateList = new List<TemplatedPageDto>();

            using (ConsoleRepository)
            {
                // TODO: use this line if templated pages are per team...
                //var pageTemplates = ConsoleRepository.Query<PageTemplate>(pt => pt.TemplatedPage, pt => pt.Team)
                //   .Where(pt => pt.TeamId == teamId && pt.Template.IsPageStructureTemplate).ToList();

                var templatedPages = ConsoleRepository.Query<TemplatedPage>().ToList();

                templatedPages.ForEach(t => templateList.Add(new TemplatedPageDto
                {
                    Id = t.Id,
                    PageTitle = t.PageTitle
                }));

            }

            return templateList;
        }

        public List<TemplateDto> GetAllPageStructureTemplates()
        {
            var templateList = new List<TemplateDto>();

            using (ConsoleRepository)
            {
                var pageTemplates = ConsoleRepository.Query<Template>()
                   .Where(t => t.IsPageStructureTemplate).ToList();

                pageTemplates.ForEach(t => templateList.Add(new TemplateDto
                {
                    Id = t.Id,
                    Title = t.Title
                }));

            }

            return templateList;
        }

        public List<TemplateDto> GetAllSectionTemplates()
        {
            var templateList = new List<TemplateDto>();

            using (ConsoleRepository)
            {
                var pageTemplates = ConsoleRepository.Query<Template>()
                   .Where(t => t.IsPageStructureTemplate == false).ToList();

                pageTemplates.ForEach(t => templateList.Add(new TemplateDto
                {
                    Id = t.Id,
                    Title = t.Title
                }));

            }

            return templateList;
        }

        public PageTemplatesDto GetAllTemplatesForPageByTeamAndPageId(int teamId, int pageId)
        {
            var pageTemplateDto = new PageTemplatesDto();

            var templateList = new List<PageTemplateDto>();
            using (ConsoleRepository)
            {
                var pageTemplates = ConsoleRepository.Query<PageTemplate>(pt => pt.Template, pt => pt.TemplatedPage, pt => pt.Team)
                    .Where(pt => pt.TemplatedPageId == pageId && pt.TeamId == teamId).ToList();

                var pageStructureTemplate = pageTemplates.FirstOrDefault(pt => pt.Template.IsPageStructureTemplate);

                if (pageStructureTemplate != null)
                {
                    pageTemplateDto.PageStructureTemplateId = pageStructureTemplate.Template.Id;
                    pageTemplateDto.PageStructureTemplateTitle = pageStructureTemplate.Template.Title;
                    pageTemplateDto.PageStructureTemplateUrl = pageStructureTemplate.Template.Url;

                    pageTemplates.Remove(pageStructureTemplate);
                    pageTemplates.ForEach(p => templateList.Add(new PageTemplateDto
                    {
                        TemplateTitle = p.Template.Title,
                        TemplateUrl = p.Template.Url,
                        TemplateAfterRenderDomFunction = p.Template.AfterRenderDomFunction,
                        IsVisible = p.IsVisible,
                        IsReadOnly = p.IsReadOnly,
                        PageSectionId = p.PageSectionId
                    }));

                    pageTemplateDto.SectionTemplates = templateList;
                }
                else
                {
                    return pageTemplateDto;
                }
            }

            return pageTemplateDto;
        }

        public TemplateDto GetTemplate(int templateId)
        {
            var templateDto = new TemplateDto();

            using (ConsoleRepository)
            {
                var template = ConsoleRepository.Query<Template>()
                    .FirstOrDefault(t => t.Id == templateId);

                if (template == null) return templateDto;

                templateDto.Id = template.Id;
                templateDto.Url = template.Url;
                templateDto.Title = template.Title;
            }

            return templateDto;
        }

        public void UpdateAllPageTemplates(List<AllPageTemplatesDto> allPageTemplatesList)
        {
            using (ConsoleRepository)
            {
                foreach (var pageTemplatesDto in allPageTemplatesList)
                {
                    var pageTemplate = ConsoleRepository.Query<PageTemplate>(pt => pt.Template, pt => pt.TemplatedPage, pt => pt.Team)
                    .FirstOrDefault(pt => pt.Id == pageTemplatesDto.Id);

                    if (pageTemplate != null)
                    {
                        var newTemplate =
                        ConsoleRepository.Query<Template>()
                                         .FirstOrDefault(t => t.Title == pageTemplatesDto.TemplateTitle);

                        if (newTemplate != null)
                        {
                            ConsoleRepository.Attach<PageTemplate>(pageTemplate);

                            pageTemplate.Template = newTemplate;
                            pageTemplate.IsVisible = pageTemplatesDto.IsVisible;
                        }
                    }
                }

                ConsoleRepository.SaveChanges();
            }
        }

        public void UpdatePageTemplates(PageTemplatesDto pageTemplatesDto)
        {
            using (ConsoleRepository)
            {

                var pageStructureTemplate = ConsoleRepository.Query<PageTemplate>(pt => pt.Template, pt => pt.TemplatedPage, pt => pt.Team)
                    .FirstOrDefault(pt => pt.TemplatedPageId == pageTemplatesDto.PageId && pt.TeamId == pageTemplatesDto.TeamId && pt.Template.IsPageStructureTemplate);

                if (pageStructureTemplate != null)
                {
                    var newPageStructureTemplate =
                        ConsoleRepository.Query<Template>()
                                         .FirstOrDefault(t => t.Id == pageTemplatesDto.PageStructureTemplateId && t.IsPageStructureTemplate);

                    // Update Page Structure Template
                    if (newPageStructureTemplate != null)
                    {
                        ConsoleRepository.Attach<PageTemplate>(pageStructureTemplate);
                        pageStructureTemplate.Template = newPageStructureTemplate;
                    }
                    else
                    {
                        throw new Exception("UpdatePageTemplates - new pageStructureTemplate not found");
                    }

                    // Update Page Section Templates
                    var pageSectionTemplates = ConsoleRepository.Query<PageTemplate>(pt => pt.Template, pt => pt.TemplatedPage, pt => pt.Team)
                    .Where(pt => pt.TemplatedPageId == pageTemplatesDto.PageId && pt.TeamId == pageTemplatesDto.TeamId && pt.Template.IsPageStructureTemplate == false).ToList();

                    if (pageSectionTemplates.Count > 0)
                    {
                        // TODO: turn this into a foreach...
                        for (var index = 0; index < 8; index++) // Up to 8 template sections...
                        {
                            SetTemplateSection(pageTemplatesDto, index, pageSectionTemplates);
                        }
                    }
                    else
                    {
                        throw new Exception("UpdatePageTemplates - no SectionTemplates found");
                    }
                }
                else
                {
                    throw new Exception("UpdatePageTemplates - pageStructureTemplate not found");
                }

                ConsoleRepository.SaveChanges();
            }
        }

        private void SetTemplateSection(PageTemplatesDto pageTemplatesDto, int index, List<PageTemplate> pageSectionTemplates)
        {
            var templateTitle = pageTemplatesDto.SectionTemplates[index].TemplateTitle;
            var newPageSectionTemplate =
            ConsoleRepository.Query<Template>()
                             .FirstOrDefault(t => t.Title.ToUpper() == templateTitle.Trim().ToUpper() && t.IsPageStructureTemplate == false);

            if (newPageSectionTemplate != null)
            {
                ConsoleRepository.Attach<PageTemplate>(pageSectionTemplates[index]);
                pageSectionTemplates[index].Template = newPageSectionTemplate;
                pageSectionTemplates[index].IsVisible = pageTemplatesDto.SectionTemplates[index].IsVisible;
                pageSectionTemplates[index].PageSectionId = pageTemplatesDto.SectionTemplates[index].PageSectionId;
            }
        }

        public void UpdateTemplatedPage(TemplatedPageDto templatePageDto)
        {
            using (ConsoleRepository)
            {

                var templatedPage = ConsoleRepository.Query<TemplatedPage>().FirstOrDefault(tp => tp.Id == templatePageDto.Id);

                if (templatedPage != null)
                {
                    ConsoleRepository.Attach<TemplatedPage>(templatedPage);

                    templatedPage.PageTitle = templatePageDto.PageTitle;
                    templatedPage.ViewModel = templatePageDto.ViewModel;
                    templatedPage.IsMenuLinkVisible = templatePageDto.IsMenuLinkVisible;
                    templatedPage.IsSeparateBrowserTab = templatePageDto.IsSeparateBrowserTab;
                }

                ConsoleRepository.SaveChanges();
            }
        }

        public void DeleteTemplatedPage(TemplatedPageDto templatedPageDto)
        {
            using (ConsoleRepository)
            {
                var templatedPage = ConsoleRepository.Query<TemplatedPage>().FirstOrDefault(tp => tp.Id == templatedPageDto.Id);

                if (templatedPage != null)
                {
                    ConsoleRepository.Attach<TemplatedPage>(templatedPage);
                    ConsoleRepository.Delete<TemplatedPage>(templatedPage);
                    ConsoleRepository.SaveChanges();
                }
            }
        }

        public void DeleteTemplate(TemplateDto templateDto)
        {
            using (ConsoleRepository)
            {
                var template = ConsoleRepository.Query<Template>().FirstOrDefault(tp => tp.Id == templateDto.Id);

                if (template != null)
                {
                    ConsoleRepository.Attach<Template>(template);
                    ConsoleRepository.Delete<Template>(template);
                    ConsoleRepository.SaveChanges();
                }
            }
        }

        public TemplatedPageDto CreateTemplatedPage(TemplatedPageDto templatePageDto)
        {
            using (ConsoleRepository)
            {
                var templatedPage = ConsoleRepository.Query<TemplatedPage>().FirstOrDefault(tp => tp.PageTitle.Equals(templatePageDto.PageTitle));

                if (templatedPage != null) throw new Exception("Templated Page Already Exists");

                var newTemplatePage = new TemplatedPage
                    {
                        PageTitle = templatePageDto.PageTitle,
                        ViewModel = templatePageDto.ViewModel,
                        IsMenuLinkVisible = templatePageDto.IsMenuLinkVisible,
                        IsSeparateBrowserTab = templatePageDto.IsSeparateBrowserTab,
                    };
                // Add Templated Page
                ConsoleRepository.Add<TemplatedPage>(newTemplatePage);

                // Add Page Templates for all Teams
                var teams = ConsoleRepository.Query<Team>().ToList();
                var structureTemplate = ConsoleRepository.Query<Template>().FirstOrDefault(t => t.Title.Equals("8 Section Template"));
                var holdingTemplate = ConsoleRepository.Query<Template>().FirstOrDefault(t => t.Title.Equals("Holding Template"));

                CreateDefaultPageTemplatesPerTeam(ConsoleRepository, newTemplatePage, teams, structureTemplate, holdingTemplate);

                ConsoleRepository.SaveChanges();

                templatePageDto.Id = newTemplatePage.Id;
            }

            return templatePageDto;
        }

        public void UpdateTemplate(TemplateDto templateDto)
        {
            using (ConsoleRepository)
            {

                var template = ConsoleRepository.Query<Template>().FirstOrDefault(t => t.Id == templateDto.Id);

                if (template != null)
                {
                    ConsoleRepository.Attach<Template>(template);

                    template.Title = templateDto.Title;
                    template.Url = templateDto.Url;
                    template.IsPageStructureTemplate = templateDto.IsPageStructureTemplate;
                    template.AfterRenderDomFunction = templateDto.AfterRenderDomFunction ?? string.Empty;
                }

                ConsoleRepository.SaveChanges();
            }
        }

        public TemplateDto CreateTemplate(TemplateDto templateDto)
        {
            using (ConsoleRepository)
            {
                var template = ConsoleRepository.Query<Template>().FirstOrDefault(t => t.Title.Equals(templateDto.Title));

                if (template != null) throw new Exception("Template Already Exists");

                var newTemplate = new Template
                {
                    Title = templateDto.Title,
				    Url = templateDto.Url,
				    IsPageStructureTemplate = templateDto.IsPageStructureTemplate,
				    AfterRenderDomFunction = templateDto.AfterRenderDomFunction
                };
                ConsoleRepository.Add<Template>(newTemplate);
                ConsoleRepository.SaveChanges();

                templateDto.Id = newTemplate.Id;
            }

            return templateDto;
        }

        public static void CreateDefaultPageTemplatesPerTeam(IConsoleRepository ConsoleRepository, TemplatedPage templatedPage, List<Team> teams, Template structureTemplate, Template holdingTemplate)
        {
            foreach (var team in teams)
            {
                SetPageTemplates(ConsoleRepository, templatedPage, structureTemplate, holdingTemplate, team);
            } 
        }

        public static void SetPageTemplates(IConsoleRepository ConsoleRepository, TemplatedPage templatedPage,
                                             Template structureTemplate, Template holdingTemplate, Team team)
        {
            var pageStructureTemplate = new PageTemplate
                {
                    IsVisible = true,
                    Team = team,
                    TemplatedPage = templatedPage,
                    Template = structureTemplate,
                    PageSectionId = 0
                };
            ConsoleRepository.Add<PageTemplate>(pageStructureTemplate);

            var holdingTempl_1 = new PageTemplate
                {
                    IsVisible = true,
                    Team = team,
                    TemplatedPage = templatedPage,
                    Template = holdingTemplate,
                    PageSectionId = 1
                };
            ConsoleRepository.Add<PageTemplate>(holdingTempl_1);

            var holdingTempl_2 = new PageTemplate
                {
                    IsVisible = true,
                    Team = team,
                    TemplatedPage = templatedPage,
                    Template = holdingTemplate,
                    PageSectionId = 2
                };
            ConsoleRepository.Add<PageTemplate>(holdingTempl_2);

            var holdingTempl_3 = new PageTemplate
                {
                    IsVisible = true,
                    Team = team,
                    TemplatedPage = templatedPage,
                    Template = holdingTemplate,
                    PageSectionId = 3
                };
            ConsoleRepository.Add<PageTemplate>(holdingTempl_3);

            var holdingTempl_4 = new PageTemplate
                {
                    IsVisible = true,
                    Team = team,
                    TemplatedPage = templatedPage,
                    Template = holdingTemplate,
                    PageSectionId = 4
                };
            ConsoleRepository.Add<PageTemplate>(holdingTempl_4);

            var holdingTempl_5 = new PageTemplate
                {
                    IsVisible = true,
                    Team = team,
                    TemplatedPage = templatedPage,
                    Template = holdingTemplate,
                    PageSectionId = 5
                };
            ConsoleRepository.Add<PageTemplate>(holdingTempl_5);

            var holdingTempl_6 = new PageTemplate
                {
                    IsVisible = true,
                    Team = team,
                    TemplatedPage = templatedPage,
                    Template = holdingTemplate,
                    PageSectionId = 6
                };
            ConsoleRepository.Add<PageTemplate>(holdingTempl_6);

            var holdingTempl_7 = new PageTemplate
                {
                    IsVisible = true,
                    Team = team,
                    TemplatedPage = templatedPage,
                    Template = holdingTemplate,
                    PageSectionId = 7
                };
            ConsoleRepository.Add<PageTemplate>(holdingTempl_7);

            var holdingTempl_8 = new PageTemplate
                {
                    IsVisible = true,
                    Team = team,
                    TemplatedPage = templatedPage,
                    Template = holdingTemplate,
                    PageSectionId = 8
                };
            ConsoleRepository.Add<PageTemplate>(holdingTempl_8);
        }
    }
}