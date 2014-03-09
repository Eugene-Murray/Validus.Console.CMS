using System.Web.Optimization;

namespace Validus.Console
{
	public class BundleConfig
	{
		// For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
		public static void RegisterBundles(BundleCollection bundles)
		{
			//BundleTable.EnableOptimizations = true;

			// TODO: bundles.Add(new ScriptBundle("~/bundles/css").Include
			// TODO: bundles.Add(new ScriptBundle("~/bundles/js").Include

			bundles.Add(new ScriptBundle("~/bundles/min").Include(
				"~/scripts/lib/jquery-{version}.js",
				"~/scripts/lib/jquery-ui-{version}.js",
                "~/scripts/lib/amplify.js",
				"~/scripts/lib/moment.js",
				"~/scripts/lib/auto-numeric.js",
				"~/scripts/lib/knockout-{version}.js",
				"~/scripts/lib/knockout-dirtyflag.js",
				"~/scripts/lib/bootstrap.js",
				"~/scripts/lib/bootstrap-typeahead.js",
				"~/scripts/lib/kendo.dataviz.js",
				"~/scripts/lib/toastr.custom.js",
				"~/scripts/lib/jquery.pubsub.js",
				"~/scripts/lib/jquery.datatables.js",
                "~/scripts/lib/jquery.bootstrap.datatables.js",
                "~/scripts/lib/select2.js",
                "~/scripts/lib/underscore.js",
                "~/scripts/lib/infuser.js",
                "~/scripts/lib/trafficcop.js",
                "~/scripts/lib/koexternaltemplateengine.js",
                "~/scripts/lib/advanced.js",
                "~/scripts/lib/wysihtml5-0.3.0.js"
                ));

			bundles.Add(new ScriptBundle("~/bundles/app").Include(
				"~/scripts/app/helpers.js",
				// TODO: "~/scripts/app/knockout-*",
				"~/scripts/app/ko.initialisedatepickers.js", // TODO: Remove
				"~/scripts/app/ko.initialisepane.js", // TODO: Remove
				"~/scripts/app/ko.initialisetabs.js", // TODO: Remove
				"~/scripts/app/ko.bootstrap-carousel.js", // TODO: Merge into knockout-bootstrap
				"~/scripts/app/ko.bootstrap-tabs.js", // TODO: Merge into knockout-bootstrap
				"~/scripts/app/ko.dirtyflag.js", // TODO: Remove and use koLite DirtyFlag ?
				"~/scripts/app/ko.dumpobservable.js",
				"~/scripts/app/ko.cancelbubbleclickevent.js",
				"~/scripts/app/ko.pagegrid.js", // TODO: Rename knockout-pagegrid
				"~/scripts/app/knockout-autonumeric.js",
				"~/scripts/app/knockout-datatables.js",
				// TODO: "~/scripts/app/knockout-datepicker.js",
                "~/scripts/app/knockout-bootstrap-typeahead.js",
                "~/scripts/app/knockout-select2.js",
                "~/scripts/app/knockout-validation.js",
                "~/scripts/app/knockout-wysihtml5.js"));

			bundles.Add(new ScriptBundle("~/bundles/vm").Include(
				// TODO: "~/scripts/app/dtos/*",
				// TODO: "~/scripts/app/models/*",
				// TODO: "~/scripts/app/vmadmin*", ???
                // TODO: "~/scripts/app/vmmanage*")); ???
                "~/scripts/app/Repositories/adminConfig.js",
                "~/scripts/app/Repositories/adminTeamRepository.js", 
                "~/scripts/app/vmtemplatebase.js", 
                "~/scripts/app/vmhome.js",
                "~/scripts/app/vmdataviz.js",
                "~/scripts/app/vmworldcheck.js",
				"~/scripts/app/vmsubmission*",
				"~/scripts/app/dtos/teammembershipteamdto.js",
				"~/scripts/app/dtos/teammembershipdto.js",
				"~/scripts/app/dtos/basicuserdto.js",
				"~/scripts/app/dtos/userdto.js",
				"~/scripts/app/dtos/linkdto.js",
				"~/scripts/app/dtos/teamdto.js",
				"~/scripts/app/dtos/cobdto.js",
				"~/scripts/app/dtos/defaultunderwriterdto.js",
				"~/scripts/app/dtos/officedto.js",
				"~/scripts/app/dtos/teamlinksdto.js",
				"~/scripts/app/dtos/teamquotetemplatesdto.js",
				"~/scripts/app/dtos/teamappacceleratorsdto.js",
				"~/scripts/app/dtos/marketwordingsettingdto.js",
				"~/scripts/app/dtos/teammarketwordingsdto.js",
				"~/scripts/app/dtos/teamtermsnconditionwordingsdto.js",
				"~/scripts/app/dtos/termsnconditionwordingsettingdto.js",
				"~/scripts/app/dtos/subjecttoclausewordingsettingdto.js",
                "~/scripts/app/dtos/warrantywordingsettingdto.js",
				"~/scripts/app/dtos/teamsubjecttoclausewordingsdto.js",
                "~/scripts/app/dtos/teamwarrantywordingsdto.js",
				"~/scripts/app/dtos/submissiondto.js",
                "~/scripts/app/dtos/HomePageSectionDto.js",
                "~/scripts/app/dtos/PageTemplateDto.js",
                "~/scripts/app/dtos/PageTemplatesDto.js",
                "~/scripts/app/models/SiteConfigTeam.js",
                "~/scripts/app/models/PageSectionItem.js",
                "~/scripts/app/models/TemplateData.js",
				"~/scripts/app/models/adminview.js",
				"~/scripts/app/models/accelerator.js",
				"~/scripts/app/models/audittrail.js",
				"~/scripts/app/models/quotetemplate.js",
				"~/scripts/app/models/marketwording.js",
				"~/scripts/app/models/termsnconditionwording.js",
				"~/scripts/app/models/subjecttoclausewording.js",
                "~/scripts/app/models/warrantyWording.js",
                "~/scripts/app/models/filter.js",
				"~/scripts/app/vmadminindex.js", // TODO: Rename to vmadmin
				"~/scripts/app/vmmanageteams.js",
				"~/scripts/app/vmmanageusers.js",
				"~/scripts/app/vmmanagelinks.js",
				"~/scripts/app/vmmanageaccelerators.js",
				"~/scripts/app/vmmanagequotetemplates.js",
				"~/scripts/app/vmmanagemarketwordings.js",
                "~/scripts/app/vmmanagemarketwordings.js",
				"~/scripts/app/vmmanagetermsnconditionwordings.js",
				"~/scripts/app/vmmanageunderwritersignature.js",
				"~/scripts/app/vmmanagesubjecttoclausewordings.js",
                "~/scripts/app/vmmanagewarrantywordings.js",
                "~/scripts/app/vmSiteConfigurationBase.js",
                "~/scripts/app/vmSiteConfiguration.js"));

			bundles.Add(new ScriptBundle("~/bundles/main").Include(
				"~/scripts/resources.js",
				"~/scripts/main.js",
				"~/scripts/debug.js",
                "~/scripts/templateAfterRenderDomFunctions.js")); 

            bundles.Add(new ScriptBundle("~/bundles/home").Include(
                "~/scripts/inithome.js"));

			bundles.Add(new StyleBundle("~/bundles/css").Include(
				"~/content/css/bootstrap.themed.css",
				"~/content/css/bootstrap-responsive.css",
				"~/content/css/jquery.bootstrap.datatables.css",
				"~/content/css/toastr.custom.css",
				"~/content/css/jquery-ui-1.10.0.custom.css",
				"~/content/css/jquery.ui.1.10.0.ie.css",
				"~/content/css/bootstrap.custom.css",
				"~/content/css/kendo.dataviz.blueopal.css",
                "~/content/css/select2.css",
                "~/content/css/select2-bootstrap.css",
				"~/content/css/main.css"));
		}
	}
}