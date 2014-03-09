/* 
	TODO: Move/Remove global variables 
	
	These should be stored somewhere else or more likely removed altogether. If we really 
	want to retain a reference to an initialised jQuery datatable, then we should make sure 
	we do it for all of them consistently (perhaps something in the helper.js) other values 
	should be retrieved only when needed using val().
*/

var renewalsTable_HomeTab, renewalsTable, worklistTable_HomeTab, worklistTable, submissionsTable_HomeTab, submissionsTable, detailedRenewalsTable, detailedWorklistTable,
    searchTermDetailedRenewals, searchTermDetailedWorkFlow, searchTermDetailedSubmissions;

$(document).ready(function()
{
	SetupKOExternalTemplates();
	

	


	SetupPubSubEvents();

	SetupClickEvents();

	BindKOHomePage();
});

function SetupKOExternalTemplates() {
	infuser.defaults.templateUrl = "";
	infuser.defaults.templateSuffix = "";
	infuser.defaults.ajax.async = true;
	infuser.defaults.loadingTemplate.content = "<i class='icon-repeat'></i> Loading...";
}

function SetupPubSubEvents() {
	console.log('SetupPubSubEvents()');

	//  Refresh the renewals datatable if policy is renewed.
	$.pubsub.subscribe('policyRenewed', function(topic, msg)
	{
		if (renewalsTable)
			renewalsTable.fnDraw(false);

		if (renewalsTable_HomeTab)
			renewalsTable_HomeTab.fnDraw(false);

		$(".val-preview-pane").html('<div class="val-padding"><span>No preview loaded</span></div>');

		if (submissionsTable)
			submissionsTable.fnDraw(false);

		if (submissionsTable_HomeTab)
			submissionsTable_HomeTab.fnDraw(false);
	});
	//  Refresh the submission datatable if policy is created.
	$.pubsub.subscribe('submissionCreated', function(topic, msg)
	{
		if (submissionsTable)
			submissionsTable.fnDraw(false);
		
		if(submissionsTable_HomeTab)
			submissionsTable_HomeTab.fnDraw(false);
	});
}

function SetupClickEvents() {
	$(".val-actionmenu .val-new-submission").click(function()
	{
		var type = $(this).attr("href").trimStart("#"),
		    vmType = ConsoleApp["vmSubmission" + type];

		if (vmType) {
			var submissionType = null;

			var newTabCallback = function(newTab)
			{
				submissionType = new vmType(null, newTab.attr("id"), false);

				newTab.data("val-submission", submissionType);

				$("abbr[title]", newTab).tooltip();
			};

			var closeTabCallback = function(newTab)
			{
				return submissionType.UnloadConfirmation();
			};

			var title = $(this).text();

		    Val_AddTab(title.length > 14
                     ? title.substring(0, 12) + "..."
                     : title, "/submission/_template" + type, true, 
					newTabCallback, closeTabCallback);
		}
		else toastr.error("Submission view model 'vmSubmission" + type + "' not found");
	});

	$(".val-actionmenu .val-new-worldcheck").click(function()
	{
		var button = this;

		if ($(this).data("val-has-worldcheck-tab"))
		{
			if ($(this).data("val-has-worldcheck-tab") !== "")
			{
				$("a[href*='#" + $(this).data("val-has-worldcheck-tab") + "'][data-toggle='tab']").tab("show");
				return false;
			}
		}

		var tabId = Val_AddTab("WorldCheck", "/WorldCheck/_WorldCheckSearchForm", true, function(newTab)
		{

			var vmSearch = new vmWorldCheck(newTab.attr("id"));
			newTab.data("val-worldcheck-search", vmSearch);

		}, function() { $(button).data("val-has-worldcheck-tab", ""); });

		$(this).data("val-has-worldcheck-tab", tabId);


	});
}

function BindKOHomePage() {
	var homeTab = $("#tab1-home").get(0);
	ConsoleApp.vmHome.Initialize();
	if (homeTab)
		ko.applyBindings(ConsoleApp.vmHome, homeTab);
}
