﻿$(function () {

    var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

    ConsoleApp.vmManageLinks = new function () {
        var self = this;

        self.teamList = ko.observableArray();
        self.allLinksList = ko.observableArray([new ConsoleApp.Link()]);
        self.linksForTeamSelectList = ko.observableArray();
        self.teamLinksList = ko.observableArray([]);
        self.selectedTeam = ko.observable();
        self.showImageProcessing_LoadingLinks = ko.observable('block');
        self.editLinkButton_Status = ko.observable(false);
        self.saveTeamLinksButton_Status = ko.observable(false);
        self.createButtonVisible = ko.observable(true);
        self.editButtonVisible = ko.observable(true);
        self.createEditTitle = ko.observable(true);
        // Selected
        self.selectedTeamLink = ko.observable(new ConsoleApp.Link());
        self.selectedAllLink = ko.observable(new ConsoleApp.Link());
        self.selectedlinkForTeamSelectList = ko.observable();

        self.InitializationDataLoaded = false;

        self.PreInitPubSub = function()
        {
        	self.GetTeamList();
        };

        self.Initialize = function () {
	        if (!self.InitializationDataLoaded) {
	        	self.GetLinks();
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

        self.SaveNewLink = function () {

            var data = ko.toJSON(self.selectedAllLink());

            var ajaxConfig = { Url: "/Admin/CreateLink", VerbType: "POST", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                self.allLinksList.unshift(new ConsoleApp.Link()
                        .Id(data.Id)
                        .Url(data.Url)
                        .Title(data.Title)
                        .Category(data.Category));

                self.selectedAllLink(new ConsoleApp.Link());
                toastr.info("Link successfully created");

                $('#CreateEditLink_ModalAlert').modal('hide');
            });
        };

        self.EditLink = function () {

            var data = ko.toJSON(self.selectedAllLink());

            var ajaxConfig = { Url: "/Admin/EditLink", VerbType: "POST", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                toastr.info("Link successfully updated");
                $('#CreateEditLink_ModalAlert').modal('hide');
            });
        };

        self.DeleteLink = function () {

            var data = ko.toJSON(self.selectedAllLink());

            var ajaxConfig = { Url: "/Admin/DeleteLink", VerbType: "DELETE", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                self.allLinksList.remove(function (item) { return item.Id == self.selectedAllLink().Id });

                toastr.info("Link successfully deleted");
            });
        };


        self.GetLinks = function () {

            self.allLinksList.removeAll();

            var ajaxConfig = { Url: "/Admin/GetLinks", VerbType: "GET" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

            	if (data != null) {
            		var allLinksList = [];
                    $.each(data, function (key, value) {
                        allLinksList.push(new ConsoleApp.Link()
                            .Id(value.Id)
                            .Url(value.Url)
                            .Title(value.Title)
                            .Category(value.Category));
                    });
            		self.allLinksList(allLinksList);
            	}
                else {
                    toastr.info("No Links Found");
                }
                    

                self.showImageProcessing_LoadingLinks('none');

            });
        };

        self.GetLinksForTeam = function () {

            self.linksForTeamSelectList.removeAll();
            self.teamLinksList.removeAll();

            var ajaxConfig = { Url: "/Admin/GetLinksForTeam?teamId=" + self.selectedTeam(), VerbType: "GET", ContentType: "application/json;charset=utf-8" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function(data)
            {
	            
                if (data.length > 0) {

                    var currentTeamLinksTempArray = ko.observableArray();
                    currentTeamLinksTempArray.removeAll();

                    var linksForTeamSelectList = [];
                    $.each(data, function (key, value) {

                        linksForTeamSelectList.push({ key: value.Id, name: value.Title });

                        currentTeamLinksTempArray.push(new ConsoleApp.Link()
                            .Id(value.Id)
                            .Url(value.Url)
                            .Title(value.Title)
                            .Category(value.Category));
                    });
                    self.linksForTeamSelectList(linksForTeamSelectList);

                    var differenceList = ko.utils.compareArrays(currentTeamLinksTempArray(), self.allLinksList());

                    var diffResults = ko.observableArray();
                    ko.utils.arrayForEach(differenceList, function (difference) {
                        if (difference.status === "deleted") {
                            diffResults.push(difference.value.Id());
                        }
                    });

	                var teamLinksList = [];
                    $.each(self.allLinksList(), function(key, value)
                    {
                        if (diffResults.indexOf(value.Id()) == -1)

                            teamLinksList.push(new ConsoleApp.Link()
                                .Id(value.Id())
                                .Url(value.Url().substr(0,30) + '...')
                                .Title(value.Title())
                                .Category(value.Category()));
                    });
                    self.teamLinksList(teamLinksList);

                } else {
                    self.linksForTeamSelectList.push({ key: 0, name: "No Links..." });

	                var teamLinksList = [];
                    $.each(self.allLinksList(), function (key, value) {
                        teamLinksList.push(new ConsoleApp.Link()
                                .Id(value.Id())
                                .Url(value.Url().substr(0, 30) + '...')
                                .Title(value.Title())
                                .Category(value.Category()));
                    });
                    self.teamLinksList(teamLinksList);
                }

            });
        };

        self.SaveLinksForTeam = function () {

            var teamLinksDto = new ConsoleApp.TeamLinksDto();
            teamLinksDto.TeamId(self.selectedTeam());

	        var teamLinksIdList = [];
            $.each(self.linksForTeamSelectList(), function (key, value) {
                teamLinksIdList.push(value.key);
            });
            teamLinksDto.TeamLinksIdList(teamLinksIdList);

            var data = ko.toJSON(teamLinksDto);

            var ajaxConfig = { Url: "/Admin/SaveLinksForTeam", VerbType: "POST", Data: data };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {
                toastr.info("Team Links successfully updated");
            });
        };

        // Events
        self.click_RemoveLinkFromTeam = function (e) {

            if (self.selectedlinkForTeamSelectList() !== undefined) {
                var removeItem = ko.utils.arrayFirst(self.allLinksList(), function (item) {
                    return (item.Id() == self.selectedlinkForTeamSelectList());
                });

                self.linksForTeamSelectList.remove(function (item) { return item.key == self.selectedlinkForTeamSelectList() });

                self.teamLinksList.unshift(new ConsoleApp.Link()
                                .Id(removeItem.Id())
                                .Url(removeItem.Url().substr(0, 30) + '...')
                                .Title(removeItem.Title())
                                .Category(removeItem.Category()));
            }
            else {
                alert("Select a link to remove");
            }

        };

        self.click_AddLinkToTeam = function (e) {

            self.linksForTeamSelectList.remove(function (item) { return item.key == '0'; });

            if (self.selectedTeam() !== undefined) {

                if (self.linksForTeamSelectList.indexOf(self.selectedTeamLink().Id()) === -1) {
                    self.linksForTeamSelectList.push({ key: self.selectedTeamLink().Id(), name: self.selectedTeamLink().Title() });
                    self.teamLinksList.remove(self.selectedTeamLink());
                    self.selectedTeamLink(null);
                }
                else {
                    alert("Link already added...");
                }
            }
            else {
                alert("Select a team first...");
            }

        };

        self.onClickTeamLinkItem = function (e) {
            self.selectedTeamLink(this);
        };

        self.onClickAllLinksItem = function (e) {
            self.selectedAllLink(this);
        };

        self.click_DeleteLink = function () {

            self.selectedAllLink(this);

            var result = confirm("Delete Link?");
            if (result) {
                self.DeleteLink();
            }
        };

        self.click_SaveTeamLinks = function () {
            self.SaveLinksForTeam();
        };

        self.click_CancelCreateEdit = function () {
            self.selectedAllLink(new ConsoleApp.Link());
        };

        self.click_OpenCreateEditLinkModal_Create = function (e) {
            self.createEditTitle("Create Link");
            self.selectedAllLink(new ConsoleApp.Link());
            self.createButtonVisible(true);
            self.editButtonVisible(false);
            $('#CreateEditLink_ModalAlert').modal('show');
        };

        self.click_OpenCreateEditLinkModal_Edit = function (e) {
            self.createEditTitle("Edit Link");
            self.createButtonVisible(false);
            self.editButtonVisible(true);

            $('#CreateEditLink_ModalAlert').modal('show');
        };

        self.click_EditLink = function (e) {
            self.EditLink();
        };

        self.click_CreateLink = function (e) {

            //var form = $('#formCreateEditLink');

            //if (form.valid()) {
                self.SaveNewLink();
            //}
        };


        // Subscribe
        self.selectedTeam.subscribe(function () {

            if (self.selectedTeam() !== undefined) {
                self.GetLinksForTeam();
            }
            else {
                self.linksForTeamSelectList.removeAll();
                self.teamLinksList.removeAll();
            }
        });


        return self;
    };

});