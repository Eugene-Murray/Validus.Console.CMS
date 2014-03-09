var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

ConsoleApp.PageTemplatesDto = function(teamId, pageId, pageStructureTemplateId, pageStructureTemplateTitle, pageStructureTemplateUrl, sectionTemplates)
{
	this.TeamId = teamId;
	this.PageId = pageId;
	this.PageStructureTemplateId = pageStructureTemplateId;
	this.PageStructureTemplateTitle = pageStructureTemplateTitle;
	this.PageStructureTemplateUrl = pageStructureTemplateUrl;
	this.SectionTemplates = sectionTemplates;
};