using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Validus.Console.DTO;

namespace Validus.Console.BusinessLogic
{
    public interface ITemplatesModule
    {
        PageTemplatesDto GetPageTemplates(string templatedPageTitle);
        List<PageTemplateDto> GetAllPageTemplatesByTeamId(int teamId);
        List<TemplatedPageDto> GetAllTemplatedPages();
        List<TemplateDto> GetAllTemplates();
        void UpdatePageTemplates(PageTemplatesDto pageTemplatesDto);
        void UpdateAllPageTemplates(List<AllPageTemplatesDto> allPageTemplatesDtoList);
        List<TemplatedPageDto> GetTeamTemplatedPages(int teamId);
        List<TemplateDto> GetAllPageStructureTemplates();
        List<TemplateDto> GetAllSectionTemplates();
        PageTemplatesDto GetAllTemplatesForPageByTeamAndPageId(int teamId, int pageId);
        TemplateDto GetTemplate(int templateId);
        void UpdateTemplatedPage(TemplatedPageDto templatePageDto);
        TemplatedPageDto CreateTemplatedPage(TemplatedPageDto templatePageDto);
        void DeleteTemplatedPage(TemplatedPageDto templatePageDto);
        void UpdateTemplate(TemplateDto templateDto);
        TemplateDto CreateTemplate(TemplateDto templateDto);
        void DeleteTemplate(TemplateDto templateDto);
    }
}
