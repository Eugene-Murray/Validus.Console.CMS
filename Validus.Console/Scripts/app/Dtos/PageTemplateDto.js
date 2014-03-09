var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

ConsoleApp.PageTemplateDto = function(pageSectionId, templatedPage, teamTitle, templateTitle, templateUrl, templateAfterRenderDomFunction, isVisible, isReadOnly, isSiteStructureTemplate) {
	this.PageSectionId = pageSectionId;
	this.TemplatedPage = templatedPage;
	this.TeamTitle = teamTitle;
	this.TemplateTitle = templateTitle;
	this.TemplateUrl = templateUrl;
	this.TemplateAfterRenderDomFunction = templateAfterRenderDomFunction;
	this.IsVisible = isVisible;
	this.IsReadOnly = isReadOnly;
	this.IsSiteStructureTemplate = isSiteStructureTemplate;
};