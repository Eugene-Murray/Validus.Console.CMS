// Note: This script is not included in BundleConfig.cs but in Admin/index.cshtml 
// because it populates all of the admin data on startup of the admin section of 
// the site


$(document).ready(function()
{
	// Setup KO External Templates
	infuser.defaults.templateUrl = ""; 
	infuser.defaults.templateSuffix = "";
	infuser.defaults.ajax.async = true;
	infuser.defaults.loadingTemplate.content = "<i class='icon-repeat'></i> Loading...";

	// Setup screen PubSub subscriptions
	ConsoleApp.vmSiteConfiguration.PreInitPubSub();
	ConsoleApp.vmManageTeams.PreInitPubSub();
	ConsoleApp.vmManageUsers.PreInitPubSub();
	ConsoleApp.vmManageLinks.PreInitPubSub();
	ConsoleApp.vmManageQuoteTemplates.PreInitPubSub();
	ConsoleApp.vmManageAccelerators.PreInitPubSub();
	ConsoleApp.vmManageMarketWordings.PreInitPubSub();
	ConsoleApp.vmManageTermsNConditionWordings.PreInitPubSub();
	ConsoleApp.vmManageSubjectToClauseWordings.PreInitPubSub();
	ConsoleApp.vmManageWarrantyWordings.PreInitPubSub();
	ConsoleApp.vmManageUnderwriterSignature.PreInitPubSub();


	$.when(ConsoleApp.adminTeamRepository.Initialize())
		.done(function(data)
		{
			// Initilize first admin screen - ie: get the data fro thaqt screen
			ConsoleApp.vmSiteConfiguration.Initialize();
			// Every other screen is Initialized when called...

			ConsoleApp.GetUserTeamLinksHelper();
		});

	// KO Bind
	ko.applyBindings(ConsoleApp.vmAdminIndex(), document.getElementById("outerContainer"));

	
});