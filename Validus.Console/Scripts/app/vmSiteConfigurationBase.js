$(function() {

	var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

	ConsoleApp.vmSiteConfigurationBase = function() {
		var self = this;

		// Do not change
		self.pageStructureTemplateId = ko.observable();
		self.pageStructureTemplateTitle = ko.observable("");
		self.pageStructureTemplateUrl = ko.observable("edit-holding-template");
		self.templateSection1_SelectedTemplateTitle = ko.observable("");
		self.templateSection2_SelectedTemplateTitle = ko.observable("");
		self.templateSection3_SelectedTemplateTitle = ko.observable("");
		self.templateSection4_SelectedTemplateTitle = ko.observable("");
		self.templateSection5_SelectedTemplateTitle = ko.observable("");
		self.templateSection6_SelectedTemplateTitle = ko.observable("");
		self.templateSection7_SelectedTemplateTitle = ko.observable("");
		self.templateSection8_SelectedTemplateTitle = ko.observable("");
		self.templateSection1_SelectedTemplate = ko.observable();
		self.templateSection2_SelectedTemplate = ko.observable();
		self.templateSection3_SelectedTemplate = ko.observable();
		self.templateSection4_SelectedTemplate = ko.observable();
		self.templateSection5_SelectedTemplate = ko.observable();
		self.templateSection6_SelectedTemplate = ko.observable();
		self.templateSection7_SelectedTemplate = ko.observable();
		self.templateSection8_SelectedTemplate = ko.observable();
		self.templateSection1_IsVisible = ko.observable(true);
		self.templateSection2_IsVisible = ko.observable(true);
		self.templateSection3_IsVisible = ko.observable(true);
		self.templateSection4_IsVisible = ko.observable(true);
		self.templateSection5_IsVisible = ko.observable(true);
		self.templateSection6_IsVisible = ko.observable(true);
		self.templateSection7_IsVisible = ko.observable(true);
		self.templateSection8_IsVisible = ko.observable(true);

		self.domFunctionSection1 = ko.observable("");
		self.domFunctionSection2 = ko.observable("");
		self.domFunctionSection3 = ko.observable("");
		self.domFunctionSection4 = ko.observable("");
		self.domFunctionSection5 = ko.observable("");
		self.domFunctionSection6 = ko.observable("");
		self.domFunctionSection7 = ko.observable("");
		self.domFunctionSection8 = ko.observable("");
		
		// Do not change
		self.afterRenderSection1_DomFunction = function(elements)
		{
		};
		// Do not change
		self.afterRenderSection2_DomFunction = function(elements)
		{

		};
		// Do not change
		self.afterRenderSection3_DomFunction = function(elements)
		{

		};
		// Do not change
		self.afterRenderSection4_DomFunction = function(elements)
		{

		};
		// Do not change
		self.afterRenderSection5_DomFunction = function(elements)
		{

		};
		// Do not change
		self.afterRenderSection6_DomFunction = function(elements)
		{

		};
		// Do not change
		self.afterRenderSection7_DomFunction = function(elements)
		{

		};
		// Do not change
		self.afterRenderSection8_DomFunction = function(elements)
		{

		};

		self.templateSection1 = ko.observable("edit-template-section1"); // Do not change
		self.templateSection2 = ko.observable("edit-template-section2"); // Do not change
		self.templateSection3 = ko.observable("edit-template-section3"); // Do not change
		self.templateSection4 = ko.observable("edit-template-section4"); // Do not change
		self.templateSection5 = ko.observable("edit-template-section5"); // Do not change
		self.templateSection6 = ko.observable("edit-template-section6"); // Do not change
		self.templateSection7 = ko.observable("edit-template-section7"); // Do not change
		self.templateSection8 = ko.observable("edit-template-section8"); // Do not change
		self.showSection1 = ko.observable(true); // Do not change
		self.showSection2 = ko.observable(true); // Do not change
		self.showSection3 = ko.observable(true); // Do not change
		self.showSection4 = ko.observable(true); // Do not change
		self.showSection5 = ko.observable(true); // Do not change
		self.showSection6 = ko.observable(true); // Do not change
		self.showSection7 = ko.observable(true); // Do not change
		self.showSection8 = ko.observable(true); // Do not change

		return self;
	};
});
