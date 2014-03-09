$(function () {

	var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

	ConsoleApp.vmDataViz = function()
	{
		//var self = ConsoleApp.vmHome; // TODO: inherit from home if want to use any of the home sections
		var self = new ConsoleApp.vmTemplateBase();
		self.TemplatedPageTitle = 'Data Visualization'; // [Console].[dbo].[TemplatedPages]

		self.Initialize = function(domId)
		{
			self.BindKO(domId);
			self.InitilizeBase(self.TemplatedPageTitle);

			$(document).ready(self.SetPieChart());
			$(document).bind("kendo:skinChange", self.SetPieChart());
			
		};

		self.SetPieChart = function() {
			$("#chart").kendoChart({
				title: {
					position: "bottom",
					text: "Share of Internet Population Growth, 2007 - 2012"
				},
				legend: {
					visible: false
				},
				chartArea: {
					background: ""
				},
				seriesDefaults: {
					labels: {
						visible: true,
						background: "transparent",
						template: "#= category #: #= value#%"
					}
				},
				series: [{
					type: "pie",
					startAngle: 150,
					data: [{
							category: "Asia",
							value: 53.8,
							color: "#9de219"
						}, {
							category: "Europe",
							value: 16.1,
							color: "#90cc38"
						}, {
							category: "Latin America",
							value: 11.3,
							color: "#068c35"
						}, {
							category: "Africa",
							value: 9.6,
							color: "#006634"
						}, {
							category: "Middle East",
							value: 5.2,
							color: "#004d38"
						}, {
							category: "North America",
							value: 3.6,
							color: "#033939"
						}]
				}],
				tooltip: {
					visible: true,
					format: "{0}%"
				}
			});

		};

		
		
		return self;
	};
});


	