$(function () {

    var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

    ConsoleApp.vmAdminIndex = function () {
        var self = this;

        self.views = ko.observableArray([
			new ConsoleApp.View("Site Configuration", "/Admin/SiteConfiguration", ConsoleApp.vmSiteConfiguration, true, null),
			new ConsoleApp.View("Teams", "/Admin/ManageTeams", ConsoleApp.vmManageTeams, false, ConsoleApp.vmManageTeams.Initialize),
            new ConsoleApp.View("Users", "/Admin/ManageUsers", ConsoleApp.vmManageUsers, false, ConsoleApp.vmManageUsers.Initialize),
            new ConsoleApp.View("Links", "/Admin/ManageLinks", ConsoleApp.vmManageLinks, false, ConsoleApp.vmManageLinks.Initialize),
            new ConsoleApp.View("Quote Templates", "/Admin/ManageQuoteTemplates", ConsoleApp.vmManageQuoteTemplates, false, ConsoleApp.vmManageQuoteTemplates.Initialize),
            new ConsoleApp.View("Accelerators", "/Admin/ManageAccelerators", ConsoleApp.vmManageAccelerators, false, ConsoleApp.vmManageAccelerators.Initialize),
            new ConsoleApp.View("Market Wordings", "/Admin/ManageMarketWordings", ConsoleApp.vmManageMarketWordings, false, ConsoleApp.vmManageMarketWordings.Initialize),
            new ConsoleApp.View("Terms N ConditionWordings", "/Admin/ManageTermsNConditionWordings", ConsoleApp.vmManageTermsNConditionWordings, false, ConsoleApp.vmManageTermsNConditionWordings.Initialize),
            new ConsoleApp.View("Subjectivities", "/Admin/ManageSubjectToClauseWordings", ConsoleApp.vmManageSubjectToClauseWordings, false, ConsoleApp.vmManageSubjectToClauseWordings.Initialize),
            new ConsoleApp.View("Warranties", "/Admin/ManageWarrantyWordings", ConsoleApp.vmManageWarrantyWordings, false, ConsoleApp.vmManageWarrantyWordings.Initialize),
            new ConsoleApp.View("Underwriter Signature", "/Admin/ManageUnderwriterSignature", ConsoleApp.vmManageUnderwriterSignature, false, ConsoleApp.vmManageUnderwriterSignature.Initialize)
        ]);

        self.selectedView = ko.observable(new ConsoleApp.View("Site Configuration", "/Admin/SiteConfiguration", ConsoleApp.vmSiteConfiguration, true));
        

    	// Events
        self.click_GoToUserView = function (e) {
            if (e.LogonName != null) {
                self.selectedView(self.views()[2]); // Navigate to the ManageUser View
                ConsoleApp.vmManageUsers.Initialize({ pageMode: 'EDIT_FROM_TEAMPAGE', selectedUser: e.LogonName });
            }
        };

        // Subscribe
	    self.selectedView.subscribe(function(data) {
	    	if (self.selectedView().initilizeViewCallback)
	    		self.selectedView().initilizeViewCallback();

	    	// TODO: Should not need to loop through every view, especially when active is already found
		    $.each(self.views(), function(key, view)
		    {
		    	view.active(data.title === view.title);
		    });
	    });

        return self;
    };
});