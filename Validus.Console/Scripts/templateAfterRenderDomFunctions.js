/// Used by KO external templates to attach JQuery Dom events...
/// ie: afterRender: afterRenderSection1_DomFunction
/// <!-- ko template: {name: templateSection6, afterRender: afterRenderSection1_DomFunction } -->
/// <!-- /ko -->

function Setup_Search()
{
	Setup_SearchButton();

	var a = $("#advancedFilters");
	a.collapse({ toggle: false });
	//$("#searchArea").css("background-color", "rgb(240,240,240)");

	$("#advancedFiltersToggle").click(function()
	{
		a.collapse("toggle");
	});

	a.collapse().on('shown', function()
	{
		ConsoleApp.vmHome.ExpandButtonChevron("up");
		//$("#searchArea").css("background-color", "rgb(217, 217, 217)");
	});

	a.collapse().on('hidden', function()
	{
		ConsoleApp.vmHome.ExpandButtonChevron("down");
		//$("#searchArea").css("background-color", "rgb(240,240,240)");
	});

	$(".val-search .val-searchterm").keydown(function(e)
	{
		if (e.which === 13)
		{
			e.preventDefault();
			$(".val-search .val-searchbutton").trigger("click");
		}
	});

	$('.val-renewals-datatable .dropdown-menu, .val-workflowtasks-datatable .dropdown-menu').click(function(event)
	{
		event.stopPropagation();
	});

	window.EnableClearInput();
}

/// Called by Setup_Search()
function Setup_SearchButton()
{
	$("#searchArea .val-searchbutton").click(function(e)
	{
		e.preventDefault();
		//var searchBox = $("#searchArea .val-searchterm");
		//searchTerm = searchBox.val();
		if (ConsoleApp.vmHome.Keywords() !== undefined)
		{
			var trimmedTerm = ConsoleApp.vmHome.Keywords().replace(/\b([A-Z]{2})\*(\d{2})\b/gi, "").trim();

			if (/\b([A-Z]{2})\*(\d{2})\b/gi.test(ConsoleApp.vmHome.Keywords()))
			{
				var reference = RegExp.$1.toUpperCase(),
					year = moment(RegExp.$2, "YY").year();

				var gotCOB = false;
				var gotYear = false;
				ko.utils.arrayForEach(ConsoleApp.vmHome.filters(), function(filter)
				{
					var propInFilter = filter.Prop().toString().trim();
					if (propInFilter === ConsoleApp.vmHome.PropertyOptions[0].val)
					{
						filter.Val(reference);
						gotCOB = true;
					}
					else if (propInFilter === ConsoleApp.vmHome.PropertyOptions[1].val)
					{
						filter.Val(year);
						gotYear = true;
					}
				});

				if (!gotCOB)
				{
					var obsCOB = new ConsoleApp.Filter(ConsoleApp.vmHome.PropertyOptions[0].val, ConsoleApp.vmHome.PropertyOptions[0].fns[0].val, reference, ConsoleApp.vmHome.PropertyOptions);

					self.filters.push(obsCOB);
				}

				if (!gotYear)
				{
					var obsYear = new ConsoleApp.Filter(ConsoleApp.vmHome.PropertyOptions[1].val, ConsoleApp.vmHome.PropertyOptions[1].fns[0].val, year, ConsoleApp.vmHome.PropertyOptions);
					ConsoleApp.vmHome.filters.push(obsYear);
				}

				ConsoleApp.vmHome.Keywords(trimmedTerm);

				$("#advancedFilters").collapse("show");

				$("#advancedFiltersTable").popover(
					{
						animation: true,
						html: true,
						container: 'body',
						trigger: "manual",
						placement: "right",
						title: "Wildcards",
						//content: '<div id="advPop"><p>Wildcards (*) are only allowed at the end of a search word.</p><p>Your query has been translated into an advanced search.</p><button class="btn btn-primary">Okay</button><br /><input type="checkbox">Don\'t show this again</input></div>'
						content: '<div id="advPop"><p>Wildcards (*) are only allowed at the end of a search word.</p><p>Your query has been translated into an advanced search.</p><button class="btn btn-primary">Okay</button></div>'
					}).popover('show');

				setTimeout(function()
				{
					$("#advancedFiltersTable").popover("hide");
				}, 15000);

				var a = $("#advPop .btn-primary");
				a.click(function()
				{
					$("#advancedFiltersTable").popover("hide");
				});
			}
		}

		if (renewalsTable_HomeTab)
			renewalsTable_HomeTab.fnDraw(true);
		if (submissionsTable_HomeTab)
			submissionsTable_HomeTab.fnDraw(true);
		if (worklistTable_HomeTab)
			worklistTable_HomeTab.fnDraw(true);
		refiners = [];
		contentSources = [];
		Val_Search();
	});
}

function Setup_WorkFlowTable(isHomePageTab)
{

	$(".val-workflowtasks-datatable").on("click", "tr", function(event)
	{
		SelectRow($(event.target).parents("tr"));
	});

	function CreateDataTable()
	{
		return $(".val-workflowtasks-datatable").dataTable(
			{
				"sDom": "<'row-fluid'<'span12'lftrip>>",
				"fnPreDrawCallback": function(oSettings)
				{
					var oTable = $("#" + oSettings.sTableId),
						oProcessing = $("#" + oSettings.sTableId + "_processing"),
						oCaption = $("#" + oSettings.sTableId + " caption");

					$(oProcessing).appendTo(oCaption);
				},
				"oLanguage":
				{
					"sInfo": "_START_ to _END_ of _TOTAL_",
					"sInfoEmpty": "_START_ to _END_ of _TOTAL_",
					"sInfoFiltered": "_START_ to _END_ of _TOTAL_"
				},
				"bLengthChange": false,
				"bPaginate": true,
				"bFilter": false,
				"bProcessing": true,
				"bServerSide": true,
				"sAjaxSource": "/WorkItem/GetUserWorkflowItems",
				"fnRowCallback": function(nRow, aData, iIndex)
				{
					$(nRow).on("click", function(event)
					{
						$(".val-processing").removeClass("hide");

						Val_RefreshPreviewPane("/WorkItem/_Preview?Id=" + aData.SerialNumber, 'InitPV_Worklist__Preview');
					});

					return nRow;
				},
				"aoColumns": [
					{
						"mData": "StartDate",
						"sTitle": "Start Date",
						"sClass": "val-worklist-startdate"
					},
					{
						"mData": "PolicyID",
						"sTitle": "Policy Id",
						"bSortable": false,
						"sClass": "val-worklist-policyid"
					},
					{
						"mData": "Activity",
						"sTitle": "Activity",
						"sClass": "val-worklist-activity",
						"fnRender": function(oObj)
						{
							return '<div title="' + oObj.aData["Activity"] + '">' + oObj.aData["Activity"] + '</div>';
						}
					},
					{
						"mData": "Insured",
						"sTitle": "Insured",
						"bSortable": false,
						"fnRender": function(oObj)
						{
							return '<div title="' + oObj.aData["Insured"] + '">' + oObj.aData["Insured"] + '</div>';
						}
					}],
				"aoColumnDefs": [
					{
						"aTargets": [0],
						"sType": "uk_date",
						"fnRender": function(object, value)
						{
							return moment(value).format("DD MMM YYYY");
						}
					}],
				"fnServerParams": function(aoData)
				{
					aoData.push({ "name": "sSearch", "value": (ConsoleApp.vmHome.Keywords() ? ConsoleApp.vmHome.Keywords().replace(/["*]/gi, "").trim() : "") });
					//aoData.push({ "name": "applyProfileFilters", "value": ConsoleApp.SearchFiltersVM.RenApplyProfileFilters() });

					ko.utils.arrayForEach(ConsoleApp.vmHome.filters(), function(filter)
					{
						var filterVal = filter.Val().toString().trim();
						if (filterVal !== null && filterVal !== undefined && filterVal !== "")
						{
							var f = filter.Prop().split(":")[1] + ':' + filter.Fn() + ":" + filter.Val().toString().replace(/["]/gi, "");
							aoData.push({ "name": "extraFilters", "value": f });
						}
					});

					var activityFilter = $("#wfActivityFilter").val();
					aoData.push({ "name": "extraFilters", "value": "Activity:CONTAINS:" + activityFilter });
				}
			});
	};

	if (isHomePageTab)
		worklistTable_HomeTab = CreateDataTable();
	else
		worklistTable = CreateDataTable();

	Setup_WorkflowTasksdetailedTab(isHomePageTab);
}

/// Called by Setup_WorkFlowTable()
function Setup_WorkflowTasksdetailedTab(isHomePageTab)
{
	$(".val-add-workflowtasks-tab").click(function(e)
	{
		var button = this;

		if ($(this).data("val-has-workflow-tab"))
		{
			if ($(this).data("val-has-workflow-tab") !== "")
			{
				$("a[href*='#" + $(this).data("val-has-workflow-tab") + "'][data-toggle='tab']").tab("show");
				return false;
			}
		}

		var tabId = Val_AddTab("Workflow Tasks", "/WorkItem/_WorkflowTasksDetailed", true, function(newTab)
		{
			detailedWorklistTable = SetupWorkFlowDetailedDatatable();

			$(".val-search-workflow").on("click", function(e)
			{
				$(".val-searching-workflow").removeClass("hide");

				searchTermDetailedWorkFlow = $(".val-searchterm-workflow").val();

				detailedWorklistTable.fnDraw(true);
			});

			$(".val-searchterm-workflow").on("keydown", function(e)
			{
				if (e.which === 13)
				{
					e.preventDefault();

					$(".val-searching-workflow").removeClass("hide");

					searchTermDetailedWorkFlow = $(".val-searchterm-workflow").val();

					detailedWorklistTable.fnDraw(true);
				}
			});
		}, function() { $(button).data("val-has-workflow-tab", ""); });

		$(this).data("val-has-workflow-tab", tabId);
	});
}

function Setup_RenewalsTable(isHomePageTab)
{
	$(".val-renewals-datatable").on("click", "tr", function(event)
	{
		SelectRow($(event.target).parents("tr"));
	});

	function CreateDataTable() {
		return $(".val-renewals-datatable").dataTable(
			{
				"sDom": "<'row-fluid'<'span12'lftrip>>",
				"fnPreDrawCallback": function(oSettings) {
					var oTable = $("#" + oSettings.sTableId),
						oProcessing = $("#" + oSettings.sTableId + "_processing"),
						oCaption = $("#" + oSettings.sTableId + " caption");

					$(oProcessing).appendTo(oCaption);
				},
				"oLanguage":
				{
					"sInfo": "_START_ to _END_ of _TOTAL_",
					"sInfoEmpty": "_START_ to _END_ of _TOTAL_",
					"sInfoFiltered": "_START_ to _END_ of _TOTAL_"
				},
				"bLengthChange": false,
				"bPaginate": true,
				"bFilter": false,
				"bProcessing": true,
				"bServerSide": true,
				"sAjaxSource": "/Policy/_RenewalIndexJSON",
				"fnRowCallback": function(nRow, aData, iIndex) {
					$(nRow).on("click", function(event) {
						$(".val-processing").removeClass("hide");

						Val_RefreshPreviewPane("/Policy/_RenewalPreview?PolId=" + aData.PolicyId, 'InitPV_Renewal__Preview');
					});

					return nRow;
				},
				"aoColumns": [
					{
						"mData": "Underwriter",
						"sTitle": "Uwr",
						"sClass": "val-renewal-list-uwr"
					},
					{
						"mData": "InsuredName",
						"sTitle": "Insured",
						"fnRender": function(oObj) {
							return '<div title="' + oObj.aData["InsuredName"] + '">' + oObj.aData["InsuredName"] + '</div>';
						}
					},
					{
						"mData": "PolicyId",
						"sTitle": "Policy Id",
						"sClass": "val-renewal-policyid"
					},
					{
						"mData": "ExpiryDate",
						"sTitle": "Expiry Date",
						"sClass": "val-renewal-expydt"
					}],
				"aoColumnDefs": [
					{
						"aTargets": [3],
						"sType": "uk_date",
						"fnRender": function(object, value) {
							return moment(value).format("DD MMM YYYY");
						}
					}],
				"fnServerParams": function(aoData) {
					aoData.push({ "name": "sSearch", "value": (ConsoleApp.vmHome.Keywords() ? ConsoleApp.vmHome.Keywords().replace(/["*]/gi, "").trim() : "") });
					aoData.push({ "name": "expiryEndDate", "value": ConsoleApp.vmHome.RenewalLimitDate() });
					aoData.push({ "name": "applyProfileFilters", "value": ConsoleApp.vmHome.RenApplyProfileFilters() });
					aoData.push({ "name": "InclDeclar", "value": ConsoleApp.vmHome.RenewalInclDeclar() });

					ko.utils.arrayForEach(ConsoleApp.vmHome.filters(), function(filter) {
						var filterVal = filter.Val().toString().trim();
						if (filterVal !== null && filterVal !== undefined && filterVal !== "") {
							var f = filter.Prop().split(":")[1] + ':' + filter.Fn() + ":" + filter.Val().toString().replace(/["*]/gi, "");
							aoData.push({ "name": "extraFilters", "value": f });
						}
					});
				},
				"aaSorting": [[3, 'asc']]
			});
	};
	
	if (isHomePageTab)
		renewalsTable_HomeTab = CreateDataTable();
	else
		renewalsTable = CreateDataTable();

	Setup_RenewalsDetailedTab(isHomePageTab);
}

/// Called by Setup_RenewalsTable()
function Setup_RenewalsDetailedTab(isHomePageTab)
{
	$(".val-add-renewal-tab").click(function(e)
	{
		var button = this;

		if ($(this).data("val-has-renewal-tab"))
		{
			if ($(this).data("val-has-renewal-tab") !== "")
			{
				$("a[href*='#" + $(this).data("val-has-renewal-tab") + "'][data-toggle='tab']").tab("show");
				return false;
			}
		}

		var tabId = Val_AddTab("Renewals", "/Policy/_RenewalIndexDetailed", true, function(newTab)
		{
			detailedRenewalsTable = SetupRenewalsDetailedDatatable();

			$(".val-search-renewals").on("click", function(e)
			{
				$(".val-searching-renewals").removeClass("hide");

				searchTermDetailedRenewals = $(".val-searchterm-renewals").val();

				detailedRenewalsTable.fnDraw(true);
			});

			$(".val-searchterm-renewals").on("keydown", function(e)
			{
				if (e.which === 13)
				{
					e.preventDefault();

					$(".val-searching-renewals").removeClass("hide");

					searchTermDetailedRenewals = $(".val-searchterm-renewals").val();

					detailedRenewalsTable.fnDraw(true);
				}
			});
		}, function() { $(button).data("val-has-renewal-tab", ""); }); 

		$(this).data("val-has-renewal-tab", tabId);
	});
}

function Setup_RecentSubmissionsTable(isHomePageTab)
{
	$(".val-recentquotes-datatable").on("click", "tr", function(event)
	{
		SelectRow($(event.target).parents("tr"));
	});

	function CreateDataTable()
	{
		return $(".val-recentquotes-datatable").dataTable(
			{
				"sDom": "<'row-fluid'<'span12'lftrip>>",
				"fnPreDrawCallback": function(oSettings)
				{
					var oTable = $("#" + oSettings.sTableId),
						oProcessing = $("#" + oSettings.sTableId + "_processing"),
						oCaption = $("#" + oSettings.sTableId + " caption");

					$(oProcessing).appendTo(oCaption);
				},
				"oLanguage":
				{
					"sInfo": "_START_ to _END_ of _TOTAL_",
					"sInfoEmpty": "_START_ to _END_ of _TOTAL_",
					"sInfoFiltered": "_START_ to _END_ of _TOTAL_"
				},
				"bLengthChange": false,
				"bPaginate": true,
				"bFilter": false,
				"bProcessing": true,
				"bServerSide": true,
				"sAjaxSource": "/Submission/_IndexJSON",
				"fnRowCallback": function(nRow, aData, iIndex)
				{
					$(nRow).on("click", function(event)
					{
						$(".val-processing").removeClass("hide");
						var ajaxSource = "/Submission/_Preview?Id=" + aData.Id;
						Val_RefreshPreviewPane(ajaxSource, 'InitPV_Submission__Preview');
					});

					return nRow;
				},
				"aoColumns": [
					{
						"mData": "Id",
						"bVisible": false
					},
					{
						"mData": "InsuredName",
						"sTitle": "Insured",
						"fnRender": function(oObj)
						{
							var description = (oObj.aData["Description"] !== null) ? '.  Description: ' + oObj.aData["Description"] : '';
							return '<div title="Insured Name: ' + oObj.aData["InsuredName"] + description + '">' + oObj.aData["InsuredName"] + '</div>';
						}
					},
					{
						"mData": "BrokerPseudonym",
						"sTitle": "Broker"
					},
					{
						"mData": "InceptionDate",
						"sTitle": "Inception Date",
						"sClass": "val-renewal-expydt",
						"mRender": function(data, type, full)
						{
							return SetRecentSubmissionInceptionDate(data);
						}
					}],
				"aoColumnDefs": [
					{
						"aTargets": [3],
						"sType": "uk_date",
						"fnRender": function(object, value)
						{
							return (value ? moment(value).format("DD MMM YYYY") : "");
						}
					}],
				"fnServerParams": function(aoData)
				{
					aoData.push({ "name": "sSearch", "value": (ConsoleApp.vmHome.Keywords() ? ConsoleApp.vmHome.Keywords().replace(/["*]/gi, "").trim() : "") });
					aoData.push({ "name": "applyProfileFilters", "value": ConsoleApp.vmHome.SubApplyProfileFilters() });

					ko.utils.arrayForEach(ConsoleApp.vmHome.filters(), function(filter)
					{
						var filterVal = filter.Val().toString().trim();
						if (filterVal !== null && filterVal !== undefined && filterVal !== "")
						{
							var f = filter.Prop().split(":")[1] + ':' + filter.Fn() + ":" + filter.Val().toString().replace(/["*]/gi, "");
							aoData.push({ "name": "extraFilters", "value": f });
						}
					});

				},
				"aaSorting": [[0, 'desc']]
			});
	};
	
	if (isHomePageTab)
		submissionsTable_HomeTab = CreateDataTable();
	else
		submissionsTable = CreateDataTable();

	Setup_SubmissionsDetailedTab();
}

/// Called by Setup_RecentSubmissionsTable()
function Setup_SubmissionsDetailedTab(isHomePageTab)
{
	$(".val-add-submissions-detailed-tab").click(function(e)
	{
		var button = this;

		if ($(this).data("val-has-submission-tab"))
		{
			if ($(this).data("val-has-submission-tab") !== "")
			{
				$("a[href*='#" + $(this).data("val-has-submission-tab") + "'][data-toggle='tab']").tab("show");
				return false;
			}
		}

		var tabId = Val_AddTab("Submissions", "/Submission/_SubmissionIndexDetailed", true, function(newTab)
		{

			detailedSubmissionsTable = SetupSubmissionsDetailedDatatable();

			$(".val-search-submissions").on("click", function(e)
			{
				$(".val-searching-submissions").removeClass("hide");

				searchTermDetailedSubmissions = $(".val-searchterm-submissions").val();

				detailedSubmissionsTable.fnDraw(true);
			});

			$(".val-searchterm-submissions").on("keydown", function(e)
			{
				if (e.which === 13)
				{
					e.preventDefault();

					$(".val-searching-submissions").removeClass("hide");

					searchTermDetailedSubmissions = $(".val-searchterm-submissions").val();

					detailedSubmissionsTable.fnDraw(true);
				}
			});
		}, function() { $(button).data("val-has-submission-tab", ""); }); 

		$(this).data("val-has-submission-tab", tabId);
	});
}