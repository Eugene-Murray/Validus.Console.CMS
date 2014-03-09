/// Currently can have up to 8 custom page sections

var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

ConsoleApp.vmTemplateBase = function()
{
	var self = this;

	self.pageTemplate = ko.observable();
	self.templateSection1 = ko.observable();
	self.templateSection2 = ko.observable(); 
	self.templateSection3 = ko.observable();
	self.templateSection4 = ko.observable();
	self.templateSection5 = ko.observable();
	self.templateSection6 = ko.observable();
	self.templateSection7 = ko.observable();
	self.templateSection8 = ko.observable();
	self.showSection1 = ko.observable(true);
	self.showSection2 = ko.observable(true);
	self.showSection3 = ko.observable(true);
	self.showSection4 = ko.observable(true);
	self.showSection5 = ko.observable(true);
	self.showSection6 = ko.observable(true);
	self.showSection7 = ko.observable(true);
	self.showSection8 = ko.observable(true);
	self.domFunctionSection1 = ko.observable();
	self.domFunctionSection2 = ko.observable();
	self.domFunctionSection3 = ko.observable();
	self.domFunctionSection4 = ko.observable();
	self.domFunctionSection5 = ko.observable();
	self.domFunctionSection6 = ko.observable();
	self.domFunctionSection7 = ko.observable();
	self.domFunctionSection8 = ko.observable();
	self.WFMin = ko.observable(false);
	self.ESMin = ko.observable(false);
	self.RenMin = ko.observable(false);
	self.SubMin = ko.observable(false);
	self.PrevMin = ko.observable(false);
	self.UserFilters = ko.observable();
	self.AllowProfileFilterControl = ko.observable(false);
	self.ApplyProfileFilters = ko.observable(true);
	self.WFApplyProfileFilters = ko.observable(true);
	self.ESApplyProfileFilters = ko.observable(false);
	self.RenApplyProfileFilters = ko.observable(true);
	self.SubApplyProfileFilters = ko.observable(true);
	self.RenewalLimitDays = ko.observable(30);
	self.RenewalInclDeclar = ko.observable(false);
	self.Keywords = ko.observable("");
	self.filters = ko.observableArray();
	self.maximizeCss = ko.observable();
	self.minimizeCss = ko.observable('hide');
	self.minimizeAllSections = false;
	self.isHomePageTab = true;
	
	self.RenewalInclDeclar.subscribe(function (newValue)
	{
	    RefreshRenewals();
	    SetUserSetting("RenewalIncludeDeclar", newValue);
	});

	self.InitilizeBase = function(templatedPageTitle) {
		if (templatedPageTitle !== 'Home') self.isHomePageTab = false;
			
		self.SetPageTemplates(templatedPageTitle);
	};

	self.SetPageTemplates = function(templatedPageTitle)
	{
		var ajaxConfig = { Url: "/Templates/GetPageTemplates?templatedPageTitle=" + templatedPageTitle, VerbType: "GET" };

		var response = ConsoleApp.AjaxHelper(ajaxConfig);

		response.success(function(pageTemplatesDto)
		{
			if (pageTemplatesDto.PageStructureTemplateUrl)
				self.pageTemplate(pageTemplatesDto.PageStructureTemplateUrl);
			else 
				self.pageTemplate("/Templates/_8SectionTemplate");

			if (pageTemplatesDto.SectionTemplates) {
				
				$.each(pageTemplatesDto.SectionTemplates, function(index, sectionTemplate) {
					var pageSectionId;
					if (sectionTemplate.PageSectionId)
						pageSectionId = sectionTemplate.PageSectionId;
					else 
						toastr.error("PageSectionId not set");
					
						
					if (pageSectionId === 0)
						toastr.error("PageSectionId should not be 0 - 0 is for PageStructureTemplates");

					self.setSection(sectionTemplate, pageSectionId, index);
				});

			}
		});

	};

	self.setSection = function(sectionTemplate, pageSectionId)
	{
		if (sectionTemplate && sectionTemplate.TemplateUrl != undefined)
			self['templateSection' + pageSectionId](sectionTemplate.TemplateUrl !== "holding-template" ? sectionTemplate.TemplateUrl + "?guid=" + $.generateGuid() : "holding-template");
		else
			self['templateSection' + pageSectionId]("holding-template");

		if (sectionTemplate && sectionTemplate.IsVisible != undefined)
			self['showSection' + pageSectionId](sectionTemplate.IsVisible);

		if (sectionTemplate && sectionTemplate.TemplateAfterRenderDomFunction != undefined)
			self['domFunctionSection' + pageSectionId](sectionTemplate.TemplateAfterRenderDomFunction);
	};

	self.afterRenderSection1_DomFunction = function(elements)
	{
		if (self.domFunctionSection1())
		{
			var domFunction = self.domFunctionSection1().replace('()', '');
			window[domFunction](self.isHomePageTab);
		}
	};

	self.afterRenderSection2_DomFunction = function(elements)
	{
		if (self.domFunctionSection2())
		{
			var domFunction = self.domFunctionSection2().replace('()', '');
			window[domFunction](self.isHomePageTab);
		}
	};

	self.afterRenderSection3_DomFunction = function(elements)
	{
		if (self.domFunctionSection3())
		{
			var domFunction = self.domFunctionSection3().replace('()', '');
			window[domFunction](self.isHomePageTab);
		}
	};

	self.afterRenderSection4_DomFunction = function(elements)
	{
		if (self.domFunctionSection4())
		{
			var domFunction = self.domFunctionSection4().replace('()', '');
			window[domFunction](self.isHomePageTab);
		}
	};

	self.afterRenderSection5_DomFunction = function(elements)
	{
		if (self.domFunctionSection5())
		{
			var domFunction = self.domFunctionSection5().replace('()', '');
			window[domFunction](self.isHomePageTab);
		}
	};

	self.afterRenderSection6_DomFunction = function(elements)
	{
		if (self.domFunctionSection6())
		{
			var domFunction = self.domFunctionSection6().replace('()', '');
			window[domFunction](self.isHomePageTab);
		}
	};

	self.afterRenderSection7_DomFunction = function(elements)
	{
		if (self.domFunctionSection7())
		{
			var domFunction = self.domFunctionSection7().replace('()', '');
			window[domFunction](self.isHomePageTab);
		}
	};

	self.afterRenderSection8_DomFunction = function(elements)
	{
		if (self.domFunctionSection8())
		{
			var domFunction = self.domFunctionSection8().replace('()', '');
			window[domFunction](self.isHomePageTab);
		}
	};
	
	self.ProfileFilterQuery = ko.computed(function myfunction()
	{
		if (self.UserFilters() !== undefined)
		{
			var profileFilterQuery = "";
			var filterCOBs = self.UserFilters().FilterCOBs;
			var filterCOBsQuery = [];
			for (var i = 0; i < filterCOBs.length ; i++)
			{
				filterCOBsQuery.push("COB:" + filterCOBs[i]);
			}
			var filterOffices = self.UserFilters().FilterOffices;
			var filterOfficesQuery = [];
			for (var i = 0; i < filterOffices.length ; i++)
			{
				filterOfficesQuery.push("OrigOff:" + filterOffices[i]);
			}
			var filterMembers = self.UserFilters().FilterMembers;
			var filterMembersQuery = [];
			for (var i = 0; i < filterMembers.length ; i++)
			{
				filterMembersQuery.push("Underwriter:" + filterMembers[i]);
			}
			var additionalCOBs = self.UserFilters().AdditionalCOBs;
			var additionalCOBsQuery = [];
			for (var i = 0; i < additionalCOBs.length ; i++)
			{
				additionalCOBsQuery.push("COB:" + additionalCOBs[i]);
			}
			var additionalOffices = self.UserFilters().AdditionalOffices;
			var additionalOfficesQuery = [];
			for (var i = 0; i < additionalOffices.length ; i++)
			{
				additionalOfficesQuery.push("OrigOff:" + additionalOffices[i]);
			}
			var additionalMembers = self.UserFilters().AdditionalMembers;
			var additionalMembersQuery = [];
			for (var i = 0; i < additionalMembers.length ; i++)
			{
			    additionalMembersQuery.push("Underwriter:" + additionalMembers[i]);
			}

			var partsToAnd = [];
			if (filterCOBsQuery.length > 0)
				partsToAnd.push("(" + filterCOBsQuery.join(" OR ") + ")");
			if (filterOfficesQuery.length > 0)
				partsToAnd.push("(" + filterOfficesQuery.join(" OR ") + ")");
			if (filterMembersQuery.length > 0)
				partsToAnd.push("(" + filterMembersQuery.join(" OR ") + ")");

			profileFilterQuery = "(" + (partsToAnd.length > 0 ? "(" + partsToAnd.join(" AND ") + ")" : "")
								+ (additionalCOBsQuery.length > 0 ? " OR (" + additionalCOBsQuery.join(" OR ") + ")" : "")
								+ (additionalOfficesQuery.length > 0 ? " OR (" + additionalOfficesQuery.join(" OR ") + ")" : "")
								+ (additionalMembersQuery.length > 0 ? " OR (" + additionalMembersQuery.join(" OR ") + ")" : "")
								+ ")";
			return profileFilterQuery;
		}

		return "";
	});

	self.ProfileFilterSummary = ko.computed(function myfunction()
	{
		if (self.UserFilters() !== undefined)
		{
			var profileFilterQuery = "";
			var filterCOBs = self.UserFilters().FilterCOBs;
			var filterCOBsQuery = [];
			for (var i = 0; i < filterCOBs.length ; i++)
			{
				filterCOBsQuery.push("COB:" + filterCOBs[i]);
			}
			var filterOffices = self.UserFilters().FilterOffices;
			var filterOfficesQuery = [];
			for (var i = 0; i < filterOffices.length ; i++)
			{
				filterOfficesQuery.push("OrigOff:" + filterOffices[i]);
			}
			var filterMembers = self.UserFilters().FilterMembers;
			var filterMembersQuery = [];
			for (var i = 0; i < filterMembers.length ; i++)
			{
			    filterMembersQuery.push("Underwriter:" + filterMembers[i]);
			}
			var additionalCOBs = self.UserFilters().AdditionalCOBs;
			var additionalCOBsQuery = [];
			for (var i = 0; i < additionalCOBs.length ; i++)
			{
				additionalCOBsQuery.push("COB:" + additionalCOBs[i]);
			}
			var additionalOffices = self.UserFilters().AdditionalOffices;
			var additionalOfficesQuery = [];
			for (var i = 0; i < additionalOffices.length ; i++)
			{
				additionalOfficesQuery.push("OrigOff:" + additionalOffices[i]);
			}
			var additionalMembers = self.UserFilters().AdditionalMembers;
			var additionalMembersQuery = [];
			for (var i = 0; i < additionalMembers.length ; i++)
			{
			    additionalMembersQuery.push("Underwriter:" + additionalMembers[i]);
			}

			var partsToAnd = [];
			if (filterCOBsQuery.length > 0)
				partsToAnd.push("(" + filterCOBsQuery.join(" OR ") + ")");
			if (filterOfficesQuery.length > 0)
				partsToAnd.push("(" + filterOfficesQuery.join(" OR ") + ")");
			if (filterMembersQuery.length > 0)
				partsToAnd.push("(" + filterMembersQuery.join(" OR ") + ")");

			profileFilterQuery = "Check the box to apply your profile filters:\n\n"
								+ "Team-related filter:\n\n(\n" + partsToAnd.join(" \nAND \n") + "\n)\n\nAdditionals:\n"
								+ (additionalCOBsQuery.length > 0 ? "\nOR (" + additionalCOBsQuery.join(" OR ") + ")" : "")
								+ (additionalOfficesQuery.length > 0 ? "\nOR (" + additionalOfficesQuery.join(" OR ") + ")" : "")
								+ (additionalMembersQuery.length > 0 ? "\nOR (" + additionalMembersQuery.join(" OR ") + ")" : "");
			return profileFilterQuery;
		}

		return "";
	});
	
	self.RenewalLimitDate = ko.computed(function()
	{
		return moment().add("days", self.RenewalLimitDays()).format("YYYY MM DD");
	});
	
	self.addFilter = function()
	{
		var added = false;
		for (var i = 0; i < self.PropertyOptions.length ; i++)
		{
			var alreadyThere = false;
			ko.utils.arrayForEach(self.filters(), function(filter)
			{
				var propInfilter = filter.Prop();
				if (self.PropertyOptions[i].val == propInfilter)
					alreadyThere = true;
			});

			if (!alreadyThere)
			{
				var obs = new ConsoleApp.Filter(self.PropertyOptions[i].val, self.PropertyOptions[i].fns[0].val, "", self.PropertyOptions);
				self.filters.push(obs);
				added = true;
				return;
			}
		}

		if (!added)
		{
			var obs = new ConsoleApp.Filter(self.PropertyOptions[0].val, self.PropertyOptions[0].fns[0].val, "", self.PropertyOptions);
			self.filters.push(obs);
		}
	};

	self.removeFilter = function()
	{
		self.filters.remove(this);
	};

	self.FilterQuery = ko.computed(function()
	{
		var pieces = [];
		ko.utils.arrayForEach(self.filters(), function(filter)
		{
			var filterVal = filter.Val().toString().trim();
			if (filterVal !== null && filterVal !== undefined && filterVal !== "")
			{
				switch (filter.Fn())
				{
					case "CONTAINS":
						pieces.push(filter.Prop().split(":")[0] + ":" + filter.Val());
						break;
					case "DOESNOTCONTAIN":
						pieces.push("-" + filter.Prop().split(":")[0] + ":" + filter.Val());
						break;
					case "EQUALS":
						pieces.push(filter.Prop().split(":")[0] + "=" + filter.Val());
						break;
					case "DOESNOTEQUAL":
						pieces.push(filter.Prop().split(":")[0] + "<>" + filter.Val());
						break;
				}
			}
		});
		return pieces.length === 0 ? "" : "(" + pieces.join(" AND ") + ")";
	});
	
	self.ClearFilters = function()
	{
		self.filters.removeAll();
	};

	self.NonEmptyFilterCount = ko.computed(function()
	{
		var total = 0;
		ko.utils.arrayForEach(self.filters(), function(filter)
		{
			var valInFilter = filter.Val().toString().trim();
			if (valInFilter !== null && valInFilter !== undefined && valInFilter !== "")
			{
				total++;
			}
		});
		return total;
	});

	self.ExpandButtonChevron = ko.observable("down");

	self.ButtonHtml = ko.computed(function()
	{
		return '<span>Advanced Filters (' + self.NonEmptyFilterCount() + ') </span><i class="icon-chevron-' + self.ExpandButtonChevron() + '"></i>';
	});

	self.HasNonWFCompatFilters = ko.computed(function()
	{
		ko.utils.arrayForEach(self.filters(), function(filter)
		{
			var valInFilter = filter.Val().toString().trim();
			var propInfilter = filter.Prop();
			if (valInFilter !== null && valInFilter !== undefined && valInFilter !== "" && (propInfilter == "VALDsc:Description" || propInfilter == "VALDsc:Description"))
			{
				return true;
			}
		});
	});

	self.click_minMaxAllSections = function() {

		if (self.minimizeAllSections)
		{
			self.minMaxAllSections(false);
			
			self.minimizeAllSections = false;
			self.maximizeCss('');
			self.minimizeCss('hide');
		}
		else
		{
			self.minMaxAllSections(true);
			
			self.minimizeAllSections = true;
			self.maximizeCss('hide');
			self.minimizeCss('');
		}
	};

	self.minMaxAllSections = function(minMax) {
		ConsoleApp.vmHome.WFMin(minMax);
		ConsoleApp.vmHome.RenMin(minMax);
		ConsoleApp.vmHome.SubMin(minMax);
		ConsoleApp.vmHome.ESMin(minMax);
		ConsoleApp.vmHome.PrevMin(minMax);
	};

	self.BindKO = function(domId)
	{
		ko.applyBindings(self, document.getElementById(domId));
	};

	return self;
};