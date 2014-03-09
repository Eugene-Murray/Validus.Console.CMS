$(function () {

    var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

    ConsoleApp.vmManageTeams = new function () {
    	var self = this;
	    
        self.teamList = ko.observableArray([]);
        self.userList = ko.observableArray([{ LogonName: "Users in Team..." }]);

        self.showImageProcessing_LoadingTeams = ko.observable('block');
        self.editTeamButton_Status = ko.observable(false);
        self.deleteTeamButton_Status = ko.observable(false);
        self.editUserButton_Status = ko.observable(true);
        self.editButtonVisible = ko.observable(false);
        self.createButtonVisible = ko.observable(false);
        self.addLink = ko.observable();
        self.createEditTitle = ko.observable();
        self.goToUserView_Status = ko.observable(false);

        // Seleted
	    self.selectedTeam = ko.observable(new ConsoleApp.Team().Id(0));
        self.selectedItem = ko.observable();
	    
        self.isDirty = ko.computed(function()
        {
        	if (self.selectedTeam())
        	{
        		var dirty = self.selectedTeam().dirtyFlag.isDirty();
        		return dirty; 
        	}
        }, this);

        // Paging 
        self.selectedfilter = ko.observable("");
        self.selectedTag = ko.observable("");
        self.selectedIndex = ko.observable("");
        self.pageSize = ko.observable(5);
        self.pageIndex = ko.observable(0);
	    
        self.InitializationDataLoaded = false;

        self.PreInitPubSub = function() {
	        self.GetTeamsFullDataList();
        };

        self.Initialize = function () {
        	if (!self.InitializationDataLoaded)
        	{
        		// Team data is retrieved via PubSub in PreInit...
        		self.InitializationDataLoaded = true;
        	}
        };

        self.GetTeamsFullDataList = function()
        {
        	amplify.subscribe(ConsoleApp.adminConfig.pubSub_FullTeamsDataList, function(data)
        	{
        		self.teamList(data);
        		self.showImageProcessing_LoadingTeams('none');
        	});
        };

        self.GetUsers = function () {

            self.userList.removeAll();

            var ajaxConfig = { Url: "/Admin/GetUsersInTeam?teamId=" + self.selectedTeam().Id(), VerbType: "GET" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success($.proxy(function (data) {

            	if (data.length > 0) {
            		var userList = [];
                    $.each(data, function (key, value) {
                        userList.push({ LogonName: value });
                        self.goToUserView_Status(false);
                    });
                    self.userList(userList);
            	} else {
                    self.userList.push({ LogonName: "No Users Found in Team" });
                    self.goToUserView_Status(false);
                }

            }, this));
        };

        self.CreateTeam = function () {
            
        	var jsonData = ko.toJSON(self.selectedTeam());

        	$.when(ConsoleApp.adminTeamRepository.CreateTeam(jsonData)).done(function(data)
        	{
        		self.teamList.unshift(new ConsoleApp.Team(
		            data.Id,
		            self.selectedTeam().Title(),
		            self.selectedTeam().DefaultMOA(),
		            self.selectedTeam().DefaultDomicile(),
		            self.selectedTeam().QuoteExpiryDaysDefault(),
        			self.selectedTeam().FilterInsLRByTeam(),
        			
        			self.selectedTeam().SubmissionTypeId(),
        			self.selectedTeam().SubmissionTypeTitle(),
        			
        			self.selectedTeam().ExpiryDateOffset(),
		            self.selectedTeam().Users(),
		            self.selectedTeam().Links(),
		            self.selectedTeam().RelatedCOBs(),
		            self.selectedTeam().RelatedOffices(),
		            self.selectedTeam().AllUsers(),
		            self.selectedTeam().AllLinks(),
		            self.selectedTeam().AllRelatedCOBs(),
		            self.selectedTeam().AllRelatedOffices()
	            ));
        		
        		$('#CreateEditTeam_ModalAlert').modal('hide');
        		self.selectedTeam(new ConsoleApp.Team().Id(0));
        		toastr.info("Team successfully created");
        	});

        };

	    self.EditTeam = function()
	    {
	    	$.when(ConsoleApp.adminTeamRepository.EditTeam(self.selectedTeam())).done(function(data)
	    	{
	    		toastr.info("Team successfully updated");
	    		$('#CreateEditTeam_ModalAlert').modal('hide');
	    		self.SetButtonStatus(false);
	    		self.selectedTeam(new ConsoleApp.Team().Id(0));
	    	});
	    };

        self.DeleteTeam = function () {

        	var jsonData = ko.toJSON(self.selectedTeam());

        	$.when(ConsoleApp.adminTeamRepository.DeleteTeam(jsonData, self.selectedTeam().Id())).done(function(data)
        	{
        		self.teamList.remove(function(item) { return item.Id == ConsoleApp.vmManageTeams.selectedTeam().Id; });

        		toastr.info("Team successfully deleted");

        		self.SetButtonStatus(false);
	        });
        };

        self.animateBackgroundColour = function (elem) {
            if (elem.nodeType === 1) {

                $(elem).find('tr').animate({
                    bgcolor: "#FF0000"
                }, 5000);
            }
        };

        self.SetButtonStatus = function (status) {
            self.deleteTeamButton_Status(status);
            self.editTeamButton_Status(status);
        };

        self.GetRequiredDataCreateTeam = function () {

            ConsoleApp.vmManageTeams.selectedTeam(null);

            var ajaxConfig = { Url: "/Admin/GetRequiredDataCreateTeam", VerbType: "GET" };

            var response = ConsoleApp.AjaxHelper(ajaxConfig);

            response.success(function (data) {

                var allLinksList = [];
                $.each(data.AllLinks, function (key, value) {
                    allLinksList.push(new ConsoleApp.Link().Id(value.Id).Title(value.Title).Url(value.Url).Category(value.Category));
                });

                var allUserList = [];
                $.each(data.AllUsers, function (key, value) {
                    allUserList.push(new ConsoleApp.BasicUser().Id(value.Id).DomainLogon(value.DomainLogon));
                });

                var allRelatedCobList = [];
                $.each(data.AllRelatedCOBs, function (key, value) {
                    allRelatedCobList.push(new ConsoleApp.COB().Id(value.Id).Narrative(value.Narrative));
                });

                var allRelatedOfficeList = [];
                $.each(data.AllRelatedOffices, function (key, value) {
                    allRelatedOfficeList.push(new ConsoleApp.Office().Id(value.Id).Title(value.Title));
                });

                var newTeam = new ConsoleApp.Team()
                    .Id(0)
                    .AllLinks(allLinksList)
                    .AllRelatedCOBs(allRelatedCobList)
                    .AllRelatedOffices(allRelatedOfficeList)
                    .AllUsers(allUserList);

                self.selectedTeam(newTeam);
            });
        };
	    
        // Paging
        self.filteredItems = ko.computed(function () {
            var size = self.pageSize();
            var start = self.pageIndex() * size;

            var filter = self.selectedfilter().toLowerCase();
            if (filter) {
                self.selectedIndex("");
                self.selectedTag("");
                return ko.utils.arrayFilter(self.teamList(), function (item) {
                    return (item.Title().toLowerCase().indexOf(filter) > -1);
                });
            } else {
                var t = self.selectedTag().toLowerCase();
                if (t) {
                    if (!t || t == "all") {
                        return self.teamList.slice(start, start + size);
                    }
                    return ko.utils.arrayFilter(self.teamList(), function (item) {
                        return item.tag().toLowerCase() == t;
                    });
                } else {
                    var i = self.selectedIndex().toLowerCase();
                    if (i) {
                        if (!i || i == "all") {
                            return self.teamList.slice(start, start + size);
                        }
                        else {
                            return ko.utils.arrayFilter(self.teamList(), function (item) {

                                var string = item.lastName().toLowerCase();
                                string = string || "";
                                if (i.length > string.length) {
                                    return self.teamList.slice(start, start + size);
                                }
                                return string.substring(0, i.length) === i;
                            });
                        }
                    } else {
                        return self.teamList.slice(start, start + size);
                    }
                }
            }

        }, ConsoleApp.vmManageTeams);


        self.maxPageIndex = ko.dependentObservable(function () {
            return Math.ceil(self.teamList().length / self.pageSize()) - 1;
        }, ConsoleApp.vmManageTeams);

        self.previousPage = function () {
            if (self.pageIndex() > 0) {
                self.pageIndex(self.pageIndex() - 1);
            }
        };

        self.nextPage = function () {
            if (self.pageIndex() < self.maxPageIndex()) {
                self.pageIndex(self.pageIndex() + 1);
            }
        };

        self.moveToPage = function (index) {
            self.pageIndex(index);
        };

        self.allPages = ko.dependentObservable(function () {
            var pages = [];
            for (i = 0; i <= self.maxPageIndex() ; i++) {
                pages.push({
                    pageNumber: (i + 1)
                });
            }
            return pages;
        }, ConsoleApp.vmManageTeams);


        // Events 
        self.click_GetUsersInTeam = function () {
            self.selectedTeam(this);
            self.GetUsers();
        };


        self.onClickTeamItem = function(e) {
        	self.goToUserView_Status(true);
        	self.selectedTeam(this);
	        
        };

        self.click_DeleteTeam = function () {

            self.selectedTeam(this);
            var result = confirm("Delete Team?");
            if (result) {
                self.SetButtonStatus(true);
                self.DeleteTeam();
            }
        };


        self.click_EditTeam = function () {

           // var form = $('#formCreateEditTeam');
	        //if (form.valid()) {
		        self.SetButtonStatus(true);
		        self.EditTeam();
	        //}

        };

        self.click_OpenCreateEditTeamModal_Create = function (e) {
            self.createEditTitle("Create Team");
            self.GetRequiredDataCreateTeam();
            self.createButtonVisible(true);
            self.editButtonVisible(false);
            $('#CreateEditTeam_ModalAlert').modal('show');
        };

        self.click_OpenCreateEditTeamModal_Edit = function (e) {
            self.createEditTitle("Edit Team");
            self.selectedTeam(null);    
            self.createButtonVisible(false);
            self.editButtonVisible(true);
            $('#CreateEditTeam_ModalAlert').modal('show');
        };

        self.click_CreateTeam = function (e) {
            //if ($('#formCreateEditTeam').valid()) {
                self.CreateTeam();
            //}
            //return false;
        };

        self.onClickSetSelectedItem = function () {
            self.selectedItem(this);
        };

        self.click_AddUsers = function () {
            if (self.selectedItem() != null) {
                if (self.selectedTeam().AllUsers.indexOf(self.selectedItem()) !== -1) {
                		self.selectedTeam().AllUsers.remove(self.selectedItem());
						self.selectedTeam().Users.unshift(self.selectedItem().IsCurrentMembership(true));
						self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_RemoveUsers = function () {
            if (self.selectedItem() != null) {
                if (self.selectedTeam().Users.indexOf(self.selectedItem()) !== -1) {
                		self.selectedTeam().Users.remove(self.selectedItem());
						self.selectedTeam().AllUsers.unshift(self.selectedItem().IsCurrentMembership(false));
						self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_AddLinks = function () {
            if (self.selectedItem() != null) {
                if (self.selectedTeam().AllLinks.indexOf(self.selectedItem()) !== -1) {
                		self.selectedTeam().AllLinks.remove(self.selectedItem());
						self.selectedTeam().Links.unshift(self.selectedItem());
						self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_RemoveLinks = function () {
            if (self.selectedItem() != null) {
                if (self.selectedTeam().Links.indexOf(self.selectedItem()) !== -1) {
                		self.selectedTeam().Links.remove(self.selectedItem());
						self.selectedTeam().AllLinks.unshift(self.selectedItem());
						self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_AddRelatedCOBs = function () {
            if (self.selectedItem() != null) {
                if (self.selectedTeam().AllRelatedCOBs.indexOf(self.selectedItem()) !== -1) {
                		self.selectedTeam().AllRelatedCOBs.remove(self.selectedItem());
						self.selectedTeam().RelatedCOBs.unshift(self.selectedItem());
						self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_RemoveRelatedCOBs = function () {
            if (self.selectedItem() != null) {
                if (self.selectedTeam().RelatedCOBs.indexOf(self.selectedItem()) !== -1) {
                		self.selectedTeam().RelatedCOBs.remove(self.selectedItem());
						self.selectedTeam().AllRelatedCOBs.unshift(self.selectedItem());
						self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_AddRelatedOffices = function () {
            if (self.selectedItem() != null) {
                if (self.selectedTeam().AllRelatedOffices.indexOf(self.selectedItem()) !== -1) {
                		self.selectedTeam().AllRelatedOffices.remove(self.selectedItem());
						self.selectedTeam().RelatedOffices.unshift(self.selectedItem());
						self.selectedItem(null);
 
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };

        self.click_RemoveRelatedOffices = function () {
            if (self.selectedItem() != null) {
                if (self.selectedTeam().RelatedOffices.indexOf(self.selectedItem()) !== -1) {
                		self.selectedTeam().RelatedOffices.remove(self.selectedItem());
						self.selectedTeam().AllRelatedOffices.unshift(self.selectedItem());
						self.selectedItem(null);
                } else {
                    toastr.info("No value selected");
                }
            } else {
                toastr.info("No value selected");
            }
        };
	    
        return self;
    };
});