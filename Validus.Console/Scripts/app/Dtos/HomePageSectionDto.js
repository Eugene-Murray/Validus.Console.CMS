var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

ConsoleApp.PageSectionItem = function(Id, PartialView, IsVisible, IsReadOnly, TeamId, TeamTitle, SectionId, PageSectionName)
{
	this.Id = Id;
	this.PartialView = PartialView;
	this.IsVisible = IsVisible;
	this.IsReadOnly = IsReadOnly;
	this.TeamId = TeamId;
	this.TeamTitle = TeamTitle;
	this.SectionId = SectionId;
	this.PageSectionName = PageSectionName;
};