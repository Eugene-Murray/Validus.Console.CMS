$(function () {

    var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

    ConsoleApp.vmManageUsers = new function () {
        var self = this;
        self.userSearchList = ko.observableArray();
        self.teamList = ko.observableArray();
        self.userList = ko.observableArray(["Users in Team..."]);
        self.selectedTeam = ko.observable('');
        self.selectedUserName = ko.observable('');
        self.searchUserNameTxt = ko.observable('');
        self.remove_Status = ko.observable(false);
        self.add_Status = ko.observable(false);
        self.showDivUserSearchArea = ko.observable(false);
        self.showDivTopButtonArea = ko.observable(false);
        self.enableUserDetailsEdit = ko.observable(true);
        self.personalSettingsTitle_Visible = ko.observable(false);
        self.showDivAddRemoveTeamMembershipsArea = ko.observable(true);
        self.createNewUserBtnTxt = ko.observable('Create New User');
        self.showImageProcessing_SavingUser = ko.observable(false);
        self.saveUser_Status = ko.observable(true);
        self.createNewUserBtn_Visible = ko.observable(true);
        self.searchForUserBtn_Visible = ko.observable(false);
        self.showImageProcessing_LoadUser = ko.observable('none');
        self.showImageProcessing_SavingUser = ko.observable('none');
        self._Underwriter = ko.observable('');
        self._DefaultBroker = ko.observable();
        self._DomainLogon = ko.observable('');
        
        // Save Mode
        self.saveMode = ko.observable("EDIT"); // CREATE or EDIT
        // User to Create / Edit
        self.userToManage = ko.observable(new ConsoleApp.User());
        // Selected Item
        self.selectedItem = ko.observable();

        self.showDefaultBroker = ko.observable(false);

	    self.PreInitPubSub = function() {
	    	self.GetTeamList();
	    };

        self.Initialize = function(pageConfig)
        {
        	if (pageConfig !== undefined)
        	{
                self.PageSetup(pageConfig.pageMode, pageConfig.selectedUser);
            }
            else {
                self.PageSetup("EDIT_SEARCH", undefined);
            }           
        };
	    
        self.GetTeamList = function()
        {
        	amplify.subscribe(ConsoleApp.adminConfig.pubSub_BasicTeamList, function(data)
        	{
        		self.teamList(data);
        	});
        };

        // CREATE_NEW, EDIT_SEARCH, EDIT_FROM_TEAMPAGE, EDIT_FROM_PERSONALSETTINGS
        self.PageSetup = function (pageMode, selectedUser) {

        	if (pageMode == "CREATE_NEW") {

        		self.ClearAllLists();
        		self.userToManage(new ConsoleApp.User());
        		self.showDivUserSearchArea(false);
        		self.createNewUserBtn_Visible(false);
        		self.searchForUserBtn_Visible(true);
        		self.enableUserDetailsEdit(true);
        		self.personalSettingsTitle_Visible(false);
        		self._Underwriter('');
        		self.saveMode("CREATE");

        		self.GetRequiredDataCreateUser();
        	}

            if (pageMode == "EDIT_SEARCH") {
                self.ClearAllLists();
                self.userToManage(new ConsoleApp.User());
                self.showDivUserSearchArea(true);
                self.createNewUserBtn_Visible(true);
                self.searchForUserBtn_Visible(false);
                self.enableUserDetailsEdit(true);
                self.personalSettingsTitle_Visible(false);
                self.showDivTopButtonArea(true);
                self._Underwriter('');
                self.saveMode("EDIT");
            }

            if (pageMode == "EDIT_FROM_TEAMPAGE") {
                self.ClearAllLists();
                self.userToManage(new ConsoleApp.User());
                self.showDivUserSearchArea(false);
                self.createNewUserBtn_Visible(false);
                self.showDivTopButtonArea(true);
                self.searchForUserBtn_Visible(true);
                self.showDivAddRemoveTeamMembershipsArea(true);
                self.enableUserDetailsEdit(true);
                self.personalSettingsTitle_Visible(false);
                self._Underwriter('');
                self.saveMode("EDIT");
	            
                self.GetSelectedUserByName(selectedUser, null);
            }

            if (pageMode == "EDIT_FROM_PERSONALSETTINGS") {
                self.ClearAllLists();
                self.userToManage(new ConsoleApp.User());
                self.showDivUserSearchArea(false);
                self.showDivTopButtonArea(false);
                self.showDivAddRemoveTeamMembershipsArea(false);
                self.enableUserDetailsEdit(false);
                self.personalSettingsTitle_Visible(true);
                self._Underwriter('');
                self.saveMode("EDIT");
	            
                self.GetUserPersonalSettings();
            }
        };

        self.SetUpTypeAheadDefaultBroker = function(data)
        {
        	var dataArray = [];
        	$(data).each(function(index, item)
        	{
        		dataArray.push(
				    {
				    	Title: item.Code + ' : ' + item.Name,
				    	Value: item.Code + ' : ' + item.Name
				    });
        	});
        	return dataArray;
        };
	    
        self.Functions = {
            /*
                Bootstrap typeahead call-back for when a user  search term yield no results.
            */
            InvalidUserSelected: function(element, options, koId, koValue, koDependents) {
                if (ko.isObservable(koId)) koId(0);
                if (ko.isObservable(koValue)) koValue($.trim($(element).val()).toUpperCase());
            }
        };
	    
        self.SetUpTypeAhead = function(data) {
		    var dataArray = [];
		    $(data).each(function(index, item) {
			    dataArray.push(
				    {
					    Title: item.Code + ' : ' + item.Name,
					    Value: item.Code
				    });
		    });
		    return dataArray;
	    };
	    
	    self.SetUpTypeAheadUser = function(data)
	    {
	    	var dataArray = [];
	    	$(data).each(function(index, item)
	    	{
	    		dataArray.push(
				    {
				    	DisplayName: item.DisplayName,
				    	UserName: item.UserName
				    });
	    	});
	    	return dataArray;
	    };

        self.GetRequiredDataCreateUser = function () {

            self.showImageProcessing_LoadUser('block');
            var ajaxConfig = { Url: "/Admin/GetRequiredDataCreateUser", VerbType: "GET" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {
            	self.SetRequiredDataForTheAllLists(data);
                self.showImageProcessing_LoadUser('none');
            });

	        response.fail(function(jqXhr, textStatus)
	        {
		        self.showImageProcessing_LoadUser('none');
	        });
        };

        self.GetUsers = function () {

            self.userList.removeAll();

            var ajaxConfig = { Url: "/Admin/GetUsersInTeam?teamId=" + ConsoleApp.vmManageUsers.selectedTeam(), VerbType: "GET" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                self.userList.removeAll();

                if (data.length > 0) {
	                var users = [];
                    $.each(data, function (key, value) {
                    	users.push(value);
                    });
                    self.userList(users);
                } else {
                    self.userList.push("No Users Found in Team");
                }

            });
        };

	    self.GetSelectedUserByName = function(userName, callback)
	    {
		    self.showImageProcessing_LoadUser('block');
		    self.userToManage(new ConsoleApp.User());
		    self.ClearAllLists();

		    var ajaxConfig = { Url: "/Admin/GetSelectedUserByName?userName=" + userName, VerbType: "GET" },
		        response = ConsoleApp.AjaxHelper(ajaxConfig);

		    response.success(function(data)
		    {
			    self.SetUser(data);
			    self.showImageProcessing_LoadUser('none');

			    if (callback) callback();
		    });

		    response.fail(function(xhr, status)
		    {
			    self.showImageProcessing_LoadUser('none');
		    });
	    };

        self.GetUserPersonalSettings = function () {

            self.showImageProcessing_LoadUser('block');
            self.userToManage(new ConsoleApp.User());
            self.ClearAllLists();

            var ajaxConfig = { Url: "/Admin/GetUserPersonalSettings", VerbType: "GET" },
                response = ConsoleApp.AjaxHelper(ajaxConfig);

	        response.success(function(data)
	        {
		        self.SetUser(data);
		        self.showImageProcessing_LoadUser('none');
	        });

            response.fail(function(xhr, status)
            {
                self.showImageProcessing_LoadUser('none');
            });
        };

        self.SetUser = function (data) {

        	if (data.Id != null)
        	{
                if (data.PrimaryOfficeList != null) {
	                var primaryOfficeList = [];
                	$.each(data.PrimaryOfficeList, function(key, value)
                	{
                        if (value != null)
                            primaryOfficeList.push(new ConsoleApp.Office().Id(value.Id).Title(value.Title));
                    });
                	self.userToManage().PrimaryOfficeList(primaryOfficeList);
                }

                if (data.DefaultOrigOfficeList != null) {
	                var defaultOrigOfficeList = [];
                    $.each(data.DefaultOrigOfficeList, function (key, value) {
                        if(value != null)
                        	defaultOrigOfficeList.push(new ConsoleApp.Office().Id(value.Id).Title(value.Title));
                    });
                    self.userToManage().DefaultOrigOfficeList(defaultOrigOfficeList);
                }
                
                self.userToManage().Id(data.Id);
                self.userToManage().DomainLogon(data.DomainLogon);

                var tempSavedPrimaryOffice = ko.utils.arrayFirst(self.userToManage().PrimaryOfficeList(), function(item) {
                    return item.Id() === (data.PrimaryOffice != null ? data.PrimaryOffice.Id : "");
                });
                
                self.userToManage().PrimaryOffice(tempSavedPrimaryOffice != null ? tempSavedPrimaryOffice : new ConsoleApp.Office());
                
                var tempSavedDefaultOrigOffice = ko.utils.arrayFirst(self.userToManage().DefaultOrigOfficeList(), function (item) {
                    return item.Id() === (data.DefaultOrigOffice != null ? data.DefaultOrigOffice.Id : "");
                });
                
                self.userToManage().DefaultOrigOffice(tempSavedDefaultOrigOffice!=null?tempSavedDefaultOrigOffice:new  ConsoleApp.Office() );
                self.userToManage().DefaultUW(new ConsoleApp.User().Id(data.DefaultUW != null ? data.DefaultUW.Id : "").DomainLogon(data.DefaultUW != null ? data.DefaultUW.DomainLogon : ""));
                self._Underwriter(data.UnderwriterId);
                self._DefaultBroker(data.DefaultBroker);
                self.userToManage().UnderwriterId(data.UnderwriterId);

             

                if (data.DefaultUWList != null) {
	                var defaultUWList = [];
                    $.each(data.DefaultUWList, function (key, value) {
                        if (value != null)
                        	defaultUWList.push(new ConsoleApp.User().Id(value.Id).DomainLogon(value.DomainLogon));
                    });
                    self.userToManage().DefaultUWList(defaultUWList);
                }

                self.userToManage().IsActive(data.IsActive);

                if (data.TeamMemberships != null) {
	                var teamMemberships = [];
                	$.each(data.TeamMemberships, function(key, value)
                	{
                		var startDate = moment(value.StartDate),
							endDate = moment(value.EndDate);

                		if (startDate && startDate.isValid())
                			startDate = startDate.format("YYYY-MM-DD");

                		if (endDate && endDate.isValid())
                			endDate = endDate.format("YYYY-MM-DD");

                        teamMemberships.push(new ConsoleApp.TeamMembership()
                                .Id(value.Id)
                                .Team(new ConsoleApp.Team().Id(value.Team.Id).Title(value.Team.Title))
								.PrimaryTeamMembership(value.PrimaryTeamMembership)
								.StartDate(startDate)
                                .EndDate(endDate));
                	});
                	self.userToManage().TeamMemberships(teamMemberships);
                }

                if (data.FilterCOBs != null) {
	                var filterCOBs = [];
                    $.each(data.FilterCOBs, function (key, value) {
                        filterCOBs.push(new ConsoleApp.COB()
                                .Id(value.Id)
                                .Narrative(value.Narrative));
                    });
                    self.userToManage().FilterCOBs(filterCOBs);
                }

                if (data.FilterOffices != null) {
	                var filterOffices = [];
                    $.each(data.FilterOffices, function (key, value) {
                        filterOffices.push(new ConsoleApp.Office()
                                .Id(value.Id)
                                .Title(value.Title));
                    });
                    self.userToManage().FilterOffices(filterOffices);
                }

                if (data.FilterMembers != null) {
	                var filterMembers = [];
                    $.each(data.FilterMembers, function (key, value) {
                        filterMembers.push(new ConsoleApp.User()
                                .Id(value.Id)
                                .DomainLogon(value.DomainLogon));
                    });
                    self.userToManage().FilterMembers(filterMembers);
                }

                if (data.AdditionalCOBs != null) {
	                var additionalCOBs = [];
                    $.each(data.AdditionalCOBs, function (key, value) {
                        additionalCOBs.push(new ConsoleApp.COB()
                                .Id(value.Id)
                                .Narrative(value.Narrative));
                    });
                    self.userToManage().AdditionalCOBs(additionalCOBs);
                }

                if (data.AdditionalOffices != null) {
	                var additionalOffices = [];
                    $.each(data.AdditionalOffices, function (key, value) {
                        additionalOffices.push(new ConsoleApp.Office()
                                .Id(value.Id)
                                .Title(value.Title));
                    });
                    self.userToManage().AdditionalOffices(additionalOffices);
                }

                if (data.AdditionalUsers != null) {
	                var additionalUsers = [];
                    $.each(data.AdditionalUsers, function (key, value) {
                        self.userToManage().AdditionalUsers.push(new ConsoleApp.User()
                                .Id(value.Id)
                                .DomainLogon(value.DomainLogon));
                    });
                    self.userToManage().AdditionalUsers(additionalUsers);
                }

                // Set Required Data for the 'All' Lists 
                self.SetRequiredDataForTheAllLists(data);

            } else {
                toastr.info("No User found");
            }
        };

        self.ClearAllLists = function () {

        	self.userToManage().TeamMemberships.removeAll();
            self.userToManage().AllTeamMemberships.removeAll();

            self.userToManage().FilterCOBs.removeAll();
            self.userToManage().AllFilterCOBs.removeAll();

            self.userToManage().FilterOffices.removeAll();
            self.userToManage().AllFilterOffices.removeAll();

            self.userToManage().FilterMembers.removeAll();
            self.userToManage().AllFilterMembers.removeAll();

            self.userToManage().AdditionalCOBs.removeAll();
            self.userToManage().AllAdditionalCOBs.removeAll();

            self.userToManage().AdditionalOffices.removeAll();
            self.userToManage().AllAdditionalOffices.removeAll();

            self.userToManage().AdditionalUsers.removeAll();
            self.userToManage().AllAdditionalUsers.removeAll();

            self.userToManage().PrimaryOfficeList.removeAll();
            self.userToManage().DefaultOrigOfficeList.removeAll();
            self.userToManage().DefaultUWList.removeAll();
        };

        self.SaveUser = function (action) {

            self.showImageProcessing_SavingUser('block');
            self.saveUser_Status(false);
            
			// Send back to server only what we need...
            var userToSave = new ConsoleApp.User();
            userToSave.Id = self.userToManage().Id;
            userToSave.DomainLogon = self.userToManage().DomainLogon;
            userToSave.PrimaryOffice = self.userToManage().PrimaryOffice;
            userToSave.DefaultBroker = self.userToManage().DefaultBroker;
            userToSave.DefaultOrigOffice = self.userToManage().DefaultOrigOffice;
            userToSave.DefaultUW = self.userToManage().DefaultUW;
            userToSave.IsActive = self.userToManage().IsActive;
            userToSave.UnderwriterId = self.userToManage().UnderwriterId;
            userToSave.TeamMemberships = self.userToManage().TeamMemberships;
            userToSave.FilterCOBs = self.userToManage().FilterCOBs;
            userToSave.FilterOffices = self.userToManage().FilterOffices;
            userToSave.FilterMembers = self.userToManage().FilterMembers;
            userToSave.AdditionalCOBs = self.userToManage().AdditionalCOBs;
            userToSave.AdditionalOffices = self.userToManage().AdditionalOffices;
            userToSave.AdditionalUsers = self.userToManage().AdditionalUsers;
            userToSave.AllTeamMemberships = self.userToManage().AllTeamMemberships;

            var data = ko.toJSON(userToSave);
            var ajaxConfig = { Url: "/Admin/" + action, VerbType: "POST", Data: data };
            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {
            	
            	toastr.success("User successfully saved");
	            
	            self.userToManage().Id(data);

                self.showImageProcessing_SavingUser('none');
                self.saveUser_Status(true);
                self.saveMode("EDIT");

            	ConsoleApp.adminTeamRepository.SetTeamsBasicAndFullDataList();
            });

	        response.fail(function(xhr, status)
	        {
	        	toastr.success("Failed to save user");
	        	self.showImageProcessing_SavingUser('none');
		        self.saveUser_Status(true);
	        });
                                          };

        self.SearchForUser = function () {

        	self.userSearchList.removeAll();
            self.userToManage(new ConsoleApp.User());
            self.ClearAllLists();

            var ajaxConfig = { Url: "/Admin/SearchForUserByName?userName=" + self.searchUserNameTxt(), VerbType: "GET" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

            	if (data.length > 0)
            	{
            		var userSearchList = [];
                    $.each(data, function (key, value) {
                        userSearchList.push({ Id: value.Id, DomainLogon: value.DomainLogon });
                    });
                    self.userSearchList(userSearchList);
                }
                else {
                    toastr.info("No Users Found");
                }

            });
        };

        // Events
        self.onUserSearchListSelected = function () {
            self.GetSelectedUserByName(this.DomainLogon, null);
        };

        self.click_SearchForUser = function () {
            ConsoleApp.vmManageUsers.SearchForUser();
        };

        self.click_ShowCreateUser = function () {
            self.PageSetup("CREATE_NEW", undefined);
        };

        self.click_ShowSearchArea = function () {
            self.PageSetup("EDIT_SEARCH", undefined);
        };

        // Team Memberships
        self.click_RemoveTeamMemberships = function () {
        	if (self.selectedItem() != null)
        	{
        		if (self.userToManage().TeamMemberships.indexOf(self.selectedItem()) !== -1) {
        			self.userToManage().TeamMemberships.remove(self.selectedItem());
        			self.userToManage().AllTeamMemberships.unshift(self.selectedItem().IsCurrent(false).PrimaryTeamMembership(false));
        			self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_AddTeamMemberships = function () {
        	if (self.selectedItem() != null)
        	{
        		if (self.userToManage().AllTeamMemberships.indexOf(self.selectedItem()) !== -1)
            	{
        			self.userToManage().AllTeamMemberships.remove(self.selectedItem());
        			self.userToManage().TeamMemberships.unshift(self.selectedItem().IsCurrent(true));
        			self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        // FilterCOBs
        self.click_RemoveFilterCOBs = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().FilterCOBs.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().FilterCOBs.remove(self.selectedItem());
                    self.userToManage().AllFilterCOBs.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

	    self.click_AddFilterCOBs = function()
	    {
		    if (self.selectedItem() != null)
		    {
			    if (self.userToManage().AllFilterCOBs.indexOf(self.selectedItem()) !== -1)
			    {
				    self.userToManage().AllFilterCOBs.remove(self.selectedItem());
				    self.userToManage().FilterCOBs.unshift(self.selectedItem());
				    self.selectedItem(null);
			    }
			    else
			    {
				    toastr.info("No value selected");
			    }
		    }
		    else
		    {
			    toastr.info("No value selected");
		    }
	    };

        // FilterOffices
        self.click_RemoveFilterOffices = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().FilterOffices.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().FilterOffices.remove(self.selectedItem());
                    self.userToManage().AllFilterOffices.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_AddFilterOffices = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().AllFilterOffices.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().AllFilterOffices.remove(self.selectedItem());
                    self.userToManage().FilterOffices.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        // FilterMembers
        self.click_RemoveFilterMembers = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().FilterMembers.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().FilterMembers.remove(self.selectedItem());
                    self.userToManage().AllFilterMembers.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_AddFilterMembers = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().AllFilterMembers.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().AllFilterMembers.remove(self.selectedItem());
                    self.userToManage().FilterMembers.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        // AdditionalCOBs
        self.click_RemoveAdditionalCOBs = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().AdditionalCOBs.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().AdditionalCOBs.remove(self.selectedItem());
                    self.userToManage().AllAdditionalCOBs.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_AddAdditionalCOBs = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().AllAdditionalCOBs.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().AllAdditionalCOBs.remove(self.selectedItem());
                    self.userToManage().AdditionalCOBs.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        // AdditionalOffices
        self.click_RemoveAdditionalOffices = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().AdditionalOffices.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().AdditionalOffices.remove(self.selectedItem());
                    self.userToManage().AllAdditionalOffices.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_AddAdditionalOffices = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().AllAdditionalOffices.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().AllAdditionalOffices.remove(self.selectedItem());
                    self.userToManage().AdditionalOffices.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        // AdditionalUsers
        self.click_RemoveAdditionalUsers = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().AdditionalUsers.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().AdditionalUsers.remove(self.selectedItem());
                    self.userToManage().AllAdditionalUsers.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_AddAdditionalUsers = function () {
            if (self.selectedItem() != null) {
                if (self.userToManage().AllAdditionalUsers.indexOf(self.selectedItem()) !== -1) {
                    self.userToManage().AllAdditionalUsers.remove(self.selectedItem());
                    self.userToManage().AdditionalUsers.unshift(self.selectedItem());
                    self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.onClickSetSelectedItem = function () {
        	self.selectedItem(this);
        };

        self.click_SaveUser = function () {

            var form = $('#formCreateEditUser');

            //if (form.valid()) {
            	if (self.saveMode() === "EDIT")
            	{
                    self.SaveUser("EditUser");
            	}
            	else if (self.saveMode() === "CREATE")
            	{
                    self.SaveUser("CreateUser");
                }
            //}
        };

        self.click_PrimaryTeamMembership = function(item, event) {

	        if (item.PrimaryTeamMembership()) {
	        	item.PrimaryTeamMembership(false);
	        } else {
	        	item.PrimaryTeamMembership(true);
	        }
	        
	        $.each(self.userToManage().TeamMemberships(), function(key, value)
	        {
	        	if (self.userToManage().TeamMemberships.indexOf(item) !== key)
	        	{
	        		value.PrimaryTeamMembership(false);
	        	}
	        });

        };

    	// Subscribe
        self.selectedTeam.subscribe(function (newVal) {
            if (newVal !== undefined)
                self.GetUsers();
        });

        self.selectedUserName.subscribe(function (newVal) {
        	if (newVal !== undefined) {
        		self._Underwriter('');
		        self.GetSelectedUserByName(newVal, null);
	        }
        });
	    
        self._Underwriter.subscribe(function (newVal) {
        	if (newVal !== undefined)
        		self.userToManage().UnderwriterId(newVal);
        });
	    
        self._DefaultBroker.subscribe(function(newVal)
        {
        	if (newVal !== undefined)
        		self.userToManage().DefaultBroker(newVal);
        });
	    
        $.pubsub.subscribe('primaryOfficeChanged', function(topic, msg) {

	        if (msg.officeTitle !== 'London') {
		        self.showDefaultBroker(true);
	        } else {
	        	self.showDefaultBroker(false);
	        	self._DefaultBroker('');
		        $('.defaultBroker').val('');
	        }
        });
	    
    	// Helpers
        self.SetRequiredDataForTheAllLists = function(data)
        {
        	if (data.AllTeamMemberships != null)
        	{
        		var allTeamMemberships = [];
        		$.each(data.AllTeamMemberships, function(key, value)
        		{
        			var startDate = moment(value.StartDate),
			            endDate = moment(value.EndDate);

        			if (startDate && startDate.isValid())
        				startDate = startDate.format("YYYY-MM-DD");

        			if (endDate && endDate.isValid())
        				endDate = endDate.format("YYYY-MM-DD");

        			allTeamMemberships.push(new ConsoleApp.TeamMembership()
				        .Id(value.Id)
				        .Team(new ConsoleApp.Team().Id(value.Team.Id).Title(value.Team.Title))
				        .StartDate(startDate)
				        .EndDate(endDate));
        		});
        		self.userToManage().AllTeamMemberships(allTeamMemberships);
        	}

        	if (data.AllFilterCOBs != null)
        	{
        		var allFilterCOBs = [];
        		$.each(data.AllFilterCOBs, function(key, value)
        		{
        			allFilterCOBs.push(new ConsoleApp.COB()
                            .Id(value.Id)
                            .Narrative(value.Narrative));
        		});
        		self.userToManage().AllFilterCOBs(allFilterCOBs);
        	}

        	if (data.AllFilterOffices != null)
        	{
        		var allFilterOffices = [];
        		$.each(data.AllFilterOffices, function(key, value)
        		{
        			allFilterOffices.push(new ConsoleApp.Office()
                            .Id(value.Id)
                            .Title(value.Title));
        		});
        		self.userToManage().AllFilterOffices(allFilterOffices);
        	}

        	if (data.AllFilterMembers != null)
        	{
        		var allFilterMembers = [];
        		$.each(data.AllFilterMembers, function(key, value)
        		{
        			var userToPush = new ConsoleApp.User()
                      .Id(value.Id)
                      .DomainLogon(value.DomainLogon);
        			if (value.TeamMemberships.length > 0) {
        				userToPush.TeamMemberships.push(
                            new ConsoleApp.TeamMembership()
                                .Team(
                            new ConsoleApp.Team().Title(value.TeamMemberships[0].Team.Title)));
        			};
        			allFilterMembers.push(userToPush);
        		});
        		self.userToManage().AllFilterMembers(allFilterMembers);
        	}

        	if (data.AllAdditionalCOBs != null)
        	{
        		var allAdditionalCOBs = [];
        		$.each(data.AllAdditionalCOBs, function(key, value)
        		{
        			allAdditionalCOBs.push(new ConsoleApp.COB()
                            .Id(value.Id)
                            .Narrative(value.Narrative));
        		});
        		self.userToManage().AllAdditionalCOBs(allAdditionalCOBs);
        	}

        	if (data.AllAdditionalOffices != null)
        	{
        		var allAdditionalOffices = [];
        		$.each(data.AllAdditionalOffices, function(key, value)
        		{
        			allAdditionalOffices.push(new ConsoleApp.Office()
                            .Id(value.Id)
                            .Title(value.Title));
        		});
        		self.userToManage().AllAdditionalOffices(allAdditionalOffices);
        	}

        	if (data.AllAdditionalUsers != null)
        	{
        		var allAdditionalUsers = [];
        		$.each(data.AllAdditionalUsers, function(key, value)
        		{
        			var userToPush = new ConsoleApp.User()
                        .Id(value.Id)
                        .DomainLogon(value.DomainLogon);
        			if (value.TeamMemberships.length > 0)
        			{
        				userToPush.TeamMemberships.push(
                            new ConsoleApp.TeamMembership()
                                .Team(
                            new ConsoleApp.Team().Title(value.TeamMemberships[0].Team.Title)));
        			};
        			allAdditionalUsers.push(userToPush);
        		});
        		self.userToManage().AllAdditionalUsers(allAdditionalUsers);
        	}

        	if (data.AllPrimaryOffices != null)
        	{
        		var allPrimaryOffices = [];
        		$.each(data.AllPrimaryOffices, function(key, value)
        		{
        			allPrimaryOffices.push(new ConsoleApp.Office()
                        .Id(value.Id)
                        .Title(value.Title));
        		});
        		self.userToManage().PrimaryOfficeList(allPrimaryOffices);
        	}

        	if (data.AllOriginatingOffices != null)
        	{
        		var defaultOrigOfficeList = [];
        		$.each(data.AllOriginatingOffices, function(key, value)
        		{
        			defaultOrigOfficeList.push(new ConsoleApp.Office()
                        .Id(value.Id)
                        .Title(value.Title));
        		});
        		self.userToManage().DefaultOrigOfficeList(defaultOrigOfficeList);
        	}

        	if (data.AllDefaultUnderwriters != null)
        	{
        		var defaultUWList = [];
        		$.each(data.AllDefaultUnderwriters, function(key, value)
        		{
        			defaultUWList.push(new ConsoleApp.User()
                        .Id(value.Id)
                        .DomainLogon(value.DomainLogon));
        		});
        		self.userToManage().DefaultUWList(defaultUWList);
        	}
        };
	    
        return self;
    };

});