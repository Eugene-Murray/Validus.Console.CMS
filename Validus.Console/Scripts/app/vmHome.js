$(function () {

	var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

	ConsoleApp.vmHome = new function() {
		var self = new ConsoleApp.vmTemplateBase();
		self.TemplatedPageTitle = 'Home'; 

		self.Initialize = function() {
			self.InitilizeBase(self.TemplatedPageTitle);
			

			var obsCOB = new ConsoleApp.Filter(self.PropertyOptions[0].val, self.PropertyOptions[0].fns[0].val, "", self.PropertyOptions);
			var obsYear = new ConsoleApp.Filter(self.PropertyOptions[1].val, self.PropertyOptions[1].fns[0].val, "", self.PropertyOptions);
			var obsInsd = new ConsoleApp.Filter(self.PropertyOptions[2].val, self.PropertyOptions[2].fns[0].val, "", self.PropertyOptions);

			self.filters.push(obsCOB);
			self.filters.push(obsYear);
			self.filters.push(obsInsd);
		};

		

		self.Save = function()
		{
			var l = self.SavedSearches.length;
			self.SavedSearches.push({ Name: "Saved search " + (l + 1) });
		};

		self.SavedSearches = ko.observableArray();

		self.PropertyOptions = [{ val: "VALCob:COBId", name: "COB", fns: [{ val: "EQUALS", label: "Equals" }] },
                                { val: "VALAcctgYr:AccountYear", name: "Acc Yr", fns: [{ val: "EQUALS", label: "Equals" }] },
                                { val: "VALInsdNm:InsuredName", name: "Insured Name", fns: [{ val: "CONTAINS", label: "Contains" }] },
                                { val: "VALDsc:Description", name: "Description", fns: [{ val: "CONTAINS", label: "Contains" }] },
                                { val: "VALBkrPsu:BrokerPseudonym", name: "Broker Pseudonym", fns: [{ val: "CONTAINS", label: "Contains" }] },
                                { val: "VALUwr:UnderwriterCode", name: "Underwriter Code", fns: [{ val: "EQUALS", label: "Equals" }] }];

		self.Query = function() {
			alert(self.FilterQuery());
		};

		return self;
	};
});
