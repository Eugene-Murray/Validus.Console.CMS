$(function () {


    var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

    ConsoleApp.vmManageUnderwriterSignature = new function () {

        var self = this;

        self.teamList = ko.observableArray();
        self.selectedTeam = ko.observable();
        self.InitializationDataLoaded = false;

        self.PreInitPubSub = function()
        {
        	self.GetTeamList();
        };
	    
        self.Initialize = function()
        {
        	if (!self.InitializationDataLoaded)
        	{
        		// Team data is retrieved via PubSub in PreInit...
        		self.InitializationDataLoaded = true;
        	}
        };
	    
        self.GetTeamList = function()
        {
        	amplify.subscribe(ConsoleApp.adminConfig.pubSub_BasicTeamList, function(data)
        	{
        		self.teamList(data);
        	});
        };

        self.Model =
        {
            TeamId: ko.observable(0),
            UnderwriterCode: ko.observable(""),
            Signature: ko.observable("")
        };

        self.Functions = {
            /*
                Bootstrap typeahead call-back for when a underwriter search term yield no results.
            */
            InvalidUnderwriterSelected: function (element, options, koId, koValue, koDependents) {
                if (ko.isObservable(koId)) koId(-1);
                if (ko.isObservable(koValue)) koValue(-1);
            }
        };
        
        self.selectedTeam.subscribe(function (selectedTeam) {
            self.Model.TeamId(selectedTeam);
            self.Model.Signature("");
        });
        
        self.Model.UnderwriterCode.subscribe(function () {
            self.Model.Signature("");
        });

      

        self.GetUnderwriterTeamSignature = function () {

            var data = { underwriterCode: self.Model.UnderwriterCode(), teamId: self.Model.TeamId() };

            var ajaxConfig = { Url: "/Admin/GetUnderwriterTeamSignature", VerbType: "GET", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (jdata) {
                if (jdata.TeamId == 0 || jdata.UnderwriterCode == null) {
                    toastr.info("Underwriter Team Signature not found");
                } else {
                    self.Model.TeamId(jdata.TeamId);
                    self.Model.UnderwriterCode(jdata.UnderwriterCode);
                    self.Model.Signature(jdata.Signature);
                    toastr.info("Underwriter Team Signature successfully loaded");
                }
            });
        };

        self.CreateOrEditUnderwriterTeamSignature = function () {

            var data = ko.toJSON(self.Model);

            if (self.Model.TeamId() == 0 || self.Model.UnderwriterCode() == null) {
                toastr.info("Please choose underwiter and team");
            } else {
                var ajaxConfig = { Url: "/Admin/CreateOrEditUnderwriterTeamSignature", VerbType: "POST", Data: data };

                var response = ConsoleApp.AjaxHelper(ajaxConfig);

                response.success(function () {
                    toastr.info("Underwriter Team Signature successfully updated");
                });

            }

        };

        return self;
    };

});