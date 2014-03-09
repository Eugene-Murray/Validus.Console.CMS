$(function () {

    var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

    ConsoleApp.vmManageAccelerators = new function () {
        var self = this;

        self.teamList = ko.observableArray();
        self.allAcceleratorsList = ko.observableArray([new ConsoleApp.Accelerator()]);
        self.acceleratorsForTeamSelectList = ko.observableArray();
        self.teamAcceleratorsList = ko.observableArray([]);
        self.selectedTeam = ko.observable();
        self.showImageProcessing_LoadingAppAccelerators = ko.observable('block');
        self.editAcceleratorButton_Status = ko.observable(false);
        self.saveTeamAcceleratorsButton_Status = ko.observable(false);
        self.createButtonVisible = ko.observable(true);
        self.editButtonVisible = ko.observable(true);
        self.createEditTitle = ko.observable(true);
        // Selected
        self.selectedTeamAccelerator = ko.observable(new ConsoleApp.Accelerator());
        self.selectedAllAccelerator = ko.observable(new ConsoleApp.Accelerator());
        self.selectedacceleratorForTeamSelectList = ko.observable();
	    
        self.InitializationDataLoaded = false;

        self.PreInitPubSub = function()
        {
        	self.GetTeamList();
        };

        self.Initialize = function () {
        	if (!self.InitializationDataLoaded)
        	{
        		self.GetAccelerators();
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

        self.SaveNewAccelerator = function () {

            var data = ko.toJSON(self.selectedAllAccelerator());

            var ajaxConfig = { Url: "/Admin/CreateAccelerator", VerbType: "POST", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                self.allAcceleratorsList.unshift(new ConsoleApp.Accelerator()
                        .Id(data.Id)
                        .HomepageUrl(data.HomepageUrl)
                        .DisplayName(data.DisplayName)
                        .DisplayIcon(data.DisplayIcon)
                        .ActivityCategory(data.ActivityCategory)
                        .ActivityActionPreview(data.ActivityActionPreview)
                        .ActivityActionExecute(data.ActivityActionExecute)
                );

                self.selectedAllAccelerator(new ConsoleApp.Accelerator());
                toastr.info("Accelerator successfully created");

                $('#CreateEditAccelerator_ModalAlert').modal('hide');
            });
        };

        self.EditAccelerator = function () {

            var data = ko.toJSON(self.selectedAllAccelerator());

            var ajaxConfig = { Url: "/Admin/EditAccelerator", VerbType: "POST", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                toastr.info("Accelerator successfully updated");
                $('#CreateEditAccelerator_ModalAlert').modal('hide');
            });
        };

        self.DeleteAccelerator = function () {

            var data = ko.toJSON(self.selectedAllAccelerator());

            var ajaxConfig = { Url: "/Admin/DeleteAccelerator", VerbType: "DELETE", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                self.allAcceleratorsList.remove(function (item) { return item.Id == self.selectedAllAccelerator().Id; });

                toastr.info("Accelerator successfully deleted");
            });
        };


        self.GetAccelerators = function () {

            self.allAcceleratorsList.removeAll();

            var ajaxConfig = { Url: "/Admin/GetAccelerators", VerbType: "GET" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

            	if (data != null) {
            		var allAcceleratorsList = [];
                    $.each(data, function (key, value) {
                        allAcceleratorsList.push(new ConsoleApp.Accelerator()
                                        .Id(value.Id)
                                        .ActivityCategory(value.ActivityCategory)
                                        .HomepageUrl(value.HomepageUrl)
                                        .DisplayName(value.DisplayName)
                                        .DisplayIcon(value.DisplayIcon)
                                        .ActivityActionPreview(value.ActivityActionPreview)
                                        .ActivityActionExecute(value.ActivityActionExecute)

                        );
                    });
                    self.allAcceleratorsList(allAcceleratorsList);
            	}
                else {
                    toastr.info("No Accelerators Found");
                }

                self.showImageProcessing_LoadingAppAccelerators('none');

            });
        };

        self.GetAcceleratorsForTeam = function () {

            self.acceleratorsForTeamSelectList.removeAll();
            self.teamAcceleratorsList.removeAll();

            var ajaxConfig = { Url: "/Admin/GetAcceleratorsForTeam?teamId=" + self.selectedTeam(), VerbType: "GET", ContentType: "application/json;charset=utf-8" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                if (data.length > 0) {

                    var currentTeamAcceleratorsTempArray = ko.observableArray();
                    currentTeamAcceleratorsTempArray.removeAll();

	                var acceleratorsForTeamSelectList = [];
                    $.each(data, function (key, value) {

                        acceleratorsForTeamSelectList.push({ key: value.Id, name: value.ActivityCategory });

                        currentTeamAcceleratorsTempArray.push(new ConsoleApp.Accelerator()
                            .Id(value.Id)
                            .ActivityCategory(value.ActivityCategory));
                    });
                    self.acceleratorsForTeamSelectList(acceleratorsForTeamSelectList);

                    var differenceList = ko.utils.compareArrays(currentTeamAcceleratorsTempArray(), self.allAcceleratorsList());

                    var diffResults = ko.observableArray();
                    ko.utils.arrayForEach(differenceList, function (difference) {
                        if (difference.status === "deleted") {
                            diffResults.push(difference.value.Id());
                        }
                    });

	                var teamAcceleratorsList = [];
                    $.each(self.allAcceleratorsList(), function (key, value) {
                        if (diffResults.indexOf(value.Id()) == -1)

                            teamAcceleratorsList.push(new ConsoleApp.Accelerator()
                                .Id(value.Id())
                                .ActivityCategory(value.ActivityCategory()));
                    });
                    self.teamAcceleratorsList(teamAcceleratorsList);

                } else {
                    self.acceleratorsForTeamSelectList.push({ key: 0, name: "No Accelerators..." });

	                var teamAcceleratorsList = [];
                    $.each(self.allAcceleratorsList(), function (key, value) {
                        teamAcceleratorsList.push(new ConsoleApp.Accelerator()
                                .Id(value.Id())
                                .ActivityCategory(value.ActivityCategory()));
                    });
                    self.teamAcceleratorsList(teamAcceleratorsList);
                }

            });
        };

        self.SaveAcceleratorsForTeam = function () {

            var teamAppAcceleratorsDto = new ConsoleApp.TeamAppAcceleratorsDto();
            teamAppAcceleratorsDto.TeamId(self.selectedTeam());

	        var teamAppAcceleratorsIdList = [];
            $.each(self.acceleratorsForTeamSelectList(), function (key, value) {
                teamAppAcceleratorsIdList.push(value.key);
            });
            teamAppAcceleratorsDto.TeamAppAcceleratorsIdList(teamAppAcceleratorsIdList);

            var data = ko.toJSON(teamAppAcceleratorsDto);

            var ajaxConfig = { Url: "/Admin/SaveAcceleratorsForTeam", VerbType: "POST", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {
                toastr.info("Team Accelerators successfully updated");
            });
        };

        // Events
        self.click_RemoveAcceleratorFromTeam = function (e) {

            if (self.selectedacceleratorForTeamSelectList() !== undefined) {
                var removeItem = ko.utils.arrayFirst(self.allAcceleratorsList(), function (item) {
                    return (item.Id() == self.selectedacceleratorForTeamSelectList());
                });

                self.acceleratorsForTeamSelectList.remove(function (item) { return item.key == self.selectedacceleratorForTeamSelectList(); });

                self.teamAcceleratorsList.unshift(new ConsoleApp.Accelerator()
                                .Id(removeItem.Id())
                                .ActivityCategory(removeItem.ActivityCategory()));

            }
            else {
                alert("Select a accelerator to remove");
            }

        };

        self.click_AddAcceleratorToTeam = function (e) {

            self.acceleratorsForTeamSelectList.remove(function (item) { return item.key == '0'; });

            if (self.selectedTeam() !== undefined) {

                if (self.acceleratorsForTeamSelectList.indexOf(self.selectedTeamAccelerator().Id()) === -1) {
                    self.acceleratorsForTeamSelectList.push({ key: self.selectedTeamAccelerator().Id(), name: self.selectedTeamAccelerator().Id() });
                    self.teamAcceleratorsList.remove(self.selectedTeamAccelerator());
                    self.selectedTeamAccelerator(null);
                }
                else {
                    alert("Accelerator already added...");
                }
            }
            else {
                alert("Select a team first...");
            }

        };

        self.onClickTeamAcceleratorItem = function (e) {
            self.selectedTeamAccelerator(this);
        };

        self.onClickAllAcceleratorsItem = function (e) {
            self.selectedAllAccelerator(this);
        };

        self.click_DeleteAccelerator = function () {

            self.selectedAllAccelerator(this);

            var result = confirm("Delete Accelerator?");
            if (result) {
                self.DeleteAccelerator();
            }
        };

        self.click_SaveTeamAccelerators = function () {
            self.SaveAcceleratorsForTeam();
        };

        self.click_CancelCreateEdit = function () {
            self.selectedAllAccelerator(new ConsoleApp.Accelerator());
        };

        self.click_OpenCreateEditAppAcceleratorModal_Create = function (e) {
            self.createEditTitle("Create Accelerator");
            self.selectedAllAccelerator(new ConsoleApp.Accelerator());
            self.createButtonVisible(true);
            self.editButtonVisible(false);
            $('#CreateEditAccelerator_ModalAlert').modal('show');
        };

        self.click_OpenCreateEditAcceleratorModal_Edit = function (e) {
            self.createEditTitle("Edit Accelerator");
            self.createButtonVisible(false);
            self.editButtonVisible(true);

            $('#CreateEditAccelerator_ModalAlert').modal('show');
        };

        self.click_EditAccelerator = function (e) {
            self.EditAccelerator();
        };

        self.click_CreateAccelerator = function (e) {

            //var form = $('#formCreateEditAccelerator');

            //if (form.valid()) {
                self.SaveNewAccelerator();
            //}
        };


        // Subscribe
        self.selectedTeam.subscribe(function () {

            if (self.selectedTeam() !== undefined) {
                self.GetAcceleratorsForTeam();
            }
            else {
                self.acceleratorsForTeamSelectList.removeAll();
                self.teamAcceleratorsList.removeAll();
            }
        });


        return self;
    };

});