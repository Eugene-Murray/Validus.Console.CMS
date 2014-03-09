var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

ConsoleApp.SiteConfigTeam = function(id, title, active)
{
	this.id = id;
	this.title = title;
	this.active = ko.observable(active);
};