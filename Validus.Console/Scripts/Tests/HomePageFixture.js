window.onload = function()
{
	console.log('onload');
};

window.onunload = function()
{
	console.log('onunload');
};

window.onresize = function()
{
	console.log('onresize');
};

window.onscroll = function()
{
	console.log('onscroll');
};

$(document).ready(function()
{
	console.log("jquery document ready!");
	
	console.log('******************');
	console.table("window:");
	console.table(window);
	console.table("window.screen:");
	console.table(window.screen);
	console.table("window.document:");
	console.table(window.document);
});






(function($)
{
	module('Home Page Fixture');


	


	//test('PageEvents', function() {
		
		
	//});

	//test('LoadRequiredScripts_Success', function()
	//{
	//	// Assign
	//	debugger;
		
	//	// Act
	//	var head = document.getElementsByTagName('head')[0],
	//	script = document.createElement('script');

	//	var scriptUrls = [{ 'src': '../app/helpers.js' },
	//		{ 'src': '../main.js' },
	//		{ 'src': '../app/helpers.js' },
	//		{ 'src': '../app/vmSubmission.js' },
	//		{ 'src': '../app/vmSubmissionAH.js' },
	//		{ 'src': '../app/vmSubmissionCA.js' },
	//		{ 'src': '../app/vmSubmissionCM.js' },
	//		{ 'src': '../app/vmSubmissionCN.js' },
	//		{ 'src': '../app/vmSubmissionCO.js' },
	//		{ 'src': '../app/vmSubmissionEN.js' },
	//		{ 'src': '../app/vmSubmissionFI.js' },
	//		{ 'src': '../app/vmSubmissionHM.js' },
	//		{ 'src': '../app/vmSubmissionME.js' },
	//		{ 'src': '../app/vmSubmissionPV.js' },
	//		{ 'src': '../app/vmSubmissionWK.js' },
	//		{ 'src': '../app/knockout-autonumeric.js' },
	//		{ 'src': '../app/knockout-bootstrap-typeahead.js' },
	//		{ 'src': '../app/knockout-bootstrap.js' },
	//		{ 'src': '../app/knockout-datatables.js' },
	//		{ 'src': '../app/knockout-datepicker.js' },
	//		{ 'src': '../app/knockout-select2.js' },
	//		{ 'src': '../app/knockout-validation.js' },
	//		{ 'src': '../app/knockout-wysihtml5.js' },
	//		{ 'src': '../app/ko.bootstrap-carousel.js' },
	//		{ 'src': '../app/ko.bootstrap-tabs.js' },
	//		{ 'src': '../app/ko.bootstrap-tabs.js' },
			
	//		{ 'src': '../app/vmHome.js' }
	//	];

	//	$.each(scriptUrls, function(index, url)
	//	{
	//		script.src = url.src;
	//		head.appendChild(script);
	//	});

	//	// Assert
	//	var vmHome = ConsoleApp.vmHome;
	//});

	//test('ClearSearchField_Success', function()
	//{
	//	// Assign
	//	debugger;
	//	var vmHome = ConsoleApp.vmHome;
	//	vmHome.Keywords("Some Key Words");
	//	var textTxtField = $('<input type="text"/>');
	//	var clickEvent = $.Event("click");
	//	var expectedResult = "";
	//	var testBtn = $('<button/>',
	//	{
    //		text: 'Test',
    //		click: function() { ClearSearchField(textTxtField, this); }
	//	});


	//	// Act
	//	testBtn.trigger(clickEvent);

	//	// Assert
	//	equal(vmHome.Keywords(), expectedResult, "Pass - Keywords field has been cleared");

	//});


}(jQuery));