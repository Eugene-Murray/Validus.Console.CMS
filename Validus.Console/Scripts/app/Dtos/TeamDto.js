var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

ConsoleApp.Team = function(id, title, defaultMOA, defaultDomicile, quoteExpiryDaysDefault, defaultFilterInsLRByTeam, submissionTypeId, submissionTypeTitle, expiryDateOffset, users, links, relatedCOBs, relatedOffices, allUsers, allLinks, allRelatedCOBs, allRelatedOffices, defaultPolicyType)
{
	this.Id = ko.observable(id);
	this.Title = ko.observable(title);
	this.DefaultMOA = ko.observable(defaultMOA);
	this.DefaultDomicile = ko.observable(defaultDomicile);
	this.QuoteExpiryDaysDefault = ko.observable(quoteExpiryDaysDefault);
	this.DefaultPolicyType = ko.observable(defaultPolicyType);
	this.ExpiryDateOffset = ko.observable(expiryDateOffset);
	this.FilterInsLRByTeam = ko.observable(defaultFilterInsLRByTeam);
	this.SubmissionTypeId = ko.observable(submissionTypeId);
	this.SubmissionTypeTitle = ko.observable(submissionTypeTitle);

	this.Users = (users !== undefined && users !== null) ? ko.observableArray(users) : ko.observableArray([]);
	this.Links = (links !== undefined && links !== null) ? ko.observableArray(links) : ko.observableArray([]);  
	this.RelatedCOBs = (relatedCOBs !== undefined && relatedCOBs !== null) ? ko.observableArray(relatedCOBs) : ko.observableArray([]); 
	this.RelatedOffices = (relatedOffices !== undefined && relatedOffices !== null) ? ko.observableArray(relatedOffices) : ko.observableArray([]); 

	this.AllUsers = (allUsers !== undefined && allUsers !== null) ? ko.observableArray(allUsers) : ko.observableArray([]); 
	this.AllLinks = (allLinks !== undefined && allLinks !== null) ? ko.observableArray(allLinks) : ko.observableArray([]); 
	this.AllRelatedCOBs = (allRelatedCOBs !== undefined && allRelatedCOBs !== null) ? ko.observableArray(allRelatedCOBs) : ko.observableArray([]); 
	this.AllRelatedOffices = (allRelatedOffices !== undefined && allRelatedOffices !== null) ? ko.observableArray(allRelatedOffices) : ko.observableArray([]);

    this.dirtyFlag = new ko.TeamDirtyFlag(this);
};
