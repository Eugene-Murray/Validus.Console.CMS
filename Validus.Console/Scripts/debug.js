
//* Start DEBUG 
$(function()
{
	var debugSubmissions = [];//["CA", "EN", "FI", "HM", "ME", "PV"];

	function OpenDebugSubmission(debugSubmission)
	{
		$(".val-actionmenu a.val-debug-submission-" + debugSubmission).trigger("click");
	}

	for (var submissionIter in debugSubmissions)
	{
		OpenDebugSubmission(debugSubmissions[submissionIter]);
	}
});
// End DEBUG */

$(".val-actionmenu a.val-debug-submission-CA1").click(function()
{
	Val_AddTab("New Submission", "/submission/_templateCA", true, function(newTab)
	{
		var vmSubmission = new ConsoleApp.vmSubmissionCA(null, newTab.attr("id"), false),
			vmOption1 = vmSubmission.Model.Options()[0],
			vmQuote1 = vmOption1.CurrentVersion().Quotes()[0];

		vmSubmission.Model.InsuredId(222312);
		vmSubmission.Model.BrokerSequenceId("900");
		vmSubmission.Model.UnderwriterCode("DZS");
		vmSubmission.Model.LeaderNo("3623");
		vmSubmission.Model.Domicile("ID");
		vmSubmission.Model.Brokerage(15);
		vmSubmission.Model.QuotingOfficeId("LON");

		vmQuote1.COBId("AV");
		vmQuote1.MOA("FC");
		vmQuote1.OriginatingOfficeId("LON");
		vmQuote1.LimitCCY("GBP");
		vmQuote1.ExcessAmount(6000000);
		vmQuote1.LimitAmount(4000000);
		vmQuote1.InceptionDate(moment().format("DD MMM YYYY"));
		vmQuote1.Description("Debug CA1 Submission");

		newTab.data("val-submission", vmSubmission);

		window.debugSubmission1 = vmSubmission;

		console.log(window.debugSubmission1);
	});
});

$(".val-actionmenu a.val-debug-submission-EN1").click(function()
{
	Val_AddTab("New Submission", "/submission/_templateEN", true, function(newTab)
	{
		var vmSubmission = new ConsoleApp.vmSubmissionEN(null, newTab.attr("id"), false),
			vmOption1 = vmSubmission.Model.Options()[0],
			vmQuote1 = vmOption1.CurrentVersion().Quotes()[0];

		vmSubmission.Model.InsuredId(240425);
		vmSubmission.Model.BrokerSequenceId("834");
		vmSubmission.Model.UnderwriterCode("JMC");
		vmSubmission.Model.LeaderNo("2010");
		vmSubmission.Model.Domicile("SF");
		vmSubmission.Model.Brokerage(15);
		vmSubmission.Model.QuotingOfficeId("LON");

		vmQuote1.COBId("AR");
		vmQuote1.MOA("FC");
		vmQuote1.OriginatingOfficeId("LON");
		vmQuote1.LimitCCY("USD");
		vmQuote1.InceptionDate(moment().format("DD MMM YYYY"));
		vmQuote1.Description("Debug EN1 Submission");

		newTab.data("val-submission", vmSubmission);

		window.debugSubmission1 = vmSubmission;

		console.log(window.debugSubmission1);
	});
});

$(".val-actionmenu a.val-debug-submission-FI1").click(function()
{
	Val_AddTab("New Submission", "/submission/_templateFI", true, function(newTab)
	{
		var vmSubmission = new ConsoleApp.vmSubmissionFI(null, newTab.attr("id"), false),
			vmOption1 = vmSubmission.Model.Options()[0],
			vmQuote1 = vmOption1.CurrentVersion().Quotes()[0];

		vmSubmission.Model.InsuredId(87368);
		vmSubmission.Model.BrokerSequenceId(832);
		vmSubmission.Model.UnderwriterCode("AXW");
		vmSubmission.Model.Domicile("AD");
		vmSubmission.Model.Brokerage(20);
		vmSubmission.Model.QuotingOfficeId("LON");

		vmQuote1.COBId = ko.observable("CF");
		vmQuote1.MOA("FC");
		vmQuote1.OriginatingOfficeId("LON");
		vmQuote1.LimitCCY("USD");
		vmQuote1.InceptionDate(moment().format("DD MMM YYYY"));
		vmQuote1.Description("Debug FI1 Submission");

		newTab.data("val-submission", vmSubmission);

		window.debugSubmission1 = vmSubmission;

		console.log(window.debugSubmission1);
	});
});

$(".val-actionmenu a.val-debug-submission-HM1").click(function()
{
	Val_AddTab("New Submission", "/submission/_templateHM", true, function(newTab)
	{
		var vmSubmission = new ConsoleApp.vmSubmissionHM(null, newTab.attr("id"), false),
			vmOption1 = vmSubmission.Model.Options()[0],
			vmQuote1 = vmOption1.CurrentVersion().Quotes()[0];

		vmSubmission.Model.InsuredId(185556);
		vmSubmission.Model.BrokerSequenceId(974);
		vmSubmission.Model.UnderwriterCode("MDM");
		vmSubmission.Model.LeaderNo("1200");
		vmSubmission.Model.Domicile("GR");
		vmSubmission.Model.Brokerage(15);
		vmSubmission.Model.QuotingOfficeId("LON");

		vmQuote1.COBId("AT");
		vmQuote1.MOA("FC");
		vmQuote1.OriginatingOfficeId("LON");
		vmQuote1.LimitCCY("GBP");
		vmQuote1.ExcessAmount(5000000);
		vmQuote1.LimitAmount(10000000);
		vmQuote1.InceptionDate(moment().format("DD MMM YYYY"));
		vmQuote1.Description("Debug HM1 Submission");

		newTab.data("val-submission", vmSubmission);

		window.debugSubmission1 = vmSubmission;

		console.log(window.debugSubmission1);
	});
});

$(".val-actionmenu a.val-debug-submission-ME1").click(function()
{
	Val_AddTab("New Submission", "/submission/_templateME", true, function(newTab)
	{
		var vmSubmission = new ConsoleApp.vmSubmissionME(null, newTab.attr("id"), false),
			vmOption1 = vmSubmission.Model.Options()[0],
			vmQuote1 = vmOption1.CurrentVersion().Quotes()[0];

		vmSubmission.Model.InsuredId(185556);
		vmSubmission.Model.BrokerSequenceId(917);
		vmSubmission.Model.UnderwriterCode("IRP");
		vmSubmission.Model.Domicile("BD");
		vmSubmission.Model.BrokerContact("ALAN LANCASTER");
		vmSubmission.Model.Brokerage(25);
		vmSubmission.Model.QuotingOfficeId("LON");

		vmQuote1.COBId("CL");
		vmQuote1.MOA("FC");
		vmQuote1.OriginatingOfficeId("LON");
		vmQuote1.LimitCCY("GBP");
		vmQuote1.ExcessAmount(2500000);
		vmQuote1.LimitAmount(2500000);
		vmQuote1.InceptionDate(moment().format("DD MMM YYYY"));
		vmQuote1.Description("Debug ME1 Submission");

		newTab.data("val-submission", vmSubmission);

		window.debugSubmission1 = vmSubmission;

		console.log(window.debugSubmission1);
	});
});

$(".val-actionmenu a.val-debug-submission-PV1").click(function()
{
	Val_AddTab("Debug Submission", "/submission/_templatePV", true, function(newTab)
	{
		var vmSubmission = new ConsoleApp.vmSubmissionPV(null, newTab.attr("id"), false),
			vmOption1 = vmSubmission.Model.Options()[0],
			vmQuote1 = vmOption1.CurrentVersion().Quotes()[0];

		vmSubmission.Model.InsuredId(150915);
		vmSubmission.Model.BrokerSequenceId(82);
		vmSubmission.Model.UnderwriterCode("SPT");
		vmSubmission.Model.UnderwriterContactCode("SPT");
		vmSubmission.Model.Domicile("US");
		vmSubmission.Model.Brokerage(20);
		vmSubmission.Model.QuotingOfficeId("MIA");

		vmQuote1.COBId("AF");
		vmQuote1.MOA("FC");
		vmQuote1.OriginatingOfficeId("MIA");
		vmQuote1.LimitCCY("USD");
		vmQuote1.InceptionDate(moment().format("DD MMM YYYY"));
		vmQuote1.Description("Debug PV1 Submission");

		newTab.data("val-submission", vmSubmission);

		window.debugSubmission1 = vmSubmission;

		console.log(window.debugSubmission1);
	});
});

$(".val-actionmenu a.val-debug-submission-AH1").click(function () {
    Val_AddTab("Debug Submission", "/submission/_templateAH", true, function (newTab) {
        var vmSubmission = new ConsoleApp.vmSubmissionAH(null, newTab.attr("id"), false),
			vmOption1 = vmSubmission.Model.Options()[0],
			vmQuote1 = vmOption1.CurrentVersion().Quotes()[0];

        vmSubmission.Model.InsuredId(49589);
        vmSubmission.Model.BrokerSequenceId(261);
        vmSubmission.Model.UnderwriterCode("WZD");
        vmSubmission.Model.UnderwriterContactCode("WZD");
        vmSubmission.Model.LeaderNo("1493");
        vmSubmission.Model.Domicile("US");
        vmSubmission.Model.Brokerage(17);
        vmSubmission.Model.QuotingOfficeId("LON");

        vmQuote1.COBId("AH");
        vmQuote1.MOA("FC");
        vmQuote1.OriginatingOfficeId("LON");
        vmQuote1.LimitCCY("USD");
        vmQuote1.LimitAmount("10000000");
        vmQuote1.ExcessAmount("40000000");
        vmQuote1.InceptionDate(moment().format("DD MMM YYYY"));
        vmQuote1.Description("Debug AH1 Submission");

        newTab.data("val-submission", vmSubmission);

        window.debugSubmission1 = vmSubmission;

        console.log(window.debugSubmission1);
    });
});

//CN Contingency
$(".val-actionmenu a.val-debug-submission-CN1").click(function () {
    Val_AddTab("Debug Submission", "/submission/_templateCN", true, function (newTab) {
        var vmSubmission = new ConsoleApp.vmSubmissionCN(null, newTab.attr("id"), false),
			vmOption1 = vmSubmission.Model.Options()[0],
			vmQuote1 = vmOption1.CurrentVersion().Quotes()[0];

        vmSubmission.Model.InsuredId(179492);
        vmSubmission.Model.BrokerSequenceId(311);
        vmSubmission.Model.UnderwriterCode("AXN");
        vmSubmission.Model.UnderwriterContactCode("AXN");
        vmSubmission.Model.LeaderNo("1530");
        vmSubmission.Model.Domicile("UK");
        vmSubmission.Model.Brokerage(17);
        vmSubmission.Model.QuotingOfficeId("LON");

        vmQuote1.COBId("AD");
        vmQuote1.MOA("FC");
        vmQuote1.OriginatingOfficeId("LON");
        vmQuote1.LimitCCY("GBP");
        vmQuote1.LimitAmount("8000000");
        vmQuote1.ExcessAmount("8000000");
        vmQuote1.InceptionDate(moment().format("DD MMM YYYY"));
        vmQuote1.Description("Debug CN1 Submission");

        newTab.data("val-submission", vmSubmission);

        window.debugSubmission1 = vmSubmission;

        console.log(window.debugSubmission1);
    });
});

//CO Construction
$(".val-actionmenu a.val-debug-submission-CO1").click(function () {
    Val_AddTab("Debug Submission", "/submission/_templateCO", true, function (newTab) {
        var vmSubmission = new ConsoleApp.vmSubmissionCO(null, newTab.attr("id"), false),
			vmOption1 = vmSubmission.Model.Options()[0],
			vmQuote1 = vmOption1.CurrentVersion().Quotes()[0];

        vmSubmission.Model.InsuredId(115398);
        vmSubmission.Model.BrokerSequenceId(946);
        vmSubmission.Model.UnderwriterCode("DGT");
        vmSubmission.Model.UnderwriterContactCode("DGT");
        vmSubmission.Model.LeaderNo("1530");
        vmSubmission.Model.Domicile("CA");
        vmSubmission.Model.Brokerage(14.5);
        vmSubmission.Model.QuotingOfficeId("LON");

        vmQuote1.COBId("AG");
        vmQuote1.MOA("FP");
        vmQuote1.OriginatingOfficeId("LON");
        vmQuote1.LimitCCY("CAD");
        vmQuote1.LimitAmount("1500000");
        vmQuote1.ExcessAmount("45000000");
        vmQuote1.InceptionDate(moment().format("DD MMM YYYY"));
        vmQuote1.Description("Debug CO1 Submission");

        newTab.data("val-submission", vmSubmission);

        window.debugSubmission1 = vmSubmission;

        console.log(window.debugSubmission1);
    });
});

$(".val-actionmenu a.val-debug-submission-WK1").click(function () {
    Val_AddTab("Debug Submission", "/submission/_templateWK", true, function (newTab) {
        var vmSubmission = new ConsoleApp.vmSubmissionWK(null, newTab.attr("id"), false),
			vmOption1 = vmSubmission.Model.Options()[0],
			vmQuote1 = vmOption1.CurrentVersion().Quotes()[0];

        vmSubmission.Model.InsuredId(73187);
        vmSubmission.Model.BrokerSequenceId(328);
        vmSubmission.Model.UnderwriterCode("JRB");
        vmSubmission.Model.UnderwriterContactCode("JRB");
        vmSubmission.Model.LeaderNo("1476");
        vmSubmission.Model.Domicile("NL");
        vmSubmission.Model.Brokerage(18);
        vmSubmission.Model.QuotingOfficeId("LON");

        vmQuote1.COBId("AK");
        vmQuote1.MOA("FC");
        vmQuote1.OriginatingOfficeId("LON");
        vmQuote1.LimitCCY("EUR");
        vmQuote1.LimitAmount("10000000");
        vmQuote1.ExcessAmount("50000000");
        vmQuote1.InceptionDate(moment().format("DD MMM YYYY"));
        vmQuote1.Description("Debug WK1 Submission");

        newTab.data("val-submission", vmSubmission);

        window.debugSubmission1 = vmSubmission;

        console.log(window.debugSubmission1);
    });
});