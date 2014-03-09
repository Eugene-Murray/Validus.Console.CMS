
$(document).ready(function()
{
	// TODO: InitPV_About__AboutModal
	$(".val-about-modal").modal("hide");
	$(".val-about-modal").on("show", function()
	{
		var aboutBody = $(".val-about-modal .modal-body [class^='span']");
		
		if (aboutBody.children(".val-loading"))
			aboutBody.load("/About/_AboutModal");
	});
	$(".val-accelerator-modal").modal("hide");
	$(".val-accelerator-modal").on('show', function () {
	    var acceleratorBody = $(".val-accelerator-modal .modal-body [class^='span']");
	    acceleratorBody.empty();
	    acceleratorBody.load("/Admin/AcceleratorIndex");
	});
	$(".val-console-menu a[href='#About']").click(function(e)
	{
		$(".val-about-modal").modal("toggle");

		e.preventDefault();
	});

	Val_InitTabs();

	SetupTemplatedPageTabs();

});



function SetRecentSubmissionInceptionDate(data)
{
	if (data != '01 Jan 0001')
		return data;
	else
		return "";
}





// TODO: What does this do ?
// TODO: Move to helpers js ?
jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg)
{
	return function(elem)
	{
		return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
	};
});

function highlightWords(line, word)
{
	var regex = new RegExp('(' + word + ')', 'gi');
	return line.replace(regex, '<span class="search-found">$1</span>');
}



// TODO: Create generic tab script - Part 1
function Val_InitTabs()
{
	$(".tabbable .nav a[data-toggle='tab']").each(function(e)
	{
		Val_InitTab($(this));
	});
}

// TODO: Create generic tab script - Part 2
function Val_InitTab(tabLink, tabCallback)
{
	tabLink.on("show", function(e)
	{
		var tabIdIndex = e.target.href.indexOf("#"),
	        tabContent = $(e.target.href.substring(tabIdIndex));

		if (tabContent.html() === "")
		{
			tabContent.append(
                  '<div class="row-fluid">'
                        + '<div class="span12">'
                                + '<img class="val-loading val-loading-100x100" src="/content/images/loading-100x100.gif" alt="Loading..." title="Loading..." />'
                        + '</div>'
                + '</div>'
                  );

			if (amplify.request.resources[e.target.pathname])
			{

			} else
			{
				amplify.request.define(e.target.pathname, "ajax", {
					url: e.target.href,
					type: "GET",
					cache: true,
					global: false
				});
			}
			amplify.request({
				resourceId: e.target.pathname,
				success: function(data, status, xhr)
				{
					tabContent.html(data);
					if (tabCallback)
					{
						tabCallback(tabContent, data, status, xhr);
					}
				},
				error: function(data, status, xhr)
				{
				    tabContent.html(status);
					if (tabCallback)
					{
					    tabCallback(tabContent, status, status, xhr);
					}
				}
			}
		    );


			//tabContent.load(e.target.href, function(response, status, xhr)
			//{
			//	if (status === "error")
			//	{
			//		$(this).html("Error: " + xhr.status + " " + xhr.statusText);
			//	}

			//	if (tabCallback) {
			//		tabCallback(tabContent, response, status, xhr);
			//	}
			//});
		}
	}).click(function(e)
	{
		e.preventDefault();

		$(this).tab("show");
	});
}

// TODO: Create generic tab script - Part 3
function Val_CloseTab(tabContentId, tabCancelCloseCallback, submisionVM) {
	if (tabCancelCloseCallback) {
		var close = tabCancelCloseCallback();

		if (close === true || close === undefined) {
			CloseTab(tabContentId);
			GarbageCollect(submisionVM);
		}
	} else {
		CloseTab(tabContentId);
		
		GarbageCollect(submisionVM);
	}
}

function GarbageCollect(submisionVM) {
	if (!submisionVM) return;
	// First attempt at helping the GC remove the submission from memory
	submisionVM.createBrokerContactAlreadyShown = undefined;
	submisionVM.Defaults = undefined;
	delete submisionVM.Defaults;
	submisionVM.DirtyFlag = undefined;
	delete submisionVM.DirtyFlag;
	submisionVM.Form = undefined;
	delete submisionVM.Form;
	submisionVM.Functions = undefined;
	delete submisionVM.Functions;
	submisionVM.Id = undefined;
	delete submisionVM.Id;
	submisionVM.Model = undefined;
	delete submisionVM.Model;
	submisionVM.prototype = undefined;
	submisionVM = undefined;
}

function CloseTab(tabContentId)
{
	var tabPanel = $("#" + tabContentId).parents(".tabbable"),
				tabNav = $("li a[href$='#" + tabContentId + "']", tabPanel),
				tabPane = $("#" + tabContentId, tabPanel);

	$("a:first[data-toggle='tab']", tabPanel).tab("show");

	ko.cleanNode(tabNav[0]);
	ko.cleanNode(tabPane[0]);

	tabNav.remove();
	tabPane.remove();
}

// TODO: Create generic tab script - Part 4
function Val_AddTab(tabLabel, tabContentUrl, tabShow, tabCallback, tabCloseCallback)
{
	var tabPanel = $(".tabbable:first"),
		tabNav = $(".nav-tabs:first", tabPanel),
		tabContent = $(".tab-content:first", tabPanel),
		tabCount = tabNav.data("tab-count"),
		tabId = "";

	if (!tabCount) tabCount = $("a[data-toggle='tab']", tabNav).length;

	tabNav.data("tab-count", ++tabCount);

	tabId = "tab" + tabCount + "-" + encodeURIComponent(tabContentUrl).replace(/[%]/g, "");

	tabNav.append(
		'<li>'
			+ '<a href="' + tabContentUrl + '#' + tabId + '" data-toggle="tab">'
				+ '<button type="button" class="close">'
					+ '<i class="icon-remove"></i>'
				+ '</button>'
				+ '<span>' + tabLabel + '</span>'
			+ '</a>'
		+ '</li>');

	tabContent.append('<div id="' + tabId + '" class="tab-pane new-tab-margin"></div>');

	var tabLink = $("a:last[data-toggle='tab']", tabNav);

	tabLink.children("button").click(function(e)
	{
		Val_CloseTab(tabId, tabCloseCallback);
	});

	Val_InitTab(tabLink, tabCallback);

	if (tabShow === true)
	{
		tabLink.tab("show");
	}

	return tabId;
}

function LogWorldCheckMatch(uid)
{
	if (uid !== "")
	{
		$.ajax(
        {
        	url: "/WorldCheck/_LogWorldCheckMatch/",
        	type: "POST",
        	data: { uid: uid },
        	dataType: "html",
        	success: function()
        	{
        		toastr.success("WorldCheck Match Logged");
        	}
        });
	}
}









function SelectRow(row)
{
	//  Remove selected class from all other rows on home page
	$("#tab1-home tr.ui-selected").removeClass("ui-selected");

	//  Add selected class to the clicked row
	row.addClass("ui-selected");
}



/* 
	TODO: Implement ALL view initialisation functions (list A-Z) ?

	InitV_Home_Index
	etc ...
*/

/* 
	TODO: Implement ALL partial-view initialisation functions (list A-Z)

	* = Refactor/revise implementation

	InitPV_About__AboutModal
	InitPV_Admin__ManageLinks
	InitPV_Admin__ManageTeams
	InitPV_Admin__ManageUsers
	InitPV_Insured__InsuredDetailsMinimal
	InitPV_Insured__InsuredDetailsMinimalByCobs
	InitPV_Insured__InsuredDetailsPreview *
	InitPV_Insured__InsuredDetailsPreviewByCob
	InitPV_Policy__RenewalIndexDetailed
	InitPV_Policy__RenewalPreview *
	InitPV_Submission__OptionTemplate
	InitPV_Submission__Preview
	InitPV_Submission__QuoteTemplate
	InitPV_Submission__Template
	InitPV_UwDocument__Details
	InitPV_UwDocument__Search
	InitPV_WorkItem__Preview
	InitPV_WorkItem__WorkflowTasksDetailed
	InitPV_WorldCheck__WorldCheckDetailsModal
	InitPV_WorldCheck__WorldCheckSearchMatches
*/
function InitPV_Insured__InsuredDetailsPreview(target)
{
	InitInsuredLossRatiosPreviewDatatable(target);
}

function SwapInsuredDetailsPreview(target, insuredName, data) {
    if (data === 'ALL') {
        $(target).empty();
        $(target).load("/Insured/_InsuredDetailsPreview?insuredName=" + insuredName, function () {
            $(this).find(".val-insured-detailed-datatable").find("caption").append("<span style='float:right;'><input type='radio' name='InsLR' value='All' style='margin-top: 0px;' checked  onclick ='if (this.checked) amplify.publish( \"InsLRFilter\", $(this).parents(\"div.insureddetails\"),\"" + insuredName + "\", \"ALL\" )'> All <input type='radio' name='InsLR' value='MyTeam' style='margin-top: 0px;' onclick ='if (this.checked) amplify.publish( \"InsLRFilter\",$(this).parents(\"div.insureddetails\"),\"" + insuredName + "\", \"MYTEAM\" )'> My Team </span>");
            InitPV_Insured__InsuredDetailsPreview(this);
            amplify.unsubscribe('InsLRFilter', SwapInsuredDetailsPreview);
            amplify.subscribe('InsLRFilter', SwapInsuredDetailsPreview);
        });

    }
    else if (data === 'MYTEAM') {
        $(target).empty();
        $(target).load("/Insured/_InsuredDetailsPreviewByCob?insuredName=" + insuredName, function () {
            $(this).find(".val-insured-detailed-datatable").find("caption").append("<span style='float:right;'><input type='radio' name='InsLR' value='All' style='margin-top: 0px;' onclick ='if (this.checked) amplify.publish( \"InsLRFilter\", $(this).parents(\"div.insureddetails\"),\"" + insuredName + "\", \"ALL\" )'> All <input type='radio' name='InsLR' value='MyTeam' style='margin-top: 0px;' checked onclick ='if (this.checked) amplify.publish( \"InsLRFilter\",$(this).parents(\"div.insureddetails\"),\"" + insuredName + "\", \"MYTEAM\" )'> My Team </span>");
            InitPV_Insured__InsuredDetailsPreview(this);
            amplify.unsubscribe('InsLRFilter', SwapInsuredDetailsPreview);
            amplify.subscribe('InsLRFilter', SwapInsuredDetailsPreview);
        });

    }
}
// TODO: Wrong function name according to partial-view

function InitPV_Renewal__Preview(target)
{
	var filterInsLRByCob = $.grep(ConsoleApp.vmHome.UserFilters().Teams, function(team) { return team.FilterInsLRByTeam; }).length > 0,
	    insuredName = $("span.insuredname", target).text();
	
	$("a.val-renewal-renew, button.val-renewal-renew", target).click(function()
	{
		OpenRenewalTab($(this).data("renewalpolicyid"), $(this).data("submissiontypeid"));
	});

	$(".val-open-dmssearch", target).click(function(e)
	{
		// TODO: Create a generic OpenDMS() function in helper.js
		window.open($(this).attr("data-target"), "_blank");
	});

	if (filterInsLRByCob)
	{
		$(target).find("div.insureddetails").load("/Insured/_InsuredDetailsPreviewByCob?insuredName=" + encodeURIComponent(insuredName), function()
		{
		    $(this).find(".val-insured-detailed-datatable").find("caption").append("<span style='float:right;'><input type='radio' name='InsLR' value='All' style='margin-top: 0px;' onclick ='if (this.checked) amplify.publish( \"InsLRFilter\", $(this).parents(\"div.insureddetails\"),\"" + encodeURIComponent(insuredName) + "\", \"ALL\" )'> All <input type='radio' name='InsLR' value='MyTeam' style='margin-top: 0px;' checked onclick ='if (this.checked) amplify.publish( \"InsLRFilter\",$(this).parents(\"div.insureddetails\"),\"" + encodeURIComponent(insuredName) + "\", \"MYTEAM\" )'> My Team </span>");

			InitPV_Insured__InsuredDetailsPreview(this);
			
			amplify.unsubscribe('InsLRFilter', SwapInsuredDetailsPreview);
			amplify.subscribe('InsLRFilter', SwapInsuredDetailsPreview);
		});
	}
	else
	{
		$(target).find("div.insureddetails").load("/Insured/_InsuredDetailsPreview?insuredName=" + encodeURIComponent(insuredName), function()
		{
		    $(this).find(".val-insured-detailed-datatable").find("caption").append("<span style='float:right;'><input type='radio' name='InsLR' value='All' style='margin-top: 0px;' checked onclick ='if (this.checked) amplify.publish( \"InsLRFilter\", $(this).parents(\"div.insureddetails\"),\"" + encodeURIComponent(insuredName) + "\", \"ALL\" )'> All <input type='radio' name='InsLR' value='MyTeam' style='margin-top: 0px;' onclick ='if (this.checked) amplify.publish( \"InsLRFilter\",$(this).parents(\"div.insureddetails\"),\"" + encodeURIComponent(insuredName) + "\", \"MYTEAM\" )'> My Team </span>");

			InitPV_Insured__InsuredDetailsPreview(this);
			
			amplify.unsubscribe('InsLRFilter', SwapInsuredDetailsPreview);
			amplify.subscribe('InsLRFilter', SwapInsuredDetailsPreview);
		});
	}
}

function InitPV_Submission__Preview(target)
{
	var tableConfig = new BaseDataTable();

	$(target).find(".val-submission-quotes-datatable").dataTable(tableConfig);

	$(target).find(".val-edit-submission", ".val-preview-pane-container").click(SubmissionEditButton_Click);
	//SetupEditSubmissionBtn(".val-edit-submission");

	var filterInsLRByCob = $.grep(ConsoleApp.vmHome.UserFilters().Teams, function(team) {
	    return team.FilterInsLRByTeam;
	}).length > 0 ? true : false;
    
	var insuredName = $(target).find("span.insuredname").text();
	if (filterInsLRByCob === true) {
	    $(target).find("div.insureddetails").load("/Insured/_InsuredDetailsPreviewByCob?insuredName=" + encodeURIComponent(insuredName), function () {
	        $(this).find(".val-insured-detailed-datatable").find("caption").append("<span style='float:right;'><input type='radio' name='InsLR' value='All' style='margin-top: 0px;' onclick ='if (this.checked) amplify.publish( \"InsLRFilter\", $(this).parents(\"div.insureddetails\"),\"" + encodeURIComponent(insuredName) + "\", \"ALL\" )'> All <input type='radio' name='InsLR' value='MyTeam' style='margin-top: 0px;' checked onclick ='if (this.checked) amplify.publish( \"InsLRFilter\",$(this).parents(\"div.insureddetails\"),\"" + encodeURIComponent(insuredName) + "\", \"MYTEAM\" )'> My Team </span>");
	        InitPV_Insured__InsuredDetailsPreview(this);
	        amplify.unsubscribe('InsLRFilter', SwapInsuredDetailsPreview);
	        amplify.subscribe('InsLRFilter', SwapInsuredDetailsPreview);
	    });
	} else {
	    $(target).find("div.insureddetails").load("/Insured/_InsuredDetailsPreview?insuredName=" + encodeURIComponent(insuredName), function () {
	        $(this).find(".val-insured-detailed-datatable").find("caption").append("<span style='float:right;'><input type='radio' name='InsLR' value='All' style='margin-top: 0px;' checked onclick ='if (this.checked) amplify.publish( \"InsLRFilter\", $(this).parents(\"div.insureddetails\"),\"" + encodeURIComponent(insuredName) + "\", \"ALL\" )'> All <input type='radio' name='InsLR' value='MyTeam' style='margin-top: 0px;' onclick ='if (this.checked) amplify.publish( \"InsLRFilter\",$(this).parents(\"div.insureddetails\"),\"" + encodeURIComponent(insuredName) + "\", \"MYTEAM\" )'> My Team </span>");
	        InitPV_Insured__InsuredDetailsPreview(this);
	        amplify.unsubscribe('InsLRFilter', SwapInsuredDetailsPreview);
	        amplify.subscribe('InsLRFilter', SwapInsuredDetailsPreview);
	    });
	}
	
}

function SubmissionEditButton_Click()
{
	var id = $(this).data("submission-id"),
		type = $(this).data("submission-type"),
		isReadOnly = $(this).data("isreadonly"),
		vmSubmission = ConsoleApp["vmSubmission" + type];

	if (vmSubmission)
	{
		var title = $(this).attr("title");
		
		Val_AddTab(title.length > 14
			? title.substring(0, 12) + "..."
			: title, "/submission/_template" + type, true, function(newTab)
		{
				newTab.data("val-submission", new vmSubmission(id, newTab.attr("id"), false, isReadOnly));
		});
	}
	else toastr.error("Submission view model 'vmSubmission" + type + "' not found");
}

function InitPV_Worklist__Preview(target)
{
	// TODO: All links/buttons should be initialised using a single function
	$(".val-open-webpolicy", target).click(function(e)
	{
		OpenWebPolicy($(this).attr("data-target"));
	});

	$(".val-open-viewflow", target).click(function(e)
	{
		OpenViewflow($(this).attr("data-target"));
	});

	$(".val-open-task", target).click(function(e)
	{
		OpenWorkflowTask($(this).attr("data-target"));
	});

	$(".val_open_tasklist_page", target).click(function(e)
	{
		// TODO: Create a generic OpenTaskList() function in helper.js
		window.open($(this).attr("data-target"), "_blank");
	});

	$(".val-open-dmssearch", target).click(function(e)
	{
		// TODO: Create a generic OpenDMS() function in helper.js
		window.open($(this).attr("data-target"), "_blank");
	});
}

function InitPV_InsuredSearchResult__Preview(target)
{

	var insuredName = $(target).find("span.insuredname").text();
	$(target).find("div.insureddetails").load("/Insured/_InsuredDetailsPreview?insuredName=" + encodeURIComponent(insuredName), function()
	{
	    $("a.val-renewal-renew, button.val-renewal-renew", target).click(function () {
	        OpenRenewalTab($(this).data("renewalpolicyid"), $(this).data("submissiontypeid"));
	    });
	    
		InitPV_Insured__InsuredDetailsPreview(this);
	});
}

function SetupTemplatedPageTabs() {

	$(".templated-page-Link").click(function()
	{
		var templateName = $(this).data("template-name");
		var templateViewModel = $(this).data("template-viewmodel");
		var templatedPageId = $(this).data("template-id");

		if (templateViewModel.indexOf('vm') == -1)
			templateViewModel = "vm" + templateViewModel;

		Val_AddTab(templateName, "/Templates/BaseTemplate", true, function(newTab) {
			var viewModel = null;

			if (typeof (ConsoleApp[templateViewModel]) !== 'undefined'
				&& typeof (ConsoleApp[templateViewModel]) === 'function')
			{
				// Instantiate the viewModel if it exists
				viewModel = new ConsoleApp[templateViewModel]();
				viewModel.Initialize(newTab.attr("id"));
			} else {
				// If no viewModel.js exists - just use the base viewModel
				viewModel = new ConsoleApp.vmTemplateBase();
				viewModel.BindKO(newTab.attr("id"));
				viewModel.InitilizeBase(templateName);
			}

			newTab.data("val-" + templateName, viewModel);
		});
	});
}

//popover
(function()
{

	var pt = $.fn.popover.Constructor.prototype.show;
	$.fn.popover.Constructor.prototype.show = function()
	{
		pt.call(this);
		if (this.options.afterShowed)
		{
			this.options.afterShowed();
		}
	};

})();