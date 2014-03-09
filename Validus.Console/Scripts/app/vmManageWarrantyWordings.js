ko.observableArray.fn.setAt = function (index, value) {
    this.valueWillMutate();
    this()[index] = value;
    this.valueHasMutated();
};


$(function () {

    var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

    ConsoleApp.vmManageWarrantyWordings = new function () {
        var self = this;

        self.teamList = ko.observableArray();
        self.officeList = ko.observableArray();
        self.allWarrantyWordingsList = ko.observableArray([new ConsoleApp.WarrantyWording()]);
        self.warrantyWordingsForTeamOfficeSelectList = ko.observableArray();
        self.teamOfficeWarrantyWordingsList = ko.observableArray([]);
        self.selectedTeam = ko.observable();
        self.selectedOffice = ko.observable();
        self.showImageProcessing_LoadingWarrantyWordings = ko.observable('block');
        self.editWarrantyWordingButton_Status = ko.observable(false);
        self.saveTeamOfficeWarrantyWordingsButton_Status = ko.observable(false);
        self.createButtonVisible = ko.observable(true);
        self.editButtonVisible = ko.observable(true);
        self.createEditTitle = ko.observable(true);
        // Selected
        self.selectedTeamWarrantyWording = ko.observable(new ConsoleApp.WarrantyWording());
        self.selectedAllWarrantyWording = ko.observable(new ConsoleApp.WarrantyWording());
        self.selectedWarrantyWordingForTeamOfficeSelectList = ko.observable(-1);
	    
        self.InitializationDataLoaded = false;

        self.PreInitPubSub = function()
        {
			self.GetTeamList();
        };

        self.Initialize = function () {
        	if (!self.InitializationDataLoaded)
        	{
        		self.GetWarrantyWordings();
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

        self.SaveNewWarrantyWording = function () {

            var data = ko.toJSON(self.selectedAllWarrantyWording());

            var ajaxConfig = { Url: "/Admin/CreateWarrantyWording", VerbType: "POST", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                self.allWarrantyWordingsList.unshift(new ConsoleApp.WarrantyWording()
                        .Id(data.Id)
                        .Title(data.Title)
                );

                self.selectedAllWarrantyWording(new ConsoleApp.WarrantyWording());
                toastr.info("WarrantyWording successfully created");

                $('#CreateEditWarrantyWording_ModalAlert').modal('hide');
            });
        };

        self.EditWarrantyWording = function () {

            var data = ko.toJSON(self.selectedAllWarrantyWording());

            var ajaxConfig = { Url: "/Admin/EditWarrantyWording", VerbType: "POST", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                toastr.info("WarrantyWording successfully updated");
                $('#CreateEditWarrantyWording_ModalAlert').modal('hide');
            });
        };

        self.DeleteWarrantyWording = function () {

            var data = ko.toJSON(self.selectedAllWarrantyWording());

            var ajaxConfig = { Url: "/Admin/DeleteWarrantyWording", VerbType: "DELETE", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {
                if (data == "Success") {
                self.allWarrantyWordingsList.remove(function (item) { return item.Id == self.selectedAllWarrantyWording().Id; });

                toastr.info("Subjectivity successfully deleted");
                }
                else {
                    toastr.info("Subjectivity not deleted");
                }
            });
        };


        self.GetWarrantyWordings = function () {

            self.allWarrantyWordingsList.removeAll();

            var ajaxConfig = { Url: "/Admin/GetWarrantyWordings", VerbType: "GET" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);
            response.success(function (data) {

            	if (data != null) {
            		var allWarrantyWordingsList = [];
                    $.each(data, function (key, value) {
                        allWarrantyWordingsList.push(new ConsoleApp.WarrantyWording()
                                        .Id(value.Id)
                                        .Key(value.Key)
                                        .Title(value.Title)
                        );
                    });
                    self.allWarrantyWordingsList(allWarrantyWordingsList);
            	}
                else {
                    toastr.info("No WarrantyWordings Found");
                }


                self.showImageProcessing_LoadingWarrantyWordings('none');

            });
        };

        self.GetTeamsAndRelatedOffices = function()
        {
        	amplify.subscribe(ConsoleApp.adminConfig.pubSub_BasicTeamsAndRelatedOfficeList(), function(data)
        	{
        		self.teamList(data);
        	});
        };
        

        self.GetWarrantyWordingsForTeamOffice = function () {

            self.warrantyWordingsForTeamOfficeSelectList.removeAll();
            self.teamOfficeWarrantyWordingsList.removeAll();

            var ajaxConfig = { Url: "/Admin/GetWarrantyWordingsForTeamOffice?teamId=" + self.selectedTeam() + "&officeId=" + self.selectedOffice(), VerbType: "GET", ContentType: "application/json;charset=utf-8" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                if (data.length > 0) {

                    var currentTeamWarrantyWordingsTempArray = ko.observableArray();
                    currentTeamWarrantyWordingsTempArray.removeAll();

                    $.each(data, function (key, value) {

                        self.warrantyWordingsForTeamOfficeSelectList.push({ key: value.WarrantyWording.Id, name: value.WarrantyWording.Title, IsStrikeThrough: value.IsStrikeThrough });

                        currentTeamWarrantyWordingsTempArray.push(new ConsoleApp.WarrantyWording()
                            .Id(value.WarrantyWording.Id)
                            .Key(value.WarrantyWording.Key));
                    });

                    var differenceList = ko.utils.compareArrays(currentTeamWarrantyWordingsTempArray(), self.allWarrantyWordingsList());

                    var diffResults = ko.observableArray();
                    ko.utils.arrayForEach(differenceList, function (difference) {
                        if (difference.status === "deleted") {
                            diffResults.push(difference.value.Id());
                        }
                    });

	                var teamOfficeWarrantyWordingsList = [];
                    $.each(self.allWarrantyWordingsList(), function (key, value) {
                        if (diffResults.indexOf(value.Id()) == -1)

                            teamOfficeWarrantyWordingsList.push(new ConsoleApp.WarrantyWording()
                                .Id(value.Id())
                                .Title(value.Title()));
                    });
                    self.teamOfficeWarrantyWordingsList(teamOfficeWarrantyWordingsList);

                } else {
                    self.warrantyWordingsForTeamOfficeSelectList.push({ key: 0, name: "No WarrantyWordings...", IsStrikeThrough: false });

                    var teamOfficeWarrantyWordingsList = [];
                    $.each(self.allWarrantyWordingsList(), function (key, value) {
                        teamOfficeWarrantyWordingsList.push(new ConsoleApp.WarrantyWording()
                                .Id(value.Id())
                                .Title(value.Title()));
                    });
                    self.teamOfficeWarrantyWordingsList(teamOfficeWarrantyWordingsList);
                }
            });
        };

        self.SaveWarrantyWordingsForTeamOffice = function () {
            self.warrantyWordingsForTeamOfficeSelectList.remove(function (item) { return item.key == '0'; });
            var teamWarrantyWordingsDto = new ConsoleApp.TeamWarrantyWordingsDto();
            teamWarrantyWordingsDto.TeamId(self.selectedTeam());
            teamWarrantyWordingsDto.OfficeId(self.selectedOffice());

	        var warrantyWordingSettingDtoList = [];
            $.each(self.warrantyWordingsForTeamOfficeSelectList(), function (key, value) {
                warrantyWordingSettingDtoList.push(new ConsoleApp.WarrantyWordingSettingDto()
                    .Id(value.key)
                    .DisplayOrder(key + 1)
                    .IsStrikeThrough(value.IsStrikeThrough)
                );
            });
            teamWarrantyWordingsDto.WarrantyWordingSettingDtoList(warrantyWordingSettingDtoList);

            var data = ko.toJSON(teamWarrantyWordingsDto);

            var ajaxConfig = { Url: "/Admin/SaveWarrantyWordingsForTeamOffice", VerbType: "POST", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {
                toastr.info("Team WarrantyWordings successfully updated");
            });
        };

        // Events
        self.click_RemoveWarrantyWordingFromTeam = function (e) {

            if (self.selectedTeam() !== undefined && self.selectedOffice() !== undefined && self.selectedWarrantyWordingForTeamOfficeSelectList() !== undefined && self.selectedWarrantyWordingForTeamOfficeSelectList() > 0) {
                var removeItem = ko.utils.arrayFirst(self.allWarrantyWordingsList(), function (item) {
                    return (item.Id() == self.selectedWarrantyWordingForTeamOfficeSelectList());
                });

                self.warrantyWordingsForTeamOfficeSelectList.remove(function (item) { return item.key == self.selectedWarrantyWordingForTeamOfficeSelectList(); });

                self.teamOfficeWarrantyWordingsList.unshift(new ConsoleApp.WarrantyWording()
                                .Id(removeItem.Id())
                                .Title(removeItem.Title()));
                self.selectedWarrantyWordingForTeamOfficeSelectList(-1);
            }
            else {
                alert("Select a Market wording to remove");
            }

        };

        self.click_AddWarrantyWordingToTeamOffice = function (e) {

            self.warrantyWordingsForTeamOfficeSelectList.remove(function (item) { return item.key == '0'; });

            if (self.selectedTeam() !== undefined && self.selectedOffice() !== undefined && self.selectedTeamWarrantyWording().Id() > 0) {

                if (self.warrantyWordingsForTeamOfficeSelectList.indexOf(self.selectedTeamWarrantyWording().Id()) === -1) {
                    self.warrantyWordingsForTeamOfficeSelectList.push({ key: self.selectedTeamWarrantyWording().Id(), name: self.selectedTeamWarrantyWording().Title(), IsStrikeThrough: false });
                    self.teamOfficeWarrantyWordingsList.remove(self.selectedTeamWarrantyWording());
                    self.selectedTeamWarrantyWording(new ConsoleApp.WarrantyWording());
                }
                else {
                    alert("WarrantyWording already added...");
                }
            }
            else {
                alert("Select a team/office/WarrantyWording first...");
            }

        };

        self.onClickTeamOfficeWarrantyWordingItem = function (e) {
            self.selectedTeamWarrantyWording(this);
        };

        self.onClickSelectedTeamOfficeWarrantyWordingItem = function (item) {
            if (item.key > 0) self.selectedWarrantyWordingForTeamOfficeSelectList(item.key);
        };

        self.onClickSelectedTeamOfficeWarrantyWordingItemToggleIsStrikeThrough = function (item) {
            if (item.key > 0) {
                var changeItem = ko.utils.arrayFirst(self.warrantyWordingsForTeamOfficeSelectList(), function (item2) {
                    return (item2.key == item.key);
                });

                var index = self.warrantyWordingsForTeamOfficeSelectList.indexOf(changeItem);
                self.warrantyWordingsForTeamOfficeSelectList.remove(function (item2) { return item2.key == item.key; });
                self.warrantyWordingsForTeamOfficeSelectList.splice(index, 0, changeItem);

                self.selectedWarrantyWordingForTeamOfficeSelectList(item.key);
            }
        };

        self.click_selectedWarrantyWordingForTeamOfficeSelectListMoveUp = function () {
            var moveItem = ko.utils.arrayFirst(self.warrantyWordingsForTeamOfficeSelectList(), function (item2) {
                return (item2.key == self.selectedWarrantyWordingForTeamOfficeSelectList());
            });


            var i = self.warrantyWordingsForTeamOfficeSelectList.indexOf(moveItem);
            if (i >= 1) {
                var array = self.warrantyWordingsForTeamOfficeSelectList();
                self.warrantyWordingsForTeamOfficeSelectList.splice(i - 1, 2, array[i], array[i - 1]);
            }
        };

        self.click_selectedWarrantyWordingForTeamOfficeSelectListMoveDown = function () {
            var moveItem = ko.utils.arrayFirst(self.warrantyWordingsForTeamOfficeSelectList(), function (item2) {
                return (item2.key == self.selectedWarrantyWordingForTeamOfficeSelectList());
            });


            var i = self.warrantyWordingsForTeamOfficeSelectList.indexOf(moveItem);
            if (i >= 0 && self.warrantyWordingsForTeamOfficeSelectList().length != i + 1) {
                var array = self.warrantyWordingsForTeamOfficeSelectList();
                self.warrantyWordingsForTeamOfficeSelectList.splice(i, 2, array[i + 1], array[i]);
            }
        };

        self.onClickAllWarrantyWordingsItem = function (e) {
            self.selectedAllWarrantyWording(this);
        };

        self.click_DeleteWarrantyWording = function () {

            self.selectedAllWarrantyWording(this);

            var result = confirm("Delete WarrantyWording?");
            if (result) {
                self.DeleteWarrantyWording();
            }
        };

        self.click_SaveTeamOfficeWarrantyWordings = function () {
            self.SaveWarrantyWordingsForTeamOffice();
        };

        self.click_CancelCreateEdit = function () {
            self.selectedAllWarrantyWording(new ConsoleApp.WarrantyWording());
        };

        self.click_OpenCreateEditWarrantyWordingModal_Create = function (e) {
            self.createEditTitle("Create WarrantyWording");
            self.selectedAllWarrantyWording(new ConsoleApp.WarrantyWording());
            self.createButtonVisible(true);
            self.editButtonVisible(false);
            $('#CreateEditWarrantyWording_ModalAlert').modal('show');
        };

        self.click_OpenCreateEditWarrantyWordingModal_Edit = function (e) {
            self.createEditTitle("Edit WarrantyWording");
            self.createButtonVisible(false);
            self.editButtonVisible(true);

            $('#CreateEditWarrantyWording_ModalAlert').modal('show');
        };

        self.click_EditWarrantyWording = function (e) {
            self.EditWarrantyWording();
        };

        self.click_CreateWarrantyWording = function (e) {

            //var form = $('#formCreateEditWarrantyWording');

            //if (form.valid()) {
                self.SaveNewWarrantyWording();
            //}
        };


        // Subscribe
        self.selectedTeam.subscribe(function () {
            if (self.selectedTeam() !== undefined) {
                $.each(self.teamList(), function (index, value) {
                    if (value.Id == self.selectedTeam()) {
                        self.officeList.removeAll();
                        self.selectedTeamWarrantyWording(new ConsoleApp.WarrantyWording());
                        self.selectedWarrantyWordingForTeamOfficeSelectList(-1);
	                    var officeList = [];
                        $.each(value.relatedOffices, function(officekey, officevalue)
                        {
                            officeList.push({ Id: officevalue.Id, Title: officevalue.Title });
                        });
                        self.officeList(officeList);
                    };
                });
            }
            else {
                self.warrantyWordingsForTeamOfficeSelectList.removeAll();
                self.teamOfficeWarrantyWordingsList.removeAll();
            }
        });
        self.selectedOffice.subscribe(function () {

            if (self.selectedOffice() !== undefined) {
                self.selectedTeamWarrantyWording(new ConsoleApp.WarrantyWording());
                self.selectedWarrantyWordingForTeamOfficeSelectList(-1);
                self.GetWarrantyWordingsForTeamOffice();
            }
            else {
                self.warrantyWordingsForTeamOfficeSelectList.removeAll();
                self.teamOfficeWarrantyWordingsList.removeAll();
            }
        });

        return self;
    };

});

