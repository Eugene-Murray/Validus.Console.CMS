
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
			
		}
	} else {
		CloseTab(tabContentId);
		
		
	}
}

function GarbageCollect(submisionVM) {

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











function SelectRow(row)
{
	//  Remove selected class from all other rows on home page
	$("#tab1-home tr.ui-selected").removeClass("ui-selected");

	//  Add selected class to the clicked row
	row.addClass("ui-selected");
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