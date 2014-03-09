$(function () {

	var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

	ConsoleApp.vmSiteConfiguration = new function()
	{
		var self = new ConsoleApp.vmSiteConfigurationBase();
		self.title = ko.observable('Site Cofiguration');
		self.managePageTemplatesTeamList = ko.observableArray();
		self.teamList = ko.observableArray();
		self.managePageTemplatesPageTemplateList = ko.observableArray();
		self.pageTemplateList = ko.observableArray([]);
		self.templateList = ko.observableArray([]);
		self.selectedTeam = ko.observable();
		self.selectedPageTemplate = ko.observable();
		self.templatedPageList = ko.observableArray([]);
		self.allPageStructureTemplatesList = ko.observableArray();
		self.selectedPageStructureTemplate = ko.observable();
		self.showPageStructureTemplateDiv = ko.observable(false);
		self.managePageTemplatesSelectedTeam = ko.observable();
		self.selectedTemplatedPage = ko.observable();
		self.allSectionTemplatesList = ko.observableArray();
		self.InitializationDataLoaded = false;

		self.PreInitPubSub = function() {
			self.GetTeamList();
		};

		self.Initialize = function()
		{
			if (!self.InitializationDataLoaded)
			{
				self.GetAllPageStructureTemplates();
				self.GetAllSectionTemplates();
				self.GetAllTemplatedPages();
				self.GetAllTemplates();
				
				self.InitializationDataLoaded = true;
			}
		};

		// Ajax Functions
		self.GetTeamList = function()
		{
			amplify.subscribe(ConsoleApp.adminConfig.pubSub_BasicTeamList, function(data)
			{
				// Template View
				self.managePageTemplatesTeamList(data);

				// Grid View
				// Create a brand new Reference Type Array in memory
				var templateArray = new Array();
				$.each(data, function(key, value)
				{
					templateArray.push(value);
				});
				self.teamList(templateArray);
				self.teamList.unshift({ Id: '0', Title: 'All' });
			});
		};

		self.GetAllPageTemplatesByTeamId = function(teamId)
		{
			self.pageTemplateList.removeAll();

			var ajaxConfig = { Url: "/Templates/GetAllPageTemplatesByTeamId?teamId=" + teamId, VerbType: "GET" };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);
			
			response.success(function(data) {
				var tempListSectionTemplates = ko.observableArray(self.allSectionTemplatesList());
				var tempListTemplatedPages = ko.observableArray(self.allPageStructureTemplatesList());

				var pageTemplates = [];
				var templateArray = [];
				$.each(data, function(key, value)
				{
					if (value.IsSiteStructureTemplate === true) {
						templateArray = self.GetTemplatesForDropDownList(tempListTemplatedPages, value.TemplateTitle);
					} else {
						templateArray = self.GetTemplatesForDropDownList(tempListSectionTemplates, value.TemplateTitle);
					}

					pageTemplates.push({
						Id: value.Id,
						TemplatedPage: value.TemplatedPage,
						TeamTitle: value.TeamTitle,
						TemplateTitle: ko.observable(value.TemplateTitle),
						Templates: templateArray,
						TemplateUrl: value.TemplateUrl,
						TemplateAfterRenderDomFunction: value.TemplateAfterRenderDomFunction,
						IsSiteStructureTemplate: value.IsSiteStructureTemplate,
						IsVisible: value.IsVisible,
						IsReadOnly: value.IsReadOnly
					});
					
				});
				self.pageTemplateList(pageTemplates);
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});

		};

		self.GetAllTemplatedPages = function()
		{
			self.templatedPageList.removeAll();

			var ajaxConfig = { Url: "/Templates/GetAllTemplatedPages", VerbType: "GET" };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data)
			{
				var templatedPages = [];
				$.each(data, function(key, value)
				{
					templatedPages.push({
						Id: value.Id,
						PageTitle: value.PageTitle,
						ViewModel: value.ViewModel,
						IsMenuLinkVisible: value.IsMenuLinkVisible,
						IsSeparateBrowserTab: value.IsSeparateBrowserTab
					});
				});
				self.templatedPageList(templatedPages);
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});

			return response;
		};
		
		self.GetAllTemplates = function()
		{
			self.templateList.removeAll();

			var ajaxConfig = { Url: "/Templates/GetAllTemplates", VerbType: "GET" };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data)
			{
				var templates = [];
				$.each(data, function(key, value)
				{
					templates.push({
						Id: value.Id,
						Title: value.Title,
						Url: value.Url,
						IsPageStructureTemplate: value.IsPageStructureTemplate,
						AfterRenderDomFunction: value.AfterRenderDomFunction,
						TemplatePictureUrl: value.TemplatePictureUrl
					});
				});
				self.templateList(templates);
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});

			return response;
		};
		
		// TODO: currently returning all templated pages - not by individual team
		self.GetTeamTemplatedPages = function(teamId)
		{
			self.managePageTemplatesPageTemplateList.removeAll();

			var ajaxConfig = { Url: "/Templates/GetTeamTemplatedPages?teamId=" + teamId, VerbType: "GET" };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data)
			{
				var templatedPages = [];
				if (data != null && data != undefined && data.length > 0)
				{
					$.each(data, function(key, value)
					{
						templatedPages.push({
							Id: value.Id,
							Title: value.PageTitle
						});
					});
				}
				else
				{
					templatedPages.push({
						Id: 0,
						Title: "No Team Templated Pages found"
					});
				}
				self.managePageTemplatesPageTemplateList(templatedPages);
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});

		};

		self.GetAllPageStructureTemplates = function()
		{
			self.allPageStructureTemplatesList.removeAll();

			var ajaxConfig = { Url: "/Templates/GetAllPageStructureTemplates", VerbType: "GET" };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data)
			{
				var allPageStructureTemplates = [];
				if (data != null && data != undefined && data.length > 0)
				{
					$.each(data, function(key, value)
					{
						allPageStructureTemplates.push({
							Id: value.Id,
							Title: value.Title
						});
					});
				} else
				{
					allPageStructureTemplates.push({
						Id: 0,
						Title: "No Templates Found"
					});
				}
				self.allPageStructureTemplatesList(allPageStructureTemplates);
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});

			return response;
		};

		self.GetAllSectionTemplates = function()
		{
			self.allSectionTemplatesList.removeAll();

			var ajaxConfig = { Url: "/Templates/GetAllSectionTemplates", VerbType: "GET" };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data)
			{
				var allSectionTemplates = [];
				if (data != null && data != undefined && data.length > 0)
				{
					$.each(data, function(key, value)
					{
						allSectionTemplates.push({
							Id: value.Id,
							Title: value.Title
						});
					});
				} else
				{
					allSectionTemplates.push({
						Id: 0,
						Title: "No Templates Found"
					});
				}
				self.allSectionTemplatesList(allSectionTemplates);
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});

		};

		self.GetAllTemplatesForPage = function(pageId)
		{
			var ajaxConfig = { Url: "/Templates/GetAllTemplatesForPageByTeamAndPageId?teamId=" + self.managePageTemplatesSelectedTeam() + "&pageId=" + pageId, VerbType: "GET" };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(pageTemplatesDto)
			{
				if (pageTemplatesDto.PageStructureTemplateUrl)
				{
					self.pageStructureTemplateUrl(pageTemplatesDto.PageStructureTemplateUrl);
					self.pageStructureTemplateTitle(pageTemplatesDto.PageStructureTemplateTitle);
					self.pageStructureTemplateId(pageTemplatesDto.PageStructureTemplateId);
				} else
				{
					toastr.info("Page Structure Template Currently Not Set");

					self.pageStructureTemplateUrl("edit-holding-template");
					self.pageStructureTemplateTitle("");
					self.pageStructureTemplateId(0);

					self.templateSection1_SelectedTemplateTitle("");
					self.templateSection2_SelectedTemplateTitle("");
					self.templateSection3_SelectedTemplateTitle("");
					self.templateSection4_SelectedTemplateTitle("");
					self.templateSection5_SelectedTemplateTitle("");
					self.templateSection6_SelectedTemplateTitle("");
					self.templateSection7_SelectedTemplateTitle("");
					self.templateSection8_SelectedTemplateTitle("");
					self.templateSection1_SelectedTemplate();
					self.templateSection2_SelectedTemplate();
					self.templateSection3_SelectedTemplate();
					self.templateSection4_SelectedTemplate();
					self.templateSection5_SelectedTemplate();
					self.templateSection6_SelectedTemplate();
					self.templateSection7_SelectedTemplate();
					self.templateSection8_SelectedTemplate();
					self.templateSection1_IsVisible(true);
					self.templateSection2_IsVisible(true);
					self.templateSection3_IsVisible(true);
					self.templateSection4_IsVisible(true);
					self.templateSection5_IsVisible(true);
					self.templateSection6_IsVisible(true);
					self.templateSection7_IsVisible(true);
					self.templateSection8_IsVisible(true);

					return;
				}


				if (pageTemplatesDto.SectionTemplates)
				{
					if (pageTemplatesDto.SectionTemplates[0] && pageTemplatesDto.SectionTemplates[0].TemplateTitle != undefined)
						self.templateSection1_SelectedTemplateTitle(pageTemplatesDto.SectionTemplates[0].TemplateTitle);

					if (pageTemplatesDto.SectionTemplates[1] && pageTemplatesDto.SectionTemplates[1].TemplateTitle != undefined)
						self.templateSection2_SelectedTemplateTitle(pageTemplatesDto.SectionTemplates[1].TemplateTitle);

					if (pageTemplatesDto.SectionTemplates[2] && pageTemplatesDto.SectionTemplates[2].TemplateTitle != undefined)
						self.templateSection3_SelectedTemplateTitle(pageTemplatesDto.SectionTemplates[2].TemplateTitle);

					if (pageTemplatesDto.SectionTemplates[3] && pageTemplatesDto.SectionTemplates[3].TemplateTitle != undefined)
						self.templateSection4_SelectedTemplateTitle(pageTemplatesDto.SectionTemplates[3].TemplateTitle);

					if (pageTemplatesDto.SectionTemplates[4] && pageTemplatesDto.SectionTemplates[4].TemplateTitle != undefined)
						self.templateSection5_SelectedTemplateTitle(pageTemplatesDto.SectionTemplates[4].TemplateTitle);

					if (pageTemplatesDto.SectionTemplates[5] && pageTemplatesDto.SectionTemplates[5].TemplateTitle != undefined)
						self.templateSection6_SelectedTemplateTitle(pageTemplatesDto.SectionTemplates[5].TemplateTitle);

					if (pageTemplatesDto.SectionTemplates[6] && pageTemplatesDto.SectionTemplates[6].TemplateTitle != undefined)
						self.templateSection7_SelectedTemplateTitle(pageTemplatesDto.SectionTemplates[6].TemplateTitle);

					if (pageTemplatesDto.SectionTemplates[7] && pageTemplatesDto.SectionTemplates[7].TemplateTitle != undefined)
						self.templateSection8_SelectedTemplateTitle(pageTemplatesDto.SectionTemplates[7].TemplateTitle);


					if (pageTemplatesDto.SectionTemplates[0] && pageTemplatesDto.SectionTemplates[0].IsVisible != undefined)
						self.templateSection1_IsVisible(pageTemplatesDto.SectionTemplates[0].IsVisible);
					if (pageTemplatesDto.SectionTemplates[1] && pageTemplatesDto.SectionTemplates[1].IsVisible != undefined)
						self.templateSection2_IsVisible(pageTemplatesDto.SectionTemplates[1].IsVisible);
					if (pageTemplatesDto.SectionTemplates[2] && pageTemplatesDto.SectionTemplates[2].IsVisible != undefined)
						self.templateSection3_IsVisible(pageTemplatesDto.SectionTemplates[2].IsVisible);
					if (pageTemplatesDto.SectionTemplates[3] && pageTemplatesDto.SectionTemplates[3].IsVisible != undefined)
						self.templateSection4_IsVisible(pageTemplatesDto.SectionTemplates[3].IsVisible);
					if (pageTemplatesDto.SectionTemplates[4] && pageTemplatesDto.SectionTemplates[4].IsVisible != undefined)
						self.templateSection5_IsVisible(pageTemplatesDto.SectionTemplates[4].IsVisible);
					if (pageTemplatesDto.SectionTemplates[5] && pageTemplatesDto.SectionTemplates[5].IsVisible != undefined)
						self.templateSection6_IsVisible(pageTemplatesDto.SectionTemplates[5].IsVisible);
					if (pageTemplatesDto.SectionTemplates[6] && pageTemplatesDto.SectionTemplates[6].IsVisible != undefined)
						self.templateSection7_IsVisible(pageTemplatesDto.SectionTemplates[6].IsVisible);
					if (pageTemplatesDto.SectionTemplates[7] && pageTemplatesDto.SectionTemplates[7].IsVisible != undefined)
						self.templateSection8_IsVisible(pageTemplatesDto.SectionTemplates[7].IsVisible);
				}
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});
		};

		self.UpdateTemplatedPage = function(templatedPage) {
			var jsonData = ko.toJSON(templatedPage);
			var ajaxConfig = { Url: "/Templates/UpdateTemplatedPage", VerbType: "POST", Data: jsonData };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data)
			{
				toastr.info("Templated Page Successfully Updated");
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});
		};
		
		self.DeleteTemplatedPage = function(templatedPage)
		{
			var jsonData = ko.toJSON(templatedPage);
			var ajaxConfig = { Url: "/Templates/DeleteTemplatedPage", VerbType: "DELETE", Data: jsonData };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data) {
				self.templatedPageList.remove(templatedPage);

				toastr.info("Templated Page Successfully Deleted");
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});
		};

		self.UpdateTemplate = function(template)
		{
			var jsonData = ko.toJSON(template);
			var ajaxConfig = { Url: "/Templates/UpdateTemplate", VerbType: "POST", Data: jsonData };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data)
			{
				toastr.info("Template Successfully Updated");
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});
		};

		self.UpdatePageTemplates = function() {
			// TODO: put in loop
			var sectionTemplates = [
				new ConsoleApp.PageTemplateDto(1, null, null, self.templateSection1_SelectedTemplateTitle(), null, null, self.templateSection1_IsVisible(), null, null),
				new ConsoleApp.PageTemplateDto(2, null, null, self.templateSection2_SelectedTemplateTitle(), null, null, self.templateSection2_IsVisible(), null, null),
				new ConsoleApp.PageTemplateDto(3, null, null, self.templateSection3_SelectedTemplateTitle(), null, null, self.templateSection3_IsVisible(), null, null),
				new ConsoleApp.PageTemplateDto(4, null, null, self.templateSection4_SelectedTemplateTitle(), null, null, self.templateSection4_IsVisible(), null, null),
				new ConsoleApp.PageTemplateDto(5, null, null, self.templateSection5_SelectedTemplateTitle(), null, null, self.templateSection5_IsVisible(), null, null),
				new ConsoleApp.PageTemplateDto(6, null, null, self.templateSection6_SelectedTemplateTitle(), null, null, self.templateSection6_IsVisible(), null, null),
				new ConsoleApp.PageTemplateDto(7, null, null, self.templateSection7_SelectedTemplateTitle(), null, null, self.templateSection7_IsVisible(), null, null),
				new ConsoleApp.PageTemplateDto(8, null, null, self.templateSection8_SelectedTemplateTitle(), null, null, self.templateSection8_IsVisible(), null, null)
			];

			var pageTemplatesDto = new ConsoleApp.PageTemplatesDto(
					self.managePageTemplatesSelectedTeam(),
					self.selectedTemplatedPage(),
					self.pageStructureTemplateId(),
					self.pageStructureTemplateTitle(),
					self.pageStructureTemplateUrl(),
					sectionTemplates
				);

			var jsonData = ko.toJSON(pageTemplatesDto);
			var ajaxConfig = { Url: "/Templates/UpdatePageTemplates", VerbType: "POST", Data: jsonData };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data)
			{
				toastr.info("Page Templates successfully saved");
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});
		};

		self.UpdateAllPageTemplates = function() {

			var allPageTemplates = [];
			$.each(self.pageTemplateList(), function(key, pageTemplate) {
				allPageTemplates.push({ Id: pageTemplate.Id, TemplateTitle: pageTemplate.TemplateTitle, IsVisible: pageTemplate.IsVisible });
			});

			var jsonData = ko.toJSON(allPageTemplates);
			
			var ajaxConfig = { Url: "/Templates/UpdateAllPageTemplates", VerbType: "POST", Data: jsonData };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data)
			{
				toastr.info("Page Templates Successfully Updated");
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});
		};

		self.CreateTemplatedPage = function(templatedPage) {
			var jsonData = ko.toJSON(templatedPage);
			var ajaxConfig = { Url: "/Templates/CreateTemplatedPage", VerbType: "POST", Data: jsonData };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);
			
			response.success(function(data)
			{
				templatedPage.Id = data.Data.Id;
				self.templatedPageList.unshift(templatedPage);

				self.GetTeamTemplatedPages(0); // TODO: currently returning all templated pages

				toastr.info("Templated Page Successfully Created");
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});
		};
		
		self.CreateTemplate = function(template)
		{
			var jsonData = ko.toJSON(template);
			var ajaxConfig = { Url: "/Templates/CreateTemplate", VerbType: "POST", Data: jsonData };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data) {
				template.Id = data.Data.Id;
				self.templateList.unshift(template);

				toastr.info("Template Successfully Created");
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});
		};

		self.DeleteTemplate = function(template)
		{
			var jsonData = ko.toJSON(template);
			var ajaxConfig = { Url: "/Templates/DeleteTemplate", VerbType: "DELETE", Data: jsonData };

			var response = ConsoleApp.AjaxHelper(ajaxConfig);

			response.success(function(data)
			{
				self.templateList.remove(template);

				toastr.info("Template Successfully Deleted");
			});

			response.fail(function(jqXhr, textStatus)
			{
				toastr.error("Error: " + jqXhr.responseText);
			});
		};

		// Click Events

		self.click_UpdatePageTemplates_TemplatesView = function()
		{
			self.UpdatePageTemplates();
		};
		
		self.click_UpdatePageTemplates_GridView = function()
		{
			self.UpdateAllPageTemplates();
		};

		self.click_TemplatedPage_Update = function(templatedPage)
		{
			self.UpdateTemplatedPage(templatedPage);
		};
		
		self.click_TemplatedPage_Delete = function(templatedPage) {
			self.DeleteTemplatedPage(templatedPage);
		};
		
		self.click_TemplatedPage_Create = function()
		{
			self.CreateTemplatedPage();
		};
		
		self.click_Template_Update = function(template)
		{
			self.UpdateTemplate(template);
		};
		
		self.click_Template_Delete = function(template)
		{
			self.DeleteTemplate(template);
		};

		var templatedPagePopupShown = false;
		self.show_CreateNewTemplatedPagePopup = function()
		{
			if (templatedPagePopupShown === false)
			{
				$('#btnCreateNewTemplatedPage').popover({
					html: true,
					content: function() {
						return $('#popover-create-templatedpage').html();
					},
					trigger: 'manual',
					placement: 'bottom',
					template: '<div class="popover" style="width:400px"><div class="arrow"></div><div class="popover-inner" style="width:400px"><div class="popover-content"><p></p></div></div></div>'
				});
				
				templatedPagePopupShown = true;
				$('#btnCreateNewTemplatedPage').popover('show');
				
			} else {
				$('#btnCreateNewTemplatedPage').popover('toggle');
			}
			
			$('#click_SaveNewTemplatedPage').click(function()
			{
				if ($('#createPageTitle').val() !== ''
					&& $('#createViewModel').val() !== '')
				{
					var templatedPage = {
						PageTitle: $('#createPageTitle').val(),
						ViewModel: $('#createViewModel').val(),
						AddToTopMenu: $('#createPageAddToTopMenu').val(),
						IsSeparateBrowserTab: $('#createPageIsSeparateBrowserTab').val()
					};
					self.CreateTemplatedPage(templatedPage);
					
					$('#btnCreateNewTemplatedPage').popover('toggle');
				} else
				{
					toastr.error("Title and ViewModel are required");
				}
			});

		};

		var templatePopupShown = false;
		self.show_CreateNewTemplatePopup = function()
		{
			if (templatePopupShown === false)
			{
				$('#btnCreateNewTemplate').popover({
					html: true,
					content: function()
					{
						return $('#popover-create-template').html();
					},
					trigger: 'manual',
					placement: 'top',
					template: '<div class="popover" style="width:400px"><div class="arrow"></div><div class="popover-inner" style="width:400px"><div class="popover-content"><p></p></div></div></div>'
				});
				
				templatePopupShown = true;
				$('#btnCreateNewTemplate').popover('show');

			} else {
				$('#btnCreateNewTemplate').popover('toggle');
			}
			
			$('#click_SaveNewTemplate').click(function()
			{
				if ($('#createTemplateTitle').val() !== ''
					&& $('##createTemplateUrl').val() !== '')
				{
					var template = {
						Title: $('#createTemplateTitle').val(),
						Url: $('#createTemplateUrl').val(),
						IsPageStructureTemplate: $('#createTemplateIsPageStructureTemplate').val(),
						AfterRenderDomFunction: ($('#createTemplateAfterRenderDomFunction').val() !== null) ? $('#createTemplateAfterRenderDomFunction').val() : ''
					};
					self.CreateTemplate(template);
					
					$('#btnCreateNewTemplate').popover('toggle');
				} else
				{
					toastr.error("Title and Url are required");
				}
			});
		};
		
		// Subscriptions
		
		self.selectedTeam.subscribe(function(teamId)
		{
			if (teamId !== undefined)
			{
				self.GetAllPageTemplatesByTeamId(teamId);
			}
		});
		
		self.managePageTemplatesSelectedTeam.subscribe(function(teamId)
		{
			if (teamId !== undefined)
			{
				self.GetTeamTemplatedPages(teamId);
			}
		});

		self.selectedTemplatedPage.subscribe(function(pageId)
		{
			if (pageId !== undefined)
			{
				self.showPageStructureTemplateDiv(true);
				self.GetAllTemplatesForPage(pageId);
			}
		});

		self.selectedPageStructureTemplate.subscribe(function(templateId)
		{
			if (templateId !== undefined)
			{
				var ajaxConfig = { Url: "/Templates/GetTemplate?templateId=" + templateId, VerbType: "GET" };

				var response = ConsoleApp.AjaxHelper(ajaxConfig);

				response.success(function(template)
				{
					if (template.Id)
						self.pageStructureTemplateId(template.Id);
					if (template.Url)
						self.pageStructureTemplateUrl(template.Url);
					if (template.Title)
						self.pageStructureTemplateTitle(template.Title);

					self.templateSection1_SelectedTemplateTitle("");
					self.templateSection2_SelectedTemplateTitle("");
					self.templateSection3_SelectedTemplateTitle("");
					self.templateSection4_SelectedTemplateTitle("");
					self.templateSection5_SelectedTemplateTitle("");
					self.templateSection6_SelectedTemplateTitle("");
					self.templateSection7_SelectedTemplateTitle("");
					self.templateSection8_SelectedTemplateTitle("");
					self.templateSection1_SelectedTemplate();
					self.templateSection2_SelectedTemplate();
					self.templateSection3_SelectedTemplate();
					self.templateSection4_SelectedTemplate();
					self.templateSection5_SelectedTemplate();
					self.templateSection6_SelectedTemplate();
					self.templateSection7_SelectedTemplate();
					self.templateSection8_SelectedTemplate();
					self.templateSection1_IsVisible(true);
					self.templateSection2_IsVisible(true);
					self.templateSection3_IsVisible(true);
					self.templateSection4_IsVisible(true);
					self.templateSection5_IsVisible(true);
					self.templateSection6_IsVisible(true);
					self.templateSection7_IsVisible(true);
					self.templateSection8_IsVisible(true);

				});

				response.fail(function(jqXhr, textStatus)
				{
					toastr.error("Error: " + jqXhr.responseText);
				});
			}
		});

		self.templateSection1_SelectedTemplate.subscribe(function(template)
		{
			if (template !== undefined)
			{
				self.templateSection1_SelectedTemplateTitle(template);
			}
		});

		self.templateSection2_SelectedTemplate.subscribe(function(template)
		{
			if (template !== undefined)
			{
				self.templateSection2_SelectedTemplateTitle(template);
			}
		});

		self.templateSection3_SelectedTemplate.subscribe(function(template)
		{
			if (template !== undefined)
			{
				self.templateSection3_SelectedTemplateTitle(template);
			}
		});

		self.templateSection4_SelectedTemplate.subscribe(function(template)
		{
			if (template !== undefined)
			{
				self.templateSection4_SelectedTemplateTitle(template);
			}
		});

		self.templateSection5_SelectedTemplate.subscribe(function(template)
		{
			if (template !== undefined)
			{
				self.templateSection5_SelectedTemplateTitle(template);
			}
		});

		self.templateSection6_SelectedTemplate.subscribe(function(template)
		{
			if (template !== undefined)
			{
				self.templateSection6_SelectedTemplateTitle(template);
			}
		});

		self.templateSection7_SelectedTemplate.subscribe(function(template)
		{
			if (template !== undefined)
			{
				self.templateSection7_SelectedTemplateTitle(template);
			}
		});

		self.templateSection8_SelectedTemplate.subscribe(function(template)
		{
			if (template !== undefined)
			{
				self.templateSection8_SelectedTemplateTitle(template);
			}
		});
		
		// Helper Functions
		
		self.CheckTemplateNotForEdit = function(templateName)
		{
			if (templateName === 'Default Home Page Template')
				return true;
			if (templateName === 'Holding Template')
				return true;
			if (templateName === '4 Section Template')
				return true;
			if (templateName === '2 Section Template')
				return true;
			if (templateName === '8 Section Template')
				return true;

			return false;
		};
		
		self.GetTemplatesForDropDownList = function(tempList, templateTitle)
		{
			var template = _.findWhere(tempList(), { Title: templateTitle });

			if (template)
			{
				tempList.remove(template);
				tempList.unshift(template);
			}

			var templateArray = new Array();
			$.each(tempList(), function(key, value)
			{
				templateArray.push(value);
			});

			return templateArray;
		};
		
		return self;
	};

});